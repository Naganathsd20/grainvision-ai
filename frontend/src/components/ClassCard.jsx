import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ClassCard() {
  const { t } = useLanguage();

  const riceClasses = [
    {
      name: 'Arborio',
      descKey: 'arborioDesc',
      color: 'from-amber-500/20 to-orange-500/5',
      accentColor: 'text-amber-400'
    },
    {
      name: 'Basmati',
      descKey: 'basmatiDesc',
      color: 'from-emerald-500/20 to-teal-500/5',
      accentColor: 'text-emerald-400'
    },
    {
      name: 'HMT (Sona Masuri)',
      descKey: 'hmtDesc',
      color: 'from-yellow-500/20 to-amber-500/5',
      accentColor: 'text-yellow-400'
    },
    {
      name: 'Ipsala',
      descKey: 'ipsalaDesc',
      color: 'from-cyan-500/20 to-blue-500/5',
      accentColor: 'text-cyan-400'
    },
    {
      name: 'Jasmine',
      descKey: 'jasmineDesc',
      color: 'from-purple-500/20 to-indigo-500/5',
      accentColor: 'text-purple-400'
    },
    {
      name: 'Jhili',
      descKey: 'jhiliDesc',
      color: 'from-sky-500/20 to-cyan-500/5',
      accentColor: 'text-sky-400'
    },
    {
      name: 'Karacadag',
      descKey: 'karacadagDesc',
      color: 'from-rose-500/20 to-pink-500/5',
      accentColor: 'text-rose-400'
    },
    {
      name: 'Masuri',
      descKey: 'masuriDesc',
      color: 'from-orange-500/20 to-red-500/5',
      accentColor: 'text-orange-400'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            {t('varietiesTitle')}
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              {t('supportedCount')}
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1">
            {t('varietiesSubtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch">
        {riceClasses.map((rice) => (
          <div
            key={rice.name}
            className={`glass-card glass-card-hover rounded-2xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between bg-gradient-to-b ${rice.color} transition-all duration-300 h-full`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-end">
                <Sparkles className={`w-4 h-4 ${rice.accentColor}`} />
              </div>

              <div>
                <h3 className={`text-xl sm:text-2xl font-extrabold ${rice.accentColor} tracking-wide`}>
                  {rice.name}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
                {t(rice.descKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
