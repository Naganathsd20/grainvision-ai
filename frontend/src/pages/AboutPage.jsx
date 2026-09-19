import React from 'react';
import { Wheat, ShieldCheck, Eye, Layers, Monitor, ArrowRight } from 'lucide-react';
import ClassCard from '../components/ClassCard';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutPage({ navigate }) {
  const { t } = useLanguage();

  const techCards = [
    {
      title: t('techCard1Title'),
      description: t('techCard1Desc'),
      icon: Eye
    },
    {
      title: t('techCard2Title'),
      description: t('techCard2Desc'),
      icon: Layers
    },
    {
      title: t('techCard3Title'),
      description: t('techCard3Desc'),
      icon: Monitor
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      {/* HERO */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          {t('aboutPageTitle')}
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          {t('aboutPageSubtitle')}
        </p>
      </section>

      {/* ABOUT DESCRIPTION */}
      <section className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 space-y-3.5 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Overview
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('aboutWhatTitle')}
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          {t('aboutWhatDesc')}
        </p>
      </section>

      {/* WHY IT EXISTS */}
      <section className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 space-y-3.5 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Wheat className="w-4 h-4 text-emerald-600" /> Purpose
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('aboutWhyTitle')}
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          {t('aboutWhyDesc')}
        </p>
      </section>

      {/* RICE VARIETIES */}
      <section>
        <ClassCard />
      </section>

      {/* SYSTEM OVERVIEW */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('techTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            {t('techSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL PRODUCT CTA */}
      <section className="bg-emerald-50/80 rounded-2xl p-8 sm:p-12 border border-emerald-200/80 text-center space-y-6 shadow-sm">
        <div className="max-w-2xl mx-auto space-y-2.5">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('finalCtaTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t('finalCtaSubtitle')}
          </p>
        </div>

        <button
          onClick={() => navigate('/analyzer')}
          className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base transition-all shadow-sm inline-flex items-center gap-2"
        >
          <span>{t('btnAnalyzeRicePhoto')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>
    </div>
  );
}
