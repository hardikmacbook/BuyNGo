import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useCart } from "../context/CartContext";
import { FaLuggageCart } from 'react-icons/fa';


const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' },
];


const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header
      className="fixed top-4 left-0 right-0 z-50 mx-auto sm:max-w-[800px] bg-[#ACACAC]/10 backdrop-blur-lg transition-all duration-700"
      style={{
        borderRadius: '30px',
        // border: '1px solid #26282A',
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
      className="text-base font-medium text-black relative group transition-colors duration-300"
    >
      {name}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#000] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  ))}

            {/*-------- cart menu ---------*/}
                 <div className="flex items-center align-center gap-2 text-red-900 cursor-pointer relative group">
                  <Link
                    to={"/cart"}
                    className="transition-transform duration-300 group-hover:scale-110"
                  >
                    <FaLuggageCart className='text-lg'/>
                    <b className="px-1.5 rounded-full absolute bg-[#8b2727] -top-2 left-5 text-white min-w-[15px] h-4.5 flex items-center justify-center transition-all duration-300 group-hover:bg-[#d2af6f] group-hover:text-black">
                      {cartCount ?? 0}
                    </b>
                  </Link>
                </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-5">
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
