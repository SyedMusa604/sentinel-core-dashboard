import { motion } from 'framer-motion';
import '../styles/Download.css';

function Download() {
  const requirements = [
    { icon: '💻', title: 'Windows 10+', desc: 'Windows OS required' },
    { icon: '💾', title: '100 MB', desc: 'Free disk space' },
    { icon: '⚙️', title: 'Python 3.8+', desc: 'For backend operations' },
    { icon: '🌐', title: 'Internet', desc: 'For CVE threat intelligence' },
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
            <span className="platform-item available">
              <span className="platform-icon">🪟</span>
              <span>Windows</span>
              <span className="platform-badge available-badge">Available</span>
            </span>
            <span className="platform-divider">|</span>
            <span className="platform-item coming">
              <span className="platform-icon">🍎</span>
              <span>macOS</span>
              <span className="platform-badge coming-badge">Coming Soon</span>
            </span>
            <span className="platform-divider">|</span>
            <span className="platform-item coming">
              <span className="platform-icon">🤖</span>
              <span>Android</span>
              <span className="platform-badge coming-badge">Coming Soon</span>
            </span>
            <span className="platform-divider">|</span>
            <span className="platform-item coming">
              <span className="platform-icon">📱</span>
              <span>iOS</span>
              <span className="platform-badge coming-badge">Coming Soon</span>
            </span>
          </div>
          <p className="platform-note">
            💡 Mac, Android & iOS users can still scan files using the <strong>Web Scanner</strong> above — no download needed!
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
          <div className="windows-only-badge">🪟 Windows Only</div>
          <motion.a
            href="https://github.com/SyedMusa604/sentinel-core/releases/download/v1.0/SentinelCore.exe"
            className="download-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            download
          >
            📥 Download .exe
          </motion.a>
          <p className="file-size">≈ 15 MB</p>
          <p className="download-note">Includes logo files — place all in same folder</p>
        </motion.div>

        <motion.div className="download-card" variants={itemVariants} whileHover={{ y: -8 }}>
          <div className="download-icon">📁</div>
          <h2>Run from Source</h2>
          <p className="version">Development Setup</p>
          <div className="windows-only-badge cross-platform">🌐 Cross Platform</div>
          <motion.a
            href="https://github.com/SyedMusa604/sentinel-core"
            target="_blank"
            rel="noreferrer"
            className="download-btn secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔗 View on GitHub
          </motion.a>
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

      {/* Features */}
      <motion.section
        className="features-highlight"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2>What You Get</h2>
        <div className="feature-list">
          <div className="feature-item">✅ Real-time file scanning</div>
          <div className="feature-item">✅ Hash verification (MD5, SHA1, SHA256)</div>
          <div className="feature-item">✅ Static analysis with entropy detection</div>
          <div className="feature-item">✅ Behavioral API inspection</div>
          <div className="feature-item">✅ CVE threat intelligence (NVD API)</div>
          <div className="feature-item">✅ AI-powered threat scoring</div>
          <div className="feature-item">✅ PDF, DOCX & Audio file support</div>
          <div className="feature-item">✅ Detailed PDF reports</div>
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