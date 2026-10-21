import React, { useState } from 'react';
import { Calculator as CalcIcon, Clock, Sparkles, Check, ArrowRight } from 'lucide-react';

interface CalculatorProps {
  onPreFillBooking: (scopeDetails: {
    projectType: string;
    volume: string;
    turnaround: 'standard' | 'priority-24h';
    estimatedBudget: string;
  }) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onPreFillBooking }) => {
  const [videoType, setVideoType] = useState<'youtube' | 'ads' | 'hybrid'>('youtube');
  const [volume, setVolume] = useState<number>(4);
  const [priorityTurnaround, setPriorityTurnaround] = useState<boolean>(false);
  const [includeThumbnails, setIncludeThumbnails] = useState<boolean>(true);
  const [includeMotionGraphics, setIncludeMotionGraphics] = useState<boolean>(false);

  // Pricing math calculations
  const baseRate = videoType === 'youtube' ? 450 : videoType === 'ads' ? 280 : 650;
  let totalPerMonth = baseRate * volume;

  if (priorityTurnaround) {
    totalPerMonth += volume * 100;
  }
  if (includeThumbnails && videoType !== 'ads') {
    totalPerMonth += volume * 75;
  }
  if (includeMotionGraphics) {
    totalPerMonth += volume * 120;
  }

  // Volume discount for 8+
  const discount = volume >= 8 ? 0.15 : volume >= 4 ? 0.08 : 0;
  const discountedTotal = Math.round(totalPerMonth * (1 - discount));

  const handleApplyToBooking = () => {
    const typeLabel = 
      videoType === 'youtube' ? 'YouTube Long-form Master' :
      videoType === 'ads' ? 'High-Performance Paid Ads' : 'Hybrid Omnichannel Retainer';

    onPreFillBooking({
      projectType: typeLabel,
      volume: `${volume} videos/month`,
      turnaround: priorityTurnaround ? 'priority-24h' : 'standard',
      estimatedBudget: `$${discountedTotal.toLocaleString()}/month`
    });
  };

  return (
    <section id="calculator" className="py-24 border-t border-neutral-800/80 bg-[#07080b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            <span>Transparent Investment</span>
            <span aria-hidden="true">·</span>
            <span>Project Scope Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Calculate Your Video Pipeline & Retainer.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-3">
            Dial in your monthly deliverables, required turnaround speed, and custom motion graphics tier for an instant project projection.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls */}
            <div className="md:col-span-7 flex flex-col gap-6">
              
              {/* Deliverable Format Selector */}
              <div>
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-3">
                  1. Select Video Deliverable Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setVideoType('youtube')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      videoType === 'youtube'
                        ? 'border-emerald-400/80 bg-emerald-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="block text-xs font-bold text-white mb-1">YouTube</span>
                    <span className="block text-[11px] text-neutral-400 leading-tight">10–25m Longform</span>
                  </button>

                  <button
                    onClick={() => setVideoType('ads')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      videoType === 'ads'
                        ? 'border-emerald-400/80 bg-emerald-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="block text-xs font-bold text-white mb-1">Performance Ads</span>
                    <span className="block text-[11px] text-neutral-400 leading-tight">9:16 Reels / TikTok</span>
                  </button>

                  <button
                    onClick={() => setVideoType('hybrid')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      videoType === 'hybrid'
                        ? 'border-emerald-400/80 bg-emerald-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="block text-xs font-bold text-white mb-1">Hybrid Growth</span>
                    <span className="block text-[11px] text-neutral-400 leading-tight">Long + Short Cuts</span>
                  </button>
                </div>
              </div>

              {/* Monthly Volume Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  <span>2. Monthly Video Output</span>
                  <span className="font-mono text-emerald-400 text-sm font-bold">{volume} {volume === 1 ? 'Video' : 'Videos'} / Month</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="16"
                  step="1"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[11px] text-neutral-500 font-mono mt-1">
                  <span>1 Video (Single project)</span>
                  <span>4 (Standard weekly)</span>
                  <span>8+ (High-velocity scale)</span>
                </div>
              </div>

              {/* Add-ons and Turnaround switches */}
              <div className="space-y-3 pt-4 border-t border-neutral-800">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                  3. Production Enhancements & SLAs
                </label>

                <div 
                  onClick={() => setPriorityTurnaround(!priorityTurnaround)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    priorityTurnaround 
                      ? 'border-emerald-500/50 bg-emerald-950/20' 
                      : 'border-neutral-800 bg-neutral-950/50 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${priorityTurnaround ? 'bg-emerald-400 border-emerald-400 text-neutral-950' : 'border-neutral-700'}`}>
                      {priorityTurnaround && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Priority 24-Hour Rough Cut SLA</span>
                      <span className="text-[11px] text-neutral-400">Guaranteed turnaround for time-sensitive news and launches</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">+$100/vid</span>
                </div>

                <div 
                  onClick={() => setIncludeThumbnails(!includeThumbnails)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    includeThumbnails 
                      ? 'border-emerald-500/50 bg-emerald-950/20' 
                      : 'border-neutral-800 bg-neutral-950/50 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${includeThumbnails ? 'bg-emerald-400 border-emerald-400 text-neutral-950' : 'border-neutral-700'}`}>
                      {includeThumbnails && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Custom 3-Variant CTR Thumbnails</span>
                      <span className="text-[11px] text-neutral-400">Photoshop cutouts, high contrast lighting, A/B testing package</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">+$75/vid</span>
                </div>

                <div 
                  onClick={() => setIncludeMotionGraphics(!includeMotionGraphics)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    includeMotionGraphics 
                      ? 'border-emerald-500/50 bg-emerald-950/20' 
                      : 'border-neutral-800 bg-neutral-950/50 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${includeMotionGraphics ? 'bg-emerald-400 border-emerald-400 text-neutral-950' : 'border-neutral-700'}`}>
                      {includeMotionGraphics && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Custom 3D / After Effects Motion Package</span>
                      <span className="text-[11px] text-neutral-400">3D product renders, kinetic charts, bespoke brand animations</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">+$120/vid</span>
                </div>
              </div>

            </div>

            {/* Right Summary Card */}
            <div className="md:col-span-5 rounded-2xl border border-neutral-800 bg-neutral-950 p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-neutral-800">
                  <span>Scope Summary</span>
                  <span className="font-mono text-emerald-400 uppercase text-[11px]">{videoType} Package</span>
                </div>

                <div className="my-6">
                  <div className="text-xs text-neutral-400">Estimated Production Retainer:</div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold text-white font-mono tabular-nums">
                      ${discountedTotal.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">/ month</span>
                  </div>

                  {discount > 0 && (
                    <div className="mt-2 text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <span>Includes {(discount * 100).toFixed(0)}% multi-video volume discount</span>
                    </div>
                  )}
                </div>

                {/* Scope features bullet list */}
                <div className="space-y-2.5 text-xs text-neutral-300 py-4 border-t border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{volume} full-length edited master deliverables</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      {priorityTurnaround ? '24h Priority SLA Rough Cut' : '48h Standard Rough Cut'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Multi-track sound design & DaVinci film color</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>2 comprehensive revision rounds on Frame.io</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated Slack / Frame.io communication channel</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800">
                <button
                  onClick={handleApplyToBooking}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
                >
                  <span>Apply Scope to Booking Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-neutral-500 text-center mt-2">
                  No commitment required. We finalize custom deliverables on the call.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
