'use client';

import React, { useRef, useEffect } from 'react';
import type { RepairDevice } from '@/types';
import { gsap } from '@/lib/gsap';

interface RepairTicketProps {
  device: RepairDevice;
  onClose: () => void;
}

export default function RepairTicket({ device, onClose }: RepairTicketProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.4)' }
      );
    }, modalRef);
    return () => ctx.revert();
  }, []);

  const handleAnimatedClose = () => {
    if (!modalRef.current) {
      onClose();
      return;
    }
    gsap.to(modalRef.current, {
      scale: 0.94,
      opacity: 0,
      duration: 0.2,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-title"
      className="fixed inset-0 z-[160] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm font-mono text-ink"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bevel-raised bg-surface shadow-window flex flex-col"
      >
        {/* Window Titlebar */}
        <div className="window-titlebar">
          <div className="flex items-center gap-1.5 truncate">
            <span>🔧</span>
            <span id="ticket-title" className="truncate">
              TICKET: {device.id.toUpperCase()} ({device.type.toUpperCase()})
            </span>
          </div>
          <button
            type="button"
            onClick={handleAnimatedClose}
            aria-label="Close Ticket"
            className="win-btn hover:bg-primary hover:text-ink"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm bg-surface">
          <div className="p-3 bevel-sunken bg-[#EDE8D6]">
            <span className="text-[10px] text-ink/60 uppercase font-bold block mb-1">
              CHASSIS &amp; HARDWARE MODEL
            </span>
            <span className="font-bold text-accent text-sm">
              {device.type.toUpperCase()} — {device.model}
            </span>
          </div>

          <div className="p-3 bevel-sunken bg-[#EDE8D6]">
            <span className="text-[10px] text-primary font-bold uppercase block mb-1">
              SYMPTOM AT INGESTION
            </span>
            <p className="text-ink/90 leading-relaxed">{device.symptom}</p>
          </div>

          <div className="p-3 bevel-sunken bg-[#EDE8D6]">
            <span className="text-[10px] text-accent font-bold uppercase block mb-1">
              ROOT CAUSE ANALYSIS
            </span>
            <p className="text-ink/90 leading-relaxed">{device.rootCause}</p>
          </div>

          <div className="p-3 bevel-sunken bg-[#EDE8D6]">
            <span className="text-[10px] text-accent font-bold uppercase block mb-1">
              BENCH REPAIR &amp; POST VERIFICATION
            </span>
            <p className="text-accent font-bold leading-relaxed">
              {device.fix}
            </p>
          </div>

          <div className="pt-2 border-t border-lo flex items-center justify-between text-xs">
            <span className="font-bold text-accent">POST RESULT: OK</span>
            <span className="font-bold text-ink">INVOICE: $0.00 (PRO BONO)</span>
            <button
              type="button"
              onClick={handleAnimatedClose}
              className="bevel-btn px-3 py-1 font-bold text-xs"
            >
              DISMISS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
