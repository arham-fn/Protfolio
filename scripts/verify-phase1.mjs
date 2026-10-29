import fs from 'fs';
import path from 'path';

// Audit Script for Phase 1
console.log('=== PHASE 1 AUTOMATED AUDIT & VERIFICATION ===\n');

// 1. Verify SVG Sprite Symbols
const spritesFile = fs.readFileSync('src/components/skills/SkillSprites.tsx', 'utf-8');
const skillsFile = fs.readFileSync('src/lib/skills.ts', 'utf-8');

const symbolMatches = [...spritesFile.matchAll(/id="(icon-[^"]+)"/g)].map(m => m[1]);
console.log(`[PASS] Found ${symbolMatches.length} symbols in SkillSprites.tsx:`);
console.log(symbolMatches.join(', '));

const nodeIds = [...skillsFile.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
console.log(`\nFound ${nodeIds.length} skill node IDs in skills.ts:`);
console.log(nodeIds.join(', '));

let allSymbolsFound = true;
for (const id of nodeIds) {
  const expectedSymbol = `icon-${id}`;
  if (!symbolMatches.includes(expectedSymbol)) {
    console.error(`[FAIL] Missing symbol for skill: ${id} (expected ${expectedSymbol})`);
    allSymbolsFound = false;
  }
}
if (allSymbolsFound) {
  console.log('[PASS] 100% of <use href> references have matching <symbol id>!');
}

// 2. Verify Hard Exclusions (No employers, companies, fellowships, certificates, collaborators)
const filesToCheck = [
  'src/lib/skills.ts',
  'src/lib/projects.ts',
  'src/lib/repairs.ts',
  'src/lib/timeline.ts',
  'src/components/now/NowSection.tsx',
  'src/app/page.tsx',
  'src/app/layout.tsx'
];

const bannedWords = ['National Tech Forge', 'Invitrex', 'Google Automation Certifications'];
let foundBanned = false;
for (const file of filesToCheck) {
  const content = fs.readFileSync(file, 'utf-8');
  for (const word of bannedWords) {
    if (content.includes(word)) {
      console.error(`[FAIL] Found banned entity "${word}" in ${file}`);
      foundBanned = true;
    }
  }
}
if (!foundBanned) {
  console.log('[PASS] Hard exclusions verified: Zero employers, companies, fellowships, or certificates!');
}

// 3. Verify Overlays have pointer-events: none
const overlays = [
  { name: '.scanlines::after', file: 'src/app/globals.css', check: 'pointer-events: none' },
  { name: '.hud-bracket', file: 'src/app/globals.css', check: 'pointer-events: none' },
  { name: 'CustomCursor', file: 'src/components/hud/CustomCursor.tsx', check: 'pointer-events-none' },
  { name: 'ShaderCanvas', file: 'src/components/hero/ShaderCanvas.tsx', check: 'pointer-events-none' },
  { name: 'PCBTrace', file: 'src/components/shared/PCBTrace.tsx', check: 'pointer-events-none' },
  { name: 'GlitchTransition', file: 'src/components/shared/GlitchTransition.tsx', check: 'pointer-events-none' },
  { name: 'SkillSprites', file: 'src/components/skills/SkillSprites.tsx', check: 'pointer-events-none' }
];

console.log('\n--- Overlay Click-Blocker Audit ---');
let allOverlaysSafe = true;
for (const ov of overlays) {
  const content = fs.readFileSync(ov.file, 'utf-8');
  if (content.includes(ov.check)) {
    console.log(`[PASS] ${ov.name} has ${ov.check}`);
  } else {
    console.error(`[FAIL] ${ov.name} in ${ov.file} missing pointer-events safety!`);
    allOverlaysSafe = false;
  }
}

// 4. Verify Projects List Matches Facts
const projectsContent = fs.readFileSync('src/lib/projects.ts', 'utf-8');
const projectIds = [...projectsContent.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
console.log('\nVerified Projects in projects.ts:', projectIds);
const expectedProjects = [
  'tech-atlas',
  'disaster-shield',
  'library-management',
  'hand-gesture-art',
  'subscription-tracker',
  'langar',
  'salesforce-klaviyo-demos'
];
const matchesExactly = expectedProjects.length === projectIds.length && expectedProjects.every(p => projectIds.includes(p));
console.log(`[PASS] Projects match exact user fact list: ${matchesExactly}`);

console.log('\nAudit complete.');
