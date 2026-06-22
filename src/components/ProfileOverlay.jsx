import React, { useState } from 'react';

export default function ProfileOverlay({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [passphrase, setPassphrase] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && passphrase.trim()) {
      onLogin(`Signed in as Guest Client: ${email}`);
      onClose();
      setEmail('');
      setPassphrase('');
    }
  };

  return (
    <div className={`profile-overlay ${isOpen ? 'open' : ''}`}>
      <div className="profile-overlay-backdrop" onClick={onClose}></div>
      <div className="profile-overlay-content">
        <button className="overlay-close" aria-label="Close Profile" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
            <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
          </svg>
        </button>
        <div className="profile-header">
          <svg viewBox="0 0 24 24" width="48" height="48" className="profile-avatar-icon" stroke="currentColor" fill="none" strokeWidth="1">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <h3 className="profile-title">The Valerius Guild</h3>
          <p className="profile-subtitle">Atelier Client Portal</p>
        </div>
        <div className="profile-body">
          <p className="profile-info-text">
            Sign in to view your bespoke commissions, measure files, and private fittings.
          </p>
          <form className="profile-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Client Email" 
              className="profile-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              type="password" 
              placeholder="Passphrase" 
              className="profile-input" 
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              required 
            />
            <button type="submit" className="btn btn-luxury btn-block">
              Access Private Account
            </button>
          </form>
          <div className="profile-actions">
            <a href="#register" className="profile-link-secondary" onClick={(e) => { e.preventDefault(); alert("Invitation request filed."); onClose(); }}>
              Request Invitation
            </a>
            <a href="#support" className="profile-link-secondary" onClick={(e) => { e.preventDefault(); alert("Concierge chat initiating."); onClose(); }}>
              Contact Concierge
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
