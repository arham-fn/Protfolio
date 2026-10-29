'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import BootSequence from '@/components/boot/BootSequence';
import GlitchTransition from '@/components/shared/GlitchTransition';
import HUDShell from '@/components/hud/HUDShell';
import Hero from '@/components/hero/Hero';
import NowSection from '@/components/now/NowSection';
import SkillTree from '@/components/skills/SkillTree';
import CartridgeGrid from '@/components/cartridges/CartridgeGrid';
import RepairBay from '@/components/repair/RepairBay';
import QuestLog from '@/components/quest/QuestLog';
import Contact from '@/components/contact/Contact';
import PCBTrace from '@/components/shared/PCBTrace';
import EasterEggManager from '@/components/easter-eggs/EasterEggManager';
import { useClassMode, hydrateClassMode } from '@/hooks/useClassMode';
import { useLenis } from '@/hooks/useLenis';
import { ScrollTrigger } from '@/lib/gsap';
import type { BootPhase } from '@/types';

export default function Home() {
  const [phase, setPhase] = useState<BootPhase>('loading');
  const [mounted, setMounted] = useState(false);
  const { mode } = useClassMode();
  const mainRef = useRef<HTMLElement>(null);

  // Initialize Lenis smooth scroll
  const lenisRef = useLenis();

  useEffect(() => {
    setMounted(true);
    hydrateClassMode();

    // Check if already booted in this session
    try {
      if (sessionStorage.getItem('arham-booted') === 'true') {
        setPhase('main');
        return;
      }
    } catch {
      setPhase('main');
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markBooted();
      setPhase('main');
      return;
    }

    setPhase('boot');
  }, []);

  const markBooted = useCallback(() => {
    try {
      sessionStorage.setItem('arham-booted', 'true');
    } catch {
      // Ignored
    }
  }, []);

  const handleBootComplete = useCallback(() => {
    markBooted();
    setPhase('glitch');
  }, [markBooted]);

  const handleGlitchComplete = useCallback(() => {
    setPhase('main');
  }, []);

  useEffect(() => {
    if (phase !== 'main') return;
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [mode, phase, lenisRef]);

  // Section definitions
  const allSections = useMemo(
    () => ({
      hero: <Hero key="hero" />,
      now: <NowSection key="now" />,
      skills: <SkillTree key="skills" />,
      cartridges: <CartridgeGrid key="cartridges" />,
      repair: <RepairBay key="repair" />,
      quest: <QuestLog key="quest" />,
      contact: <Contact key="contact" />,
    }),
    []
  );

  const orderedSections = useMemo(() => {
    if (mode === 'CLIENT') {
      return [
        allSections.hero,
        allSections.now,
        allSections.cartridges,
        allSections.contact,
        allSections.repair,
        allSections.skills,
        allSections.quest,
      ];
    } else if (mode === 'RECRUITER') {
      return [
        allSections.hero,
        allSections.now,
        allSections.quest,
        allSections.skills,
        allSections.cartridges,
        allSections.contact,
        allSections.repair,
      ];
    }

    return [
      allSections.hero,
      allSections.now,
      allSections.skills,
      allSections.repair,
      allSections.cartridges,
      allSections.quest,
      allSections.contact,
    ];
  }, [mode, allSections]);

  return (
    <>
      {/* SSR Initial Fallback Viewport for immediate first paint without JS */}
      {!mounted && (
        <noscript>
          <div className="min-h-screen bg-jet text-light p-8 font-mono">
            <h1 className="font-display font-black text-5xl mb-4">ARHAM.OS</h1>
            <p className="text-xl text-pink mb-4">
              I build AI-powered apps, and I can fix the laptop you run them on.
            </p>
            <p className="text-chartreuse">
              JavaScript is required for the interactive 3D cartridge bay and hardware diagnostic simulator.
            </p>
          </div>
        </noscript>
      )}

      {/* Boot: BIOS POST sequence */}
      {phase === 'boot' && <BootSequence onComplete={handleBootComplete} />}

      {/* Glitch: 300ms RGB-split transition */}
      {phase === 'glitch' && (
        <GlitchTransition onComplete={handleGlitchComplete} />
      )}

      {/* Main site */}
      {(phase === 'main' || (!mounted && phase === 'loading')) && (
        <div className="scanlines">
          <HUDShell>
            <div className="relative">
              {/* Glowing PCB Trace SVG line drawing through sections */}
              <PCBTrace />

              {/* Dynamic Sections Container */}
              <main ref={mainRef} className="relative z-10 transition-opacity duration-300">
                {orderedSections}
              </main>
            </div>
          </HUDShell>
          <EasterEggManager />
        </div>
      )}
    </>
  );
}
