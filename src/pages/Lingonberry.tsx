import BerryPage, { type BerryConfig } from './BerryPage';

/** /lingonberry — puolukka.
 *  Hero 18.9.2026: Wikimedia Commons, Arto J, CC BY-SA 3.0, Järvenpää 29.8.2015
 *  (Vesan lupa 18.9.). Edellinen hero oli oma kuva Sallan tunturin rakkakivikosta:
 *  väärä kasvupaikka ja ilman ainuttakaan marjaa (Vesa 15.9.: "aivan hirveä hero
 *  kuva"). Omaa puolukkakuvaa ei ole, eikä Commonsissa ole Lapissa kuvattua
 *  kaupallisesti käytettävää, joten paikka kerrotaan kuvan päällä. Tekijätieto
 *  piirtyy automaattisesti (src/data/photoCredits.ts + PageHero). Kuva on vain
 *  pienennetty: CC BY-SA -kuvaa ei rajata eikä tummenneta tiedostoon.
 *  Pensaskuva on generoitu, joten sillä ei ole kuvatekstiä eikä "Kuva: LaplandVibes" -merkintää. */
const LINGONBERRY: BerryConfig = {
  key: 'lingonberry',
  path: '/lingonberry',
  hero: {
    image: '/images/hero-lingonberry-jarvenpaa.webp',
    alt: 'A dense lingonberry patch with clusters of ripe red berries around an old tree stump, Järvenpää, Finland, August 2015',
  },
  taste: {
    image: '/images/lingonberry-shrub.jpg',
    alt: 'Lingonberry shrub with clusters of ripe red berries on pale lichen under pines',
  },
  versus: {},
  products: {
    images: ['/images/lingonberry-survos.jpg', '/images/lingonberry-jam.jpg', '/images/lingonberry-vispipuuro.jpg'],
    alts: [
      'A jar of raw crushed lingonberries with a wooden spoon, a bowl of whole berries and dark rye bread on a pine table',
      'A white bowl of cooked lingonberry jam beside a stack of golden Finnish oven-pancake squares',
      'A bowl of pale pink whipped semolina porridge with a jug of milk and loose lingonberries',
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
