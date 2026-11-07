// ═══════════════════════════════════════════════════════════════
// ARHAM — "BEIGE BOX OS" Design Tokens
// ═══════════════════════════════════════════════════════════════

export const COLORS = {
  bg: '#D8D2BE',       // page
  surface: '#C7BFA6',  // windows, cards
  primary: '#F2541B',  // power LED orange: fills, CTAs
  accent: '#1E3FA0',   // BIOS blue: links, headings, focus rings
  ink: '#1A1814',      // text
  hi: '#EFEADB',       // bevel highlight
  lo: '#8F8870',       // bevel shadow
} as const;

export const EASE = {
  enter: 'power3.out',
  exit: 'power3.in',
  transition: 'expo.inOut',
  bounce: 'back.out(1.5)',
} as const;

export const DUR = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  boot: 3.5,
} as const;

export const BP = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const Z = {
  base: 0,
  pcbTrace: 1,
  content: 10,
  windows: 40,
  windowActive: 50,
  hud: 100,
  taskbar: 100,
  modal: 150,
  cursor: 200,
  scanlines: 300,
  glitch: 400,
  boot: 500,
  biosSetup: 600,
} as const;

export const POST_LINES = [
  'ARHAM-OS v1998',
  'CPU: Curiosity @ 66MHz',
  'RAM: 16MB SDRAM 100MHz (8/8 fixed)',
  'POST: OK',
] as const;

