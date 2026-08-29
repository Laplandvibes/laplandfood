import { ArrowUpRight, Globe } from 'lucide-react'
import { useLocale } from '../i18n/useLocale'
import type { Locale } from '../i18n/config'
import { trackAffiliateClick } from '../lib/analytics'
import AffiliateDisclosure from './AffiliateDisclosure'

/**
 * Nordicbuddies (Daisycon 20538, 7 %) — the flask and the cup, not the food.
 *
 * WHY THIS EXISTS AND WHY IT IS THE ONLY NB CARD ON THIS SITE. Nordicbuddies
 * sells licensed character wear; its catalogue contains no food at all (checked
 * against the advertiser's own feed 2026-08-24: 2 532 products, zero grocery,
 * zero kitchen textiles). On a food site that makes almost every placement
 * dishonest — except one. A picking day on the fells runs for hours and the
 * coffee comes along, and the shop's drinkware is the part of its catalogue
 * that genuinely answers that. The card says out loud that this is not a food
 * shop, because the reader deserves to know what they are clicking.
 *
 * It is deliberately NOT next to the Suomikauppa berries card at the foot of
 * this page: that card answers "what if I cannot get to the bog" (jams,
 * freeze-dried berries) and this one answers "what do I carry the coffee in".
 * Different question, different shop, ~80 lines apart.
 *
 * 🔴 PIPPI, NOT MOOMIN. The catalogue is 2 225 Moomin products against 267
 * Pippi, and the Moomin thermal bottles were right there — but the network's
 * standing rule is no Moomin in an LV ad unit until Moomin Characters answers
 * in writing (moomin_note in _affiliate/creatives.json).
 *
 * Facts read from the advertiser 2026-08-24, all from its own product pages:
 * the bottle is double-walled stainless steel, 550 ml; the cup is a reusable
 * PLA take-away mug; both in stock; shipping is tracked on every option and
 * free over 60 € inside the EU, the UK and Norway. No prices in the copy —
 * they move, and a stale price is a broken promise.
 *
 * Media laplandfood.com (Daisycon 424062) was approved by the advertiser
 * 2026-08-24; the Worker picks that media from the click's originating site.
 */

const FIN_BLUE = '#002F6C'

const GO = 'https://go.laplandvibes.com/go/nordicbuddies'
const SHOP = 'https://nordicbuddies.com'

const hrefFor = (sid: string, handle: string) =>
  `${GO}?sid=${encodeURIComponent(sid)}&dest=${encodeURIComponent(`${SHOP}/products/${handle}`)}`

interface Product {
  sid: string
  handle: string
  name: string
  desc: Record<Locale, string>
}

const PRODUCTS: Product[] = [
  {
    sid: 'foraging_flask_bottle',
    // shop 2026-08-24: "Official Pippi Longstocking product", stainless steel +
    // PP lid + silicone, 550 ml, double-walled, in stock.
    handle: 'pippi-thermal-everyday-bottle-6103',
    name: 'Pippi Thermal Everyday Bottle',
    desc: {
      en: 'Double-walled stainless steel, 550 ml',
      fi: 'Kaksinkertainen teräsvaippa, 550 ml',
      de: 'Doppelwandiger Edelstahl, 550 ml',
      ja: '二重構造のステンレス、550 ml',
      es: 'Acero inoxidable de doble pared, 550 ml',
      'pt-BR': 'Aço inoxidável de parede dupla, 550 ml',
      'zh-CN': '双层不锈钢,550 毫升',
      ko: '이중벽 스테인리스, 550 ml',
      fr: 'Acier inoxydable double paroi, 550 ml',
      it: 'Acciaio inox a doppia parete, 550 ml',
      nl: 'Dubbelwandig roestvrij staal, 550 ml',
      sv: 'Dubbelväggigt rostfritt stål, 550 ml',
    },
  },
  {
    sid: 'foraging_flask_mug',
    // shop 2026-08-24: "BIODEGRADABLE TAKE-AWAY MUG … made of PLA", in stock.
    handle: 'pippi-take-away-mug',
    name: 'Pippi Take Away Mug',
    desc: {
      en: 'Reusable cup made of biodegradable PLA',
      fi: 'Uudelleenkäytettävä muki, biohajoavaa PLA:ta',
      de: 'Wiederverwendbarer Becher aus biologisch abbaubarem PLA',
      ja: '生分解性 PLA 製のくり返し使えるカップ',
      es: 'Vaso reutilizable de PLA biodegradable',
      'pt-BR': 'Copo reutilizável de PLA biodegradável',
      'zh-CN': '可重复使用的可生物降解 PLA 杯',
      ko: '생분해성 PLA 소재의 다회용 컵',
      fr: 'Gobelet réutilisable en PLA biodégradable',
      it: 'Tazza riutilizzabile in PLA biodegradabile',
      nl: 'Herbruikbare beker van biologisch afbreekbaar PLA',
      sv: 'Återanvändbar mugg i biologiskt nedbrytbar PLA',
    },
  },
]

interface Copy {
  adLabel: string
  eyebrow: string
  headline: string
  body: string
  shipping: string
  cta: string
  soldBy: string
}

const COPY: Record<Locale, Copy> = {
  en: {
    adLabel: 'Ad',
    eyebrow: 'What the coffee travels in',
    headline: 'A picking day is measured in hours, and the coffee comes along.',
    body: 'Nordicbuddies is a Helsinki company that licenses Pippi Longstocking and Mauri Kunnas. It sells no food at all — what it sells is what you carry the coffee in: a 550 ml double-walled steel bottle and a reusable cup. Tracked worldwide, free delivery over 60 € inside the EU, the UK and Norway.',
    shipping: 'Ships worldwide, tracked',
    cta: 'View product',
    soldBy: 'Sold by Nordicbuddies',
  },
  fi: {
    adLabel: 'Mainos',
    eyebrow: 'Missä kahvi kulkee',
    headline: 'Marjapäivä mitataan tunneissa, ja kahvit lähtevät mukaan.',
    body: 'Nordicbuddies on helsinkiläinen yhtiö, jolla on Peppi Pitkätossun ja Mauri Kunnaksen lisenssit. Se ei myy ruokaa lainkaan, vaan sen, missä kahvi kulkee: 550 ml:n kaksinkertaisen teräspullon ja uudelleenkäytettävän mukin. Seuranta maailmanlaajuisesti, ilmainen toimitus yli 60 € EU:ssa, Britanniassa ja Norjassa.',
    shipping: 'Toimitus maailmanlaajuisesti, seurannalla',
    cta: 'Katso tuote',
    soldBy: 'Myynti: Nordicbuddies',
  },
  de: {
    adLabel: 'Anzeige',
    eyebrow: 'Worin der Kaffee mitkommt',
    headline: 'Ein Pflücktag zählt in Stunden, und der Kaffee kommt mit.',
    body: 'Nordicbuddies ist ein Helsinkier Unternehmen mit den Lizenzen für Pippi Langstrumpf und Mauri Kunnas. Es verkauft überhaupt keine Lebensmittel — es verkauft das, worin der Kaffee mitkommt: eine doppelwandige Stahlflasche mit 550 ml und einen wiederverwendbaren Becher. Weltweit nachverfolgbar, ab 60 € versandkostenfrei in der EU, Großbritannien und Norwegen.',
    shipping: 'Weltweiter Versand, nachverfolgbar',
    cta: 'Zum Produkt',
    soldBy: 'Verkauf durch Nordicbuddies',
  },
  ja: {
    adLabel: '広告',
    eyebrow: 'コーヒーを運ぶもの',
    headline: 'ベリー摘みは時間単位。コーヒーも一緒に出かけます。',
    body: 'Nordicbuddies は長くつ下のピッピとマウリ・クンナスのライセンスを持つヘルシンキの会社です。食品はいっさい扱わず、扱うのはコーヒーを運ぶ側 — 550 ml の二重構造ステンレスボトルと、くり返し使えるカップ。追跡付きで世界中へ発送し、EU域内・イギリス・ノルウェーは 60 € 以上で送料無料。',
    shipping: '世界中へ配送・追跡付き',
    cta: '商品を見る',
    soldBy: '販売：Nordicbuddies',
  },
  es: {
    adLabel: 'Anuncio',
    eyebrow: 'En qué viaja el café',
    headline: 'Un día de recolección se mide en horas, y el café va contigo.',
    body: 'Nordicbuddies es una empresa de Helsinki con las licencias de Pippi Calzaslargas y Mauri Kunnas. No vende alimentos: vende aquello en lo que llevas el café, una botella de acero de doble pared de 550 ml y un vaso reutilizable. Seguimiento en todo el mundo y envío gratis desde 60 € en la UE, el Reino Unido y Noruega.',
    shipping: 'Envíos a todo el mundo con seguimiento',
    cta: 'Ver producto',
    soldBy: 'Vendido por Nordicbuddies',
  },
  'pt-BR': {
    adLabel: 'Anúncio',
    eyebrow: 'Onde o café viaja',
    headline: 'Um dia de colheita se mede em horas, e o café vai junto.',
    body: 'A Nordicbuddies é uma empresa de Helsinque com as licenças de Píppi Meialonga e Mauri Kunnas. Não vende alimentos: vende aquilo em que você leva o café — uma garrafa de aço de parede dupla de 550 ml e um copo reutilizável. Rastreio no mundo todo e frete grátis acima de 60 € na UE, no Reino Unido e na Noruega.',
    shipping: 'Envio mundial com rastreio',
    cta: 'Ver produto',
    soldBy: 'Vendido pela Nordicbuddies',
  },
  'zh-CN': {
    adLabel: '广告',
    eyebrow: '咖啡装在哪里',
    headline: '采摘的一天以小时计,咖啡也要一起带上。',
    body: 'Nordicbuddies 是持有长袜子皮皮与毛里·库纳斯授权的赫尔辛基公司。它完全不卖食品,卖的是装咖啡的东西:550 毫升双层不锈钢保温瓶,以及可重复使用的杯子。全球可追踪配送,欧盟、英国与挪威满 60 € 免运费。',
    shipping: '全球配送,可追踪',
    cta: '查看商品',
    soldBy: '由 Nordicbuddies 销售',
  },
  ko: {
    adLabel: '광고',
    eyebrow: '커피를 담는 것',
    headline: '열매 따는 하루는 시간 단위로 흐르고, 커피도 함께 갑니다.',
    body: 'Nordicbuddies는 삐삐 롱스타킹과 마우리 쿤나스의 라이선스를 가진 헬싱키 회사입니다. 식품은 전혀 팔지 않습니다. 파는 것은 커피를 담아 가는 쪽 — 550 ml 이중벽 스테인리스 보틀과 다회용 컵입니다. 전 세계 추적 배송, EU·영국·노르웨이는 60 € 이상 무료 배송.',
    shipping: '전 세계 배송, 추적 가능',
    cta: '상품 보기',
    soldBy: 'Nordicbuddies 판매',
  },
  fr: {
    adLabel: 'Annonce',
    eyebrow: 'Dans quoi voyage le café',
    headline: 'Une journée de cueillette se compte en heures, et le café part avec vous.',
    body: 'Nordicbuddies est une société d’Helsinki qui détient les licences de Fifi Brindacier et de Mauri Kunnas. Elle ne vend aucune nourriture : elle vend ce dans quoi vous emportez le café, une bouteille en acier double paroi de 550 ml et un gobelet réutilisable. Suivi partout dans le monde, livraison offerte dès 60 € dans l’UE, au Royaume-Uni et en Norvège.',
    shipping: 'Livraison mondiale, avec suivi',
    cta: 'Voir le produit',
    soldBy: 'Vendu par Nordicbuddies',
  },
  it: {
    adLabel: 'Annuncio',
    eyebrow: 'In cosa viaggia il caffè',
    headline: 'Una giornata di raccolta si misura in ore, e il caffè viene con te.',
    body: 'Nordicbuddies è un’azienda di Helsinki con le licenze di Pippi Calzelunghe e Mauri Kunnas. Non vende alcun alimento: vende ciò in cui porti il caffè, una bottiglia in acciaio a doppia parete da 550 ml e una tazza riutilizzabile. Tracciato in tutto il mondo, spedizione gratuita oltre 60 € in UE, Regno Unito e Norvegia.',
    shipping: 'Spedizione in tutto il mondo, tracciata',
    cta: 'Vedi il prodotto',
    soldBy: 'Venduto da Nordicbuddies',
  },
  nl: {
    adLabel: 'Advertentie',
    eyebrow: 'Waarin de koffie meegaat',
    headline: 'Een plukdag telt in uren, en de koffie gaat mee.',
    body: 'Nordicbuddies is een Helsinks bedrijf met de licenties van Pippi Langkous en Mauri Kunnas. Het verkoopt geen voedsel — het verkoopt waarin je de koffie meeneemt: een dubbelwandige stalen fles van 550 ml en een herbruikbare beker. Wereldwijd te volgen, gratis levering vanaf 60 € in de EU, het VK en Noorwegen.',
    shipping: 'Wereldwijde verzending, met track & trace',
    cta: 'Bekijk product',
    soldBy: 'Verkocht door Nordicbuddies',
  },
  sv: {
    adLabel: 'Annons',
    eyebrow: 'Vad kaffet färdas i',
    headline: 'En plockardag mäts i timmar, och kaffet följer med.',
    body: 'Nordicbuddies är ett Helsingforsföretag med licenserna för Pippi Långstrump och Mauri Kunnas. Det säljer ingen mat alls — det säljer det du bär kaffet i: en dubbelväggig stålflaska på 550 ml och en återanvändbar mugg. Spårbart över hela världen, fri frakt över 60 € inom EU, Storbritannien och Norge.',
    shipping: 'Skickar över hela världen, spårbart',
    cta: 'Se produkten',
    soldBy: 'Säljs av Nordicbuddies',
  },
}

export default function NordicbuddiesPicks({ className = '' }: { className?: string }) {
  const { locale } = useLocale()
  const c = COPY[locale] ?? COPY.en

  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-slate-900/5 sm:p-8 ${className}`}
      style={{ borderTop: `3px solid ${FIN_BLUE}` }}
      aria-label={c.headline}
    >
      <div className="mb-4 flex flex-col gap-1.5">
        <span
          className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
          style={{ backgroundColor: 'rgba(0,47,108,0.08)', color: FIN_BLUE }}
        >
          {c.adLabel}
        </span>
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: FIN_BLUE }}>
          {c.eyebrow}
        </p>
      </div>

      <h2 className="mb-3 max-w-2xl text-2xl font-bold leading-tight sm:text-3xl">{c.headline}</h2>
      <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">{c.body}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {PRODUCTS.map((p) => (
          <a
            key={p.sid}
            href={hrefFor(p.sid, p.handle)}
            target="_blank"
            rel="sponsored nofollow noopener"
            onClick={() => trackAffiliateClick(p.sid, 'nordicbuddies')}
            className="group flex flex-col rounded-2xl border bg-white p-5 no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,47,108,0.12)]"
            style={{ borderColor: 'rgba(0,47,108,0.14)' }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Nordicbuddies</p>
            <p className="mt-1 font-bold leading-snug" style={{ color: FIN_BLUE }}>
              {p.name}
            </p>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{p.desc[locale] ?? p.desc.en}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: FIN_BLUE }}>
              {c.cta}
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="flex items-center gap-2 text-sm text-slate-700">
          <Globe className="h-4 w-4 shrink-0" style={{ color: FIN_BLUE }} aria-hidden="true" />
          {c.shipping}
        </span>
        <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{c.soldBy}</p>
      </div>

      <AffiliateDisclosure variant="inline" className="mt-6" />
    </section>
  )
}
