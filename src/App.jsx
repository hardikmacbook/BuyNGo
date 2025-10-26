import { BrowserRouter, Route, Routes, useLocation, } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./componets/Header/Navbar";
import ProductDetails from "./componets/Shop/ProductDetail";
import Shop from "./pages/Shop";
import Privacy from "./pages/Privacy";
import Footer from "./componets/Footer/Footer";
import ScrollToTop from "./componets/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import CookiePolicy from "./pages/CookiePolicy";
import TermsOfService from "./pages/TermsOfService";
import Newsletter from "./componets/ui/Newsletter";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MainLayout />
        <Newsletter />
      </BrowserRouter>
    </CartProvider>
  );
}

function MainLayout() {
  const location = useLocation();

  // Define the routes where Footer should NOT be shown
  const hideFooterRoutes = ["/"];

  // Check if current path matches any known route
  const knownRoutes = ["/", "/about", "/shop", "/contact", "/privacy-policy", "/cart", "/checkout", "/shop/:title", "/error", "/terms-of-service", "/cookie-policy"];
  const isKnownRoute = knownRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith("/shop/")
  );

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:title" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/Terms-of-service" element={<TermsOfService/>} />
        <Route path="/cookie-Policy" element={<CookiePolicy/>} />
        <Route path="*" element={<Error />} />
      </Routes>

      {/* Show footer only if it's not in hide list AND is a known route */}
      {!hideFooterRoutes.includes(location.pathname) && isKnownRoute && (
        <Footer />
      )}
    </>
  );
}

export default App;
