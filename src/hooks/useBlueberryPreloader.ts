import { useState, useEffect, useRef } from 'react';

const FRAME_COUNT = 238;
const framePath = (i: number) =>
  `/blueberry-frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;

interface PreloadState {
  images: HTMLImageElement[];
  progress: number;
  isLoaded: boolean;
  loadedCount: number;
  totalCount: number;
}

export function useBlueberryPreloader() {
  const [state, setState] = useState<PreloadState>({
    images: [],
    progress: 0,
    isLoaded: false,
    loadedCount: 0,
    totalCount: FRAME_COUNT,
  });

  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let isCancelled = false;
    const total = FRAME_COUNT;
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
      img.src = framePath(i);
      imageList[i - 1] = img;

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

export default useBlueberryPreloader;
