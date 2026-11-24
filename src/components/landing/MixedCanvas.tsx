import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { LandingOverlays } from './LandingOverlays';

gsap.registerPlugin(ScrollTrigger);

// Watermark patch region in normalized [0..1] coordinates of the 1280×720 frame
const MIXED_WATERMARK = {
  x: 0.885,
  y: 0.795,
  width: 0.058,
  height: 0.070,
  srcOffsetX: -0.065, // sample from left neighbor
};

interface MixedCanvasProps {
  images: HTMLImageElement[];
  isLoaded: boolean;
  scrollHeight?: string;
  lerp?: number;
  onScrollProgress?: (progress: number) => void;
}

export const MixedCanvas: React.FC<MixedCanvasProps> = ({
  images,
  isLoaded,
  scrollHeight = '500vh',
  lerp = 0.1,
  onScrollProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);

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

    ctx.fillStyle = '#073B3A';
    ctx.fillRect(0, 0, cw, ch);

    // Cover fit
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, dx, dy, dw, dh);

    // Patch watermark
    const p = MIXED_WATERMARK;
    const patchX = dx + dw * p.x;
    const patchY = dy + dh * p.y;
    const patchW = dw * p.width;
    const patchH = dh * p.height;
    const srcX = Math.max(0, img.naturalWidth * (p.x + p.srcOffsetX));
    const srcY = img.naturalHeight * p.y;
    const srcW = img.naturalWidth * p.width;
    const srcH = img.naturalHeight * p.height;

    ctx.save();
    ctx.drawImage(img, srcX, srcY, srcW, srcH, patchX, patchY, patchW, patchH);
    ctx.restore();

    lastDrawnFrameRef.current = frameIdx;
  }, [images]);

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
      const idx = Math.min(images.length - 1, Math.max(0, Math.round(currentFrameRef.current)));
      drawFrame(idx);
    }
  }, [drawFrame, images.length]);

  useEffect(() => {
    resizeCanvas();
    let t: number | undefined;
    const onResize = () => { clearTimeout(t); t = window.setTimeout(resizeCanvas, 50); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t); };
  }, [resizeCanvas]);

  useEffect(() => {
    if (!containerRef.current || !isLoaded || images.length === 0) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      drawFrame(images.length - 1);
      setScrollProgress(1);
      return;
    }

    const totalFrames = images.length;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1,
      onUpdate: (self) => {
        const progress = Math.min(1, Math.max(0, self.progress));
        setScrollProgress(progress);
        onScrollProgress?.(progress);
        targetFrameRef.current = Math.round(progress * (totalFrames - 1));
      },
    });

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * lerp;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }
      const frameToDraw = Math.min(totalFrames - 1, Math.max(0, Math.round(currentFrameRef.current)));
      if (frameToDraw !== lastDrawnFrameRef.current) {
        drawFrame(frameToDraw);
      }
      rafIdRef.current = requestAnimationFrame(renderLoop);
    };
    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      trigger.kill();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isLoaded, drawFrame, images.length, lerp, onScrollProgress]);

  useEffect(() => {
    if (images.length > 0 && images[0]?.complete) drawFrame(0);
  }, [images, drawFrame]);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: scrollHeight, background: '#073B3A' }}
      id="fruit-canvas-section"
      aria-label="Multi-fruit animation"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#073B3A] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full touch-none pointer-events-none"
          role="img"
          aria-label="Fruits cluster together then explode into a spectacular arrangement"
        />
        {/* Narrative Text Overlays inside the pinned viewport */}
        <LandingOverlays scrollProgress={scrollProgress} />

        {/* Scroll progress indicator (right side) */}
        <div
          className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-30 pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-1 h-24 bg-white/10 rounded-full overflow-hidden">
            <div
              className="w-full bg-[#FFAA4D] rounded-full transition-all duration-75 ease-out"
              style={{ height: `${Math.min(100, scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
