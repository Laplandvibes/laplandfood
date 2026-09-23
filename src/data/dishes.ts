import type { DishConfig } from '../pages/DishPage';

/**
 * Ruokalajisivujen asetukset (23.9.2026). Erillään sivukomponenteista, jotta
 * reseptisivun nosto (/traditional-recipes) voi lukea kuvat ja polut ilman,
 * että sen laiska chunk vetää mukaan koko DishPagen.
 *
 * Kuvat ja lisenssit (kuitit: src/data/photoCredits.ts + _reissu-2026-07/KUVA-INVENTAARIO.md §6b):
 * 🔴 Poronkäristyksestä EI ole pääkuvaksi kelpaavaa aitoa annoskuvaa: omassa poolissa
 * (2 139 kuvaa) ja Juuson kansioissa ei ole annosta, ja Commonsin ainoa oikea annos on
 * 1000 × 800 kännykkäkuva vuodelta 2006. Se on reseptikortissa, pääkuvana on Kilpisjärven
 * porot tiellä (CC BY 2.0). Oikea annoskuva syntyy vain kuvaamalla itse.
 * Kuvattomat reseptit näytetään ilman kuvaa, ei väärällä kuvalla (Vesa 11.9.: ei koristekuvia).
 */
export const PORONKARISTYS: DishConfig = {
  key: 'poronkaristys',
  path: '/poronkaristys',
  hero: {
    image: '/images/hero-poronkaristys-kilpisjarvi.webp',
    alt: 'Five reindeer walking along the road at midsummer in Kilpisjärvi, Finnish Lapland, with a green fell slope behind',
  },
  about: {
    image: '/images/poronkaristys-reindeer-snow.jpg',
    alt: 'A reindeer standing in deep snow in a winter forest',
  },
  recipes: [
    {
      image: '/images/poronkaristys-plate.jpg',
      alt: 'A plate of poronkäristys: shaved reindeer on mashed potato with lingonberries and pickled cucumber',
      totalTime: 'PT45M',
      category: 'Main course',
    },
    { totalTime: 'PT2H30M', category: 'Main course' },
    { totalTime: 'PT30M', category: 'Side dish' },
  ],
  suomikauppa: 'reindeer',
  gyg: { query: 'Rovaniemi reindeer farm', sid: 'poronkaristys_reindeer_farm' },
  stay: { destination: 'Rovaniemi, Finland', sid: 'poronkaristys_stay_rovaniemi' },
  next: ['/lingonberry', '/traditional-recipes'],
  aboutSchema: 'Poronkäristys (sautéed reindeer), Finnish Lapland cuisine',
  datePublished: '2026-09-23T00:00:00+03:00',
};

/** 🔴 Ei Suomikauppa-nostoa: maitotuotteita ei nosteta (SuomikauppaPicks, 2026-08-23). */
export const LEIPAJUUSTO: DishConfig = {
  key: 'leipajuusto',
  path: '/leipajuusto',
  hero: {
    image: '/images/hero-leipajuusto-cloudberry.webp',
    alt: 'A round leipäjuusto with brown spots in a dark dish, one wedge cut and topped with cloudberry jam',
  },
  about: {
    image: '/images/leipajuusto-wedge.jpg',
    alt: 'A wedge of leipäjuusto with a brown-spotted top on a slate board',
  },
  recipes: [
    {
      image: '/images/leipajuusto-warm-jam.jpg',
      alt: 'A warm slice of leipäjuusto with jam on a plate',
      totalTime: 'PT20M',
      category: 'Dessert',
    },
    { totalTime: 'PT15M', category: 'Salad' },
    {
      image: '/images/leipajuusto-1914.jpg',
      alt: 'A round juustoleipä cheese photographed from above in 1914, black and white',
      fit: 'contain',
      totalTime: 'PT13H',
      category: 'Cheese',
    },
  ],
  gyg: { query: 'Lapland food tour', sid: 'leipajuusto_food_tour' },
  stay: { destination: 'Rovaniemi, Finland', sid: 'leipajuusto_stay_rovaniemi' },
  next: ['/cloudberry', '/traditional-recipes'],
  aboutSchema: 'Leipäjuusto, Finnish bread cheese',
  datePublished: '2026-09-23T00:00:00+03:00',
};

/** Reseptisivun nosto: järjestys = mitattu kysyntä Suomessa (14 800 / 5 400 hakua kuussa). */
export const DISHES = [PORONKARISTYS, LEIPAJUUSTO] as const;
