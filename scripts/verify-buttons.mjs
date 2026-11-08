// Comprehensive Interactive Elements Verification Suite
import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('src');

function getFiles(dir, filter) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(full, filter));
    } else if (filter(full)) {
      results.push(full);
    }
  });
  return results;
}

// Function to extract opening tags correctly balancing braces
function extractOpeningTags(content) {
  const tags = [];
  let i = 0;
  while (i < content.length) {
    if (content[i] === '<' && /[a-zA-Z]/.test(content[i + 1])) {
      const start = i;
      let inBraces = 0;
      let inQuotes = false;
      let quoteChar = '';
      i++;
      while (i < content.length) {
        const char = content[i];
        if (inQuotes) {
          if (char === quoteChar && content[i - 1] !== '\\') {
            inQuotes = false;
          }
        } else if (char === '"' || char === "'") {
          inQuotes = true;
          quoteChar = char;
        } else if (char === '{') {
          inBraces++;
        } else if (char === '}') {
          inBraces--;
        } else if (char === '>' && inBraces === 0) {
          tags.push(content.slice(start, i + 1));
          break;
        }
        i++;
      }
    } else {
      i++;
    }
  }
  return tags;
}

const files = getFiles(SRC_DIR, (f) => f.endsWith('.tsx'));
const nonCompliant = [];
const elements = [];

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(process.cwd(), file);
  const tags = extractOpeningTags(content);

  tags.forEach((tagStr) => {
    const tagNameMatch = tagStr.match(/^<([a-zA-Z0-9]+)/);
    if (!tagNameMatch) return;
    const tagName = tagNameMatch[1];

    if (tagName === 'button') {
      const hasType = tagStr.includes('type=');
      const typeValue = tagStr.match(/type=["'](.*?)["']/)?.[1] || 'none';
      const hasOnClick = tagStr.includes('onClick');
      const isSubmit = typeValue === 'submit';
      const ariaLabel = tagStr.match(/aria-label=["'](.*?)["']/)?.[1] || 'button';

      elements.push({
        type: 'button',
        file: relPath,
        name: ariaLabel,
        hasType,
        typeValue,
        hasHandler: hasOnClick || isSubmit,
      });

      if (!hasOnClick && !isSubmit) {
        nonCompliant.push({ issue: 'Missing onClick/handler', file: relPath, snippet: tagStr.slice(0, 100) });
      }
      if (!hasType) {
        nonCompliant.push({ issue: 'Missing type attribute', file: relPath, snippet: tagStr.slice(0, 100) });
      }
    } else if (tagName === 'a') {
      const hasHref = tagStr.includes('href=');
      elements.push({
        type: 'link',
        file: relPath,
        name: tagStr.match(/href=["'](.*?)["']/)?.[1] || 'link',
        hasType: true,
        typeValue: 'link',
        hasHandler: hasHref,
      });
      if (!hasHref) {
        nonCompliant.push({ issue: 'Link missing href', file: relPath, snippet: tagStr.slice(0, 100) });
      }
    } else if (tagStr.includes('role="button"') || tagStr.includes("role='button'")) {
      const hasOnClick = tagStr.includes('onClick');
      const hasKeyDown = tagStr.includes('onKeyDown');
      const hasTabIndex = tagStr.includes('tabIndex');
      const ariaLabel = tagStr.match(/aria-label=["'](.*?)["']/)?.[1] || `${tagName} role=button`;

      elements.push({
        type: 'role=button',
        file: relPath,
        name: ariaLabel,
        hasHandler: hasOnClick,
        hasKeyboard: hasKeyDown && hasTabIndex,
      });

      if (!hasOnClick) {
        nonCompliant.push({ issue: 'role=button missing onClick', file: relPath, snippet: tagStr.slice(0, 100) });
      }
      if (!hasKeyDown || !hasTabIndex) {
        nonCompliant.push({ issue: 'role=button missing keyboard or tabIndex', file: relPath, snippet: tagStr.slice(0, 100) });
      }
    }
  });
});

console.log(`\nAudited ${elements.length} interactive elements across ${files.length} component files.`);
if (nonCompliant.length > 0) {
  console.log('\n--- NON-COMPLIANT ELEMENTS ---');
  nonCompliant.forEach((nc, i) => {
    console.log(`[${i + 1}] ${nc.issue} in ${nc.file}:\n    ${nc.snippet}\n`);
  });
  process.exit(1);
} else {
  console.log('\n[PASS] All 100% of interactive elements have handlers, types, and keyboard access!\n');
}
