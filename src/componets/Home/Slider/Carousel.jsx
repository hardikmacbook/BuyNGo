import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";

const BeautifulSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const timeoutRef = useRef(null);

  // Memoized media items to prevent recreation
  const mediaItems = useMemo(() => [
    {
      id: 1,
      type: "video",
      title: "Featured Products",
      url: "https://e3w9maxxkbm3wyrc.public.blob.vercel-storage.com/apple.mp4",
      thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1920&h=1080&fit=crop&q=90",
    },
    {
      id: 2,
      type: "image",
      title: "Premium Collection",
      description: "Discover our carefully curated selection of premium products designed for modern living.",
      url: "https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=1920&h=800&fit=crop&q=90",
    },
    {
      id: 3,
      type: "image",
      title: "New Arrivals",
      description: "Explore the latest additions to our collection with innovative designs and quality craftsmanship.",
      url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1920&h=1080&fit=crop&q=90",
    },
    {
      id: 4,
      type: "video",
      title: "Brand Showcase",
      url: "https://e3w9maxxkbm3wyrc.public.blob.vercel-storage.com/cloths.mp4",
      thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1920&h=1080&fit=crop&q=90",
    },
    {
      id: 5,
      type: "image",
      title: "Special Offers",
      description: "Limited time deals on our most popular products with exceptional value and quality.",
      url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1920&h=1080&fit=crop&q=90",
    },
  ], []);

  const currentItem = useMemo(() => mediaItems[currentSlide], [mediaItems, currentSlide]);
  const isVideo = currentItem.type === "video";

  // Fast loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Optimized progress and auto-slide with RAF
  useEffect(() => {
    if (!isAutoPlay || isPlaying || !isLoaded) {
      setProgress(0);
      return;
    }

    const duration = isVideo ? 8000 : 6000;
    const startTime = performance.now();

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      if (newProgress >= 100) {
        setProgress(0);
        setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
      } else {
        setProgress(newProgress);
        progressRef.current = requestAnimationFrame(updateProgress);
      }
    };

    progressRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (progressRef.current) {
        cancelAnimationFrame(progressRef.current);
      }
    };
  }, [isAutoPlay, isPlaying, currentSlide, mediaItems.length, isVideo, isLoaded]);

  // Optimized video handling
  useEffect(() => {
    if (!videoRef.current || !isVideo) return;
    
    const video = videoRef.current;
    video.currentTime = 0;
    
    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handle play rejection silently
        });
      }
    }
  }, [currentSlide, isVideo, isPlaying]);

  // Memoized navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
    setIsPlaying(false);
    setProgress(0);
  }, [mediaItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    setIsPlaying(false);
    setProgress(0);
  }, [mediaItems.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setProgress(0);
  }, []);

  const togglePlay = useCallback(() => {
    if (!isVideo || !videoRef.current) return;
    
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isVideo, isPlaying]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  }, [isMuted]);

  // Optimized controls visibility
  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowControls(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setShowControls(false), 1000);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (progressRef.current) {
        cancelAnimationFrame(progressRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] min-h-[400px] max-h-[900px] bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full">

      {/* Main Container */}
      <div className="relative w-full overflow-hidden h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] min-h-[400px] max-h-[900px] bg-gray-100">
        {/* Media Display */}
        <div className="absolute inset-0 z-10">
          {isVideo ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={currentItem.thumbnail}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={currentItem.url} type="video/mp4" />
            </video>
          ) : (
            <img
              src={currentItem.url}
              alt={currentItem.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />

        {/* Top Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-40">
          {isVideo && (
            <button
              onClick={toggleMute}
              className="p-2 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/60 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/60 transition-all z-40"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/60 transition-all z-40"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Video Play Button */}
        {isVideo && (
          <div
            className="absolute inset-0 flex items-center justify-center z-30"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={togglePlay}
              className={`p-6 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/60 transition-all ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </button>
          </div>
        )}

        {/* Content - Only for Images */}
        {!isVideo && (
         <div className="absolute top-1/2 left-10 lg:left-20 z-30 transform -translate-y-1/2">
  <div className="max-w-4xl px-8">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-4 leading-tight">
      {currentItem.title}
    </h1>
    {currentItem.description && (
      <p className="text-white/90 text-base lg:text-lg max-w-3xl leading-relaxed">
        {currentItem.description}
      </p>
    )}
  </div>
</div>


        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <div className="flex items-center justify-between px-6 pb-6">
            {/* Slide Indicators */}
            <div className="flex items-center gap-2">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full">
              <span className="text-white text-sm font-mono">
                {String(currentSlide + 1).padStart(2, "0")} / {String(mediaItems.length).padStart(2, "0")}
              </span>
              <div className="w-1 h-1 bg-white/60 rounded-full" />
              <span className="text-white/80 text-xs">
                {isVideo ? "VIDEO" : "IMAGE"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautifulSlider;
