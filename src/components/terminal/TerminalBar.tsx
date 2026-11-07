'use client';

import React, { useState, useRef, useEffect } from 'react';
import OSWindow from '@/components/os/OSWindow';
import { useOSStore } from '@/hooks/useOSStore';

interface TerminalLine {
  type: 'in' | 'out' | 'err';
  text: string;
}

export default function TerminalBar() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'out', text: 'ARHAM-DOS Version 6.22 (C)Copyright 1998' },
    { type: 'out', text: 'Type "help" or click the quick commands below.' },
  ]);

  const { trackTerminalCommand, toggleTurbo, turbo } = useOSStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    trackTerminalCommand();
    const cmd = raw.toLowerCase();

    const newLines: TerminalLine[] = [{ type: 'in', text: `C:\\ARHAM> ${raw}` }];

    switch (cmd) {
      case 'help':
        newLines.push({
          type: 'out',
          text: 'AVAILABLE COMMANDS: help, projects, repairs, skills, powercfg, turbo, contact, about, clear',
        });
        break;

      case 'projects':
        newLines.push({
          type: 'out',
          text: 'PROJECTS ARCHIVE:\n - TECH ATLAS 2026 [LIVE Flagship]\n - DISASTER-SHIELD [Completed Capstone]\n - LIBRARY MANAGEMENT SYSTEM [Built C++]\n - HAND-GESTURE ART [Built Python/OpenCV]\n - SUBSCRIPTION TRACKER [In Progress]\n - LANGAR [In Progress]\n - SALESFORCE & KLAVIYO [Demo Orgs]',
        });
        break;

      case 'repairs':
        newLines.push({
          type: 'out',
          text: 'HARDWARE DIAGNOSTIC TELEMETRY:\n 8 Machines Fixed · 5 Laptops · 3 PCs · $0.00 Invoiced\n 6 RAM contact oxidation · 1 Failing SSD · 1 PSU rail drop\n Featured investigation: Ghost battery drain via powercfg /requests',
        });
        break;

      case 'skills':
        newLines.push({
          type: 'out',
          text: 'RUNTIMES & CORE TOPOLOGY:\n HTML, CSS, JS, TS, React, Next.js, Tailwind, React Native, Node.js, Express, Supabase, Python, C++, Assembly, Operating Systems, OpenAI/Claude API, OpenCV, MediaPipe.',
        });
        break;

      case 'powercfg':
      case 'powercfg /requests':
        newLines.push({
          type: 'out',
          text: 'C:\\> powercfg /requests\n[DISPLAY]: None\n[SYSTEM]: [DRIVER] Legacy Audio Wake Lock Service (Stuck override prevented S3 sleep)\n\nFIX APPLIED: powercfg -requestsoverride "DRIVER" "High Definition Audio" SYSTEM\nBattery standby drain 100%->15% resolved!',
        });
        break;

      case 'turbo':
        toggleTurbo();
        newLines.push({
          type: 'out',
          text: `TURBO MODE SWITCHED: CPU clock now ${!turbo ? '66MHz (HIGH MOTION)' : '33MHz (REDUCED MOTION)'}`,
        });
        break;

      case 'contact':
        newLines.push({
          type: 'out',
          text: 'COM1 SERIAL CHANNELS:\n Email: [PLACEHOLDER: email]\n Location: Faisalabad, Pakistan (PKT / UTC+5)\n Practice: Freelance-first for AI-integrated full-stack web and mobile apps.',
        });
        break;

      case 'about':
        newLines.push({
          type: 'out',
          text: 'BIO:\n Name: Arham\n Age: 20\n Location: Faisalabad, PK\n Degree: BS CS at GCUF (Government College University Faisalabad)\n Focus: Freelance AI-integrated full-stack and mobile applications.',
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newLines.push({
          type: 'err',
          text: `Bad command or file name: "${raw}". Type "help" for a list of valid commands.`,
        });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  return (
    <OSWindow
      id="terminal"
      title="COMMAND.COM - ARHAM-DOS PROMPT"
      icon="📟"
    >
      <div className="space-y-4 font-mono text-xs">
        {/* Terminal Screen Canvas */}
        <div className="p-4 bevel-sunken bg-black text-[#55FF55] min-h-[220px] max-h-[360px] overflow-y-auto space-y-1.5">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed whitespace-pre-wrap ${
                line.type === 'in'
                  ? 'text-[#FFFF55] font-bold'
                  : line.type === 'err'
                  ? 'text-[#FF5555]'
                  : 'text-[#55FF55]'
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Form with DOS prompt */}
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
          <span className="font-bold text-accent shrink-0 text-xs sm:text-sm">
            C:\ARHAM&gt;
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a command (e.g. help, projects, powercfg)..."
            className="flex-1 bevel-sunken bg-[#EDE8D6] text-ink p-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="bevel-btn bevel-btn-primary px-3 py-2 text-xs font-bold"
          >
            EXECUTE ⏎
          </button>
        </form>

        {/* Clickable Fallback Command Buttons (for touch/quick access) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
          <span className="text-ink/60 font-bold self-center pr-1 uppercase text-[10px]">
            CLICKABLE COMMANDS:
          </span>
          {[
            'help',
            'projects',
            'repairs',
            'skills',
            'powercfg',
            'turbo',
            'about',
            'contact',
            'clear',
          ].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => handleCommand(cmd)}
              className="bevel-btn px-2 py-0.5 text-[10px] hover:bg-accent hover:text-[#EFEADB]"
            >
              [{cmd}]
            </button>
          ))}
        </div>
      </div>
    </OSWindow>
  );
}
