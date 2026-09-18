import React from 'react';
import { Github, Wheat } from 'lucide-react';
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
    <footer className="border-t border-slate-800 bg-slate-950 py-10 text-xs text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 font-bold shrink-0">
            <Wheat className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-extrabold text-slate-200 text-sm sm:text-base">GrainVision AI</div>
            <div className="text-slate-400 text-xs mt-0.5">
              {t('footerSubtitle')}
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300 font-medium">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`transition-colors ${
                currentPath === link.path ? 'text-emerald-400 font-bold' : 'hover:text-emerald-400'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* GitHub link */}
        <div>
          <a
            href="https://github.com/Naganathsd20/grainvision-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-xs font-mono"
          >
            <Github className="w-4 h-4" />
            <span>{t('githubRepo')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
