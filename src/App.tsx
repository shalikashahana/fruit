import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { LandingPage } from './pages/LandingPage';
import { OrangePage } from './pages/OrangePage';
import { BlueberryPage } from './pages/BlueberryPage';
import { PomegranatePage } from './pages/PomegranatePage';

export const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/orange" element={<OrangePage />} />
        <Route path="/blueberry" element={<BlueberryPage />} />
        <Route path="/pomegranate" element={<PomegranatePage />} />
        {/* Future fruits will be added here: /apple, /mango, etc. */}
      </Routes>
    </>
  );
};

export default App;
