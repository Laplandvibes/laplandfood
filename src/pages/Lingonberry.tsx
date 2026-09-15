import BerryPage, { type BerryConfig } from './BerryPage';

/** /lingonberry — puolukka. Hero: oma valokuva Sallan tunturirinteeltä
 *  (kuiva, kivinen mäntykangas, puolukan kasvupaikka). Pensaskuva on
 *  generoitu (2026 kuvapoolissa ei ole omaa lähikuvaa puolukasta), joten
 *  sillä ei ole kuvatekstiä eikä "Kuva: LaplandVibes" -merkintää. */
const LINGONBERRY: BerryConfig = {
  key: 'lingonberry',
  path: '/lingonberry',
  hero: {
    image: '/images/hero-lingonberry.webp',
    alt: 'Dry, rocky pine slope with lichen and low shrubs above the Salla forest, the kind of heath where lingonberries grow',
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
