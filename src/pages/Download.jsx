import { motion } from 'framer-motion';
import '../styles/Download.css';

function Download() {
  const requirements = [
    {
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
          <rect x="8" y="12" width="48" height="34" rx="4" stroke="#dc2626" strokeWidth="2.5" fill="rgba(220,38,38,0.08)"/>
          <line x1="20" y1="52" x2="44" y2="52" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="32" y1="46" x2="32" y2="52" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="14" y="18" width="36" height="22" rx="2" fill="rgba(220,38,38,0.1)" stroke="#dc2626" strokeWidth="1.5"/>
        </svg>
      ),
      title: 'Windows 10+',
      desc: 'Windows OS required'
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
          <rect x="12" y="8" width="40" height="48" rx="4" stroke="#dc2626" strokeWidth="2.5" fill="rgba(220,38,38,0.08)"/>
          <line x1="20" y1="20" x2="44" y2="20" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
          <line x1="20" y1="28" x2="44" y2="28" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
          <line x1="20" y1="36" x2="36" y2="36" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="44" cy="44" r="6" stroke="#dc2626" strokeWidth="2" fill="rgba(220,38,38,0.15)"/>
          <line x1="44" y1="41" x2="44" y2="44" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="44" cy="46.5" r="1.5" fill="#dc2626"/>
        </svg>
      ),
      title: '100 MB',
      desc: 'Free disk space'
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
          <rect x="10" y="16" width="44" height="32" rx="4" stroke="#dc2626" strokeWidth="2.5" fill="rgba(220,38,38,0.08)"/>
          <path d="M20 32 L26 26 L32 32 L38 24 L44 30" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="20" cy="32" r="2.5" fill="#dc2626"/>
          <circle cx="44" cy="30" r="2.5" fill="#dc2626"/>
        </svg>
      ),
      title: 'Python 3.8+',
      desc: 'For backend operations'
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
          <circle cx="32" cy="32" r="22" stroke="#dc2626" strokeWidth="2.5" fill="rgba(220,38,38,0.08)"/>
          <ellipse cx="32" cy="32" rx="10" ry="22" stroke="#dc2626" strokeWidth="2"/>
          <line x1="10" y1="32" x2="54" y2="32" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
          <path d="M14 20 Q32 26 50 20" stroke="#dc2626" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M14 44 Q32 38 50 44" stroke="#dc2626" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Internet',
      desc: 'For CVE threat intelligence'
    },
  ];

  const features = [
    {
      text: 'Real-time file scanning',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <circle cx="32" cy="32" r="20" stroke="#dc2626" strokeWidth="3" fill="rgba(220,38,38,0.1)"/>
          <path d="M32 20 L32 32 L40 36" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="32" cy="32" r="3" fill="#dc2626"/>
        </svg>
      )
    },
    {
      text: 'Hash verification (MD5, SHA1, SHA256)',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <rect x="8" y="20" width="48" height="32" rx="4" stroke="#dc2626" strokeWidth="3" fill="rgba(220,38,38,0.1)"/>
          <path d="M20 20V16a12 12 0 0124 0v4" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="32" cy="36" r="5" fill="#dc2626" fillOpacity="0.8"/>
          <line x1="32" y1="41" x2="32" y2="46" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      text: 'Static analysis with entropy detection',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <rect x="10" y="8" width="44" height="48" rx="4" stroke="#dc2626" strokeWidth="3" fill="rgba(220,38,38,0.1)"/>
          <line x1="18" y1="22" x2="46" y2="22" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="18" y1="30" x2="46" y2="30" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="18" y1="38" x2="34" y2="38" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      text: 'Behavioral API inspection',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <circle cx="32" cy="32" r="20" stroke="#dc2626" strokeWidth="3" fill="rgba(220,38,38,0.1)"/>
          <path d="M22 32 L28 38 L42 24" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      text: 'CVE threat intelligence (NVD API)',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <circle cx="32" cy="32" r="20" stroke="#dc2626" strokeWidth="3" fill="rgba(220,38,38,0.1)"/>
          <ellipse cx="32" cy="32" rx="9" ry="20" stroke="#dc2626" strokeWidth="2"/>
          <line x1="12" y1="32" x2="52" y2="32" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      text: 'AI-powered threat scoring',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <rect x="16" y="20" width="32" height="28" rx="6" stroke="#dc2626" strokeWidth="3" fill="rgba(220,38,38,0.1)"/>
          <circle cx="24" cy="32" r="3" fill="#dc2626"/>
          <circle cx="32" cy="32" r="3" fill="#dc2626"/>
          <circle cx="40" cy="32" r="3" fill="#dc2626"/>
          <line x1="24" y1="20" x2="24" y2="14" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="40" y1="20" x2="40" y2="14" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="32" y1="48" x2="32" y2="54" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      text: 'PDF, DOCX & Audio file support',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <rect x="12" y="8" width="40" height="48" rx="4" stroke="#dc2626" strokeWidth="3" fill="rgba(220,38,38,0.1)"/>
          <path d="M22 8 L22 22 L36 22" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="20" y1="32" x2="44" y2="32" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
          <line x1="20" y1="40" x2="44" y2="40" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      text: 'Detailed PDF reports',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <rect x="10" y="8" width="44" height="48" rx="4" stroke="#dc2626" strokeWidth="3" fill="rgba(220,38,38,0.1)"/>
          <line x1="18" y1="22" x2="46" y2="22" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="18" y1="30" x2="46" y2="30" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="18" y1="38" x2="46" y2="38" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="18" y1="46" x2="32" y2="46" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      )
    },
  ];

  const platforms = [
    {
      name: 'Windows',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg',
      available: true,
    },
    {
      name: 'macOS',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg',
      available: false,
    },
    {
      name: 'Android',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
      available: false,
    },
    {
      name: 'iOS',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg',
      available: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="download-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Download Sentinel Core
      </motion.h1>

      {/* Platform Notice */}
      <motion.div
        className="platform-notice"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="platform-notice-inner">
          <div className="platform-row">
            {platforms.map((p, idx) => (
              <div key={idx} className="platform-item-simple">
                <img src={p.logo} alt={p.name} className="platform-logo-simple" />
                <span className="platform-name-simple">{p.name}</span>
                <span className={`platform-badge ${p.available ? 'available-badge' : 'coming-badge'}`}>
                  {p.available ? 'Available' : 'Coming Soon'}
                </span>
              </div>
            ))}
          </div>
          <p className="platform-note">
            💡 Mac, Android & iOS users can still scan files using the{' '}
            <strong>Web Scanner</strong> — no download needed!
          </p>
        </div>
      </motion.div>

      {/* Download Cards */}
      <motion.section
        className="download-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="download-card featured" variants={itemVariants} whileHover={{ y: -8 }}>
          <div className="download-icon">📦</div>
          <h2>Executable</h2>
          <p className="version">v1.0 | Latest Release</p>
          <div className="card-buttons">
            <div className="info-tag windows-tag-btn">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg"
                alt="Windows"
                width="16"
              />
              Windows Only
            </div>
            <motion.a
              href="https://github.com/SyedMusa604/sentinel-core/releases/download/v1.0/SentinelCore.exe"
              className="action-btn primary-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              download
            >
              📥 Download .exe
            </motion.a>
          </div>
          <p className="file-size">≈ 15 MB</p>
          <p className="download-note">Download logo.png & logo.ico from release — place all in same folder</p>
        </motion.div>

        <motion.div className="download-card" variants={itemVariants} whileHover={{ y: -8 }}>
          <div className="download-icon">📁</div>
          <h2>Run from Source</h2>
          <p className="version">Development Setup</p>
          <div className="card-buttons">
            <div className="info-tag cross-tag-btn">
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/github.png"
                alt="GitHub"
                width="16"
              />
              Cross Platform
            </div>
            <motion.a
              href="https://github.com/SyedMusa604/sentinel-core"
              target="_blank"
              rel="noreferrer"
              className="action-btn secondary-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔗 View on GitHub
            </motion.a>
          </div>
          <p className="file-size">Clone & Setup Required</p>
          <p className="download-note">Python 3.11+ required</p>
        </motion.div>
      </motion.section>

      {/* System Requirements */}
      <section className="requirements">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          System Requirements
        </motion.h2>
        <motion.div
          className="requirements-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {requirements.map((req, idx) => (
            <motion.div
              key={idx}
              className="requirement-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="req-icon">{req.icon}</div>
              <h3>{req.title}</h3>
              <p>{req.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Installation */}
      <motion.section
        className="installation"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Installation</h2>
        <div className="tabs">
          <div className="tab-content">
            <h3>📦 Executable</h3>
            <ol>
              <li>Download <code>SentinelCore.exe</code></li>
              <li>Also download <code>logo.png</code> and <code>logo.ico</code> from the release</li>
              <li>Place all 3 files in the same folder</li>
              <li>Run <code>SentinelCore.exe</code></li>
              <li>Grant permissions when prompted</li>
              <li>Ready to scan!</li>
            </ol>
          </div>
          <div className="tab-content">
            <h3>🔧 From Source</h3>
            <ol>
              <li>Clone the repo:
                <code>git clone https://github.com/SyedMusa604/sentinel-core.git</code>
              </li>
              <li>Install deps:
                <code>pip install -r requirements.txt</code>
              </li>
              <li>Add your NVD API key to <code>.env</code></li>
              <li>Run backend:
                <code>python flask_backend_api.py</code>
              </li>
              <li>Run GUI:
                <code>python app.py</code>
              </li>
            </ol>
          </div>
        </div>
      </motion.section>

      {/* What You Get */}
      <motion.section
        className="features-highlight"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2>What You Get</h2>
        <div className="feature-list">
          {features.map((f, idx) => (
            <div key={idx} className="feature-item">
              <span className="feature-item-icon">{f.svg}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Support */}
      <motion.section
        className="support"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Need Help?</h2>
        <p>Having trouble? Check out the GitHub repo or report an issue.</p>
        <div className="support-links">
          <a href="https://github.com/SyedMusa604/sentinel-core" target="_blank" rel="noreferrer" className="support-link">📖 Documentation</a>
          <a href="https://github.com/SyedMusa604/sentinel-core/issues" target="_blank" rel="noreferrer" className="support-link">🐛 Report Issue</a>
          <a href="https://github.com/SyedMusa604/sentinel-core" target="_blank" rel="noreferrer" className="support-link">⭐ Star on GitHub</a>
        </div>
      </motion.section>
    </div>
  );
}

export default Download;