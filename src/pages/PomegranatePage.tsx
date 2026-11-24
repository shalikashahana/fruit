import React from 'react';
import { usePomegranatePreloader } from '../hooks/usePomegranatePreloader';
import { useLenisGsap } from '../hooks/useLenisGsap';
import { Navbar } from '../components/Navbar';
import { PomegranateCanvas } from '../components/PomegranateCanvas';
import { ComingSoonFooter } from '../components/ComingSoonFooter';

export const PomegranatePage: React.FC = () => {
  const { images, progress, isLoaded } = usePomegranatePreloader();
  useLenisGsap();

  return (
    <div className="relative min-h-screen bg-[#8ca88f] text-white font-sans selection:bg-[#E11D48] selection:text-white">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#8ca88f]">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E11D48] to-[#FB7185] flex items-center justify-center mb-6 animate-pulse shadow-2xl shadow-rose-600/40">
            <span className="text-2xl" role="img" aria-label="Pomegranate">💎</span>
          </div>
          <p className="font-serif text-2xl text-white mb-1">FruitWise</p>
          <p className="text-xs uppercase tracking-widest text-[#FB7185] mb-8 font-semibold">
            Loading Pomegranate 3D Experience
          </p>
          <div className="w-56 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E11D48] to-[#FB7185] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-white/90 mt-3 font-mono tabular-nums">
            {progress}%
          </p>
        </div>
      )}

      <Navbar />
      <main>
        <PomegranateCanvas images={images} isLoaded={isLoaded} />
      </main>
      <ComingSoonFooter />
    </div>
  );
};

export default PomegranatePage;
