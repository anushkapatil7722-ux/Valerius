import React, { useState, useEffect } from 'react';

export default function Navbar({ cartCount, onCartClick, onSearchClick, onProfileClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          
          {/* Centered Brand Logo */}
          <a href="#home" className="navbar-logo" onClick={(e) => handleLinkClick(e, 'home')}>
            <div className="logo-wrapper">
              <svg className="logo-diamond" viewBox="0 0 100 100" width="40" height="40">
                <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="url(#navbarGoldGradient)" strokeWidth="1.5"/>
                <text x="50" y="62" fontFamily="'Cinzel', serif" fontWeight="700" fontSize="34" fill="#FFFFFF" textAnchor="middle">V</text>
                <defs>
                  <linearGradient id="navbarGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="50%" stopColor="#F3E5AB" />
                    <stop offset="100%" stopColor="#AA7C11" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="logo-text">VALERIUS</span>
            </div>
          </a>

          {/* Left/Center Navigation Links */}
          <ul className="nav-links">
            <li><a href="#new-arrivals" className="nav-link" onClick={(e) => handleLinkClick(e, 'atelier')}>New Arrivals</a></li>
            <li><a href="#collections" className="nav-link" onClick={(e) => handleLinkClick(e, 'collections')}>Collections</a></li>
            <li><a href="#haute-couture" className="nav-link" onClick={(e) => handleLinkClick(e, 'atelier')}>Haute Couture</a></li>
            <li><a href="#editorial" className="nav-link" onClick={(e) => handleLinkClick(e, 'heritage')}>Editorial</a></li>
          </ul>

          {/* Right Utilities */}
          <div className="nav-utilities">
            {/* Search Trigger */}
            <button className="utility-btn" aria-label="Open Search" onClick={onSearchClick}>
              <svg className="icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
              </svg>
            </button>

            {/* Profile User Trigger */}
            <button className="utility-btn" aria-label="View Profile" onClick={onProfileClick}>
              <svg className="icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Cart Trigger */}
            <button className="utility-btn cart-btn" aria-label="Open Cart" onClick={onCartClick}>
              <svg className="icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="cart-badge">{cartCount}</span>
            </button>

            {/* Hamburger Toggle */}
            <button 
              className={`utility-btn menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
              aria-label="Toggle Menu" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="burger-bar"></span>
              <span className="burger-bar"></span>
              <span className="burger-bar"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <ul className="mobile-nav-links">
            <li><a href="#new-arrivals" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, 'atelier')}>New Arrivals</a></li>
            <li><a href="#collections" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, 'collections')}>Collections</a></li>
            <li><a href="#haute-couture" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, 'atelier')}>Haute Couture</a></li>
            <li><a href="#editorial" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, 'heritage')}>Editorial</a></li>
          </ul>
          <div className="mobile-menu-footer">
            <p className="atelier-tagline">VALERIUS ATELIER SERVICES</p>
            <a href="#appointments" className="mobile-link" onClick={(e) => { e.preventDefault(); alert("Booking system loaded."); setMobileMenuOpen(false); }}>Book a Consultation</a>
            <a href="#care" className="mobile-link" onClick={(e) => { e.preventDefault(); alert("Garment care guidelines."); setMobileMenuOpen(false); }}>Garment Care</a>
          </div>
        </div>
      </div>
    </>
  );
}
