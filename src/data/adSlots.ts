/**
 * Kumppanipaikkojen data — LaplandFood
 *
 * Etusivun standardi mainospaikat (LV Media -inventaari, jaettu malli):
 *   · MainPartnerBanner (heron alla)  = sponsors[0] (pääkumppani)
 *   · HomeAdSlots-osio (ylhäällä)     = sponsors[1] (kakkospääkumppani)
 *                                       + 6 kohdekohtaista premium-paikkaa
 *
 * Myyntiprosessi: kauppa → täytä Partner-objekti oikeaan paikkaan →
 * `npm run build` → deploy --branch=main.
 *
 * Tyhjät paikat (null) renderöivät "Haluatko mainoksesi tähän?" -house-adin
 * joka linkittää LV Media -portaaliin (/media/site/laplandfood) + GA4-event.
 */

import type { HomeAdSlotsConfig } from '../shared/HomeAdSlots';
import { DEFAULT_PREMIUM_SPOTS } from '../shared/PremiumSpotGrid';

export const AD_SLOTS: HomeAdSlotsConfig = {
  siteSlug: 'laplandfood',
  // [0] = pääkumppani (yläbanneri), [1] = kakkospääkumppani (osion kortti)
  sponsors: [null, null],
  // Oletuskohdejako: Rovaniemi, Levi, Ylläs, Saariselkä, Kittilä, Inari
  spots: DEFAULT_PREMIUM_SPOTS,
};
