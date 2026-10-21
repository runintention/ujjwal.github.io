import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onViewPortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onViewPortfolio }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden bg-transparent">
      {/* Subtle background ambient warmth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-50/80 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Hero Container styled like cliniquegrowth.ca */}
        <div className="text-center max-w-3xl mx-auto scroll-reveal">
          <p className="font-black tracking-widest text-emerald-800 uppercase text-[10px] sm:text-[11px] mb-4">
            Ottawa & Toronto Post-Production Partner · High-Velocity Video Systems
          </p>

          {/* Headline combining Plus Jakarta Sans 900 + Playfair Display serif with cliniquegrowth.ca text-gradient */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.08] mb-6 [text-wrap:balance]">
            I edit videos that hook viewers & <span className="heading-serif font-normal italic text-gradient">grow your business.</span>
          </h1>

          {/* Subheading container & font matching cliniquegrowth.ca */}
          <div className="glass-light p-6 lg:p-8 rounded-[2rem] max-w-3xl md:max-w-lg lg:max-w-3xl mx-auto mb-8 lg:mb-10 shadow-sm">
            <p className="text-black text-base lg:text-xl leading-relaxed font-black readable-desc">
              We transform raw footage into high-retention videos with clean cuts that keep your audience hooked. Our editing style ensures your content dominates algorithms and drives real growth.
            </p>
          </div>

          {/* Action Buttons styled like cliniquegrowth.ca */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white btn-emerald-gradient hover:opacity-95 rounded-full transition-all shadow-lg shadow-emerald-500/25 active:scale-[0.98] cursor-pointer"
            >
              <span>Scale My Brand</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onViewPortfolio}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-black hover:bg-slate-800 rounded-full transition-all shadow-md cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-emerald-400" />
              <span>Our Portfolio</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
