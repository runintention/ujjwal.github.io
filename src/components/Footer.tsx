import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200/80 bg-white/80 backdrop-blur-md text-slate-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-200">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-base font-black tracking-tighter uppercase text-slate-900">
              Vance<span className="text-emerald-500">Editorial.ca</span>
            </span>
            <span className="text-slate-400 ml-2 text-[11px] font-bold uppercase tracking-widest">
              · Video Growth Authority
            </span>
          </div>

          {/* Links matching main site */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-600">
            <a href="#services" className="hover:text-slate-950 transition-colors">Services</a>
            <a href="#process" className="hover:text-slate-950 transition-colors">The Method</a>
            <a href="#portfolio" className="hover:text-slate-950 transition-colors">Portfolio</a>
            <button 
              onClick={onOpenBooking} 
              className="text-emerald-600 hover:text-emerald-700 font-black uppercase tracking-wider cursor-pointer"
            >
              Scale My Brand
            </button>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} Vance Editorial. High-velocity video editing for creators, clinics, and growth brands.
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="mailto:inquiries@vance-editorial.com"
              className="hover:text-slate-900 flex items-center gap-1 transition-colors font-semibold"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>inquiries@vance-editorial.com</span>
            </a>
            <button
              onClick={scrollToTop}
              className="hover:text-slate-900 flex items-center gap-1 transition-colors font-semibold cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
