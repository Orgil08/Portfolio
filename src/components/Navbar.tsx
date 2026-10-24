/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Send } from 'lucide-react';

interface NavbarProps {
  onOpenCV: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCV }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Нүүр', href: '#home' },
    { label: 'Миний тухай', href: '#about' },
    { label: 'Ур чадвар', href: '#skills' },
    { label: 'Хийсэн төслүүд', href: '#projects' },
    { label: 'Боловсрол', href: '#education' },
    { label: 'Холбоо барих', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07080d]/90 backdrop-blur-md border-b border-purple-500/15 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          className="group flex items-center gap-3 text-white font-semibold tracking-tight text-lg"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] transition-transform group-hover:scale-105 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <div className="w-full h-full bg-[#0a0b12] rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
                MO
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white group-hover:text-purple-300 transition-colors font-heading">
              Сүхбат Мөнх-Оргил
            </span>
            <span className="text-[11px] font-mono text-purple-400/90 tracking-wider">
              Full-Stack хөгжүүлэгч
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#101222]/60 px-4 py-1.5 rounded-full border border-purple-500/15 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-xs xl:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenCV}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-purple-200 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 rounded-xl transition-all hover:border-purple-400 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>CV татах</span>
          </button>
          <a
            href="#contact"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl transition-all shadow-md shadow-purple-600/25 hover:shadow-purple-600/40"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Надтай холбогдох</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 text-slate-300 hover:text-white bg-white/5 rounded-xl border border-white/10"
            aria-label={mobileMenuOpen ? 'Цэс хаах' : 'Цэс нээх'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0b12]/98 border-b border-purple-500/20 px-6 py-6 backdrop-blur-xl animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-purple-300 hover:bg-purple-500/10 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-purple-500/15 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCV();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-purple-200 bg-purple-950/50 border border-purple-500/30 rounded-xl"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <span>CV татах</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg shadow-purple-600/30"
              >
                <Send className="w-4 h-4" />
                <span>Надтай холбогдох</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
