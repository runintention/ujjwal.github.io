import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  color: string;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates tracking for smooth cursor glow
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovering: false,
    };

    const colors = [
      '#10b981', // emerald
      '#059669', // rich emerald
      '#064e3b', // deep forest green
      '#34d399', // mint
      '#0f172a', // dark slate
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      // Calculate dot density based on screen dimensions
      const count = Math.min(85, Math.floor((width * height) / 16000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.42,
          vy: (Math.random() - 0.5) * 0.42,
          size: Math.random() * 2.2 + 1.6, // crisp dots
          baseAlpha: Math.random() * 0.35 + 0.35, // 0.35 - 0.70 opacity
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    handleResize();

    // Mouse tracking for cursor glow
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor glow interpolation
      if (mouse.isHovering) {
        if (mouse.x < 0) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.18;
          mouse.y += (mouse.targetY - mouse.y) * 0.18;
        }
      }

      // Update cursor glow element position
      if (cursorRef.current && mouse.isHovering) {
        cursorRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
        cursorRef.current.style.opacity = '1';
      } else if (cursorRef.current && !mouse.isHovering) {
        cursorRef.current.style.opacity = '0';
      }

      // Update and draw particles - they swim around freely without running away from pointer!
      const count = particles.length;
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // Natural continuous swimming movement (independent of mouse)
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around canvas boundaries smoothly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw connections between nearby swimming dots
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 95;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.14;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw the dot
        ctx.save();
        ctx.globalAlpha = p.baseAlpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Background canvas with freely swimming dots */}
      <canvas
        id="particle-canvas"
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ background: '#ffffff' }}
      />

      {/* Clean, vibrant emerald cursor glow - noticeable and luminous without being dark */}
      <div
        id="cursor-glow"
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[1] will-change-transform"
        style={{
          width: '440px',
          height: '440px',
          background:
            'radial-gradient(circle, rgba(16, 185, 129, 0.32) 0%, rgba(52, 211, 153, 0.18) 32%, rgba(16, 185, 129, 0.06) 58%, transparent 72%)',
          borderRadius: '50%',
          opacity: 0,
          transition: 'opacity 0.25s ease-out',
        }}
      />
    </>
  );
};
