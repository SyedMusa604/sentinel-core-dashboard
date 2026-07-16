import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <motion.div 
          className="nav-logo"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Link to="/">
            <div className="logo-wrapper">
              <img src="/logo.svg" alt="Sentinel Core" className="logo-img" />
            </div>
            <span>Sentinel Core</span>
          </Link>
        </motion.div>
        
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/scanner" className="nav-link">Scanner</Link></li>
          <li><Link to="/download" className="nav-link">Download</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;