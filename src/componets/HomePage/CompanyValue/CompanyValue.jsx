import React, { useEffect, useRef } from 'react';
import { Package, Users, Calendar, Award, Target, TrendingUp, Rocket, Shield } from 'lucide-react';

const CompanyValues = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const cardData = [
    {
      id: 1,
      icon: Package,
      title: '100+ Products',
      description: 'Innovative solutions delivered to transform your business',
      gradient: 'from-blue-500 to-cyan-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 2,
      icon: Users,
      title: '1000+ Customers',
      description: 'Trusted by businesses worldwide across all industries',
      gradient: 'from-purple-500 to-pink-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 3,
      icon: Calendar,
      title: '5+ Years',
      description: 'Of dedicated experience and continuous innovation',
      gradient: 'from-green-500 to-emerald-400',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 4,
      icon: Award,
      title: '50+ Awards',
      description: 'Recognition for excellence and outstanding achievements',
      gradient: 'from-orange-500 to-yellow-400',
      bgColor: 'bg-orange-500/10'
    },
    {
      id: 5,
      icon: Target,
      title: '99% Success Rate',
      description: 'Consistent quality delivery and client satisfaction',
      gradient: 'from-red-500 to-pink-400',
      bgColor: 'bg-red-500/10'
    },
    {
      id: 6,
      icon: TrendingUp,
      title: '24/7 Support',
      description: 'Always here for you with dedicated customer service',
      gradient: 'from-indigo-500 to-purple-400',
      bgColor: 'bg-indigo-500/10'
    },
    {
      id: 7,
      icon: Rocket,
      title: 'Innovation First',
      description: 'Leading the industry with cutting-edge technology',
      gradient: 'from-pink-500 to-rose-400',
      bgColor: 'bg-pink-500/10'
    },
    {
      id: 8,
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and 99.9% uptime guarantee',
      gradient: 'from-teal-500 to-cyan-400',
      bgColor: 'bg-teal-500/10'
    }
  ];

  useEffect(() => {
    // Dynamically import GSAP and ScrollTrigger
    const loadGSAP = async () => {
      try {
        const gsapModule = await import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        const scrollTriggerModule = await import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        
        const gsap = gsapModule.default || gsapModule;
        const ScrollTrigger = scrollTriggerModule.default || scrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);

        // Set initial state for all cards
        gsap.set(cardsRef.current, {
          opacity: 0,
          y: 100,
          scale: 0.8
        });

        // Create animations for each card
        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "top center-=50",
              scrub: 1,
              pin: false,
              onToggle: self => {
                if (self.isActive) {
                  gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                  });
                }
              }
            }
          });

          // Pin the container when cards are animating
          if (index === 0) {
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top top",
              end: `+=${cardData.length * 200}`,
              pin: true,
              pinSpacing: false,
              scrub: 1
            });
          }
        });

        // Cleanup function
        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

      } catch (error) {
        console.warn('GSAP failed to load, falling back to CSS animations');
        // Fallback: simple CSS animation
        cardsRef.current.forEach((card, index) => {
          if (card) {
            card.style.animation = `fadeInUp 0.6s ease-out forwards`;
            card.style.animationDelay = `${index * 0.2}s`;
          }
        });
      }
    };

    loadGSAP();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Journey</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Scroll down to discover our story of innovation, growth, and success
          </p>
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div ref={containerRef} className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Milestones & Achievements
            </h2>
            <p className="text-gray-400 text-lg">
              Each step forward tells our story of dedication and excellence
            </p>
          </div>

          <div className="space-y-12">
            {cardData.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.id}
                  ref={el => cardsRef.current[index] = el}
                  className={`relative overflow-hidden rounded-3xl ${card.bgColor} backdrop-blur-sm border border-gray-700/50 p-8 md:p-12 hover:border-gray-600 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10`}
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5`}></div>
                  
                  {/* Floating Particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-8 right-8 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
                    <div className="absolute bottom-12 left-12 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white/15 rounded-full animate-bounce"></div>
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    {/* Icon */}
                    <div className={`flex-shrink-0 p-6 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-grow text-center md:text-left">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {card.title}
                      </h3>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {/* Accent Line */}
                    <div className={`hidden md:block w-1 h-20 bg-gradient-to-b ${card.gradient} rounded-full`}></div>
                  </div>

                  {/* Bottom Accent */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${card.gradient} w-full`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Closing Section */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Begin?</span>
          </h2>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers on their journey to success
          </p>
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
            <span>Get Started Today</span>
            <Rocket className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Fallback CSS Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CompanyValues;