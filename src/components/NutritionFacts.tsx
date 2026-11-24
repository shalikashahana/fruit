import React, { useEffect, useRef, useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Flame, ShieldCheck, Activity, Sparkles, Zap, Heart, Dna, Target } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Flame: <Flame className="w-5 h-5 text-[#FF8A1F]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#FFAA4D]" />,
  Activity: <Activity className="w-5 h-5 text-[#38BDF8]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#F472B6]" />,
  Zap: <Zap className="w-5 h-5 text-[#FBBF24]" />,
  Heart: <Heart className="w-5 h-5 text-[#34D399]" />,
  Dna: <Dna className="w-5 h-5 text-[#A78BFA]" />,
  Target: <Target className="w-5 h-5 text-[#60A5FA]" />,
};

export const NutritionFacts: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="nutrition"
      ref={sectionRef}
      className="relative py-32 bg-[#0d2527] text-[#FFF4E0] border-t border-white/5 scroll-mt-12"
      aria-labelledby="nutrition-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#FF8A1F] block mb-3">
            Analytical Profile
          </span>
          <h2
            id="nutrition-heading"
            className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF4E0] mb-4"
          >
            Nutrition Facts
          </h2>
          <p className="text-base sm:text-lg text-[#E0D7C5]/80 font-light leading-relaxed">
            Standard laboratory values measured per 100 grams of fresh raw navel orange.
            Zero artificial additives, purely elemental nourishment.
          </p>
        </div>

        {/* Highlight Feature: Vitamin C Hero Card */}
        <div className="mb-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#133234]/90 to-[#1e4d50]/60 border border-[#FF8A1F]/30 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A1F]/20 text-[#FFAA4D] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Primary Phytochemical Powerhouse
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
              53 mg Vitamin C
            </h3>
            <p className="text-[#E0D7C5] text-sm sm:text-base font-light leading-relaxed">
              Consuming just one medium orange (approx. 130–150g) delivers over 100% of the recommended daily intake,
              neutralizing free radicals and supporting natural collagen synthesis.
            </p>
          </div>

          {/* Big Circular Progress */}
          <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-white/10"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-[#FF8A1F] transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray="264"
                strokeDashoffset={isVisible ? `${264 - (264 * 59) / 100}` : '264'}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold font-mono text-white">59%</span>
              <span className="text-[10px] tracking-wider uppercase text-[#FFAA4D]/80">Daily Value</span>
            </div>
          </div>
        </div>

        {/* 8 Glassmorphism Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONFIG.NUTRITION_PER_100G.map((item, idx) => {
            return (
              <div
                key={item.label}
                className="group relative p-6 rounded-2xl glass-panel hover:glass-panel-glow transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                style={{
                  transitionDelay: `${idx * 60}ms`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#FF8A1F]/10 transition-colors">
                      {iconMap[item.icon] || <Sparkles className="w-5 h-5 text-[#FF8A1F]" />}
                    </div>
                    <span className="text-xs font-mono font-medium text-[#E0D7C5]/60">
                      {item.dailyPercent > 0 ? `${item.dailyPercent}% DV` : '—'}
                    </span>
                  </div>

                  <span className="text-xs uppercase tracking-wider text-[#E0D7C5]/70 block mb-1">
                    {item.label}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold font-mono text-white tracking-tight">
                      {item.value}
                    </span>
                    <span className="text-sm font-medium text-[#FFAA4D]">{item.unit}</span>
                  </div>
                </div>

                {/* Micro progress bar */}
                <div className="mt-5 pt-4 border-t border-white/5">
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        backgroundColor: item.color,
                        width: isVisible ? `${Math.min(100, Math.max(8, item.dailyPercent * 1.5))}%` : '0%',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
