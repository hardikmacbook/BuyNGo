import React from 'react';

const OurCoreValues = () => {
  const coreValues = [
    {
      id: 1,
      title: "Quality First",
      description: "We source only the finest materials and maintain rigorous quality standards in every product we offer.",
      number: "01"
    },
    {
      id: 2,
      title: "Customer Focused",
      description: "Your satisfaction drives everything we do. We listen, adapt, and deliver experiences that exceed expectations.",
      number: "02"
    },
    {
      id: 3,
      title: "Sustainable Future",
      description: "We're committed to responsible practices that protect our planet for future generations.",
      number: "03"
    },
    {
      id: 4,
      title: "Innovation Drive",
      description: "We continuously evolve and embrace new technologies to bring you the latest and greatest products.",
      number: "04"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block">
          <h2 className="text-4xl font-light text-gray-900 mb-4 relative">
            Our Core Values
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gray-900"></div>
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mt-8 text-lg">
          The principles that guide our commitment to excellence and shape every decision we make.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {coreValues.map((value, index) => (
          <div 
            key={value.id}
            className="group relative border border-gray-200 rounded-xl p-8 hover:border-gray-900 hover:-translate-y-2 transition-all duration-300 ease-out bg-white hover:shadow-xl"
          >
            {/* Number Badge */}
            <div className="absolute -top-4 left-8">
              <span className="bg-white border-2 border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-600 group-hover:border-gray-900 group-hover:text-gray-900 transition-all duration-300">
                {value.number}
              </span>
            </div>
            
            {/* Content */}
            <div className="pt-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-900 transition-colors duration-300">
                {value.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300">
                {value.description}
              </p>
            </div>

            {/* Decorative Element */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-transparent rounded-b-xl group-hover:from-gray-900 transition-all duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurCoreValues;
