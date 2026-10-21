import React from 'react';
import { TrendingUp, Rocket, Filter, Share2 } from 'lucide-react';
import { PortfolioProject } from '../types';

interface PortfolioShowcaseProps {
  onSelectProject?: (project: PortfolioProject) => void;
  onOpenBooking?: () => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ onOpenBooking }) => {
  return (
    <section 
      id="services" 
      className="mt-10 lg:mt-16 pt-20 pb-10 lg:py-16 px-6 md:px-16 lg:px-16 bg-transparent anchor-section relative"
    >
      {/* Anchor compatibility for any #work links */}
      <div id="work" className="absolute -top-24 left-0 w-0 h-0 pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Heading & Retention Card */}
          <div className="reveal mb-6 lg:mb-0 relative z-30">
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl font-black leading-[0.9] mb-6 text-slate-900 tracking-tighter uppercase md:max-w-lg lg:max-w-none">
              Our Core <br />
              <span className="text-emerald-500">Marketing</span> <br />
              Systems
            </h2>
            <p className="text-slate-900 mb-6 lg:mb-8 text-sm lg:text-base font-bold">
              Disciplined systems for high velocity growth.
            </p>
            <div 
              onClick={onOpenBooking}
              className="reflection-container glass-light p-8 md:max-w-md lg:max-w-none cursor-pointer"
            >
              <div className="text-emerald-700 font-black mb-2 text-base sm:text-lg">
                98% Retention Rate
              </div>
              <p className="text-slate-900 text-xs sm:text-sm font-bold leading-relaxed">
                Predictable, month over month results.
              </p>
            </div>
          </div>

          {/* Right Column: 4 System Grid Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 lg:gap-6 relative z-10">
            {/* Card 1: Paid Ads */}
            <div 
              onClick={onOpenBooking}
              className="reflection-container glass-light p-4 lg:p-8 reveal cursor-pointer" 
              style={{ transitionDelay: '100ms' }}
            >
              <div className="w-10 h-10 lg:w-14 lg:h-14 bg-emerald-500 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-6 shadow-lg shadow-emerald-200">
                <TrendingUp className="text-white w-5 h-5 lg:w-7 lg:h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-sm lg:text-xl font-black mb-1 lg:mb-2 text-slate-900 uppercase tracking-tight">
                Paid Ads
              </h3>
              <p className="text-slate-900 text-[10px] lg:text-sm leading-relaxed font-bold">
                Aggressive ROAS focused strategies.
              </p>
            </div>

            {/* Card 2: Strategy */}
            <div 
              onClick={onOpenBooking}
              className="reflection-container glass-light p-4 lg:p-8 reveal cursor-pointer" 
              style={{ transitionDelay: '200ms' }}
            >
              <div className="w-10 h-10 lg:w-14 lg:h-14 bg-emerald-500 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-6 shadow-lg shadow-emerald-200">
                <Rocket className="text-white w-5 h-5 lg:w-7 lg:h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-sm lg:text-xl font-black mb-1 lg:mb-2 text-slate-900 uppercase tracking-tight">
                Strategy
              </h3>
              <p className="text-slate-900 text-[10px] lg:text-sm leading-relaxed font-bold">
                Data systems built to scale profitably.
              </p>
            </div>

            {/* Card 3: Funnels */}
            <div 
              onClick={onOpenBooking}
              className="reflection-container glass-light p-4 lg:p-8 reveal cursor-pointer" 
              style={{ transitionDelay: '300ms' }}
            >
              <div className="w-10 h-10 lg:w-14 lg:h-14 bg-emerald-500 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-6 shadow-lg shadow-emerald-200">
                <Filter className="text-white w-5 h-5 lg:w-7 lg:h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-sm lg:text-xl font-black mb-1 lg:mb-2 text-slate-900 uppercase tracking-tight">
                Funnels
              </h3>
              <p className="text-slate-900 text-[10px] lg:text-sm leading-relaxed font-bold">
                Consistent lead &amp; sales setup.
              </p>
            </div>

            {/* Card 4: Social */}
            <div 
              onClick={onOpenBooking}
              className="reflection-container glass-light p-4 lg:p-8 reveal cursor-pointer" 
              style={{ transitionDelay: '400ms' }}
            >
              <div className="w-10 h-10 lg:w-14 lg:h-14 bg-emerald-500 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-6 shadow-lg shadow-emerald-200">
                <Share2 className="text-white w-5 h-5 lg:w-7 lg:h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-sm lg:text-xl font-black mb-1 lg:mb-2 text-slate-900 uppercase tracking-tight">
                Social
              </h3>
              <p className="text-slate-900 text-[10px] lg:text-sm leading-relaxed font-bold">
                Communities engineered to buy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
