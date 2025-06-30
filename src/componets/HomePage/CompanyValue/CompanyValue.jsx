import React, { useEffect, useRef } from 'react';
import { Zap, Globe, Rocket, Crown, Diamond, Star } from 'lucide-react';

const CompanyValues = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const cardData = [
    {
      id: 1,
      icon: Zap,
      number: '01',
      title: 'Lightning Fast',
      subtitle: 'Performance',
      description: 'Experience blazing speed with our cutting-edge optimization technology',
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      glow: 'shadow-yellow-500/50',
    },
    {
      id: 2,
      icon: Globe,
      number: '02',
      title: 'Global Reach',
      subtitle: 'Worldwide Impact',
      description: 'Connect with millions across 150+ countries and territories',
      gradient: 'from-blue-400 via-purple-500 to-pink-500',
      glow: 'shadow-blue-500/50',
    },
    {
      id: 3,
      icon: Rocket,
      number: '03',
      title: 'Next Level',
      subtitle: 'Innovation',
      description: 'Revolutionary features that push the boundaries of possibility',
      gradient: 'from-green-400 via-teal-500 to-blue-500',
      glow: 'shadow-green-500/50',
    },
    {
      id: 4,
      icon: Crown,
      number: '04',
      title: 'Premium Quality',
      subtitle: 'Excellence',
      description: 'Uncompromising quality that sets the gold standard in the industry',
      gradient: 'from-purple-400 via-pink-500 to-red-500',
      glow: 'shadow-purple-500/50',
    },
    {
      id: 5,
      icon: Diamond,
      number: '05',
      title: 'Exclusive Access',
      subtitle: 'VIP Treatment',
      description: 'Unlock premium features and personalized experiences',
      gradient: 'from-cyan-400 via-blue-500 to-purple-500',
      glow: 'shadow-cyan-500/50',
    },
    {
      id: 6,
      icon: Star,
      number: '06',
      title: 'Award Winning',
      subtitle: 'Recognition',
      description: 'Celebrated by industry leaders and trusted by millions worldwide',
      gradient: 'from-orange-400 via-red-500 to-pink-500',
      glow: 'shadow-orange-500/50',
    }
  ];

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        document.head.appendChild(gsapScript);

        await new Promise((resolve) => {
          gsapScript.onload = resolve;
        });

        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        document.head.appendChild(scrollTriggerScript);

        await new Promise((resolve) => {
          scrollTriggerScript.onload = resolve;
        });

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        setupScrollPinAnimation(gsap, ScrollTrigger);

      } catch (error) {
        console.error('GSAP loading failed:', error);
      }
    };

    loadGSAP();

    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  const setupScrollPinAnimation = (gsap, ScrollTrigger) => {
    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!container || cards.length === 0) return;

    // Initial state
    gsap.set(cards, {
      opacity: 0,
      y: 200,
      scale: 0.7,
      rotationX: 45,
      rotationY: 25,
      z: -500
    });

    // Main timeline with pinning
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${cards.length * 120}vh`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalCards = cards.length;
          
          cards.forEach((card, index) => {
            const cardStart = index / totalCards;
            const cardEnd = (index + 1) / totalCards;
            const cardProgress = Math.max(0, Math.min(1, (progress - cardStart) / (cardEnd - cardStart)));
            
            if (progress >= cardStart && progress <= cardEnd + 0.1) {
              // Card is active
              gsap.set(card, {
                opacity: Math.min(1, cardProgress * 3),
                y: 200 * (1 - cardProgress),
                scale: 0.7 + (0.3 * cardProgress),
                rotationX: 45 * (1 - cardProgress),
                rotationY: 25 * (1 - cardProgress),
                z: -500 * (1 - cardProgress),
                zIndex: 100 + index
              });
            } else if (progress > cardEnd + 0.1) {
              // Card should fade out
              const fadeProgress = Math.min(1, (progress - cardEnd - 0.1) * 5);
              gsap.set(card, {
                opacity: 1 - fadeProgress,
                scale: 1 - (fadeProgress * 0.2),
                y: -100 * fadeProgress,
                zIndex: 50 + index
              });
            }
          });
        }
      }
    });
  };

  return (
    <div className="bg-black min-h-[800vh] relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      {/* Floating orbs */}
      <div className="fixed top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed top-3/4 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="fixed top-1/2 left-3/4 w-24 h-24 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>

      <div ref={containerRef} className="relative min-h-screen flex items-center justify-center px-4 perspective-1000">
        <div className="relative w-full max-w-4xl">
          {cardData.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                ref={el => cardsRef.current[index] = el}
                className="absolute inset-0 w-full transform-gpu"
                style={{ 
                  zIndex: cardData.length - index,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 p-12 shadow-2xl ${card.glow} hover:shadow-3xl transition-all duration-700`}>
                  
                  {/* Glowing background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 rounded-3xl`}></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 rounded-3xl blur-xl`}></div>
                  
                  {/* Animated border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${card.gradient} p-[1px] opacity-30`}>
                    <div className="w-full h-full rounded-3xl bg-gray-900"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    
                    {/* Number badge */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <span className="text-white/80 font-bold text-lg">{card.number}</span>
                    </div>
                    
                    {/* Icon with glow effect */}
                    <div className="relative mb-8">
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-3xl blur-2xl opacity-30 scale-110`}></div>
                      <div className={`relative inline-flex items-center justify-center p-6 rounded-3xl bg-gradient-to-br ${card.gradient} shadow-2xl transform hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-16 h-16 text-white drop-shadow-lg" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="mb-6">
                      <h2 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight">
                        {card.title}
                      </h2>
                      <h3 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                        {card.subtitle}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-xl leading-relaxed max-w-2xl mx-auto font-light">
                      {card.description}
                    </p>

                    {/* Decorative elements */}
                    <div className="absolute top-8 left-8 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
                    <div className="absolute bottom-8 right-8 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/3 left-12 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce"></div>
                  </div>

                  {/* Bottom glow line */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${card.gradient} w-full rounded-b-3xl`}></div>
                  
                  {/* Side glow effects */}
                  <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${card.gradient} rounded-l-3xl opacity-50`}></div>
                  <div className={`absolute top-0 right-0 w-1 h-full bg-gradient-to-b ${card.gradient} rounded-r-3xl opacity-50`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-gpu {
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </div>
  );
};

export default CompanyValues;