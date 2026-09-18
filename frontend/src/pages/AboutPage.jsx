import React from 'react';
import { Wheat, Globe, Sparkles, Github, ShieldCheck, Eye, Layers, Monitor, ArrowRight } from 'lucide-react';
import ClassCard from '../components/ClassCard';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutPage({ navigate }) {
  const { t } = useLanguage();

  const techCards = [
    {
      title: t('techCard1Title'),
      description: t('techCard1Desc'),
      icon: Eye,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: t('techCard2Title'),
      description: t('techCard2Desc'),
      icon: Layers,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: t('techCard3Title'),
      description: t('techCard3Desc'),
      icon: Monitor,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-20 lg:space-y-24">
      {/* HERO */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          {t('aboutPageTitle')}
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          {t('aboutPageSubtitle')}
        </p>
      </section>

      {/* ABOUT DESCRIPTION */}
      <section className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" /> Overview
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t('aboutWhatTitle')}
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          {t('aboutWhatDesc')}
        </p>
      </section>

      {/* WHY IT EXISTS */}
      <section className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 bg-slate-900/60 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Wheat className="w-4 h-4" /> Purpose
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t('aboutWhyTitle')}
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          {t('aboutWhyDesc')}
        </p>
      </section>

      {/* RICE VARIETIES */}
      <section>
        <ClassCard />
      </section>

      {/* TECHNOLOGY BEHIND GRAINVISION */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('techTitle')}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1">
            {t('techSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-900/50 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl border ${card.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL PRODUCT CTA */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('finalCtaTitle')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('finalCtaSubtitle')}
          </p>
        </div>

        <button
          onClick={() => navigate('/analyzer')}
          className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all shadow-xl shadow-emerald-500/25 inline-flex items-center gap-2"
        >
          <span>{t('btnAnalyzeRicePhoto')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>
    </div>
  );
}
