import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
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
      setIsDropdownOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const featuredProjects = [
    { id: 'delivery-dash', title: 'Delivery Dash', image: '/images/delivery_dash.jpg' },
    { id: 'eyes-wide-shut', title: 'Eyes Wide Shut', image: '/images/eyes_wide_shut.webp' },
    { id: 'donkey-kong', title: 'donkey-kong', image: '/images/donkey_kong.png' },
  ];

  const handleCardClick = (id) => {
    console.log("Navbar card clicked:", id);
    
    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        console.log("Element found, scrolling:", id);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.error("Element not found for scrolling:", id);
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToElement, 300);
    } else {
      scrollToElement();
    }

    // Defer closing the dropdown to ensure scroll event triggers successfully
    setTimeout(() => {
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    }, 300);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close menu when clicking outside navbar container
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const nav = document.querySelector('.navbar');
      if (nav && !nav.contains(e.target)) {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isDropdownOpen ? 'dropdown-active' : ''} ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}>
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
            <li 
              className="nav-item has-dropdown"
              onMouseEnter={() => {
                if (window.innerWidth > 768) setIsDropdownOpen(true);
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 768) setIsDropdownOpen(false);
              }}
            >
              <span className="nav-link" onClick={toggleDropdown}>
                PROJECTS <ChevronDown size={16} className={`dropdown-arrow ${isDropdownOpen ? 'rotate' : ''}`} />
              </span>
              
              {/* Mega Menu Dropdown */}
              <div className={`mega-menu ${isDropdownOpen ? 'show' : ''}`}>
                <div className="mega-menu-content">
                  <div className="mega-menu-header">
                    <h3>Featured Projects</h3>
                    <Link to="/projects" onClick={() => { setIsDropdownOpen(false); setIsMobileMenuOpen(false); }} className="view-all">View All <ArrowRight size={16} /></Link>
                  </div>
                  <div className="mega-menu-grid">
                    {featuredProjects.map(project => (
                      <div 
                        key={project.id} 
                        onClick={() => handleCardClick(project.id)} 
                        className="game-card"
                      >
                        <img src={project.image} alt={project.title} />
                        <div className="game-card-title-overlay">
                          <span>{project.title === 'donkey-kong' ? 'Donkey Kong: SFML' : project.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}>ABOUT</Link>
            </li>
          </ul>

          <div className="navbar-actions">
            <a 
              href="https://www.linkedin.com/in/henniosilvadev/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="icon-btn user-btn" 
              aria-label="LinkedIn Profile"
              onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}
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


