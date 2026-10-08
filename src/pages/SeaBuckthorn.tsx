import BerryPage, { type BerryConfig } from './BerryPage';

/** /sea-buckthorn — tyrni. Hero: oma valokuva Perämeren rannalta 22.7.2026
 *  (tyrnin luontainen kasvupaikka on rannikko, ei sisämaa, ja sivu sanoo sen
 *  suoraan). 4.10.2026: marja-, oksa-, mehu- ja hillokuva Commonsista (tekijä
 *  kuvan päällä, src/data/photoCredits.ts); jälkiruokakuva on yhä generoitu. */
const SEA_BUCKTHORN: BerryConfig = {
  key: 'seaBuckthorn',
  path: '/sea-buckthorn',
  hero: {
    image: '/images/hero-sea-buckthorn.webp',
  },
  taste: {
    image: '/images/sea-buckthorn-berries.jpg',
  },
  versus: {
    image: '/images/sea-buckthorn-branch.jpg',
  },
  products: {
    images: ['/images/sea-buckthorn-juice.jpg', '/images/sea-buckthorn-jam.jpg', '/images/sea-buckthorn-dessert.jpg'],
  },
  // Ei GYG-nappia (8.10.2026): ainoa marjaretki on Luoston tuntureilla, ja tyrni
  // kasvaa rannikolla. Hakulinkki 'Lapland foraging tour' vei Lapin yleissivulle.
  stay: { destination: 'Tornio, Finland', sid: 'seabuckthorn_stay_tornio' },
  about: 'Sea buckthorn (Hippophae rhamnoides), Finnish wild berries',
  datePublished: '2026-09-14T00:00:00+03:00',
};

export default function SeaBuckthorn() {
  return <BerryPage cfg={SEA_BUCKTHORN} />;
}
