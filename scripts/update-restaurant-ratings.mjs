#!/usr/bin/env node
/**
 * update-restaurant-ratings.mjs — Googlen arviot Michelin-sivun kortteihin
 * verkoston omasta viikkotilannekuvasta, 12 kielellä kerralla.
 *
 * MIKSI TÄMÄ ON OLEMASSA
 * ----------------------
 * Vesa 16.9.2026 katsoi sivua ja kysyi keksityistä hintaluokista: *"mitä nuo
 * euron merkit ovat? google arvostelut voisivat olla aidotkin?"* Olivat, ja ne
 * olivat jo meillä: `laplandvibes-app-new/public/data/openhours.json` sisältää
 * jokaisesta paikasta `r` (tähdet) ja `rc` (arvostelujen määrä). Se haetaan
 * viikoittain yhdellä ajolla, eli tämä data on jo maksettu — ei uutta
 * rajapintakulua eikä uutta avainta.
 *
 * 🔴🔴 ONGELMA JOTA TÄMÄ RATKAISEE. Luvut ovat 12 kielitiedostossa tekstinä.
 * Ilman tätä skriptiä ne jäätyvät siihen päivään jona ne kirjoitettiin, ja
 * "melkein oikea luku on pahempi kuin ei lukua" (laplandwork 15.9.). Nyt
 * päivitys on yksi komento, ja lähderivin päiväys päivittyy samalla.
 *
 * 🔴🔴 25.9.2026: yllä oleva lause oli EPÄTOSI 16.–25.9. Skripti kirjoitti vain
 * luvut; lähderivin päiväyksen päivitystä ei ollut koodissa lainkaan. Ensimmäinen
 * uusi viikkoajo olisi näyttänyt 25.9. luvut rivillä "tilannekuvastamme 11.9.".
 * Nyt: tilannekuvan päiväys on lähderivin VIIMEINEN päiväys, se kirjoitetaan
 * kielen omassa muodossa, ja `--check` kaatuu myös vanhaan päiväykseen.
 * 🔴 Älä kirjoita lähderiville uutta päiväystä tilannekuvan päiväyksen perään.
 *
 * 🔴 Kortin luku on RAVINTOLAN oma Google-kohde, ei hotellin. Rakas toimii
 * Arctic TreeHouse Hotelin päärakennuksessa, mutta hotellilla on oma
 * arvionsa — hotellin luvun näyttäminen ravintolan kohdalla olisi väärä luku
 * oikean näköisenä. Rakaksen oma id on appin paikkalistassa ja tilannekuvassa
 * 25.9.2026 alkaen (`laplandvibes-app-new` 6dfd988 + 2b7f132).
 *
 * Tiedostot ovat työpuussa CRLF-rivinvaihdoin (core.autocrlf): kirjoitus säilyttää
 * luetun rivinvaihdon, joten diff näyttää vain muuttuneet kentät.
 *
 *   node scripts/update-restaurant-ratings.mjs           # kirjoita
 *   node scripts/update-restaurant-ratings.mjs --check   # exit 1 jos luku tai päiväys on vanhentunut
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SNAPSHOT = join(root, '..', 'laplandvibes-app-new', 'public', 'data', 'openhours.json');
const CHECK = process.argv.includes('--check');

/** Kortin indeksi michelinDining.lapland.rooms -taulukossa → Googlen place id. */
const ROOMS = [
  { i: 0, name: 'Nili', placeId: 'ChIJvySHpvNLK0QRY-dnGYTVum4' },
  { i: 1, name: 'Aanaar', placeId: 'ChIJIVtH72oHzUURUXGuH32HCUc' },
  // Rakaksen OMA id, haettu 18.9.2026 Places Text Searchilla (1 kutsu): "Rakas Restaurant
  // & Bar", Tarvantie 3, primaryType restaurant — ei Arctic TreeHouse Hotelin id.
  // Appin paikkalistassa `rov-eat-rakas` ja viikkotilannekuvassa 25.9.2026 alkaen.
  { i: 2, name: 'Rakas', placeId: 'ChIJYwq9aixMK0QRs0fv7kPEeZY' },
];

/**
 * Numeromuodot ovat kielikonventio, eivät käännös. Väärä erotin on sama vika
 * kuin väärä luku: se kertoo lukijalle että teksti on käännetty koneella.
 */
const FMT = {
  en: { dec: '.', thou: ',', count: (n) => `${n} reviews` },
  fi: { dec: ',', thou: ' ', count: (n) => `${n} arvostelua` },
  de: { dec: ',', thou: '.', count: (n) => `${n} Bewertungen` },
  sv: { dec: ',', thou: ' ', count: (n) => `${n} recensioner` },
  fr: { dec: ',', thou: ' ', count: (n) => `${n} avis` },
  // RAE: nelinumeroiset luvut ilman erotinta.
  es: { dec: ',', thou: '', count: (n) => `${n} reseñas` },
  it: { dec: ',', thou: '.', count: (n) => `${n} recensioni` },
  nl: { dec: ',', thou: '.', count: (n) => `${n} beoordelingen` },
  'pt-BR': { dec: ',', thou: '.', count: (n) => `${n} avaliações` },
  ja: { dec: '.', thou: ',', count: (n) => `${n} 件のクチコミ` },
  ko: { dec: '.', thou: ',', count: (n) => `리뷰 ${n}개` },
  'zh-CN': { dec: '.', thou: ',', count: (n) => `${n} 条评价` },
};

function groups(n, sep) {
  const s = String(n);
  if (!sep) return s;
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

/**
 * Tilannekuvan päiväys lähderivillä, samassa muodossa kuin rivin muut päiväykset
 * (tarkistettu 25.9.2026 jokaisen kielen rivistä). `DATE_RE` tunnistaa kielen
 * päiväykset; niistä VIIMEINEN on tilannekuvan päiväys ja korvataan.
 */
const long = (locale) => (d) =>
  d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const numeric = (d) => `${d.getUTCDate()}.${d.getUTCMonth() + 1}.${d.getUTCFullYear()}`;
const DATE_FMT = {
  en: long('en-GB'),
  fi: numeric,
  sv: numeric,
  de: numeric,
  // Ranskan, italian ja portugalin kuun ensimmäinen päivä on järjestysluku (1er / 1° / 1º).
  fr: (d) => long('fr-FR')(d).replace(/^1 /, '1er '),
  es: long('es-ES'),
  it: (d) => long('it-IT')(d).replace(/^1 /, '1° '),
  nl: long('nl-NL'),
  'pt-BR': (d) => long('pt-BR')(d).replace(/^1 /, '1º '),
  ja: long('ja-JP'),
  ko: long('ko-KR'),
  'zh-CN': long('zh-CN'),
};
const DATE_RE = {
  en: /\d{1,2} (?:January|February|March|April|May|June|July|August|September|October|November|December) \d{4}/g,
  fi: /\d{1,2}\.\d{1,2}\.\d{4}/g,
  sv: /\d{1,2}\.\d{1,2}\.\d{4}/g,
  de: /\d{1,2}\.\d{1,2}\.\d{4}/g,
  fr: /\d{1,2}(?:er)? (?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre) \d{4}/g,
  es: /\d{1,2} de (?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre) de \d{4}/g,
  it: /\d{1,2}°? (?:gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre) \d{4}/g,
  nl: /\d{1,2} (?:januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december) \d{4}/g,
  'pt-BR': /\d{1,2}º? de (?:janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro) de \d{4}/g,
  ja: /\d{4}年\d{1,2}月\d{1,2}日/g,
  ko: /\d{4}년 \d{1,2}월 \d{1,2}일/g,
  'zh-CN': /\d{4}年\d{1,2}月\d{1,2}日/g,
};

if (!existsSync(SNAPSHOT)) {
  console.error(`tilannekuvaa ei löydy: ${SNAPSHOT}\nAja ensin laplandvibes-app-new: npm run openhours:refresh -- --yes`);
  process.exit(1);
}
const snap = JSON.parse(readFileSync(SNAPSHOT, 'utf8'));
const places = snap.places ?? {};
console.log(`tilannekuva ${snap.base ?? '?'} · ${Object.keys(places).length} paikkaa`);
if (!/^\d{4}-\d{2}-\d{2}$/.test(snap.base ?? '')) {
  console.error(`tilannekuvan päiväys puuttuu tai on outo: ${snap.base}`);
  process.exit(1);
}
const [by, bm, bd] = snap.base.split('-').map(Number);
const baseDate = new Date(Date.UTC(by, bm - 1, bd));

let muuttui = 0;
let puuttuu = 0;
let eiPaivaysta = 0;
for (const [lang, fmt] of Object.entries(FMT)) {
  const file = join(root, 'src', 'locales', lang, 'pages.json');
  if (!existsSync(file)) { console.warn(`  (ohi) ${lang}: ei tiedostoa`); continue; }
  const raw = readFileSync(file, 'utf8');
  const data = JSON.parse(raw);
  const rooms = data?.michelinDining?.lapland?.rooms;
  if (!Array.isArray(rooms)) { console.warn(`  (ohi) ${lang}: ei rooms-taulukkoa`); continue; }

  let changed = false;
  for (const { i, name, placeId } of ROOMS) {
    const p = places[placeId];
    if (!p || typeof p.r !== 'number') { puuttuu++; console.warn(`  ${lang}: ${name} ei tilannekuvassa`); continue; }
    const rating = p.r.toFixed(1).replace('.', fmt.dec);
    const count = fmt.count(groups(p.rc ?? 0, fmt.thou));
    if (rooms[i].rating !== rating || rooms[i].ratingCount !== count) {
      rooms[i].rating = rating;
      rooms[i].ratingCount = count;
      changed = true;
    }
  }
  // Lähderivin viimeinen päiväys = tilannekuvan päiväys.
  const sources = data.michelinDining.sources ?? '';
  const dates = [...sources.matchAll(DATE_RE[lang])];
  if (!dates.length) {
    eiPaivaysta++;
    console.error(`  ✗ ${lang}: lähderiviltä ei löydy päiväystä — tarkista DATE_RE tai rivi`);
  } else {
    const last = dates[dates.length - 1];
    const want = DATE_FMT[lang](baseDate);
    if (last[0] !== want) {
      data.michelinDining.sources = sources.slice(0, last.index) + want + sources.slice(last.index + last[0].length);
      changed = true;
    }
  }

  if (changed) {
    muuttui++;
    const eol = raw.includes('\r\n') ? '\r\n' : '\n';
    const out = (JSON.stringify(data, null, 2) + (raw.endsWith('\n') ? '\n' : '')).replace(/\n/g, eol);
    if (!CHECK) writeFileSync(file, out, 'utf8');
    console.log(`  ${lang}: päivitetty`);
  }
}

if (eiPaivaysta) {
  console.error(`\n✗ ${eiPaivaysta} kielen lähderiviltä puuttuu päiväys`);
  process.exit(1);
}
if (CHECK && muuttui) {
  console.error(`\n✗ ${muuttui} kielitiedostoa on vanhentunut — aja ilman --check`);
  process.exit(1);
}
console.log(`\n${muuttui ? `✓ ${muuttui} kieltä päivitetty` : '✓ ajan tasalla'}${puuttuu ? ` · ${puuttuu} puuttuvaa lukua` : ''}`);
