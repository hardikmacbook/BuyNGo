import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SetPageTitle from "../componets/SetPageTitle";
import { Home, ChevronRight, Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Function to create URL-friendly slugs from product titles
  const createSlug = (title) => {
    return title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
  };

  return (
    <>
      <SetPageTitle title="Cart - BuyNGo"/>
      <div className="pt-28 bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="flex items-center hover:text-gray-900 transition-colors">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">Cart</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4">Shopping Cart</h1>
            <div className="w-24 h-px bg-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600 leading-relaxed">
              Review your selected items before checkout
            </p>
          </div>
          
          {cart.length > 0 ? (
            <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
              {/* Cart header - Desktop only */}
              <div className="hidden md:grid grid-cols-12 gap-6 px-8 py-6 border-b border-gray-200">
                <div className="col-span-6 text-sm font-medium text-gray-700 uppercase tracking-wide">Product</div>
                <div className="col-span-2 text-center text-sm font-medium text-gray-700 uppercase tracking-wide">Price</div>
                <div className="col-span-2 text-center text-sm font-medium text-gray-700 uppercase tracking-wide">Quantity</div>
                <div className="col-span-2 text-right text-sm font-medium text-gray-700 uppercase tracking-wide">Total</div>
              </div>
              
              {/* Cart items */}
              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 px-8 py-8 items-center">
                    {/* Product info */}
                    <div className="col-span-1 md:col-span-6 flex items-center space-x-4">
                      <Link 
                        to={`/shop/${createSlug(item.title)}`} 
                        className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 hover:bg-gray-100 transition-colors"
                      >
                        <img 
                          src={item.images?.[0]} 
                          alt={item.title} 
                          className="max-w-full max-h-full object-contain p-2"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/shop/${createSlug(item.title)}`} 
                          className="font-medium text-gray-900 hover:text-gray-700 transition-colors block mb-2 line-clamp-2"
                        >
                          {item.title}
                        </Link>
                        <span className="inline-block text-xs text-gray-500 font-medium uppercase tracking-wide">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-1 md:col-span-2 text-left md:text-center">
                      <div className="md:hidden text-sm text-gray-500 mb-1">Price:</div>
                      <div className="font-medium text-gray-900">₹{item.price}</div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                      <div className="md:hidden text-sm text-gray-500 mr-4">Quantity:</div>
                      <div className="flex items-center border-2 border-gray-200 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-center min-w-[3rem] font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Total & Remove */}
                    <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                      <div className="md:hidden text-sm text-gray-500">Total:</div>
                      <div className="flex items-center space-x-4">
                        <div className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Cart summary */}
              <div className="border-t border-gray-200 px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                  <button 
                    onClick={clearCart}
                    className="border-2 border-gray-200 px-6 py-3 rounded-lg font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                  </button>
                  <div className="text-right">
                    <div className="text-gray-600 mb-2">Total Amount</div>
                    <div className="text-3xl font-light text-gray-900">₹{totalAmount.toFixed(2)}</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <Link 
                    to="/shop"
                    className="border-2 border-gray-200 px-8 py-3 rounded-lg font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </Link>
                  
                  <Link 
                    to="/checkout"
                    className="bg-gray-900 px-8 py-3 rounded-lg font-medium text-white hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-12 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-light text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link 
                to="/shop"
                className="border-2 border-gray-200 px-8 py-3 rounded-lg font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300 inline-flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
