import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Star, Heart, ShoppingCart, ChevronDown, X } from 'lucide-react';

const EcommerceShop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'shop'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Set());

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.in/api/products?limit=150');
      const data = await response.json();
      setProducts(data.products || []);
      
      // Set initial price range based on products
      if (data.products && data.products.length > 0) {
        const prices = data.products.map(p => p.price);
        setPriceRange([0, Math.max(...prices) + 100]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique values for filters
  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))].filter(Boolean);
  }, [products]);

  const brands = useMemo(() => {
    return [...new Set(products.map(p => p.brand))].filter(Boolean);
  }, [products]);

  const colors = useMemo(() => {
    const allColors = products.flatMap(p => p.color ? p.color.split(',').map(c => c.trim()) : []);
    return [...new Set(allColors)].filter(Boolean);
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesBrand = !selectedBrand || product.brand === selectedBrand;
      const matchesColor = !selectedColor || (product.color && product.color.includes(selectedColor));
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesBrand && matchesColor && matchesPrice;
    });

    // Sort products
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedBrand, selectedColor, priceRange, sortBy]);

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const toggleCart = (productId) => {
    const newCart = new Set(cart);
    if (newCart.has(productId)) {
      newCart.delete(productId);
    } else {
      newCart.add(productId);
    }
    setCart(newCart);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedColor('');
    setPriceRange([0, 1000]);
    setSortBy('');
  };

  const ProductCard = ({ product, size = 'normal' }) => (
    <div className={`bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group ${size === 'small' ? 'h-80' : 'h-96'}`}>
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${size === 'small' ? 'h-40' : 'h-48'}`}
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`p-2 rounded-full transition-colors ${favorites.has(product.id) ? 'bg-red-500 text-white' : 'bg-gray-800/80 text-gray-300 hover:bg-red-500 hover:text-white'}`}
          >
            <Heart size={16} fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => toggleCart(product.id)}
            className={`p-2 rounded-full transition-colors ${cart.has(product.id) ? 'bg-green-500 text-white' : 'bg-gray-800/80 text-gray-300 hover:bg-green-500 hover:text-white'}`}
          >
            <ShoppingCart size={16} fill={cart.has(product.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            -{product.discount}%
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-300 ml-1">{product.rating || '4.5'}</span>
          </div>
          {product.brand && (
            <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">{product.brand}</span>
          )}
        </div>
        <h3 className={`font-semibold text-white mb-2 line-clamp-2 ${size === 'small' ? 'text-sm' : 'text-base'}`}>
          {product.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-purple-400">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <span className="text-xs text-gray-500 capitalize">{product.category}</span>
        </div>
      </div>
    </div>
  );

  const FilterSidebar = () => (
    <div className={`${showFilters ? 'block' : 'hidden lg:block'} lg:w-80 bg-gray-900 p-6 rounded-xl border border-gray-800 h-fit sticky top-4`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Filter size={20} />
          Filters
        </h3>
        <div className="flex gap-2">
          <button
            onClick={clearFilters}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Clear All
          </button>
          <button
            onClick={() => setShowFilters(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-300 mb-2 block">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-300 mb-2 block">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Brand */}
      {brands.length > 0 && (
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-300 mb-2 block">Brand</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      )}

      {/* Color */}
      {colors.length > 0 && (
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-300 mb-2 block">Color</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="">All Colors</option>
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
      )}

      {/* Sort By */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-300 mb-2 block">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
        >
          <option value="">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold mb-8 text-center">Featured Products</h3>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} size="small" />
            ))}
          </div>
        )}
      </section>
    </div>
  );

  const ShopPage = () => (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('home')}
                className="text-purple-400 hover:text-purple-300"
              >
                ← Back to Home
              </button>
              <h1 className="text-2xl font-bold text-purple-400">Shop</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-gray-800 px-3 py-2 rounded-lg flex items-center gap-2"
              >
                <Filter size={16} />
                Filters
              </button>
              <div className="flex items-center gap-2">
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">{favorites.size}</span>
                <Heart size={20} />
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">{cart.size}</span>
                <ShoppingCart size={20} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <FilterSidebar />
          
          <div className="flex-1">
            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-300">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400 mb-4">No products found</p>
                <button
                  onClick={clearFilters}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return currentView === 'home' ? <HomePage /> : <ShopPage />;
};

export default EcommerceShop;