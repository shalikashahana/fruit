import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ComingSoonFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-[#0d2527] text-[#FFF4E0] border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#E0D7C5]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#E5720A] to-[#FFAA4D] flex items-center justify-center shadow-md shadow-[#FF8A1F]/30">
              <span className="text-xs">🍊</span>
            </div>
            <span className="font-serif text-lg font-bold text-white">
              Fruit<span className="text-[#FF8A1F]">Wise</span>
            </span>
            <span className="ml-2 font-mono text-[11px]">© 2026. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-emerald-400 text-[#FFAA4D] font-medium transition-colors"
            >
              Back to Top ↑
            </button>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
            >
              Collection
            </a>
          </div>

          <p className="text-center md:text-right text-[11px] text-[#FFAA4D]/80 max-w-sm">
            <strong className="text-white">Medical Disclaimer:</strong> General information only, not medical advice. Consult a certified nutritionist or physician for personal dietary regimens.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ComingSoonFooter;
