import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

// Mock Logo component
const Logo = ({ isScrolled }) => (
  <div className={`text-2xl font-bold transition-all duration-700 ${
    isScrolled ? 'text-white' : 'text-slate-800'
  }`}>
    LOGO
  </div>
);

// Mock Navlinks component
const Navlinks = ({ isScrolled }) => {
  const navItems = ['Home', 'Products', 'About', 'Contact'];
  
  return (
    <div className="hidden lg:flex items-center space-x-8">
      {navItems.map((item) => (
        <a
          key={item}
          href="#"
          className={`text-base font-medium transition-all duration-700 hover:scale-105 ${
            isScrolled 
              ? 'text-white hover:text-cyan-300' 
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          {item}
        </a>
      ))}
    </div>
  );
};

// Mock Cart component
const Cart = ({ isScrolled }) => {
  const [cartCount] = useState(3);
  
  return (
    <button className={`relative p-3 rounded-xl transition-all duration-700 border backdrop-blur-md ${
      isScrolled 
        ? 'bg-white/10 hover:bg-white/20 border-white/40 text-white' 
        : 'bg-white/50 hover:bg-white/70 border-white/40 text-slate-600'
    }`}>
      <ShoppingCart className="w-5 h-5" />
      {cartCount > 0 && (
        <span className={`absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-700 ${
          isScrolled 
            ? 'bg-cyan-400 text-black' 
            : 'bg-red-500 text-white'
        }`}>
          {cartCount}
        </span>
      )}
    </button>
  );
};

// Mock Button component
const Button = ({ label, width, height, isScrolled }) => (
  <button 
    className={`px-4 py-2 rounded-xl font-medium transition-all duration-700 border backdrop-blur-md ${
      isScrolled 
        ? 'bg-white/10 hover:bg-white/20 border-white/40 text-white hover:text-cyan-300' 
        : 'bg-white/50 hover:bg-white/70 border-white/40 text-slate-700 hover:text-slate-900'
    }`}
    style={{ width, height }}
  >
    {label}
  </button>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Products', 'About', 'Contact'];

  return (
    <div className="">
      {/* Header */}
      <header
        className={`fixed top-4 sm:top-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-50 transition-all duration-700 ease-out ${
          isScrolled
            ? 'backdrop-blur bg-black/70 shadow-2xl shadow-cyan-500/40'
            : 'backdrop-blur-lg bg-white/30'
        }`}
        style={{
          width: typeof window !== 'undefined' && window.innerWidth >= 640 ? '800px' : 'auto',
          maxWidth: typeof window !== 'undefined' && window.innerWidth >= 640 ? 'none' : 'calc(100vw - 32px)',
          borderRadius: '24px',
          border: isScrolled
            ? '1px solid rgba(255, 255, 255, 0.4)'
            : '1px solid rgba(6, 182, 212, 0.2)',
          boxShadow: isScrolled
            ? '0 30px 60px rgba(6, 182, 212, 0.3), 0 12px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            : '0 8px 32px rgba(6, 182, 212, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        }}
      >
        <nav className={`px-6 sm:px-8 lg:px-10 py-3 transition-all duration-700`}>
          <div className="flex items-center justify-between">
            <Logo isScrolled={isScrolled} />
            <Navlinks isScrolled={isScrolled} />
            <div className="flex items-center space-x-5">
              <Cart isScrolled={isScrolled} />
              <Button label="Login" width="80px" height="50px" isScrolled={isScrolled} />
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-3 rounded-xl transition-all duration-700 border backdrop-blur-md ${
                  isScrolled 
                    ? 'bg-white/10 hover:bg-white/20 border-white/40' 
                    : 'bg-white/50 hover:bg-white/70 border-white/40'
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className={`w-5 h-5 transition-all duration-700 ${
                    isScrolled ? 'text-white' : 'text-slate-600'
                  }`} />
                ) : (
                  <Menu className={`w-5 h-5 transition-all duration-700 ${
                    isScrolled ? 'text-white' : 'text-slate-600'
                  }`} />
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
            <div className={`space-y-2 py-4 px-2 border-t transition-all duration-700 ${
              isScrolled ? 'border-white/40' : 'border-white/40'
            }`}>
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-700 ${
                    isScrolled 
                      ? 'text-white hover:text-cyan-300 hover:bg-white/10' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/40'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;