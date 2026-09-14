import BerryPage, { type BerryConfig } from './BerryPage';

/** /bilberry — mustikka. Hero ja kaksi osiokuvaa ovat omia valokuvia Sallasta
 *  11.8.2026 (kuvateksti + "Kuva: LaplandVibes" niille); piirakkakuva on
 *  generoitu ja jää ilman kuvatekstiä. */
const BILBERRY: BerryConfig = {
  key: 'bilberry',
  path: '/bilberry',
  hero: {
    image: '/images/hero-bilberry.webp',
    alt: 'Ripe bilberries on a low green shrub in a Salla forest in August',
  },
  taste: {
    image: '/images/bilberry-hand.jpg',
    alt: 'A handful of freshly picked bilberries in an open palm, pine forest behind',
    ownPhoto: true,
  },
  versus: {
    image: '/images/bilberry-fingers.jpg',
    alt: 'A single ripe bilberry held between two fingers, a lake meadow out of focus behind',
    ownPhoto: true,
  },
  products: {
    image: '/images/bilberry-pie.jpg',
    alt: 'Bilberry crumble pie on a wooden table in a cabin kitchen, a bowl of berries beside it',
  },
  gyg: { query: 'Lapland foraging tour', sid: 'bilberry_foraging_tour' },
  stay: { destination: 'Rovaniemi, Finland', sid: 'bilberry_stay_rovaniemi' },
  about: 'Bilberry (Vaccinium myrtillus), Finnish wild berries',
  datePublished: '2026-09-14T00:00:00+03:00',
};

export default function Bilberry() {
  return <BerryPage cfg={BILBERRY} />;
}
