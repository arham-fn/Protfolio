'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Returns a normalized 0→1 scroll progress value.
 * Updated via Lenis scroll callback or fallback scroll listener.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      setProgress(0);
      return;
    }
    setProgress(Math.min(1, Math.max(0, scrollTop / docHeight)));
  }, []);

  useEffect(() => {
    // Initial measurement
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return progress;
}
