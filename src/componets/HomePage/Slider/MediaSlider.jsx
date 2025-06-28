import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize2, Heart, Share2 } from 'lucide-react';

const MediaSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  // Mixed media data - images and videos
  const mediaItems = [
    {
      id: 1,
      type: 'image',
      title: "Neural Network Architecture",
      description: "Explore the intricate connections and pathways that form the backbone of artificial intelligence systems.",
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop&q=80",
      category: "AI Technology",
      duration: "5 min read"
    },
    {
      id: 2,
      type: 'video',
      title: "Machine Learning in Action",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&h=1080&fit=crop&q=80",
      category: "Deep Learning"
    },
    {
      id: 3,
      type: 'image',
      title: "Quantum Computing Revolution",
      description: "Witness the convergence of quantum mechanics and artificial intelligence creating unprecedented computational possibilities.",
      url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&h=1080&fit=crop&q=80",
      category: "Quantum AI",
      duration: "8 min read"
    },
    {
      id: 4,
      type: 'video',
      title: "Future of AI",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&q=80",
      category: "Innovation"
    },
    {
      id: 5,
      type: 'image',
      title: "Data Visualization Mastery",
      description: "Transform complex datasets into stunning visual narratives that reveal hidden patterns and insights.",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=80",
      category: "Data Science",
      duration: "6 min read"
    },
    {
      id: 6,
      type: 'video',
      title: "Robotics & AI",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&h=1080&fit=crop&q=80",
      category: "Robotics"
    }
  ];

  const currentItem = mediaItems[currentSlide];
  const isVideo = currentItem.type === 'video';

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlay && !isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
      }, isVideo ? 8000 : 6000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, isPlaying, mediaItems.length, isVideo]);

  // Reset video when slide changes
  useEffect(() => {
    if (videoRef.current && isVideo) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play();
      }
    }
  }, [currentSlide, isVideo]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    setIsPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <div className="relative w-full h-[50vh] sm:h-screen overflow-hidden bg-black">
      {/* Main Media Container */}
      <div className="relative w-full h-full">
        {/* Media Display */}
        <div className="absolute inset-0">
          {isVideo ? (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              poster={currentItem.thumbnail}
              muted={isMuted}
              loop
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={currentItem.url} type="video/mp4" />
            </video>
          ) : (
            <img
              src={currentItem.url}
              alt={currentItem.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
            />
          )}
          
          {/* Gradient Overlay for Images */}
          {!isVideo && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          )}
        </div>

        {/* Text Overlay for Images Only */}
        {!isVideo && (
          <div className="absolute inset-0 flex items-end justify-start p-3 sm:p-6 lg:p-12">
            <div className="max-w-3xl space-y-3 sm:space-y-6 animate-fade-in pb-20 sm:pb-60 lg:pb-10 sm:p-10 pl-15 sm:pl-15">
              {/* Category Badge */}
              <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                <span className="text-white text-xs sm:text-sm font-medium">
                  {currentItem.category}
                </span>
                {currentItem.duration && (
                  <>
                    <div className="w-1 h-1 bg-white/60 rounded-full mx-2 sm:mx-3"></div>
                    <span className="text-white/80 text-xs sm:text-sm">{currentItem.duration}</span>
                  </>
                )}
              </div>
              
              {/* Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-7xl font-bold text-white leading-tight">
                {currentItem.title}
              </h1>
              
              {/* Description */}
              <p className="text-white/90 text-sm sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                {currentItem.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-4 pt-2 sm:pt-4">
                <button className="group relative inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-2xl">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  Read Article
                </button>
                
                <button className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/80 font-medium transition-all duration-300 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95 shadow-xl">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
                <button className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/80 font-medium transition-all duration-300 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95 shadow-xl">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Controls Overlay */}
        {isVideo && (
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              showControls ? 'bg-black/20' : 'bg-transparent'
            }`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <div className={`transition-all duration-300 ${showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <button
                onClick={togglePlay}
                className="p-4 sm:p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
              >
                {isPlaying ? <Pause className="w-8 h-8 sm:w-12 sm:h-12" /> : <Play className="w-8 h-8 sm:w-12 sm:h-12 ml-1" />}
              </button>
            </div>
          </div>
        )}

        {/* Top Controls Bar */}
        <div className="absolute top-3 sm:top-6 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between">
          {/* Category Badge */}
          <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2 sm:mr-3"></div>
            <span className="text-white text-xs sm:text-sm font-medium">
              {currentItem.category}
            </span>
          </div>

          {/* Video Controls */}
          {isVideo && (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleMute}
                className="p-2 sm:p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-xl"
              >
                {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              
              <button className="p-2 sm:p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-xl">
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Controls */}
        <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between">
          {/* Slide Indicators */}
          <div className="flex items-center gap-1 sm:gap-2">
            {mediaItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? 'w-12 sm:w-16 h-2 sm:h-3 bg-white shadow-lg shadow-white/50'
                    : 'w-2 sm:w-3 h-2 sm:h-3 bg-white/40 hover:bg-white/60'
                }`}
              >
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                )}
                {/* Media Type Indicator */}
                <div className="absolute top-0 right-0 w-1 h-1 rounded-full bg-white/60"></div>
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Slide Counter */}
            <div className="px-2 sm:px-4 py-1 sm:py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-xl">
              <span className="text-white text-xs sm:text-sm font-medium">
                {String(currentSlide + 1).padStart(2, '0')} / {String(mediaItems.length).padStart(2, '0')}
              </span>
            </div>
            
            {/* Auto-play Toggle */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-xl shadow-xl ${
                isAutoPlay
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                  : 'bg-white/10 text-white/80 border border-white/20 hover:bg-white/20'
              }`}
            >
              AUTO {isAutoPlay ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </div>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sint maxime repudiandae nesciunt tenetur minima minus ratione veniam error molestiae saepe distinctio soluta temporibus, asperiores nostrum! Enim quaerat quasi eius qui ratione mollitia amet quos esse molestias praesentium, nobis autem porro sit eaque, magnam dignissimos, ipsum excepturi neque aut ex accusamus explicabo unde recusandae. Aspernatur tempore assumenda illum exercitationem architecto a, voluptates impedit modi quas! Beatae quod numquam magni similique officiis autem molestias, modi maxime! Quo odit provident aperiam impedit consequuntur? Quod eos, non est quaerat incidunt earum quo aperiam tempore quia reiciendis voluptatem animi odio, nisi consectetur repellendus atque. Unde sit ipsam, soluta omnis repellendus libero ducimus sint expedita corrupti illo. Nam soluta consequuntur exercitationem eius tenetur rerum iure ratione ducimus vel facere itaque cupiditate veritatis, rem ipsam tempora. Maiores rerum vero, dolor eos quaerat impedit? Natus voluptatem et quidem molestias, impedit aperiam voluptas omnis odio porro consectetur tempore vel minima cum quo ad quisquam. Accusantium molestiae ab, corrupti ullam rerum quos quis tempore fuga non officia, et eius dignissimos doloremque necessitatibus cum alias voluptatum aspernatur a autem voluptate esse. Necessitatibus neque laboriosam harum nisi similique quae fugiat. Id, recusandae. Impedit, sit, quibusdam unde officiis aspernatur quis rerum aliquid tempora inventore expedita cumque modi veritatis eveniet omnis recusandae sunt quae. Nesciunt beatae blanditiis minima explicabo non nulla commodi quas, excepturi laudantium, rerum accusamus necessitatibus et dolor consequuntur, neque nihil repellat quisquam voluptas dolores omnis tempora odio itaque fugit? Libero, voluptate eaque neque, corporis nostrum dolorum vitae illum doloremque officia ducimus laudantium, sequi delectus accusamus! Libero, reprehenderit placeat aspernatur, aliquam rem in voluptas ipsum aperiam asperiores rerum et! Et possimus placeat optio consequuntur doloremque facere laborum iusto necessitatibus. Perspiciatis necessitatibus, voluptatibus delectus officia velit, reiciendis doloremque libero soluta repellat iste veniam recusandae eum animi dignissimos inventore perferendis laborum sapiente asperiores labore incidunt neque? Ex vitae ut ipsum incidunt qui quo ipsa et facilis? Veniam debitis repellat maxime minus quaerat cupiditate aut corporis quas adipisci a deserunt fuga est dolores id alias magni, nulla, omnis nam harum ullam impedit? Nihil voluptas iure magni repellendus ex ipsam ab. Nulla cupiditate culpa praesentium optio dolor reprehenderit perspiciatis soluta, autem voluptatem laboriosam eaque aliquam aut nostrum, consectetur quod cum reiciendis, quia ex temporibus dignissimos illum fugiat! Quo voluptatum nihil repellendus consequatur dolorem? Numquam vitae, doloribus corrupti architecto id eaque similique molestias soluta. Delectus eligendi sed minima animi excepturi eos aliquid, harum repellendus veniam magni illum inventore, numquam dicta sequi quod sapiente impedit. Inventore, labore deserunt eaque assumenda, sint eveniet pariatur nesciunt, maxime dolorum reiciendis voluptatum beatae voluptatibus consequatur quis autem repudiandae? Nulla facere alias quasi sunt excepturi reprehenderit officiis ab neque, omnis provident est nostrum exercitationem doloremque minus deleniti repellendus similique quae molestiae consequuntur consequatur? Dolorum provident earum sit atque perferendis. Doloribus, facilis est culpa minima fugit veritatis deleniti voluptates porro consectetur fugiat, dolor sequi earum odit dolorem assumenda pariatur officiis et amet at tempore placeat magnam consequuntur qui! Beatae quam doloremque, fugiat asperiores, dolores libero excepturi, et odio suscipit inventore mollitia aut voluptates impedit! Aspernatur vel totam aut debitis rem non, nemo voluptatibus laborum id perspiciatis voluptates quidem sapiente ab numquam incidunt laboriosam porro quis fugit vitae odio corporis. Voluptates ipsum hic debitis quas corrupti molestiae totam atque tempora facilis tenetur magni autem nesciunt vitae minima eum ab laudantium, ipsa reprehenderit, quia numquam possimus alias. Tempora modi, voluptas natus dolor a maxime cumque dignissimos nam dicta magnam pariatur dolore esse veniam saepe ratione ea sint nobis fugiat eos neque iusto velit? Vero dolorem beatae minima et deleniti architecto magni temporibus cumque reprehenderit modi eveniet consequuntur eos impedit aliquid dolores fugiat provident dolorum laudantium quibusdam necessitatibus, totam vitae rerum ratione quo! Excepturi laudantium non ratione magnam ullam cumque asperiores mollitia voluptates sunt. Assumenda suscipit eum quo velit rerum molestiae non quibusdam maxime sint debitis error, vel sequi dolor, voluptates accusamus earum porro molestias explicabo. Numquam aliquid ducimus harum rem in reiciendis mollitia adipisci labore. Deleniti id esse totam rerum quae laboriosam facere sed eos laborum exercitationem harum, nulla pariatur suscipit qui fuga laudantium, earum dolore nihil voluptatem. Mollitia, aperiam architecto. Amet sunt aliquam quod similique commodi repudiandae hic accusantium mollitia natus! Ducimus voluptatibus cupiditate esse unde eaque velit explicabo tempora necessitatibus, dolor ratione eos corrupti, obcaecati vitae quos qui porro nemo provident? Asperiores neque sequi velit quis id autem quasi dolorum tenetur explicabo minus. Cum quas velit dolorem nulla nobis accusamus doloribus a eaque explicabo, necessitatibus sit dolore, ullam numquam, optio illo eveniet. Provident cum rem accusantium praesentium ullam expedita ratione facilis dolorum minus illum inventore temporibus non mollitia, in voluptatum obcaecati. Expedita quia assumenda explicabo neque maxime sint, inventore quod nesciunt consectetur laborum ad similique ab consequatur minus quo voluptatum? Libero quod unde, incidunt at ipsa laborum quasi nulla maiores porro ex voluptates iure, modi animi commodi repellat reprehenderit? Distinctio assumenda asperiores itaque sed id, similique necessitatibus mollitia explicabo officiis, libero veritatis illum debitis iste voluptatem, vel vero fuga quos perspiciatis fugiat ab! Voluptatem laboriosam, veritatis, molestias vero saepe placeat ratione magnam commodi quia similique assumenda! Optio, necessitatibus, reprehenderit dolore aliquid nam reiciendis earum quidem sed, velit aperiam obcaecati. Suscipit, maxime, fugit quam ullam cupiditate architecto ad earum itaque nihil tempore quod molestiae error vero excepturi aut doloremque tenetur, voluptas magnam veritatis quidem libero. Sunt perferendis, harum minus reprehenderit maxime et ducimus iste perspiciatis corrupti libero esse consequatur id, odio atque aliquam natus doloribus voluptatum architecto soluta! Explicabo, quam assumenda! Aperiam culpa laboriosam ab veniam tempora odio ipsa, distinctio voluptas enim, perspiciatis, dicta asperiores minus autem similique a facere amet maxime non sed illo. Cumque accusamus, quibusdam, aspernatur quis voluptate modi exercitationem culpa laboriosam minima suscipit quia unde labore! Rerum maxime, omnis praesentium ratione odio deserunt repudiandae illo officia explicabo! Magnam, excepturi. Nam possimus exercitationem similique voluptatibus unde? Repudiandae dolores, soluta consectetur quo ipsam, beatae magni earum itaque eaque error omnis saepe, quasi illum labore voluptatem ratione maxime reiciendis asperiores. In itaque, perspiciatis aut eos libero nobis. Officia, ratione. Impedit fuga, fugit fugiat minus doloremque, ad id repellendus aliquid ea corrupti, architecto omnis!</p>
    </>
);
};

export default MediaSlider;