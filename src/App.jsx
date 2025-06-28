import React from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Product from '../pages/Product';
import Contact from '../pages/Contact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './componets/HomePage/Navbar/Header';
import AutoTitle from './componets/AutoTitle';
import Error from '../pages/Error';
const App = () => {
  // Wrap each component
  const HomeWithTitle = AutoTitle(Home);
  const AboutWithTitle = AutoTitle(About);
  const ProductWithTitle = AutoTitle(Product);
  const ContactWithTitle = AutoTitle(Contact);
  const ErrorWithTitle = AutoTitle(Error);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeWithTitle />} />
        <Route path="/about" element={<AboutWithTitle />} />
        <Route path="/products" element={<ProductWithTitle />} />
        <Route path="/contact" element={<ContactWithTitle />} />
        <Route path="*" element={<ErrorWithTitle />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
