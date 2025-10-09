import React from "react";
import Carousel from "../componets/Home/Slider/Carousel";
import ProductCard from "../context/ProductCard";
import OurCoreValue from "../componets/Home/StoreValue/OurCoreValue";
import Review from "../componets/Home/Review/Review";
import Footer from "../componets/Footer/Footer";
import SetPageTitle from "../componets/SetPageTitle";
// import DemoCard from "../componets/Home/demo/DemoCard";
// import DomeGallery from "../componets/Home/demo/DomeGallery";
// import VelocityText from "../componets/Home/text/VelocityText";

const Home = () => {
  return (
    <>
      <SetPageTitle title="Home - BuyNGO" />
      <div className="w-full">
        <Carousel />
        {/* <VelocityText /> */}
        <OurCoreValue />
        <ProductCard />
        <Review />
        {/* <DemoCard /> */}

        {/* <div style={{ width: '100vw', height: '100vh' }}>
        <DomeGallery />
    </div> */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
