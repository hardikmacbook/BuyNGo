import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Home, ChevronRight, Share2, Heart, ShoppingBag, Check, Image as ImageIcon } from "lucide-react";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { title } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

  // Helper function to create slug
  const createSlug = (productName) => {
    return productName?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
  };

  // Image placeholder component
  const ImagePlaceholder = ({ title, className }) => (
    <div className={`w-full h-full flex items-center justify-center bg-gray-100 ${className}`}>
      <div className="text-center">
        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-xs text-gray-500 px-2">{title?.slice(0, 20)}...</p>
      </div>
    </div>
  );

  // Single useEffect to fetch and find product
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!title) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);
        
        const response = await fetch("https://68871534071f195ca97f2f9b.mockapi.io/BuyNGO-Products");
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const productData = await response.json();
        
        if (!Array.isArray(productData) || productData.length === 0) {
          throw new Error('No products found');
        }

        const foundProduct = productData.find(p => createSlug(p.name) === title);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError(true);
        }
        
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [title]);

  // Add to cart function with quantity
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
      description: product.description,
      quantity
    };
    
    addToCart(cartProduct);
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Quantity handlers
  const incrementQuantity = () => {
    if (quantity < (product.stock_quantity || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Share product function
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing product: ${product.name}`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(error => console.log('Error copying link:', error));
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-lg text-black bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center border border-gray-200">
          <div className="w-12 h-12 border-4 border-t-black border-r-black border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          Loading product details...
        </div>
      </div>
    );
  }

  // If we're on the general products page (no title)
  if (!title) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
        <div className="bg-gray-50 rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-200">
          <h1 className="text-2xl font-bold mb-4 text-black">Products Page</h1>
          <p className="text-gray-600 mb-6">Please select a product from the home page to view details.</p>
          <Link to="/" className="text-white bg-black hover:bg-gray-800 px-6 py-3 rounded-lg inline-flex items-center transition-colors font-medium">
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  // If product not found or error occurred
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
        <div className="bg-gray-50 rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-200">
          <h1 className="text-2xl font-bold mb-4 text-black">Product Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, the product you're looking for doesn't exist or couldn't be loaded.</p>
          <div className="flex gap-4">
            <Link to="/shop" className="text-white bg-black hover:bg-gray-800 px-6 py-3 rounded-lg inline-flex items-center transition-colors font-medium">
              <Home className="w-4 h-4 mr-2" />
              Browse Products
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="border-2 border-black text-black hover:bg-black hover:text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Process product data
  const primaryImage = Array.isArray(product.images) ? product.images[0] : product.images;
  const allImages = Array.isArray(product.images) ? product.images : [product.images].filter(Boolean);
  const currentPrice = product.special_price || product.price;
  const originalPrice = product.special_price ? product.price : null;
  const hasDiscount = Boolean(product.special_price && product.special_price < product.price);
  const discountPercentage = hasDiscount ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : null;
  const isOutOfStock = product.stock_status === 'out_of_stock' || product.stock_quantity === 0;

  return (
    <div className="min-h-screen pt-28 bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 shadow-lg border-b border-gray-200">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="flex items-center hover:text-black transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-black transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-black font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="rounded-xl shadow-lg p-6 md:p-8 bg-gray-50 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images Section */}
            <div className="md:w-1/2">
              <div className="mb-4 h-80 md:h-96 flex items-center justify-center bg-white rounded-lg overflow-hidden relative group border border-gray-200">
                {imageError || !primaryImage ? (
                  <ImagePlaceholder title={product.name} className="rounded-lg" />
                ) : (
                  <img 
                    src={primaryImage}
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={() => setImageError(true)}
                    onLoad={(e) => {
                      e.target.style.opacity = '1';
                    }}
                    style={{ opacity: 0, transition: 'opacity 0.3s' }}
                  />
                )}
                
                {/* Discount badge */}
                {hasDiscount && (
                  <div className="absolute top-4 left-4 bg-black text-white text-sm font-bold px-2 py-1 rounded-full">
                    {discountPercentage}% OFF
                  </div>
                )}

                {/* Out of stock badge */}
                {isOutOfStock && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                    OUT OF STOCK
                  </div>
                )}
              </div>
              
              {/* Multiple images display */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`w-20 h-20 flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden ${
                      currentImage === index ? 'border-black' : 'border-gray-300'
                    } shadow-lg`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img 
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-contain bg-white"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Details Section */}
            <div className="md:w-1/2">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>
                <div className="flex gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <span className="inline-block text-sm text-white bg-black px-3 py-1 rounded-full font-medium">
                  {product.category}
                </span>
                {product.brand && (
                  <span className="inline-block text-sm text-black bg-gray-200 px-3 py-1 rounded-full font-medium">
                    {product.brand}
                  </span>
                )}
              </div>
              
              {/* Short description */}
              {product.short_description && (
                <p className="text-gray-700 mb-4 leading-relaxed font-medium">
                  {product.short_description}
                </p>
              )}
              
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {product.description}
              </p>
              
              <div className="mb-6 bg-white p-4 rounded-lg border border-gray-300">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-black">
                    {product.currency || '₹'}{currentPrice}
                  </span>
                  {originalPrice && hasDiscount && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        {product.currency || '₹'}{originalPrice}
                      </span>
                      <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-1 rounded">
                        {discountPercentage}% off
                      </span>
                    </>
                  )}
                </div>
                
                <div className={`text-sm mt-2 flex items-center ${
                  isOutOfStock ? 'text-red-600' : 'text-green-600'
                }`}>
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    isOutOfStock ? 'bg-red-500' : 'bg-green-500'
                  }`}></span>
                  {isOutOfStock ? 'Out of stock' : `${product.stock_quantity || 'In'} stock`}
                </div>

                {/* SKU */}
                {product.sku && (
                  <div className="text-xs text-gray-500 mt-1">
                    SKU: {product.sku}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg shadow-sm bg-white w-full sm:w-auto">
                  <button 
                    className="px-4 py-2 text-xl text-black hover:bg-gray-100 transition-colors rounded-l-lg disabled:opacity-50" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1 || isOutOfStock}
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-gray-300 text-center min-w-[60px] text-black">
                    {quantity}
                  </span>
                  <button 
                    className="px-4 py-2 text-xl text-black hover:bg-gray-100 transition-colors rounded-r-lg disabled:opacity-50"
                    onClick={incrementQuantity}
                    disabled={quantity >= (product.stock_quantity || 10) || isOutOfStock}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className={`cursor-pointer ${
                    addedToCart 
                      ? 'bg-green-600' 
                      : isOutOfStock 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-black hover:bg-gray-800'
                  } text-white px-6 py-3 rounded-lg transition-colors duration-200 flex-grow flex items-center justify-center gap-2 shadow-lg font-medium`}
                  disabled={addedToCart || isOutOfStock}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart
                    </>
                  ) : isOutOfStock ? (
                    'Out of Stock'
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
              
              <div className="border-t border-gray-300 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {product.brand && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">Brand:</span> 
                      <span className="bg-gray-100 text-black px-2 py-1 rounded border border-gray-300">
                        {product.brand}
                      </span>
                    </div>
                  )}
                  {product.color && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">Color:</span> 
                      <span className="bg-gray-100 text-black px-2 py-1 rounded border border-gray-300">
                        {product.color}
                      </span>
                    </div>
                  )}
                  {product.size && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">Size:</span> 
                      <span className="bg-gray-100 text-black px-2 py-1 rounded border border-gray-300">
                        {product.size}
                      </span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">Weight:</span> 
                      <span className="bg-gray-100 text-black px-2 py-1 rounded border border-gray-300">
                        {product.weight}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs Section */}
          <div className="mt-12">
            <div className="border-b border-gray-300">
              <nav className="flex -mb-px space-x-8 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'description' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'details' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Additional Details
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'specifications' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Specifications
                </button>
              </nav>
            </div>
            
            <div className="py-6">
              {activeTab === 'description' && (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="text-lg font-medium mb-4 text-black border-l-4 border-black pl-3">
                    Product Description
                  </h3>
                  <div className="space-y-4">
                    {product.short_description && (
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Overview</h4>
                        <p className="text-gray-700 leading-relaxed">{product.short_description}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Detailed Description</h4>
                      <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'details' && (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="text-lg font-medium mb-4 text-black border-l-4 border-black pl-3">
                    Additional Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-b border-gray-200 pb-2 flex justify-between">
                      <span className="font-medium text-gray-700">Product ID:</span> 
                      <span className="text-black">{product.product_id}</span>
                    </div>
                    <div className="border-b border-gray-200 pb-2 flex justify-between">
                      <span className="font-medium text-gray-700">Category:</span> 
                      <span className="text-black">{product.category}</span>
                    </div>
                    {product.subcategory && (
                      <div className="border-b border-gray-200 pb-2 flex justify-between">
                        <span className="font-medium text-gray-700">Subcategory:</span> 
                        <span className="text-black">{product.subcategory}</span>
                      </div>
                    )}
                    {product.brand && (
                      <div className="border-b border-gray-200 pb-2 flex justify-between">
                        <span className="font-medium text-gray-700">Brand:</span> 
                        <span className="text-black">{product.brand}</span>
                      </div>
                    )}
                    {product.sku && (
                      <div className="border-b border-gray-200 pb-2 flex justify-between">
                        <span className="font-medium text-gray-700">SKU:</span> 
                        <span className="text-black">{product.sku}</span>
                      </div>
                    )}
                    <div className="border-b border-gray-200 pb-2 flex justify-between">
                      <span className="font-medium text-gray-700">Stock Status:</span> 
                      <span className="text-black">{product.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                    <div className="border-b border-gray-200 pb-2 flex justify-between">
                      <span className="font-medium text-gray-700">Stock Quantity:</span> 
                      <span className="text-black">{product.stock_quantity || 0}</span>
                    </div>
                    {product.currency && (
                      <div className="border-b border-gray-200 pb-2 flex justify-between">
                        <span className="font-medium text-gray-700">Currency:</span> 
                        <span className="text-black">{product.currency}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="text-lg font-medium mb-4 text-black border-l-4 border-black pl-3">
                    Product Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.color && (
                      <div className="border-b border-gray-200 pb-2 flex justify-between">
                        <span className="font-medium text-gray-700">Color:</span> 
                        <span className="text-black">{product.color}</span>
                      </div>
                    )}
                    {product.size && (
                      <div className="border-b border-gray-200 pb-2 flex justify-between">
                        <span className="font-medium text-gray-700">Size:</span> 
                        <span className="text-black">{product.size}</span>
                      </div>
                    )}
                    {product.weight && (
                      <div className="border-b border-gray-200 pb-2 flex justify-between">
                        <span className="font-medium text-gray-700">Weight:</span> 
                        <span className="text-black">{product.weight}</span>
                      </div>
                    )}
                    {product.created_at && (
                      <div className="border-b border-gray-200 pb-2 flex justify-between">
                        <span className="font-medium text-gray-700">Date Added:</span> 
                        <span className="text-black">
                          {new Date(product.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {product.updated_at && (
                      <div className="border-b border-gray-200 pb-2 flex justify-between">
                        <span className="font-medium text-gray-700">Last Updated:</span> 
                        <span className="text-black">
                          {new Date(product.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
