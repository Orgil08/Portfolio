/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, User, Mail, Sparkles } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas.tsx';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface HeroSectionProps {
  onOpenCV: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCV }) => {
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden"
    >
      {/* Background neon glows & grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.12),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Typography & Actions (7 cols on lg) */}
          <motion.div
            style={{ y: heroTextY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Clean Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium w-fit mb-6 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Full-Stack хөгжүүлэгч & UI/UX</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 font-heading">
              “
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200">
                Санааг бодит дижитал
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 drop-shadow-[0_0_35px_rgba(139,92,246,0.3)]">
                шийдэл болгоно.
              </span>
              ”
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
              {PERSONAL_INFO.heroSubtitle}
            </p>

            {/* Core Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#projects"
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 rounded-2xl shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Layers className="w-4 h-4" />
                <span>Миний төслүүд</span>
              </a>

              <a
                href="#about"
                className="flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-medium text-slate-200 bg-[#121424] hover:bg-[#1a1c32] border border-purple-500/25 hover:border-purple-400/50 rounded-2xl transition-all hover:scale-[1.01]"
              >
                <User className="w-4 h-4 text-purple-400" />
                <span>Миний тухай</span>
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Холбоо барих</span>
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-purple-500/15">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#0c0d17]/80 border border-purple-500/10 hover:border-purple-500/30 transition-colors"
                >
                  <div className="text-xl sm:text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {stat.note}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Character Interactive Showcase (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full relative">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-cyan-500/30 rounded-[32px] blur-xl opacity-60 pointer-events-none" />

              {/* 3D Canvas */}
              <Hero3DCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
