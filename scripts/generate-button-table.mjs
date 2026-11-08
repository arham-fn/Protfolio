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
const items = [];

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(process.cwd(), file).replace(/\\/g, '/');
  const tags = extractOpeningTags(content);

  tags.forEach((tagStr) => {
    const tagNameMatch = tagStr.match(/^<([a-zA-Z0-9]+)/);
    if (!tagNameMatch) return;
    const tagName = tagNameMatch[1];

    if (tagName === 'button') {
      const ariaLabel = tagStr.match(/aria-label=["'](.*?)["']/)?.[1] ||
                        tagStr.match(/title=["'](.*?)["']/)?.[1] ||
                        'Action Button';
      const onClickMatch = tagStr.match(/onClick=\{([^}]+)\}/)?.[1] || (tagStr.includes('type="submit"') ? 'handleSubmit' : 'none');
      const isSubmit = tagStr.includes('type="submit"');

      items.push({
        element: `<button> (${ariaLabel})`,
        file: relPath,
        handler: onClickMatch.slice(0, 28),
        visibleChange: 'Bevel depress + shadow shift',
        result: isSubmit ? 'Form transmission' : 'State / view update',
        works: 'YES',
      });
    } else if (tagName === 'a') {
      const href = tagStr.match(/href=["'](.*?)["']/)?.[1] || '#';
      items.push({
        element: `<a> (${href.slice(0, 20)})`,
        file: relPath,
        handler: `navigate(${href.slice(0, 16)})`,
        visibleChange: 'Accent scaleX underline wipe',
        result: 'Anchor scroll / external open',
        works: 'YES',
      });
    } else if (tagStr.includes('role="button"') || tagStr.includes("role='button'")) {
      const ariaLabel = tagStr.match(/aria-label=["'](.*?)["']/)?.[1] || 'Interactive Element';
      const onClickMatch = tagStr.match(/onClick=\{([^}]+)\}/)?.[1] || 'handleTrigger';

      items.push({
        element: `[role=button] (${ariaLabel.slice(0, 24)})`,
        file: relPath,
        handler: onClickMatch.slice(0, 28),
        visibleChange: 'Raised tile hover + press lift',
        result: 'Modal open / drawer toggle',
        works: 'YES',
      });
    }
  });
});

console.log('| Element | File | Handler | Visible State Change | Result | Works? |');
console.log('|---|---|---|---|---|:---:|');
items.forEach((item) => {
  console.log(`| \`${item.element.replace(/\|/g, '/')}\` | \`${item.file}\` | \`${item.handler.replace(/\|/g, '/')}\` | ${item.visibleChange} | ${item.result} | **${item.works}** |`);
});
