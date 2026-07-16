import { motion } from 'framer-motion';
import '../styles/About.css';

function About() {
  const team = [
    { 
      fullname: 'Musa Farrukh',
      initials: 'MF',
      github: 'https://github.com/SyedMusa604',
      linkedin: 'https://www.linkedin.com/in/musafarrukh'
    },
    { 
      fullname: 'Saran Shah',
      initials: 'SS',
      github: '#',
      linkedin: '#'
    },
    { 
      fullname: 'Wajid Mehmood',
      initials: 'WM',
      github: '#',
      linkedin: '#'
    },
  ];

  const techStack = [
    {
      category: 'Frontend',
      techs: [
        { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Vite', logo: 'https://vitejs.dev/logo.svg' },
        { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'Framer Motion', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Axios', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      ]
    },
    {
      category: 'Backend & GUI',
      techs: [
        { name: 'Python 3.11', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Flask REST API', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original-wordmark.svg' },
        { name: 'Tkinter GUI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'python-dotenv', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      ]
    },
    {
      category: 'AI & ML',
      techs: [
        { name: 'scikit-learn', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
        { name: 'Random Forest', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
      ]
    },
    {
      category: 'File Analysis',
      techs: [
        { name: 'pefile', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'python-magic', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'PyPDF2', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'pdfplumber', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'oletools', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'python-docx', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'mutagen', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'hashlib', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      ]
    },
    {
      category: 'Threat Intelligence',
      techs: [
        { name: 'NVD API', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
        { name: 'CVSS Scoring', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
        { name: 'CVE Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
        { name: 'requests', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      ]
    },
    {
      category: 'Reports & Build',
      techs: [
        { name: 'ReportLab', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'PyInstaller', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      ]
    },
    {
      category: 'Deployment & Tools',
      techs: [
        { name: 'GitHub', logo: 'https://img.icons8.com/ios-filled/50/ffffff/github.png' },
        { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
        { name: 'Vercel', logo: 'https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png' },
        { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="about-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Sentinel Core
      </motion.h1>

      {/* Project Overview */}
      <motion.section
        className="project-overview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p>
          Sentinel Core is an advanced threat analysis platform that inspects files across
          multiple layers without ever executing them. Upload any file and get instant
          cryptographic verification, PE header inspection, entropy scoring, behavioral API
          analysis, and real-time CVE intelligence from the NVD database — all aggregated
          into a single risk score so you know exactly what you're dealing with.
        </p>
        <p>
          Built for security researchers, analysts, and anyone who needs to verify a file
          before trusting it. Fast, offline-safe, and zero execution risk.
        </p>
      </motion.section>

      {/* Team Section */}
      <section className="team-section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Team Members
        </motion.h2>
        <motion.div
          className="team-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              className="team-card"
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(220, 38, 38, 0.3)' }}
            >
              <div className="team-avatar">{member.initials}</div>
              <h3>{member.fullname}</h3>
              <div className="team-links">
                <a href={member.github} target="_blank" rel="noreferrer" className="team-link" title="GitHub">
                  <img src="https://img.icons8.com/ios-filled/50/ffffff/github.png" alt="GitHub" width="18" />
                </a>
                <a href={member.linkedin} target="_blank" rel="noreferrer" className="team-link" title="LinkedIn">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" width="18" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Supervisor Section */}
      <motion.section
        className="supervisor-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="supervisor-card">
          <div className="supervisor-icon">👩‍🏫</div>
          <div className="supervisor-content">
            <h3>Ma'am Umme Reem</h3>
            <p className="supervisor-title">Project Supervisor</p>
            <p className="supervisor-desc">
              Guiding the development and research aspects of Sentinel Core
            </p>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack */}
      <section className="tech-stack">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Tech Stack & Libraries
        </motion.h2>
        <motion.div
          className="tech-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStack.map((stack, idx) => (
            <motion.div
              key={idx}
              className="tech-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3>{stack.category}</h3>
              <div className="tech-list">
                {stack.techs.map((tech, tidx) => (
                  <div key={tidx} className="tech-item">
                    <img src={tech.logo} alt={tech.name} className="tech-logo" />
                    <span className="tech-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Disclaimer */}
      <motion.section
        className="disclaimer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p>
          ⚠️ Sentinel Core is developed for <strong>educational and research purposes</strong>.
          Always obtain proper authorization before scanning files. The developers are not
          responsible for any misuse of this tool.
        </p>
      </motion.section>
    </div>
  );
}

export default About;