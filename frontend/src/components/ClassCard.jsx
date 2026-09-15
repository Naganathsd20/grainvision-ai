import React from 'react';
import { Tag, Globe, Sparkles } from 'lucide-react';

const riceClasses = [
  {
    name: 'Arborio',
    type: 'Short / Plump Grain',
    origin: 'Italy',
    description: 'High amylopectin content, creates creamy texture, primary variety used for risotto.',
    color: 'from-amber-500/20 to-orange-500/5',
    borderColor: 'hover:border-amber-500/50',
    accentColor: 'text-amber-400'
  },
  {
    name: 'Basmati',
    type: 'Long / Slender Grain',
    origin: 'India / Pakistan',
    description: 'Distinctive aromatic scent, expands lengthwise during cooking without sticking.',
    color: 'from-emerald-500/20 to-teal-500/5',
    borderColor: 'hover:border-emerald-500/50',
    accentColor: 'text-emerald-400'
  },
  {
    name: 'Ipsala',
    type: 'Medium / Long Grain',
    origin: 'Turkey',
    description: 'Widely cultivated in Thrace region, uniform kernel length, resistant to breakage.',
    color: 'from-cyan-500/20 to-blue-500/5',
    borderColor: 'hover:border-cyan-500/50',
    accentColor: 'text-cyan-400'
  },
  {
    name: 'Jasmine',
    type: 'Long Grain Aromatic',
    origin: 'Thailand',
    description: 'Floral pandan aroma, slightly sticky texture when steamed, translucent kernel.',
    color: 'from-purple-500/20 to-indigo-500/5',
    borderColor: 'hover:border-purple-500/50',
    accentColor: 'text-purple-400'
  },
  {
    name: 'Karacadag',
    type: 'Medium Grain Local',
    origin: 'Southeastern Turkey',
    description: 'High water absorption capacity, distinct reddish-brown soil heritage, firm bite.',
    color: 'from-rose-500/20 to-pink-500/5',
    borderColor: 'hover:border-rose-500/50',
    accentColor: 'text-rose-400'
  }
];

export default function ClassCard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Target Classification Categories
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">5 Classes</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Rice varieties planned for MobileNetV2 Deep Learning multi-class classification
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {riceClasses.map((rice) => (
          <div
            key={rice.name}
            className={`glass-card glass-card-hover rounded-xl p-5 border border-slate-800 flex flex-col justify-between bg-gradient-to-b ${rice.color} transition-all duration-300`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {rice.origin}
                </span>
                <Sparkles className={`w-4 h-4 ${rice.accentColor}`} />
              </div>

              <h3 className={`text-xl font-bold ${rice.accentColor} tracking-wide`}>
                {rice.name}
              </h3>

              <div className="mt-1 text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Tag className="w-3 h-3 text-slate-400" />
                {rice.type}
              </div>

              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                {rice.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>DL Target</span>
              <span className="text-slate-300">Phase 4</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
