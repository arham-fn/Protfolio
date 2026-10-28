'use client';

import { useEffect, useRef, useState } from 'react';
import { Z } from '@/lib/tokens';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable if desktop pointer
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    document.documentElement.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, [role="button"], [role="radio"]');
        setIsHovered(!!interactive);
      }
    };

    const handlePointerLeave = () => setIsVisible(false);
    const handlePointerEnter = () => setIsVisible(true);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    document.addEventListener('mouseenter', handlePointerEnter);

    // Smooth trailing ring loop
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('mouseenter', handlePointerEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  return (
    <>
      {/* Chartreuse Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-chartreuse pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: Z.cursor }}
      />

      {/* Hot Pink Morphing Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 rounded-full border border-pink pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          isVisible ? 'opacity-90' : 'opacity-0'
        } ${
          isHovered
            ? 'w-10 h-10 border-2 border-chartreuse bg-pink/15 scale-125'
            : 'w-6 h-6 border-pink'
        }`}
        style={{ zIndex: Z.cursor - 1 }}
      />
    </>
  );
}
