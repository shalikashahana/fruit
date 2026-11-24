import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMixedFramePreloader } from '../hooks/useMixedFramePreloader';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { useBlueberryPreloader } from '../hooks/useBlueberryPreloader';
import { usePomegranatePreloader } from '../hooks/usePomegranatePreloader';
import { useLenisGsap } from '../hooks/useLenisGsap';
import { Navbar } from '../components/Navbar';
import { MixedCanvas } from '../components/landing/MixedCanvas';
import { HeroCanvas } from '../components/HeroCanvas';
import { BlueberryCanvas } from '../components/BlueberryCanvas';
import { PomegranateCanvas } from '../components/PomegranateCanvas';
import { ComingSoonFooter } from '../components/ComingSoonFooter';

const FRAME_COUNT = 120;
const framePath = (i: number) =>
  `/mixed-frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;

export const LandingPage: React.FC = () => {
  // Preload all four image sequences concurrently for seamless 60fps scrubbing
  const { images: mixedImages, progress: mixedProgress, isLoaded: isMixedLoaded } =
    useMixedFramePreloader(FRAME_COUNT, framePath);
  const { images: orangeImages, progress: orangeProgress, isLoaded: isOrangeLoaded } =
    useImagePreloader();
  const { images: blueberryImages, progress: blueberryProgress, isLoaded: isBlueberryLoaded } =
    useBlueberryPreloader();
  const { images: pomegranateImages, progress: pomegranateProgress, isLoaded: isPomegranateLoaded } =
    usePomegranatePreloader();

  useLenisGsap();

  const isReady = isMixedLoaded && isOrangeLoaded && isBlueberryLoaded && isPomegranateLoaded;
  const overallProgress = Math.round(
    (mixedProgress + orangeProgress + blueberryProgress + pomegranateProgress) / 4
  );

  // Recalibrate GSAP ScrollTrigger when all sequences are loaded
  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  return (
    <div
      className="relative min-h-screen text-white font-sans selection:bg-[#FF8A1F] selection:text-white"
      style={{ background: '#073B3A' }}
    >
      {/* ── Loading Screen ── */}
      {!isReady && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#073B3A]"
          aria-live="polite"
          aria-label="Loading fruit experience"
        >
          {/* Logo pulse */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 via-[#FF8A1F] to-[#FB7185] flex items-center justify-center mb-6 animate-pulse shadow-2xl shadow-emerald-500/40">
            <span className="text-2xl" role="img" aria-label="Fruits">🍃</span>
          </div>

          <p className="font-serif text-2xl text-white mb-1 tracking-tight">FruitWise</p>
          <p className="text-xs uppercase tracking-widest text-emerald-400 mb-8 font-semibold">
            Preparing The 3D Fruit Collection
          </p>

          {/* Progress bar */}
          <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-[#FF8A1F] to-[#FB7185] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-xs text-emerald-400/70 mt-3 font-mono tabular-nums">
            {overallProgress}%
          </p>
        </div>
      )}

      {/* ── Seamless Continuous 3D Experience ── */}
      <div
        className="transition-opacity duration-700"
        style={{ opacity: isReady ? 1 : 0 }}
        aria-hidden={!isReady}
      >
        {/* Navigation */}
        <Navbar />

        {/* ── 1. Multi-Fruit Collection & Explosion Canvas (500vh) ── */}
        <MixedCanvas
          images={mixedImages}
          isLoaded={isMixedLoaded}
          scrollHeight="500vh"
          lerp={0.1}
        />

        {/* ── 2. Continuous Orange 3D Animation & Nutrition (500vh) ── */}
        <main id="orange-experience" className="relative">
          <HeroCanvas images={orangeImages} isLoaded={isOrangeLoaded} />
        </main>

        {/* ── 3. Continuous Blueberry 3D Animation & Nutrition (500vh) ── */}
        <section id="blueberry-experience" className="relative">
          <BlueberryCanvas images={blueberryImages} isLoaded={isBlueberryLoaded} />
        </section>

        {/* ── 4. Continuous Pomegranate 3D Animation & Nutrition (500vh) ── */}
        <section id="pomegranate-experience" className="relative">
          <PomegranateCanvas images={pomegranateImages} isLoaded={isPomegranateLoaded} />
        </section>

        {/* ── 5. Clean Minimal Footer ── */}
        <ComingSoonFooter />
      </div>
    </div>
  );
};

export default LandingPage;
