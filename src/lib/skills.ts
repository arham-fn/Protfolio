import type { SkillNode } from '@/types';

/**
 * Coordinated 1000 x 600 absolute circuit board layout.
 * Ensures every node has comfortable breathing room and avoids
 * mobile aspect ratio clipping or edge collision.
 */
export const SKILL_NODES: SkillNode[] = [
  // --- Core (Center Power Hub) ---
  { id: 'html', name: 'HTML5', category: 'core', x: 440, y: 240, connections: ['css', 'js'] },
  { id: 'css', name: 'CSS3', category: 'core', x: 560, y: 240, connections: ['tailwind'] },
  { id: 'js', name: 'JavaScript', category: 'core', x: 440, y: 350, connections: ['ts', 'react', 'node'] },
  { id: 'ts', name: 'TypeScript', category: 'core', x: 560, y: 350, connections: ['next', 'react-native'] },

  // --- Frontend (Upper Left Cluster) ---
  { id: 'react', name: 'React', category: 'frontend', x: 280, y: 230, connections: ['next', 'react-native'] },
  { id: 'next', name: 'Next.js', category: 'frontend', x: 130, y: 150, connections: [] },
  { id: 'react-native', name: 'React Native', category: 'frontend', x: 130, y: 280, connections: [] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', x: 720, y: 180, connections: [] },

  // --- Backend (Lower Left Cluster) ---
  { id: 'node', name: 'Node.js', category: 'backend', x: 280, y: 440, connections: ['express', 'supabase'] },
  { id: 'express', name: 'Express', category: 'backend', x: 130, y: 410, connections: [] },
  { id: 'supabase', name: 'Supabase', category: 'backend', x: 130, y: 510, connections: [] },

  // --- Languages & Systems (Upper Right Cluster) ---
  { id: 'python', name: 'Python', category: 'languages', x: 720, y: 340, connections: ['ai-api', 'opencv'] },
  { id: 'cpp', name: 'C++', category: 'languages', x: 740, y: 460, connections: ['assembly'] },
  { id: 'assembly', name: 'Assembly x86', category: 'languages', x: 880, y: 420, connections: ['os'] },
  { id: 'os', name: 'Operating Systems', category: 'languages', x: 880, y: 520, connections: [] },

  // --- AI (Lower Right Cluster) ---
  { id: 'ai-api', name: 'OpenAI / Claude API', category: 'ai', x: 880, y: 220, connections: [] },
  { id: 'opencv', name: 'OpenCV', category: 'ai', x: 880, y: 320, connections: ['mediapipe'] },
  { id: 'mediapipe', name: 'MediaPipe', category: 'ai', x: 720, y: 230, connections: [] },
];

export const SKILL_CATEGORIES = [
  {
    category: 'core',
    label: 'Core Runtimes',
    color: '#B6FF00',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
    ids: ['html', 'css', 'js', 'ts'],
  },
  {
    category: 'frontend',
    label: 'Frontend & Mobile',
    color: '#FF1F8E',
    skills: ['React', 'Next.js', 'React Native', 'Tailwind CSS'],
    ids: ['react', 'next', 'react-native', 'tailwind'],
  },
  {
    category: 'backend',
    label: 'Backend & Data',
    color: '#B6FF00',
    skills: ['Node.js', 'Express', 'Supabase'],
    ids: ['node', 'express', 'supabase'],
  },
  {
    category: 'languages',
    label: 'Languages & Systems',
    color: '#FF1F8E',
    skills: ['Python', 'C++', 'Assembly x86', 'Operating Systems'],
    ids: ['python', 'cpp', 'assembly', 'os'],
  },
  {
    category: 'ai',
    label: 'AI & Spatial Vision',
    color: '#B6FF00',
    skills: ['OpenAI / Claude API', 'OpenCV', 'MediaPipe'],
    ids: ['ai-api', 'opencv', 'mediapipe'],
  },
];
