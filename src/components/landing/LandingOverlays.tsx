import React from 'react';

interface LandingOverlaysProps {
  scrollProgress: number;
}

// Initial hero block: VISIBLE IMMEDIATELY at progress 0, fades out as user scrolls
function computeHeroStyle(progress: number, fadeStart = 0.14, fadeEnd = 0.24) {
  if (progress <= fadeStart) {
    return {
      opacity: 1,
      transform: 'translate3d(0, 0px, 0)',
      pointerEvents: 'auto' as const,
    };
  }
  if (progress >= fadeEnd) {
    return {
      opacity: 0,
      transform: 'translate3d(0, -36px, 0)',
      pointerEvents: 'none' as const,
    };
  }
  const t = (progress - fadeStart) / (fadeEnd - fadeStart);
  const opacity = 1 - Math.pow(t, 2);
  const translateY = -t * 36;
  return {
    opacity,
    transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
    pointerEvents: opacity > 0.3 ? ('auto' as const) : ('none' as const),
  };
}

// Mid-scroll narrative block: fades in, stays, fades out
function computeStyle(progress: number, start: number, peak0: number, peak1: number, end: number) {
  if (progress < start || progress > end) {
    return { opacity: 0, transform: 'translateY(40px)', pointerEvents: 'none' as const };
  }
  let opacity = 0;
  let translateY = 0;
  if (progress < peak0) {
    const t = (progress - start) / (peak0 - start);
    const e = 1 - Math.pow(1 - t, 2);
    opacity = e;
    translateY = (1 - e) * 36;
  } else if (progress <= peak1) {
    opacity = 1;
    translateY = 0;
  } else {
    const t = (progress - peak1) / (end - peak1);
    const e = Math.pow(t, 2);
    opacity = 1 - e;
    translateY = -e * 36;
  }
  return {
    opacity,
    transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
    pointerEvents: opacity > 0.3 ? ('auto' as const) : ('none' as const),
  };
}

export const LandingOverlays: React.FC<LandingOverlaysProps> = ({ scrollProgress }) => {
  // Block 1: initial hero text (VISIBLE ON LOAD from 0% -> 14%, fades by 24%)
  const style1 = computeHeroStyle(scrollProgress, 0.14, 0.24);
  // Block 2: mid scroll (38%–72%) – shown as fruits separate
  const style2 = computeStyle(scrollProgress, 0.38, 0.46, 0.64, 0.74);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none select-none w-full h-full">
      {/* ── Block 1: Hero text (VISIBLE IMMEDIATELY on page load) ── */}
      <div
        className="absolute top-24 sm:top-32 left-6 sm:left-12 lg:left-16 max-w-lg gpu-accel"
        style={style1}
      >
        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-widest text-emerald-200 mb-5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>FruitWise</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none mb-5 drop-shadow-md">
          Discover the
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-lime-200 to-yellow-200">
            Nature of Every
          </span>
          <span className="block">Fruit.</span>
        </h1>

        <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-sm mb-8 drop-shadow">
          Explore the nutrients, vitamins, minerals, and natural goodness hidden inside your favorite fruits.
        </p>

        {/* Scroll cue */}
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-white/60">
          <div className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
            <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>

      {/* ── Block 2: mid scroll text (fruits separating) ── */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-6 sm:right-12 lg:right-16 max-w-sm text-right gpu-accel p-6 rounded-2xl bg-[#073B3A]/75 backdrop-blur-md border border-white/15 shadow-2xl"
        style={style2}
      >
        <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold block mb-2">
          A World of Flavors
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white leading-tight mb-3">
          Every fruit tells
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400"> a story.</span>
        </h2>
        <p className="text-sm text-white/80 font-light leading-relaxed">
          From tropical mangoes to Himalayan amla — each one carries a unique biochemical signature
          designed by nature for your wellbeing.
        </p>
      </div>
    </div>
  );
};
