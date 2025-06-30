import React, { useEffect, useRef } from 'react';
import { Package, Users, Calendar, Award, Target, TrendingUp, Rocket, Shield } from 'lucide-react';

const CompanyValues = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const gsapRef = useRef(null);
  const ScrollTriggerRef = useRef(null);

  const cardData = [
    {
      id: 1,
      icon: Package,
      title: '100+ Products',
      description: 'Innovative solutions delivered to transform your business',
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      id: 2,
      icon: Users,
      title: '1000+ Customers',
      description: 'Trusted by businesses worldwide across all industries',
      gradient: 'from-purple-500 to-pink-400',
    },
    {
      id: 3,
      icon: Calendar,
      title: '5+ Years',
      description: 'Of dedicated experience and continuous innovation',
      gradient: 'from-green-500 to-emerald-400',
    },
    {
      id: 4,
      icon: Award,
      title: '50+ Awards',
      description: 'Recognition for excellence and outstanding achievements',
      gradient: 'from-orange-500 to-yellow-400',
    },
    {
      id: 5,
      icon: Target,
      title: '99% Success Rate',
      description: 'Consistent quality delivery and client satisfaction',
      gradient: 'from-red-500 to-pink-400',
    },
    {
      id: 6,
      icon: Rocket,
      title: 'Innovation First',
      description: 'Leading the industry with cutting-edge technology',
      gradient: 'from-pink-500 to-rose-400',
    }
  ];

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        // Load GSAP from CDN
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        document.head.appendChild(gsapScript);

        await new Promise((resolve) => {
          gsapScript.onload = resolve;
        });

        // Load ScrollTrigger
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        document.head.appendChild(scrollTriggerScript);

        await new Promise((resolve) => {
          scrollTriggerScript.onload = resolve;
        });

        // Access GSAP from window object
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        
        gsapRef.current = gsap;
        ScrollTriggerRef.current = ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        // Set up the scroll-pin animation
        setupScrollPinAnimation(gsap, ScrollTrigger);

      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };

    loadGSAP();

    return () => {
      // Cleanup
      if (ScrollTriggerRef.current) {
        ScrollTriggerRef.current.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  const setupScrollPinAnimation = (gsap, ScrollTrigger) => {
    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!container || cards.length === 0) return;

    // Set initial state for all cards
    gsap.set(cards, {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotation: 5
    });

    // Create a timeline for the entire animation sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${cards.length * 100}vh`, // Extend scroll distance
        scrub: 1, // Smooth scroll-sync
        pin: true, // Pin the container
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentCardIndex = Math.floor(progress * cards.length);
          
          // Animate cards based on scroll progress
          cards.forEach((card, index) => {
            const cardProgress = Math.max(0, Math.min(1, (progress * cards.length) - index));
            
            if (cardProgress > 0) {
              gsap.set(card, {
                opacity: Math.min(1, cardProgress * 2),
                y: 100 * (1 - cardProgress),
                scale: 0.8 + (0.2 * cardProgress),
                rotation: 5 * (1 - cardProgress),
                zIndex: cards.length - index
              });
            }
          });
        }
      }
    });

    // Add stagger animation for smooth card transitions
    cards.forEach((card, index) => {
      const startProgress = index / cards.length;
      const endProgress = (index + 1) / cards.length;
      
      tl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      }, startProgress)
      .to(card, {
        opacity: 0.3,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in"
      }, endProgress - 0.1);
    });

    // Keep the last card visible
    tl.to(cards[cards.length - 1], {
      opacity: 1,
      scale: 1,
      duration: 0.1
    }, 0.9);
  };

  return (
    <div className="bg-gray-900">
      {/* Intro Section */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Scroll <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Pinned</span> Cards
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Experience smooth scroll-pinned animations with GSAP ScrollTrigger
          </p>
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Cards Container */}
      <div ref={containerRef} className="relative min-h-screen flex items-center justify-center px-4">
        <div className="relative w-full max-w-2xl">
          {cardData.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                ref={el => cardsRef.current[index] = el}
                className="absolute inset-0 w-full"
                style={{ zIndex: cardData.length - index }}
              >
                <div className={`relative overflow-hidden rounded-3xl bg-gray-800/90 backdrop-blur-sm border border-gray-700 p-8 md:p-12 shadow-2xl`}>
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10`}></div>
                  
                  {/* Floating Particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-8 right-8 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-12 left-12 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white/15 rounded-full animate-bounce"></div>
                  </div>

                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg mb-6`}>
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {card.title}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed max-w-lg mx-auto">
                        {card.description}
                      </p>
                    </div>

                    {/* Card Number */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-white/60 text-sm font-bold">{index + 1}</span>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${card.gradient} w-full`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
          <div className="flex flex-col space-y-3">
            {cardData.map((_, index) => (
              <div
                key={index}
                className="w-2 h-8 bg-white/20 rounded-full overflow-hidden"
              >
                <div className="w-full h-0 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outro Section */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Animation <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Complete</span>
          </h2>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
            You've experienced the power of GSAP ScrollTrigger scroll-pinning
          </p>
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105">
            <span>Scroll to Top</span>
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyValues;