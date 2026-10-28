import type { SkillNode } from '@/types';

export const SKILL_NODES: SkillNode[] = [
  // --- Core (center hub) ---
  { id: 'html', name: 'HTML5', category: 'core', x: 45, y: 46, connections: ['js', 'css'] },
  { id: 'css', name: 'CSS3', category: 'core', x: 55, y: 46, connections: ['tailwind'] },
  { id: 'js', name: 'JavaScript', category: 'core', x: 46, y: 54, connections: ['ts', 'react', 'node'] },
  { id: 'ts', name: 'TypeScript', category: 'core', x: 54, y: 54, connections: ['next', 'react-native'] },

  // --- Frontend ---
  { id: 'react', name: 'React', category: 'frontend', x: 34, y: 35, connections: ['next', 'react-native'] },
  { id: 'next', name: 'Next.js', category: 'frontend', x: 22, y: 30, connections: [] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', x: 68, y: 36, connections: [] },
  { id: 'react-native', name: 'React Native', category: 'frontend', x: 30, y: 22, connections: [] },

  // --- Backend ---
  { id: 'node', name: 'Node.js', category: 'backend', x: 32, y: 68, connections: ['express', 'supabase'] },
  { id: 'express', name: 'Express', category: 'backend', x: 20, y: 72, connections: [] },
  { id: 'supabase', name: 'Supabase', category: 'backend', x: 35, y: 84, connections: [] },

  // --- Languages & Systems ---
  { id: 'python', name: 'Python', category: 'languages', x: 68, y: 64, connections: ['opencv', 'ai-api'] },
  { id: 'cpp', name: 'C++', category: 'languages', x: 80, y: 55, connections: ['assembly'] },
  { id: 'assembly', name: 'Assembly x86', category: 'languages', x: 88, y: 66, connections: ['os'] },
  { id: 'os', name: 'Operating Systems', category: 'languages', x: 82, y: 78, connections: [] },

  // --- AI ---
  { id: 'ai-api', name: 'OpenAI / Claude API', category: 'ai', x: 62, y: 80, connections: [] },
  { id: 'opencv', name: 'OpenCV', category: 'ai', x: 74, y: 88, connections: ['mediapipe'] },
  { id: 'mediapipe', name: 'MediaPipe', category: 'ai', x: 86, y: 92, connections: [] },
];
