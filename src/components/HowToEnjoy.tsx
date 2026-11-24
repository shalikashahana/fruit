import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Check, Info, Sparkles } from 'lucide-react';

export const HowToEnjoy: React.FC = () => {
  return (
    <section
      id="enjoy"
      className="relative py-32 bg-[#0d2527] text-[#FFF4E0] border-t border-white/5 scroll-mt-12"
      aria-labelledby="enjoy-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#FF8A1F] block mb-3">
            Culinary Preparation
          </span>
          <h2
            id="enjoy-heading"
            className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFF4E0] mb-4"
          >
            How to Enjoy
          </h2>
          <p className="text-base sm:text-lg text-[#E0D7C5]/80 font-light leading-relaxed">
            Every layer of the citrus fruit offers distinct bioavailability. Choose the method
            that fits your dietary goals.
          </p>
        </div>

        {/* Honest Note Callout */}
        <div className="max-w-2xl mx-auto mb-16 p-4 rounded-2xl bg-[#133234]/80 border border-[#FF8A1F]/30 flex items-center gap-3.5 text-sm text-[#E0D7C5]">
          <div className="p-2 rounded-xl bg-[#FF8A1F]/20 text-[#FF8A1F] flex-shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <p>
            <strong className="text-white font-medium">Honest Nutrition Note:</strong>{' '}
            Whole oranges give significantly more dietary fiber than juice, moderating natural fruit sugars and extending sustained fullness.
          </p>
        </div>

        {/* 3 Enjoyment Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SITE_CONFIG.ENJOY_METHODS.map((method) => (
            <div
              key={method.title}
              className={`relative p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                method.recommended
                  ? 'glass-panel-glow border-[#FF8A1F]/40 bg-[#133234]'
                  : 'glass-panel'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FFAA4D] px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    {method.tag}
                  </span>
                  {method.recommended && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase text-[#0d2527] bg-[#FF8A1F] px-2.5 py-0.5 rounded-full shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      Nutritionist Choice
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl font-bold text-white mb-1">
                  {method.title}
                </h3>
                <span className="text-xs uppercase tracking-widest text-[#E0D7C5]/60 block mb-4">
                  {method.subtitle}
                </span>

                <p className="text-sm text-[#E0D7C5]/90 font-light leading-relaxed mb-6">
                  {method.description}
                </p>

                <ul className="space-y-2.5 mb-6">
                  {method.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-xs text-[#E0D7C5]">
                      <Check className="w-3.5 h-3.5 text-[#FF8A1F] flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {method.note && (
                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-[#FFAA4D]/90 italic">
                  * {method.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
