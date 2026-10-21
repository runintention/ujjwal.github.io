import React, { useRef, useEffect, useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { 
  Sparkles, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Play
} from 'lucide-react';
import { PortfolioProject } from '../types';
import { getCustomProjects } from '../utils/videoStorage';

interface PortfolioSectionProps {
  onSelectProject?: (project: PortfolioProject) => void;
  onOpenBooking?: () => void;
}

interface PortfolioVideoItemProps {
  project: PortfolioProject;
  isMuted: boolean;
  onToggleMute: () => void;
  onSelectProject?: (project: PortfolioProject) => void;
}

// Individual Auto-Playing Video Item with mobile autoplay, touch controls & coordinated audio
const PortfolioVideoItem: React.FC<PortfolioVideoItemProps> = ({ 
  project, 
  isMuted, 
  onToggleMute 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Detect whether the video is vertical (9:16) from metadata or resolution tag
  const [isVertical, setIsVertical] = useState<boolean>(() => {
    return Boolean(
      project.resolution?.toLowerCase().includes('vertical') || 
      project.resolution?.includes('9:16') ||
      project.category === 'paid-ads'
    );
  });

  // Ensure defaultMuted is set for mobile Safari / Chrome autoplay requirements
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = isMuted;
    }
  }, []);

  // Play automatically when scrolled into view, pause when out of view
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              // Ensure muted fallback for strict mobile browser autoplay policy
              video.muted = true;
              video.play().then(() => {
                setIsPlaying(true);
              }).catch(() => {
                setIsPlaying(false);
              });
            });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.1 // Mobile-friendly threshold for smooth touch scrolling
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Coordinated muting: whenever isMuted changes, update underlying video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.videoWidth && video.videoHeight) {
      setIsVertical(video.videoHeight > video.videoWidth);
    }
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`group relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-neutral-950 border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-500 ${
        isVertical 
          ? 'w-full max-w-[280px] sm:max-w-[340px] aspect-[9/16] mx-auto' 
          : 'w-full aspect-video'
      }`}
    >
      <div 
        onClick={handleTogglePlay}
        className={`relative w-full h-full overflow-hidden bg-black flex items-center justify-center cursor-pointer ${
          isVertical ? 'aspect-[9/16]' : 'aspect-video'
        }`}
      >
        <video
          ref={videoRef}
          src={project.videoUrl}
          poster={project.image}
          muted={isMuted}
          autoPlay
          loop
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover"
        />

        {/* Mobile touch play indicator when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none transition-opacity">
            <div className="w-14 h-14 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <Play className="w-6 h-6 fill-current translate-x-0.5 text-slate-900" />
            </div>
          </div>
        )}

        {/* Small Speaker Unmute & Restart Video Controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMute();
            }}
            title={isMuted ? "Unmute video" : "Mute video"}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all border border-white/20 hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${
              !isMuted 
                ? 'bg-emerald-500 text-white border-emerald-400' 
                : 'bg-black/65 hover:bg-black/90 text-white'
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </button>

          <button
            type="button"
            onClick={handleRestart}
            title="Restart video"
            aria-label="Restart video"
            className="w-9 h-9 rounded-full bg-black/65 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            <RotateCcw className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const TestimonialsMetrics: React.FC<PortfolioSectionProps> = ({ 
  onSelectProject,
  onOpenBooking 
}) => {
  // Coordinated unmuted video ID
  const [unmutedVideoId, setUnmutedVideoId] = useState<string | null>(null);

  // Stored portfolio videos (defaults to PORTFOLIO_PROJECTS so mobile NEVER shows empty!)
  const [projects, setProjects] = useState<PortfolioProject[]>(PORTFOLIO_PROJECTS);

  // Load custom videos from IndexedDB on component mount
  useEffect(() => {
    let isMounted = true;

    async function loadStoredVideos() {
      try {
        const stored = await getCustomProjects();
        if (isMounted) {
          if (stored.length > 0) {
            setProjects(stored);
          } else {
            setProjects(PORTFOLIO_PROJECTS);
          }
        }
      } catch (err) {
        console.warn('Could not load custom videos:', err);
        if (isMounted) {
          setProjects(PORTFOLIO_PROJECTS);
        }
      }
    }

    loadStoredVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleMute = (projectId: string) => {
    setUnmutedVideoId((currentId) => (currentId === projectId ? null : projectId));
  };

  return (
    <section 
      id="portfolio" 
      className="py-20 lg:py-32 border-t border-neutral-200/80 bg-white/50 backdrop-blur-[2px] anchor-section relative"
    >
      {/* Anchor compatibility for any #reviews links */}
      <div id="reviews" className="absolute -top-24 left-0 w-0 h-0 pointer-events-none" aria-hidden="true" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with scroll-reveal */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 scroll-reveal">
          <p className="font-black tracking-widest text-emerald-800 uppercase text-[10px] sm:text-[11px] mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Featured Work · High-Velocity Video Systems</span>
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase heading-serif mb-4 [text-wrap:balance]">
            Our <span className="font-normal italic text-gradient">Portfolio</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-semibold max-w-xl mx-auto leading-relaxed">
            High-retention edits, viral short-form hooks, and conversion-engineered video campaigns for industry-leading brands and practices.
          </p>
        </div>

        {/* Alternating List Pattern: 1st video left / text right, 2nd video right / text left */}
        <div className="space-y-20 sm:space-y-28 lg:space-y-36">
          {projects.map((project, index) => {
            const isVideoLeft = index % 2 === 0;
            const isMuted = unmutedVideoId !== project.id;

            // Video Column Component
            const VideoElement = (
              <div 
                className={`w-full flex items-center justify-center ${
                  isVideoLeft ? 'lg:order-1' : 'order-1 lg:order-2'
                }`}
              >
                <PortfolioVideoItem 
                  project={project} 
                  isMuted={isMuted}
                  onToggleMute={() => handleToggleMute(project.id)}
                  onSelectProject={onSelectProject}
                />
              </div>
            );

            // Text/Details Column Component
            const TextElement = (
              <div 
                className={`w-full flex flex-col justify-center ${
                  isVideoLeft ? 'lg:order-2' : 'order-2 lg:order-1'
                }`}
              >
                {/* Main Heading */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-[1.2] mb-3">
                  {project.title}
                </h3>

                {/* Deep Description */}
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                  {project.description}
                </p>
              </div>
            );

            return (
              <div 
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center scroll-reveal"
              >
                {VideoElement}
                {TextElement}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner inside Portfolio Compartment with scroll-reveal */}
        <div className="mt-20 sm:mt-28 reflection-container glass-light p-8 sm:p-12 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-200/90 shadow-lg scroll-reveal">
          <div className="text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase heading-serif mb-2">
              Ready To Engineer Your Video Pipeline?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-xl">
              We take raw footage and convert it into high-retention assets that drive quantifiable views, engagement, and client bookings.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-black uppercase tracking-wider text-white btn-emerald-gradient rounded-full transition-all shadow-md shadow-emerald-500/25 active:scale-[0.98] shrink-0 cursor-pointer"
          >
            <span>Scale My Brand</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
