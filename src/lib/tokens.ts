// ═══════════════════════════════════════════════════════════════
// ARHAM-OS Design Tokens
// Single source of truth for every visual constant in the build.
// ═══════════════════════════════════════════════════════════════

// --- Palette (strict: jet 70%, pink 20%, chartreuse 10%) ---
export const COLORS = {
  jet: '#0A0A0A',
  pink: '#FF1F8E',
  chartreuse: '#B6FF00',
  light: '#F2F2F2',
  lightHigh: 'rgba(242, 242, 242, 0.9)',
  lightLow: 'rgba(242, 242, 242, 0.6)',
} as const;

// --- GSAP Easings ---
export const EASE = {
  /** Entrances — elements appearing on screen */
  enter: 'power3.out',
  /** Exits — elements leaving the screen */
  exit: 'power3.in',
  /** State changes — class switch, cartridge insert, tab swap */
  transition: 'expo.inOut',
  /** Playful — button press, chip bounce, node pop */
  bounce: 'back.out(1.4)',
} as const;

// --- Durations (seconds) ---
export const DUR = {
  /** Micro: tooltips, hover states, cursor morph */
  fast: 0.4,
  /** Standard: scroll reveals, node highlights */
  normal: 0.6,
  /** Hero entrances, section transitions, Flip reorders */
  slow: 0.9,
  /** Boot sequence total */
  boot: 3.5,
  /** RGB-split glitch transition */
  glitch: 0.3,
} as const;

// --- Stagger intervals (seconds) ---
export const STAGGER = {
  char: 0.025,
  node: 0.05,
  card: 0.08,
  device: 0.15,
  line: 0.2,
} as const;

// --- Breakpoints (px) ---
export const BP = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// --- Z-index layers ---
export const Z = {
  base: 0,
  pcbTrace: 1,
  content: 10,
  hud: 100,
  cursor: 200,
  scanlines: 300,
  glitch: 400,
  boot: 500,
  biosSetup: 600,
} as const;

// --- POST text lines ---
export const POST_LINES = [
  'ARHAM-OS v2026',
  'CPU: curiosity',
  'RAM: re-seated, 8/8 machines fixed',
  'POST: OK',
] as const;
