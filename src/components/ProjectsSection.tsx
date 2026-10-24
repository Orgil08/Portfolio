/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  ExternalLink,
  Info,
  Search,
  ArrowUpRight,
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData.ts';
import { ProjectData, filterProjects } from '../utils/portfolio.ts';
import { ProjectModal } from './ProjectModal.tsx';

// Framer Motion staggered entrance animation variants
const cardsContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.08,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 55,
    rotateX: 14,
    scale: 0.93,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 85,
      damping: 14,
      mass: 0.8,
    },
  },
};

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Бүгд');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  const categories = ['Бүгд', 'Систем', 'Эрүүл мэнд', 'Креатив медиа'];
  const filtered = filterProjects(PROJECTS, selectedCategory, searchQuery);

  return (
    <section id="projects" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Framer Motion scroll trigger */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-wider mb-3">
            <span>Төслүүд</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Хийсэн төслүүд
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Лабораторийн тоног төхөөрөмжийн систем, эмнэлгийн үйлчилгээний веб болон креатив медиа чиглэлийн бодит ажиллагаатай веб төслүүдтэй танилцах.
          </p>
        </motion.div>

        {/* Filter & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 p-3 sm:p-4 rounded-3xl bg-[#0c0d18] border border-purple-500/15"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Төсөл хайх..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
            />
          </div>
        </motion.div>

        {/* Project Cards Grid with Framer Motion Staggered Scroll-Triggered Entrance */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-[#0c0d18] border border-purple-500/15">
            <p className="text-slate-400 text-sm">Таны хайлтад тохирох төсөл олдсонгүй.</p>
            <button
              onClick={() => {
                setSelectedCategory('Бүгд');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 text-xs font-medium text-purple-300 bg-purple-950/40 border border-purple-500/30 rounded-xl"
            >
              Шүүлтийг арилгах
            </button>
          </div>
        ) : (
          <motion.div
            key={selectedCategory + searchQuery}
            variants={cardsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                variants={cardItemVariants}
                whileHover={{
                  y: -6,
                  scale: 1.025,
                  transition: { type: 'spring', stiffness: 350, damping: 22 },
                }}
                whileTap={{ scale: 0.99 }}
                style={{ transformPerspective: 1000 }}
                className="group relative flex flex-col justify-between rounded-3xl bg-gradient-to-b from-[#111322] to-[#0a0b12] border border-purple-500/20 hover:border-purple-400/80 p-6 sm:p-7 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.35),0_0_60px_rgba(6,182,212,0.15),0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden"
              >
                {/* Glowing border inner aura on hover */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-purple-400/60 pointer-events-none transition-colors duration-300 shadow-[inset_0_0_18px_rgba(168,85,247,0.2)]" />

                {/* Accent glow corner lights */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/30 group-hover:scale-125 transition-all duration-300 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/0 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all duration-300 pointer-events-none" />

                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium text-purple-300 bg-purple-950/70 border border-purple-500/30">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Vercel Live</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors mb-1.5 flex items-center justify-between font-heading">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-purple-300 transition-colors transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="text-xs font-medium text-purple-300/80 mb-4">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-white/5 border border-white/5 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-5 border-t border-purple-500/15 flex items-center gap-2.5">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-600/25 transition-all hover:scale-[1.02]"
                  >
                    <span>Веб сайтыг үзэх</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-purple-200 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/25 rounded-xl transition-all hover:border-purple-400"
                  >
                    <Info className="w-3.5 h-3.5 text-purple-400" />
                    <span>Дэлгэрэнгүй үзэх</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-14 p-6 sm:p-7 rounded-3xl bg-[#0e101d] border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-1 font-heading">
              Шинэ төсөл дээр хамтран ажиллах уу?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Хамтран ажиллах санал, асуулт байвал надтай шууд холбогдоорой.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
          >
            Холбоо барих
          </a>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
