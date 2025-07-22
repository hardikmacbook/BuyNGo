import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";

const VelocityText = () => {
  const targetRef = useRef(null);

  // Track scroll progress only within this section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"], // Only animate when section is in viewport center
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  // Subtle velocity-based skew - slower response
  const skewX = useSpring(
    useTransform(scrollVelocity, [-0.5, 0.5], ["0.5deg", "-0.5deg"]),
    { stiffness: 100, damping: 40, mass: 2 }
  );

  // Animate text only when this section is in view - slower and smoother
  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]),
    { stiffness: 80, damping: 40, mass: 3 }
  );

  // Section visibility opacity
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  // Gentle scale effect
  const scale = useSpring(
    useTransform(scrollVelocity, [-0.3, 0, 0.3], [0.99, 1, 0.99]),
    { stiffness: 150, damping: 90, mass: 2 }
  );

  const features = [
    "PREMIUM QUALITY",
    "FAST DELIVERY", 
    "SECURE SHOPPING",
    "24/7 SUPPORT",
    "FREE RETURNS",
    "GLOBAL SHIPPING"
  ];

  return (
    <section
      ref={targetRef}
      className="relative py-24 bg-white overflow-hidden border-y border-gray-100"
    >
      {/* Minimal background texture */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Main content container - only animates when this section is in view */}
      <div className="relative flex items-center h-32 md:h-40 lg:h-48">
        <motion.div
          style={{ x, skewX, opacity, scale }}
          className="flex items-center whitespace-nowrap will-change-transform"
        >
          {/* Render text multiple times for seamless infinite loop */}
          {Array(4).fill(features).flat().map((feature, index) => (
            <React.Fragment key={index}>
              <span className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 tracking-[0.15em] select-none">
                {feature}
              </span>
              
              {/* Minimalist separator */}
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gray-900 rounded-full mx-8 md:mx-12 lg:mx-16" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Progress indicator - shows progress through THIS section only */}
      <motion.div 
        className="absolute bottom-0 left-0 h-px bg-gray-900"
        style={{
          width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
        }}
      />
    </section>
  );
};

export default VelocityText;