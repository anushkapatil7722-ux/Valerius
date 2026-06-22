import React from 'react';

export default function Categories({ onCategorySelect }) {
  const categoriesData = [
    {
      id: 'silk-cashmere',
      title: "Silk & Cashmere",
      description: "Pure organic cashmere knits and fluid mulberry silk silhouettes.",
      image: "assets/mens_suits.png",
      filterTag: "silk"
    },
    {
      id: 'tailored-blazers',
      title: "Tailored Blazers",
      description: "Structured shoulders, waist contouring, and heritage blend weaves.",
      image: "assets/womens_blazers.png",
      filterTag: "blazers"
    },
    {
      id: 'evening-gowns',
      title: "Evening Gowns",
      description: "Commanding velvet silhouettes and hand-draped satin floor-length gowns.",
      image: "assets/evening_wear.png",
      filterTag: "evening"
    },
    {
      id: 'summer-resortwear',
      title: "Summer Resortwear",
      description: "Relaxed linen coordinates and light cruise collections for the sun-kissed getaway.",
      image: "assets/hero_bg.png",
      filterTag: "resortwear"
    }
  ];

  const handleCardClick = (e, filterTag) => {
    e.preventDefault();
    onCategorySelect(filterTag);
    const target = document.getElementById('atelier');
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
    <section id="collections" className="section collections-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle-gold">Sartorial Editions</span>
          <h2 className="section-title">Curated Collections</h2>
          <div className="divider-line"></div>
        </div>

        <div className="collections-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {categoriesData.map((category) => (
            <a 
              key={category.id} 
              href="#atelier" 
              className="collection-card" 
              onClick={(e) => handleCardClick(e, category.filterTag)}
              style={{ height: '580px' }}
            >
              <div className="card-image-wrapper">
                <img src={category.image} alt={category.title} className="card-image" loading="lazy" />
                <div className="card-gradient"></div>
              </div>
              <div className="card-info">
                <h3 className="card-category-title">{category.title}</h3>
                <p className="card-description">{category.description}</p>
                <div className="card-action">
                  <span className="action-text">Explore Silhouettes</span>
                  <svg className="arrow-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                    <polyline points="12,5 19,12 12,19" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
