import { ArrowUpRight } from 'lucide-react';
import { CATEGORY_LINKS, gygCategoryHref } from '../shared/gyg/picks';
import { useLocale } from '../i18n/useLocale';

/**
 * Direct GetYourGuide category links.
 *
 * 🔴 VENDORED 2026-08-10 — this copy has DIVERGED from scripts/gyg-rollout.mjs
 * on purpose; do not regenerate it over the top. The generator emits one
 * network-generic "light" theme (deep-night `#0F172A` text, `#DB2777` pills,
 * `font-bold` headings) which is the HUB's palette. On this site that shipped a
 * section in the wrong typeface and the wrong blue, sitting between two Bebas /
 * Finland-blue sections — Vesa 2026-08-10: "apua. mitä hittoa tämä on?". Type
 * and colour below follow laplandfood's own tokens, same as SisterSiteCTAs.
 *
 * This site gets category links rather than product cards on purpose: the
 * GetYourGuide supply does not honestly match what the site promises, so naming
 * four specific tours would invent relevance. The reasoning is in picks.ts.
 *
 * 🔴 The card blurbs describe the SHAPE of each category, checked against the
 * live listings on 2026-08-10 — food-drinks is overwhelmingly experiences with
 * a meal attached (reindeer farm + lunch, sauna afternoon + lunch, private
 * cabin dining), dinner-packages is evening bookings built around the table
 * (glass igloo, lavvu, wilderness cabin, sauna-and-dinner). No counts are
 * printed: the rollout recorded 312 food-drinks results on 2026-07-30 and the
 * live page showed 298 eleven days later, so a number here would be a stale
 * claim about the partner's inventory — the same reason ratings stay out.
 *
 * Price IS rendered on the product-card sites, but never as ours: it is GetYourGuide's own
 * "from" price on GYG_PRICE_AS_OF, printed with the source and that date beside
 * it. Euros — an earlier note in this codebase claimed USD, which was wrong and
 * came from a JSON-LD field the crawler never stored. No "per person" label:
 * the catalogue does not record the unit and some products are priced per group.
 *
 * Ratings and review counts stay out. We cannot keep them current, and a stale
 * "4.6 (869)" is a claim about other people's experience, not a fact.
 */

const COPY = {
  "kicker": {
    "en": "Book now",
    "fi": "Varaa heti",
    "de": "Jetzt buchen",
    "ja": "今すぐ予約",
    "es": "Reserva ya",
    "pt-BR": "Reserve agora",
    "zh-CN": "立即预订",
    "ko": "지금 예약",
    "fr": "Réservez",
    "it": "Prenoti ora",
    "nl": "Boek nu",
    "sv": "Boka nu"
  },
  "ctaProduct": {
    "en": "Check availability",
    "fi": "Katso saatavuus",
    "de": "Verfügbarkeit prüfen",
    "ja": "空き状況を見る",
    "es": "Ver disponibilidad",
    "pt-BR": "Ver disponibilidade",
    "zh-CN": "查看可订日期",
    "ko": "예약 가능 여부 확인",
    "fr": "Voir les disponibilités",
    "it": "Verifichi la disponibilità",
    "nl": "Bekijk beschikbaarheid",
    "sv": "Se tillgänglighet"
  },
  "ctaCategory": {
    "en": "Browse all",
    "fi": "Selaa kaikki",
    "de": "Alle ansehen",
    "ja": "すべて見る",
    "es": "Ver todo",
    "pt-BR": "Ver tudo",
    "zh-CN": "查看全部",
    "ko": "전체 보기",
    "fr": "Voir tout",
    "it": "Veda tutto",
    "nl": "Bekijk alles",
    "sv": "Se alla"
  },
  "via": {
    "en": "via GetYourGuide",
    "fi": "GetYourGuiden kautta",
    "de": "über GetYourGuide",
    "ja": "GetYourGuide 経由",
    "es": "con GetYourGuide",
    "pt-BR": "via GetYourGuide",
    "zh-CN": "通过 GetYourGuide",
    "ko": "GetYourGuide 제공",
    "fr": "via GetYourGuide",
    "it": "tramite GetYourGuide",
    "nl": "via GetYourGuide",
    "sv": "via GetYourGuide"
  },
  "priceFrom": {
    "en": "from",
    "fi": "alkaen",
    "de": "ab",
    "ja": "〜より",
    "es": "desde",
    "pt-BR": "a partir de",
    "zh-CN": "起价",
    "ko": "부터",
    "fr": "à partir de",
    "it": "da",
    "nl": "vanaf",
    "sv": "från"
  },
  "priceSource": {
    "en": "Price on GetYourGuide",
    "fi": "Hinta GetYourGuidessa",
    "de": "Preis auf GetYourGuide",
    "ja": "GetYourGuide の価格",
    "es": "Precio en GetYourGuide",
    "pt-BR": "Preço no GetYourGuide",
    "zh-CN": "GetYourGuide 价格",
    "ko": "GetYourGuide 가격",
    "fr": "Prix sur GetYourGuide",
    "it": "Prezzo su GetYourGuide",
    "nl": "Prijs op GetYourGuide",
    "sv": "Pris på GetYourGuide"
  },
  "headingProduct": {
    "en": "Bookable today",
    "fi": "Varattavissa tänään",
    "de": "Heute buchbar",
    "ja": "今日予約できる体験",
    "es": "Reservable hoy",
    "pt-BR": "Reservável hoje",
    "zh-CN": "今天即可预订",
    "ko": "오늘 예약 가능",
    "fr": "Réservable aujourd’hui",
    "it": "Prenotabile oggi",
    "nl": "Vandaag te boeken",
    "sv": "Bokningsbart i dag"
  },
  "ledeProduct": {
    "en": "Hand-picked food and drink experiences, bookable online through GetYourGuide.",
    "fi": "Poimitut ruoka- ja juomaelämykset, varattavissa verkossa GetYourGuiden kautta.",
    "de": "Ausgewählte Essens- und Getränkeerlebnisse, online über GetYourGuide buchbar.",
    "ja": "厳選したフード＆ドリンク体験。GetYourGuide でオンライン予約できます。",
    "es": "Experiencias de comida y bebida seleccionadas, reservables en línea con GetYourGuide.",
    "pt-BR": "Experiências de comida e bebida selecionadas, reserváveis online via GetYourGuide.",
    "zh-CN": "精选美食与饮品体验，可通过 GetYourGuide 在线预订。",
    "ko": "엄선한 음식·음료 체험. GetYourGuide에서 온라인 예약.",
    "fr": "Une sélection d'expériences culinaires, réservables en ligne via GetYourGuide.",
    "it": "Esperienze di cibo e bevande selezionate, prenotabili online tramite GetYourGuide.",
    "nl": "Geselecteerde eet- en drinkervaringen, online te boeken via GetYourGuide.",
    "sv": "Utvalda mat- och dryckesupplevelser, bokas online via GetYourGuide."
  },
  "headingCategory": {
    "en": "Bookable food experiences",
    "fi": "Varattavat ruokaelämykset",
    "de": "Buchbare kulinarische Erlebnisse",
    "ja": "予約できる食体験",
    "es": "Experiencias gastronómicas reservables",
    "pt-BR": "Experiências gastronômicas para reservar",
    "zh-CN": "可预订的美食体验",
    "ko": "예약 가능한 미식 체험",
    "fr": "Expériences culinaires à réserver",
    "it": "Esperienze gastronomiche prenotabili",
    "nl": "Boekbare culinaire ervaringen",
    "sv": "Bokningsbara matupplevelser"
  },
  "ledeCategory": {
    "en": "Food and dinner experiences across Lapland, booked online through GetYourGuide.",
    "fi": "Ruoka- ja illalliselämyksiä ympäri Lappia, varaus verkossa GetYourGuiden kautta.",
    "de": "Eine vom Partner gepflegte Liste, immer aktuell.",
    "ja": "パートナーが管理する最新のリストです。",
    "es": "Una lista mantenida por el socio, siempre actualizada.",
    "pt-BR": "Uma lista mantida pelo parceiro, sempre atual.",
    "zh-CN": "由合作伙伴维护的列表，始终保持最新。",
    "ko": "파트너가 관리하는 항상 최신 목록입니다.",
    "fr": "Une liste tenue à jour par le partenaire.",
    "it": "Un elenco aggiornato dal partner.",
    "nl": "Een door de partner bijgehouden, actuele lijst.",
    "sv": "En lista som partnern håller uppdaterad."
  }
};

export default function GygPicks() {
  const { locale: lang } = useLocale();
  const t = (m: Record<string, string>): string => m[lang] ?? m.en;
  const L = COPY;
  const rows = CATEGORY_LINKS['laplandfood-new'] ?? [];

const CAT_LABEL: Record<string, Record<string, string>> = {
  'ski-snowboard-tc146':      { en: 'Ski & snowboard', fi: 'Hiihto ja lumilautailu' },
  'snow-winter-sports-tc113': { en: 'Snow & winter sports', fi: 'Talviurheilu' },
  'food-drinks-tc103':        { en: 'Food & drinks', fi: 'Ruoka ja juoma' },
  'dinner-packages-tc100':    { en: 'Dinner packages', fi: 'Illalliskokonaisuudet' },
  'airport-transfers-tc153':  { en: 'Airport transfers', fi: 'Lentokenttäkuljetukset' },
  'transfers-tc152':          { en: 'Transfers', fi: 'Kuljetukset' },
};

/** What is actually in each category — see the file header for how this was
 *  checked. A title alone gave the reader nothing to decide on. */
const CAT_BLURB: Record<string, Record<string, string>> = {
  'food-drinks-tc103': {
    en: 'Mostly outings with the meal built in. A reindeer farm that ends at the table, a sauna afternoon with lunch, private dining in a cabin.',
    fi: 'Enimmäkseen retkiä joihin kuuluu ruoka. Porotilavierailu joka päättyy pöytään, saunailtapäivä lounaineen, yksityinen illallinen kodassa.',
    sv: 'Mest utflykter där maten ingår. En renfarm som slutar vid bordet, en bastueftermiddag med lunch, privat middag i en kåta.',
    de: 'Meist Ausflüge, bei denen das Essen dazugehört. Eine Rentierfarm, die am Tisch endet, ein Sauna-Nachmittag mit Mittagessen, privates Dinner in der Hütte.',
    fr: 'Surtout des sorties où le repas est compris. Une ferme de rennes qui finit à table, un après-midi sauna avec déjeuner, un dîner privé dans une hutte.',
    it: 'Soprattutto escursioni con il pasto incluso. Un allevamento di renne che finisce a tavola, un pomeriggio in sauna con pranzo, una cena privata in una capanna.',
    nl: 'Vooral uitstapjes waar eten bij hoort. Een rendierboerderij die aan tafel eindigt, een saunamiddag met lunch, privédiner in een hut.',
    es: 'Sobre todo excursiones con la comida incluida. Una granja de renos que acaba en la mesa, una tarde de sauna con almuerzo, una cena privada en una cabaña.',
    'pt-BR': 'Principalmente passeios com refeição incluída. Uma fazenda de renas que termina à mesa, uma tarde de sauna com almoço, um jantar privativo em uma cabana.',
    ja: '食事が組み込まれた体験が中心です。食卓で終わるトナカイ牧場、昼食つきのサウナ午後、コタでのプライベートディナー。',
    ko: '식사가 포함된 체험이 대부분입니다. 식탁에서 마무리되는 순록 농장, 점심이 딸린 사우나 오후, 코타에서의 프라이빗 디너.',
    'zh-CN': '多数是含餐的体验。以餐桌收尾的驯鹿农场、配午餐的桑拿午后、木屋里的私人晚餐。',
  },
  'dinner-packages-tc100': {
    en: 'Evenings where the table is the point. Dinner in a glass igloo or a lavvu, a wilderness cabin, sauna and dinner the same night.',
    fi: 'Iltoja joissa pöytä on pääasia. Illallinen lasi-iglussa tai kodassa, erämaamökki, sauna ja illallinen samana iltana.',
    sv: 'Kvällar där bordet är poängen. Middag i glasiglo eller kåta, en vildmarksstuga, bastu och middag samma kväll.',
    de: 'Abende, bei denen der Tisch die Hauptsache ist. Dinner im Glasiglu oder in der Kota, eine Wildnishütte, Sauna und Abendessen am selben Abend.',
    fr: 'Des soirées où la table est le sujet. Dîner en igloo de verre ou en kota, un chalet en pleine nature, sauna et dîner le même soir.',
    it: 'Serate in cui la tavola è il punto. Cena in un igloo di vetro o in una kota, una capanna nella natura, sauna e cena la stessa sera.',
    nl: 'Avonden waarop de tafel de hoofdzaak is. Diner in een glazen iglo of kota, een wildernishut, sauna en diner op dezelfde avond.',
    es: 'Noches en las que la mesa es lo importante. Cena en un iglú de cristal o en una kota, una cabaña en plena naturaleza, sauna y cena la misma noche.',
    'pt-BR': 'Noites em que a mesa é o ponto. Jantar em um iglu de vidro ou em uma kota, uma cabana na natureza, sauna e jantar na mesma noite.',
    ja: '食卓が主役の夜。グラスイグルーやコタでのディナー、原野のコテージ、サウナと夕食を同じ晩に。',
    ko: '식탁이 주인공인 저녁. 글라스 이글루나 코타에서의 디너, 야생 오두막, 사우나와 저녁 식사를 같은 밤에.',
    'zh-CN': '以餐桌为主角的夜晚。玻璃冰屋或萨米木屋里的晚餐、荒野木屋、桑拿与晚餐同一晚。',
  },
};

/** Kuva per kategoria. Kumpikin on generoitu tälle sivustolle ja kuvaa sitä
 *  mitä kategoriassa oikeasti on (ks. tiedoston alku) — ei yksittäistä tuotetta,
 *  koska emme nimeä yhtäkään retkeä. Vesa 2026-08-10: "ei kuvia tässä osiossa?" */
const CAT_IMAGE: Record<string, string> = {
  'food-drinks-tc103': '/images/gyg-food-drinks',
  'dinner-packages-tc100': '/images/gyg-dinner-packages',
};

const catKey = (path: string): string => path.split('/').pop() ?? '';
const catName = (path: string, lang: string): string => {
  const key = catKey(path);
  const m = CAT_LABEL[key];
  return m ? (m[lang] ?? m.en) : key.replace(/-tc\d+$/, '').replace(/-/g, ' ');
};
const catBlurb = (path: string, lang: string): string | null => {
  const m = CAT_BLURB[catKey(path)];
  return m ? (m[lang] ?? m.en) : null;
};

  if (!rows.length) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">{t(L.kicker)}</p>
          <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-4">
            {t(L.headingCategory)}
          </h2>
          <p className="text-base sm:text-lg text-[#002F6C]/70 max-w-2xl mx-auto">{t(L.ledeCategory)}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
        {rows.map((c) => {
          const blurb = catBlurb(c.path, lang);
          const img = CAT_IMAGE[catKey(c.path)];
          return (
          <a
            key={c.path}
            href={gygCategoryHref(c, lang)}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[#002F6C]/10 no-underline transition-all hover:border-vibe-pink/40 hover:shadow-[0_8px_28px_rgba(0,47,108,0.08)]"
          >
            {img && (
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]">
                <picture>
                  <source type="image/avif" srcSet={`${img}.avif`} />
                  <source type="image/webp" srcSet={`${img}.webp`} />
                  <img
                    src={`${img}.jpg`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>
              </div>
            )}

            <div className="flex flex-1 flex-col p-7">
              <h3 className="font-heading tracking-wide text-2xl sm:text-3xl leading-tight text-[#002F6C] transition-colors group-hover:text-vibe-pink">
                {catName(c.path, lang)}
              </h3>

              {blurb && (
                <p className="mt-3 flex-1 text-sm text-[#002F6C]/70 leading-relaxed">{blurb}</p>
              )}

              <span className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full bg-vibe-pink px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-vibe-pink/90">
                {t(L.ctaCategory)}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>

              <span className="mt-3 text-[11px] uppercase tracking-[0.12em] text-[#002F6C]/55">{t(L.via)}</span>
            </div>
          </a>
          );
        })}
        </div>
      </div>
    </section>
  );
}
