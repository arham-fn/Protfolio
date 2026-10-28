'use client';

// ═══════════════════════════════════════════════════════════════
// Centralized GSAP initialization
// Every component imports from here — never directly from 'gsap'.
// Plugins are registered once at module load.
// ═══════════════════════════════════════════════════════════════

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

export { gsap, ScrollTrigger, Flip, useGSAP };
