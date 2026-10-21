import React from 'react';
import { SYSTEM_STEPS } from '../data/portfolioData';
import { CheckCircle2, ArrowRight, Zap, Award, Layers } from 'lucide-react';

interface ProcessSystemProps {
  onOpenBooking: () => void;
}

export const ProcessSystem: React.FC<ProcessSystemProps> = ({ onOpenBooking }) => {
  return (
    <section id="system" className="py-24 border-t border-neutral-800/80 bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            <span>The 4-Step Production Blueprint</span>
            <span aria-hidden="true">·</span>
            <span>Predictable Growth Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            No Creative Guesswork. A Disciplined System for Velocity.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-3 leading-relaxed">
            Inspired by high-ticket growth funnels, our 4-stage post-production pipeline systematically eliminates viewer churn, optimizes YouTube algorithm signals, and drives high-intent inquiries.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {SYSTEM_STEPS.map((step) => (
            <div
              key={step.step}
              className="relative p-6 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 hover:bg-neutral-900/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step Number Display */}
                <div className="text-3xl font-extrabold font-mono text-emerald-400/80 mb-4">
                  {step.step}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs font-medium text-emerald-400 mb-3">
                  {step.tagline}
                </p>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Tangible Deliverable Box */}
              <div className="pt-4 border-t border-neutral-800/80 text-xs">
                <span className="text-[11px] font-semibold text-neutral-400 block mb-1">
                  Tangible Milestone:
                </span>
                <span className="text-neutral-200">
                  {step.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Editor Bio & Studio Authority Card */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 md:p-10 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Portrait Image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border border-neutral-700 shadow-xl">
                <img
                  src="/src/assets/images/editor_portrait_alex_1792097292328.jpg"
                  alt="Alex Vance - Lead Video Editor"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="text-xs font-bold text-white block">Alex Vance</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Senior Editor & Retention Lead</span>
                </div>
              </div>
            </div>

            {/* Bio & Credentials */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
                <span>The Editor Behind the Cuts</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                "Great editing isn't about flashy transitions. It's about psychology and respecting the audience's time."
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                With 8+ years specializing in high-retention video systems, I work directly with selective YC founders, medical clinic directors, and tier-1 YouTube creators. You get direct senior communication on Frame.io and Slack—no junior hand-offs, no missed deadlines.
              </p>

              {/* Verified Credentials */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Certified DaVinci Resolve Master</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Frame.io Certified Workflow</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>48M+ Total Views Handled</span>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all shadow-md shadow-emerald-500/20"
                >
                  <span>Discuss Your Channel or Brand Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
