import React, { useState } from 'react';
import { Calculator, Flame, Shield, Activity, Heart } from 'lucide-react';

export const DailyCalculator: React.FC = () => {
  const [count, setCount] = useState<number>(1);

  // Based on average medium navel orange (approx 131g)
  // Per orange: ~62 kcal, ~70 mg Vit C (78% DV), ~3.1g fiber, ~237 mg potassium (6% DV)
  const calories = count * 62;
  const vitaminC = count * 70;
  const vitaminCDailyPercent = Math.min(400, Math.round((vitaminC / 90) * 100));
  const fiber = (count * 3.1).toFixed(1);
  const fiberDailyPercent = Math.round((parseFloat(fiber) / 28) * 100);
  const potassium = count * 237;

  return (
    <section
      id="calculator"
      className="relative py-32 bg-[#133234] text-[#FFF4E0] border-t border-white/5 scroll-mt-12"
      aria-labelledby="calculator-heading"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A1F]/10 border border-[#FF8A1F]/20 text-xs font-semibold uppercase tracking-wider text-[#FF8A1F] mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Interactive Dosage Tool
          </div>
          <h2
            id="calculator-heading"
            className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF4E0] mb-4"
          >
            Daily Intake Calculator
          </h2>
          <p className="text-base text-[#E0D7C5]/80 font-light leading-relaxed">
            Adjust the slider to simulate your daily citrus intake and observe how essential
            micronutrient percentages calibrate in real-time.
          </p>
        </div>

        {/* Interactive Card */}
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-glow bg-[#0d2527]/90 shadow-2xl relative overflow-hidden">
          {/* Slider Row */}
          <div className="max-w-xl mx-auto text-center mb-12">
            <label htmlFor="orange-slider" className="block text-sm uppercase tracking-widest text-[#E0D7C5]/70 mb-4 font-medium">
              Number of Oranges per Day
            </label>

            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="font-serif text-6xl sm:text-7xl font-bold text-white tracking-tight">
                {count}
              </span>
              <div className="flex gap-1.5 text-3xl">
                {Array.from({ length: count }).map((_, i) => (
                  <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                    🍊
                  </span>
                ))}
              </div>
            </div>

            {/* Custom Styled Range Slider */}
            <div className="relative px-2">
              <input
                id="orange-slider"
                type="range"
                min="1"
                max="4"
                step="1"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-[#133234] rounded-lg appearance-none cursor-pointer accent-[#FF8A1F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A1F]"
                aria-valuemin={1}
                aria-valuemax={4}
                aria-valuenow={count}
                aria-label="Number of oranges slider"
              />
              <div className="flex justify-between text-xs font-mono text-[#E0D7C5]/50 mt-2 px-1">
                <span>1 fruit</span>
                <span>2 fruits</span>
                <span>3 fruits</span>
                <span>4 fruits</span>
              </div>
            </div>
          </div>

          {/* Dynamic Result Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {/* Metric 1: Vitamin C */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-[#E0D7C5]/70">Vitamin C</span>
                <Shield className="w-4 h-4 text-[#FF8A1F]" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-bold text-white">{vitaminC}</span>
                  <span className="text-xs text-[#FFAA4D]">mg</span>
                </div>
                <div className="mt-2 text-xs font-mono text-[#FF8A1F] font-semibold">
                  {vitaminCDailyPercent}% Daily Value
                </div>
              </div>
            </div>

            {/* Metric 2: Calories */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-[#E0D7C5]/70">Energy</span>
                <Flame className="w-4 h-4 text-[#F97316]" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-bold text-white">{calories}</span>
                  <span className="text-xs text-[#FFAA4D]">kcal</span>
                </div>
                <div className="mt-2 text-xs text-[#E0D7C5]/60 font-mono">
                  Clean fruit fructose
                </div>
              </div>
            </div>

            {/* Metric 3: Fiber */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-[#E0D7C5]/70">Dietary Fiber</span>
                <Activity className="w-4 h-4 text-[#38BDF8]" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-bold text-white">{fiber}</span>
                  <span className="text-xs text-[#FFAA4D]">g</span>
                </div>
                <div className="mt-2 text-xs font-mono text-[#38BDF8] font-semibold">
                  {fiberDailyPercent}% Daily Target
                </div>
              </div>
            </div>

            {/* Metric 4: Potassium */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-[#E0D7C5]/70">Potassium</span>
                <Heart className="w-4 h-4 text-[#34D399]" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-bold text-white">{potassium}</span>
                  <span className="text-xs text-[#FFAA4D]">mg</span>
                </div>
                <div className="mt-2 text-xs text-[#34D399] font-mono">
                  Cellular electrolyte support
                </div>
              </div>
            </div>
          </div>

          {/* Context Advisory */}
          <div className="mt-8 text-center text-xs text-[#E0D7C5]/60">
            Based on a standard 2,000-calorie daily reference diet. Actual nutritional requirements may vary.
          </div>
        </div>
      </div>
    </section>
  );
};
