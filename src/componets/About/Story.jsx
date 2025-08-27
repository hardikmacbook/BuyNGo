import React from 'react';
import { BookOpen, Lightbulb, Target, Rocket, Users, Globe } from 'lucide-react';

const CompanyStory = () => {
  return (
    <div className="w-full bg-white py-30 lg:py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Founding Story Details */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
           <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight text-center">
            The Founding Moment
          </p>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-6"></div>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-xl leading-relaxed">
               The story of BuyNGO began as a bold vision during our college journey. Like many students, I noticed how online shopping platforms often felt impersonal and overwhelming, with generic experiences that didn’t truly serve the diverse needs of young shoppers like us. This realization sparked a desire to build something different—a project that would not only fulfill our academic goals but also pave the way toward a genuine, community-focused online marketplace.
              </p>
              
              <p className="text-xl leading-relaxed">
                Starting BuyNGO as a college project meant there were plenty of challenges and late-night brainstorming sessions. Every line of code, every product selection, and each design choice was an opportunity to learn, improve, and innovate. I wanted BuyNGO to reflect the values of our generation: accessibility, transparency, and a real sense of connection between buyers and sellers.
              </p>
              
              <p className="text-xl leading-relaxed">
              Though BuyNGO’s early days focused on building a solid foundation for our coursework, the dream extended far beyond that. My goal is to keep developing the platform—adding essential features like an admin panel, a robust backend, and advanced tools that will allow students (and users everywhere) to shop, manage, and interact seamlessly. Each step forward is inspired by the belief that even a project started in a classroom can grow into something far bigger, solving real-world problems and creating joyful shopping experiences along the way.
              </p>
              
              <p className="text-xl leading-relaxed">
                BuyNGO’s founding moment is more than the start of a website—it’s the first step in a journey filled with creativity, ambition, and the commitment to continue building, improving, and making a difference for every customer we’ll serve in the future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyStory;