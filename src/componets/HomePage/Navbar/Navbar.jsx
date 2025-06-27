import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, Zap, Brain } from 'lucide-react';
import Logo from './Logo';
import Navlinks from './Navlinks';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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
            ? 'backdrop-blur-3xl bg-white/15 shadow-2xl shadow-cyan-500/40' 
            : 'backdrop-blur-lg bg-white/60'
        }`}
        style={{
          width: window.innerWidth >= 640 ? '800px' : 'auto',
          maxWidth: window.innerWidth >= 640 ? 'none' : 'calc(100vw - 32px)',
          borderRadius: '24px',
          border: isScrolled 
            ? '1px solid rgba(255, 255, 255, 0.4)' 
            : '1px solid rgba(6, 182, 212, 0.2)',
          boxShadow: isScrolled 
            ? '0 30px 60px rgba(6, 182, 212, 0.3), 0 12px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)' 
            : '0 8px 32px rgba(6, 182, 212, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
        }}
      >
        <nav className={`px-6 sm:px-8 lg:px-10 py-2 transition-all duration-700`}>
          <div className="flex items-center justify-between">
            <Logo/>
            
            <Navlinks/>
            <div className="flex items-center space-x-4">
                
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

              {/* Login Button */}
              <button className="relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 group overflow-hidden hover:scale-105">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Login</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300 border border-white/40 backdrop-blur-md"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-600" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-64 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-2 py-4 px-2 border-t border-white/40">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className="block px-4 py-3 text-base text-slate-700 hover:text-slate-900 hover:bg-white/40 rounded-lg transition-all duration-300 font-medium"
                  style={{
                    animationDelay: `${index * 50}ms`
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