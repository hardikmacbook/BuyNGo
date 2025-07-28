import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="min-h-screen bg-[#EDEFEF] flex items-center justify-center px-4 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border border-gray-200 rounded-full animate-bounce opacity-20" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-gray-300 rotate-45 animate-pulse opacity-30" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-gray-200 rounded-full animate-ping opacity-20" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-gray-200 animate-spin opacity-20" style={{ animationDuration: '8s' }}></div>
      </div>

      <div className="max-w-lg w-full text-center relative z-10">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-light text-gray-900 mb-2 animate-pulse">
              4
              <span className="inline-block animate-bounce mx-2" style={{ animationDelay: '0.2s' }}>
                0
              </span>
              <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>
                4
              </span>
            </h1>
            {/* Animated underline */}
            <div className="w-0 h-px bg-gray-900 mx-auto animate-expand"></div>
          </div>
        </div>

        {/* Fade in content */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, let's get you back on track!
          </p>
        </div>

        {/* Animated buttons */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
          <Link
            to="/"
            className="block w-full bg-[#8b2727] hover:bg-[#6a1d1d] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Return Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="block w-full border-2 border-gray-200 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Go Back
          </button>
        </div>

        {/* Animated search suggestion */}
        <div className="mt-8 pt-6 border-t border-gray-200 animate-fade-in" style={{ animationDelay: '1.6s', animationFillMode: 'both' }}>
          <p className="text-sm text-gray-500 mb-4">
            Or try searching for what you need:
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-200 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:border-[#8b2727] transition-colors duration-200"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#8b2727] transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes expand {
          0% { width: 0; }
          100% { width: 6rem; }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-expand {
          animation: expand 1s ease-out 0.6s both;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Error;
