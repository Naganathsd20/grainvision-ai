import React from 'react';
import { ArrowRight, Image as ImageIcon, Server, Cpu, BarChart3, CheckCircle, Clock } from 'lucide-react';

const pipelineSteps = [
  {
    step: '01',
    title: 'User Upload',
    subtitle: 'JPG / PNG Grain Image',
    desc: 'Interactive UI with drag-and-drop & file validation',
    icon: ImageIcon,
    status: 'Ready (Frontend Phase 1)',
    active: true,
  },
  {
    step: '02',
    title: 'Flask REST API',
    subtitle: 'JSON & File Transfer',
    desc: 'Receives request, CORS enabled, passes image payload',
    icon: Server,
    status: 'Ready (Backend Phase 1)',
    active: true,
  },
  {
    step: '03',
    title: 'Deep Learning Model',
    subtitle: 'MobileNetV2 CNN',
    desc: 'Image resizing (224x224), feature extraction & Softmax',
    icon: Cpu,
    status: 'To be implemented in Phase 4',
    active: false,
  },
  {
    step: '04',
    title: 'Classification Output',
    subtitle: 'Variety + Confidence',
    desc: 'Displays top class & percentage confidence distribution',
    icon: BarChart3,
    status: 'To be connected in Phase 7/8',
    active: false,
  },
];

export default function ArchitecturePreview() {
  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            System Architecture Flow
          </h3>
          <p className="text-slate-400 text-sm mt-0.5">
            End-to-end processing pipeline from React frontend to TensorFlow Deep Learning inference
          </p>
        </div>
        <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Academic DL Architecture
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {pipelineSteps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={item.step} className="relative group">
              <div className={`p-5 rounded-xl border transition-all h-full flex flex-col justify-between ${
                item.active 
                  ? 'bg-slate-900/80 border-emerald-500/40 shadow-lg shadow-emerald-500/5' 
                  : 'bg-slate-900/30 border-slate-800/80'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold ${item.active ? 'text-emerald-400' : 'text-slate-500'}`}>
                      STEP {item.step}
                    </span>
                    <div className={`p-2 rounded-lg ${item.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-200 text-base">{item.title}</h4>
                  <p className="text-xs font-mono text-emerald-400/80 mt-0.5">{item.subtitle}</p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] font-mono">
                  {item.active ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle className="w-3 h-3" /> {item.status}
                    </span>
                  ) : (
                    <span className="text-amber-400/80 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.status}
                    </span>
                  )}
                </div>
              </div>

              {idx < pipelineSteps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-1 bg-slate-950 rounded-full border border-slate-800 text-slate-500">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
