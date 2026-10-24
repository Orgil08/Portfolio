/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  X,
  Printer,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EDUCATION_ITEMS } from '../data/portfolioData.ts';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl rounded-3xl bg-[#0e101d] border border-purple-500/30 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Toolbar (Hidden in print) */}
        <div className="p-4 sm:p-6 pb-4 flex items-center justify-between border-b border-purple-500/15 bg-[#0a0b12] print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-sm font-semibold text-white font-heading">
              Сүхбат Мөнх-Оргил — CV
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>CV татах / Хэвлэх</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Хаах"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Document Content */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto bg-[#0a0b14] print:bg-white print:text-black print:max-h-none print:p-8">
          {/* Header */}
          <div className="border-b border-purple-500/20 pb-6 mb-8 print:border-black/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black font-heading">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm font-mono text-purple-400 font-semibold mt-1 print:text-purple-700">
                  {PERSONAL_INFO.role} ({PERSONAL_INFO.age} нас)
                </p>
              </div>

              <div className="space-y-1 text-xs text-slate-300 print:text-slate-700 font-mono">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-400 print:text-black" />
                  <span>{PERSONAL_INFO.contacts.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                  <span>{PERSONAL_INFO.contacts.location}</span>
                </div>
                <div>GitHub: {PERSONAL_INFO.contacts.github}</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 mt-4 leading-relaxed">
              {PERSONAL_INFO.heroSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Education (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <h2 className="text-sm font-mono uppercase tracking-wider text-purple-300 print:text-purple-800 font-bold mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Боловсрол & Сургалт</span>
                </h2>
                <div className="space-y-4">
                  {EDUCATION_ITEMS.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 print:border-slate-200 print:bg-slate-50"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm font-bold text-white print:text-black">
                          {edu.institution}
                        </h3>
                        <span className="text-[11px] font-mono text-purple-400 print:text-purple-700 shrink-0">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-300 print:text-slate-700 mt-0.5">
                        {edu.degree}
                      </p>
                      <p className="text-xs text-slate-400 print:text-slate-600 mt-2 leading-relaxed">
                        {edu.description}
                      </p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2 border-t border-white/5 print:border-slate-200">
                        {edu.highlights.map((h, i) => (
                          <div key={i} className="text-[11px] text-slate-300 print:text-slate-600 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-purple-400 print:bg-purple-700 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Projects & Skills (5 cols) */}
            <div className="md:col-span-5 space-y-6">
              {/* Projects */}
              <div>
                <h2 className="text-sm font-mono uppercase tracking-wider text-purple-300 print:text-purple-800 font-bold mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Хийсэн төслүүд</span>
                </h2>
                <div className="space-y-3">
                  {PROJECTS.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 print:border-slate-200 print:bg-slate-50"
                    >
                      <h3 className="text-xs sm:text-sm font-bold text-white print:text-black">
                        {proj.title}
                      </h3>
                      <p className="text-[11px] text-purple-300 print:text-purple-700">
                        {proj.subtitle}
                      </p>
                      <p className="text-[11px] text-slate-400 print:text-slate-600 mt-1 line-clamp-2">
                        {proj.description}
                      </p>
                      <div className="mt-2 text-[10px] font-mono text-cyan-300 print:text-blue-700 break-all">
                        {proj.url}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills summary */}
              <div>
                <h2 className="text-sm font-mono uppercase tracking-wider text-purple-300 print:text-purple-800 font-bold mb-3">
                  Ур чадварууд
                </h2>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 print:border-slate-200 print:bg-slate-50 space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-white print:text-black block mb-1">
                      Frontend:
                    </span>
                    <span className="text-slate-400 print:text-slate-700">
                      React, TypeScript, Next.js, Tailwind CSS, HTML5, Three.js
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-white print:text-black block mb-1">
                      Backend:
                    </span>
                    <span className="text-slate-400 print:text-slate-700">
                      Node.js, Express, REST APIs, PostgreSQL, MongoDB, Firebase
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-white print:text-black block mb-1">
                      UI/UX & Багажууд:
                    </span>
                    <span className="text-slate-400 print:text-slate-700">
                      Figma, User Research, Git, GitHub, Vercel
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-purple-500/15 bg-[#090a12] flex justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
          >
            Хаах
          </button>
        </div>
      </div>
    </div>
  );
};
