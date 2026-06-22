import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS_DB } from './ProductList';

export default function SearchOverlay({ isOpen, onClose, onAddToCart, products = [] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setQuery(text);
    
    if (!text.trim()) {
      setResults([]);
      return;
    }

    const productsToUse = products && products.length > 0 ? products : PRODUCTS_DB;
    const matches = productsToUse.filter(product => 
      product.name.toLowerCase().includes(text.toLowerCase()) || 
      product.description.toLowerCase().includes(text.toLowerCase())
    );
    setResults(matches);
  };

  const handleResultClick = (productId) => {
    onClose();
    const target = document.getElementById('atelier');
    if (target) {
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      // Temporarily highlight the card in CSS or log it
      setTimeout(() => {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
          // A little manual check
          if (card.innerHTML.includes(productId)) {
            card.style.outline = '1px solid var(--accent-gold)';
            setTimeout(() => card.style.outline = 'none', 2500);
          }
        });
      }, 600);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={`search-overlay ${isOpen ? 'open' : ''}`}>
      <button className="overlay-close" aria-label="Close Search" onClick={onClose}>
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
          <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
        </svg>
      </button>

      <div className="search-overlay-content">
        <h3 className="search-title">Search The Atelier</h3>
        <div className="search-input-container">
          <input 
            type="text" 
            className="search-input-field" 
            placeholder="Enter keywords (e.g. Silk, Blazer, Tuxedo...)"
            value={query}
            onChange={handleSearchChange}
            ref={inputRef}
          />
          <div className="search-underline"></div>
        </div>

        <div className="search-results-container">
          {query && results.length === 0 ? (
            <div className="search-no-results">
              No masterpieces matching "{query}" found.
            </div>
          ) : (
            results.map(product => (
              <div 
                key={product.id} 
                className="search-result-item"
                onClick={() => handleResultClick(product.id)}
                style={{ cursor: 'pointer' }}
              >
                <img src={product.img} alt={product.name} className="search-result-img" />
                <div className="search-result-info">
                  <h4 className="search-result-name">{product.name}</h4>
                  <p className="search-result-price">{formatCurrency(product.price)}</p>
                </div>
                <button 
                  className="btn btn-luxury-secondary search-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                    onClose();
                  }}
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.65rem' }}
                >
                  Add to Bag
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
