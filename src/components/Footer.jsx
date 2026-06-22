import React, { useState } from 'react';

export default function Footer({ onNewsletterSubmit }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onNewsletterSubmit(`Invitation Sent to the Journal: ${email}`);
      setEmail('');
    }
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
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
    <footer className="editorial-footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Philosophy */}
          <div className="footer-col philosophy-col">
            <div className="footer-logo">
              <svg className="logo-diamond" viewBox="0 0 100 100" width="30" height="30">
                <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                <text x="50" y="62" fontFamily="'Cinzel', serif" fontWeight="700" fontSize="34" fill="#FFFFFF" textAnchor="middle">V</text>
              </svg>
              <span className="logo-text">VALERIUS</span>
            </div>
            <p className="footer-philosophy-text">
              Architectural tailoring, pure premium textures, and structural geometry. A dialogue of modern haute couture and classical heritage craftsmanship.
            </p>
          </div>

          {/* Collections */}
          <div className="footer-col">
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-links">
              <li><a href="#atelier" className="footer-link" onClick={(e) => handleLinkClick(e, 'atelier')}>Bespoke Suitings</a></li>
              <li><a href="#atelier" className="footer-link" onClick={(e) => handleLinkClick(e, 'atelier')}>Structured Outerwear</a></li>
              <li><a href="#atelier" className="footer-link" onClick={(e) => handleLinkClick(e, 'atelier')}>Avant-Garde Blazers</a></li>
              <li><a href="#atelier" className="footer-link" onClick={(e) => handleLinkClick(e, 'atelier')}>Evening Gowns & Tuxedos</a></li>
            </ul>
          </div>

          {/* Atelier Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Atelier Services</h4>
            <ul className="footer-links">
              <li><a href="#appointments" className="footer-link" onClick={(e) => { e.preventDefault(); alert("Private fittings booking system."); }}>Private Appointments</a></li>
              <li><a href="#care" className="footer-link" onClick={(e) => { e.preventDefault(); alert("Sartorial garment care guidelines."); }}>Sartorial Garment Care</a></li>
              <li><a href="#made-to-measure" className="footer-link" onClick={(e) => { e.preventDefault(); alert("Made-to-Measure consultation."); }}>Made-to-Measure</a></li>
              <li><a href="#boutiques" className="footer-link" onClick={(e) => { e.preventDefault(); alert("Valerius Heritage Boutiques: Paris, Milan, New York."); }}>Heritage Boutiques</a></li>
            </ul>
          </div>

          {/* Newsletter Journal */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-heading">The Journal</h4>
            <p className="footer-newsletter-desc">Subscribe to receive seasonal invitations, private previews, and sartorial stories.</p>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="input-wrapper">
                <input 
                  type="email" 
                  className="newsletter-input" 
                  placeholder="Your Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  aria-label="Email address for subscription"
                />
                <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe to Journal">
                  <svg className="submit-arrow" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                    <polyline points="12,5 19,12 12,19" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">&copy; 2026 VALERIUS Fashion House. All Rights Reserved.</p>
          <div className="social-links">
            {/* Instagram */}
            <a href="#instagram" className="social-icon" aria-label="Instagram" onClick={(e) => { e.preventDefault(); alert("Connecting to Valerius Instagram."); }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            {/* Pinterest */}
            <a href="#pinterest" className="social-icon" aria-label="Pinterest" onClick={(e) => { e.preventDefault(); alert("Connecting to Valerius Pinterest."); }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 22a8.5 8.5 0 0 0 6.6-3.3 8.3 8.3 0 0 0 1-5.6 13 13 0 0 0-1.8-5.3C12.5 5 10 3.7 8.5 3.7a4 4 0 0 0-3 1.5 5.8 5.8 0 0 0-.6 3.6 7 7 0 0 0 1 3c.3.5.3.7.1 1a2 2 0 0 1-1.3.8 3 3 0 0 1-1.7-.6A6.5 6.5 0 0 1 2 8a7.2 7.2 0 0 1 6-7.5c4.7-.6 9 2.4 9 7.4a8 8 0 0 1-2.4 6 5.3 5.3 0 0 1-4.2 1.4A4 4 0 0 1 8 13.5a14.7 14.7 0 0 0 1.2-4.5 1 1 0 0 0-1-1.3H7.5A1.5 1.5 0 0 0 6 9.2a8 8 0 0 0 2 12.8"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
