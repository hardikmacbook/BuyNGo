import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../componets/SectionHeadings/Heading";
import { ShoppingCart, Image as ImageIcon } from "lucide-react";
import { useCart } from "./CartContext";
import Button from "../componets/Home/demo/Button";

const DEFAULT_AUTOPLAY = true; // preference ke hisaab se false bhi kiya ja sakta hai

const ProductsCarouselBuyNGO = () => {
  const [products, setProducts] = useState([]);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(DEFAULT_AUTOPLAY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageErrors, setImageErrors] = useState(new Set());
  const intervalRef = useRef(null);
  const { addToCart } = useCart();

  // fetch products (MockAPI)
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await fetch(
          "https://68871534071f195ca97f2f9b.mockapi.io/BuyNGO-Products"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (isMounted) {
          const list = Array.isArray(data) ? data : [];
          setProducts(list.slice(0, 12)); // <<< limit to 12
        }
      } catch (e) {
        console.error("Error fetching products:", e);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setItemsPerView(4);
      else if (w >= 768) setItemsPerView(3);
      else if (w >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // autoplay
  useEffect(() => {
    if (isAutoPlaying && products.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const maxSlide = Math.max(0, products.length - itemsPerView);
          return prev >= maxSlide ? 0 : prev + 1;
        });
      }, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, products.length, itemsPerView]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const createSlug = (text = "") =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleImageError = (id) =>
    setImageErrors((prev) => new Set(prev).add(id));

  const nextSlide = () => {
    const maxSlide = Math.max(0, products.length - itemsPerView);
    setCurrentSlide((p) => (p >= maxSlide ? 0 : p + 1));
  };
  const prevSlide = () => {
    const maxSlide = Math.max(0, products.length - itemsPerView);
    setCurrentSlide((p) => (p <= 0 ? maxSlide : p - 1));
  };
  const goToSlide = (i) => setCurrentSlide(i);

  const totalDots = Math.max(0, products.length - itemsPerView) + 1;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading products...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-white p-8 rounded-2xl border-2 border-gray-100 max-w-md">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We’re having trouble loading the products. Please try again.
          </p>
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
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <Heading
          heading="Shop the Best. Love What You Buy"
          desc="Top-quality products. Great prices. Fast delivery. Discover your next favorite item today!"
        />
      </div>

      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Track container */}
        <div className="overflow-hidden rounded-3xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-2xl p-6">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
            }}
          >
            {products.map((product) => {
              const primaryImage = Array.isArray(product.images)
                ? product.images?.[0]
                : product.images;
              const currentPrice = product.special_price || product.price;
              const originalPrice = product.special_price
                ? product.price
                : null;
              const hasDiscount = Boolean(
                product.special_price && product.special_price < product.price
              );

              return (
                <div
                  key={product.product_id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-white rounded-2xl shadow-lg border border-[#d2af6f]/20 hover:border-[#000] transition-all duration-300 p-6 h-full flex flex-col hover:shadow-2xl">
                    <Link
                      to={`/shop/${createSlug(product.name)}`}
                      className="w-full h-48 mb-4 rounded-xl flex items-center justify-center overflow-hidden"
                    >
                      <div className="w-full h-full">
                        {imageErrors.has(product.product_id) ||
                        !primaryImage ? (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <div className="text-center">
                              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-500 px-2">
                                {(product.name || "Product")?.slice(0, 20)}...
                              </p>
                            </div>
                          </div>
                        ) : (
                          <img
                            className="w-full h-full object-contain p-4"
                            src={primaryImage}
                            alt={product.name}
                            loading="lazy"
                            onError={() => handleImageError(product.product_id)}
                          />
                        )}
                      </div>
                    </Link>

                    <div className="flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                          {product.name?.length > 25
                            ? product.name.slice(0, 25) + "..."
                            : product.name}
                        </h3>
                        {product.brand ? (
                          <div className="flex items-center bg-[#f8f3e9] px-2 py-1 rounded-full">
                            <span className="text-sm text-gray-700 ml-1 font-medium">
                              {product.brand}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center bg-[#f8f3e9] px-2 py-1 rounded-full">
                            <span className="text-sm text-gray-700 ml-1 font-medium">
                              New
                            </span>
                          </div>
                        )}
                      </div>

                      {product.short_description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.short_description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-[#000] bg-[#f8f3e9] px-3 py-1 rounded-full font-medium">
                          {product.category}
                        </span>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl font-medium text-gray-900">
                              {product.currency || "₹"}
                              {currentPrice}
                            </span>
                            {originalPrice && hasDiscount && (
                              <span className="text-gray-500 line-through text-sm">
                                {product.currency || "₹"}
                                {originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                product.stock_status === "in_stock"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.stock_quantity > 0
                                ? `${product.stock_quantity} left`
                                : "Out of stock"}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const cartProduct = {
                              id: product.product_id,
                              title: product.name,
                              price: currentPrice,
                              image: Array.isArray(product.images)
                                ? product.images?.[0]
                                : product.images,
                              category: product.category,
                              description:
                                product.short_description ||
                                product.description,
                            };
                            addToCart(cartProduct);
                          }}
                          disabled={
                            product.stock_status === "out_of_stock" ||
                            product.stock_quantity === 0
                          }
                          className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                            product.stock_status === "out_of_stock" ||
                            product.stock_quantity === 0
                              ? "border-2 border-gray-200 text-gray-400 cursor-not-allowed"
                              : "border-2 border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900"
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>
                            {product.stock_status === "out_of_stock" ||
                            product.stock_quantity === 0
                              ? "Out of Stock"
                              : "Add to Cart"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#000] rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 z-10"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#000] rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 z-10"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          onClick={() => setIsAutoPlaying((s) => !s)}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#000] rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 z-10"
          aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
        >
          {isAutoPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Dots */}
      {totalDots > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index
                  ? "bg-[#000] w-8 h-3 shadow-lg"
                  : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress */}
      <div className="mt-6 bg-gray-200 rounded-full h-1 overflow-hidden">
        <div
          className="bg-[#000] h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / totalDots) * 100}%` }}
        />
      </div>

      {/* View all */}
      <div className="text-center mt-8">
        <div className="mt-8 flex justify-center">
          {/* <Link
            to="/shop"
            className="group border-2 border-gray-200 py-3 px-4 rounded-lg font-medium inline-flex items-center justify-center space-x-2 cursor-pointer text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
          >
            <span>View All Products</span>

            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link> */}
        <Link to="/shop">
          <Button text="All Products" showSvg={true} />
        </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsCarouselBuyNGO;
