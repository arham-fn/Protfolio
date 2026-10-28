'use client';

import { useState } from 'react';
import type { RepairDevice } from '@/types';

interface RepairTicketProps {
  device: RepairDevice;
  onClose: () => void;
}

export default function RepairTicket({ device, onClose }: RepairTicketProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-title"
      className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-jet/90 backdrop-blur-md font-mono"
    >
      <div className="relative w-full max-w-xl bg-jet border-2 border-pink p-6 text-light shadow-[0_0_30px_rgba(255,31,142,0.3)]">
        {/* Ticket Header */}
        <div className="flex items-center justify-between border-b border-pink/30 pb-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-pink">
            <span className="w-2 h-2 bg-pink inline-block animate-ping" />
            <span id="ticket-title">
              HARDWARE BENCH TICKET // {device.id.toUpperCase()}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs border border-pink text-pink hover:bg-pink hover:text-white transition-colors"
          >
            [CLOSE]
          </button>
        </div>

        {/* Breakdown Matrix */}
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border border-light/10 p-3 bg-white/[0.02]">
            <span className="text-light/40 uppercase block text-[10px] tracking-widest mb-1">
              DEVICE CHASSIS
            </span>
            <span className="text-chartreuse font-bold">
              {device.type.toUpperCase()} — {device.model}
            </span>
          </div>

          <div className="border border-pink/30 p-3 bg-pink/[0.04]">
            <span className="text-pink uppercase block text-[10px] tracking-widest mb-1">
              SYMPTOM AT INGESTION
            </span>
            <p className="text-light/90 leading-relaxed">{device.symptom}</p>
          </div>

          <div className="border border-light/10 p-3 bg-white/[0.02]">
            <span className="text-light/40 uppercase block text-[10px] tracking-widest mb-1">
              ROOT CAUSE ANALYSIS
            </span>
            <p className="text-light/80 leading-relaxed">{device.rootCause}</p>
          </div>

          <div className="border border-chartreuse/30 p-3 bg-chartreuse/[0.04]">
            <span className="text-chartreuse uppercase block text-[10px] tracking-widest mb-1">
              BENCH REPAIR & VERIFICATION
            </span>
            <p className="text-chartreuse font-semibold leading-relaxed">
              {device.fix}
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-3 border-t border-light/10 flex items-center justify-between text-[11px] text-light/50">
          <span>STATUS: COLD BOOT POST OK</span>
          <span className="text-chartreuse">INVOICE: $0.00</span>
        </div>
      </div>
    </div>
  );
}
