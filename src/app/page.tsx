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
  const { mode } = useClassMode();
  const mainRef = useRef<HTMLElement>(null);

  // Initialize Lenis smooth scroll
  const lenisRef = useLenis();

  useEffect(() => {
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

  // When class mode changes, refresh ScrollTrigger and smooth scroll
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

  // Section ordering dynamically tuned to ClassMode
  // CLIENT: Hero -> Now -> Cartridges -> Contact -> Repair -> Skills -> Quest
  // RECRUITER: Hero -> Now -> Quest -> Skills -> Cartridges -> Contact -> Repair
  // DEV: Hero -> Now -> Skills -> Repair -> Cartridges -> Quest -> Contact
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

    // Default / DEV mode
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
      {phase === 'loading' && (
        <div className="fixed inset-0 bg-jet z-[500]" aria-hidden="true" />
      )}

      {phase === 'boot' && <BootSequence onComplete={handleBootComplete} />}

      {phase === 'glitch' && (
        <GlitchTransition onComplete={handleGlitchComplete} />
      )}

      {phase === 'main' && (
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
