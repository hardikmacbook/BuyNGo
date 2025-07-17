import React from 'react'
import Carousel from '../componets/Home/Slider/Carousel'
import ProductCard from '../context/ProductCard'
import OurCoreValue from '../componets/Home/StoreValue/OurCoreValue'
import Review from '../componets/Home/Review/Review'
import Footer from '../componets/Footer'
const Home = () => {
  return (
   <>
   <div className='w-full h-screen'>
   <Carousel/>
   <OurCoreValue/>
   <ProductCard/>
   <Review/>
   <Footer/>
   </div>
   </>
  )
}

export default Home