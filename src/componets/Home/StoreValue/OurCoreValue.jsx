import React from 'react';
import { CheckCircleIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/solid';
import Heading from "../../SectionHeadings/Heading";

const iconMap = {
  1: <CheckCircleIcon className="h-7 w-7 text-white" />,
  2: <SparklesIcon className="h-7 w-7 text-white" />,
  3: <ShieldCheckIcon className="h-7 w-7 text-white" />,
  // Add icons for all items accordingly
};

const OurCoreValues = () => {
  const coreValues = [
    { id: 1, title: "Customer Comes First — Always", description: "We design our entire shopping experience around you..." },
    // ... other core values ...
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto bg-gray-50">
      <Heading
        heading="Our Core Values"
        desc="We don’t just sell fashion — we deliver trust, quality, and a seamless experience you can rely on"
      />

      <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {coreValues.map(({ id, title, description }) => (
          <div
            key={id}
            className="relative rounded-xl bg-white p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
          >
            <div
              className="flex items-center justify-center h-14 w-14 rounded-full mb-5 mx-auto"
              style={{
                background: 'linear-gradient(to right, #7f00ff, #e100ff)',
                boxShadow: '0 4px 15px rgba(126, 0, 255, 0.6)',
                transform: 'translateY(-10px)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-15px) scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-10px) scale(1)'}
            >
              {iconMap[id] || (
                <span className="font-extrabold text-white text-lg">{id}</span>
              )}
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 leading-snug text-center">
              {title}
            </h3>

            <p className="text-gray-600 text-base leading-relaxed text-center">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurCoreValues;
