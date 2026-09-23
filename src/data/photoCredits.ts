/**
 * Avoimella lisenssillä käytettyjen kuvien tekijätiedot JA lisenssikuitti.
 *
 * 🟢 23.9.2026: puolukkasivun Commons-kuva (Järvenpää, Arto J, CC BY-SA 3.0) korvattu
 * omalla Kemijärvellä kuvatulla ⇒ taulu on tyhjä. Historia alla säilytetty.
 *
 * Vesa 18.9.2026: lupa ladata Wikimedia Commonsista puolukkasivun pääkuva
 * ("kyllä"), kun omaa puolukkakuvaa ei ole: heinäkuun 2026 ajomatkan 1 373 kuvaa
 * ja Sallan 26 kuvaa on käyty läpi, eikä niissä ole puolukkaa. Commonsista ei
 * löytynyt yhtään Lapissa kuvattua, kaupalliseen käyttöön kelpaavaa puolukkakuvaa
 * (6 hakusanaa × 500 tulosta + luokka "Vaccinium vitis-idaea in Finland",
 * suodatettu 40 Lapin paikannimellä), joten kuva on Järvenpäästä ja paikka
 * kerrotaan kuvan päällä.
 *
 * Tarkistettu 18.9.2026:
 *   - Aito valokuva: EXIF Samsung SM-G925F, 2015-08-29 12:41, sama päivä kuin Commonsissa.
 *   - Lisenssi: CC BY-SA 3.0, sallii kaupallisen käytön; ei NC eikä ND.
 *   - Ei ihmisiä, ei tekstiä, ei logoja eikä vesileimaa.
 *   - Ei käytössä muilla LV-sivustoilla; kirjattu _reissu-2026-07/KUVA-INVENTAARIO.md §6b:hen.
 *
 * 🔴 CC BY-SA -kuvaa EI rajata eikä muokata: tiedosto on alkuperäinen teos
 * pienennettynä. Rajaus tapahtuu vain CSS:n object-coverilla. Rajattu tai
 * tummennettu tiedosto olisi muokattu teos, joka pitäisi merkitä ja julkaista
 * samalla lisenssillä.
 *
 * 🔴 Tekijätieto piirtyy pääkuvan päälle automaattisesti kuvan polun perusteella
 * (`creditFor(src)` PageHerossa), ei kutsupaikassa: yhdestä unohtunut merkintä
 * olisi lisenssirikkomus juuri siellä. Sama malli kuin stayinlapland-new.
 *
 * Kuitti: lähde, tunniste, lisenssi, päivä, hinta 0 €.
 */
export type PhotoCredit = {
  /** Tekijä siinä muodossa kuin se on Commonsiin merkitty. */
  author: string;
  license: 'CC BY 2.0' | 'CC BY 2.5' | 'CC BY 4.0' | 'CC BY-SA 3.0' | 'CC BY-SA 4.0' | 'CC0 1.0';
  licenseUrl: string;
  /** Commonsin tiedostosivu: kuvaus, tekijä ja lisenssi alkuperäisessä muodossa. */
  sourceUrl: string;
  /** Tiedoston nimi Commonsissa. */
  title: string;
  /** Kuvauspaikka, näytetään tekijätiedon edessä (kielestä riippumaton paikannimi).
   *  Tyhjä, kun Commons ei kerro paikkaa: paikkaa ei arvata. */
  place: string;
  /** Kuvauspäivä Commonsin tai EXIFin mukaan. */
  taken: string;
  /** Mitä kuvalle tehtiin. */
  changes: string;
  fetched: string;
  cost: '0 €';
};

export const PHOTO_CREDITS: Record<string, PhotoCredit> = {
  // ── /poronkaristys (23.9.2026). Aitoa annoskuvaa ei ole pääkuvaksi (ks. src/data/dishes.ts).
  '/images/hero-poronkaristys-kilpisjarvi.webp': {
    author: 'Ninara',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Midsummer_in_Kilpisj%C3%A4rvi,_Lapland_(52222781661).jpg',
    title: 'Midsummer in Kilpisjärvi, Lapland (52222781661).jpg',
    place: 'Kilpisjärvi',
    taken: '2022-06-24',
    changes: 'Rajattu vasempaan osaan ja 16:9 (Mercedes ja hirsitalo pois), kahden pysäköidyn auton, matkailuauton ja farmarin rekisterikilvet ja tuulilasit sumennettu, pehmennetty (Gaussian 0,7) ja pienennetty 1920 px:ään.',
    fetched: '2026-09-23',
    cost: '0 €',
  },
  // ── /leipajuusto (23.9.2026)
  '/images/hero-leipajuusto-cloudberry.webp': {
    author: 'Teemu Rajala',
    license: 'CC BY 2.5',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.5/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Leip%C3%A4juusto_cheese_with_cloudberry_jam.jpg',
    title: 'Leipäjuusto cheese with cloudberry jam.jpg',
    place: '',
    taken: '2007-04-22',
    changes: 'Pienennetty 1920 px:ään, ei rajausta tiedostoon (rajaus vain CSS:llä).',
    fetched: '2026-09-23',
    cost: '0 €',
  },
  '/images/leipajuusto-warm-jam.jpg': {
    author: 'RaveDog; Julian Freyer',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Leipp%C3%A4juusto16122023.jpg',
    title: 'Leippäjuusto16122023.jpg',
    place: '',
    taken: '2023-12-16',
    changes: 'Pienennetty 1200 px:ään. Hillon lajia ei kerrota (tiedosto sanoo vain "mit Konfitüre").',
    fetched: '2026-09-23',
    cost: '0 €',
  },
  '/images/leipajuusto-wedge.jpg': {
    author: 'Raimond Spekking',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Leip%C3%A4juusto-3479.jpg',
    title: 'Leipäjuusto-3479.jpg',
    place: '',
    taken: '2017-10-19',
    changes: 'Vain pienennetty 1200 px:ään (BY-SA: ei rajausta eikä muuta muokkausta). Ei jakokortissa.',
    fetched: '2026-09-23',
    cost: '0 €',
  },
  '/images/leipajuusto-1914.jpg': {
    author: 'Museovirasto',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Juustoleip%C3%A4_1914_(KK1178-936).tif',
    title: 'Juustoleipä 1914 (KK1178-936).tif',
    place: '',
    taken: '1914-02-28',
    changes: 'Skannauksen reunat ja pisteviiva rajattu pois, pienennetty 1100 px:ään.',
    fetched: '2026-09-23',
    cost: '0 €',
  },
};

/**
 * Kuvat, jotka EIVÄT vaadi tekijämerkintää, mutta joiden lähde ja lisenssi kirjataan
 * (verkoston sääntö: kuitti jokaisesta kuvasta, CLAUDE.md "Images"). Ei piirry sivulle.
 */
export const STOCK_RECEIPTS: Record<string, { source: string; url: string; assetId: string; author: string; published: string; retrieved: string; license: string; checks: string; changes: string }> = {
  '/images/poronkaristys-plate.jpg': {
    source: 'Wikimedia Commons',
    url: 'https://commons.wikimedia.org/wiki/File:Poronk%C3%A4ristys.jpg',
    assetId: 'File:Poronkäristys.jpg',
    author: 'Htm',
    published: '2006-04-10 (kuvattu), ladattu Commonsiin 2007-10-10',
    retrieved: '2026-09-23',
    license: 'Public domain',
    checks: 'Aito annos (poronkäristys, perunamuusi, puolukat, suolakurkut); ei ihmisiä. Kuvattu ravintolassa, jota ei nimetä kuvatekstissä.',
    changes: 'Ei muutoksia (1000 × 800, uudelleenpakattu).',
  },
  '/images/poronkaristys-reindeer-snow.jpg': {
    source: 'Pexels',
    url: 'https://www.pexels.com/photo/reindeer-grazing-on-snowy-terrain-in-winter-5592614/',
    assetId: '5592614',
    author: 'Francesco Ungaro',
    published: '2020-10-13',
    retrieved: '2026-09-23',
    license: 'Pexels License (kaupallinen käyttö, ei tekijämerkintää)',
    checks: 'Ei ihmisiä; ladattu ennen 2023 (ei tekoälyepäilyä); aihe poro. Kuvauspaikka tuntematon, joten alt-teksti ei väitä Lappia.',
    changes: 'Pienennetty 1200 px:ään.',
  },
};

/**
 * 🔴 Avaimet normalisoidaan ajossa. Buildin `scripts/version-images.mjs` lisää
 * jokaiseen kuvapolkuun `?v=<hash>` — myös TÄMÄN taulun avaimiin, koska ne ovat
 * merkkijonoja bundlessa. Mitattu 18.9.2026: dev-palvelimella tekijätieto näkyi,
 * livessä ei, koska avain oli `…jarvenpaa.webp?v=d0fe534c` ja haku vertasi
 * ilman tunnistetta. Verifioi aina buildista tai livestä, ei dev-palvelimelta.
 */
const BY_PATH: Record<string, PhotoCredit> = Object.fromEntries(
  Object.entries(PHOTO_CREDITS).map(([k, v]) => [k.split('?')[0], v]),
);

/** Pääkuvan tekijätieto polun perusteella; `.jpg`- ja `.webp`-versio ovat sama kuva. */
export function creditFor(src?: string): PhotoCredit | undefined {
  if (!src) return undefined;
  const path = src.split('?')[0];
  return BY_PATH[path] ?? BY_PATH[path.replace(/\.jpg$/, '.webp')];
}
