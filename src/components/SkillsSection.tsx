/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Server,
  Layout,
  Wrench,
  CheckCircle,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData.ts';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const icons = [Code, Server, Layout, Wrench];
  const activeCategory = SKILL_CATEGORIES[activeCategoryIndex];

  return (
    <section id="skills" className="relative py-20 lg:py-28 overflow-hidden bg-[#090a12]/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-wider mb-3">
            <span>Технологи</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Ур чадвар
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Full-Stack веб хөгжүүлэлт, өгөгдлийн сангийн бүтэц болон интерфейс дизайн.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = icons[idx] || Code;
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-[#101222] text-slate-300 hover:text-white hover:bg-[#181a32] border border-purple-500/15'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Clean Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Active Skills List (8 cols) */}
          <motion.div
            key={activeCategoryIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="md:col-span-8 p-6 sm:p-7 rounded-3xl bg-[#0c0e1a] border border-purple-500/20 shadow-xl space-y-4"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-purple-500/15">
              <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300">
                {React.createElement(icons[activeCategoryIndex] || Code, { className: 'w-5 h-5' })}
              </div>
              <h3 className="text-lg font-bold text-white">
                {activeCategory.title}
              </h3>
            </div>

            {/* Clean Skill Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {activeCategory.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-sm text-slate-200">
                    {skill.name}
                  </span>
                  <span className="text-xs text-purple-300 font-mono px-2.5 py-0.5 rounded-full bg-purple-950/50 border border-purple-500/20">
                    {skill.experience}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Info Card (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-[#0c0e1a] border border-purple-500/20 shadow-lg space-y-3">
              <h4 className="text-sm font-bold text-white">
                Хөгжүүлэлтийн чиглэл
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                МУИС-ийн онолын суурь болон практик төслүүд дээр суурилсан веб хөгжүүлэлт.
              </p>
              <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>React & TypeScript экосистем</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Node.js & Express REST APIs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Figma & Responsive Design</span>
                </div>
              </div>
            </div>

            {/* Quick Tech Badges */}
            <div className="p-5 rounded-3xl bg-[#0d0e19] border border-purple-500/15">
              <div className="flex flex-wrap gap-1.5">
                {[
                  'React',
                  'TypeScript',
                  'JavaScript',
                  'Node.js',
                  'Express',
                  'Next.js',
                  'Tailwind CSS',
                  'PostgreSQL',
                  'MongoDB',
                  'Figma',
                  'Git',
                  'GitHub',
                  'Vercel',
                ].map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
