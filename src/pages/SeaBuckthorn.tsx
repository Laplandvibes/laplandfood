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
    alt: 'Calm Gulf of Bothnia shore on a July evening, a stony beach at the right and a low forested point across the water',
  },
  taste: {
    image: '/images/sea-buckthorn-berries.jpg',
    alt: 'A close-up of a heap of ripe orange sea buckthorn berries',
  },
  versus: {
    image: '/images/sea-buckthorn-branch.jpg',
    alt: 'Sea buckthorn shrubs heavy with orange berries on the Gulf of Bothnia shore at Billudden, Sweden',
  },
  products: {
    images: ['/images/sea-buckthorn-juice.jpg', '/images/sea-buckthorn-jam.jpg', '/images/sea-buckthorn-dessert.jpg'],
    alts: [
      'A bottle and a glass mug of thick, cloudy sea buckthorn juice',
      'Jars of sea buckthorn jelly and bottles of juice and liqueur on a table outside a shop on Hiddensee, Germany',
      'A quenelle of orange sea buckthorn sorbet on a dark plate with white chocolate cream and a caramel shard',
    ],
  },
  gyg: { query: 'Lapland foraging tour', sid: 'seabuckthorn_foraging_tour' },
  stay: { destination: 'Tornio, Finland', sid: 'seabuckthorn_stay_tornio' },
  about: 'Sea buckthorn (Hippophae rhamnoides), Finnish wild berries',
  datePublished: '2026-09-14T00:00:00+03:00',
};

export default function SeaBuckthorn() {
  return <BerryPage cfg={SEA_BUCKTHORN} />;
}
