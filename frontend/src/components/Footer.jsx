import React from 'react';
import { Wheat } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer({ currentPath, navigate }) {
  const { t } = useLanguage();

  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navAnalyzer'), path: '/analyzer' },
    { name: t('navHowItWorks'), path: '/how-it-works' },
    { name: t('navAbout'), path: '/about' },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-600 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
            <Wheat className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-sm sm:text-base">GrainVision AI</div>
            <div className="text-slate-500 text-xs mt-0.5">
              {t('footerSubtitle')}
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-600 font-medium">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`transition-colors ${
                currentPath === link.path ? 'text-emerald-700 font-semibold' : 'hover:text-emerald-700'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
