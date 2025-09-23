import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaLuggageCart } from "react-icons/fa";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { cartCount } = useCart();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 60 || currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed z-50 lg:w-[35vw] w-[90vw] max-w-3xl bg-white/30 shadow-lg backdrop-blur-lg rounded-2xl transition-transform duration-500 ease-in-out`}
      style={{
        top: "1rem",
        left: "50%",
        transform: isVisible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(-150%)",
      }}
    >
      <nav className="px-4 sm:px-8 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {NAV_ITEMS.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="text-black transition-colors duration-200 relative inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-black after:left-0 after:-bottom-1 after:transition-all after:duration-200 hover:after:w-full focus:after:w-full"
              >
                {name}
              </Link>
            ))}
            {/* Cart Icon (Desktop) */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center ml-2 group p-2 rounded"
              aria-label="View cart"
            >
              <FaLuggageCart className="text-xl text-black" />
              <span className="absolute -top-1 -right-2 text-xs bg-black text-white rounded-full px-1.5 min-w-[18px] h-5 flex items-center justify-center">
                {cartCount ?? 0}
              </span>
            </Link>
          </div>

          {/* Mobile Right Side: Cart + Hamburger */}
          <div className="flex items-center space-x-3 lg:hidden">
            {/* Cart Icon (Mobile) */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center group p-2 rounded"
              aria-label="View cart"
            >
              <FaLuggageCart className="text-xl text-black" />
              <span className="absolute -top-1 -right-2 text-xs bg-black text-white rounded-full px-1.5 min-w-[18px] h-5 flex items-center justify-center">
                {cartCount ?? 0}
              </span>
            </Link>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-xl border border-gray-200 bg-white/70 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none cursor-pointer"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              {isMobileOpen ? (
                <X className="w-6 h-6 text-black" />
              ) : (
                <Menu className="w-6 h-6 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 ${
            isMobileOpen ? "max-h-[400px] opacity-100 mt-2" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="flex flex-col gap-2 py-4 px-2 bg-white/95 rounded-xl shadow border-t border-gray-200">
            {NAV_ITEMS.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setIsMobileOpen(false)}
                className="block px-4 py-2 text-base font-medium rounded-lg transition text-gray-800 hover:bg-gray-100 focus:bg-gray-200"
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
