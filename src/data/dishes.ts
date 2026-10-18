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
  // 18.10.2026: hero = kotona tehty käristys liemessään (comedy_nose, CC BY 2.0). Oppikirjan annos
  // (Caiazzo) on etusivun hero, joten se ei toistu täällä; reseptikortti ilman kuvaa (vanha 2006
  // kännykkäkuva pois: väärä tai suttuinen kuva on huonompi kuin ei kuvaa).
  hero: {
    image: '/images/hero-poronkaristys-koti-1920.webp',
    srcSet: '/images/hero-poronkaristys-koti-800.webp 800w, /images/hero-poronkaristys-koti-1280.webp 1280w, /images/hero-poronkaristys-koti-1920.webp 1920w, /images/hero-poronkaristys-koti-2560.webp 2560w',
    layout: 'split',
    position: '58% 55%',
  },
  about: {
    image: '/images/poronkaristys-reindeer-snow.jpg',
  },
  recipes: [
    {
      totalTime: 'PT45M',
      category: 'Main course',
    },
    { totalTime: 'PT2H30M', category: 'Main course' },
    { totalTime: 'PT30M', category: 'Side dish' },
  ],
  suomikauppa: 'reindeer',
  // "Selaa porotilavierailuja" → Rovaniemen porotilakategoria (katalogi 30.7.: 103 tulosta).
  gyg: { path: 'rovaniemi-l2653/reindeer-farms-experiences-tc2351', sid: 'poronkaristys_reindeer_farm' },
  stay: { destination: 'Rovaniemi, Finland', sid: 'poronkaristys_stay_rovaniemi' },
  next: ['/lingonberry', '/traditional-recipes'],
  aboutSchema: 'Poronkäristys (sautéed reindeer), Finnish Lapland cuisine',
  datePublished: '2026-09-23T00:00:00+03:00',
};

/** 🔴 Ei Suomikauppa-nostoa: maitotuotteita ei nosteta (SuomikauppaPicks, 2026-08-23). */
export const LEIPAJUUSTO: DishConfig = {
  key: 'leipajuusto',
  path: '/leipajuusto',
  // 18.10.2026: hero = kokonainen juuri paistettu juusto (Ninara, CC BY 4.0, Ristijärvi); Rajalan hillokuva
  // siirtyi lämpimän juuston reseptikorttiin (vanha salamakuva pois), salaattiin paahdetut kuutiot (Nissinen).
  hero: {
    image: '/images/hero-leipajuusto-ristijarvi-1920.webp',
    srcSet: '/images/hero-leipajuusto-ristijarvi-800.webp 800w, /images/hero-leipajuusto-ristijarvi-1280.webp 1280w, /images/hero-leipajuusto-ristijarvi-1920.webp 1920w, /images/hero-leipajuusto-ristijarvi-2560.webp 2560w',
    layout: 'split',
  },
  about: {
    image: '/images/leipajuusto-wedge.jpg',
  },
  recipes: [
    {
      image: '/images/hero-leipajuusto-cloudberry.webp',
      totalTime: 'PT20M',
      category: 'Dessert',
    },
    // Kahvijuusto (18.10.2026): vanhin tapa, keitetty kahvi juuston päälle. Ei omaa kuvaa ⇒ ei kuvaa.
    { totalTime: 'PT10M', category: 'Drink' },
    {
      image: '/images/leipajuusto-1914.jpg',
      fit: 'contain',
      totalTime: 'PT13H',
      category: 'Cheese',
    },
    { image: '/images/leipajuusto-kuutiot-1600.jpg', totalTime: 'PT15M', category: 'Salad' },
  ],
  // "Selaa Lapin ruokaretkiä" → Lapin ruoka- ja juomakategoria (picks.ts CATEGORY_LINKS, 312 tulosta 30.7.).
  gyg: { path: 'lapland-finland-l2652/food-drinks-tc103', sid: 'leipajuusto_food_tour' },
  stay: { destination: 'Rovaniemi, Finland', sid: 'leipajuusto_stay_rovaniemi' },
  next: ['/cloudberry', '/traditional-recipes'],
  aboutSchema: 'Leipäjuusto, Finnish bread cheese',
  datePublished: '2026-09-23T00:00:00+03:00',
};

/** Reseptisivun nosto: järjestys = mitattu kysyntä Suomessa (14 800 / 5 400 hakua kuussa). */
export const DISHES = [PORONKARISTYS, LEIPAJUUSTO] as const;
