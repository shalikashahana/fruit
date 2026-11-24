import React from 'react';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { useLenisGsap } from '../hooks/useLenisGsap';
import { LoadingScreen } from '../components/LoadingScreen';
import { Navbar } from '../components/Navbar';
import { HeroCanvas } from '../components/HeroCanvas';
import { ComingSoonFooter } from '../components/ComingSoonFooter';

export const OrangePage: React.FC = () => {
  const { images, progress, isLoaded } = useImagePreloader();
  useLenisGsap();

  return (
    <div className="relative min-h-screen bg-[#133234] text-[#FFF4E0] font-sans selection:bg-[#FF8A1F] selection:text-white">
      <LoadingScreen progress={progress} isLoaded={isLoaded} />
      <Navbar />
      <main>
        <HeroCanvas images={images} isLoaded={isLoaded} />
      </main>
      <ComingSoonFooter />
    </div>
  );
};

export default OrangePage;
