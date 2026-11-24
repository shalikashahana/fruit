import React from 'react';
import { useBlueberryPreloader } from '../hooks/useBlueberryPreloader';
import { useLenisGsap } from '../hooks/useLenisGsap';
import { Navbar } from '../components/Navbar';
import { BlueberryCanvas } from '../components/BlueberryCanvas';
import { ComingSoonFooter } from '../components/ComingSoonFooter';

export const BlueberryPage: React.FC = () => {
  const { images, progress, isLoaded } = useBlueberryPreloader();
  useLenisGsap();

  return (
    <div className="relative min-h-screen bg-[#252b2b] text-white font-sans selection:bg-[#818CF8] selection:text-white">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#252b2b]">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#818CF8] to-[#C084FC] flex items-center justify-center mb-6 animate-pulse shadow-2xl shadow-indigo-500/40">
            <span className="text-2xl" role="img" aria-label="Blueberry">🫐</span>
          </div>
          <p className="font-serif text-2xl text-white mb-1">FruitWise</p>
          <p className="text-xs uppercase tracking-widest text-[#818CF8] mb-8 font-semibold">
            Loading Blueberry 3D Experience
          </p>
          <div className="w-56 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#818CF8] to-[#C084FC] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[#818CF8]/80 mt-3 font-mono tabular-nums">
            {progress}%
          </p>
        </div>
      )}

      <Navbar />
      <main>
        <BlueberryCanvas images={images} isLoaded={isLoaded} />
      </main>
      <ComingSoonFooter />
    </div>
  );
};

export default BlueberryPage;
