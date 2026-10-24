/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const footerLinks = [
    { label: 'Нүүр', href: '#home' },
    { label: 'Миний тухай', href: '#about' },
    { label: 'Ур чадвар', href: '#skills' },
    { label: 'Хийсэн төслүүд', href: '#projects' },
    { label: 'Боловсрол', href: '#education' },
    { label: 'Холбоо барих', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#05060a] border-t border-purple-500/15 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-base font-bold text-white tracking-tight font-heading">
              Сүхбат Мөнх-Оргил
            </span>
            <span className="text-xs text-purple-400 font-mono mt-0.5">
              Full-Stack хөгжүүлэгч • МУИС 4-р курс
            </span>
            <p className="text-xs text-slate-400 max-w-sm mt-2">
              “Санааг бодит дижитал шийдэл болгоно.”
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-purple-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111322] hover:bg-[#1a1d34] border border-purple-500/20 hover:border-purple-400/40 text-purple-200 transition-all shadow-md group"
            aria-label="Дээш буцах"
          >
            <span>Дээш буцах</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-400 text-xs font-normal">
          <div className="tracking-normal">
            © {new Date().getFullYear()} Сүхбат Мөнх-Оргил. Бүх эрх хуулиар хамгаалагдсан.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>React, Three.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
