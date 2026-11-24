import React from 'react';

interface BlueberryOverlaysProps {
  progress: number;
}

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

export const BlueberryOverlays: React.FC<BlueberryOverlaysProps> = ({ progress }) => {
  // Range 1: 0% - 18% (Falling blueberries)
  const style1 = computeBlockStyle(progress, 0.0, 0.02, 0.12, 0.18);

  // Range 2: 24% - 44% (Blueberry impact & split)
  const style2 = computeBlockStyle(progress, 0.22, 0.28, 0.38, 0.45);

  // Range 3: 48% - 70% (Anthocyanin juice burst)
  const style3 = computeBlockStyle(progress, 0.46, 0.52, 0.64, 0.72);

  // Range 4: 74% - 100% (Slices settle + FULL NUTRITION PROFILE REVEAL)
  const style4 = computeBlockStyle(progress, 0.72, 0.78, 0.99, 1.05);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none select-none overflow-hidden max-w-7xl mx-auto px-6 sm:px-12 w-full">
      {/* ── Block 1: 0% - 18% (Falling blueberries) ── */}
      <div
        className="gpu-accel absolute top-28 sm:top-36 left-6 sm:left-12 max-w-md text-left transition-transform duration-75 ease-out"
        style={style1}
      >
        <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#818CF8] font-semibold mb-3 px-3 py-1 rounded-full bg-[#818CF8]/10 border border-[#818CF8]/25 backdrop-blur-xs">
          Phytochemical Deep Dive
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white leading-none mb-4 text-glow">
          Blueberry.
        </h1>
        <p className="text-base sm:text-lg text-indigo-100/80 font-light leading-relaxed max-w-sm">
          The cognitive superberry, dense with nature’s most potent anthocyanins and cellular antioxidants.
        </p>

        {/* Scroll cue mouse indicator */}
        <div className="mt-8 flex items-center gap-3 text-xs tracking-widest uppercase text-[#818CF8]/80">
          <div className="w-5 h-8 rounded-full border-2 border-[#818CF8]/40 flex items-start justify-center p-1">
            <span className="w-1 h-2 bg-[#818CF8] rounded-full animate-bounce" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>

      {/* ── Block 2: 24% - 44% (Blueberry impact & split) ── */}
      <div
        className="gpu-accel absolute top-1/2 -translate-y-1/2 right-6 sm:right-12 max-w-sm text-right transition-transform duration-75 ease-out p-6 rounded-2xl bg-[#1e2328]/80 backdrop-blur-md border border-white/10 shadow-2xl"
        style={style2}
      >
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#A5B4FC] font-medium mb-3">
          <span className="w-2 h-2 rounded-full bg-[#818CF8] animate-ping" />
          <span>Section 01 / The Impact</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight mb-3">
          Concentrated <br />
          <span className="text-[#818CF8]">vitality.</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-4">
          Wild blueberries yield up to{' '}
          <strong className="text-white font-medium border-b border-[#818CF8]/50 pb-0.5">
            twice the antioxidant capacity
          </strong>{' '}
          of cultivated berries, actively crossing the blood-brain barrier.
        </p>
        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-[#A5B4FC]">
          <span>🫐 ORAC: 9,621 µmol</span>
          <span>•</span>
          <span>57 kcal</span>
        </div>
      </div>

      {/* ── Block 3: 48% - 70% (Anthocyanin juice burst) ── */}
      <div
        className="gpu-accel absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 max-w-sm text-left transition-transform duration-75 ease-out p-6 rounded-2xl bg-[#1e2328]/80 backdrop-blur-md border border-white/10 shadow-2xl"
        style={style3}
      >
        <span className="text-xs uppercase tracking-widest text-[#C084FC] font-semibold mb-2 block">
          Section 02 / Pigment Burst
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight mb-3">
          Deep indigo <br />
          <span className="text-[#A5B4FC]">power.</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-4">
          Anthocyanins, pterostilbene, vitamin K, and manganese protect against neuro-oxidative stress.
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <span className="text-[#C084FC] block font-mono text-[10px]">VITAMIN K1</span>
            <span className="font-semibold text-white">19.3 µg (24% DV)</span>
          </div>
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <span className="text-[#818CF8] block font-mono text-[10px]">MANGANESE</span>
            <span className="font-semibold text-white">0.34 mg (17% DV)</span>
          </div>
        </div>
      </div>

      {/* ── Block 4: 74% - 100% (COMPLETE NUTRITION PROFILE ON CANVAS) ── */}
      <div
        id="blueberry-nutrition-reveal"
        className="gpu-accel absolute top-1/2 -translate-y-1/2 right-6 sm:right-10 lg:right-16 max-w-md w-full transition-transform duration-75 ease-out p-6 sm:p-7 rounded-3xl bg-[#1e2328]/90 backdrop-blur-xl border border-[#818CF8]/30 shadow-2xl shadow-black/60"
        style={style4}
      >
        {/* Header tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#818CF8]/20 text-[#A5B4FC] text-xs font-semibold uppercase tracking-wider border border-[#818CF8]/30">
            <span>🫐 Analytical Profile</span>
          </div>
          <span className="text-[11px] font-mono text-white/50">per 100g raw wild</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
          Nutrition Facts
        </h2>
        <p className="text-xs text-gray-300/70 font-light mb-4">
          Standard biochemical assay. Pure botanical pigment & brain-protective flavonoids.
        </p>

        {/* Primary Anthocyanin Highlight Bar */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#818CF8]/20 via-[#6366F1]/15 to-transparent border border-[#818CF8]/40 mb-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A5B4FC] block">
              Primary Phytochemical Powerhouse
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-white leading-none">
              9,621 <span className="text-sm font-normal text-[#A5B4FC]">ORAC µmol</span>
            </span>
            <span className="text-xs text-white/80 block mt-0.5">Anthocyanins & Polyphenols</span>
          </div>
          <div className="w-14 h-14 rounded-full border-4 border-[#818CF8] flex flex-col items-center justify-center bg-black/40">
            <span className="text-sm font-bold text-white leading-none">24%</span>
            <span className="text-[8px] uppercase tracking-wider text-[#A5B4FC]">VIT K</span>
          </div>
        </div>

        {/* 4 Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-3.5">
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Calories</span>
              <span className="text-[10px] text-white/40">3% DV</span>
            </div>
            <span className="text-lg font-bold text-white">57 <span className="text-[11px] font-normal text-white/50">kcal</span></span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#818CF8] rounded-full" style={{ width: '15%' }} />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Dietary Fiber</span>
              <span className="text-[10px] text-white/40">10% DV</span>
            </div>
            <span className="text-lg font-bold text-white">2.4 <span className="text-[11px] font-normal text-white/50">g</span></span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#38BDF8] rounded-full" style={{ width: '24%' }} />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Natural Sugars</span>
              <span className="text-[10px] text-white/40">Low GI</span>
            </div>
            <span className="text-lg font-bold text-white">9.9 <span className="text-[11px] font-normal text-white/50">g</span></span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#C084FC] rounded-full" style={{ width: '35%' }} />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Vitamin C</span>
              <span className="text-[10px] text-white/40">16% DV</span>
            </div>
            <span className="text-lg font-bold text-white">9.7 <span className="text-[11px] font-normal text-white/50">mg</span></span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#34D399] rounded-full" style={{ width: '20%' }} />
            </div>
          </div>
        </div>

        {/* Supporting Bioactives Strip */}
        <div className="py-2 px-3 rounded-xl bg-black/30 border border-white/5 text-[11px] text-gray-300/80 flex items-center justify-between">
          <span>Pterostilbene: <strong className="text-white">Active</strong></span>
          <span className="text-white/20">•</span>
          <span>Manganese: <strong className="text-white">17% DV</strong></span>
          <span className="text-white/20">•</span>
          <span>Water: <strong className="text-white">84%</strong></span>
        </div>
      </div>
    </div>
  );
};

export default BlueberryOverlays;
