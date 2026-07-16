import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import '../styles/Scanner.css';

// ── Config ────────────────────────────────────────────────────────
const API_URL = 'https://sentinel-core-api.azurewebsites.net'; // Azure URL 

const SUPPORTED_FORMATS = [
  { ext: 'EXE', desc: 'Windows Executable' },
  { ext: 'DLL', desc: 'Dynamic Link Library' },
  { ext: 'PDF', desc: 'PDF Document' },
  { ext: 'DOCX', desc: 'Word Document' },
  { ext: 'DOC',  desc: 'Word Document (Legacy)' },
  { ext: 'MP3',  desc: 'Audio File' },
  { ext: 'WAV',  desc: 'Audio File' },
  { ext: 'ZIP',  desc: 'ZIP Archive' },
];

const STAGES = [
  { label: 'Hashing',   icon: '🔐', desc: 'Computing MD5, SHA1, SHA256' },
  { label: 'File Type', icon: '📄', desc: 'Detecting format & structure' },
  { label: 'Static',    icon: '🔍', desc: 'PE header & entropy analysis' },
  { label: 'Behavior',  icon: '🧠', desc: 'API import inspection' },
  { label: 'CVE',       icon: '🌐', desc: 'NVD threat intelligence lookup' },
  { label: 'AI',        icon: '🤖', desc: 'Risk scoring & classification' },
  { label: 'Report',    icon: '📊', desc: 'Generating final report' },
];

// ── Helpers ───────────────────────────────────────────────────────
function getSevColor(level) {
  const l = String(level || '').toUpperCase();
  if (['CRITICAL', 'MALICIOUS'].includes(l)) return '#ff4444';
  if (l === 'HIGH')   return '#cc7700';
  if (l === 'MEDIUM') return '#ccaa00';
  if (['LOW', 'CLEAN', 'BENIGN', 'MINIMAL', 'N/A', 'NONE'].includes(l)) return '#44cc44';
  return '#cccccc';
}

function getRiskLevel(score) {
  if (score >= 70) return { label: 'HIGH',   color: '#ff4444', bg: 'rgba(255,68,68,0.15)' };
  if (score >= 40) return { label: 'MEDIUM', color: '#cc7700', bg: 'rgba(204,119,0,0.15)' };
  return                   { label: 'LOW',   color: '#44cc44', bg: 'rgba(68,204,68,0.15)' };
}

// ── Map backend response → dashboard format ───────────────────────
function mapReport(report) {
  const staticRaw     = report.analysis?.static_analysis || {};
  const behavioralRaw = report.analysis?.behavioral_analysis || {};
  const cveRaw        = report.cve_analysis || {};
  const aiRaw         = report.ai_classification || {};

  // Static
  const staticScore = staticRaw.risk_score?.score ?? 0;
  const staticPatterns = [
    ...(staticRaw.risk_score?.factors || []),
    ...(staticRaw.suspicious_imports?.map(i => `Suspicious import: ${i}`) || []),
  ];

  // Behavioral
  const behavioralScore = behavioralRaw.behavioral_score?.score ?? 0;
  const suspiciousApis  = behavioralRaw.detected_behaviors?.map(b => b) || [];

  // CVE
  const vulns = (cveRaw.cves_found || []).map(c => ({
    id:       c.cve_id,
    severity: c.severity,
    cvss:     c.cvss_score,
    description: c.description,
  }));

  // Overall risk — average of all scores
  const scores = [staticScore, behavioralScore, cveRaw.risk_score ?? 0].filter(s => s > 0);
  const overallRisk = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

  return {
    file_name:       report.filename,
    file_size:       report.analysis?.static_analysis?.file_size || 0,
    threat_detected: report.threat_detected,
    threat_level:    report.threat_level?.toUpperCase() || 'CLEAN',
    threat_name:     report.threat_name,
    scan_id:         report.scan_id,
    hashes: {
      md5:    staticRaw.hashes?.md5    || report.file_hash?.slice(0, 32) || 'N/A',
      sha1:   staticRaw.hashes?.sha1   || 'N/A',
      sha256: staticRaw.hashes?.sha256 || report.file_hash || 'N/A',
    },
    static_analysis: {
      risk_score:          staticScore,
      entropy:             staticRaw.entropy ?? 0,
      strings_extracted:   staticRaw.strings_count ?? 'N/A',
      suspicious_strings:  staticRaw.suspicious_strings_count ?? 0,
      is_pe:               staticRaw.is_pe ?? false,
      total_imports:       staticRaw.total_imports ?? 'N/A',
      suspicious_imports:  staticRaw.suspicious_imports?.length ?? 0,
      pe_sections:         staticRaw.pe_sections ?? 'N/A',
      suspicious_sections: staticRaw.suspicious_sections ?? 'N/A',
      entry_point:         staticRaw.entry_point ?? 'N/A',
      compile_time:        staticRaw.compile_time ?? 'N/A',
      suspicious_patterns: staticPatterns,
    },
    behavioral: {
      risk_score:              behavioralScore,
      suspicious_apis:         suspiciousApis,
      process_creation:        behavioralRaw.process_creation?.will_create_process ?? false,
      process_injection:       behavioralRaw.process_injection?.will_inject ?? false,
      persistence:             behavioralRaw.persistence?.has_persistence ?? false,
      file_system:             behavioralRaw.file_operations?.will_access_files
                                 ? `${behavioralRaw.file_operations?.file_apis?.length ?? 0} APIs`
                                 : false,
      network_activity:        behavioralRaw.network?.will_connect ?? false,
      crypto:                  behavioralRaw.crypto?.has_crypto ?? false,
      anti_debug:              behavioralRaw.anti_debug?.has_anti_debug ?? false,
      keylogging:              behavioralRaw.keylogging?.has_keylogging ?? false,
      screenshot:              behavioralRaw.screenshot?.has_screenshot ?? false,
      c2_indicators:           behavioralRaw.network?.c2_indicators ?? false,
      registry_modification:   behavioralRaw.registry?.will_modify_registry ?? false,
      persistence_attempt:     behavioralRaw.registry?.persistence_attempt ?? false,
      file_deletion:           behavioralRaw.file_operations?.will_delete_files ?? false,
    },
    cve: {
      risk_score:       cveRaw.risk_score ?? 0,
      vulnerabilities:  vulns,
      critical_count:   cveRaw.critical_count ?? 0,
      high_count:       cveRaw.high_count ?? 0,
      medium_count:     cveRaw.medium_count ?? 0,
      low_count:        cveRaw.low_count ?? 0,
      highest_severity: cveRaw.highest_severity ?? 'NONE',
      software_detected: Array.isArray(cveRaw.software_detected)
                           ? cveRaw.software_detected.join(', ')
                           : (cveRaw.software_detected || 'None'),
    },
    ai_classification: {
      enabled:                aiRaw.enabled ?? false,
      classification:         aiRaw.classification ?? '',
      confidence:             aiRaw.confidence ?? 0,
      probability_malicious:  aiRaw.probability_malicious ?? 0,
      probability_benign:     aiRaw.probability_benign ?? 0,
      top_features:           aiRaw.top_features ?? [],
      disclaimer:             aiRaw.disclaimer ?? 'AI assists analysts, it does not replace them.',
    },
    overall_risk:    overallRisk,
    recommendations: report.recommendations || [],
  };
}

// ── PDF Generator — matches report_generator.py ───────────────────
function generatePDF(results) {
  const now      = new Date();
  const dateStr  = now.toLocaleString('en-US', { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' });
  const scanTime = now.toISOString().replace('T',' ').slice(0, 19);
  const scanId   = results.scan_id || `SC-${Date.now().toString(16).toUpperCase()}`;
  const threat   = results.threat_detected;
  const threatLevel = results.threat_level || (threat ? 'MALICIOUS' : 'CLEAN');
  const verdictColor = threat ? '#7a0000' : '#1a5c1a';
  const verdictText  = threat ? '⚠  THREAT DETECTED' : '✓  FILE IS CLEAN';
  const sevColor = getSevColor(threatLevel);
  const ai = results.ai_classification || {};
  const behavioral = results.behavioral || {};
  const cve = results.cve || {};
  const staticA = results.static_analysis || {};

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Sentinel Core — Scan Report</title>
<style>
  @page { size: A4; margin: 18mm; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: Helvetica, Arial, sans-serif; background:#080808; color:#cccccc; font-size:8pt; }
  .page-header { background:#7a0000; margin:-18mm -18mm 6mm -18mm; padding:5mm 18mm; display:flex; justify-content:space-between; align-items:center; }
  .page-header .logo { font-size:13pt; font-weight:bold; color:white; letter-spacing:1px; }
  .page-header .header-right { text-align:right; font-size:7pt; color:#ffcccc; }
  .verdict-banner { background:${verdictColor}; padding:12px; text-align:center; font-size:15pt; font-weight:bold; color:white; margin-bottom:3px; }
  .summary-strip { display:grid; grid-template-columns:repeat(4,1fr); background:#111; border:0.3px solid #2a2a2a; margin-bottom:10px; }
  .summary-cell { padding:5px 10px; border-right:0.3px solid #2a2a2a; }
  .summary-cell:last-child { border-right:none; }
  .summary-label { font-size:6pt; font-weight:bold; color:#888; text-transform:uppercase; margin-bottom:2px; }
  .summary-value { font-size:8pt; font-weight:bold; color:#ccc; }
  .sec-header { background:#7a0000; padding:7px 10px; font-size:9pt; font-weight:bold; color:white; margin-bottom:2px; }
  .kv-table { width:100%; border-collapse:collapse; margin-bottom:10px; }
  .kv-table tr:nth-child(even) { background:#141414; }
  .kv-table tr:nth-child(odd)  { background:#1a1a1a; }
  .kv-table td { padding:5px 10px; border:0.3px solid #2a2a2a; vertical-align:top; }
  .kv-label { font-size:7pt; font-weight:bold; color:#888; text-transform:uppercase; width:55mm; }
  .kv-value { font-size:8pt; color:#ccc; }
  .cve-counts { display:grid; grid-template-columns:repeat(4,1fr); background:#1a1a1a; border:0.3px solid #2a2a2a; margin-bottom:2px; text-align:center; }
  .cve-count-cell { padding:8px; border-right:0.3px solid #2a2a2a; }
  .cve-count-cell:last-child { border-right:none; }
  .cve-count-label { font-size:7pt; font-weight:bold; text-transform:uppercase; margin-bottom:4px; }
  .cve-count-num { font-size:14pt; font-weight:bold; }
  .cve-table { width:100%; border-collapse:collapse; margin-bottom:10px; font-size:7pt; }
  .cve-table th { background:#7a0000; color:white; padding:4px 6px; text-align:left; border:0.3px solid #2a2a2a; }
  .cve-table tr:nth-child(even) { background:#141414; }
  .cve-table tr:nth-child(odd)  { background:#1a1a1a; }
  .cve-table td { padding:4px 6px; border:0.3px solid #2a2a2a; vertical-align:top; }
  .ai-verdict-table { width:100%; border-collapse:collapse; background:#1a1a1a; margin-bottom:2px; }
  .ai-verdict-table td { padding:10px 12px; border:0.3px solid #2a2a2a; vertical-align:middle; }
  .prob-row { display:flex; align-items:center; background:#222; border:0.3px solid #2a2a2a; padding:4px 8px; gap:8px; margin-bottom:1px; }
  .prob-label { font-size:7pt; font-weight:bold; width:22mm; }
  .prob-bar-container { flex:1; background:#333; height:10px; border-radius:2px; overflow:hidden; }
  .prob-bar { height:100%; border-radius:2px; }
  .prob-pct { font-size:8pt; font-weight:bold; width:28mm; text-align:right; }
  .feat-table { width:100%; border-collapse:collapse; margin-top:4px; font-size:7pt; }
  .feat-table th { background:#7a0000; color:white; padding:4px 8px; text-align:left; border:0.3px solid #2a2a2a; }
  .feat-table tr:nth-child(even) { background:#141414; }
  .feat-table tr:nth-child(odd)  { background:#1a1a1a; }
  .feat-table td { padding:4px 8px; border:0.3px solid #2a2a2a; vertical-align:middle; }
  .behavior-grid { display:grid; grid-template-columns:1fr 1fr; gap:1px; margin-bottom:2px; }
  .behavior-row { display:flex; justify-content:space-between; align-items:center; background:#1a1a1a; padding:5px 10px; border:0.3px solid #2a2a2a; font-size:8pt; }
  .behavior-label { color:#888; }
  .rec-table { width:100%; border-collapse:collapse; margin-bottom:10px; }
  .rec-table tr:nth-child(even) { background:#141414; }
  .rec-table tr:nth-child(odd)  { background:#1a1a1a; }
  .rec-table td { padding:6px 8px; border:0.3px solid #2a2a2a; font-size:8pt; }
  .rec-arrow { color:#ff4444; font-weight:bold; font-size:9pt; text-align:center; width:8mm; }
  .disclaimer { background:#0a0a0a; border-top:0.5px solid #7a0000; padding:6px 10px; font-size:7pt; color:#555; font-style:italic; margin-top:4px; }
  .page-footer { background:#111; margin:6mm -18mm -18mm -18mm; padding:3mm 18mm; display:flex; justify-content:space-between; font-size:6pt; color:#555; }
  .risk-factors { background:#1a1a1a; border:0.3px solid #2a2a2a; padding:6px 10px; margin-bottom:10px; }
  .risk-factors-title { font-size:7pt; font-weight:bold; color:#888; text-transform:uppercase; margin-bottom:6px; }
</style>
</head>
<body>

<div class="page-header">
  <div class="logo">SENTINEL CORE</div>
  <div class="header-right">
    <div>AI-Driven Malware Analysis Platform</div>
    <div>Confidential — Generated ${dateStr}</div>
  </div>
</div>

<div class="verdict-banner">${verdictText}</div>

<div class="summary-strip">
  <div class="summary-cell">
    <div class="summary-label">Filename</div>
    <div class="summary-value">${(results.file_name||'Unknown').slice(0,35)}</div>
  </div>
  <div class="summary-cell">
    <div class="summary-label">Threat Level</div>
    <div class="summary-value" style="color:${sevColor}">${threatLevel}</div>
  </div>
  <div class="summary-cell">
    <div class="summary-label">Scan Time</div>
    <div class="summary-value">${scanTime}</div>
  </div>
  <div class="summary-cell">
    <div class="summary-label">Scan ID</div>
    <div class="summary-value" style="color:#888">${scanId.slice(0,20)}</div>
  </div>
</div>

<!-- FILE INFORMATION -->
<div class="sec-header">📁  FILE INFORMATION</div>
<table class="kv-table">
  <tr><td class="kv-label">Filename</td><td class="kv-value">${results.file_name||'N/A'}</td></tr>
  <tr><td class="kv-label">File Hash MD5</td><td class="kv-value">${results.hashes?.md5||'N/A'}</td></tr>
  <tr><td class="kv-label">SHA-256</td><td class="kv-value">${results.hashes?.sha256||'N/A'}</td></tr>
  <tr><td class="kv-label">File Size</td><td class="kv-value">${((results.file_size||0)/1024).toFixed(2)} KB</td></tr>
  <tr><td class="kv-label">Scan Date</td><td class="kv-value">${scanTime}</td></tr>
  <tr><td class="kv-label">Scan ID</td><td class="kv-value">${scanId}</td></tr>
  <tr style="background:${threat?'#2a0000':'#001a00'}">
    <td class="kv-label">Threat Level</td>
    <td class="kv-value" style="color:${sevColor};font-weight:bold">${threatLevel}</td>
  </tr>
  <tr><td class="kv-label">Threat Name</td><td class="kv-value">${results.threat_name||'None detected'}</td></tr>
</table>

<!-- STATIC ANALYSIS -->
<div class="sec-header">⚡  STATIC ANALYSIS</div>
<table class="kv-table">
  <tr>
    <td class="kv-label">Risk Score</td>
    <td class="kv-value" style="color:${getSevColor(staticA.risk_score>=70?'HIGH':staticA.risk_score>=40?'MEDIUM':'LOW')};font-weight:bold">
      ${staticA.risk_score||0}/100 ${staticA.risk_score>=70?'HIGH':staticA.risk_score>=40?'MEDIUM':'LOW'}
    </td>
  </tr>
  <tr><td class="kv-label">Entropy</td><td class="kv-value">${staticA.entropy||0} / 8.0</td></tr>
  <tr><td class="kv-label">Strings Extracted</td><td class="kv-value">${staticA.strings_extracted||'N/A'}</td></tr>
  <tr><td class="kv-label">Suspicious Strings</td><td class="kv-value">${staticA.suspicious_strings||0}</td></tr>
  <tr><td class="kv-label">PE File</td><td class="kv-value">${staticA.is_pe?'Yes — Portable Executable':'No'}</td></tr>
  <tr><td class="kv-label">Total Imports</td><td class="kv-value">${staticA.total_imports||'N/A'}</td></tr>
  <tr><td class="kv-label">Suspicious Imports</td><td class="kv-value">${staticA.suspicious_imports||0}</td></tr>
  <tr><td class="kv-label">PE Sections</td><td class="kv-value">${staticA.pe_sections||'N/A'}</td></tr>
  <tr><td class="kv-label">Suspicious Sections</td><td class="kv-value">${staticA.suspicious_sections||'N/A'}</td></tr>
  <tr><td class="kv-label">Entry Point</td><td class="kv-value">${staticA.entry_point||'N/A'}</td></tr>
  <tr><td class="kv-label">Compile Time</td><td class="kv-value">${staticA.compile_time||'N/A'}</td></tr>
</table>
${staticA.suspicious_patterns?.length ? `
<div class="risk-factors">
  <div class="risk-factors-title">RISK FACTORS</div>
  ${staticA.suspicious_patterns.map(p=>`<div style="padding:2px 0;color:#cc7700">■ ${p}</div>`).join('')}
</div>` : ''}

<!-- BEHAVIORAL ANALYSIS -->
<div class="sec-header">🧠  BEHAVIORAL ANALYSIS</div>
<table class="kv-table" style="margin-bottom:4px">
  <tr>
    <td class="kv-label">Behavioral Score</td>
    <td class="kv-value" style="color:${getSevColor(behavioral.risk_score>=70?'HIGH':behavioral.risk_score>=40?'MEDIUM':'LOW')};font-weight:bold">
      ${behavioral.risk_score||0}/100 ${behavioral.risk_score>=70?'HIGH':behavioral.risk_score>=40?'MEDIUM':'MINIMAL'}
    </td>
  </tr>
</table>
<div class="behavior-grid">
  ${[
    ['Process Creation',     behavioral.process_creation,    false],
    ['Process Injection',    behavioral.process_injection,   false],
    ['Persistence',          behavioral.persistence,         false],
    ['File System',          behavioral.file_system,         false],
    ['Network Activity',     behavioral.network_activity,    false],
    ['Crypto',               behavioral.crypto,              false],
    ['Anti Debug',           behavioral.anti_debug,          false],
    ['Keylogging',           behavioral.keylogging,          true],
    ['Screenshot',           behavioral.screenshot,          false],
    ['C2 Indicators',        behavioral.c2_indicators,       true],
    ['Registry Modification',behavioral.registry_modification,true],
    ['Persistence Attempt',  behavioral.persistence_attempt, true],
    ['File Deletion',        behavioral.file_deletion,       true],
  ].map(([label, val, isDanger]) => `
  <div class="behavior-row">
    <span class="behavior-label">${label}</span>
    <span style="font-weight:bold;color:${val?(isDanger?'#ff4444':'#cc7700'):'#44cc44'}">
      ${val?(typeof val==='string'?`✓ ${val}`:'✓ Detected'):'— Not detected'}
    </span>
  </div>`).join('')}
</div>
${behavioral.suspicious_apis?.length ? `
<div class="risk-factors" style="margin-top:1px">
  <div class="risk-factors-title">Detected Behaviors</div>
  ${behavioral.suspicious_apis.map(a=>`<div style="padding:2px 0;color:#ff4444">■ ${a}</div>`).join('')}
</div>` : '<div style="margin-bottom:10px"></div>'}

<!-- CVE INTELLIGENCE -->
<div class="sec-header">🌐  CVE INTELLIGENCE</div>
<div class="cve-counts">
  <div class="cve-count-cell"><div class="cve-count-label" style="color:#ff4444">CRITICAL</div><div class="cve-count-num" style="color:#ff4444">${cve.critical_count||0}</div></div>
  <div class="cve-count-cell"><div class="cve-count-label" style="color:#cc7700">HIGH</div><div class="cve-count-num" style="color:#cc7700">${cve.high_count||0}</div></div>
  <div class="cve-count-cell"><div class="cve-count-label" style="color:#ccaa00">MEDIUM</div><div class="cve-count-num" style="color:#ccaa00">${cve.medium_count||0}</div></div>
  <div class="cve-count-cell"><div class="cve-count-label" style="color:#44cc44">LOW</div><div class="cve-count-num" style="color:#44cc44">${cve.low_count||0}</div></div>
</div>
<table class="kv-table">
  <tr><td class="kv-label">Total CVEs Found</td>
    <td class="kv-value" style="color:${(cve.vulnerabilities?.length||0)>5?'#ff4444':(cve.vulnerabilities?.length||0)>0?'#cc7700':'#44cc44'};font-weight:bold">
      ${cve.vulnerabilities?.length||0}
    </td>
  </tr>
  <tr><td class="kv-label">Highest Severity</td>
    <td class="kv-value" style="color:${getSevColor(cve.highest_severity||'NONE')};font-weight:bold">${cve.highest_severity||'NONE'}</td>
  </tr>
  <tr><td class="kv-label">Software Detected</td><td class="kv-value">${cve.software_detected||'None'}</td></tr>
</table>
${cve.vulnerabilities?.length ? `
<table class="cve-table">
  <thead><tr><th style="width:35mm">CVE ID</th><th style="width:20mm">Severity</th><th style="width:14mm">CVSS</th><th>Description</th></tr></thead>
  <tbody>
    ${cve.vulnerabilities.slice(0,8).map(v=>`
    <tr>
      <td style="font-family:monospace">${v.id||'N/A'}</td>
      <td style="color:${getSevColor(v.severity)};font-weight:bold">${v.severity||'N/A'}</td>
      <td>${v.cvss||'N/A'}</td>
      <td>${(v.description||'').slice(0,90)}${(v.description||'').length>90?'…':''}</td>
    </tr>`).join('')}
  </tbody>
</table>` : ''}

<!-- AI CLASSIFICATION -->
${ai.classification ? `
<div class="sec-header">🤖  AI THREAT CLASSIFICATION</div>
<table class="ai-verdict-table">
  <tr>
    <td style="width:35mm"><div style="font-size:7pt;font-weight:bold;color:#888;text-transform:uppercase">AI VERDICT</div></td>
    <td style="width:60mm"><div style="font-size:20pt;font-weight:bold;text-align:center;color:${getSevColor(ai.classification)}">${ai.classification}</div></td>
    <td><div style="font-size:9pt;font-weight:bold;text-align:center;color:${getSevColor(ai.classification)}">Confidence<br>${ai.confidence||0}%</div></td>
  </tr>
</table>
<div style="margin-bottom:2px">
  <div class="prob-row">
    <span class="prob-label" style="color:#ff4444">Malicious</span>
    <div class="prob-bar-container"><div class="prob-bar" style="width:${ai.probability_malicious||0}%;background:#ff4444"></div></div>
    <span class="prob-pct" style="color:#ff4444">${ai.probability_malicious||0}%</span>
  </div>
  <div class="prob-row">
    <span class="prob-label" style="color:#44cc44">Benign</span>
    <div class="prob-bar-container"><div class="prob-bar" style="width:${ai.probability_benign||0}%;background:#44cc44"></div></div>
    <span class="prob-pct" style="color:#44cc44">${ai.probability_benign||0}%</span>
  </div>
</div>
${ai.top_features?.length ? `
<div style="font-size:7pt;font-weight:bold;color:#888;text-transform:uppercase;margin:6px 0 2px">TOP CONTRIBUTING FEATURES</div>
<table class="feat-table">
  <thead><tr><th style="width:65mm">Feature</th><th style="width:20mm">Importance</th><th>Visual</th></tr></thead>
  <tbody>
    ${ai.top_features.map(f=>`
    <tr>
      <td>${String(f.feature||'').replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</td>
      <td style="color:#cc7700;font-weight:bold">${f.importance}%</td>
      <td><div style="background:#222;height:8px;border-radius:2px;overflow:hidden"><div style="width:${f.importance}%;height:100%;background:#cc7700;border-radius:2px"></div></div></td>
    </tr>`).join('')}
  </tbody>
</table>` : ''}
<div class="disclaimer">💡  ${ai.disclaimer||'AI assists analysts, it does not replace them.'}</div>
` : ''}

<!-- RECOMMENDATIONS -->
<div class="sec-header">💡  RECOMMENDATIONS</div>
<table class="rec-table">
  ${(results.recommendations||['File appears safe to use','No immediate action required']).map(r=>`
  <tr><td class="rec-arrow">→</td><td>${r}</td></tr>`).join('')}
</table>

<div class="page-footer">
  <span>File: ${results.file_name||'N/A'}   |   Scan ID: ${scanId}</span>
  <span>Sentinel Core — AI-Driven Malware Analysis Platform</span>
</div>

</body>
</html>`;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
    setTimeout(() => win.print(), 800);
  }
}

// ── Scanner Component ─────────────────────────────────────────────
function Scanner() {
  const [file, setFile]                 = useState(null);
  const [scanning, setScanning]         = useState(false);
  const [results, setResults]           = useState(null);
  const [error, setError]               = useState('');
  const [progress, setProgress]         = useState(0);
  const [currentStage, setCurrentStage] = useState(-1);
  const [stageDesc, setStageDesc]       = useState('');
  const [backendStep, setBackendStep]   = useState('');

  const handleDragOver  = (e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); };
  const handleDragLeave = (e) => { e.currentTarget.classList.remove('drag-over'); };
  const handleDrop = (e) => {
    e.preventDefault(); e.currentTarget.classList.remove('drag-over');
    const f = e.dataTransfer.files[0];
    if (f) { setFile(f); setError(''); setResults(null); }
  };
  const handleFileInput = (e) => {
    const f = e.target.files[0];
    if (f) { setFile(f); setError(''); setResults(null); }
  };

  const startScan = async () => {
    if (!file) { setError('Please select a file first'); return; }
    setScanning(true); setError(''); setResults(null);
    setProgress(0); setCurrentStage(0); setStageDesc(STAGES[0].desc);

    try {
      // ── Step 1: Upload file ──────────────────────────────────────
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await axios.post(`${API_URL}/api/scan`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const scanId = uploadRes.data.scan_id;
      console.log('[SCAN] Started, scan_id:', scanId);

      // ── Step 2: Poll /api/status until complete ──────────────────
      let completed = false;
      let attempts  = 0;
      const maxAttempts = 120; // 2 minutes max

      while (!completed && attempts < maxAttempts) {
        await new Promise(r => setTimeout(r, 1000));
        attempts++;

        const statusRes = await axios.get(`${API_URL}/api/status/${scanId}`);
        const status    = statusRes.data;

        // Map backend progress (0-100) to stage indicators
        const backendProg = status.progress || 0;
        const stageIndex  = Math.min(
          Math.floor((backendProg / 100) * STAGES.length),
          STAGES.length - 1
        );

        setProgress(backendProg);
        setCurrentStage(stageIndex);
        setStageDesc(STAGES[stageIndex]?.desc || '');
        setBackendStep(status.current_step || '');

        if (status.status === 'completed') {
          completed = true;
        } else if (status.status === 'failed') {
          throw new Error(status.error || 'Scan failed on the backend');
        }
      }

      if (!completed) throw new Error('Scan timed out — please try again');

      // ── Step 3: Fetch full report ────────────────────────────────
      const reportRes = await axios.get(`${API_URL}/api/report/${scanId}`);
      const rawReport = reportRes.data.report;

      // Map backend format → dashboard format
      const mapped = mapReport(rawReport);
      setResults(mapped);
      setProgress(100);
      setCurrentStage(STAGES.length - 1);

    } catch (err) {
      console.error('[SCAN ERROR]', err);
      setError(err.response?.data?.error || err.message || 'Scan failed — is the backend running?');
    } finally {
      setScanning(false);
      setCurrentStage(-1);
    }
  };

  const risk = results ? getRiskLevel(results.overall_risk) : null;

  return (
    <div className="scanner">
      <motion.h1 initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
        File Scanner
      </motion.h1>
      <motion.p className="scanner-subtitle" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6, delay:0.1 }}>
        Upload a file to run a full multi-layer threat analysis
      </motion.p>

      {/* Supported Formats */}
      <motion.div className="formats-section" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}>
        <p className="formats-label">Supported Formats</p>
        <div className="formats-list">
          {SUPPORTED_FORMATS.map((f, idx) => (
            <div key={idx} className="format-badge" title={f.desc}>{f.ext}</div>
          ))}
        </div>
      </motion.div>

      {/* Upload Zone */}
      <motion.div className="upload-section" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.15 }}>
        <div className="drag-drop-zone" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
          <div className="drag-drop-content">
            <div className="upload-icon">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
                <rect x="10" y="8" width="44" height="48" rx="6" stroke="#dc2626" strokeWidth="2.5" fill="rgba(220,38,38,0.08)"/>
                <path d="M32 44V28M32 28L26 34M32 28L38 34" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="22" y1="48" x2="42" y2="48" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
              </svg>
            </div>
            <p className="drag-text">Drag & drop your file here</p>
            <p className="or-text">— or —</p>
            <label className="file-input-label">
              Browse Files
              <input type="file" onChange={handleFileInput} className="file-input" disabled={scanning} />
            </label>
          </div>
        </div>

        <AnimatePresence>
          {file && (
            <motion.div className="selected-file" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}>
              <div className="selected-file-info">
                <span className="selected-file-icon">📄</span>
                <div>
                  <p className="selected-file-name">{file.name}</p>
                  <p className="selected-file-size">{(file.size/1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button onClick={() => { setFile(null); setResults(null); }} className="remove-btn" disabled={scanning}>✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div className="error-message" initial={{ opacity:0 }} animate={{ opacity:1 }}>⚠️ {error}</motion.div>
        )}
      </motion.div>

      {/* Scan Button */}
      <motion.button
        className={`start-scan ${scanning ? 'scanning' : ''}`}
        onClick={startScan}
        disabled={!file || scanning}
        whileHover={!scanning && file ? { scale:1.02 } : {}}
        whileTap={!scanning && file ? { scale:0.98 } : {}}
      >
        {scanning
          ? <span className="scanning-text"><span className="scanning-dot"/>Scanning in progress...</span>
          : 'Start Scan'}
      </motion.button>

      {/* Progress */}
      <AnimatePresence>
        {scanning && (
          <motion.div className="progress-section" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
            <div className="progress-header">
              <span className="progress-label">Analysis Progress</span>
              <span className="progress-pct">{progress}%</span>
            </div>
            <div className="progress-bar-container">
              <motion.div className="progress-bar" initial={{ width:0 }} animate={{ width:`${progress}%` }} transition={{ duration:0.4 }}/>
            </div>
            {/* Show real backend step */}
            <p className="stage-desc-text">{backendStep || stageDesc}</p>
            <div className="stages">
              {STAGES.map((stage, idx) => (
                <div key={idx} className={`stage ${idx < currentStage?'done':''} ${idx===currentStage?'active':''}`}>
                  <div className="stage-icon">{idx < currentStage ? '✓' : stage.icon}</div>
                  <div className="stage-label">{stage.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {results && !scanning && (
          <motion.div className="results-section" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <div className="results-header">
              <h2>Scan Complete</h2>
              <div className="overall-risk" style={{ background:risk.bg, borderColor:risk.color }}>
                <div className="risk-score-big" style={{ color:risk.color }}>{results.overall_risk}</div>
                <div className="risk-score-sub">/ 100</div>
                <div className="risk-label" style={{ color:risk.color }}>{risk.label} RISK</div>
              </div>
            </div>

            <div className="recommendation-box">
              <span className="rec-icon">📋</span>
              <p>{results.recommendations?.[0] || 'No recommendation available'}</p>
            </div>

            <div className="analysis-grid">
              {/* Hashes */}
              <div className="analysis-card">
                <div className="card-header"><span className="card-icon">🔐</span><h3>Cryptographic Hashes</h3></div>
                <div className="hash-list">
                  {Object.entries(results.hashes).map(([key, val]) => (
                    <div key={key} className="hash-item">
                      <span className="hash-key">{key.toUpperCase()}</span>
                      <code className="hash-val">{val}</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Static */}
              <div className="analysis-card">
                <div className="card-header">
                  <span className="card-icon">⚡</span><h3>Static Analysis</h3>
                  <span className="card-score" style={{ color:getRiskLevel(results.static_analysis.risk_score).color }}>
                    {results.static_analysis.risk_score}/100
                  </span>
                </div>
                <div className="metric-row"><span>Entropy</span><strong>{results.static_analysis.entropy}</strong></div>
                <div className="metric-row"><span>Risk Score</span><strong>{results.static_analysis.risk_score}/100</strong></div>
                <div className="metric-row"><span>PE File</span><strong>{results.static_analysis.is_pe ? 'Yes' : 'No'}</strong></div>
                <div className="metric-row"><span>Suspicious Imports</span><strong>{results.static_analysis.suspicious_imports}</strong></div>
                <div className="tag-list">
                  {results.static_analysis.suspicious_patterns?.slice(0,3).map((p,i) => (
                    <span key={i} className="tag tag-warning">⚠️ {p}</span>
                  ))}
                </div>
              </div>

              {/* Behavioral */}
              <div className="analysis-card">
                <div className="card-header">
                  <span className="card-icon">🧠</span><h3>Behavioral Analysis</h3>
                  <span className="card-score" style={{ color:getRiskLevel(results.behavioral.risk_score).color }}>
                    {results.behavioral.risk_score}/100
                  </span>
                </div>
                <div className="metric-row"><span>Risk Score</span><strong>{results.behavioral.risk_score}/100</strong></div>
                <div className="metric-row"><span>C2 Indicators</span><strong style={{ color:results.behavioral.c2_indicators?'#ff4444':'#44cc44' }}>{results.behavioral.c2_indicators?'Detected':'None'}</strong></div>
                <div className="metric-row"><span>Persistence</span><strong style={{ color:results.behavioral.persistence?'#ff4444':'#44cc44' }}>{results.behavioral.persistence?'Detected':'None'}</strong></div>
                <div className="tag-list">
                  {results.behavioral.suspicious_apis?.slice(0,4).map((api,i) => (
                    <span key={i} className="tag tag-danger">🔴 {api}</span>
                  ))}
                </div>
              </div>

              {/* CVE */}
              <div className="analysis-card">
                <div className="card-header">
                  <span className="card-icon">🌐</span><h3>CVE Intelligence</h3>
                  <span className="card-score" style={{ color:getRiskLevel(results.cve.risk_score).color }}>
                    {results.cve.risk_score}/100
                  </span>
                </div>
                <div className="metric-row"><span>Vulnerabilities</span><strong>{results.cve.vulnerabilities?.length||0} found</strong></div>
                <div className="metric-row"><span>Highest Severity</span>
                  <strong style={{ color:getSevColor(results.cve.highest_severity) }}>{results.cve.highest_severity||'NONE'}</strong>
                </div>
                <div className="metric-row"><span>Critical</span><strong style={{ color:'#ff4444' }}>{results.cve.critical_count||0}</strong></div>
                <div className="metric-row"><span>High</span><strong style={{ color:'#cc7700' }}>{results.cve.high_count||0}</strong></div>
                <div className="vuln-list">
                  {results.cve.vulnerabilities?.slice(0,3).map((v,i) => (
                    <div key={i} className="vuln-item">
                      <span className="vuln-id">{v.id}</span>
                      <span className="vuln-cvss">CVSS {v.cvss}</span>
                      <span className={`vuln-sev sev-${(v.severity||'').toLowerCase()}`}>{v.severity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI */}
              {results.ai_classification?.classification && (
                <div className="analysis-card" style={{ gridColumn:'1 / -1' }}>
                  <div className="card-header">
                    <span className="card-icon">🤖</span><h3>AI Threat Classification</h3>
                    <span className="card-score" style={{ color:getSevColor(results.ai_classification.classification) }}>
                      {results.ai_classification.classification} — {results.ai_classification.confidence}% confidence
                    </span>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                    <div>
                      <div className="metric-row"><span>Verdict</span><strong style={{ color:getSevColor(results.ai_classification.classification) }}>{results.ai_classification.classification}</strong></div>
                      <div className="metric-row"><span>Malicious Probability</span><strong style={{ color:'#ff4444' }}>{results.ai_classification.probability_malicious}%</strong></div>
                      <div className="metric-row"><span>Benign Probability</span><strong style={{ color:'#44cc44' }}>{results.ai_classification.probability_benign}%</strong></div>
                    </div>
                    <div>
                      {results.ai_classification.top_features?.slice(0,3).map((f,i) => (
                        <div key={i} className="metric-row">
                          <span>{String(f.feature||'').replace(/_/g,' ')}</span>
                          <strong style={{ color:'#cc7700' }}>{f.importance}%</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <motion.button
              className="download-report-btn"
              onClick={() => generatePDF(results)}
              whileHover={{ scale:1.03 }}
              whileTap={{ scale:0.97 }}
            >
              📥 Download PDF Report
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Scanner;
