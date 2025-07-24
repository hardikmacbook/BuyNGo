import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { ShoppingCart } from "lucide-react";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=100");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const createSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl border-2 border-gray-100 max-w-md">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">We're having trouble loading the products. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="border-2 border-gray-200 px-6 py-3 rounded-lg font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-light text-gray-900 mb-4">
          Our Products
        </h1>
        <div className="w-24 h-px bg-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
          Carefully curated products designed with quality and style in mind.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.slice(0, 8).map((product) => (
          <div 
            key={product.id}
            className="relative group border-2 border-gray-100 rounded-2xl bg-white hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 ease-out hover:shadow-lg"
          >
            {/* Discount Badge */}
            {product.discountPercentage > 0 && (
              <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-xs font-medium z-5">
                -{Math.round(product.discountPercentage)}%
              </div>
            )}

            {/* Product Image */}
            <Link 
              to={`/shop/${createSlug(product.title)}`} 
              className="relative block"
            >
              <div className="h-48 bg-gray-50 rounded-t-2xl overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </Link>

            {/* Product Content */}
            <div className="p-6">
              {/* Category */}
              <span className="inline-block text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
                {product.category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-medium text-gray-900 mb-2 leading-tight">
                {product.title.length > 50 
                  ? product.title.slice(0, 50) + "..." 
                  : product.title
                }
              </h3>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-gray-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-gray-900' : 'text-gray-300'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 text-sm">({product.rating})</span>
              </div>

              {/* Price Section */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-medium text-gray-900">₹{product.price}</span>
                  {product.discountPercentage > 0 && (
                    <span className="text-gray-500 line-through text-sm">
                      ₹{(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <Link
                onClick={(e) => handleAddToCart(e, product)}
                className="w-full border-2 border-gray-200 py-3 rounded-lg font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                  <ShoppingCart className="w-4 h-4" />
              
                <span>Add to Cart</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Products Button */}
      <div className="text-center mt-8">
        <Link to="/shop" className="border-2 border-gray-200 px-8 py-3 rounded-lg font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default ProductCard;
