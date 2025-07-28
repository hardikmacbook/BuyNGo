import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";

const BeautifulSlider = () => {
  // ===== BASIC STATES =====
  // kya slide par hai
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // video play thay raho che ke nahi
  const [isPlaying, setIsPlaying] = useState(false);
  
  // video mute che ke nahi
  const [isMuted, setIsMuted] = useState(true);
  
  // API no data
  const [mediaItems, setMediaItems] = useState([]);
  
  // loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // error state
  const [error, setError] = useState(null);

  // ===== REFS =====
  const videoRef = useRef(null); // video element mate

  // ===== API CALL =====
  // component load thay tyare API call karo
  useEffect(() => {
    const fetchData = async () => {
      console.log("API call kari rahya chiye...");
      
      try {
        // API call
        const response = await fetch('https://68871534071f195ca97f2f9b.mockapi.io/BuyNGO-Slider');
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Data malyo:", data);
        
        // data set karo
        setMediaItems(data);
        setError(null);
        
      } catch (err) {
        console.error("Error ayo:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // empty dependency - fakat ek j var run thase

  // ===== CURRENT ITEM =====
  // haal ma kyo item display karvo che
  const currentItem = mediaItems[currentSlide] || null;
  const isVideo = currentItem?.type === "video";

  // ===== VIDEO HANDLING =====
  // video na lidhe jyare slide change thay
  useEffect(() => {
    if (videoRef.current && isVideo) {
      const video = videoRef.current;
      video.currentTime = 0; // video shuruaat thi chalavo

      if (isPlaying) {
        video.play().catch(err => console.log("Video play error:", err));
      } else {
        video.pause();
      }
    }
  }, [currentSlide, isPlaying, isVideo]);

  // ===== BUTTON FUNCTIONS =====
  
  // next slide par jav
  const nextSlide = () => {
    console.log("Next button dabavyu");
    setCurrentSlide(prev => (prev + 1) % mediaItems.length);
    setIsPlaying(false);
  };

  // previous slide par jav
  const prevSlide = () => {
    console.log("Previous button dabavyu");
    setCurrentSlide(prev => (prev - 1 + mediaItems.length) % mediaItems.length);
    setIsPlaying(false);
  };

  // specific slide par jav
  const goToSlide = (index) => {
    console.log(`Slide ${index + 1} par gaya`);
    setCurrentSlide(index);
    setIsPlaying(false);
  };

  // video play/pause toggle
  const togglePlay = () => {
    if (!isVideo || !videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      console.log("Video pause karyu");
    } else {
      videoRef.current.play();
      console.log("Video play karyu");
    }
    setIsPlaying(!isPlaying);
  };

  // sound toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    console.log(newMuted ? "Mute karyu" : "Unmute karyu");
  };

  // retry function
  const retryFetch = () => {
    console.log("Retry kari rahya chiye...");
    setError(null);
    setIsLoading(true);
    window.location.reload();
  };

  // ===== RENDER CONDITIONS =====
  
  // loading state
  if (isLoading) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Slider load thay che...</p>
        </div>
      </div>
    );
  }

  // error state
  if (error || mediaItems.length === 0) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-gray-800 text-lg font-medium mb-2">Content load nathi thatu</h3>
          <p className="text-gray-600 text-sm mb-4">{error || 'Koi data nathi maltu'}</p>
          <button onClick={retryFetch} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Retry karo
          </button>
        </div>
      </div>
    );
  }

  // no current item
  if (!currentItem) {
    return (
      <div className="relative w-full h-[80vh] bg-gray-100 flex items-center justify-center">
        <p>Koi content available nathi</p>
      </div>
    );
  }

  // ===== MAIN RENDER =====
  return (
    <div className="relative w-full">
      
      {/* Main Container */}
      <div className="relative w-full h-[80vh] overflow-hidden">

        {/* Media Content - video athva image */}
        <div className="absolute inset-0">
          {isVideo ? (
            // video element
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
            // image element
            <img
              src={currentItem.url}
              alt={currentItem.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* dark overlay - text dekhava mate */}
        <div className="absolute inset-0" />

        {/* top controls - sound button */}
        <div className="absolute top-4 right-4 flex gap-2 z-40">
          {/* sound toggle button - fakat video mate */}
          {isVideo && (
            <button
              onClick={toggleMute}
              className="p-2 bg-black/50 rounded-full text-white border border-white/30"
              title={isMuted ? 'Sound chalu karo' : 'Sound band karo'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* navigation arrows - fakat multiple slides hoy to */}
        {mediaItems.length > 1 && (
          <>
            {/* previous button */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white border border-white/30 hover:bg-black/70 z-40"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* next button */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white border border-white/30 hover:bg-black/70 z-40"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* video play button - fakat video mate */}
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

        {/* content text - fakat image mate */}
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

        {/* bottom controls */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-30">
          
          {/* slide indicators - dots */}
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

          {/* slide counter */}
          <div className="flex items-center gap-2 px-3 py-1 bg-black/50 rounded-full border border-white/30">
            <span className="text-white text-sm">
              {currentSlide + 1} / {mediaItems.length}
            </span>
            <span className="text-white/70 text-xs">
              {isVideo ? "VIDEO" : "IMAGE"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BeautifulSlider;
