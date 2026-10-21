import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { SimpleProcess } from './components/SimpleProcess';
import { TestimonialsMetrics } from './components/TestimonialsMetrics';
import { BookingSystem } from './components/BookingSystem';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { ParticleBackground } from './components/ParticleBackground';
import { PortfolioProject } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // cliniquegrowth.ca smooth fade-in and slide-up effect on scroll
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.scroll-reveal, .reveal').forEach((el) => {
        el.classList.add('is-revealed', 'active');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed', 'active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const observeAll = () => {
      document.querySelectorAll('.scroll-reveal:not(.is-revealed), .reveal:not(.active)').forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll();

    // Observe dynamic DOM additions (e.g. adding custom videos)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const handleOpenBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    window.dispatchEvent(new CustomEvent('open-audit-modal'));
  };

  const handleViewPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProject = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-800 relative">
      {/* Exact particle-canvas dots & cursor-glow from cliniquegrowth.ca */}
      <ParticleBackground />

      {/* Clean Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content with subtle translucent sections so bubbles drift through */}
      <main className="flex-grow relative z-10">
        {/* 1. Hero */}
        <Hero 
          onOpenBooking={handleOpenBooking}
          onViewPortfolio={handleViewPortfolio}
        />

        {/* 2. Services Showcase ("Our Core Marketing Systems") */}
        <PortfolioShowcase 
          onSelectProject={handleSelectProject}
          onOpenBooking={handleOpenBooking}
        />

        {/* 3. The Method ("The Method") */}
        <SimpleProcess onOpenBooking={handleOpenBooking} />

        {/* 4. Portfolio Section */}
        <TestimonialsMetrics 
          onSelectProject={handleSelectProject}
          onOpenBooking={handleOpenBooking}
        />

        {/* 5. Project Inquiry Form & Audit Modal */}
        <BookingSystem />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Video Modal Player */}
      <VideoModal
        project={selectedProject}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onBookSimilar={() => {
          setIsVideoModalOpen(false);
          handleOpenBooking();
        }}
      />
    </div>
  );
}
