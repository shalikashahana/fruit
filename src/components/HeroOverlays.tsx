import React from 'react';

interface HeroOverlaysProps {
  progress: number;
}

// Compute smooth opacity & translateY for a given scroll window [start, peakStart, peakEnd, end]
function computeBlockStyle(
  progress: number,
  start: number,
  peakStart: number,
  peakEnd: number,
  end: number
) {
  if (progress < start || progress > end) {
    return { opacity: 0, transform: 'translateY(36px)', pointerEvents: 'none' as const };
  }

  let opacity = 0;
  let translateY = 0;

  if (start === 0 && progress <= peakStart) {
    opacity = 1;
    translateY = 0;
  } else if (progress < peakStart) {
    const t = (progress - start) / (peakStart - start);
    const eased = 1 - Math.pow(1 - t, 2);
    opacity = eased;
    translateY = (1 - eased) * 36;
  } else if (progress <= peakEnd) {
    opacity = 1;
    translateY = 0;
  } else {
    const t = (progress - peakEnd) / (end - peakEnd);
    const eased = Math.pow(t, 2);
    opacity = 1 - eased;
    translateY = -eased * 36;
  }

  return {
    opacity,
    transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
    pointerEvents: opacity > 0.3 ? ('auto' as const) : ('none' as const),
  };
}

export const HeroOverlays: React.FC<HeroOverlaysProps> = ({ progress }) => {
  // Range 1: 0% - 18% (Falling whole orange)
  const style1 = computeBlockStyle(progress, 0.0, 0.02, 0.12, 0.18);

  // Range 2: 24% - 44% (Orange splits open)
  const style2 = computeBlockStyle(progress, 0.22, 0.28, 0.38, 0.45);

  // Range 3: 48% - 70% (Juice splash & burst)
  const style3 = computeBlockStyle(progress, 0.46, 0.52, 0.64, 0.72);

  // Range 4: 74% - 100% (Glass of juice + FULL NUTRITION PROFILE REVEAL)
  const style4 = computeBlockStyle(progress, 0.72, 0.78, 0.99, 1.05);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none select-none overflow-hidden max-w-7xl mx-auto px-6 sm:px-12 w-full">
      {/* ── Block 1: 0% - 18% (Falling orange) ── */}
      <div
        className="gpu-accel absolute top-28 sm:top-36 left-6 sm:left-12 max-w-md text-left transition-transform duration-75 ease-out"
        style={style1}
      >
        <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#FF8A1F] font-semibold mb-3 px-3 py-1 rounded-full bg-[#FF8A1F]/10 border border-[#FF8A1F]/20 backdrop-blur-xs">
          Fruit Nutrition Guide
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#FFF4E0] leading-none mb-4 text-glow">
          Orange.
        </h1>
        <p className="text-base sm:text-lg text-[#E0D7C5] font-light leading-relaxed max-w-sm">
          Nature’s vitamin C, perfectly packed in a sun-ripened sphere of pure vitality.
        </p>

        {/* Scroll cue mouse indicator */}
        <div className="mt-8 flex items-center gap-3 text-xs tracking-widest uppercase text-[#FF8A1F]/80">
          <div className="w-5 h-8 rounded-full border-2 border-[#FF8A1F]/40 flex items-start justify-center p-1">
            <span className="w-1 h-2 bg-[#FF8A1F] rounded-full animate-bounce" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>

      {/* ── Block 2: 24% - 44% (Orange splits open: Peel back facts) ── */}
      <div
        className="gpu-accel absolute top-1/2 -translate-y-1/2 right-6 sm:right-12 max-w-sm text-right transition-transform duration-75 ease-out p-6 rounded-2xl bg-[#133234]/75 backdrop-blur-md border border-white/10 shadow-2xl"
        style={style2}
      >
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FFAA4D] font-medium mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF8A1F] animate-ping" />
          <span>Section 01 / Unveiling</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#FFF4E0] leading-tight mb-3">
          Peel back <br />
          <span className="text-[#FF8A1F]">the facts.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#E0D7C5] font-light leading-relaxed mb-4">
          One medium orange delivers over{' '}
          <strong className="text-white font-medium border-b border-[#FF8A1F]/50 pb-0.5">
            100% of your daily vitamin C
          </strong>
          , neutralizing free radicals and protecting cellular DNA.
        </p>
        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-lg bg-black/30 border border-white/10 text-xs text-[#FFAA4D]">
          <span>⚡ 53 mg Vitamin C</span>
          <span>•</span>
          <span>47 kcal</span>
        </div>
      </div>

      {/* ── Block 3: 48% - 70% (Juice splash & burst) ── */}
      <div
        className="gpu-accel absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 max-w-sm text-left transition-transform duration-75 ease-out p-6 rounded-2xl bg-[#133234]/75 backdrop-blur-md border border-white/10 shadow-2xl"
        style={style3}
      >
        <span className="text-xs uppercase tracking-widest text-[#38BDF8] font-semibold mb-2 block">
          Section 02 / The Splash
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#FFF4E0] leading-tight mb-3">
          Burst with <br />
          <span className="text-[#FFAA4D]">goodness.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#E0D7C5] font-light leading-relaxed mb-4">
          Fiber, potassium, folate and bioactive citrus bioflavonoids in every refreshing, juicy droplet.
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
          <div className="p-2 rounded bg-black/30 border border-white/5">
            <span className="text-[#38BDF8] block font-mono text-[10px]">POTASSIUM</span>
            <span className="font-semibold text-white">181 mg</span>
          </div>
          <div className="p-2 rounded bg-black/30 border border-white/5">
            <span className="text-[#FFAA4D] block font-mono text-[10px]">FOLATE</span>
            <span className="font-semibold text-white">30 µg</span>
          </div>
        </div>
      </div>

      {/* ── Block 4: 74% - 100% (COMPLETE NUTRITION PROFILE ON CANVAS) ── */}
      <div
        id="nutrition-reveal"
        className="gpu-accel absolute top-1/2 -translate-y-1/2 right-6 sm:right-10 lg:right-16 max-w-md w-full transition-transform duration-75 ease-out p-6 sm:p-7 rounded-3xl bg-[#133234]/85 backdrop-blur-xl border border-[#FF8A1F]/30 shadow-2xl shadow-black/50"
        style={style4}
      >
        {/* Header tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A1F]/20 text-[#FFAA4D] text-xs font-semibold uppercase tracking-wider border border-[#FF8A1F]/30">
            <span>🍊 Analytical Profile</span>
          </div>
          <span className="text-[11px] font-mono text-white/50">per 100g raw navel</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FFF4E0] mb-1">
          Nutrition Facts
        </h2>
        <p className="text-xs text-[#E0D7C5]/70 font-light mb-4">
          Standard laboratory values. Zero artificial additives, pure elemental nourishment.
        </p>

        {/* Primary Vitamin C Highlight Bar */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FF8A1F]/20 via-[#FF8A1F]/10 to-transparent border border-[#FF8A1F]/40 mb-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFAA4D] block">
              Primary Phytochemical Powerhouse
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-white leading-none">
              53 <span className="text-sm font-normal text-[#FFAA4D]">mg</span>
            </span>
            <span className="text-xs text-white/80 block mt-0.5">Vitamin C (Ascorbic Acid)</span>
          </div>
          <div className="w-14 h-14 rounded-full border-4 border-[#FF8A1F] flex flex-col items-center justify-center bg-black/40">
            <span className="text-sm font-bold text-white leading-none">59%</span>
            <span className="text-[8px] uppercase tracking-wider text-[#FFAA4D]">DV</span>
          </div>
        </div>

        {/* 4 Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-3.5">
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Calories</span>
              <span className="text-[10px] text-white/40">2% DV</span>
            </div>
            <span className="text-lg font-bold text-white">47 <span className="text-[11px] font-normal text-white/50">kcal</span></span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#FF8A1F] rounded-full" style={{ width: '12%' }} />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Dietary Fiber</span>
              <span className="text-[10px] text-white/40">9% DV</span>
            </div>
            <span className="text-lg font-bold text-white">2.4 <span className="text-[11px] font-normal text-white/50">g</span></span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#38BDF8] rounded-full" style={{ width: '28%' }} />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Natural Sugars</span>
              <span className="text-[10px] text-white/40">19% DV</span>
            </div>
            <span className="text-lg font-bold text-white">9.4 <span className="text-[11px] font-normal text-white/50">g</span></span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#EC4899] rounded-full" style={{ width: '45%' }} />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Potassium</span>
              <span className="text-[10px] text-white/40">5% DV</span>
            </div>
            <span className="text-lg font-bold text-white">181 <span className="text-[11px] font-normal text-white/50">mg</span></span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#10B981] rounded-full" style={{ width: '22%' }} />
            </div>
          </div>
        </div>

        {/* Supporting Bioactives Strip */}
        <div className="py-2 px-3 rounded-xl bg-black/30 border border-white/5 text-[11px] text-[#E0D7C5]/80 flex items-center justify-between">
          <span>Folate: <strong className="text-white">30 µg</strong> (8% DV)</span>
          <span className="text-white/20">•</span>
          <span>Calcium: <strong className="text-white">40 mg</strong> (4% DV)</span>
          <span className="text-white/20">•</span>
          <span>Water: <strong className="text-white">87%</strong></span>
        </div>
      </div>
    </div>
  );
};

export default HeroOverlays;
