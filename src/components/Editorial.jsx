import React, { useState, useEffect } from 'react';

export default function Editorial() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "The epitome of modern luxury, blending clean architectural silhouettes with the finest cashmere and silk.",
      author: "Vogue Magazine"
    },
    {
      quote: "The Valeria power blazer sits on the shoulders with absolute grace and authoritative structure. It represents the finest combination of sharp design and pure material.",
      author: "Helena de La Roche, Creative Director"
    },
    {
      quote: "Valerius doesn't just create luxury tailoring; they engineer an armor of immense confidence, combining heritage wools with avant-garde architectural shapes.",
      author: "Alexander Sterling, Architect"
    },
    {
      quote: "To enter the Valerius Atelier is to witness ancient craftsmanship dialogue with the future. The midnight tuxedo is a testament to double-breasted geometry and premium velvet drape.",
      author: "Julian Thorne, Editorial Director"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section 
      id="heritage" 
      className="section heritage-section"
      style={{
        backgroundImage: `linear-gradient(rgba(11, 11, 11, 0.95), rgba(11, 11, 11, 0.95)), url('assets/hero_bg.png')`
      }}
    >
      <div className="heritage-bg-overlay"></div>
      <div className="container relative">
        <div className="section-header text-center">
          <span className="subtitle-gold">Valerius Legacy</span>
          <h2 className="section-title">Heritage & Press</h2>
          <div className="divider-line"></div>
        </div>

        <div className="carousel-wrapper">
          {/* Quote Icon */}
          <div className="quote-icon-container">
            <span className="quote-icon">&ldquo;</span>
          </div>

          {/* Slides */}
          <div className="carousel-container">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className={`carousel-slide ${idx === activeIndex ? 'active' : ''}`}
              >
                <blockquote className="testimonial-blockquote">
                  "{t.quote}"
                </blockquote>
                <cite className="testimonial-author">&mdash; {t.author}</cite>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="carousel-pagination">
            {testimonials.map((_, idx) => (
              <button 
                key={idx} 
                className={`carousel-dot ${idx === activeIndex ? 'active' : ''}`} 
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to Slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
