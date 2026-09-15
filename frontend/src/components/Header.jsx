import React from 'react';
import { Wheat, Layers, GitBranch } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand logo & title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-bold">
            <Wheat className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                GrainVision <span className="gradient-text">AI</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block font-medium">
              Intelligent Rice Grain Classification Using Deep Learning
            </p>
          </div>
        </div>

        {/* Phase status badge */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            <span>MobileNetV2 CNN</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Phase 1 — Project Foundation</span>
          </div>
        </div>
      </div>
    </header>
  );
}
