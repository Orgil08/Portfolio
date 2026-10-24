/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const Floating3DBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth springs for fluid, non-jarring motion
  const smoothY = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Layer 1: Floating Tech Glyphs & Polyhedra
  const y1 = useTransform(smoothY, [0, 1], [0, -650]);
  const rotate1 = useTransform(smoothY, [0, 1], [0, 240]);
  const scale1 = useTransform(smoothY, [0, 0.5, 1], [1, 1.25, 0.9]);

  // Layer 2: Deeper parallax opposite direction
  const y2 = useTransform(smoothY, [0, 1], [0, -950]);
  const rotate2 = useTransform(smoothY, [0, 1], [0, -320]);
  const scale2 = useTransform(smoothY, [0, 0.5, 1], [0.8, 1.15, 1.3]);

  // Layer 3: Accent Cyber Rings
  const y3 = useTransform(smoothY, [0, 1], [0, -450]);
  const rotate3 = useTransform(smoothY, [0, 1], [45, 180]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D Polyhedron Node - Top Right / About Section */}
      <motion.div
        style={{
          y: y1,
          rotateZ: rotate1,
          scale: scale1,
          transformPerspective: 1000,
        }}
        className="absolute top-[28%] right-[4%] w-32 h-32 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-600/10 to-indigo-600/5 backdrop-blur-[2px] shadow-[0_0_30px_rgba(139,92,246,0.15)] flex items-center justify-center opacity-60"
      >
        <div className="w-16 h-16 rounded-2xl border border-cyan-400/30 rotate-45 flex items-center justify-center">
          <div className="w-6 h-6 rounded-lg bg-purple-500/30" />
        </div>
      </motion.div>

      {/* 3D Holographic Ring - Mid Left / Skills Section */}
      <motion.div
        style={{
          y: y2,
          rotateZ: rotate2,
          scale: scale2,
          transformPerspective: 1000,
        }}
        className="absolute top-[52%] left-[3%] w-40 h-40 rounded-full border-2 border-dashed border-cyan-500/25 shadow-[0_0_40px_rgba(6,182,212,0.12)] flex items-center justify-center opacity-50"
      >
        <div className="w-24 h-24 rounded-full border border-purple-500/30" />
        <div className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] -top-1.5" />
      </motion.div>

      {/* 3D Cyber Core - Lower Right / Projects Section */}
      <motion.div
        style={{
          y: y3,
          rotateZ: rotate3,
          transformPerspective: 1000,
        }}
        className="absolute top-[75%] right-[6%] w-36 h-36 rounded-2xl border border-indigo-500/25 bg-gradient-to-tr from-indigo-900/15 via-purple-900/10 to-transparent shadow-[0_0_35px_rgba(99,102,241,0.15)] flex items-center justify-center opacity-50"
      >
        <div className="w-16 h-16 border border-purple-400/30 rotate-12 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20" />
        </div>
      </motion.div>

      {/* Glowing atmospheric depth lights that travel with scroll */}
      <motion.div
        style={{
          y: useTransform(smoothY, [0, 1], [0, 400]),
        }}
        className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{
          y: useTransform(smoothY, [0, 1], [0, -500]),
        }}
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-cyan-600/08 rounded-full blur-[140px] pointer-events-none"
      />
    </div>
  );
};
