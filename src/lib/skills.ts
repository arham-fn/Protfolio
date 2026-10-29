import type { SkillNode } from '@/types';

export interface ExtendedSkillNode extends SkillNode {
  usage: string;
  project: string;
}

/**
 * Coordinated 1000 x 600 circuit board layout.
 * Every node has logos only on the socket, with name in tooltip
 * and an expanded popover panel on click/tap with usage and project reference.
 */
export const SKILL_NODES: ExtendedSkillNode[] = [
  // --- Core (Center Hub) ---
  {
    id: 'html',
    name: 'HTML5',
    category: 'core',
    x: 440,
    y: 240,
    connections: ['css', 'js'],
    usage: 'Semantic DOM architecture, accessibility trees, and microdata structuring.',
    project: 'Tech Atlas 2026'
  },
  {
    id: 'css',
    name: 'CSS3',
    category: 'core',
    x: 560,
    y: 240,
    connections: ['tailwind'],
    usage: 'Hardware-accelerated transforms, CSS variables, CRT scanlines, and fluid grids.',
    project: 'ARHAM-OS Portfolio'
  },
  {
    id: 'js',
    name: 'JavaScript',
    category: 'core',
    x: 440,
    y: 350,
    connections: ['ts', 'react', 'node'],
    usage: 'Asynchronous event loops, Web APIs, DOM manipulation, and runtime engines.',
    project: 'Langar Community Events'
  },
  {
    id: 'ts',
    name: 'TypeScript',
    category: 'core',
    x: 560,
    y: 350,
    connections: ['next', 'react-native'],
    usage: 'Compile-time type contracts, generics, strict interface validation, and refactor safety.',
    project: 'Tech Atlas 2026'
  },

  // --- Frontend (Upper Left) ---
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    x: 280,
    y: 230,
    connections: ['next', 'react-native'],
    usage: 'Modular component state, reactive side effects, and virtual DOM reconciliation.',
    project: 'Langar Community Events'
  },
  {
    id: 'next',
    name: 'Next.js',
    category: 'frontend',
    x: 130,
    y: 150,
    connections: [],
    usage: 'App Router architecture, hybrid SSR/SSG, dynamic code-splitting, and asset optimization.',
    project: 'Tech Atlas 2026'
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'frontend',
    x: 130,
    y: 280,
    connections: [],
    usage: 'Cross-platform native mobile clients, native bridge communication, and mobile UI rendering.',
    project: 'DisasterShield'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    x: 720,
    y: 180,
    connections: [],
    usage: 'Utility-first deterministic design tokens, responsive breakpoints, and purged zero-runtime CSS.',
    project: 'Tech Atlas 2026'
  },

  // --- Backend (Lower Left) ---
  {
    id: 'node',
    name: 'Node.js',
    category: 'backend',
    x: 280,
    y: 440,
    connections: ['express', 'supabase'],
    usage: 'Non-blocking I/O event streaming, REST microservices, and file serialization.',
    project: 'DisasterShield Dispatch'
  },
  {
    id: 'express',
    name: 'Express',
    category: 'backend',
    x: 130,
    y: 410,
    connections: [],
    usage: 'HTTP routing middleware, JSON payload sanitization, and webhook handlers.',
    project: 'DisasterShield Backend'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'backend',
    x: 130,
    y: 510,
    connections: [],
    usage: 'PostgreSQL storage, row-level security (RLS), edge functions, and realtime subscriptions.',
    project: 'Subscription Tracker'
  },

  // --- Languages & Systems (Upper Right) ---
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    x: 720,
    y: 340,
    connections: ['ai-api', 'opencv'],
    usage: 'Scientific computation, image processing matrices, and AI agent orchestration.',
    project: 'Hand-Gesture Art Canvas'
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'languages',
    x: 740,
    y: 460,
    connections: ['assembly'],
    usage: 'Deterministic memory control, pointer arithmetic, OOP patterns, and low-overhead CLI tools.',
    project: 'Library Management System'
  },
  {
    id: 'assembly',
    name: 'Assembly x86',
    category: 'languages',
    x: 880,
    y: 420,
    connections: ['os'],
    usage: 'Register-level mechanics, opcode execution cycles, stack frames, and CPU memory addressing.',
    project: '[PLACEHOLDER: Academic low-level system lab]'
  },
  {
    id: 'os',
    name: 'Operating Systems',
    category: 'languages',
    x: 880,
    y: 520,
    connections: [],
    usage: 'Process scheduling, virtual memory paging, interrupt vectors, and hardware POST routines.',
    project: 'Hardware Repair Bay Diagnostics'
  },

  // --- AI (Lower Right) ---
  {
    id: 'ai-api',
    name: 'OpenAI / Claude API',
    category: 'ai',
    x: 880,
    y: 220,
    connections: [],
    usage: 'Structured JSON tool calling, prompt embeddings, and automated multi-step LLM workflows.',
    project: 'Invitrex Automation & Subscription Tracker'
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'ai',
    x: 880,
    y: 320,
    connections: ['mediapipe'],
    usage: 'Frame buffer manipulation, color threshold filtering, and contour edge detection.',
    project: 'Hand-Gesture Art Canvas'
  },
  {
    id: 'mediapipe',
    name: 'MediaPipe',
    category: 'ai',
    x: 720,
    y: 230,
    connections: [],
    usage: 'Real-time 21-point 3D hand skeleton landmark coordinate tracking and gesture state machines.',
    project: 'Hand-Gesture Art Canvas'
  },
];
