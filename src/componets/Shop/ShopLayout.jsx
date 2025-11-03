import React, { useEffect, useState } from "react";
import { Search, Filter, Grid, List, ChevronDown, Star, ShoppingCart, Home, ChevronRight, X, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Heading from "../SectionHeadings/Heading";

const ShopLayout = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [imageErrors, setImageErrors] = useState(new Set());
  const { addToCart } = useCart();

  // Scroll to top when page changes
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [currentPage]);

  // Handle image loading errors
  const handleImageError = (productId) => {
    setImageErrors(prev => new Set(prev).add(productId));
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

  // Add to cart function
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

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(products => {
        setData(products);
        setFilteredData(products);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(products.map(product => product.category).filter(Boolean))];
        setCategories(uniqueCategories);
        
        // Extract unique brands
        const uniqueBrands = [...new Set(products.map(product => product.brand).filter(Boolean))];
        setBrands(uniqueBrands);
        
        // Set max price for price range
        const prices = products.map(product => product.special_price || product.price).filter(price => price);
        const maxPrice = Math.max(...prices);
        setMaxPrice(Math.ceil(maxPrice));
        setPriceRange([0, Math.ceil(maxPrice)]);
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = data.filter(product => {
      const matchesSearch = (product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.short_description?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
      const currentPrice = product.special_price || product.price;
      const matchesPrice = currentPrice >= priceRange[0] && currentPrice <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    // Sort products
    if (sortBy === "price-low") {
      filtered.sort((a, b) => (a.special_price || a.price) - (b.special_price || b.price));
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => (b.special_price || b.price) - (a.special_price || a.price));
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name?.localeCompare(b.name));
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [data, searchTerm, selectedCategory, selectedBrand, priceRange, sortBy]);

  // Function to create URL-friendly slugs from product names
  const createSlug = (name) => {
    return name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredData.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setPriceRange([0, maxPrice]);
    setSortBy("default");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-gray-600 font-light">Loading amazing products...</div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="pt-28 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="flex items-center hover:text-gray-900 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Shop</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
         <Heading
        heading="Shop the Best. Love What You Buy"
        desc="Top-quality products. Great prices. Fast delivery. Discover your next favorite item today!"
        />   
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 mb-8 shadow-sm">
          {/* Top Row - Search, Filter Toggle, View Mode */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* View Mode Toggle */}
              <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-3 transition-colors ${viewMode === 'grid' 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-3 transition-colors ${viewMode === 'list' 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Filter Options */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category?.charAt(0).toUpperCase() + category?.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                  >
                    <option value="all">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || maxPrice])}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                  >
                    <option value="default">Default</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{' '}
            <span className="font-medium">{Math.min(indexOfLastProduct, filteredData.length)}</span> of{' '}
            <span className="font-medium">{filteredData.length}</span> products
          </p>
        </div>

        {/* Products Grid/List */}
        <div id="product-list" className={`${viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
        } mb-8`}>
          {currentProducts.map((product) => {
            const primaryImage = Array.isArray(product.images) ? product.images[0] : product.images;
            const currentPrice = product.special_price || product.price;
            const originalPrice = product.special_price ? product.price : null;
            const hasDiscount = Boolean(product.special_price && product.special_price < product.price);
            
            return (
              <div 
                key={product.product_id}
                className={`group border-2 border-gray-100 rounded-2xl bg-white hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 ease-out hover:shadow-lg ${viewMode === 'list' ? 'flex p-6' : 'relative'}`}
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
                  className={`${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0 mr-6' : 'w-full h-48 mb-4'} bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden`}
                >
                  {imageErrors.has(product.product_id) || !primaryImage ? (
                    <ImagePlaceholder title={product.name} className="rounded-xl" />
                  ) : (
                    <img
                      className="max-w-full max-h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      src={primaryImage}
                      alt={product.name}
                      loading="lazy"
                      onError={() => handleImageError(product.product_id)}
                      onLoad={(e) => {
                        e.target.style.opacity = '1';
                      }}
                      style={{ opacity: 0, transition: 'opacity 0.3s' }}
                    />
                  )}
                </Link>
                
                {/* Product Info */}
                <div className={`${viewMode === 'list' ? 'flex-1' : 'p-6'}`}>
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

                  {/* Title */}
                  <h3 className="text-lg font-medium text-gray-900 mb-2 leading-tight">
                    {product.name?.length > (viewMode === 'list' ? 50 : 40) 
                      ? product.name.slice(0, viewMode === 'list' ? 50 : 40) + "..." 
                      : product.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {(product.short_description || product.description)?.length > (viewMode === 'list' ? 120 : 80) 
                      ? (product.short_description || product.description).slice(0, viewMode === 'list' ? 120 : 80) + "..." 
                      : (product.short_description || product.description)}
                  </p>

                  {/* Product Details */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    {product.color && (
                      <span>Color: {product.color}</span>
                    )}
                    {product.size && (
                      <span>Size: {product.size}</span>
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
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      product.stock_status === 'out_of_stock' || product.stock_quantity === 0
                        ? 'border-2 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-2 border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.stock_status === 'out_of_stock' || product.stock_quantity === 0 
                      ? 'Out of Stock' 
                      : 'Add to Cart'
                    }
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              const pageNumber = currentPage <= 3 ? index + 1 : currentPage - 2 + index;
              if (pageNumber > totalPages) return null;
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`px-4 py-2 border-2 rounded-lg transition-colors ${currentPage === pageNumber
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'border-gray-200 hover:border-gray-900 hover:text-gray-900'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-light text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="border-2 border-gray-200 px-6 py-3 rounded-lg font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>

    </>

  );
  
};

export default ShopLayout;
