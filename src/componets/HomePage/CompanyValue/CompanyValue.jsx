import React, { useEffect, useRef } from 'react';
import { Package, Users, Calendar, Award, Target, TrendingUp } from 'lucide-react';

const CompanyValues = () => {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const metricsRefs = useRef([]);

  const metrics = [
    {
      id: 1,
      icon: Package,
      value: '100+',
      label: 'Products',
      description: 'Innovative solutions delivered',
      gradient: 'from-blue-500 to-cyan-400',
      color: '#3B82F6'
    },
    {
      id: 2,
      icon: Users,
      value: '1000+',
      label: 'Customers',
      description: 'Trusted by businesses worldwide',
      gradient: 'from-purple-500 to-pink-400',
      color: '#8B5CF6'
    },
    {
      id: 3,
      icon: Calendar,
      value: '1+',
      label: 'Years',
      description: 'Of dedicated experience',
      gradient: 'from-green-500 to-emerald-400',
      color: '#10B981'
    },
    {
      id: 4,
      icon: Award,
      value: '50+',
      label: 'Awards',
      description: 'Recognition for excellence',
      gradient: 'from-orange-500 to-yellow-400',
      color: '#F97316'
    },
    {
      id: 5,
      icon: Target,
      value: '99%',
      label: 'Success Rate',
      description: 'Consistent quality delivery',
      gradient: 'from-red-500 to-pink-400',
      color: '#EF4444'
    },
    {
      id: 6,
      icon: TrendingUp,
      value: '24/7',
      label: 'Support',
      description: 'Always here for you',
      gradient: 'from-indigo-500 to-purple-400',
      color: '#6366F1'
    },
  ];

  useEffect(() => {
    // GSAP ScrollTrigger simulation with pure CSS and Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.style.opacity = '1';
            entry.target.style.filter = 'blur(0px)';
            
            // Animate counter
            const valueElement = entry.target.querySelector('.metric-value');
            const finalValue = metrics[index].value;
            animateCounter(valueElement, finalValue);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50px'
      }
    );

    metricsRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const animateCounter = (element, finalValue) => {
    if (!element) return;
    
    const isNumeric = /^\d+/.test(finalValue);
    if (!isNumeric) {
      element.textContent = finalValue;
      return;
    }
    
    const numericValue = parseInt(finalValue.match(/\d+/)[0]);
    const suffix = finalValue.replace(/\d+/, '');
    let current = 0;
    const increment = numericValue / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 30);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>

        <div className="text-center z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in">
            Our <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">Success</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Numbers that speak louder than words. Scroll to discover our journey of excellence and innovation.
          </p>
          <div className="mt-12 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div ref={containerRef} className="relative">
        <div ref={triggerRef} className="min-h-[300vh] relative">
          <div className="sticky top-0 min-h-screen flex items-center justify-center px-4">
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {metrics.map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <div
                      key={metric.id}
                      ref={(el) => (metricsRefs.current[index] = el)}
                      data-index={index}
                      className="metric-card group relative overflow-hidden rounded-3xl bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 p-8 hover:border-gray-500/50 transition-all duration-700 cursor-pointer"
                      style={{
                        transform: 'translateY(100px) scale(0.8)',
                        opacity: '0',
                        filter: 'blur(10px)',
                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: `${index * 0.1}s`
                      }}
                    >
                      {/* Animated background */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${metric.color}20, ${metric.color}10)`
                        }}
                      ></div>
                      
                      {/* Glow effect */}
                      <div 
                        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
                        style={{
                          background: `linear-gradient(135deg, ${metric.color}30, transparent)`
                        }}
                      ></div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <div 
                          className="mb-6 p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500"
                          style={{
                            background: `linear-gradient(135deg, ${metric.color}, ${metric.color}80)`
                          }}
                        >
                          <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>

                        {/* Value with counter animation */}
                        <div className="mb-4">
                          <h3 
                            className="metric-value text-5xl md:text-6xl font-bold bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500 inline-block"
                            style={{
                              backgroundImage: `linear-gradient(135deg, ${metric.color}, ${metric.color}80)`
                            }}
                          >
                            0
                          </h3>
                        </div>

                        {/* Label */}
                        <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-500">
                          {metric.label}
                        </h4>

                        {/* Description */}
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500 text-lg">
                          {metric.description}
                        </p>

                        {/* Progress bar */}
                        <div className="mt-6 h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000 ease-out group-hover:w-full w-0"
                            style={{
                              background: `linear-gradient(90deg, ${metric.color}, ${metric.color}80)`
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Floating elements */}
                      <div className="absolute top-4 right-4 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                           style={{ backgroundColor: metric.color, animation: 'float 3s ease-in-out infinite' }}></div>
                      <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                           style={{ backgroundColor: metric.color, animation: 'float 3s ease-in-out infinite 1s' }}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Join Us?</span>
          </h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
            Experience the difference that dedication and innovation can make
          </p>
          <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-full font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden">
            <span className="relative z-10">Read Our Success Story</span>
            <TrendingUp className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.3s both;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .metric-card {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        .metric-card:hover {
          box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </div>
  );
};

export default CompanyValues;