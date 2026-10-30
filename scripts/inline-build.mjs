// Inlines the built JS/CSS assets into dist/index.html so the page is self-contained.
// NOTE: replacement values must be functions — never strings with `$` sequences,
// because String.replace interprets `$&`/`$1` etc. in string replacements (esbuild
// output legitimately contains `$&` markers that would get expanded and corrupt
// the bundle).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
let html = readFileSync(join(dist, 'index.html'), 'utf8');

const used = new Set();

// Replace the whole <link> tag (not just its href attr) so no broken
// remnants are left behind.
html = html.replace(/<link\b[^>]*\bhref="(\.\/assets\/[^"]+)"[^>]*\/?>/g, (match, ref) => {
  const file = join(dist, ref.replace('./', ''));
  const content = readFileSync(file, 'utf8');
  used.add(file);
  return `<style>\n${content}\n</style>`;
});

// Replace the whole <script> tag (not just its src attr). Replacement is a
// FUNCTION so `$` sequences in the bundle are never interpreted.
html = html.replace(/<script\b[^>]*\bsrc="(\.\/assets\/[^"]+)"[^>]*>\s*<\/script>/g, (match, ref) => {
  const file = join(dist, ref.replace('./', ''));
  const content = readFileSync(file, 'utf8');
  used.add(file);
  return `<script type="module">\n${content}\n</script>`;
});

// Safety: no raw script-terminator sequences may remain inside the inline script.
const inline = html.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1] ?? '';
if (inline.includes('</script')) {
  console.error('FATAL: inline bundle still contains </script — aborting.');
  process.exit(1);
}
if (inline.length < 100_000) {
  console.error(`FATAL: inline bundle suspiciously small (${inline.length} chars).`);
  process.exit(1);
}

writeFileSync(join(dist, 'index.html'), html);
console.log(`OK: inlined ${used.size} asset(s) into dist/index.html (${inline.length} chars of JS).`);
