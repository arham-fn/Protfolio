'use client';

import { useRef, useEffect, useCallback } from 'react';
import { gsap } from '@/lib/gsap';
import { POST_LINES, EASE, Z } from '@/lib/tokens';

interface BootSequenceProps {
  onComplete: () => void;
}

/**
 * BIOS-style POST boot sequence.
 *
 * Timeline (3.5s total):
 *   0.0–1.5s  POST text lines type out via clipPath (steps easing)
 *   1.5–2.8s  Chartreuse progress bar fills left→right (scaleX)
 *   2.8–3.2s  "PRESS ANY KEY" prompt appears and blinks
 *   3.2+      Waiting for keypress/click → onComplete
 *
 * Skippable: any key or click at any point triggers onComplete immediately.
 * Reduced motion: caller handles skip (page.tsx checks before mounting).
 */
export default function BootSequence({ onComplete }: BootSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const completedRef = useRef(false);

  // Stable skip handler — kills timeline, fires onComplete once
  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    onComplete();
  }, [onComplete]);

  // Build GSAP timeline on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const lines = container.querySelectorAll<HTMLElement>('.post-line');
      const barFill = container.querySelector<HTMLElement>('.progress-fill');
      const prompt = container.querySelector<HTMLElement>('.press-any-key');
      if (!lines.length || !barFill || !prompt) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      // --- POST lines: type each line with stepped clipPath ---
      lines.forEach((line, i) => {
        const charCount = line.textContent?.length || 10;
        tl.fromTo(
          line,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: charCount * 0.03,
            ease: 'steps(' + charCount + ')',
          },
          i * 0.35
        );
      });

      // --- Progress bar: scaleX 0→1, origin left ---
      tl.fromTo(
        barFill,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.3, ease: 'power2.inOut' },
        1.5
      );

      // --- "PRESS ANY KEY" appears ---
      tl.to(prompt, { opacity: 1, duration: 0.1 }, 2.8);

    }, container);

    return () => ctx.revert();
  }, []);

  // Listen for skip (any key or click)
  useEffect(() => {
    const onKey = () => handleComplete();
    const onClick = () => handleComplete();

    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('click', onClick);
    };
  }, [handleComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 font-mono"
      style={{
        zIndex: Z.boot,
        backgroundColor: '#0A0A0A',
      }}
      role="status"
      aria-label="System booting"
      aria-live="polite"
    >
      {/* POST text lines */}
      <div className="space-y-0">
        {POST_LINES.map((line, i) => (
          <div
            key={i}
            className="post-line text-chartreuse"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
            aria-label={line}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-full max-w-md h-2.5 border border-chartreuse/30 overflow-hidden">
        <div
          className="progress-fill h-full bg-chartreuse origin-left"
          style={{ transform: 'scaleX(0)' }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Boot progress"
        />
      </div>

      {/* Press any key prompt */}
      <div
        className="press-any-key mt-5 text-chartreuse/80 text-xs md:text-sm tracking-wider opacity-0 animate-blink"
        aria-label="Press any key to continue"
      >
        PRESS ANY KEY TO CONTINUE
        <span className="inline-block ml-0.5 w-2 h-4 bg-chartreuse/70 align-middle" />
      </div>

      {/* Skip hint */}
      <div className="absolute bottom-6 right-6 text-light/20 text-xs">
        click or press any key to skip
      </div>
    </div>
  );
}
