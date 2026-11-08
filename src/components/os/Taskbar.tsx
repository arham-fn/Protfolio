'use client';

import React, { useState, useEffect } from 'react';
import { useOSStore, type WindowId, ACHIEVEMENTS } from '@/hooks/useOSStore';

interface TaskbarProps {
  onOpenBios: () => void;
}

export default function Taskbar({ onOpenBios }: TaskbarProps) {
  const {
    turbo,
    toggleTurbo,
    activeWindow,
    openWindows,
    minimizedWindows,
    bringToFront,
    toggleMinimize,
    unlockedAchievements,
    openWindow,
  } = useOSStore();

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('00:00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Window labels
  const windowLabels: Record<WindowId, { title: string; icon: string }> = {
    hero: { title: 'Tower Chassis', icon: '🖥️' },
    projects: { title: 'Projects (A:)', icon: '💾' },
    repair: { title: 'Repair Bay', icon: '🔧' },
    skills: { title: 'Skill Tree', icon: '⚡' },
    quest: { title: 'Quest Log', icon: '📜' },
    terminal: { title: 'ARHAM-DOS', icon: '📟' },
    contact: { title: 'Serial Port', icon: '✉️' },
    achievements: { title: 'Awards.exe', icon: '🏆' },
    bios: { title: 'BIOS Setup', icon: '⚙️' },
  };

  const unlockedCount = unlockedAchievements.size;

  return (
    <>
      {/* Start Menu Popup */}
      {startMenuOpen && (
        <div
          role="dialog"
          aria-label="Start Menu"
          className="fixed bottom-10 left-1 z-[110] w-64 bevel-raised shadow-window flex flex-col font-mono text-xs text-ink"
        >
          {/* Vertical Banner */}
          <div className="flex">
            <div className="w-8 bg-accent flex items-end justify-center pb-3 text-[#EFEADB] font-bold text-sm tracking-widest [writing-mode:vertical-rl] rotate-180">
              ARHAM 98
            </div>

            <div className="flex-1 p-2 space-y-1 bg-surface">
              <button
                type="button"
                onClick={() => {
                  setStartMenuOpen(false);
                  openWindow('projects');
                  const el = document.getElementById('window-projects');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left px-2 py-1.5 hover:bg-accent hover:text-[#EFEADB] flex items-center gap-2"
              >
                <span>💾</span>
                <span>Projects (Floppy Drive)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStartMenuOpen(false);
                  openWindow('repair');
                  const el = document.getElementById('window-repair');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left px-2 py-1.5 hover:bg-accent hover:text-[#EFEADB] flex items-center gap-2"
              >
                <span>🔧</span>
                <span>Hardware Repair Bay</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStartMenuOpen(false);
                  openWindow('skills');
                  const el = document.getElementById('window-skills');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left px-2 py-1.5 hover:bg-accent hover:text-[#EFEADB] flex items-center gap-2"
              >
                <span>⚡</span>
                <span>Skill Tree Topology</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStartMenuOpen(false);
                  openWindow('terminal');
                  const el = document.getElementById('window-terminal');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left px-2 py-1.5 hover:bg-accent hover:text-[#EFEADB] flex items-center gap-2"
              >
                <span>📟</span>
                <span>MS-DOS Terminal</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStartMenuOpen(false);
                  openWindow('contact');
                  const el = document.getElementById('window-contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left px-2 py-1.5 hover:bg-accent hover:text-[#EFEADB] flex items-center gap-2"
              >
                <span>✉️</span>
                <span>Connect / Send Dispatch</span>
              </button>

              <div className="border-t border-lo my-1" />

              <button
                type="button"
                onClick={() => {
                  setStartMenuOpen(false);
                  setAchievementsOpen(true);
                }}
                className="w-full text-left px-2 py-1.5 hover:bg-accent hover:text-[#EFEADB] flex items-center gap-2"
              >
                <span>🏆</span>
                <span>Achievements ({unlockedCount}/8)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStartMenuOpen(false);
                  onOpenBios();
                }}
                className="w-full text-left px-2 py-1.5 hover:bg-accent hover:text-[#EFEADB] flex items-center gap-2"
              >
                <span>⚙️</span>
                <span>ROM BIOS Setup (F2)</span>
              </button>

              <div className="border-t border-lo my-1" />

              <button
                type="button"
                onClick={() => {
                  setStartMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-left px-2 py-1.5 hover:bg-accent hover:text-[#EFEADB] flex items-center gap-2 font-bold"
              >
                <span>🔌</span>
                <span>Cold Restart / Tower Top</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Dialog Modal */}
      {achievementsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg bevel-raised shadow-window font-mono text-xs">
            <div className="window-titlebar">
              <div className="flex items-center gap-1.5">
                <span>🏆</span>
                <span>SYSTEM ACHIEVEMENTS ({unlockedCount}/8 UNLOCKED)</span>
              </div>
              <button
                type="button"
                onClick={() => setAchievementsOpen(false)}
                className="win-btn hover:bg-[#F2541B]"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-surface max-h-[75vh] overflow-y-auto space-y-2.5">
              <p className="text-ink/80 pb-2 border-b border-lo text-[11px]">
                Secret system achievements discoverable across ARHAM OS. Complete hardware repairs, terminal commands, and diagnostics to unlock.
              </p>

              {Object.entries(ACHIEVEMENTS).map(([id, item]) => {
                const isUnlocked = unlockedAchievements.has(id);
                return (
                  <div
                    key={id}
                    className={`p-2.5 flex items-start gap-3 border ${
                      isUnlocked
                        ? 'border-accent bg-[#EDE8D6]'
                        : 'border-lo/60 opacity-60 bg-surface'
                    }`}
                  >
                    <span className="text-lg">
                      {isUnlocked ? '🏅' : '🔒'}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className={isUnlocked ? 'text-accent' : 'text-ink/70'}>
                          {item.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-surface bevel-sunken">
                          {isUnlocked ? 'RESOLVED' : 'LOCKED'}
                        </span>
                      </div>
                      <p className="text-[11px] text-ink/70 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="pt-3 border-t border-lo flex justify-end">
                <button
                  type="button"
                  onClick={() => setAchievementsOpen(false)}
                  className="bevel-btn px-4 py-1 text-xs"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Taskbar */}
      <footer
        id="taskbar"
        className="fixed bottom-0 left-0 right-0 h-10 bevel-raised flex items-center justify-between px-1 z-[100] bg-surface select-none"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Left: Start button + Window pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            data-pressed={startMenuOpen}
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className="bevel-btn font-black text-xs px-2.5 py-1 min-h-[32px] gap-1.5 hover:brightness-105 active:brightness-95"
          >
            <span className="text-sm">💻</span>
            <span>Start</span>
          </button>

          {/* Open window pills */}
          <div className="hidden sm:flex items-center gap-1 pl-1 border-l border-lo">
            {(['projects', 'repair', 'skills', 'terminal', 'contact'] as WindowId[]).map((winId) => {
              const meta = windowLabels[winId];
              const isWinActive = activeWindow === winId;
              const isMin = minimizedWindows[winId];

              return (
                <button
                  key={winId}
                  type="button"
                  data-pressed={isWinActive && !isMin}
                  onClick={() => {
                    if (isWinActive && !isMin) {
                      toggleMinimize(winId);
                    } else {
                      bringToFront(winId);
                      const el = document.getElementById(`window-${winId}`);
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`bevel-btn text-[11px] px-2 py-0.5 min-h-[30px] max-w-[130px] truncate gap-1 ${
                    isWinActive && !isMin ? 'bg-[#EDE8D6] font-bold' : ''
                  }`}
                  title={meta.title}
                >
                  <span className="text-xs">{meta.icon}</span>
                  <span className="truncate">{meta.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: System Tray */}
        <div className="flex items-center gap-1.5 bevel-sunken px-2 py-0.5 shrink-0 font-mono text-[11px] bg-[#EDE8D6]">
          {/* Turbo Motion Toggle */}
          <button
            type="button"
            onClick={toggleTurbo}
            title="Toggle Turbo Motion (respects prefers-reduced-motion)"
            className={`px-1.5 py-0.5 text-[10px] font-bold border transition-colors ${
              turbo
                ? 'border-primary bg-primary text-ink'
                : 'border-lo bg-surface text-ink/70'
            }`}
          >
            TURBO {turbo ? '66MHz' : '33MHz'}
          </button>

          {/* Achievement Trophy Quick Button */}
          <button
            type="button"
            onClick={() => setAchievementsOpen(true)}
            className="flex items-center gap-1 px-1 hover:text-accent font-bold cursor-pointer"
            title="View Achievements"
          >
            <span>🏆</span>
            <span className="tabular-nums">{unlockedCount}/8</span>
          </button>

          {/* Digital Clock */}
          <span className="hidden md:inline tabular-nums text-ink/80 border-l border-lo/60 pl-1.5">
            {timeStr}
          </span>
        </div>
      </footer>
    </>
  );
}
