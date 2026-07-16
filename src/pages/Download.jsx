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
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        Download Sentinel Core
      </motion.h1>

      <motion.section className="download-section" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="download-card" variants={itemVariants} whileHover={{ y: -8 }}>
          <div className="download-icon">📦</div>
          <h2>Executable</h2>
          <p className="version">v1.0 | Latest Release</p>
          <motion.button className="download-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => alert('Add your download link here!')}>
            📥 Download .exe
          </motion.button>
          <p className="file-size">≈ 50 MB</p>
        </motion.div>

        <motion.div className="download-card" variants={itemVariants} whileHover={{ y: -8 }}>
          <div className="download-icon">📁</div>
          <h2>Run from Source</h2>
          <p className="version">Development Setup</p>
          <motion.button className="download-btn secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => alert('Add your GitHub link here!')}>
            🔗 View on GitHub
          </motion.button>
          <p className="file-size">Clone & Setup Required</p>
        </motion.div>
      </motion.section>

      <section className="requirements">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>System Requirements</motion.h2>
        <motion.div className="requirements-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {requirements.map((req, idx) => (
            <motion.div key={idx} className="requirement-card" variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <div className="req-icon">{req.icon}</div>
              <h3>{req.title}</h3>
              <p>{req.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section className="installation" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2>Installation</h2>
        <div className="tabs">
          <div className="tab-content">
            <h3>📦 Executable</h3>
            <ol>
              <li>Download the .exe file</li>
              <li>Extract to desired location</li>
              <li>Run <code>SentinelCore.exe</code></li>
              <li>Grant permissions when prompted</li>
              <li>Ready to scan!</li>
            </ol>
          </div>
          <div className="tab-content">
            <h3>🔧 From Source</h3>
            <ol>
              <li>Clone the repo: <code>git clone https://github.com/yourusername/sentinel-core.git</code></li>
              <li>Install deps: <code>pip install -r requirements.txt</code></li>
              <li>Run: <code>python app.py</code></li>
              <li>GUI launches automatically</li>
            </ol>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Download;