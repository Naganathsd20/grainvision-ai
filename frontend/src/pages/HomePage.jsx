import React from 'react';
import { ChevronRight, Upload, Eye, CheckCircle, ArrowRight, ShieldCheck, Zap, Layers, Sprout } from 'lucide-react';
import ClassCard from '../components/ClassCard';
import { useLanguage } from '../i18n/LanguageContext';
import riceHeroImg from '../assets/rice-hero-seamless.png';

export default function HomePage({ navigate }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      {/* HERO SECTION */}
      <section id="home" className="relative rounded-2xl p-6 sm:p-10 lg:p-12 bg-[#f8faf7] border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: HERO TEXT & CTAS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold">
              <Sprout className="w-4 h-4 text-emerald-600" />
              {t('heroBadge')}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t('heroHeadline')}
            </h1>

            <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-xl">
              {t('heroSupportingText')}
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => navigate('/analyzer')}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base transition-all shadow-sm flex items-center gap-2"
              >
                <span>{t('btnAnalyzePhoto')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/how-it-works')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm sm:text-base transition-colors border border-slate-300 flex items-center gap-2 shadow-sm"
              >
                <span>{t('btnHowItWorks')}</span>
              </button>
            </div>

            {/* Simple Info Indicators */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 border-t border-slate-200 text-xs sm:text-sm">
              <div>
                <span className="text-slate-500 block font-medium">{t('trustVarieties')}</span>
                <span className="text-slate-900 font-bold text-sm sm:text-base">8 Rice Types</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">{t('trustAnalysis')}</span>
                <span className="text-emerald-700 font-bold text-sm sm:text-base">Visual Recognition</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">{t('trustSpeed')}</span>
                <span className="text-slate-900 font-bold text-sm sm:text-base">Quick Analysis</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SEAMLESS RICE PHOTOGRAPHY */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              <img
                src={riceHeroImg}
                alt="GrainVision AI Rice Grain Photography"
                className="w-full h-auto object-cover rounded-2xl shadow-sm transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 space-y-3.5 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> {t('overviewBadge')}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('overviewTitle')}
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          {t('overviewText')}
        </p>
      </section>

      {/* RICE VARIETIES */}
      <section>
        <ClassCard />
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('howItWorksPreviewTitle')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              {t('howItWorksPreviewSubtitle')}
            </p>
          </div>

          <button
            onClick={() => navigate('/how-it-works')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-300 transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto shadow-sm"
          >
            <span>{t('btnSeeHowItWorks')}</span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center font-extrabold text-base">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-600" /> {t('step1Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('step1Desc')}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center font-extrabold text-base">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-600" /> {t('step2Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('step2Desc')}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center font-extrabold text-base">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> {t('step3Title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY USE GRAINVISION */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('whyTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            {t('whySubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200/80">
              <Sprout className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('whyEasyTitle')}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t('whyEasyDesc')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200/80">
              <Zap className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('whyQuickTitle')}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t('whyQuickDesc')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200/80">
              <Layers className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('whyClearTitle')}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t('whyClearDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
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
