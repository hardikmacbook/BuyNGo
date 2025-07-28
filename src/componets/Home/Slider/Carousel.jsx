import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";

const SimpleSlider = () => {
  // ===== BASIC STATES =====
  // કયા slide પર છીએ
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Video play થઈ રહ્યો છે કે નહીં
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Video mute છે કે નહીં
  const [isMuted, setIsMuted] = useState(true);
  
  // AutoPlay ચાલુ છે કે નહીં
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  // Progress કેટલો થયો (0-100%)
  const [progress, setProgress] = useState(0);
  
  // API નો data
  const [mediaItems, setMediaItems] = useState([]);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Error state
  const [error, setError] = useState(null);

  // ===== REFS =====
  const videoRef = useRef(null); // Video element માટે
  const timerRef = useRef(null); // Timer માટે

  // ===== API CALL =====
  // Component load થાય ત્યારે API call કરો
  useEffect(() => {
    const fetchData = async () => {
      console.log("🔄 API call કરી રહ્યા છીએ...");
      
      try {
        // API call
        const response = await fetch('https://68871534071f195ca97f2f9b.mockapi.io/BuyNGO-Slider');
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ Data મળ્યો:", data);
        
        // Data set કરો
        setMediaItems(data);
        setError(null);
        
      } catch (err) {
        console.error("❌ Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency - ફક્ત એક જ વાર run થશે

  // ===== CURRENT ITEM =====
  // હાલમાં કયો item display કરવો છે
  const currentItem = mediaItems[currentSlide] || null;
  const isVideo = currentItem?.type === "video";

  // ===== AUTO-SLIDE TIMER =====
  // AutoPlay માટે timer
  useEffect(() => {
    // જો AutoPlay બંધ છે અથવા video play થઈ રહ્યો છે તો timer શરૂ ન કરો
    if (!isAutoPlay || isPlaying || mediaItems.length === 0) {
      setProgress(0);
      return;
    }

    console.log("⏰ Timer શરૂ કર્યું");
    
    // Video માટે 8 સેકંડ, Image માટે 6 સેકંડ
    const duration = isVideo ? 8000 : 6000;
    let startTime = Date.now();

    // Progress update કરવા માટે
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressPercent = (elapsed / duration) * 100;

      if (progressPercent >= 100) {
        // Next slide પર જાવ
        setCurrentSlide(prev => (prev + 1) % mediaItems.length);
        setProgress(0);
        console.log("➡️ Next slide પર ગયા");
      } else {
        // Progress update કરો
        setProgress(progressPercent);
        timerRef.current = setTimeout(updateProgress, 50); // 50ms માં update
      }
    };

    // Timer શરૂ કરો
    timerRef.current = setTimeout(updateProgress, 50);

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        console.log("🛑 Timer બંધ કર્યું");
      }
    };
  }, [currentSlide, isAutoPlay, isPlaying, mediaItems.length, isVideo]);

  // ===== VIDEO HANDLING =====
  // Video ના લીધે જ્યારે slide change થાય
  useEffect(() => {
    if (videoRef.current && isVideo) {
      const video = videoRef.current;
      video.currentTime = 0; // Video શરૂઆતથી ચલાવો

      if (isPlaying) {
        video.play().catch(err => console.log("Video play error:", err));
      } else {
        video.pause();
      }
    }
  }, [currentSlide, isPlaying, isVideo]);

  // ===== BUTTON FUNCTIONS =====
  
  // Next slide પર જાવ
  const nextSlide = () => {
    console.log("➡️ Next button દબાવ્યું");
    setCurrentSlide(prev => (prev + 1) % mediaItems.length);
    setIsPlaying(false);
    setProgress(0);
  };

  // Previous slide પર જાવ
  const prevSlide = () => {
    console.log("⬅️ Previous button દબાવ્યું");
    setCurrentSlide(prev => (prev - 1 + mediaItems.length) % mediaItems.length);
    setIsPlaying(false);
    setProgress(0);
  };

  // Specific slide પર જાવ
  const goToSlide = (index) => {
    console.log(`🎯 Slide ${index + 1} પર ગયા`);
    setCurrentSlide(index);
    setIsPlaying(false);
    setProgress(0);
  };

  // Video play/pause toggle
  const togglePlay = () => {
    if (!isVideo || !videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      console.log("⏸️ Video pause કર્યું");
    } else {
      videoRef.current.play();
      console.log("▶️ Video play કર્યું");
    }
    setIsPlaying(!isPlaying);
  };

  // Sound toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    console.log(newMuted ? "🔇 Mute કર્યું" : "🔊 Unmute કર્યું");
  };

  // AutoPlay toggle
  const toggleAutoPlay = () => {
    setIsAutoPlay(prev => !prev);
    setProgress(0);
    console.log(isAutoPlay ? "⏹️ AutoPlay બંધ કર્યું" : "▶️ AutoPlay ચાલુ કર્યું");
  };

  // Retry function
  const retryFetch = () => {
    console.log("🔄 Retry કરી રહ્યા છીએ...");
    setError(null);
    setIsLoading(true);
    window.location.reload();
  };

  // Cleanup when component unmount થાય
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // ===== RENDER CONDITIONS =====
  
  // Loading state
  if (isLoading) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading slider...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || mediaItems.length === 0) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-gray-800 text-lg font-medium mb-2">Error Loading Content</h3>
          <p className="text-gray-600 text-sm mb-4">{error || 'No data found'}</p>
          <button onClick={retryFetch} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No current item
  if (!currentItem) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-100 flex items-center justify-center">
        <p>No content available</p>
      </div>
    );
  }

  // ===== MAIN RENDER =====
  return (
    <div className="relative w-full">
      
      {/* Main Container */}
      <div className="relative w-full h-[80vh] bg-gray-900 overflow-hidden">
        
        {/* Progress Bar - ફક્ત AutoPlay ચાલુ હોય ત્યારે દેખાશે */}
        {isAutoPlay && progress > 0 && (
          <div className="absolute top-0 left-0 right-0 z-50">
            <div className="h-1 bg-gray-700">
              <div 
                className="h-full bg-white transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Media Content - Video અથવા Image */}
        <div className="absolute inset-0">
          {isVideo ? (
            // Video Element
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={currentItem.url} type="video/mp4" />
            </video>
          ) : (
            // Image Element
            <img
              src={currentItem.url}
              alt={currentItem.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Dark Overlay - Text દેખાવા માટે */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Top Controls - AutoPlay અને Sound buttons */}
        <div className="absolute top-4 right-4 flex gap-2 z-40">
          
          {/* AutoPlay Toggle Button */}
          <button
            onClick={toggleAutoPlay}
            className={`p-2 rounded-full text-white border border-white/30 ${
              isAutoPlay ? 'bg-green-500/70' : 'bg-black/50'
            }`}
            title={isAutoPlay ? 'AutoPlay બંધ કરો' : 'AutoPlay ચાલુ કરો'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Sound Toggle Button - ફક્ત Video માટે */}
          {isVideo && (
            <button
              onClick={toggleMute}
              className="p-2 bg-black/50 rounded-full text-white border border-white/30"
              title={isMuted ? 'Sound ચાલુ કરો' : 'Sound બંધ કરો'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Navigation Arrows - ફક્ત multiple slides હોય તો */}
        {mediaItems.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white border border-white/30 hover:bg-black/70 z-40"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white border border-white/30 hover:bg-black/70 z-40"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Video Play Button - ફક્ત Video માટે */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <button
              onClick={togglePlay}
              className="p-6 bg-black/50 rounded-full text-white border border-white/30 hover:bg-black/70"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </button>
          </div>
        )}

        {/* Content Text - ફક્ત Image માટે */}
        {!isVideo && (
          <div className="absolute top-1/2 left-8 -translate-y-1/2 z-30">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-light text-white mb-4">
                {currentItem.title}
              </h1>
              {currentItem.description && (
                <p className="text-white/90 text-lg">
                  {currentItem.description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-30">
          
          {/* Slide Indicators - Dots */}
          {mediaItems.length > 1 && (
            <div className="flex gap-2">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all ${
                    index === currentSlide
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Slide Counter */}
          <div className="flex items-center gap-2 px-3 py-1 bg-black/50 rounded-full border border-white/30">
            <span className="text-white text-sm">
              {currentSlide + 1} / {mediaItems.length}
            </span>
            <span className="text-white/70 text-xs">
              {isVideo ? "VIDEO" : "IMAGE"}
            </span>
            {isAutoPlay && (
              <span className="text-green-400 text-xs">AUTO</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SimpleSlider;
