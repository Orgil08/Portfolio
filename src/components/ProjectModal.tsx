/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, ExternalLink, CheckCircle2, Monitor } from 'lucide-react';
import { ProjectData } from '../utils/portfolio.ts';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-[#0c0e1a] border border-purple-500/30 shadow-[0_0_50px_rgba(139,92,246,0.2)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Glow */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400" />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-purple-500/15">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono mb-2">
              {project.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
              {project.title}
            </h3>
            <p className="text-sm text-slate-300 mt-1">{project.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors"
            aria-label="Хаах"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Visual Showcase Card */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#141627] to-[#0a0b12] border border-purple-500/20 p-6 flex flex-col items-center justify-center text-center overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-2 shadow-lg">
              <Monitor className="w-6 h-6" />
            </div>
            <div className="text-base font-bold text-white mb-1 font-heading">{project.title}</div>
            <p className="text-xs text-slate-400 max-w-md font-mono mb-4 break-all">
              {project.url}
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/30 transition-all hover:scale-105"
            >
              <span>Веб сайтыг үзэх</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-2">
              Төслийн тухай
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed bg-[#111322] p-4 rounded-2xl border border-purple-500/15">
              {project.description}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Үндсэн боломжууд</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, fIdx) => (
                <div
                  key={fIdx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Breakdown */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-3">
              Ашигласан технологи
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#111322] border border-purple-500/15">
                <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
                  Frontend
                </span>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.frontend.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] rounded bg-purple-950/80 border border-purple-500/20 text-purple-200 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111322] border border-purple-500/15">
                <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
                  Дизайн & CSS
                </span>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.styling.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] rounded bg-indigo-950/80 border border-indigo-500/20 text-indigo-200 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111322] border border-purple-500/15">
                <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
                  Онцлог
                </span>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.features.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] rounded bg-cyan-950/80 border border-cyan-500/20 text-cyan-200 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 sm:p-8 pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-purple-500/15 bg-[#090a14]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Хаах
          </button>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 transition-all"
          >
            <span>Веб сайтыг үзэх</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
