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
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const timeoutRef = useRef(null);

  // Fetch data from API
  useEffect(() => {
    const fetchSliderData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('https://68871534071f195ca97f2f9b.mockapi.io/BuyNGO-Slider');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate and set the data
        if (Array.isArray(data) && data.length > 0) {
          setMediaItems(data);
        } else {
          throw new Error('Invalid data format or empty array');
        }
      } catch (err) {
        console.error('Error fetching slider data:', err);
        setError(err.message);
        // No fallback data - just set empty array
        setMediaItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  const currentItem = useMemo(() => 
    mediaItems.length > 0 ? mediaItems[currentSlide] : null, 
    [mediaItems, currentSlide]
  );
  
  const isVideo = currentItem?.type === "video";

  // Fast loading effect
  useEffect(() => {
    if (!isLoading && mediaItems.length > 0) {
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, mediaItems.length]);

  // Reset currentSlide when mediaItems change
  useEffect(() => {
    if (mediaItems.length > 0 && currentSlide >= mediaItems.length) {
      setCurrentSlide(0);
    }
  }, [mediaItems.length, currentSlide]);

  // Optimized progress and auto-slide with RAF
  useEffect(() => {
    if (!isAutoPlay || isPlaying || !isLoaded || mediaItems.length === 0) {
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
    if (mediaItems.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
    setIsPlaying(false);
    setProgress(0);
  }, [mediaItems.length]);

  const prevSlide = useCallback(() => {
    if (mediaItems.length === 0) return;
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

  // Retry function
  const retryFetch = useCallback(() => {
    setError(null);
    setIsLoading(true);
    // Re-trigger the useEffect
    window.location.reload();
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

  // Loading state
  if (isLoading) {
    return (
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] min-h-[400px] max-h-[900px] bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Loading slider content...</p>
        </div>
      </div>
    );
  }

  // Error state - only show error, no fallback content
  if (error || mediaItems.length === 0) {
    return (
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] min-h-[400px] max-h-[900px] bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <div className="text-red-500 text-4xl">⚠️</div>
          <h3 className="text-gray-800 text-lg font-medium">Failed to Load Content</h3>
          <p className="text-gray-600 text-sm max-w-md">
            {error || 'No slider content available. Please check your connection and try again.'}
          </p>
          <button 
            onClick={retryFetch}
            className="px-6 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Initial loading check
  if (!isLoaded || !currentItem) {
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
              alt={currentItem.title || 'Slider image'}
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
        {mediaItems.length > 1 && (
          <>
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
          </>
        )}

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
            {mediaItems.length > 1 && (
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
            )}

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
