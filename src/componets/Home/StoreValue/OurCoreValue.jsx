import React from 'react';
import { CheckCircleIcon, SparklesIcon, ShieldCheckIcon, LightningBoltIcon, CreditCardIcon, RefreshIcon, UsersIcon, BadgeCheckIcon } from '@heroicons/react/solid';
import Heading from "../../SectionHeadings/Heading";

// Map each core value's id to an icon component (from Heroicons)
const iconMap = {
  1: <CheckCircleIcon className="h-7 w-7 text-white" />,
  2: <SparklesIcon className="h-7 w-7 text-white" />,
  3: <ShieldCheckIcon className="h-7 w-7 text-white" />,
  4: <LightningBoltIcon className="h-7 w-7 text-white" />,
  5: <CreditCardIcon className="h-7 w-7 text-white" />,
  6: <RefreshIcon className="h-7 w-7 text-white" />,
  7: <UsersIcon className="h-7 w-7 text-white" />,
  8: <BadgeCheckIcon className="h-7 w-7 text-white" />,
};

const OurCoreValues = () => {
  const coreValues = [
    {
      id: 1,
      title: "Customer Comes First — Always",
      description:
        "We design our entire shopping experience around you. Whether it’s easy navigation, responsive support, or clear return policies, we ensure every step is smooth, simple, and centered on your needs.",
    },
    {
      id: 2,
      title: "Style with Substance",
      description:
        "We go beyond trends. Our collections are carefully curated to balance style, comfort, and relevance — so you don’t just look good, you feel confident wearing what reflects you.",
    },
    {
      id: 3,
      title: "Premium Quality, No Compromise",
      description:
        "Every product is sourced with precision and held to the highest quality standards. From stitching to packaging, we deliver items that are built to last and designed to impress.",
    },
    {
      id: 4,
      title: "Fast, Secure & Reliable Delivery",
      description:
        "We know time matters. That’s why we prioritize quick, trackable, and dependable shipping — ensuring your order reaches you exactly when expected, and in perfect condition.",
    },
    {
      id: 5,
      title: "Safe & Stress-Free Payments",
      description:
        "Our platform uses advanced encryption and secure gateways to protect your information. Shop confidently, knowing your privacy and data are always safe with us.",
    },
    {
      id: 6,
      title: "Sustainable Mindset",
      description:
        "We care about the planet. From using eco-friendly packaging to choosing sustainable materials where possible, we aim to reduce our impact and support conscious fashion choices.",
    },
    {
      id: 7,
      title: "Inclusive Fashion for All",
      description:
        "Everyone deserves to feel seen in fashion. Our collections celebrate all sizes, genders, and identities — because true style has no limits.",
    },
    {
      id: 8,
      title: "Honesty is Our Policy",
      description:
        "No hidden charges. No gimmicks. Just clear pricing, genuine discounts, and transparent communication — because trust is everything.",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto bg-gray-50">
      {/* Header */}
      <Heading
        heading="Our Core Values"
        desc="We don’t just sell fashion — we deliver trust, quality, and a seamless experience you can rely on"
      />

      {/* Values Grid */}
      <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {coreValues.map(({ id, title, description }) => (
          <div
            key={id}
            className="relative rounded-xl bg-white p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Gradient number badge with icon */}
            <div
              className="flex items-center justify-center h-14 w-14 rounded-full mb-5 mx-auto cursor-default select-none"
              style={{
                background: 'linear-gradient(135deg, #7f00ff, #e100ff)',
                boxShadow: '0 4px 15px rgba(126, 0, 255, 0.6)',
                transform: 'translateY(-10px)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1)';
              }}
            >
              {iconMap[id] || (
                <span className="font-extrabold text-white text-lg">{id}</span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-3 leading-snug text-center">
              {title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed text-center">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurCoreValues;
