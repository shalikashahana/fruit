import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { PomegranateOverlays } from './PomegranateOverlays';

gsap.registerPlugin(ScrollTrigger);

interface PomegranateCanvasProps {
  images: HTMLImageElement[];
  isLoaded: boolean;
  scrollHeight?: string;
  lerp?: number;
}

export const PomegranateCanvas: React.FC<PomegranateCanvasProps> = ({
  images,
  isLoaded,
  scrollHeight = '500vh',
  lerp = 0.1,
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

    // Fill sage green studio background
    ctx.fillStyle = '#8ca88f';
    ctx.fillRect(0, 0, cw, ch);

    // Cover logic
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, dx, dy, dw, dh);

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
    const onResize = () => {
      clearTimeout(t);
      t = window.setTimeout(resizeCanvas, 50);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
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
  }, [isLoaded, drawFrame, images.length, lerp]);

  useEffect(() => {
    if (images.length > 0 && images[0]?.complete) {
      drawFrame(0);
    }
  }, [images, drawFrame]);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: scrollHeight, background: '#8ca88f' }}
      id="pomegranate"
      data-section="pomegranate-section"
      aria-label="Interactive 3D Pomegranate Animation"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#8ca88f] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full object-cover touch-none pointer-events-none"
          role="img"
          aria-label="Pomegranate falling, cracking open, bursting ruby arils and settling into jewel-like segments"
        />

        {/* Narrative & Nutrition Text Overlays */}
        <PomegranateOverlays progress={scrollProgress} />

        {/* Vertical Scroll Progress Bar (Right side) */}
        <div
          className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-30 pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-1 h-32 bg-white/20 rounded-full overflow-hidden p-0.5">
            <div
              className="w-full bg-[#FB7185] rounded-full transition-all duration-75 ease-out shadow-sm shadow-[#FB7185]"
              style={{ height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
            />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#FB7185]">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </section>
  );
};

export default PomegranateCanvas;
