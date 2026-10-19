import BerryPage, { type BerryConfig } from './BerryPage';
import { Beef } from 'lucide-react';
import { GYG_BERRY_TOUR_LUOSTO } from '../lib/gyg';

/** /bilberry — mustikka. Hero ja kaksi osiokuvaa ovat omia valokuvia Sallasta
 *  11.8.2026 (kuvateksti + "Kuva: LaplandVibes" niille). 4.10.2026: piirakka ja
 *  mustikkakeitto Commonsista (tekijä kuvan päällä, src/data/photoCredits.ts);
 *  poro-mustikka-annos oli generoitu; 19.10.2026 se poistettiin ja tilalla on kuvake,
 *  koska aitoa kuvaa porosta mustikan kanssa ei löytynyt mistään lähteestä. */
const BILBERRY: BerryConfig = {
  key: 'bilberry',
  path: '/bilberry',
  hero: {
    image: '/images/hero-bilberry-salla-1920.webp',
    srcSet: '/images/hero-bilberry-salla-800.webp 800w, /images/hero-bilberry-salla-1280.webp 1280w, /images/hero-bilberry-salla-1920.webp 1920w, /images/hero-bilberry-salla-2304.webp 2304w',
    layout: 'split',
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
    images: ['/images/bilberry-pie.jpg', '/images/bilberry-soup.jpg', null],
    noPhotoIcon: Beef,
  },
  gyg: { path: GYG_BERRY_TOUR_LUOSTO, sid: 'bilberry_foraging_tour' },
  stay: { destination: 'Rovaniemi, Finland', sid: 'bilberry_stay_rovaniemi' },
  about: 'Bilberry (Vaccinium myrtillus), Finnish wild berries',
  datePublished: '2026-09-14T00:00:00+03:00',
};

export default function Bilberry() {
  return <BerryPage cfg={BILBERRY} />;
}
