import React from "react";
import AvinyaLogo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <Link to={"/"}>
        {/* <img
          className="w-[100px] sm:w-[80px] lg:w-[120px] h-[30px] sm:h-[40px] lg:h-[33px] object-contain transition-all duration-300"
          src={AvinyaLogo}
          alt="avinya logo"
          width="180"
          height="80"
        /> */}
        <span className="font-bold italic">BuyNGO</span>
      </Link>
    </>
  );
};

export default Logo;
