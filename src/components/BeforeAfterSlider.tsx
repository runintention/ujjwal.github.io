import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Volume2, VolumeX, Eye, Sparkles, Layers, Activity } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [audioMode, setAudioMode] = useState<'mastered' | 'raw'>('mastered');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'grade' | 'audio' | 'pacing'>('grade');
  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play realistic simulated preview audio tone / ambience depending on mode
  const playSampleAudio = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      setIsPlayingAudio(true);

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (audioMode === 'mastered') {
        // Rich warm cinematic chord / whoosh
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      } else {
        // Raw thin tinny camera mic beep with hiss
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);

      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 1200);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <section id="comparison" className="py-24 border-t border-neutral-800/80 bg-[#07080b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            <span>Color & Sound Lab</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Split-Screen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Raw Log Camera Footage vs. Vance Master Polish.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-3">
            Drag the divider to compare raw flat cinema camera log profiles against our custom DaVinci Resolve color transformation, multi-track audio mastering, and graphic pacing.
          </p>

          {/* Inspection Mode Tabs */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('grade')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'grade'
                  ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>Color Grading & Contrast</span>
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'audio'
                  ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>24-bit Audio Design</span>
            </button>
            <button
              onClick={() => setActiveTab('pacing')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'pacing'
                  ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Retention Micro-Cuts</span>
            </button>
          </div>
        </div>

        {/* Interactive Split-Screen Draggable Viewer */}
        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
          
          <div
            ref={containerRef}
            className="relative aspect-video w-full select-none cursor-ew-resize overflow-hidden"
            onMouseDown={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* BACKGROUND: Finished Master Grade Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="/src/assets/images/portfolio_hero_showreel_1792097289174.jpg"
                alt="Finished Master Grade"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* After label */}
              <div className="absolute top-4 right-4 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-3 py-1 rounded backdrop-blur-md">
                MASTER GRADE & 4K POLISH
              </div>
            </div>

            {/* FOREGROUND: Flat Raw Log Image (Clipped by slider position) */}
            <div
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full min-w-[700px] sm:min-w-[900px] md:min-w-[1024px]">
                {/* Desaturated flat log look applied via CSS filters */}
                <img
                  src="/src/assets/images/portfolio_hero_showreel_1792097289174.jpg"
                  alt="Raw Flat Camera Log"
                  className="w-full h-full object-cover filter saturate-[0.25] brightness-[1.25] contrast-[0.72]"
                  referrerPolicy="no-referrer"
                />
                {/* Before label */}
                <div className="absolute top-4 left-4 bg-neutral-900/80 border border-neutral-700 text-neutral-300 text-xs font-medium px-3 py-1 rounded backdrop-blur-md">
                  RAW LOG FOOTAGE (UNEDITED)
                </div>
              </div>
            </div>

            {/* Draggable Divider Handle Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(255,255,255,0.7)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-lg pointer-events-none">
                <Sliders className="w-4 h-4 rotate-90" />
              </div>
            </div>

            {/* Bottom info helper */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-neutral-700 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Drag slider left or right to inspect</span>
            </div>

          </div>

          {/* Studio Audio & Spec Control Toolbar */}
          <div className="p-6 bg-neutral-900/90 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Audio mastering switch */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAudioMode('raw')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    audioMode === 'raw' 
                      ? 'bg-neutral-800 text-neutral-200 border border-neutral-700' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Raw Camera Mic
                </button>
                <button
                  onClick={() => setAudioMode('mastered')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    audioMode === 'mastered' 
                      ? 'bg-emerald-400 text-neutral-950 shadow-sm' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Mastered 24-bit Audio
                </button>
              </div>

              <button
                onClick={playSampleAudio}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                    <span>Auditioning...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Test Audio Stem</span>
                  </>
                )}
              </button>
            </div>

            {/* Technical metrics comparison */}
            <div className="flex items-center gap-6 text-xs text-neutral-400 font-mono">
              <div>
                <span className="text-neutral-500">Color Pipeline:</span>{' '}
                <span className="text-emerald-400 font-semibold">ACEScct / Kodak 2383</span>
              </div>
              <div className="hidden md:block">
                <span className="text-neutral-500">Dynamic Range:</span>{' '}
                <span className="text-white">14.8 Stops Restored</span>
              </div>
              <div>
                <span className="text-neutral-500">Sound RMS:</span>{' '}
                <span className="text-cyan-400 font-semibold">-14 LUFS Broadcast</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
