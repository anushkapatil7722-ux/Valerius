import React from 'react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQty, onRemoveItem, onCheckout }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleShopClick = () => {
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
    }
  };

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="cart-drawer-overlay" onClick={onClose}></div>
      <div className="cart-drawer-content">
        <div className="cart-header">
          <h3 className="cart-title">Your Wardrobe Selection</h3>
          <button className="cart-close-btn" aria-label="Close Cart" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable Cart Items */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart-message">
              <svg viewBox="0 0 24 24" width="48" height="48" className="empty-cart-icon" stroke="currentColor" fill="none" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinejoin="round" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p>Your wardrobe is currently empty.</p>
              <button className="btn btn-luxury-secondary cart-shop-btn" onClick={handleShopClick}>
                View Masterpieces
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div>
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="cart-item-actions">
                    {/* Quantity selectors */}
                    <div className="quantity-selector">
                      <button 
                        className="qty-btn dec-qty" 
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="qty-num">{item.quantity}</span>
                      <button 
                        className="qty-btn inc-qty" 
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    {/* Remove button */}
                    <button 
                      className="cart-item-remove" 
                      onClick={() => onRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Panel */}
        <div className="cart-footer">
          <div className="cart-totals">
            <span className="subtotal-label">Atelier Subtotal</span>
            <span className="subtotal-price">{formatCurrency(subTotal)}</span>
          </div>
          <p className="cart-shipping-notice">
            Complimentary white-glove shipping & signature packaging included.
          </p>
          <button 
            className="btn btn-luxury btn-block" 
            disabled={cart.length === 0}
            onClick={onCheckout}
          >
            Proceed to Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
