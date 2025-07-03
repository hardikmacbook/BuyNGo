import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' },
];

const Cart = () => {
  const [cartCount] = useState(1);
  return (
    <button className="relative p-3 rounded-xl border bg-white/50 backdrop-blur-md hover:bg-white/70 text-slate-600">
      <ShoppingCart className="w-5 h-5" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center bg-red-500 text-white">
          {cartCount}
        </span>
      )}
    </button>
  );
};


const Button = ({ label, width, height }) => (
  <button
    className="px-4 py-2 rounded-xl font-medium border bg-white/50 backdrop-blur-md hover:bg-white/70 text-slate-700 hover:text-slate-900"
    style={{ width, height }}
  >
    {label}
  </button>
);

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-4 left-0 right-0 z-50 mx-auto sm:max-w-[800px] bg-white/30 backdrop-blur-lg transition-all duration-700"
      style={{
        borderRadius: '30px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      }}
    >
      <nav className="px-6 sm:px-8 lg:px-10 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="text-base font-medium transition hover:scale-105 text-black hover:text-white"
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-5">
            <Cart />
            <Button label="Login" width="80px" height="50px" />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-3 rounded-xl border bg-white/50 backdrop-blur-md hover:bg-white/70"
            >
              {isMobileOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-2 py-4 px-2 border-t border-white/40">
            {NAV_ITEMS.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setIsMobileOpen(false)}
                className="block px-4 py-3 text-base font-medium rounded-lg transition text-slate-700 hover:text-slate-900 hover:bg-white/40"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
