'use client';

import React, { useState } from 'react';
import { REPAIR_STATS, REPAIR_DEVICES, ALSO_TINKERS_WITH } from '@/lib/repairs';
import RepairTicket from './RepairTicket';
import OSWindow from '@/components/os/OSWindow';
import type { RepairDevice } from '@/types';
import { useOSStore } from '@/hooks/useOSStore';

export default function RepairBay() {
  const [selectedDevice, setSelectedDevice] = useState<RepairDevice | null>(null);
  const [diagnosePick, setDiagnosePick] = useState<'ram' | 'ssd' | 'psu' | null>(null);
  const { trackRepairInspect } = useOSStore();

  const handleDeviceClick = (dev: RepairDevice) => {
    trackRepairInspect(dev.id);
    setSelectedDevice(dev);
  };

  return (
    <OSWindow
      id="repair"
      title="C:\BENCH - HARDWARE REPAIR BAY &amp; POST DIAGNOSTICS"
      icon="🔧"
    >
      <div className="space-y-6 font-mono text-xs sm:text-sm">
        {/* Header Intro */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-lo">
          <div>
            <div className="text-[11px] text-accent font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>●</span>
              <span>BENCH TELEMETRY // SILICON, MULTIMETERS &amp; SOLDER</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-accent">
              REPAIR BAY
            </h2>
          </div>
          <div className="text-xs text-ink/70 max-w-sm">
            Hands-on hardware troubleshooting. 8 machines rescued from cold-boot POST failure at zero charge.
          </div>
        </div>

        {/* Primary Counter Callout */}
        <div className="p-4 sm:p-6 bevel-sunken bg-[#EDE8D6] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="font-display font-black text-4xl sm:text-6xl text-accent tabular-nums">
              8
            </span>
            <div>
              <div className="font-bold text-base sm:text-lg text-ink">
                MACHINES FIXED
              </div>
              <div className="text-xs text-ink/70">
                5 LAPTOPS · 3 PCs
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="bevel-raised px-3 py-1 bg-primary text-ink font-black text-sm sm:text-base inline-block">
              $0 INVOICED
            </div>
            <div className="text-[11px] text-ink/70 italic mt-1">
              &quot;{REPAIR_STATS.subline}&quot;
            </div>
          </div>
        </div>

        {/* Interactive Diagnosis Mini-Game */}
        <div className="p-4 bevel-raised bg-surface space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-lo text-xs font-bold text-accent">
            <span>🕹️ BENCH DIAGNOSE CHALLENGE</span>
            <span className="text-[10px] text-ink/70">SELECT ROOT CAUSE:</span>
          </div>

          <p className="text-xs text-ink/90">
            <strong>Case Scenario:</strong> A laptop powers on, fans spin up to full RPM, screen stays completely pitch black, zero error beeps or splash logo. What is the root cause?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setDiagnosePick('ram')}
              data-pressed={diagnosePick === 'ram'}
              className={`bevel-btn text-xs py-2 px-3 font-bold text-left justify-start ${
                diagnosePick === 'ram' ? 'bevel-btn-primary' : ''
              }`}
            >
              A) RAM Contact Oxidation
            </button>
            <button
              type="button"
              onClick={() => setDiagnosePick('ssd')}
              data-pressed={diagnosePick === 'ssd'}
              className={`bevel-btn text-xs py-2 px-3 font-bold text-left justify-start ${
                diagnosePick === 'ssd' ? 'bg-[#EDE8D6]' : ''
              }`}
            >
              B) Corrupted SATA SSD
            </button>
            <button
              type="button"
              onClick={() => setDiagnosePick('psu')}
              data-pressed={diagnosePick === 'psu'}
              className={`bevel-btn text-xs py-2 px-3 font-bold text-left justify-start ${
                diagnosePick === 'psu' ? 'bg-[#EDE8D6]' : ''
              }`}
            >
              C) Power Supply Rail Drop
            </button>
          </div>

          {/* Reveal & Technical Explanation */}
          {diagnosePick && (
            <div className="mt-3 p-3 bevel-sunken bg-[#EDE8D6] text-xs space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <span className="text-base">
                  {diagnosePick === 'ram' ? '✅' : 'ℹ️'}
                </span>
                <span className="font-bold text-accent">
                  {diagnosePick === 'ram'
                    ? 'SPOT ON! (6 out of 8 cases)'
                    : 'GOOD GUESS, BUT ON COLD BOOT: IT WAS RAM!'}
                </span>
              </div>
              <p className="text-ink/80 leading-relaxed text-[11px]">
                The CPU must execute an initial memory training handshake before the BIOS initializes the display driver or GPU. If DDR pin contacts have microscopic surface oxidation or are unlatched, the board enters a headless freeze. Cleaning contacts with 99% isopropyl alcohol and re-seating immediately restores POST!
              </p>
            </div>
          )}
        </div>

        {/* 6 / 1 / 1 Breakdown */}
        <div className="p-4 bevel-sunken bg-[#EDE8D6] space-y-3">
          <div className="font-bold text-accent text-xs uppercase tracking-wider">
            BENCH REPAIR BREAKDOWN (8 MACHINES):
          </div>

          <div className="space-y-3 text-xs">
            {/* RAM 6/8 */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-bold text-ink">RAM Contact Oxidation / Pin Seating (POST failure)</span>
                <span className="font-bold text-accent">6 / 8 (75%)</span>
              </div>
              <div className="w-full h-3 bevel-sunken bg-surface">
                <div className="h-full bg-accent" style={{ width: '75%' }} />
              </div>
            </div>

            {/* SSD 1/8 */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-bold text-ink">Failing SATA M.2 SSD / Read-Only Firmware Lock</span>
                <span className="font-bold text-primary">1 / 8 (12.5%)</span>
              </div>
              <div className="w-full h-3 bevel-sunken bg-surface">
                <div className="h-full bg-primary" style={{ width: '12.5%' }} />
              </div>
            </div>

            {/* PSU 1/8 */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-bold text-ink">PSU Rail Instability (+12V Drop Under Load)</span>
                <span className="font-bold text-ink/70">1 / 8 (12.5%)</span>
              </div>
              <div className="w-full h-3 bevel-sunken bg-surface">
                <div className="h-full bg-[#8F8870]" style={{ width: '12.5%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 8 Device Slots Grid */}
        <div>
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-accent">
            <span>HARDWARE BENCH TICKETS (CLICK TO INSPECT):</span>
            <span className="text-[10px] text-ink/60">5 LAPTOPS · 3 PCs</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {REPAIR_DEVICES.map((dev, i) => (
              <div
                key={dev.id}
                tabIndex={0}
                role="button"
                aria-label={`View bench ticket for slot 0${i + 1}: ${dev.type.toUpperCase()} (${dev.model})`}
                onClick={() => handleDeviceClick(dev)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleDeviceClick(dev);
                  }
                }}
                className="device-slot p-3 bevel-raised bg-surface hover:bg-[#EDE8D6] active:translate-y-0.5 cursor-pointer select-none space-y-2"
              >
                <div className="flex items-center justify-between text-[10px] text-ink/60 border-b border-lo pb-1">
                  <span>SLOT 0{i + 1}</span>
                  <span>{dev.type === 'laptop' ? '💻 LAPTOP' : '🖥️ PC'}</span>
                </div>

                <div className="font-bold text-accent text-xs truncate">
                  {dev.model}
                </div>

                <div className="text-[10px] text-ink/70 truncate">
                  {dev.diagnosis.toUpperCase()}: {dev.diagnosis === 'ram' ? 'Oxidation' : dev.diagnosis === 'ssd' ? 'Read-only' : '12V Rail'}
                </div>

                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-lo">
                  <span className="text-ink/60">POST:</span>
                  <span className="text-accent font-bold">100% OK</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Hardware Ticket */}
        <div className="p-4 bevel-raised bg-[#EDE8D6] space-y-2.5">
          <div className="text-[10px] text-primary font-bold uppercase tracking-wider">
            ★ FEATURED BENCH INVESTIGATION:
          </div>
          <h4 className="font-display font-black text-base text-accent">
            {REPAIR_STATS.featuredTicket.title}
          </h4>

          <div className="space-y-1.5 text-xs text-ink/80">
            <p>
              <strong>Symptom:</strong> {REPAIR_STATS.featuredTicket.symptom}
            </p>
            <p>
              <strong>Root Cause:</strong> {REPAIR_STATS.featuredTicket.rootCause}
            </p>
            <p>
              <strong>Fix:</strong> {REPAIR_STATS.featuredTicket.fix}
            </p>
          </div>

          <div className="p-2 bevel-sunken bg-black text-[#55FF55] text-[11px] font-mono">
            CLI AUDIT: powercfg /requests ➔ powercfg -requestsoverride &quot;DRIVER&quot; &quot;High Definition Audio&quot; SYSTEM
          </div>
        </div>

        {/* Also Tinkers With */}
        <div className="p-4 bevel-sunken bg-[#EDE8D6] space-y-2">
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
            WORKBENCH SKILLS &amp; TINKERING:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            {ALSO_TINKERS_WITH.map((item, idx) => (
              <span key={idx} className="bevel-raised px-2.5 py-1 bg-surface text-ink font-semibold">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Closer */}
        <div className="text-center py-3 border-t border-lo text-xs text-ink/70 italic">
          &quot;{REPAIR_STATS.closer}&quot;
        </div>

        {/* Modal Ticket */}
        {selectedDevice && (
          <RepairTicket
            device={selectedDevice}
            onClose={() => setSelectedDevice(null)}
          />
        )}
      </div>
    </OSWindow>
  );
}
