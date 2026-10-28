'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { Z } from '@/lib/tokens';

interface GlitchTransitionProps {
  onComplete: () => void;
}

/**
 * 300ms RGB-split glitch transition between boot and main site.
 *
 * Visual breakdown:
 *   0–80ms    Three color layers offset horizontally (pink +6px, chartreuse -6px)
 *   80–180ms  Rapid opacity flicker across all layers
 *   180–260ms Layers converge back to center
 *   260–300ms Brief scale snap (1.02→1) + fade out
 *
 * On reduced motion: instant crossfade (caller handles by skipping boot entirely,
 * but if somehow mounted, this does a simple 200ms opacity fade).
 */
export default function GlitchTransition({
  onComplete,
}: GlitchTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reduced motion → simple fade and exit
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) {
      gsap.to(container, {
        opacity: 0,
        duration: 0.2,
        onComplete,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const layers = container.querySelectorAll<HTMLElement>('.glitch-layer');
      const pinkLayer = layers[0];
      const chartLayer = layers[1];
      const noiseLines = container.querySelectorAll<HTMLElement>('.glitch-noise');

      const tl = gsap.timeline({
        onComplete,
      });

      // Phase 1: Offset color channels
      tl.set(pinkLayer, { x: 6, opacity: 0.7 })
        .set(chartLayer, { x: -6, opacity: 0.7 });

      // Phase 1b: Show noise scan lines
      tl.set(noiseLines, { opacity: 1 });

      // Phase 2: Rapid flicker
      tl.to(
        [pinkLayer, chartLayer],
        {
          opacity: 0.3,
          duration: 0.04,
          repeat: 3,
          yoyo: true,
        },
        0.02
      );

      // Phase 2b: Noise lines slide
      tl.to(
        noiseLines,
        {
          y: () => (Math.random() - 0.5) * 40,
          opacity: 0,
          duration: 0.1,
          stagger: 0.02,
        },
        0.04
      );

      // Phase 3: Converge layers
      tl.to(pinkLayer, { x: 0, opacity: 0, duration: 0.08 }, 0.18)
        .to(chartLayer, { x: 0, opacity: 0, duration: 0.08 }, 0.18);

      // Phase 4: Scale snap + fade
      tl.fromTo(
        container,
        { scale: 1.02 },
        { scale: 1, duration: 0.04 },
        0.26
      ).to(container, { opacity: 0, duration: 0.04 }, 0.28);

    }, container);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: Z.glitch }}
      aria-hidden="true"
    >
      {/* Color channel layers */}
      <div
        className="glitch-layer absolute inset-0 opacity-0"
        style={{ backgroundColor: '#FF1F8E', mixBlendMode: 'screen' }}
      />
      <div
        className="glitch-layer absolute inset-0 opacity-0"
        style={{ backgroundColor: '#B6FF00', mixBlendMode: 'screen' }}
      />

      {/* Horizontal noise scan lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="glitch-noise absolute left-0 right-0 opacity-0"
          style={{
            top: 15 + i * 18 + '%',
            height: '2px',
            background:
              i % 2 === 0
                ? 'rgba(255, 31, 142, 0.6)'
                : 'rgba(182, 255, 0, 0.4)',
          }}
        />
      ))}

      {/* Brief white flash */}
      <div className="absolute inset-0 bg-white/5" />
    </div>
  );
}
