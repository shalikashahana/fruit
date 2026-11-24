import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Shield, HeartPulse, Sparkles, Leaf, CheckCircle2 } from 'lucide-react';

const benefitIcons: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-6 h-6 text-[#FF8A1F]" />,
  HeartPulse: <HeartPulse className="w-6 h-6 text-[#F43F5E]" />,
  Sparkle: <Sparkles className="w-6 h-6 text-[#FBBF24]" />,
  Leaf: <Leaf className="w-6 h-6 text-[#10B981]" />,
};

export const HealthBenefits: React.FC = () => {
  return (
    <section
      id="benefits"
      className="relative py-32 bg-[#133234] text-[#FFF4E0] border-t border-white/5 scroll-mt-12"
      aria-labelledby="benefits-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#FF8A1F] block mb-3">
              Biological Advantages
            </span>
            <h2
              id="benefits-heading"
              className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF4E0]"
            >
              Health Benefits
            </h2>
          </div>
          <p className="text-base text-[#E0D7C5]/80 font-light max-w-md">
            Backed by nutritional science. How the synergy of citrus antioxidants and dietary fibers
            energizes your daily cellular resilience.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SITE_CONFIG.HEALTH_BENEFITS.map((b, idx) => (
            <div
              key={b.title}
              className="group relative p-8 rounded-3xl glass-panel hover:glass-panel-glow transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Background ambient radial glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF8A1F]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF8A1F]/15 transition-all duration-500" />

              <div className="flex items-start justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#FF8A1F]/10 group-hover:border-[#FF8A1F]/30 transition-colors">
                  {benefitIcons[b.icon] || <Sparkles className="w-6 h-6 text-[#FF8A1F]" />}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FFAA4D]">
                    {b.badge}
                  </span>
                  <span className="text-xs font-mono text-white/30">0{idx + 1}</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-[#FFAA4D] transition-colors">
                {b.title}
              </h3>

              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FF8A1F] mb-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active Driver: {b.nutrient}</span>
              </div>

              <p className="text-[#E0D7C5]/90 text-sm sm:text-base font-light leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
