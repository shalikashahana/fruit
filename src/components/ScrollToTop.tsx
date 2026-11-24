import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Immediately reset window scroll position to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Ensure ScrollTrigger updates properly to the top position
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(t);
  }, [pathname]);

  return null;
};
