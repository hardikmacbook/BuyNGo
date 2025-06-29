import React from 'react';
import { Package, Users, Calendar, Award, Target, TrendingUp } from 'lucide-react';

const CompanyValues = () => {
  const metrics = [
    {
      id: 1,
      icon: Package,
      value: '100+',
      label: 'Products',
      description: 'Innovative solutions delivered',
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      id: 2,
      icon: Users,
      value: '1000+',
      label: 'Customers',
      description: 'Trusted by businesses worldwide',
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      id: 3,
      icon: Calendar,
      value: '1+',
      label: 'Years',
      description: 'Of dedicated experience',
      gradient: 'from-green-500 to-emerald-400'
    },
    {
      id: 4,
      icon: Award,
      value: '50+',
      label: 'Awards',
      description: 'Recognition for excellence',
      gradient: 'from-orange-500 to-yellow-400'
    },
    {
      id: 5,
      icon: Target,
      value: '99%',
      label: 'Success Rate',
      description: 'Consistent quality delivery',
      gradient: 'from-red-500 to-pink-400'
    },
    {
      id: 6,
      icon: TrendingUp,
      value: '24/7',
      label: 'Support',
      description: 'Always here for you',
      gradient: 'from-indigo-500 to-purple-400'
    }
  ];

  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Success</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Numbers that speak louder than words. Our journey of excellence and innovation.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={metric.id}
                className="group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 hover:border-gray-600 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 hover:bg-gray-800/70"
              >
                {/* Animated Background Gradient - Constantly Moving */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-5 animate-pulse`}></div>
                <div className={`absolute inset-0 bg-gradient-to-tr ${metric.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700 animate-gradient-shift`}></div>
                
                {/* Floating Particles - Always Moving */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
                  <div className="absolute top-12 right-12 w-1 h-1 bg-blue-400/40 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="absolute bottom-16 left-16 w-1 h-1 bg-cyan-400/40 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
                  <div className="absolute top-1/2 left-4 w-1 h-1 bg-pink-400/30 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                </div>

                {/* Moving Border Effect */}
                <div className="absolute inset-0 rounded-2xl">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${metric.gradient} opacity-0 group-hover:opacity-100 animate-spin-slow`} style={{padding: '1px', margin: '-1px'}}>
                    <div className="w-full h-full bg-gray-900/90 rounded-2xl"></div>
                  </div>
                </div>

                {/* Icon - Floating Animation */}
                <div className={`relative z-10 mb-6 p-3 rounded-xl bg-gradient-to-br ${metric.gradient} w-fit group-hover:scale-110 transition-transform duration-500 animate-float`}>
                  <IconComponent className="w-8 h-8 text-white animate-pulse" />
                </div>

                {/* Value - Glowing Effect */}
                <div className="relative z-10 mb-2">
                  <h3 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500 inline-block animate-glow`}>
                    {metric.value}
                  </h3>
                </div>

                {/* Label - Wave Effect */}
                <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-500 animate-wave">
                  {metric.label}
                </h4>

                {/* Description */}
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500 animate-fade">
                  {metric.description}
                </p>

                {/* Animated Progress Line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${metric.gradient} animate-progress-line`}></div>
                
                {/* Hover Ripple Effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className={`absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r ${metric.gradient} rounded-full opacity-0 group-hover:opacity-60 group-hover:scale-[25] transition-all duration-1000 ease-out`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer">
            <span>Join Our Success Story</span>
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg);
          }
          25% {
            transform: translateY(-8px) rotateX(5deg);
          }
          50% {
            transform: translateY(-4px) rotateX(0deg);
          }
          75% {
            transform: translateY(-12px) rotateX(-5deg);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(147, 51, 234, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(147, 51, 234, 0.6), 0 0 30px rgba(147, 51, 234, 0.4);
          }
        }
        
        @keyframes wave {
          0%, 100% {
            transform: translateX(0px);
          }
          25% {
            transform: translateX(2px);
          }
          50% {
            transform: translateX(-2px);
          }
          75% {
            transform: translateX(1px);
          }
        }
        
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes progress-line {
          0% {
            width: 0%;
            opacity: 0.5;
          }
          50% {
            width: 100%;
            opacity: 1;
          }
          100% {
            width: 0%;
            opacity: 0.5;
          }
        }
        
        @keyframes fade {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        
        .animate-progress-line {
          animation: progress-line 3s ease-in-out infinite;
        }
        
        .animate-fade {
          animation: fade 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CompanyValues;