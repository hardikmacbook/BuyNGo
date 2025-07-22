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

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  // Very subtle skew effect
  const skewXRaw = useTransform(
    scrollVelocity,
    [-0.1, 0.1],
    ["2deg", "-2deg"]
  );
  const skewX = useSpring(skewXRaw, { 
    mass: 8, 
    stiffness: 50, 
    damping: 40 
  });

  // Proper horizontal movement - full text visible
  const xRaw = useTransform(scrollYProgress, [0, 1], [300, -2200]);
  const x = useSpring(xRaw, { 
    mass: 8, 
    stiffness: 50, 
    damping: 40 
  });

  // Fade effect
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.85, 1], 
    [0.5, 1, 1, 0.5]
  );

  return (
    <section
      ref={targetRef}
      className="relative py-12 bg-white overflow-hidden border-y border-gray-100"
    >
      {/* Subtle background dots */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{
             backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* Reduced height container */}
      <div className="relative flex items-center justify-start h-20 md:h-24">
        <motion.div
          style={{ x, skewX, opacity }}
          className="flex items-center whitespace-nowrap will-change-transform"
        >
          {/* Main Text with responsive sizes */}
          <span className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 tracking-wider">
            PREMIUM QUALITY
          </span>
          
          {/* Separator */}
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full mx-8 md:mx-12 lg:mx-16"></div>
          
          <span className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 tracking-wider">
            FAST DELIVERY
          </span>
          
          {/* Separator */}
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full mx-8 md:mx-12 lg:mx-16"></div>
          
          <span className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 tracking-wider">
            SECURE SHOPPING
          </span>
          
          {/* Separator */}
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full mx-8 md:mx-12 lg:mx-16"></div>
          
          <span className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 tracking-wider">
            24/7 SUPPORT
          </span>
          
          {/* Extra separator for loop effect */}
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full mx-8 md:mx-12 lg:mx-16"></div>
          
          {/* Repeat first text for seamless loop */}
          <span className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 tracking-wider">
            PREMIUM QUALITY
          </span>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
        style={{
          width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
        }}
      />
    </section>
  );
};

export default VelocityText;
