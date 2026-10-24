/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth, responsive spring motion for the scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.0005,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-black/20 backdrop-blur-[1px]"
      role="progressbar"
      aria-label="Хуудасны гүйлгэх явц"
    >
      {/* Animated Gradient Progress Track */}
      <motion.div
        className="w-full h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 origin-left relative shadow-[0_0_10px_rgba(168,85,247,0.7),0_0_20px_rgba(6,182,212,0.5)]"
        style={{ scaleX }}
      >
        {/* Glowing Head Indicator at the current progress leading tip */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-[5px] bg-white rounded-full shadow-[0_0_8px_#ffffff,0_0_16px_#38bdf8] opacity-90" />
      </motion.div>
    </div>
  );
};
