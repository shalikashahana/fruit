import { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

interface PreloadState {
  images: HTMLImageElement[];
  progress: number;
  isLoaded: boolean;
  loadedCount: number;
  totalCount: number;
}

export function useImagePreloader() {
  const [state, setState] = useState<PreloadState>({
    images: [],
    progress: 0,
    isLoaded: false,
    loadedCount: 0,
    totalCount: SITE_CONFIG.FRAME_COUNT,
  });

  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let isCancelled = false;
    const total = SITE_CONFIG.FRAME_COUNT;
    const imageList: HTMLImageElement[] = new Array(total);
    let loadedCount = 0;

    const onImageLoaded = () => {
      if (isCancelled) return;
      loadedCount++;
      const progressPercent = Math.min(100, Math.round((loadedCount / total) * 100));

      setState((prev) => ({
        ...prev,
        loadedCount,
        progress: progressPercent,
        isLoaded: loadedCount === total,
        images: imageList,
      }));
    };

    // Preload each frame
    for (let i = 1; i <= total; i++) {
      const img = new Image();
      img.src = SITE_CONFIG.FRAME_PATH(i);
      imageList[i - 1] = img;

      // Use decode() where supported for GPU memory preparation
      if ('decode' in img && typeof img.decode === 'function') {
        img
          .decode()
          .then(onImageLoaded)
          .catch(() => {
            img.onload = onImageLoaded;
            img.onerror = onImageLoaded;
          });
      } else {
        img.onload = onImageLoaded;
        img.onerror = onImageLoaded;
      }
    }

    imagesRef.current = imageList;

    return () => {
      isCancelled = true;
    };
  }, []);

  return state;
}
