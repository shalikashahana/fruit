import React from 'react';

interface PomegranateOverlaysProps {
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

export const PomegranateOverlays: React.FC<PomegranateOverlaysProps> = ({ progress }) => {
  // Range 1: 0% - 18% (Falling whole pomegranate)
  const style1 = computeBlockStyle(progress, 0.0, 0.02, 0.12, 0.18);

  // Range 2: 24% - 44% (Cracking open & impact)
  const style2 = computeBlockStyle(progress, 0.22, 0.28, 0.38, 0.45);

  // Range 3: 48% - 70% (Ruby arils burst in slow-mo)
  const style3 = computeBlockStyle(progress, 0.46, 0.52, 0.64, 0.72);

  // Range 4: 74% - 100% (Settled arils + FULL NUTRITION PROFILE REVEAL)
  const style4 = computeBlockStyle(progress, 0.72, 0.78, 0.99, 1.05);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none select-none overflow-hidden max-w-7xl mx-auto px-6 sm:px-12 w-full">
      {/* ── Block 1: 0% - 18% (Falling pomegranate) ── */}
      <div
        className="gpu-accel absolute top-28 sm:top-36 left-6 sm:left-12 max-w-md text-left transition-transform duration-75 ease-out"
        style={style1}
      >
        <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#FB7185] font-semibold mb-3 px-3 py-1 rounded-full bg-[#E11D48]/15 border border-[#FB7185]/30 backdrop-blur-xs">
          Phytochemical Deep Dive
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white leading-none mb-4 text-glow">
          Pomegranate.
        </h1>
        <p className="text-base sm:text-lg text-rose-100/90 font-light leading-relaxed max-w-sm drop-shadow">
          Nature's ruby jewel, dense with clinical punicalagins, cellular antioxidants, and heart-protective bioactives.
        </p>

        {/* Scroll cue mouse indicator */}
        <div className="mt-8 flex items-center gap-3 text-xs tracking-widest uppercase text-[#FB7185]/90">
          <div className="w-5 h-8 rounded-full border-2 border-[#FB7185]/50 flex items-start justify-center p-1">
            <span className="w-1 h-2 bg-[#FB7185] rounded-full animate-bounce" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>

      {/* ── Block 2: 24% - 44% (Cracking open: Unmatched Antioxidant Density) ── */}
      <div
        className="gpu-accel absolute top-1/2 -translate-y-1/2 right-6 sm:right-12 max-w-sm text-right transition-transform duration-75 ease-out p-6 rounded-2xl bg-[#1f2d24]/85 backdrop-blur-md border border-white/10 shadow-2xl"
        style={style2}
      >
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FDA4AF] font-medium mb-3">
          <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-ping" />
          <span>Section 01 / The Fracture</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight mb-3">
          Unmatched <br />
          <span className="text-[#FB7185]">density.</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed mb-4">
          Punicalagins in pomegranates provide{' '}
          <strong className="text-white font-medium border-b border-[#FB7185]/50 pb-0.5">
            3x the antioxidant activity
          </strong>{' '}
          of green tea and red wine combined.
        </p>
        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-[#FDA4AF]">
          <span>💎 Punicalagin Rich</span>
          <span>•</span>
          <span>83 kcal</span>
        </div>
      </div>

      {/* ── Block 3: 48% - 70% (Ruby arils burst in slow-mo) ── */}
      <div
        className="gpu-accel absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 max-w-sm text-left transition-transform duration-75 ease-out p-6 rounded-2xl bg-[#1f2d24]/85 backdrop-blur-md border border-white/10 shadow-2xl"
        style={style3}
      >
        <span className="text-xs uppercase tracking-widest text-[#FDA4AF] font-semibold mb-2 block">
          Section 02 / Ruby Explosion
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight mb-3">
          Aril <br />
          <span className="text-[#FB7185]">brilliance.</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed mb-4">
          Each ruby jewel encapsulates punicic acid (rare Omega-5), dietary fiber, vitamin K, and potassium.
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <span className="text-[#FB7185] block font-mono text-[10px]">DIETARY FIBER</span>
            <span className="font-semibold text-white">4.0 g (14% DV)</span>
          </div>
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <span className="text-[#34D399] block font-mono text-[10px]">POTASSIUM</span>
            <span className="font-semibold text-white">236 mg (5% DV)</span>
          </div>
        </div>
      </div>

      {/* ── Block 4: 74% - 100% (COMPLETE NUTRITION PROFILE ON CANVAS) ── */}
      <div
        id="pomegranate-nutrition-reveal"
        className="gpu-accel absolute top-1/2 -translate-y-1/2 right-6 sm:right-10 lg:right-16 max-w-md w-full transition-transform duration-75 ease-out p-6 sm:p-7 rounded-3xl bg-[#1a2b1f]/90 backdrop-blur-xl border border-[#FB7185]/35 shadow-2xl shadow-black/60"
        style={style4}
      >
        {/* Header tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E11D48]/20 text-[#FDA4AF] text-xs font-semibold uppercase tracking-wider border border-[#FB7185]/30">
            <span>💎 Analytical Profile</span>
          </div>
          <span className="text-[11px] font-mono text-white/60">per 100g raw arils</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
          Nutrition Facts
        </h2>
        <p className="text-xs text-gray-300/80 font-light mb-4">
          Standard biochemical assay. Pure ellagitannins, punicic acid, and cardiovascular flavonoids.
        </p>

        {/* Primary Punicalagin Highlight Bar */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#E11D48]/25 via-[#BE123C]/20 to-transparent border border-[#FB7185]/40 mb-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FDA4AF] block">
              Primary Phytochemical Powerhouse
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-white leading-none">
              Punicalagins <span className="text-sm font-normal text-[#FDA4AF]">& Punicic Acid</span>
            </span>
            <span className="text-xs text-white/80 block mt-0.5">3x Antioxidant Capacity of Green Tea</span>
          </div>
          <div className="w-14 h-14 rounded-full border-4 border-[#FB7185] flex flex-col items-center justify-center bg-black/40">
            <span className="text-sm font-bold text-white leading-none">14%</span>
            <span className="text-[8px] uppercase tracking-wider text-[#FDA4AF]">FIBER</span>
          </div>
        </div>

        {/* 4 Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-3.5">
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Calories</span>
              <span className="text-[10px] text-white/40">4% DV</span>
            </div>
            <span className="text-lg font-bold text-white">83 <span className="text-[11px] font-normal text-white/50">kcal</span></span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#FB7185] rounded-full" style={{ width: '20%' }} />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Dietary Fiber</span>
              <span className="text-[10px] text-white/40">14% DV</span>
            </div>
            <span className="text-lg font-bold text-white">4.0 <span className="text-[11px] font-normal text-white/50">g</span></span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#34D399] rounded-full" style={{ width: '38%' }} />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Vitamin K1</span>
              <span className="text-[10px] text-white/40">14% DV</span>
            </div>
            <span className="text-lg font-bold text-white">16.4 <span className="text-[11px] font-normal text-white/50">µg</span></span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#38BDF8] rounded-full" style={{ width: '32%' }} />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Vitamin C</span>
              <span className="text-[10px] text-white/40">11% DV</span>
            </div>
            <span className="text-lg font-bold text-white">10.2 <span className="text-[11px] font-normal text-white/50">mg</span></span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '25%' }} />
            </div>
          </div>
        </div>

        {/* Supporting Bioactives Strip */}
        <div className="py-2 px-3 rounded-xl bg-black/30 border border-white/5 text-[11px] text-gray-200/80 flex items-center justify-between">
          <span>Potassium: <strong className="text-white">236 mg</strong> (5% DV)</span>
          <span className="text-white/20">•</span>
          <span>Folate: <strong className="text-white">38 µg</strong> (10% DV)</span>
          <span className="text-white/20">•</span>
          <span>Water: <strong className="text-white">78%</strong></span>
        </div>
      </div>
    </div>
  );
};

export default PomegranateOverlays;
