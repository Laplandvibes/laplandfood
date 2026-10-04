import BerryPage, { type BerryConfig } from './BerryPage';

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
    alt: 'Ripe lingonberries on the forest floor among moss and lingonberry sprigs, pine forest, Kemijärvi, Finnish Lapland, September 2026',
  },
  taste: {
    image: '/images/lingonberry-kemijarvi.jpg',
    alt: 'Two ripe lingonberries on a sprig in thick moss, lingonberry leaves around them, Kemijärvi, September 2026',
    ownPhoto: true,
  },
  versus: {},
  products: {
    images: ['/images/lingonberry-survos.jpg', '/images/lingonberry-jam.jpg', '/images/lingonberry-vispipuuro.jpg'],
    alts: [
      'Raw lingonberries heaped beside Finnish cabbage casserole in a white bowl',
      'Thin pancakes with a small bowl of lingonberry jam',
      'A bowl of pink whipped lingonberry porridge in cold milk',
    ],
  },
  gyg: { query: 'Lapland foraging tour', sid: 'lingonberry_foraging_tour' },
  stay: { destination: 'Rovaniemi, Finland', sid: 'lingonberry_stay_rovaniemi' },
  about: 'Lingonberry (Vaccinium vitis-idaea), Finnish wild berries',
  datePublished: '2026-09-14T00:00:00+03:00',
};

export default function Lingonberry() {
  return <BerryPage cfg={LINGONBERRY} />;
}
