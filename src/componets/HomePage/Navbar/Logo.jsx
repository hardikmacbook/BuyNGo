import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center space-x-3 group cursor-pointer">
        <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
          LOGO
        </span>
      </div>
      </Link>
    </>
  );
};

export default Logo;
