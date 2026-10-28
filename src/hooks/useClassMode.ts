'use client';

import { create } from 'zustand';
import type { ClassMode } from '@/types';

interface ClassModeStore {
  mode: ClassMode;
  setMode: (mode: ClassMode) => void;
}

export const useClassMode = create<ClassModeStore>((set) => ({
  mode: 'CLIENT',
  setMode: (mode) => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('arham-class', mode);
      } catch {
        // sessionStorage may be unavailable in some contexts
      }
    }
    set({ mode });
  },
}));

/**
 * Call once in a top-level useEffect to rehydrate the class mode
 * from sessionStorage after the initial client render.
 */
export function hydrateClassMode(): void {
  if (typeof window === 'undefined') return;
  try {
    const saved = sessionStorage.getItem('arham-class') as ClassMode | null;
    if (saved && ['CLIENT', 'RECRUITER', 'DEV'].includes(saved)) {
      useClassMode.getState().setMode(saved);
    }
  } catch {
    // sessionStorage may be unavailable
  }
}
