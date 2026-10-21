import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ArrowRight, 
  Sliders, 
  TrendingUp, 
  Clock 
} from 'lucide-react';
import { PortfolioProject } from '../types';

interface VideoModalProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
  onBookSimilar: (projectType: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  project,
  isOpen,
  onClose,
  onBookSimilar
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        setIsMuted(true);
        videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
      });
    } else {
      setIsPlaying(false);
    }
  }, [isOpen, project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 1);
  };

  const seek = (timeInSeconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = timeInSeconds;
    setCurrentTime(timeInSeconds);
  };

  const changeSpeed = () => {
    if (!videoRef.current) return;
    const nextSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
    videoRef.current.playbackRate = nextSpeed;
    setPlaybackSpeed(nextSpeed);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const parseTimestampSeconds = (timestamp: string) => {
    const parts = timestamp.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 0;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Container Card */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white border border-neutral-200 shadow-2xl flex flex-col">
        
        {/* Top Bar inside modal */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-neutral-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 shrink-0" />
            <h3 className="text-sm font-bold text-neutral-950 truncate max-w-xs sm:max-w-md">
              {project.title}
            </h3>
            {project.isCustom && (
              <span className="font-sans text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                Original Upload
              </span>
            )}
            <span className="hidden sm:inline font-mono text-[11px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200 shrink-0">
              {project.resolution}
            </span>
            {project.fileSize && (
              <span className="hidden md:inline font-mono text-[11px] text-neutral-500 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-200 shrink-0">
                {project.fileSize}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-950 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className={`relative w-full bg-black group select-none flex items-center justify-center ${
          project.resolution?.toLowerCase().includes('vertical') || project.resolution?.includes('9:16') || project.category === 'paid-ads'
            ? 'aspect-[9/16] max-h-[72vh] max-w-[360px] mx-auto my-4 rounded-2xl overflow-hidden shadow-2xl'
            : 'aspect-video'
        }`}>
          <video
            ref={videoRef}
            src={project.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
            poster={project.image}
            className="w-full h-full object-cover"
            playsInline
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
          />

          {/* Big Play overlay when paused */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-2xl">
                <Play className="w-7 h-7 fill-current translate-x-0.5" />
              </div>
            </div>
          )}

          {/* Player controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-2">
            
            {/* Scrubber */}
            <div
              className="w-full h-1.5 bg-neutral-700 rounded-full cursor-pointer relative overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = (e.clientX - rect.left) / rect.width;
                seek(ratio * duration);
              }}
            >
              <div
                className="h-full bg-emerald-400 transition-all duration-75"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-200">
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="hover:text-white">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button onClick={toggleMute} className="hover:text-white">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button onClick={() => seek(0)} className="hover:text-white">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <span className="font-mono text-[11px] text-neutral-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={changeSpeed}
                  className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/60 hover:bg-black/80 text-white border border-white/20"
                >
                  {playbackSpeed}x SPEED
                </button>

                <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold text-[11px]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{project.retentionMetric}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Project Breakdown & Editor Notes Section on White */}
        <div className="p-6 sm:p-8 bg-white grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Description & Chapter Timeline */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
                Client Case Breakdown · {project.client}
              </div>
              <h4 className="text-xl font-bold text-neutral-950 mb-2">{project.tagline}</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Interactive Chapter Markers */}
            <div>
              <h5 className="text-xs font-semibold text-neutral-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Retention Timeline Chapters (Click to Jump)</span>
              </h5>
              <div className="space-y-1.5">
                {project.keyTimestamps.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => seek(parseTimestampSeconds(ch.time))}
                    className="w-full text-left p-2.5 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors flex items-center justify-between text-xs"
                  >
                    <span className="text-neutral-800 font-medium">{ch.label}</span>
                    <span className="font-mono text-emerald-700 font-semibold">{ch.time}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Editor Notes & CTA */}
          <div className="md:col-span-5 p-5 rounded-xl border border-neutral-200 bg-neutral-50/70 space-y-4">
            <h5 className="text-xs font-bold text-neutral-950 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-600" />
              <span>Lead Editor Directing Notes</span>
            </h5>

            <div className="space-y-3 text-xs text-neutral-700">
              <div>
                <span className="text-neutral-500 block text-[11px]">Hook Psychology:</span>
                <span className="text-neutral-800">{project.editorNotes.hookStrategy}</span>
              </div>

              <div>
                <span className="text-neutral-500 block text-[11px]">Rhythm & BPM:</span>
                <span className="text-neutral-800">{project.editorNotes.pacingBPM}</span>
              </div>

              <div>
                <span className="text-neutral-500 block text-[11px]">Sound Design Foley:</span>
                <span className="text-neutral-800">{project.editorNotes.soundLayers}</span>
              </div>

              <div>
                <span className="text-neutral-500 block text-[11px]">Color Space & LUT:</span>
                <span className="text-emerald-700 font-mono text-[11px] font-semibold">{project.editorNotes.colorProfile}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200">
              <button
                onClick={() => {
                  onClose();
                  onBookSimilar(project.title);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 text-xs font-black uppercase tracking-wider text-white btn-emerald-gradient hover:opacity-95 rounded-full transition-all shadow-md shadow-emerald-500/25 active:scale-[0.98] cursor-pointer"
              >
                <span>Book Similar Video Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
