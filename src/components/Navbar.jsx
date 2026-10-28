import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menus on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Close menu when clicking outside navbar container
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const nav = document.querySelector('.navbar');
      if (nav && !nav.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <img src="/images/nio_logo.png" alt="Logo" />
        </Link>

        {/* Mobile Hamburger Button */}
        <button 
          className="navbar-hamburger" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <div className={`navbar-menu-wrapper ${isMobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-menu">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' || location.pathname === '/projects' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                PROJECTS
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/showcase" 
                className={`nav-link ${location.pathname === '/showcase' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SHOWCASE
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT
              </Link>
            </li>
          </ul>

          <div className="navbar-actions">
            <a 
              href="https://www.linkedin.com/in/henniosilvadev/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="icon-btn user-btn" 
              aria-label="LinkedIn Profile"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;


