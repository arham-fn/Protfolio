'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export default function CursorFollower() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only mount on fine pointer devices without reduced motion
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || isReduced) return;

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !ringRef.current || !dotRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(containerRef.current, { opacity: 0 });

      // gsap.quickTo for smooth 0.35s lag on ring
      const xTo = gsap.quickTo(ringRef.current, 'x', {
        duration: 0.35,
        ease: 'power3.out',
      });
      const yTo = gsap.quickTo(ringRef.current, 'y', {
        duration: 0.35,
        ease: 'power3.out',
      });

      let isHoveringInteractive = false;
      let isVisible = false;

      const handlePointerMove = (e: PointerEvent) => {
        if (!isVisible && containerRef.current) {
          isVisible = true;
          gsap.to(containerRef.current, { opacity: 1, duration: 0.2 });
        }

        // Dot has NO lag - direct translate3d
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
        }

        // Ring follows with quickTo
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const handlePointerOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const interactive = target.closest<HTMLElement>(
          'button, a, [role="button"], [data-cursor], input, textarea'
        );

        if (interactive && ringRef.current && labelRef.current && dotRef.current) {
          isHoveringInteractive = true;

          // Determine label
          let labelText = interactive.getAttribute('data-cursor');
          if (!labelText) {
            const tagName = interactive.tagName.toLowerCase();
            const textContent = (interactive.textContent || '').trim().toLowerCase();

            if (tagName === 'a') {
              labelText = 'OPEN';
            } else if (textContent.includes('drag') || interactive.classList.contains('window-titlebar')) {
              labelText = 'DRAG';
            } else if (textContent.includes('seat') || textContent.includes('ram')) {
              labelText = 'SEAT';
            } else if (textContent.includes('power') || textContent.includes('turbo')) {
              labelText = 'SWITCH';
            } else if (interactive.classList.contains('device-slot') || textContent.includes('diagnose')) {
              labelText = 'DIAG';
            } else if (textContent.includes('inspect')) {
              labelText = 'INSPECT';
            } else {
              labelText = 'CLICK';
            }
          }

          labelRef.current.textContent = labelText;

          // Expand ring to 44px
          gsap.to(ringRef.current, {
            width: 44,
            height: 44,
            backgroundColor: '#F2541B',
            borderColor: '#1A1814',
            duration: 0.22,
            ease: 'back.out(1.5)',
            overwrite: 'auto',
          });

          gsap.to(labelRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.15,
            overwrite: 'auto',
          });

          gsap.to(dotRef.current, {
            opacity: 0,
            duration: 0.12,
            overwrite: 'auto',
          });
        }
      };

      const handlePointerOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const interactive = target.closest<HTMLElement>(
          'button, a, [role="button"], [data-cursor], input, textarea'
        );

        if (interactive && ringRef.current && labelRef.current && dotRef.current) {
          isHoveringInteractive = false;

          // Revert ring to 14px
          gsap.to(ringRef.current, {
            width: 14,
            height: 14,
            backgroundColor: 'transparent',
            borderColor: '#F2541B',
            scale: 1,
            duration: 0.2,
            ease: 'power3.out',
            overwrite: 'auto',
          });

          gsap.to(labelRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.1,
            overwrite: 'auto',
          });

          gsap.to(dotRef.current, {
            opacity: 1,
            duration: 0.15,
            overwrite: 'auto',
          });
        }
      };

      const handlePointerDown = () => {
        if (!ringRef.current) return;
        gsap.to(ringRef.current, {
          scale: isHoveringInteractive ? 0.88 : 0.75,
          duration: 0.1,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const handlePointerUp = () => {
        if (!ringRef.current) return;
        gsap.to(ringRef.current, {
          scale: 1,
          duration: 0.2,
          ease: 'elastic.out(1, 0.5)',
          overwrite: 'auto',
        });
      };

      const handleMouseLeave = () => {
        isVisible = false;
        if (containerRef.current) {
          gsap.to(containerRef.current, { opacity: 0, duration: 0.2 });
        }
      };

      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      document.addEventListener('mouseover', handlePointerOver, { passive: true });
      document.addEventListener('mouseout', handlePointerOut, { passive: true });
      window.addEventListener('pointerdown', handlePointerDown);
      window.addEventListener('pointerup', handlePointerUp);
      document.documentElement.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('mouseover', handlePointerOver);
        document.removeEventListener('mouseout', handlePointerOut);
        window.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointerup', handlePointerUp);
        document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="cursor-follower fixed inset-0 pointer-events-none z-[9999] select-none"
    >
      {/* Lag-free 4px Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-primary pointer-events-none will-change-transform"
      />

      {/* GSAP quickTo Smoothed Ring (14px default -> 44px on hover) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-3.5 h-3.5 -ml-[7px] -mt-[7px] rounded-full border-2 border-primary pointer-events-none flex items-center justify-center will-change-transform overflow-hidden shadow-xs"
        style={{ transformOrigin: 'center center' }}
      >
        <span
          ref={labelRef}
          className="font-mono font-bold text-[8px] leading-none uppercase tracking-tighter text-ink opacity-0 pointer-events-none select-none text-center"
        />
      </div>
    </div>
  );
}
