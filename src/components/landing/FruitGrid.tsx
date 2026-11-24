import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Fruit grid data — only Orange is interactive
const FRUITS = [
  { emoji: '🍊', name: 'Orange', color: '#FF8A1F', interactive: true, path: '/orange', size: 'large', description: 'Vitamin C Powerhouse' },
  { emoji: '🍎', name: 'Apple', color: '#EF4444', interactive: false, path: null, size: 'medium', description: 'Polyphenol Rich' },
  { emoji: '🍌', name: 'Banana', color: '#EAB308', interactive: false, path: null, size: 'medium', description: 'Potassium Source' },
  { emoji: '🍍', name: 'Pineapple', color: '#F59E0B', interactive: false, path: null, size: 'medium', description: 'Bromelain & Manganese' },
  { emoji: '🍉', name: 'Watermelon', color: '#10B981', interactive: false, path: null, size: 'large', description: 'Lycopene & Hydration' },
  { emoji: '🥭', name: 'Mango', color: '#FBBF24', interactive: false, path: null, size: 'medium', description: 'Vitamin A & Beta-Carotene' },
  { emoji: '🍇', name: 'Grapes', color: '#8B5CF6', interactive: false, path: null, size: 'small', description: 'Resveratrol Antioxidants' },
  { emoji: '🍓', name: 'Strawberry', color: '#F43F5E', interactive: false, path: null, size: 'small', description: 'Anthocyanins & C' },
  { emoji: '🫐', name: 'Blueberry', color: '#6366F1', interactive: false, path: null, size: 'small', description: 'Cognitive Superberry' },
  { emoji: '🥝', name: 'Kiwi', color: '#84CC16', interactive: false, path: null, size: 'small', description: 'Vitamin C & K' },
  { emoji: '🍋', name: 'Lemon', color: '#FDE047', interactive: false, path: null, size: 'small', description: 'Citric Acid & D-Limonene' },
  { emoji: '🍐', name: 'Pear', color: '#BEF264', interactive: false, path: null, size: 'medium', description: 'Fiber & Quercetin' },
];

export const FruitGrid: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredOrange, setHoveredOrange] = useState(false);

  return (
    <section
      id="all-fruits"
      className="relative py-28 bg-[#073B3A]"
      aria-labelledby="fruit-grid-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#073B3A] via-[#0a4a48] to-[#073B3A] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 block mb-3">
            The Collection
          </span>
          <h2
            id="fruit-grid-heading"
            className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Choose Your Fruit
          </h2>
          <p className="text-white/60 text-base font-light max-w-xl mx-auto leading-relaxed">
            Each fruit carries a universe of nutrition. Click <strong className="text-[#FF8A1F] font-semibold">Orange</strong> to explore
            a fully interactive 3D nutrition experience. More fruits coming soon.
          </p>
        </div>

        {/* Fruit Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {FRUITS.map((fruit) => (
            <div
              key={fruit.name}
              onClick={fruit.interactive ? () => navigate(fruit.path!) : undefined}
              onMouseEnter={fruit.name === 'Orange' ? () => setHoveredOrange(true) : undefined}
              onMouseLeave={fruit.name === 'Orange' ? () => setHoveredOrange(false) : undefined}
              className={`
                relative group flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-300
                ${fruit.interactive
                  ? 'cursor-pointer border-[#FF8A1F]/40 bg-[#FF8A1F]/10 hover:bg-[#FF8A1F]/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FF8A1F]/25 hover:border-[#FF8A1F]/80'
                  : 'cursor-default border-white/8 bg-white/5 opacity-75'
                }
              `}
              role={fruit.interactive ? 'button' : 'presentation'}
              tabIndex={fruit.interactive ? 0 : -1}
              onKeyDown={fruit.interactive ? (e) => { if (e.key === 'Enter') navigate(fruit.path!); } : undefined}
              aria-label={fruit.interactive ? `Explore ${fruit.name} nutrition` : `${fruit.name} — coming soon`}
            >
              {/* Emoji */}
              <div
                className="text-5xl mb-3 transition-all duration-300"
                style={{
                  transform: fruit.name === 'Orange' && hoveredOrange ? 'scale(1.15) rotate(-5deg)' : 'scale(1)',
                  filter: fruit.name === 'Orange' && hoveredOrange
                    ? 'drop-shadow(0 0 16px rgba(255, 138, 31, 0.6))'
                    : 'none',
                }}
              >
                {fruit.emoji}
              </div>

              {/* Name */}
              <span
                className="font-semibold text-sm mb-1 transition-colors"
                style={{ color: fruit.interactive ? fruit.color : '#fff' }}
              >
                {fruit.name}
              </span>

              {/* Description */}
              <span className="text-[11px] text-white/50 font-light leading-tight">
                {fruit.description}
              </span>

              {/* Interactive badge */}
              {fruit.interactive && (
                <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF8A1F] text-[#073B3A] text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1 h-1 rounded-full bg-[#073B3A]" />
                  Explore
                </div>
              )}

              {/* Coming soon badge for other fruits */}
              {!fruit.interactive && (
                <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/40 text-[10px] font-medium uppercase tracking-wider">
                  Soon
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
