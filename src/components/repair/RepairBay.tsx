'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { REPAIR_STATS, REPAIR_DEVICES, ALSO_TINKERS_WITH } from '@/lib/repairs';
import RepairTicket from './RepairTicket';
import type { RepairDevice } from '@/types';

export default function RepairBay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDevice, setSelectedDevice] = useState<RepairDevice | null>(null);

  // Roll-up counter and slot entrances
  useGSAP(
    () => {
      const counterTarget = { count: 0, invoice: 100 };

      // Number roll-up
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(counterTarget, {
            count: 8,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
              const el = document.getElementById('fixed-counter');
              if (el) el.textContent = Math.round(counterTarget.count).toString();
            },
          });

          // Staggered boot-flicker on device slots
          gsap.from('.device-slot', {
            opacity: 0.1,
            scale: 0.9,
            duration: 0.4,
            stagger: 0.12,
            ease: 'power3.out',
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="repair-bay"
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 sm:px-12 lg:px-24 border-b border-light/5 font-mono"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <div className="text-pink text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-pink inline-block animate-ping" />
            BENCH TELEMETRY // SILICON & SOLDER // POST DIAGNOSTICS
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light">
            REPAIR BAY
          </h2>
        </div>
        <div className="text-xs text-light/50 max-w-sm">
          Hands-on hardware troubleshooting. Click any slot to review the bench ticket and root cause.
        </div>
      </div>

      {/* Primary Counter Callout */}
      <div className="p-6 sm:p-8 bg-jet border-2 border-chartreuse/40 mb-12 relative overflow-hidden">
        <div className="flex flex-wrap items-baseline gap-4 sm:gap-8 mb-2">
          <div className="flex items-baseline gap-2">
            <span
              id="fixed-counter"
              className="font-display font-black text-5xl sm:text-7xl text-chartreuse tabular-nums"
            >
              8
            </span>
            <span className="text-sm sm:text-lg text-chartreuse font-bold">
              MACHINES FIXED
            </span>
          </div>

          <div className="text-xs sm:text-sm text-light/70 border-l border-light/10 pl-4 sm:pl-8 space-y-0.5">
            <div>5 LAPTOPS · 3 PCs</div>
            <div className="text-pink font-bold">$0 INVOICED</div>
          </div>
        </div>
        <p className="text-xs text-chartreuse/80 italic">
          &quot;{REPAIR_STATS.subline}&quot;
        </p>
      </div>

      {/* 8 Device Slots Grid (5 Laptops, 3 Towers) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {REPAIR_DEVICES.map((dev, i) => (
          <div
            key={dev.id}
            onClick={() => setSelectedDevice(dev)}
            className="device-slot p-4 border border-chartreuse/30 bg-jet/80 hover:border-pink hover:shadow-[0_0_16px_rgba(255,31,142,0.3)] transition-all cursor-pointer group"
          >
            {/* Slot Icon */}
            <div className="flex items-center justify-between mb-3 text-light/40 group-hover:text-pink transition-colors">
              <span className="text-[10px]">SLOT 0{i + 1}</span>
              {dev.type === 'laptop' ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="12" rx="1" />
                  <path d="M2 18h20" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="2" width="14" height="20" rx="1" />
                  <circle cx="12" cy="6" r="1" fill="currentColor" />
                  <path d="M9 10h6M9 13h6" />
                </svg>
              )}
            </div>

            <div className="text-xs text-light/90 font-bold group-hover:text-chartreuse transition-colors">
              {dev.type.toUpperCase()}
            </div>
            <div className="text-[10px] text-light/40 truncate mb-3">
              {dev.model}
            </div>

            {/* Boot Status Badge */}
            <div className="flex items-center justify-between text-[9px] pt-2 border-t border-light/10">
              <span className="text-light/40">POST:</span>
              <span className="text-chartreuse font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-chartreuse animate-pulse-dot" />
                FIXED
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Diagnosis Breakdown & RAM Tooltip Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border border-light/10 bg-jet/60 lg:col-span-2">
          <div className="text-xs font-bold text-chartreuse uppercase tracking-wider mb-4">
            DIAGNOSIS TELEMETRY BREAKDOWN
          </div>

          <div className="space-y-4 text-xs">
            {/* RAM */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-light/90">RAM Oxidation / Seating (POST failure)</span>
                <span className="text-chartreuse font-bold">6 / 8 (75%)</span>
              </div>
              <div className="w-full h-2 bg-white/5 border border-light/10">
                <div className="h-full bg-chartreuse" style={{ width: '75%' }} />
              </div>
            </div>

            {/* SSD */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-light/90">Failing SATA M.2 SSD / Read-Only Controller</span>
                <span className="text-pink font-bold">1 / 8 (12.5%)</span>
              </div>
              <div className="w-full h-2 bg-white/5 border border-light/10">
                <div className="h-full bg-pink" style={{ width: '12.5%' }} />
              </div>
            </div>

            {/* PSU */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-light/90">Power Supply Rail Instability (+12V Drop)</span>
                <span className="text-light/70 font-bold">1 / 8 (12.5%)</span>
              </div>
              <div className="w-full h-2 bg-white/5 border border-light/10">
                <div className="h-full bg-light/60" style={{ width: '12.5%' }} />
              </div>
            </div>
          </div>

          {/* Deep RAM Tooltip Note */}
          <div className="mt-6 p-4 border border-chartreuse/30 bg-chartreuse/[0.03] text-xs text-light/80 leading-relaxed">
            <span className="text-chartreuse font-bold block mb-1">
              NOTE: ALMOST ALL POST FAILURES TRACED TO RAM CONTACTS
            </span>
            POST must initialize memory before any video output is generated. A dirty or oxidized contact triggers an immediate black screen with zero on-screen error codes. Re-seating and cleaning pins with 99% alcohol clears surface oxidation.
          </div>
        </div>

        {/* Featured Hardware Ticket */}
        <div className="p-6 border border-pink/40 bg-pink/[0.02] flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-pink uppercase font-bold tracking-widest mb-2">
              FEATURED BENCH TICKET
            </div>
            <h4 className="font-display font-bold text-lg text-light mb-3">
              {REPAIR_STATS.featuredTicket.title}
            </h4>
            <div className="space-y-2 text-xs text-light/70">
              <p>
                <strong className="text-light/90">Symptom:</strong>{' '}
                {REPAIR_STATS.featuredTicket.symptom}
              </p>
              <p>
                <strong className="text-pink">Root Cause:</strong>{' '}
                {REPAIR_STATS.featuredTicket.rootCause}
              </p>
              <p>
                <strong className="text-chartreuse">Fix:</strong>{' '}
                {REPAIR_STATS.featuredTicket.fix}
              </p>
            </div>
          </div>

          <div className="mt-6 text-[11px] font-mono text-light/40 border-t border-light/10 pt-3">
            CLI: powercfg /requests → powercfg -requestsoverride
          </div>
        </div>
      </div>

      {/* Typewriter Terminal Fix Log */}
      <div className="p-5 border border-light/10 bg-black font-mono text-xs mb-12">
        <div className="text-light/40 text-[10px] uppercase mb-2">
          SERIAL REPAIR LOG STREAM:
        </div>
        <div className="text-chartreuse space-y-1">
          <div>[00:01:04] DIAG: Probing flea power & 19V DC input jack... OK</div>
          <div>[00:02:18] MEM: DDR4 SO-DIMM unseated; pin oxidation identified</div>
          <div>[00:03:42] CLEAN: 99% Isopropyl applied to gold contacts; socket blown</div>
          <div>[00:04:12] RESEAT: Channel A locked; CMOS reset executed</div>
          <div className="text-pink font-bold">
            [00:04:55] POST: BEEP OK · VIDEO SIGNAL RESTORED · STATUS: FIXED
          </div>
        </div>
      </div>

      {/* Also Tinkers With Chips */}
      <div className="mb-12">
        <span className="text-xs text-light/50 uppercase tracking-widest block mb-3">
          ALSO TINKERS WITH:
        </span>
        <div className="flex flex-wrap gap-2">
          {ALSO_TINKERS_WITH.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 border border-light/10 bg-white/[0.02] text-xs text-chartreuse hover:border-pink hover:text-pink transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Closer */}
      <div className="text-center py-6 border-t border-light/10 text-sm text-light/80">
        &quot;{REPAIR_STATS.closer}&quot;
      </div>

      {/* Modal Ticket */}
      {selectedDevice && (
        <RepairTicket
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
        />
      )}
    </section>
  );
}
