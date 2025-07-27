import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { ShoppingCart, Image as ImageIcon } from "lucide-react";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageErrors, setImageErrors] = useState(new Set());
  const { addToCart } = useCart();

  // Handle image loading errors
  const handleImageError = (productId) => {
    setImageErrors(prev => new Set(prev).add(productId));
  };

  // Image placeholder component
  const ImagePlaceholder = ({ title }) => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-xs text-gray-500 px-2">{title?.slice(0, 20)}...</p>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://68850ebb745306380a3a371f.mockapi.io/ByuNGO");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const productData = await response.json();
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const createSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Transform product to match cart format
    const cartProduct = {
      id: product.product_id,
      title: product.name,
      price: product.special_price || product.price,
      image: Array.isArray(product.images) ? product.images[0] : product.images,
      category: product.category,
      description: product.description
    };
    
    addToCart(cartProduct);
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
        {products.slice(0, 8).map((product) => {
          const primaryImage = Array.isArray(product.images) ? product.images[0] : product.images;
          const currentPrice = product.special_price || product.price;
          const originalPrice = product.special_price ? product.price : null;
          const hasDiscount = Boolean(product.special_price && product.special_price < product.price);
          
          return (
            <div 
              key={product.product_id}
              className="relative group border-2 border-gray-100 rounded-2xl bg-white hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 ease-out hover:shadow-lg"
            >
              {/* Discount Badge */}
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                  -{Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}%
                </div>
              )}

              {/* Out of Stock Badge */}
              {product.stock_status === 'out_of_stock' && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                  Out of Stock
                </div>
              )}

              {/* Product Image */}
              <Link 
                to={`/shop/${createSlug(product.name)}`} 
                className="relative block"
              >
                <div className="h-48 bg-gray-50 rounded-t-2xl overflow-hidden">
                  {imageErrors.has(product.product_id) || !primaryImage ? (
                    <ImagePlaceholder title={product.name} />
                  ) : (
                    <img
                      src={primaryImage}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={() => handleImageError(product.product_id)}
                      onLoad={(e) => {
                        e.target.style.opacity = '1';
                      }}
                      style={{ opacity: 0, transition: 'opacity 0.3s' }}
                    />
                  )}
                </div>
              </Link>

              <div className="p-6">
                {/* Category and Brand */}
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                  {product.brand && (
                    <span className="text-xs text-gray-400 font-medium">
                      {product.brand}
                    </span>
                  )}
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-medium text-gray-900 mb-2 leading-tight">
                  {product.name.length > 50 
                    ? product.name.slice(0, 50) + "..." 
                    : product.name
                  }
                </h3>

                {/* Short Description */}
                {product.short_description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.short_description}
                  </p>
                )}

                {/* Product Details */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  {product.color && (
                    <span>Color: {product.color}</span>
                  )}
                  {product.size && (
                    <span>Size: {product.size}</span>
                  )}
                  {product.sku && (
                    <span>SKU: {product.sku}</span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-medium text-gray-900">
                      {product.currency || '₹'}{currentPrice}
                    </span>
                    {originalPrice && hasDiscount && (
                      <span className="text-gray-500 line-through text-sm">
                        {product.currency || '₹'}{originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {/* Stock Status */}
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.stock_status === 'in_stock' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock_quantity > 0 ? `${product.stock_quantity} left` : 'Out of stock'}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={product.stock_status === 'out_of_stock' || product.stock_quantity === 0}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    product.stock_status === 'out_of_stock' || product.stock_quantity === 0
                      ? 'border-2 border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-2 border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {product.stock_status === 'out_of_stock' || product.stock_quantity === 0 
                      ? 'Out of Stock' 
                      : 'Add to Cart'
                    }
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <Link to="/shop" className="border-2 border-gray-200 px-8 py-3 rounded-lg font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default ProductCard;
