import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
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

  // Add to cart function
  const addToCart = (product) => {
    // Check if user is logged in
    if (!isSignedIn) {
      setShowLoginAlert(true);
      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowLoginAlert(false);
      }, 3000);
      return false; // Return false to indicate operation failed
    }
    
    const existingItem = cart.find(item => item.id === product.id);
    const productQuantity = product.quantity || 1; // Use provided quantity or default to 1
    
    let updatedCart;
    if (existingItem) {
      // If item exists, add the new quantity to existing quantity
      updatedCart = cart.map(item => 
        item.id === product.id ? {...item, quantity: item.quantity + productQuantity} : item
      );
    } else {
      // If item doesn't exist, add it with the specified quantity
      updatedCart = [...cart, {...product, quantity: productQuantity}];
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update cart count
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    
    // Show success notification
    setNotification({
      show: true,
      message: `${product.title} added to cart`,
      type: 'success'
    });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
    
    return true; // Return true to indicate operation succeeded
  };
  
  // Remove from cart function
  const removeFromCart = (productId) => {
    // Find the product before removing it to use in notification
    const productToRemove = cart.find(item => item.id === productId);
    
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update cart count
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    
    // Show remove notification
    if (productToRemove) {
      setNotification({
        show: true,
        message: `${productToRemove.title} removed from cart`,
        type: 'remove'
      });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
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
    
    // Update cart count
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
  };

  // Clear cart function
  const clearCart = () => {
    setCart([]);
    setCartCount(0);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartCount, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      showLoginAlert,
      setShowLoginAlert
    }}>
      {children}
      {showLoginAlert && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center justify-center animate-fade-in-down">
          <span className="mr-2">⚠️</span>
          <span>Please login to add products to cart</span>
        </div>
      )}
      {notification.show && (
        <div className={`fixed bottom-5 right-5 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center justify-center animate-fade-in-down`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 mr-2" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-2" />
          )}
          <span>{notification.message}</span>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);