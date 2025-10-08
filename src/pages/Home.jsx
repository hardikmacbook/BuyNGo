import React from "react";
import Carousel from "../componets/Home/Slider/Carousel";
import ProductCard from "../context/ProductCard";
import OurCoreValue from "../componets/Home/StoreValue/OurCoreValue";
import Review from "../componets/Home/Review/Review";
import Footer from "../componets/Footer/Footer";
import SetPageTitle from "../componets/SetPageTitle";
import MagicBento from "../componets/ui/demo/MagicBento";
// import VelocityText from "../componets/Home/text/VelocityText";

const Home = () => {
  return (
    <>
    <SetPageTitle title="Home - BuyNGO"/>
      {/* h-screen remove करें क्योंकि VelocityText का height बहुत ज्यादा है */}
      <div className="w-full">
        <Carousel />
        {/* <VelocityText /> */}
        <OurCoreValue />
        <ProductCard />
        <Review />
        <Footer />
        <MagicBento/>
      </div>
    </>
  );
};

export default Home;
