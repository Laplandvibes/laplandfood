import BerryPage, { type BerryConfig } from './BerryPage';
import { GYG_BERRY_TOUR_LUOSTO } from '../lib/gyg';

/** /bilberry — mustikka. Hero ja kaksi osiokuvaa ovat omia valokuvia Sallasta
 *  11.8.2026 (kuvateksti + "Kuva: LaplandVibes" niille). 4.10.2026: piirakka ja
 *  mustikkakeitto Commonsista (tekijä kuvan päällä, src/data/photoCredits.ts);
 *  poro-mustikka-annos on yhä generoitu, aitoa ei löytynyt. */
const BILBERRY: BerryConfig = {
  key: 'bilberry',
  path: '/bilberry',
  hero: {
    image: '/images/hero-bilberry.webp',
  },
  taste: {
    image: '/images/bilberry-hand.jpg',
    ownPhoto: true,
  },
  versus: {
    image: '/images/bilberry-fingers.jpg',
    ownPhoto: true,
  },
  products: {
    images: ['/images/bilberry-pie.jpg', '/images/bilberry-soup.jpg', '/images/bilberry-reindeer.jpg'],
  },
  gyg: { path: GYG_BERRY_TOUR_LUOSTO, sid: 'bilberry_foraging_tour' },
  stay: { destination: 'Rovaniemi, Finland', sid: 'bilberry_stay_rovaniemi' },
  about: 'Bilberry (Vaccinium myrtillus), Finnish wild berries',
  datePublished: '2026-09-14T00:00:00+03:00',
};

export default function Bilberry() {
  return <BerryPage cfg={BILBERRY} />;
}
