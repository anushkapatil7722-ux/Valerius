import React from 'react';

export const PRODUCTS_DB = [
  {
    id: 1,
    name: "Mélange Silk Slip Dress",
    category: "silk",
    price: 1450,
    img: "assets/evening_wear.png",
    description: "Finest bias-cut mulberry silk slip dress with hand-finished French lace trim."
  },
  {
    id: 2,
    name: "Valeria Structured Blazer",
    category: "blazers",
    price: 1950,
    img: "assets/prod_blazer.png",
    description: "Signature double-breasted power blazer featuring padded architectural shoulders."
  },
  {
    id: 3,
    name: "Aurelius Tailored Wool Suit",
    category: "blazers",
    price: 2850,
    img: "assets/prod_suit.png",
    description: "Crafted in 100% fine Italian virgin wool with structured modern drape."
  },
  {
    id: 4,
    name: "Midnight Velvet Tuxedo",
    category: "evening",
    price: 3200,
    img: "assets/prod_tuxedo.png",
    description: "Silk-velvet shawl collar tuxedo set crafted for evening distinction."
  },
  {
    id: 5,
    name: "Florentine Cashmere Overcoat",
    category: "silk",
    price: 2450,
    img: "assets/prod_overcoat.png",
    description: "Unisex long-coat crafted from organic double-faced wool-cashmere blend."
  },
  {
    id: 6,
    name: "Aria Linen Cruise Trouser",
    category: "resortwear",
    price: 950,
    img: "assets/hero_bg.png",
    description: "Relaxed wide-leg luxury linen trouser for summer getaways."
  }
];

export default function ProductList({ activeFilter, onFilterChange, onAddToCart, products = [] }) {
  const productsToUse = products && products.length > 0 ? products : PRODUCTS_DB;
  const filteredProducts = activeFilter === 'all'
    ? productsToUse
    : productsToUse.filter(p => p.category === activeFilter);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section id="atelier" className="section atelier-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle-gold">The Season's Masterpieces</span>
          <h2 className="section-title">The Atelier</h2>
          <div className="divider-line"></div>
          
          {/* Category Filter Tabs */}
          <div className="product-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} 
              onClick={() => onFilterChange('all')}
            >
              All Masterpieces
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'silk' ? 'active' : ''}`} 
              onClick={() => onFilterChange('silk')}
            >
              Silk & Cashmere
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'blazers' ? 'active' : ''}`} 
              onClick={() => onFilterChange('blazers')}
            >
              Tailored Blazers
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'evening' ? 'active' : ''}`} 
              onClick={() => onFilterChange('evening')}
            >
              Evening Gowns
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'resortwear' ? 'active' : ''}`} 
              onClick={() => onFilterChange('resortwear')}
            >
              Summer Resortwear
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="product-image" 
                  loading="lazy" 
                />
                <div className="product-overlay">
                  <button 
                    className="btn-add-cart" 
                    onClick={() => onAddToCart(product)}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-price">{formatCurrency(product.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
