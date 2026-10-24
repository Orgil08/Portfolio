/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Briefcase,
  FileText,
  ArrowRight,
  Code2,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Palette,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface AboutSectionProps {
  onOpenCV: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenCV }) => {
  const profileDetails = [
    { label: 'Нэр', value: PERSONAL_INFO.name, icon: User },
    { label: 'Нас', value: `${PERSONAL_INFO.age} нас`, icon: Calendar },
    { label: 'Мэргэжил', value: PERSONAL_INFO.role, icon: Briefcase },
    {
      label: 'Боловсрол',
      value: PERSONAL_INFO.educationSummary,
      icon: GraduationCap,
      sub: `Төгсөх хугацаа: ${PERSONAL_INFO.graduationDate}`,
    },
    {
      label: 'Мэргэжлийн сургалт',
      value: PERSONAL_INFO.trainingSummary,
      icon: BookOpen,
      sub: 'Практик түвшний Full-Stack архитектур',
    },
    {
      label: 'Сертификатууд',
      value: PERSONAL_INFO.certSummary,
      icon: Award,
      sub: 'Coursera сертификаттай',
    },
  ];

  const coreValues = [
    {
      icon: Code2,
      title: 'Цэвэр & Уншигдахуйц код',
      description:
        'Кодын чанар, дахин ашиглагдах бүтэц болон архитектурын шилдэг туршлагуудыг чанд баримталдаг.',
    },
    {
      icon: Palette,
      title: 'UI/UX & Хэрэглэгч төвт дизайн',
      description:
        'Хэрэглэхэд хялбар, логик дараалал бүхий цэгцтэй интерфейсийг Figma болон код дээр амилуулдаг.',
    },
    {
      icon: Zap,
      title: 'Өндөр хурд & Оновчлол',
      description:
        'Вебийн ачааллыг хамгийн бага түвшинд байлгаж, хурдтай, бүх төхөөрөмжид 100% тохирсон шийдэл бүтээдэг.',
    },
    {
      icon: ShieldCheck,
      title: 'Найдвартай ажиллагаа',
      description:
        'Алдаа мадаггүй ажиллах логик, өгөгдлийн бүрэн бүтэн байдал болон системийн тогтвортой байдлыг эрхэмлэдэг.',
    },
  ];

  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-wider mb-3">
            <span>Танилцуулга</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Миний тухай
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Монгол Улсын Их Сургуулийн 4-р курсийн оюутан, шинийг эрэлхийлэгч Full-Stack хөгжүүлэгч Сүхбат Мөнх-Оргилын боловсрол, мэргэжлийн замнал.
          </p>
        </motion.div>

        {/* Main Grid: Profile Info & Bio with 3D scroll transforms */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left: Key Profile Details Card with 3D tilt (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: 8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            style={{ transformPerspective: 1000 }}
            className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#0d0f1c]/90 border border-purple-500/20 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-purple-500/15">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {PERSONAL_INFO.name}
                  </h3>
                  <p className="text-xs font-mono text-purple-400 mt-0.5">
                    {PERSONAL_INFO.role}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <User className="w-6 h-6" />
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-4">
                {profileDetails.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/20 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-mono uppercase text-slate-400 block">
                          {item.label}
                        </span>
                        <span className="text-sm font-semibold text-slate-100 block break-words">
                          {item.value}
                        </span>
                        {item.sub && (
                          <span className="text-xs text-purple-300/80 block mt-0.5">
                            {item.sub}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-6 border-t border-purple-500/15 flex flex-wrap gap-3">
              <button
                onClick={onOpenCV}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl transition-all shadow-md shadow-purple-600/30"
              >
                <FileText className="w-4 h-4" />
                <span>CV татах</span>
              </button>

              <a
                href="#projects"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-purple-200 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 rounded-xl transition-all"
              >
                <span>Төслүүдтэй танилцах</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right: Detailed Story & Value Propositions (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: -8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            style={{ transformPerspective: 1000 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0e1a]/80 border border-purple-500/15 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5 font-heading">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>Хөгжүүлэгчийн тухай</span>
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {PERSONAL_INFO.bio.map((paragraph, idx) => (
                  <p key={idx} className="text-slate-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Highlights pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>МУИС — Компьютерийн шинжлэх ухаан</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Indra Institute — Full-Stack практик</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Coursera — Front-End хөтөлбөр</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Coursera — UI/UX Design хөтөлбөр</span>
                </div>
              </div>
            </div>

            {/* Core Values Cards with stagger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="p-5 rounded-2xl bg-[#0f1120]/70 border border-purple-500/10 hover:border-purple-500/30 transition-all hover:-translate-y-0.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/25 flex items-center justify-center text-purple-300 mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">{val.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{val.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
