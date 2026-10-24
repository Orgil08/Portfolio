/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { EDUCATION_ITEMS } from '../data/portfolioData.ts';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="relative py-20 lg:py-28 overflow-hidden bg-[#080912]/80">
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
            <span>Боловсрол & Сургалт</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Боловсрол
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            МУИС-ийн программ хангамжийн 4 жилийн сургалт болон Full-Stack, UI/UX чиглэлийн мэргэжлийн сургалтууд.
          </p>
        </motion.div>

        {/* Clean 3-Item Education & Training Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION_ITEMS.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="p-6 sm:p-7 rounded-3xl bg-[#0c0e1a] border border-purple-500/15 hover:border-purple-500/35 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-950/60 border border-purple-500/25 flex items-center justify-center text-purple-300">
                    {idx === 0 ? (
                      <GraduationCap className="w-5 h-5 text-indigo-400" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-purple-400" />
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-purple-300 bg-purple-950/60 border border-purple-500/20">
                    {edu.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 font-heading">
                  {edu.institution}
                </h3>
                <p className="text-xs font-semibold text-purple-300 mb-2">
                  {edu.degree}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                  <Calendar className="w-3.5 h-3.5 text-purple-400/80" />
                  <span>{edu.period}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {edu.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                {edu.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
