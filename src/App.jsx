import React from 'react'
import Home from '../pages/Home'
import About from '../pages/About'
import Product from '../pages/Product'
import Contact from '../pages/Contact'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './componets/HomePage/Navbar/Header'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/products' element={<Product/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App