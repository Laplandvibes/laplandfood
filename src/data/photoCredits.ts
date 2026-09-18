/**
 * Avoimella lisenssillä käytettyjen kuvien tekijätiedot JA lisenssikuitti.
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
  license: 'CC BY 2.0' | 'CC BY-SA 3.0' | 'CC BY-SA 4.0' | 'CC0 1.0';
  licenseUrl: string;
  /** Commonsin tiedostosivu: kuvaus, tekijä ja lisenssi alkuperäisessä muodossa. */
  sourceUrl: string;
  /** Tiedoston nimi Commonsissa. */
  title: string;
  /** Kuvauspaikka, näytetään tekijätiedon edessä (kielestä riippumaton paikannimi). */
  place: string;
  /** Kuvauspäivä Commonsin tai EXIFin mukaan. */
  taken: string;
  /** Mitä kuvalle tehtiin. */
  changes: string;
  fetched: string;
  cost: '0 €';
};

export const PHOTO_CREDITS: Record<string, PhotoCredit> = {
  '/images/hero-lingonberry-jarvenpaa.webp': {
    author: 'Arto J',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cowberries,_J%C3%A4rvenp%C3%A4%C3%A4,_Finland_-_panoramio.jpg',
    title: 'Cowberries, Järvenpää, Finland - panoramio.jpg',
    place: 'Järvenpää',
    taken: '2015-08-29 12:41',
    changes: 'Vain pienennys 5312 × 2988 → 1920 × 1080 px ja WebP/JPEG-muunnos, ei rajausta.',
    fetched: '2026-09-18',
    cost: '0 €',
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
