import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#073B3A]/90 backdrop-blur-md border-b border-white/10 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-lime-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-sm">🍃</span>
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
              Fruit<span className="text-emerald-400">Wise</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {['Fruits', 'Nutrition', 'Benefits'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium text-white/70 hover:text-emerald-300 transition-colors"
              >
                {item}
              </a>
            ))}
            <button
              type="button"
              onClick={() => navigate('/orange')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-[#FF8A1F] hover:bg-[#FFAA4D] text-[#073B3A] px-4 py-2 rounded-full transition-all duration-200 shadow-lg shadow-[#FF8A1F]/20 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              🍊 Explore Orange
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-white/80 hover:text-white p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-[#073B3A]/98 backdrop-blur-2xl flex flex-col justify-center items-center gap-8 transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {['Fruits', 'Nutrition', 'Benefits'].map((item) => (
          <a key={item} href="#" className="font-serif text-3xl text-white/80 hover:text-emerald-300 transition-colors">
            {item}
          </a>
        ))}
        <button
          type="button"
          onClick={() => { navigate('/orange'); setMobileOpen(false); }}
          className="mt-4 w-56 py-4 rounded-xl bg-[#FF8A1F] text-[#073B3A] font-bold text-lg shadow-xl shadow-[#FF8A1F]/30"
        >
          🍊 Explore Orange
        </button>
      </div>
    </>
  );
};
