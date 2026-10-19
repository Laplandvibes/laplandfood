import BerryPage, { type BerryConfig } from './BerryPage';

/** /sea-buckthorn — tyrni. Hero 18.10.2026: tyrnipensas marjoineen meren rannalla, Billudden,
 *  Ruotsi (CC0; vanha oma kuva Perämeren rannalta näytti pelkkää merta ilman tyrniä).
 *  Oksaosio: Kiikeli, Oulu 9.8.2026 (CC0). 4.10.2026: marja-, oksa-, mehu- ja hillokuva Commonsista (tekijä
 *  kuvan päällä, src/data/photoCredits.ts); jälkiruokakuva oli generoitu, 19.10.2026 tilalla
 *  aito tyrni-valkosuklaa-annos Tanskasta (Flickr CC BY-SA 2.0, vain pienennetty). */
const SEA_BUCKTHORN: BerryConfig = {
  key: 'seaBuckthorn',
  path: '/sea-buckthorn',
  hero: {
    image: '/images/hero-sea-buckthorn-billudden-1920.webp',
    srcSet: '/images/hero-sea-buckthorn-billudden-800.webp 800w, /images/hero-sea-buckthorn-billudden-1280.webp 1280w, /images/hero-sea-buckthorn-billudden-1920.webp 1920w, /images/hero-sea-buckthorn-billudden-2560.webp 2560w',
    position: '50% 60%',
  },
  taste: {
    image: '/images/sea-buckthorn-berries.jpg',
  },
  versus: {
    image: '/images/sea-buckthorn-oulu-1200.jpg',
  },
  products: {
    images: ['/images/sea-buckthorn-juice.jpg', '/images/sea-buckthorn-jam.jpg', '/images/sea-buckthorn-white-chocolate.jpg'],
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
