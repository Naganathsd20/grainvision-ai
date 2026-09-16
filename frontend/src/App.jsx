import React from 'react';
import Header from './components/Header';
import BackendStatus from './components/BackendStatus';
import Predictor from './components/Predictor';
import ClassCard from './components/ClassCard';
import ArchitecturePreview from './components/ArchitecturePreview';
import { Sparkles, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

const phases = [
  { num: '01', name: 'Project Foundation', completed: true, current: false },
  { num: '02', name: 'Dataset Preparation', completed: true, current: false },
  { num: '03', name: 'Data Preprocessing', completed: true, current: false },
  { num: '04', name: 'Deep Learning Model', completed: true, current: false },
  { num: '05', name: 'Model Training', completed: true, current: false },
  { num: '06', name: 'Model Evaluation', completed: true, current: false },
  { num: '07', name: 'Backend & Prediction API', completed: true, current: false },
  { num: '08', name: 'Frontend Web Application', completed: false, current: true },
  { num: '09', name: 'Integration & Testing', completed: false, current: false },
  { num: '10', name: 'Deployment & Portfolio', completed: false, current: false },
];

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* HERO SECTION */}
        <section className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 shadow-2xl">
          {/* Decorative background blur effects */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Deep Learning Portfolio Project • MobileNetV2
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none font-sans">
              GrainVision <span className="gradient-text">AI</span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-300 font-light leading-relaxed">
              Intelligent Rice Grain Classification Using Deep Learning
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              An intelligent computer vision web application leveraging fine-tuned MobileNetV2 Convolutional Neural Networks (CNN) to automatically categorize 5 commercial rice varieties with confidence scoring and probability distributions.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#predictor-section"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2"
              >
                <span>Analyze Grain Sample</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#rice-classes"
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700 flex items-center gap-2"
              >
                <span>Explore Rice Classes</span>
              </a>
            </div>
          </div>
        </section>

        {/* BACKEND CONNECTIVITY STATUS CARD */}
        <section id="backend-status-card">
          <BackendStatus />
        </section>

        {/* MAIN PREDICTION & UPLOAD SECTION */}
        <section id="predictor-section">
          <Predictor />
        </section>

        {/* TARGET RICE CLASSES GRID */}
        <section id="rice-classes">
          <ClassCard />
        </section>

        {/* ARCHITECTURE PREVIEW PIPELINE */}
        <section>
          <ArchitecturePreview />
        </section>

        {/* PROJECT 10-PHASE ROADMAP TRACKER */}
        <section className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                10-Phase Project Roadmap
              </h3>
              <p className="text-slate-400 text-sm mt-0.5">
                Structured development workflow strictly adhering to academic standards
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
              Phase 8 of 10 Active
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {phases.map((p) => (
              <div
                key={p.num}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  p.current
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 ring-1 ring-emerald-500/30'
                    : p.completed
                    ? 'bg-slate-900/80 border-slate-700/80 text-slate-200'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${p.current ? 'text-emerald-400' : p.completed ? 'text-slate-300' : 'text-slate-400'}`}>
                    PHASE {p.num}
                  </span>
                  {(p.current || p.completed) && <CheckCircle2 className={`w-3.5 h-3.5 ${p.current ? 'text-emerald-400' : 'text-slate-400'}`} />}
                </div>
                <div className="text-xs font-semibold mt-1.5 truncate text-slate-200">
                  {p.name}
                </div>
                <div className="text-[10px] font-mono mt-1 text-slate-400">
                  {p.current ? 'Currently Working' : p.completed ? 'Completed' : 'Upcoming'}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">GrainVision AI</span>
            <span>•</span>
            <span>Intelligent Rice Grain Classification Using Deep Learning</span>
          </div>
          <div className="font-mono text-slate-400">
            Current Status: <span className="text-emerald-400 font-semibold">Phase 8 — Frontend Web Application</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
