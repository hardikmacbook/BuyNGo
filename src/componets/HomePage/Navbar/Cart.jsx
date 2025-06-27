import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const Cart = () => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      {/* Cart Icon */}
      <button className="relative p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300 group border border-white/40 hover:border-white/60 shadow-sm hover:shadow-cyan-200/50 backdrop-blur-md">
        <ShoppingCart className="w-5 h-5 text-slate-600 group-hover:scale-110 transition-transform duration-300" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">
            {cartCount}
          </span>
        )}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      </button>
    </>
  );
};

export default Cart;
