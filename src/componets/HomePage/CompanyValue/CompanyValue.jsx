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
      delay: '0s'
    },
    {
      id: 2,
      icon: Users,
      value: '1000+',
      label: 'Customers',
      description: 'Trusted by businesses worldwide',
      gradient: 'from-purple-500 to-pink-400',
      delay: '0.2s'
    },
    {
      id: 3,
      icon: Calendar,
      value: '1+',
      label: 'Years',
      description: 'Of dedicated experience',
      gradient: 'from-green-500 to-emerald-400',
      delay: '0.4s'
    },
    {
      id: 4,
      icon: Award,
      value: '50+',
      label: 'Awards',
      description: 'Recognition for excellence',
      gradient: 'from-orange-500 to-yellow-400',
      delay: '0.6s'
    },
    {
      id: 5,
      icon: Target,
      value: '99%',
      label: 'Success Rate',
      description: 'Consistent quality delivery',
      gradient: 'from-red-500 to-pink-400',
      delay: '0.8s'
    },
    {
      id: 6,
      icon: TrendingUp,
      value: '24/7',
      label: 'Support',
      description: 'Always here for you',
      gradient: 'from-indigo-500 to-purple-400',
      delay: '1s'
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4">
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
                className="group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 hover:border-gray-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                // style={{
                //   animationDelay: metric.delay,
                //   animation: `slideInUp 0.8s ease-out forwards ${metric.delay}`
                // }}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Floating Particles Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
                  <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
                </div>

                {/* Icon */}
                <div className={`relative z-10 mb-6 p-3 rounded-xl bg-gradient-to-br ${metric.gradient} w-fit group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Value */}
                <div className="relative z-10 mb-2">
                  <h3 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block`}>
                    {metric.value}
                  </h3>
                </div>

                {/* Label */}
                <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                  {metric.label}
                </h4>

                {/* Description */}
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {metric.description}
                </p>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${metric.gradient} w-0 group-hover:w-full transition-all duration-500`}></div>
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
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .group:hover .floating {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CompanyValues;