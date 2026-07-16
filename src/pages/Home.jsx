import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const features = [
    {
      title: 'MD5/SHA Hashing',
      desc: 'Cryptographic file verification with MD5, SHA1 and SHA256',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="20" width="48" height="32" rx="4" stroke="#dc2626" strokeWidth="3" fill="rgba(220,38,38,0.1)"/>
          <path d="M20 20V16a12 12 0 0124 0v4" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="32" cy="36" r="5" fill="#dc2626" fillOpacity="0.8"/>
          <line x1="32" y1="41" x2="32" y2="46" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: 'Static Analysis',
      desc: 'PE header inspection, entropy analysis & pattern detection',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="8" width="44" height="48" rx="4" stroke="#dc2626" strokeWidth="3" fill="rgba(220,38,38,0.1)"/>
          <line x1="18" y1="22" x2="46" y2="22" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="18" y1="30" x2="46" y2="30" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="18" y1="38" x2="34" y2="38" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="46" cy="46" r="6" stroke="#dc2626" strokeWidth="2.5" fill="rgba(220,38,38,0.15)"/>
          <line x1="50" y1="50" x2="54" y2="54" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: 'Behavioral Analysis',
      desc: 'Malicious API import detection without executing the file',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="22" stroke="#dc2626" strokeWidth="3" fill="rgba(220,38,38,0.1)"/>
          <path d="M22 32 L28 38 L42 24" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'CVE Intelligence',
      desc: 'Real-time threat data from the NVD database with CVSS scoring',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="22" stroke="#dc2626" strokeWidth="3" fill="rgba(220,38,38,0.1)"/>
          <circle cx="32" cy="14" r="3" fill="#dc2626"/>
          <circle cx="50" cy="32" r="3" fill="#dc2626"/>
          <circle cx="32" cy="50" r="3" fill="#dc2626"/>
          <circle cx="14" cy="32" r="3" fill="#dc2626"/>
          <line x1="32" y1="17" x2="32" y2="27" stroke="#dc2626" strokeWidth="2"/>
          <line x1="47" y1="32" x2="37" y2="32" stroke="#dc2626" strokeWidth="2"/>
          <line x1="32" y1="47" x2="32" y2="37" stroke="#dc2626" strokeWidth="2"/>
          <line x1="17" y1="32" x2="27" y2="32" stroke="#dc2626" strokeWidth="2"/>
          <circle cx="32" cy="32" r="5" fill="#dc2626" fillOpacity="0.7"/>
        </svg>
      )
    },
    {
      title: 'AI Integration',
      desc: 'Smart threat classification and risk aggregation',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="16" y="20" width="32" height="28" rx="6" stroke="#dc2626" strokeWidth="3" fill="rgba(220,38,38,0.1)"/>
          <circle cx="24" cy="32" r="3" fill="#dc2626"/>
          <circle cx="32" cy="32" r="3" fill="#dc2626"/>
          <circle cx="40" cy="32" r="3" fill="#dc2626"/>
          <line x1="24" y1="20" x2="24" y2="14" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="32" y1="20" x2="32" y2="12" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="40" y1="20" x2="40" y2="14" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="24" y1="48" x2="24" y2="54" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="40" y1="48" x2="40" y2="54" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: 'Risk Scoring',
      desc: 'Aggregated 0–100 risk score with severity breakdown',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 48 L8 20 L20 30 L32 16 L44 28 L56 12 L56 48 Z" stroke="#dc2626" strokeWidth="2.5" strokeLinejoin="round" fill="rgba(220,38,38,0.1)"/>
          <line x1="8" y1="48" x2="56" y2="48" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="32" cy="16" r="3" fill="#dc2626"/>
          <circle cx="44" cy="28" r="3" fill="#dc2626"/>
        </svg>
      )
    },
  ];

  const stats = [
    { label: 'Analysis Layers', value: '6+' },
    { label: 'File Formats', value: '8+' },
    { label: 'AI Features', value: '27' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="home">

      {/* Hero */}
      <motion.section className="hero" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div
          className="hero-logo-wrapper"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          variants={itemVariants}
        >
          <img src="/logo.svg" alt="Sentinel Core" />
        </motion.div>

        <motion.h1 variants={itemVariants}>Sentinel Core</motion.h1>
        <motion.p variants={itemVariants} className="tagline">
          Advanced File Analysis & Threat Intelligence Platform
        </motion.p>

        <motion.div variants={itemVariants} className="hero-stats">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="hero-buttons">
          <Link to="/scanner" className="btn btn-primary">Start Scanning</Link>
          <Link to="/download" className="btn btn-secondary">Download Now</Link>
        </motion.div>
      </motion.section>

      {/* Features */}
      <section className="features">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Powerful Features
        </motion.h2>
        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(220,38,38,0.3)' }}
            >
              <div className="feature-svg">{feature.svg}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Quote */}
      <motion.section
        className="quote-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="quote">"Security is not a feature — it's a requirement."</p>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="cta-heading"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to scan?
        </motion.h2>
        <Link to="/scanner" className="btn btn-primary btn-large">Go to Scanner</Link>
      </motion.section>

    </div>
  );
}

export default Home;