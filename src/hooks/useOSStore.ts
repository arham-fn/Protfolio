'use client';

import { create } from 'zustand';

export type WindowId =
  | 'hero'
  | 'projects'
  | 'repair'
  | 'skills'
  | 'quest'
  | 'terminal'
  | 'contact'
  | 'achievements'
  | 'bios';

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  unlocked: boolean;
}

export const ACHIEVEMENTS: Record<string, { title: string; desc: string }> = {
  fix_pc: { title: 'RAM RE-SEAT HERO', desc: 'Resolved POST error 0x3B & booted beige PC.' },
  bios: { title: 'AWARD BIOS EXPLORER', desc: 'Entered CMOS Setup Utility via F2.' },
  konami: { title: 'CHEAT CODE 1998', desc: 'Entered classic Konami code sequence.' },
  repair_3: { title: 'HARDWARE BENCH TECH', desc: 'Audited 3 separate diagnostic repair tickets.' },
  terminal_3: { title: 'DOS PROMPT HACKER', desc: 'Executed 3 console terminal commands.' },
  hidden_floppy: { title: 'EASTER EGG DISKETTE', desc: 'Found the hidden 3.5" system floppy cartridge.' },
  skills_5: { title: 'CIRCUIT TRACER', desc: 'Inspected 5 technical skill runtime sockets.' },
  footer: { title: 'DEEP MEMORY DUMP', desc: 'Navigated all sectors down to the system footer.' },
};

interface OSState {
  // Turbo state (66 MHz = high motion, 33 MHz = stepped/reduced)
  turbo: boolean;
  toggleTurbo: () => void;
  setTurbo: (enabled: boolean) => void;

  // Window manager state
  activeWindow: WindowId;
  openWindows: Record<WindowId, boolean>;
  minimizedWindows: Record<WindowId, boolean>;
  windowOrder: WindowId[];
  bringToFront: (id: WindowId) => void;
  toggleMinimize: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  openWindow: (id: WindowId) => void;

  // Hero state
  pcFixed: boolean;
  setPcFixed: (fixed: boolean) => void;

  // Achievements
  unlockedAchievements: Set<string>;
  latestUnlocked: string | null;
  unlockAchievement: (id: string) => void;
  clearLatestUnlocked: () => void;

  // Counters for progression achievements
  inspectedRepairs: Set<string>;
  clickedSkills: Set<string>;
  executedCommands: number;
  trackRepairInspect: (id: string) => void;
  trackSkillClick: (id: string) => void;
  trackTerminalCommand: () => void;
}

export const useOSStore = create<OSState>((set, get) => ({
  turbo: true,
  toggleTurbo: () => {
    const next = !get().turbo;
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-turbo', next ? 'true' : 'false');
    }
    set({ turbo: next });
  },
  setTurbo: (enabled) => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-turbo', enabled ? 'true' : 'false');
    }
    set({ turbo: enabled });
  },

  activeWindow: 'hero',
  openWindows: {
    hero: true,
    projects: true,
    repair: true,
    skills: true,
    quest: true,
    terminal: true,
    contact: true,
    achievements: false,
    bios: false,
  },
  minimizedWindows: {
    hero: false,
    projects: false,
    repair: false,
    skills: false,
    quest: false,
    terminal: false,
    contact: false,
    achievements: false,
    bios: false,
  },
  windowOrder: ['hero', 'projects', 'repair', 'skills', 'quest', 'terminal', 'contact', 'achievements', 'bios'],

  bringToFront: (id) => {
    const order = get().windowOrder.filter((w) => w !== id);
    order.push(id);
    set((state) => ({
      activeWindow: id,
      windowOrder: order,
      openWindows: { ...state.openWindows, [id]: true },
      minimizedWindows: { ...state.minimizedWindows, [id]: false },
    }));
  },

  toggleMinimize: (id) => {
    set((state) => ({
      minimizedWindows: {
        ...state.minimizedWindows,
        [id]: !state.minimizedWindows[id],
      },
    }));
  },

  closeWindow: (id) => {
    set((state) => ({
      openWindows: { ...state.openWindows, [id]: false },
    }));
  },

  openWindow: (id) => {
    get().bringToFront(id);
  },

  pcFixed: false,
  setPcFixed: (fixed) => {
    set({ pcFixed: fixed });
    if (fixed) {
      get().unlockAchievement('fix_pc');
    }
  },

  unlockedAchievements: new Set(),
  latestUnlocked: null,
  unlockAchievement: (id) => {
    const current = get().unlockedAchievements;
    if (!current.has(id) && ACHIEVEMENTS[id]) {
      const next = new Set(current);
      next.add(id);
      set({
        unlockedAchievements: next,
        latestUnlocked: id,
      });
    }
  },
  clearLatestUnlocked: () => set({ latestUnlocked: null }),

  inspectedRepairs: new Set(),
  clickedSkills: new Set(),
  executedCommands: 0,

  trackRepairInspect: (id) => {
    const next = new Set(get().inspectedRepairs);
    next.add(id);
    set({ inspectedRepairs: next });
    if (next.size >= 3) {
      get().unlockAchievement('repair_3');
    }
  },

  trackSkillClick: (id) => {
    const next = new Set(get().clickedSkills);
    next.add(id);
    set({ clickedSkills: next });
    if (next.size >= 5) {
      get().unlockAchievement('skills_5');
    }
  },

  trackTerminalCommand: () => {
    const count = get().executedCommands + 1;
    set({ executedCommands: count });
    if (count >= 3) {
      get().unlockAchievement('terminal_3');
    }
  },
}));
