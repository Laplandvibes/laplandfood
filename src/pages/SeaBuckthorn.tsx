import BerryPage, { type BerryConfig } from './BerryPage';

/** /sea-buckthorn — tyrni. Hero: oma valokuva Perämeren rannalta 22.7.2026
 *  (tyrnin luontainen kasvupaikka on rannikko, ei sisämaa, ja sivu sanoo sen
 *  suoraan). Oksa- ja mehukuva ovat generoituja, ilman kuvatekstiä. */
const SEA_BUCKTHORN: BerryConfig = {
  key: 'seaBuckthorn',
  path: '/sea-buckthorn',
  hero: {
    image: '/images/hero-sea-buckthorn.webp',
    alt: 'Calm Gulf of Bothnia shore on a July evening, a stony beach at the right and a low forested point across the water',
  },
  taste: {
    image: '/images/sea-buckthorn-berries.jpg',
    alt: 'A metal bowl heaped with bright orange sea buckthorn berries on the weathered planks of a jetty, grey sea behind',
  },
  versus: {
    image: '/images/sea-buckthorn-branch.jpg',
    alt: 'Sea buckthorn branch heavy with orange berries and long thorns on a stony shore',
  },
  products: {
    images: ['/images/sea-buckthorn-juice.jpg', '/images/sea-buckthorn-jam.jpg', '/images/sea-buckthorn-dessert.jpg'],
    alts: [
      'A small glass of thick orange sea buckthorn juice on a wooden table, loose berries and a bottle beside it',
      'A bowl of bright orange sea buckthorn jam with dark rye bread spread with it and a wedge of hard cheese',
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
