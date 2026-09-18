import React from 'react';
import { Sparkles, ChevronRight, Upload, Eye, CheckCircle, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';
import ClassCard from '../components/ClassCard';
import { useLanguage } from '../i18n/LanguageContext';

export default function HomePage({ navigate }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-16 sm:space-y-20 lg:space-y-24">
      {/* HERO SECTION */}
      <section id="home" className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-sans font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            {t('heroBadge')}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {t('heroHeadline')}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl">
            {t('heroSupportingText')}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/analyzer')}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <span>{t('btnAnalyzePhoto')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/how-it-works')}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm sm:text-base transition-colors border border-slate-700 flex items-center gap-2"
            >
              <span>{t('btnHowItWorks')}</span>
            </button>
          </div>

          {/* Simple Info Indicators */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 border-t border-slate-800/80 text-xs sm:text-sm">
            <div>
              <span className="text-slate-400 block">{t('trustVarieties')}</span>
              <span className="text-white font-bold text-sm sm:text-base">5 Varieties</span>
            </div>
            <div>
              <span className="text-slate-400 block">{t('trustAnalysis')}</span>
              <span className="text-emerald-400 font-bold text-sm sm:text-base">Photo Analysis</span>
            </div>
            <div>
              <span className="text-slate-400 block">{t('trustSpeed')}</span>
              <span className="text-cyan-400 font-bold text-sm sm:text-base">Instant</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS GRAINVISION AI */}
      <section className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" /> {t('overviewBadge')}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t('overviewTitle')}
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          {t('overviewText')}
        </p>
      </section>

      {/* RICE VARIETIES */}
      <section>
        <ClassCard />
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t('howItWorksPreviewTitle')}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              {t('howItWorksPreviewSubtitle')}
            </p>
          </div>

          <button
            onClick={() => navigate('/how-it-works')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <span>{t('btnSeeHowItWorks')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-900/60 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-extrabold text-lg">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-400" /> {t('step1Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t('step1Desc')}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-900/60 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-extrabold text-lg">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" /> {t('step2Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t('step2Desc')}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-900/60 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-extrabold text-lg">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-400" /> {t('step3Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t('step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY USE GRAINVISION */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('whyTitle')}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1">
            {t('whySubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">{t('whyEasyTitle')}</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('whyEasyDesc')}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">{t('whyQuickTitle')}</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('whyQuickDesc')}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">{t('whyClearTitle')}</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('whyClearDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
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
