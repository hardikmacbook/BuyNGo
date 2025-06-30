import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

// Reusable nav items
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

// Navlinks
const Navlinks = ({ navItems }) => (
  <div className="hidden lg:flex items-center space-x-8">
    {navItems.map(({ name, path }) => (
      <Link
        key={name}
        to={path}
        className="text-base font-medium transition-all hover:scale-105 text-black hover:text-white"
      >
        {name}
      </Link>
    ))}
  </div>
);

// Cart
const Cart = () => {
  const [cartCount] = useState(3);

  return (
    <button className="relative p-3 rounded-xl transition-all duration-700 border backdrop-blur-md bg-white/50 hover:bg-white/70 border-white/40 text-slate-600">
      <ShoppingCart className="w-5 h-5" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-700 bg-red-500 text-white">
          {cartCount}
        </span>
      )}
    </button>
  );
};

// Button
const Button = ({ label, width, height }) => (
  <button
    className="px-4 py-2 rounded-xl font-medium transition-all duration-700 border backdrop-blur-md bg-white/50 hover:bg-white/70 border-white/40 text-slate-700 hover:text-slate-900"
    style={{ width, height }}
  >
    {label}
  </button>
);

// Navbar
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-4 left-0 right-0 z-50 mx-auto transition-all duration-700 ease-out sm:max-w-[800px] backdrop-blur-lg bg-white/30"
      style={{
        borderRadius: '30px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      }}
    >
      <nav className="px-6 sm:px-8 lg:px-10 py-3 transition-all duration-700">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navlinks */}
          <Navlinks navItems={navItems} />

          {/* Right Section */}
          <div className="flex items-center space-x-5">
            <Cart />
            <Button label="Login" width="80px" height="50px" />

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl transition-all duration-700 border backdrop-blur-md bg-white/50 hover:bg-white/70 border-white/40"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 transition-all duration-700 text-white" />
              ) : (
                <Menu className="w-5 h-5 transition-all duration-700 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-64 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-2 py-4 px-2 border-t border-white/40">
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="block px-4 py-3 text-base font-medium rounded-lg transition-all duration-700 text-slate-700 hover:text-slate-900 hover:bg-white/40"
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
