import React from 'react';

const OurCoreValues = () => {
  const coreValues = [
    {
      id: 1,
      title: "Quality First",
      description: "We source only the finest materials and maintain rigorous quality standards in every product we offer."
    },
    {
      id: 2,
      title: "Customer Focused",
      description: "Your satisfaction drives everything we do. We listen, adapt, and deliver experiences that exceed expectations."
    },
    {
      id: 3,
      title: "Sustainable Future",
      description: "We're committed to responsible practices that protect our planet for future generations."
    },
    {
      id: 4,
      title: "Innovation Drive",
      description: "We continuously evolve and embrace new technologies to bring you the latest and greatest products."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light text-gray-900 mb-4">
          Our Core Values
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          The principles that guide our commitment to excellence and shape every decision we make.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coreValues.map((value) => (
          <div 
            key={value.id}
            className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors duration-200"
          >
            {/* Title */}
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              {value.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurCoreValues;
