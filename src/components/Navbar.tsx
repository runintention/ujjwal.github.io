import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/90 py-3.5 shadow-sm' 
          : 'bg-white/80 backdrop-blur-sm py-5 border-b border-neutral-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-8">
          
          {/* Brand wordmark styled like cliniquegrowth.ca */}
          <a 
            href="#" 
            className="text-lg sm:text-xl font-black tracking-tighter uppercase text-slate-900 hover:text-emerald-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>Vance<span className="text-emerald-500">Editorial.ca</span></span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] lg:text-[12px] font-bold uppercase tracking-widest text-slate-600">
            <a href="#services" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
              Services
            </a>
            <a href="#process" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
              The Method
            </a>
            <a href="#portfolio" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
              Portfolio
            </a>
          </nav>

          {/* Action Button: Scale My Brand */}
          <div className="hidden sm:flex items-center shrink-0">
            <button
              onClick={onOpenBooking}
              className="group inline-flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white btn-emerald-gradient hover:opacity-95 rounded-full transition-all shadow-md shadow-emerald-500/25 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Scale My Brand</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 pb-4 border-t border-neutral-200 bg-white/95 backdrop-blur-xl rounded-2xl p-5 flex flex-col gap-3 shadow-xl animate-in fade-in">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold uppercase tracking-widest text-slate-700 hover:text-slate-950 py-1.5"
            >
              Services
            </a>
            <a 
              href="#process" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold uppercase tracking-widest text-slate-700 hover:text-slate-950 py-1.5"
            >
              The Method
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold uppercase tracking-widest text-slate-700 hover:text-slate-950 py-1.5"
            >
              Portfolio
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider text-white btn-emerald-gradient hover:opacity-95 rounded-full transition-all shadow-md shadow-emerald-500/25 cursor-pointer"
            >
              <span>Scale My Brand</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
