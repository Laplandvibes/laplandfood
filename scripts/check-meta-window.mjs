#!/usr/bin/env node
/**
 * Build stop (exit 1) for page meta that the prerender would rewrite.
 *
 * Every route in scripts/routes.json reads its <title> and meta description from
 * src/locales/<lang>/pages.json (`jsonKey`), and the page component renders the same
 * keys in the browser (<SEO titleKey descriptionKey>). One source, but the prerender
 * (scripts/_prerender_routes.mjs) edits two things on the way to the static HTML:
 *
 *  - ensureDescriptionLength extends a description under 70 characters / 100 width
 *    units with the page's own sentences and cuts one over 160 / 200; clampDescription
 *    cuts at 160 characters. A CJK character counts as 2 width units.
 *  - shortenTitle drops a " | LaplandFood" style suffix from a title over 60 characters.
 *
 * The browser shows the source text untouched, so either edit publishes a different
 * title or description than the one the browser shows (gate:meta-hydraatio). The fix
 * belongs in pages.json, never in the prerender: write the description inside the
 * window and the title without the site name (Google shows the site name separately).
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES = resolve(ROOT, 'src/locales');

// Same measure as ensureDescriptionLength in scripts/_prerender_routes.mjs.
const LEVEA = /[ᄀ-ᇿ⺀-꓏ꥠ-꥿가-퟿豈-﫿︰-﹏＀-｠￠-￦]/;
const leveys = (x) => [...String(x)].reduce((n, c) => n + (LEVEA.test(c) ? 2 : 1), 0);
const SUFFIX = /\s*[|—–·•-]\s*#?(?:LaplandFood|laplandfood)(?:\.com)?\s*$/i;

function ikkunanUlkopuolella(d) {
  const s = String(d).replace(/\s+/g, ' ').trim();
  if (s.length > 160 || leveys(s) > 200 || [...s].length > 160) return `yli 160 merkkiä / 200 leveysyksikköä (${s.length} / ${leveys(s)})`;
  if (s.length < 70 && leveys(s) < 100) return `alle 70 merkkiä / 100 leveysyksikköä (${s.length} / ${leveys(s)})`;
  return null;
}

/** pages.json lookup with the same "file.key.path" rule as readJsonLocale in the prerender. */
function lue(dir, jsonKey) {
  const parts = jsonKey.split('.');
  const [file, keyPath] = parts.length === 1 ? ['pages', parts] : [parts[0], parts.slice(1)];
  const fp = resolve(dir, `${file}.json`);
  if (!existsSync(fp)) return null;
  let cursor = JSON.parse(readFileSync(fp, 'utf8'));
  for (const p of keyPath) cursor = cursor?.[p];
  return cursor && typeof cursor === 'object' ? cursor : null;
}

const routes = JSON.parse(readFileSync(resolve(ROOT, 'scripts/routes.json'), 'utf8'));
const kielet = readdirSync(LOCALES, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();
const loydot = [];
let luettu = 0;
for (const route of routes) {
  if (route.fallbackTitle && SUFFIX.test(route.fallbackTitle)) {
    loydot.push(`  routes.json ${route.path}: fallbackTitle sisältää sivustonimen päätteen\n        ${route.fallbackTitle}`);
  }
  if (!route.jsonKey) continue;
  for (const kieli of kielet) {
    const m = lue(resolve(LOCALES, kieli), route.jsonKey);
    if (!m) continue;
    luettu++;
    if (typeof m.description === 'string') {
      const syy = ikkunanUlkopuolella(m.description);
      if (syy) loydot.push(`  ${kieli.padEnd(5)} ${route.path} (${route.jsonKey}.description): ${syy}\n        ${m.description}`);
    }
    if (typeof m.title === 'string' && SUFFIX.test(m.title)) {
      loydot.push(`  ${kieli.padEnd(5)} ${route.path} (${route.jsonKey}.title): sivustonimen pääte otsikossa\n        ${m.title}`);
    }
  }
}

if (!luettu) {
  console.error('[meta-ikkuna] 0 sivua luettu: routes.json tai src/locales/*/pages.json puuttuu.');
  process.exit(1);
}
if (loydot.length) {
  console.error(`\n[meta-ikkuna] ${loydot.length} otsikkoa tai kuvausta, jotka esirenderöinti muuttaisi: palvelimen HTML näyttäisi eri tekstin kuin selain.`);
  console.error(loydot.join('\n'));
  console.error('[meta-ikkuna] Korjaa src/locales/<kieli>/pages.json: kuvaus 70–160 merkkiä (CJK-merkki = 2, 100–200 leveysyksikköä), otsikko ilman sivustonimeä.\n');
  process.exit(1);
}
console.log(`[meta-ikkuna] ${luettu} sivun otsikko ja kuvaus esirenderöinnin ikkunassa (${kielet.length} kieltä).`);
