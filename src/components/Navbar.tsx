import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Collection', href: '#fruit-canvas-section' },
    { label: 'Orange', href: '#orange' },
    { label: 'Blueberry', href: '#blueberry' },
    { label: 'Pomegranate', href: '#pomegranate' },
    { label: 'Nutrition', href: '#nutrition-reveal' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (href === '#nutrition-reveal') {
      const orangeSec = document.getElementById('orange');
      if (orangeSec) {
        // Scroll to the nutrition reveal range (around 85% into orange animation)
        const targetTop = orangeSec.offsetTop + orangeSec.offsetHeight * 0.85;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
        return;
      }
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#133234]/85 backdrop-blur-md border-b border-white/10 shadow-md shadow-black/20 py-3.5'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A1F] rounded-lg p-1"
            aria-label="Back to FruitWise home"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E5720A] to-[#FFAA4D] flex items-center justify-center shadow-md shadow-[#FF8A1F]/30 group-hover:scale-105 transition-transform duration-200">
              <span className="text-sm">🍊</span>
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#FFF4E0] group-hover:text-[#FFAA4D] transition-colors">
              Fruit<span className="text-[#FF8A1F]">Wise</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="text-sm font-medium text-[#FFF4E0]/80 hover:text-[#FFAA4D] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A1F] rounded px-2 py-1"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#nutrition-reveal"
              onClick={(e) => handleScrollTo(e, '#nutrition-reveal')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-[#FF8A1F] hover:bg-[#FFAA4D] text-[#0d2527] px-4 py-2 rounded-full transition-all duration-200 shadow-md shadow-[#FF8A1F]/20 hover:shadow-lg hover:shadow-[#FF8A1F]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Nutrition Facts</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="md:hidden text-[#FFF4E0] hover:text-[#FF8A1F] p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A1F] rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-30 bg-[#0d2527]/98 backdrop-blur-2xl flex flex-col justify-center px-8 transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="flex flex-col gap-6 text-center" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="font-serif text-3xl text-[#FFF4E0] hover:text-[#FF8A1F] transition-colors py-2"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-6 border-t border-white/10 mt-4">
            <a
              href="#calculator"
              onClick={(e) => handleScrollTo(e, '#calculator')}
              className="inline-block w-full py-4 bg-[#FF8A1F] text-[#0d2527] font-semibold text-lg rounded-xl shadow-lg shadow-[#FF8A1F]/30"
            >
              Calculate Your Intake
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};
