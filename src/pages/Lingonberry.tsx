import BerryPage, { type BerryConfig } from './BerryPage';
import { GYG_BERRY_TOUR_LUOSTO } from '../lib/gyg';

/** /lingonberry — puolukka.
 *  🟢 23.9.2026: MOLEMMAT kuvat omia, Juuso Lahtelan kuvaamia Kemijärvellä 21.9.2026
 *  (Vesa 23.9.: "kuviin on aina täysi oikeus mitä näihin kansioihin tulee", lv_permanent_rules §37).
 *  Ennen: hero oli Wikimedia Commonsista JÄRVENPÄÄSTÄ (18.9.), koska omaa puolukkakuvaa ei
 *  ollut eikä Commonsissa Lapissa kuvattua; maku-osion kuva oli tekoälyllä tehty (14.9.).
 *  Hero on PEILATTU vaakasuunnassa: marjaterttu oli kuvan vasemmassa alakulmassa, ja
 *  työpöydällä otsikko + verho ovat vasemmalla ⇒ otsikko olisi peittänyt juuri marjat.
 *  Luontokuvassa ei ole tekstiä eikä maamerkkiä, joten peilaus ei muuta mitään totta.
 *  Omat kuvat eivät saa heroon merkintää (PageHero); maku-osio saa kuvatekstin + "Kuva:
 *  LaplandVibes" (ownPhoto), kuten mustikkasivu. Nimi ei näy: Juuson "julkiset kasvot?" auki. */
const LINGONBERRY: BerryConfig = {
  key: 'lingonberry',
  path: '/lingonberry',
  hero: {
    image: '/images/hero-lingonberry-kemijarvi.webp',
  },
  taste: {
    image: '/images/lingonberry-kemijarvi.jpg',
    ownPhoto: true,
  },
  versus: {},
  products: {
    images: ['/images/lingonberry-survos.jpg', '/images/lingonberry-jam.jpg', '/images/lingonberry-vispipuuro.jpg'],
  },
  gyg: { path: GYG_BERRY_TOUR_LUOSTO, sid: 'lingonberry_foraging_tour' },
  stay: { destination: 'Rovaniemi, Finland', sid: 'lingonberry_stay_rovaniemi' },
  about: 'Lingonberry (Vaccinium vitis-idaea), Finnish wild berries',
  datePublished: '2026-09-14T00:00:00+03:00',
};

export default function Lingonberry() {
  return <BerryPage cfg={LINGONBERRY} />;
}
