import type { RepairDevice } from '@/types';

export const REPAIR_STATS = {
  totalFixed: 8,
  laptops: 5,
  towers: 3,
  invoiced: 0,
  subline: 'For the love of the game.',
  closer: 'The go-to tech person for friends and family. If it won\'t POST, I\'ll find out why.',
  featuredTicket: {
    title: 'Ghost Battery Drain via powercfg',
    symptom: 'Battery dropping 100% → 15% overnight during modern standby (sleep).',
    rootCause: 'Stuck audio driver service holding active execution override via powercfg /requests.',
    fix: 'Identified culprit PID via CLI audit, cleared legacy audio service override with powercfg -requestsoverride, updated OEM INF.'
  }
};

export const REPAIR_DEVICES: RepairDevice[] = [
  {
    id: 'dev-1',
    type: 'laptop',
    model: '[PLACEHOLDER: Laptop Model 1]',
    symptom: 'Powers on, fan spins at full RPM, black display, zero error beeps.',
    rootCause: 'Oxidized DDR4 SO-DIMM pin contacts preventing early BIOS memory handshake.',
    fix: 'Unseated module, treated pins with 99% isopropyl alcohol, re-seated firmly into Slot 0.',
    diagnosis: 'ram'
  },
  {
    id: 'dev-2',
    type: 'laptop',
    model: '[PLACEHOLDER: Laptop Model 2]',
    symptom: 'Intermittent BSOD MEMORY_MANAGEMENT, random freeze under chrome workloads.',
    rootCause: 'Degraded secondary RAM module yielding bit errors at higher cell addresses.',
    fix: 'Isolated faulty stick via MemTest86, installed matched 8GB replacement SO-DIMM.',
    diagnosis: 'ram'
  },
  {
    id: 'dev-3',
    type: 'tower',
    model: '[PLACEHOLDER: Desktop PC 1]',
    symptom: 'Continuous short beep loop on cold boot; fails to hand off to bootloader.',
    rootCause: 'Dust crust bridging pin traces across dual-channel channel B slots.',
    fix: 'Deep anti-static compressed air blowout of DIMM lanes, re-seated dual sticks in slots 2 and 4.',
    diagnosis: 'ram'
  },
  {
    id: 'dev-4',
    type: 'laptop',
    model: '[PLACEHOLDER: Laptop Model 3]',
    symptom: 'Freezes instantly on OEM splash logo; BIOS reports "No Bootable Device Found".',
    rootCause: 'Controller degradation on SATA M.2 SSD entering read-only firmware lock.',
    fix: 'Extracted drive, safely pulled user data onto staging drive, replaced with NVMe PCIe SSD, re-imaged OS.',
    diagnosis: 'ssd'
  },
  {
    id: 'dev-5',
    type: 'tower',
    model: '[PLACEHOLDER: Desktop PC 2]',
    symptom: 'Instant shutdown under 3D / CPU compilation load; fan twitch on re-power.',
    rootCause: 'Capacitor whine and +12V rail voltage drop under load in low-tier OEM PSU.',
    fix: 'Tested 12V rails with digital multimeter, swapped unit for bronze-certified ATX power supply.',
    diagnosis: 'psu'
  },
  {
    id: 'dev-6',
    type: 'laptop',
    model: '[PLACEHOLDER: Laptop Model 4]',
    symptom: 'Power LED blinks orange 3 times, white 2 times; black screen.',
    rootCause: 'Dirty RAM seating after machine was dropped in a commuter backpack.',
    fix: 'Disassembled bottom casing, released retention clips, cleaned socket, re-seated.',
    diagnosis: 'ram'
  },
  {
    id: 'dev-7',
    type: 'laptop',
    model: '[PLACEHOLDER: Laptop Model 5]',
    symptom: 'Black screen after failed BIOS sleep state recovery; power draws 0.3A on meter.',
    rootCause: 'CMOS state stuck in corrupted ACPI sleep loop; RAM training incomplete.',
    fix: 'Disconnected primary battery & CMOS coin cell, drained flea power, re-seated RAM; cold POST succeeded.',
    diagnosis: 'ram'
  },
  {
    id: 'dev-8',
    type: 'tower',
    model: '[PLACEHOLDER: Desktop PC 3]',
    symptom: 'Turns on for 2 seconds then power cycles endlessly; no monitor signal.',
    rootCause: 'Single unlatched RAM latch causing partial connection on channel A.',
    fix: 'Firmly snapped retention locks on both sides; dual channel restored, POST OK.',
    diagnosis: 'ram'
  }
];

export const ALSO_TINKERS_WITH = [
  '[PLACEHOLDER: Arduino / ESP32 microcontroller dev]',
  '[PLACEHOLDER: Soldering irons & flux trace repair]',
  '[PLACEHOLDER: Custom mechanical keyboards & switch lubing]',
  '[PLACEHOLDER: Thermal paste re-pasting (Kryonaut / Arctic MX-4)]'
];
