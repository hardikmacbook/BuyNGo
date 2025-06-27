import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, Zap, Brain } from 'lucide-react';
import Logo from './Logo';
import Navlinks from './Navlinks';
import Cart from './Cart';
import Login from './Login';

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
                
             <Cart/>

             <Login/>

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