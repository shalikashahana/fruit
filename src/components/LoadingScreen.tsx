import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, isLoaded }) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const timer1 = setTimeout(() => {
        setFadeOut(true);
      }, 350);

      const timer2 = setTimeout(() => {
        setShouldRender(false);
      }, 1000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isLoaded]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#133234] transition-opacity duration-700 pointer-events-none select-none ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-busy={!isLoaded}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6 text-center">
        {/* Subtle orange emblem */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#E5720A] to-[#FFAA4D] flex items-center justify-center shadow-lg shadow-[#FF8A1F]/30 mb-8 animate-pulse">
          <span className="text-2xl">🍊</span>
        </div>

        <h2 className="font-serif text-2xl tracking-wide text-[#FFF4E0] font-normal mb-1">
          FruitWise
        </h2>
        <p className="text-xs tracking-widest uppercase text-[#FF8A1F] font-semibold mb-6">
          The Anatomy of an Orange
        </p>

        {/* Minimal Progress Bar */}
        <div className="w-full bg-[#0d2527] h-1.5 rounded-full overflow-hidden p-0.5 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#FF8A1F] to-[#FFAA4D] rounded-full transition-all duration-200 ease-out shadow-sm shadow-[#FF8A1F]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="mt-3 flex items-center justify-between w-full text-xs text-[#E0D7C5]/70 font-mono">
          <span>Preparing 3D frames</span>
          <span className="text-[#FF8A1F] font-semibold">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
