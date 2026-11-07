import fs from 'fs';
import path from 'path';

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║   ARHAM PORTFOLIO — COMPLETE COMPLIANCE & E2E AUDIT SUITE    ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

let failed = false;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
  } else {
    console.error(`[FAIL] ${message}`);
    failed = true;
  }
}

// --- 1. HARD EXCLUSIONS AUDIT ---
console.log('--- 1. Hard Exclusions Check ---');
const bannedEntities = [
  'National Tech Forge',
  'Invitrex',
  'Google Automation Certifications',
  'Google Cloud Certification',
  'Fellowship',
  'Meta Developer',
  'AWS Certified'
];

const allSourceFiles = [];
function collectFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (!['node_modules', '.next', 'out', '.git'].includes(ent.name)) {
        collectFiles(full);
      }
    } else if (/\.(tsx|ts|jsx|js|mjs|json|css|html)$/.test(ent.name)) {
      allSourceFiles.push(full);
    }
  }
}
collectFiles('src');
collectFiles('public');

let foundBanned = false;
for (const file of allSourceFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  for (const b of bannedEntities) {
    if (content.toLowerCase().includes(b.toLowerCase())) {
      console.error(`[FAIL] Found banned word "${b}" in ${file}`);
      foundBanned = true;
    }
  }
}
assert(!foundBanned, 'Zero employers, companies, fellowships, or certificates in codebase.');

// --- 2. VERIFIED PROJECTS CHECK ---
console.log('\n--- 2. Projects & Flagship Check ---');
const projectsFile = fs.readFileSync('src/lib/projects.ts', 'utf-8');
const expectedProjects = [
  'tech-atlas',
  'disaster-shield',
  'library-management',
  'hand-gesture-art',
  'subscription-tracker',
  'langar',
  'salesforce-klaviyo-demos'
];
const foundProjects = [...projectsFile.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
assert(
  expectedProjects.length === foundProjects.length &&
  expectedProjects.every(p => foundProjects.includes(p)),
  `Exact 7 verified projects configured: ${foundProjects.join(', ')}`
);
assert(
  projectsFile.includes("isFlagship: true") && projectsFile.includes("personal-tech-journey-tracker.vercel.app"),
  'Flagship is Tech Atlas 2026 with personal-tech-journey-tracker.vercel.app liveUrl'
);

// --- 3. HARDWARE REPAIR TELEMETRY CHECK ---
console.log('\n--- 3. Hardware Repair Telemetry Check ---');
const repairsFile = fs.readFileSync('src/lib/repairs.ts', 'utf-8');
assert(repairsFile.includes('totalFixed: 8'), 'Total fixed machines = 8');
assert(repairsFile.includes('laptops: 5'), 'Laptops = 5');
assert(repairsFile.includes('towers: 3'), 'PCs = 3');
assert(repairsFile.includes('invoiced: 0'), 'Invoiced = $0');
assert(repairsFile.includes('powercfg /requests'), 'Featured fix highlights powercfg /requests');

// --- 4. SKILL TREE ICONS & ACCESSIBILITY ---
console.log('\n--- 4. Skill Tree & SVG Sprite Check ---');
const spritesFile = fs.readFileSync('src/components/skills/SkillSprites.tsx', 'utf-8');
const skillsFile = fs.readFileSync('src/lib/skills.ts', 'utf-8');
const spriteSymbols = [...spritesFile.matchAll(/id="(icon-[^"]+)"/g)].map(m => m[1]);
const skillIds = [...skillsFile.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);

assert(skillIds.length === 18, `Exact 18 skill nodes registered in skills.ts (found ${skillIds.length})`);
assert(spriteSymbols.length === 18, `Exact 18 symbols in SkillSprites.tsx (found ${spriteSymbols.length})`);
const allMatched = skillIds.every(id => spriteSymbols.includes(`icon-${id}`));
assert(allMatched, '100% of skill IDs have matching SVG symbol IDs in sprite');

// --- 5. BEIGE BOX OS PALETTE & TOKENS ---
console.log('\n--- 5. Palette & Design Token Check ---');
const tailwindConfig = fs.readFileSync('tailwind.config.ts', 'utf-8');
const globalsCss = fs.readFileSync('src/app/globals.css', 'utf-8');

assert(globalsCss.includes('--bg: #D8D2BE'), 'Page background matches #D8D2BE');
assert(globalsCss.includes('--surface: #C7BFA6'), 'Surface matches #C7BFA6');
assert(globalsCss.includes('--primary: #F2541B'), 'Primary matches #F2541B');
assert(globalsCss.includes('--accent: #1E3FA0'), 'Accent matches #1E3FA0');
assert(globalsCss.includes('--text: #1A1814'), 'Text matches #1A1814');
assert(globalsCss.includes('--hi: #EFEADB'), 'Bevel highlight matches #EFEADB');
assert(globalsCss.includes('--lo: #8F8870'), 'Bevel shadow matches #8F8870');

// --- 6. MOBILE RATIOS & ACCESSIBILITY AUDIT ---
console.log('\n--- 6. Mobile Ratio & CSS Safety Check ---');
assert(globalsCss.includes('min-height: 100svh') && globalsCss.includes('min-height: 100dvh'), 'Uses 100svh and 100dvh');
assert(globalsCss.includes('overflow-x: clip'), 'overflow-x: clip configured to prevent horizontal bounce');
assert(globalsCss.includes('env(safe-area-inset-'), 'Safe-area-inset padding configured');
assert(globalsCss.includes('min-height: 44px'), '44px minimum tap targets enforced on bevel-btn');
assert(globalsCss.includes('@media (pointer: coarse)'), 'Pointer coarse rules present for mobile touches');

// --- 7. ACHIEVEMENTS SYSTEM CHECK ---
console.log('\n--- 7. Achievements System Check ---');
const osStoreFile = fs.readFileSync('src/hooks/useOSStore.ts', 'utf-8');
const achievementKeys = ['fix_pc', 'bios', 'konami', 'repair_3', 'terminal_3', 'hidden_floppy', 'skills_5', 'footer'];
const allAchievementsPresent = achievementKeys.every(k => osStoreFile.includes(`${k}:`));
assert(allAchievementsPresent, 'All 8 achievements defined: ' + achievementKeys.join(', '));

// --- 8. PLACEHOLDER AUDIT ---
console.log('\n--- 8. Placeholder Catalog ---');
const placeholders = new Set();
for (const file of allSourceFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const matches = [...content.matchAll(/\[PLACEHOLDER:\s*([^\]]+)\]/g)];
  for (const m of matches) {
    placeholders.add(m[1].trim());
  }
}
console.log(`Found ${placeholders.size} unique [PLACEHOLDER] tokens requiring future user content:`);
placeholders.forEach(p => console.log(`  - [PLACEHOLDER: ${p}]`));

console.log('\n══════════════════════════════════════════════════════════════');
if (failed) {
  console.error('FAILED: One or more audit checks did not pass.');
  process.exit(1);
} else {
  console.log('SUCCESS: All 8 core compliance checks PASSED with 0 errors!');
}
