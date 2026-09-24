// Inserts soft hyphens into Mongolian justified text in the built site.
//
// Browsers ship no Mongolian hyphenation dictionary, so `hyphens: auto` does
// nothing for it and justified lines open wide gaps between long words. This
// runs after `hugo` and writes U+00AD soft hyphens, from the TeX
// hyph-mn-cyrl patterns, into every element marked `data-hyphenate` on a
// Mongolian page. A soft hyphen is invisible unless the line breaks there.
//
// English pages are left alone: the browser hyphenates English itself.
//
//   node scripts/hyphenate.mjs [siteDir]    (default: public)
//
// Run it with no argument after a local build to see the result; the
// development server does not run it.

import fs from 'node:fs';
import path from 'node:path';
import mn from 'hyphen/mn-cyrl/index.js';

const { hyphenateHTMLSync } = mn;

const SHY = '\u00AD';
// The inside of a tag, where quoted attribute values may contain ">" — as a
// Tailwind class such as [&>:last-child]:mb-0 does — so a plain [^>]* would
// end the tag early.
const ATTRS = `(?:"[^"]*"|'[^']*'|[^'">])*`;
// Fewest letters left on either side of a break. Two-letter fragments such
// as "Ла-" or "-ав" read as mistakes rather than as hyphenation.
const MIN_EDGE = 3;

// Merge fragments shorter than MIN_EDGE at either end of a word back into
// their neighbour.
export function tidy(html) {
  return html.replace(/[\p{L}\u00AD]*\u00AD[\p{L}\u00AD]*/gu, word => {
    const parts = word.split(SHY);
    while (parts.length > 1 && parts[0].length < MIN_EDGE) parts.splice(0, 2, parts[0] + parts[1]);
    while (parts.length > 1 && parts.at(-1).length < MIN_EDGE) parts.splice(-2, 2, parts.at(-2) + parts.at(-1));
    return parts.join(SHY);
  });
}

// Hyphenate the inner HTML of each element carrying data-hyphenate. The end
// of the element is found by counting nested tags of the same name, so a
// footnote <div> inside a <div> body does not end it early.
export function hyphenatePage(html) {
  if (!/<html[^>]*\slang="?mn/i.test(html)) return html;
  let out = '';
  let pos = 0;
  const open = new RegExp(`<([a-z][a-z0-9]*)\\b${ATTRS}?\\sdata-hyphenate\\b${ATTRS}>`, 'gi');
  for (let m; (m = open.exec(html)); ) {
    const tag = m[1].toLowerCase();
    const start = m.index + m[0].length;
    const tags = new RegExp(`<(/?)${tag}\\b${ATTRS}>`, 'gi');
    tags.lastIndex = start;
    let depth = 1;
    let end = html.length;
    for (let t; depth && (t = tags.exec(html)); ) {
      depth += t[1] ? -1 : 1;
      if (!depth) end = t.index;
    }
    out += html.slice(pos, start) + tidy(hyphenateHTMLSync(html.slice(start, end), { hyphenChar: SHY }));
    pos = end;
    open.lastIndex = end;
  }
  return out + html.slice(pos);
}

function* htmlFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(p);
    else if (entry.name.endsWith('.html')) yield p;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = process.argv[2] || 'public';
  let changed = 0;
  for (const file of htmlFiles(dir)) {
    const html = fs.readFileSync(file, 'utf8');
    const result = hyphenatePage(html);
    if (result !== html) { fs.writeFileSync(file, result); changed++; }
  }
  console.log(`hyphenate: ${changed} Mongolian page(s) updated in ${dir}`);
}
