import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [toasts, setToasts] = useState([]);
  const { isSignedIn } = useAuth();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      setCartCount(parsedCart.reduce((total, item) => total + item.quantity, 0));
    }
  }, []);

  // Toast notification function
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  // Remove toast manually
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Add to cart function
  const addToCart = (product) => {
    // Check if user is logged in
    if (!isSignedIn) {
      showToast('Please login to add products to cart', 'error');
      return false;
    }
    
    const existingItem = cart.find(item => item.id === product.id);
    const productQuantity = product.quantity || 1;
    
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item => 
        item.id === product.id ? {...item, quantity: item.quantity + productQuantity} : item
      );
    } else {
      updatedCart = [...cart, {...product, quantity: productQuantity}];
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    
    // Limit title to 5 words max
    const limitedTitle = product.title
      .split(' ')
      .slice(0, 5)
      .join(' ')
      + (product.title.split(' ').length > 5 ? '...' : '');

    showToast(`${limitedTitle} added to cart`, 'success');
    return true;
  };
  
  // Remove from cart function
  const removeFromCart = (productId) => {
    const productToRemove = cart.find(item => item.id === productId);
    
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    
    if (productToRemove) {
      // Limit title to 5 words max
      const limitedTitle = productToRemove.title
        .split(' ')
        .slice(0, 5)
        .join(' ')
        + (productToRemove.title.split(' ').length > 5 ? '...' : '');
      
      showToast(`${limitedTitle} removed from cart`, 'error');
    }
  };

  // Update quantity function
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === productId ? {...item, quantity: newQuantity} : item
    );
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
  };

  // Clear cart function
  const clearCart = () => {
    setCart([]);
    setCartCount(0);
    localStorage.removeItem('cart');
    showToast('Cart cleared successfully', 'success');
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartCount, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart
    }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto
              flex items-center gap-3 
              px-4 py-3 rounded-lg shadow-lg
              min-w-[300px] max-w-md
              transform transition-all duration-300 ease-in-out
              animate-slide-in-right
              ${toast.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
              }
            `}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="flex-1 text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
