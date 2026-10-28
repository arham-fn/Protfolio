'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { EASE } from '@/lib/tokens';

const ShaderCanvas = dynamic(() => import('./ShaderCanvas'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,31,142,0.12),_transparent_65%)]" />
  ),
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameChars = 'ARHAM'.split('');

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: EASE.enter } });

      // Character split stagger
      tl.from('.hero-char', {
        y: 60,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
      });

      // Role & pitch line
      tl.from(
        '.hero-pitch',
        {
          y: 24,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.4'
      );

      // Tech Atlas LIVE chip bounce
      tl.from(
        '.hero-live-chip',
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          ease: EASE.bounce,
        },
        '-=0.2'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center px-6 sm:px-12 lg:px-24 overflow-hidden border-b border-light/5"
    >
      {/* Background Interactive Fragment Shader */}
      <ShaderCanvas />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl py-12">
        {/* Terminal Header Info */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-6 border border-chartreuse/30 bg-jet/60 backdrop-blur-sm text-xs font-mono text-chartreuse">
          <span className="w-1.5 h-1.5 rounded-full bg-chartreuse animate-ping" />
          ARHAM-OS // 20 Y/O // FAISALABAD, PK // GCUF BSCS
        </div>

        {/* Giant Monolithic Name with Split Stagger */}
        <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl text-light tracking-tighter leading-none mb-6">
          {nameChars.map((char, i) => (
            <span
              key={i}
              className="hero-char inline-block will-change-transform hover:text-pink transition-colors duration-200"
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Real Pitch */}
        <p className="hero-pitch font-mono text-lg sm:text-2xl md:text-3xl text-light/90 max-w-3xl leading-snug font-normal mb-8">
          I build{' '}
          <span className="text-pink font-semibold underline decoration-pink/40 underline-offset-4">
            AI-powered apps
          </span>
          , and I can fix the laptop you run them on.
        </p>

        {/* Action Controls & Pulsing Live Flagship Chip */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#tech-atlas"
            className="hero-live-chip group relative inline-flex items-center gap-3 px-4 py-2 bg-jet/90 border border-chartreuse text-chartreuse font-mono text-xs uppercase tracking-wider hover:bg-chartreuse hover:text-jet transition-all duration-300 shadow-[0_0_16px_rgba(182,255,0,0.25)]"
          >
            <span className="w-2 h-2 rounded-full bg-chartreuse group-hover:bg-jet animate-pulse-dot" />
            <span className="font-bold">● LIVE: Tech Atlas 2026</span>
            <span className="text-[10px] text-light/60 group-hover:text-jet/80">
              [Inspect Engine]
            </span>
          </a>

          <a
            href="#repair-bay"
            className="inline-flex items-center gap-2 px-4 py-2 border border-light/20 text-light/70 font-mono text-xs hover:border-pink hover:text-pink transition-all"
          >
            <span>▶</span>
            <span>ENTER REPAIR BAY (8/8 POST OK)</span>
          </a>
        </div>
      </div>

      {/* Floating System Coordinates Indicator */}
      <div className="absolute right-6 sm:right-12 bottom-8 hidden md:flex flex-col text-right font-mono text-[10px] text-light/30 space-y-1">
        <span>LAT: 31.4504° N</span>
        <span>LON: 73.1350° E</span>
        <span>STATUS: FREELANCE-FIRST</span>
      </div>
    </section>
  );
}
