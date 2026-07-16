import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import '../styles/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <motion.div 
          className="nav-logo"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <div className="logo-wrapper">
              <img src="/logo.svg" alt="Sentinel Core" className="logo-img" />
            </div>
            <span>Sentinel Core</span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="nav-menu desktop-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/scanner" className="nav-link">Scanner</Link></li>
          <li><Link to="/download" className="nav-link">Download</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
        </ul>

        {/* Hamburger Button */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/scanner" className="mobile-link" onClick={() => setMenuOpen(false)}>Scanner</Link>
            <Link to="/download" className="mobile-link" onClick={() => setMenuOpen(false)}>Download</Link>
            <Link to="/about" className="mobile-link" onClick={() => setMenuOpen(false)}>About</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;