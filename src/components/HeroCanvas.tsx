import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '../config/siteConfig';
import { HeroOverlays } from './HeroOverlays';

interface HeroCanvasProps {
  images: HTMLImageElement[];
  isLoaded: boolean;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ images, isLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // References for animation state
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);
  const isReducedMotionRef = useRef(false);

  // Draw a frame onto the canvas with cover logic & watermark removal
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Fill base background color so no edges or transparent gaps ever show
    ctx.fillStyle = SITE_CONFIG.THEME.tealBase;
    ctx.fillRect(0, 0, cw, ch);

    // Cover logic
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw the image
    ctx.drawImage(img, dx, dy, dw, dh);

    // Watermark patch:
    // Safely cover the watermark area by cloning clean adjacent background
    const patch = SITE_CONFIG.WATERMARK_PATCH;
    if (patch.edgeBlend) {
      const patchX = dx + dw * patch.x;
      const patchY = dy + dh * patch.y;
      const patchW = dw * patch.width;
      const patchH = dh * patch.height;

      const srcX = Math.max(0, img.naturalWidth * (patch.x - 0.08));
      const srcY = img.naturalHeight * patch.y;
      const srcW = img.naturalWidth * patch.width;
      const srcH = img.naturalHeight * patch.height;

      ctx.save();
      ctx.drawImage(img, srcX, srcY, srcW, srcH, patchX, patchY, patchW, patchH);
      ctx.restore();
    }

    lastDrawnFrameRef.current = frameIdx;
  }, [images]);

  // Handle canvas sizing with DPR cap at 2
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const newWidth = Math.round(displayWidth * dpr);
    const newHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      // Redraw current frame immediately on resize
      const frameIdx = Math.min(
        SITE_CONFIG.FRAME_COUNT - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );
      drawFrame(frameIdx);
    }
  }, [drawFrame]);

  // Initial draw & resize listeners
  useEffect(() => {
    isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    resizeCanvas();

    let resizeTimeout: number | undefined;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 50);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [resizeCanvas]);

  // ScrollTrigger and frame scrub loop
  useEffect(() => {
    if (!containerRef.current || !isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Show static final frame 120 (index 119) and skip scrubbing
      targetFrameRef.current = SITE_CONFIG.FRAME_COUNT - 1;
      currentFrameRef.current = SITE_CONFIG.FRAME_COUNT - 1;
      drawFrame(SITE_CONFIG.FRAME_COUNT - 1);
      setScrollProgress(1);
      return;
    }

    // GSAP ScrollTrigger pinning across 500vh
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1,
      onUpdate: (self) => {
        const progress = Math.min(1, Math.max(0, self.progress));
        setScrollProgress(progress);

        // Map 0 -> 1 to frame 0 -> 119
        const target = Math.round(progress * (SITE_CONFIG.FRAME_COUNT - 1));
        targetFrameRef.current = target;
      },
    });

    // RAF loop with Lerp smoothing (current += (target - current) * 0.12)
    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * SITE_CONFIG.LERP;
      } else {
        currentFrameRef.current = target;
      }

      const frameToDraw = Math.min(
        SITE_CONFIG.FRAME_COUNT - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      if (frameToDraw !== lastDrawnFrameRef.current) {
        drawFrame(frameToDraw);
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      trigger.kill();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isLoaded, drawFrame]);

  // Draw initial frame as soon as frames are ready
  useEffect(() => {
    if (images.length > 0 && images[0]?.complete) {
      drawFrame(0);
    }
  }, [images, drawFrame]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#133234]"
      style={{ height: SITE_CONFIG.SCROLL_HEIGHT }}
      id="orange"
      data-section="hero-section"
      aria-label="Interactive 3D Orange Animation"
    >
      {/* Pinned 100vh Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#133234] flex items-center justify-center">
        {/* Fullscreen Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full object-cover touch-none pointer-events-none"
          role="img"
          aria-label="Orange falling, landing, bursting juice droplets and settling into a glass of fresh orange juice"
        />

        {/* Narrative Text Overlays */}
        <HeroOverlays progress={scrollProgress} />

        {/* Vertical Scroll Progress Bar (Right side) */}
        <div
          className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-30 pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-1 h-32 bg-white/10 rounded-full overflow-hidden p-0.5">
            <div
              className="w-full bg-[#FF8A1F] rounded-full transition-all duration-75 ease-out shadow-sm shadow-[#FF8A1F]"
              style={{ height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
            />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#FF8A1F]/80">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </section>
  );
};
