// ═══════════════════════════════════════════════════════════════
// ARHAM-OS Type Definitions
// ═══════════════════════════════════════════════════════════════

/** HUD class-select mode — reorders sections via GSAP Flip */
export type ClassMode = 'CLIENT' | 'RECRUITER' | 'DEV';

/** Project status tags — never claim finished if not */
export type ProjectStatus =
  | 'LIVE'
  | 'COMPLETED'
  | 'BUILT'
  | 'IN PROGRESS'
  | 'PLANNED'
  | 'DEMO';

/** Cartridge data — one entry per project */
export interface Project {
  id: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  stack: string[];
  description: string;
  problem?: string;
  result?: string;
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
  posterImage?: string;
  isFlagship?: boolean;
}

/** Skill tree node — pre-calculated position, no runtime physics */
export interface SkillNode {
  id: string;
  name: string;
  category: 'core' | 'frontend' | 'backend' | 'languages' | 'ai';
  /** Pre-calculated X position as percentage (0–100) */
  x: number;
  /** Pre-calculated Y position as percentage (0–100) */
  y: number;
  /** IDs of nodes this one connects to */
  connections: string[];
}

/** Repair Bay device — one slot per machine */
export interface RepairDevice {
  id: string;
  type: 'laptop' | 'tower';
  /** [PLACEHOLDER: real device model] */
  model: string;
  symptom: string;
  rootCause: string;
  fix: string;
  diagnosis: 'ram' | 'ssd' | 'psu';
}

/** Quest Log milestone — education & growth only */
export interface QuestMilestone {
  id: string;
  title: string;
  description: string;
  /** [PLACEHOLDER: approximate date] */
  date: string;
  type: 'education' | 'project' | 'skill';
}

/** Boot → Glitch → Main page phase */
export type BootPhase = 'loading' | 'boot' | 'glitch' | 'main';
