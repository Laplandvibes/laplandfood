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
 * 🔴 Kortin luku on RAVINTOLAN oma Google-kohde, ei hotellin. Rakas toimii
 * Arctic TreeHouse Hotelin päärakennuksessa, mutta hotellilla on oma
 * arvionsa — hotellin luvun näyttäminen ravintolan kohdalla olisi väärä luku
 * oikean näköisenä. Siksi Rakas on tässä tyhjänä kunnes sen OMA place id on
 * `laplandvibes-app-new/src/data/places.ts`:ssä ja seuraava viikkoajo on
 * hakenut sen.
 *
 *   node scripts/update-restaurant-ratings.mjs           # kirjoita
 *   node scripts/update-restaurant-ratings.mjs --check   # exit 1 jos vanhentunut
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
  // 🔴 Luku tulee vasta kun id on appin aukiolotilannekuvassa: lisää se
  // laplandvibes-app-new/src/data/places.ts:ään (+ openhours:allowlist + appin deploy),
  // ja seuraava viikkoajo hakee sen. Siihen asti tämä rivi vain varoittaa "ei tilannekuvassa".
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

if (!existsSync(SNAPSHOT)) {
  console.error(`tilannekuvaa ei löydy: ${SNAPSHOT}\nAja ensin laplandvibes-app-new: npm run openhours:refresh -- --yes`);
  process.exit(1);
}
const snap = JSON.parse(readFileSync(SNAPSHOT, 'utf8'));
const places = snap.places ?? {};
console.log(`tilannekuva ${snap.base ?? '?'} · ${Object.keys(places).length} paikkaa`);

let muuttui = 0;
let puuttuu = 0;
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
  if (changed) {
    muuttui++;
    if (!CHECK) writeFileSync(file, JSON.stringify(data, null, 2) + (raw.endsWith('\n') ? '\n' : ''), 'utf8');
    console.log(`  ${lang}: päivitetty`);
  }
}

if (CHECK && muuttui) {
  console.error(`\n✗ ${muuttui} kielitiedostoa on vanhentunut — aja ilman --check`);
  process.exit(1);
}
console.log(`\n${muuttui ? `✓ ${muuttui} kieltä päivitetty` : '✓ ajan tasalla'}${puuttuu ? ` · ${puuttuu} puuttuvaa lukua` : ''}`);
