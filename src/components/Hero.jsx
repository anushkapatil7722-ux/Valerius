import React from 'react';

export default function Hero() {
  const handleScrollClick = () => {
    const target = document.getElementById('collections');
    if (target) {
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div 
        className="hero-bg" 
        style={{
          backgroundImage: `linear-gradient(rgba(11, 11, 11, 0.4), rgba(11, 11, 11, 0.85)), url('assets/hero_bg.png')`
        }}
      ></div>
      <div className="hero-content">
        <div className="hero-text-wrapper">
          <h2 className="hero-subtitle text-animate delay-1">Defining Modern Luxury</h2>
          <h1 className="hero-title text-animate delay-2">Timeless Elegance, Defined</h1>
          <div className="hero-action text-animate delay-3">
            <a href="#atelier" className="btn btn-luxury" onClick={(e) => { e.preventDefault(); handleScrollClick(); }}>
              Explore the Collection
            </a>
          </div>
        </div>
      </div>
      
      {/* Animated Scroll Indicator */}
      <div className="scroll-indicator" onClick={handleScrollClick}>
        <span className="scroll-label">Scroll to Explore</span>
        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </section>
  );
}
