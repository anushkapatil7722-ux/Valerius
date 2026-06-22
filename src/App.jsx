import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductList from './components/ProductList';
import Editorial from './components/Editorial';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';
import ProfileOverlay from './components/ProfileOverlay';
import { supabase } from './supabase';

export default function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('valerius_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [toast, setToast] = useState({ show: false, message: '' });

  // Sync cart state with LocalStorage for offline fallback
  useEffect(() => {
    localStorage.setItem('valerius_cart', JSON.stringify(cart));
  }, [cart]);

  // Load products from Supabase on mount
  useEffect(() => {
    async function loadProducts() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
          const mapped = data.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            img: p.image_url || 'assets/evening_wear.png',
            category: p.category || 'silk',
            description: p.description || '',
            stock: p.stock
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error("Error loading products from Supabase:", err);
      }
    }
    loadProducts();
  }, []);

  // Sync / Load database cart on mount if authentication is set up
  useEffect(() => {
    async function loadDbCart() {
      if (!supabase) return;
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', user.id);
          if (error) throw error;
          if (data && data.length > 0) {
            const mappedCart = data.map(item => ({
              id: item.id,
              name: item.product_name,
              price: Number(item.price),
              quantity: item.quantity
            }));
            setCart(mappedCart);
          }
        }
      } catch (err) {
        console.error("Error loading cart from Supabase:", err);
      }
    }
    loadDbCart();
  }, []);

  // Toast notifier
  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  // Add Item to Bag
  const handleAddToCart = async (product) => {
    const existing = cart.find(item => item.id === product.id || item.name === product.name);

    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user ? user.id : null;

        if (existing) {
          await supabase
            .from('cart')
            .update({ quantity: existing.quantity + 1 })
            .or(`id.eq.${existing.id},product_name.eq.${product.name}`);
        } else {
          await supabase
            .from('cart')
            .insert({
              user_id: userId,
              product_name: product.name,
              price: product.price,
              quantity: 1
            });
        }
      } catch (err) {
        console.warn("Failed to sync cart item with Supabase backend:", err);
      }
    }

    setCart((prevCart) => {
      const isExisting = prevCart.find(item => item.id === product.id);
      if (isExisting) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    triggerToast(`Added: ${product.name}`);
    
    setTimeout(() => {
      setIsCartOpen(true);
    }, 600);
  };

  // Update item quantity in drawer
  const handleUpdateQty = async (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }

    if (supabase) {
      try {
        const itemToUpdate = cart.find(item => item.id === id);
        if (itemToUpdate) {
          await supabase
            .from('cart')
            .update({ quantity: newQty })
            .or(`id.eq.${id},product_name.eq.${itemToUpdate.name}`);
        }
      } catch (err) {
        console.warn("Error updating cart quantity in Supabase backend:", err);
      }
    }

    setCart((prevCart) => 
      prevCart.map(item => 
        item.id === id 
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove item from bag
  const handleRemoveItem = async (id) => {
    if (supabase) {
      try {
        const itemToRemove = cart.find(item => item.id === id);
        if (itemToRemove) {
          await supabase
            .from('cart')
            .delete()
            .or(`id.eq.${id},product_name.eq.${itemToRemove.name}`);
        }
      } catch (err) {
        console.warn("Error removing item from Supabase backend:", err);
      }
    }

    setCart((prevCart) => prevCart.filter(item => item.id !== id));
    triggerToast("Removed from Wardrobe");
  };

  // Checkout process simulation
  const handleCheckout = async () => {
    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user ? user.id : null;
        if (userId) {
          await supabase.from('cart').delete().eq('user_id', userId);
        } else {
          const productNames = cart.map(item => item.name);
          await supabase.from('cart').delete().in('product_name', productNames).is('user_id', null);
        }
      } catch (err) {
        console.warn("Error clearing cart from Supabase during checkout:", err);
      }
    }

    alert("Initiating private consultation for your commissions. A Valerius client advisor will contact you within 24 hours.");
    setCart([]);
    setIsCartOpen(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* 1. Global Navigation */}
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      {/* 2. Page Sections */}
      <Hero />
      <Categories onCategorySelect={setActiveFilter} />
      <ProductList 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
        onAddToCart={handleAddToCart}
        products={products}
      />
      <Editorial />
      <Footer onNewsletterSubmit={triggerToast} />

      {/* 3. Interactive Overlays & Modals */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onAddToCart={handleAddToCart}
        products={products}
      />

      <ProfileOverlay 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogin={triggerToast}
      />

      {/* 4. Visual Toast Notifications */}
      <div className={`toast-notification ${toast.show ? 'show' : ''}`}>
        <div className="toast-content">
          <span className="toast-icon">✓</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      </div>
    </>
  );
}
