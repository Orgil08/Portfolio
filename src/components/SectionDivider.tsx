/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`relative w-full max-w-5xl mx-auto px-4 sm:px-6 my-2 sm:my-4 flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Soft Ambient Glow Halo */}
      <div className="absolute inset-x-12 h-6 -top-3 bg-gradient-to-r from-transparent via-purple-600/15 to-transparent blur-lg pointer-events-none" />

      {/* Animated Expanding Divider Line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative h-[1.5px] origin-center"
      >
        {/* Base Glowing Gradient Line */}
        <div className="w-full h-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent shadow-[0_0_10px_rgba(168,85,247,0.45)]" />

        {/* Subtle Animated Shimmer Beam moving across the line */}
        <motion.div
          animate={{
            x: ['-30%', '130%'],
            opacity: [0, 0.75, 0],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 1.2,
          }}
          className="absolute top-0 bottom-0 w-36 bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[0.5px]"
        />

        {/* Center Glowing Orbital Core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8,0_0_14px_rgba(168,85,247,0.8)]" />
          <div className="absolute w-3.5 h-3.5 rounded-full bg-purple-500/20 blur-[1px] animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};
