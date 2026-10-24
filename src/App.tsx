/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { EducationSection } from './components/EducationSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { CVModal } from './components/CVModal.tsx';
import { Floating3DBackground } from './components/Floating3DBackground.tsx';
import { ScrollProgressBar } from './components/ScrollProgressBar.tsx';
import { SectionDivider } from './components/SectionDivider.tsx';

export default function App() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#07080d] text-slate-100 flex flex-col font-sans selection:bg-purple-600/30 selection:text-purple-200">
      {/* Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* Floating 3D Cyber Background Elements with Framer Motion scroll parallax */}
      <Floating3DBackground />

      {/* Navigation Bar */}
      <Navbar onOpenCV={() => setCvModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* Нүүр хуудас */}
        <HeroSection onOpenCV={() => setCvModalOpen(true)} />

        <SectionDivider />

        {/* Миний тухай */}
        <AboutSection onOpenCV={() => setCvModalOpen(true)} />

        <SectionDivider />

        {/* Ур чадвар */}
        <SkillsSection />

        <SectionDivider />

        {/* Хийсэн төслүүд */}
        <ProjectsSection />

        <SectionDivider />

        {/* Боловсрол болон Сертификатууд */}
        <EducationSection />

        <SectionDivider />

        {/* Холбоо барих */}
        <ContactSection />
      </main>

      {/* Footer & Back to top */}
      <Footer />

      {/* Interactive CV Modal (Монгол хэл дээр) */}
      <CVModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </div>
  );
}
