import React from 'react';
import { Link } from 'react-router-dom';
import SetPageTitle from '../componets/SetPageTitle'; // Fixed typo: componets -> components

const Error = () => {

  return (
    <>
      <SetPageTitle title="404 - BuyNGO" />
      
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        {/* Main content */}
        <div className="max-w-md w-full text-center relative z-10 space-y-8">
          {/* 404 Number */}
          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-bold text-gray-800">
              <span className="inline-block animate-pulse">4</span>
              <span className="inline-block animate-bounce mx-2 text-red-600">0</span>
              <span className="inline-block animate-pulse">4</span>
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>
          {/* Error message */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Page Not Found
            </h2>
            <p className="text-gray-600 text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          {/* Action buttons */}
          <div className="space-y-4">
            <Link
              to="/"
              className="border-2 border-gray-200 px-8 py-3 rounded-lg font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Go Home
            </Link> 
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
