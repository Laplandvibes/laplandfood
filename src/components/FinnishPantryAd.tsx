import { ArrowRight, Globe, Package } from 'lucide-react'
import { useLocale } from '../i18n/useLocale'
import type { Locale } from '../i18n/config'
import { trackAffiliateClick } from '../lib/analytics'
import AffiliateDisclosure from './AffiliateDisclosure'

/**
 * Suomikauppa.fi (Daisycon 17977, 7 %) — suomalaiset elintarvikkeet kotiin.
 *
 * Sijoitettu Local ingredients -sivulle, ja se on ainoa paikka jossa tämä
 * kortti on rehellinen: sivu kertoo mitä Lapissa syödään, ja lukija jää
 * väistämättä kysymyksen kanssa jota sivu ei ratkaise, eli mistä näitä saa
 * kotoa käsin. Kauppa on siis vastaus sivun omaan aukkoon, ei keskeytys.
 *
 * 🔴 Tähän EI tule lihatuotteita. Kaupan valikoimassa on poron kuivalihaa,
 * mutta liha ja maito pysähtyvät Britannian, Yhdysvaltojen, Japanin ja
 * Australian tuontisääntöihin, eikä tämä sivusto tiedä lukijan maata.
 * Nostetut tuoteryhmät (marjat, kahvi, ruisleipä, makeiset) ovat kuivia ja
 * säilyviä, eli ne kulkevat kaikkialle. Yksityiskohdat hubin artikkelissa
 * laplandvibes.com/blog/order-finnish-food-and-gifts-abroad.
 *
 * Media laplandfood.com (Daisycon 424062) on tilattu ja odottaa mainostajan
 * hyväksyntää; siihen asti Worker ohjaa seuraamattomasti oikeaan paikkaan.
 */

const FIN_BLUE = '#002F6C'
const SID = 'local_ingredients_pantry'
const DEST = 'https://suomikauppa.fi/collections/elintarvikkeet'
const HREF =
  'https://go.laplandvibes.com/go/suomikauppa' +
  `?sid=${SID}&dest=${encodeURIComponent(DEST)}`

interface Copy {
  adLabel: string
  eyebrow: string
  headline: string
  body: string
  worldwide: string
  oneOrder: string
  cta: string
  soldBy: string
}

const COPY: Record<Locale, Copy> = {
  en: {
    adLabel: 'Ad',
    eyebrow: 'The pantry, posted',
    headline: 'Most of what is on this page can be sent to you.',
    body: 'Lingonberry and cloudberry preserves, rye, Finnish coffee and the salted liquorice nobody warns you about. Suomikauppa ships Finnish groceries worldwide, which is how Finns abroad restock. Dry and sealed goods travel; meat and dairy mostly do not leave the EU.',
    worldwide: 'Ships worldwide',
    oneOrder: 'One order instead of five',
    cta: 'Browse Finnish groceries',
    soldBy: 'Sold by Suomikauppa.fi',
  },
  fi: {
    adLabel: 'Mainos',
    eyebrow: 'Ruokakomero postitse',
    headline: 'Suurin osa tämän sivun mauista lähtee postissa.',
    body: 'Puolukka- ja lakkahillot, ruis, suomalainen kahvi ja se salmiakki josta kukaan ei varoita. Suomikauppa toimittaa suomalaisia elintarvikkeita maailmanlaajuisesti, ja sitä kautta ulkosuomalaiset täydentävät kaappinsa. Kuivat ja suljetut tuotteet kulkevat; liha ja maito eivät useimmiten lähde EU:n ulkopuolelle.',
    worldwide: 'Toimitus maailmanlaajuisesti',
    oneOrder: 'Yksi tilaus viiden sijaan',
    cta: 'Selaa suomalaisia elintarvikkeita',
    soldBy: 'Myynti: Suomikauppa.fi',
  },
  de: {
    adLabel: 'Anzeige',
    eyebrow: 'Die Speisekammer per Post',
    headline: 'Das meiste auf dieser Seite lässt sich verschicken.',
    body: 'Preiselbeer- und Moltebeerkonfitüre, Roggen, finnischer Kaffee und der Salzlakritz, vor dem niemand warnt. Suomikauppa versendet finnische Lebensmittel weltweit, so füllen Finnen im Ausland ihre Vorräte auf. Trockene, verschlossene Ware reist; Fleisch und Milchprodukte verlassen die EU meist nicht.',
    worldwide: 'Weltweiter Versand',
    oneOrder: 'Eine Bestellung statt fünf',
    cta: 'Finnische Lebensmittel ansehen',
    soldBy: 'Verkauf durch Suomikauppa.fi',
  },
  ja: {
    adLabel: '広告',
    eyebrow: '食料棚を郵送で',
    headline: 'このページの味の多くは、そのまま送れます。',
    body: 'コケモモやクラウドベリーのジャム、ライ麦、フィンランドのコーヒー、そして誰も忠告してくれないサルミアッキ。Suomikauppa はフィンランドの食品を世界中へ発送しており、海外のフィンランド人はここで買い足します。乾いた密封品は問題なく届きますが、肉と乳製品はたいてい EU の外へは出られません。',
    worldwide: '世界中へ配送',
    oneOrder: '5回ではなく1回の注文で',
    cta: 'フィンランドの食品を見る',
    soldBy: '販売：Suomikauppa.fi',
  },
  es: {
    adLabel: 'Anuncio',
    eyebrow: 'La despensa, por correo',
    headline: 'Casi todo lo de esta página se le puede enviar.',
    body: 'Mermeladas de arándano rojo y mora ártica, centeno, café finlandés y ese regaliz salado del que nadie le avisa. Suomikauppa envía alimentos finlandeses a todo el mundo, y así reponen los finlandeses en el extranjero. Lo seco y sellado viaja; la carne y los lácteos casi nunca salen de la UE.',
    worldwide: 'Envíos a todo el mundo',
    oneOrder: 'Un pedido en vez de cinco',
    cta: 'Ver alimentos finlandeses',
    soldBy: 'Vendido por Suomikauppa.fi',
  },
  'pt-BR': {
    adLabel: 'Anúncio',
    eyebrow: 'A despensa pelo correio',
    headline: 'Quase tudo desta página pode ser enviado até você.',
    body: 'Geleias de airela e de amora-ártica, centeio, café finlandês e aquele alcaçuz salgado sobre o qual ninguém avisa. A Suomikauppa envia alimentos finlandeses para o mundo todo, e é assim que os finlandeses no exterior repõem o estoque. O que é seco e lacrado viaja; carne e laticínios quase nunca saem da UE.',
    worldwide: 'Envio para todo o mundo',
    oneOrder: 'Um pedido em vez de cinco',
    cta: 'Ver alimentos finlandeses',
    soldBy: 'Vendido pela Suomikauppa.fi',
  },
  'zh-CN': {
    adLabel: '广告',
    eyebrow: '食品柜，寄给你',
    headline: '本页的大部分味道，都能寄到你手上。',
    body: '越橘酱与云莓酱、黑麦、芬兰咖啡，还有没人事先提醒你的咸味甘草糖。Suomikauppa 把芬兰食品发往全球，旅居海外的芬兰人就是这样补货的。干燥密封的东西走得通；肉类与乳制品大多出不了欧盟。',
    worldwide: '全球配送',
    oneOrder: '一单搞定，而不是分五次',
    cta: '查看芬兰食品',
    soldBy: '由 Suomikauppa.fi 销售',
  },
  ko: {
    adLabel: '광고',
    eyebrow: '식료품 창고를 우편으로',
    headline: '이 페이지의 맛 대부분은 그대로 보낼 수 있습니다.',
    body: '링곤베리와 클라우드베리 잼, 호밀, 핀란드 커피, 그리고 아무도 미리 알려주지 않는 짭짤한 감초 사탕. Suomikauppa는 핀란드 식품을 전 세계로 배송하며, 해외의 핀란드인들은 이렇게 채워 넣습니다. 마르고 밀봉된 것은 잘 가지만, 육류와 유제품은 대개 EU 밖으로 나가지 못합니다.',
    worldwide: '전 세계 배송',
    oneOrder: '다섯 번이 아니라 한 번의 주문',
    cta: '핀란드 식품 보기',
    soldBy: 'Suomikauppa.fi 판매',
  },
  fr: {
    adLabel: 'Annonce',
    eyebrow: 'Le garde-manger, par la poste',
    headline: 'L’essentiel de cette page peut vous être expédié.',
    body: 'Confitures d’airelle et de mûre arctique, seigle, café finlandais et cette réglisse salée dont personne ne vous prévient. Suomikauppa expédie l’épicerie finlandaise dans le monde entier, et c’est ainsi que les Finlandais expatriés se réapprovisionnent. Le sec et le scellé voyagent ; la viande et les produits laitiers ne quittent presque jamais l’UE.',
    worldwide: 'Livraison dans le monde entier',
    oneOrder: 'Une commande au lieu de cinq',
    cta: 'Voir l’épicerie finlandaise',
    soldBy: 'Vendu par Suomikauppa.fi',
  },
  it: {
    adLabel: 'Annuncio',
    eyebrow: 'La dispensa, per posta',
    headline: 'Gran parte di questa pagina si può spedire.',
    body: 'Confetture di mirtillo rosso e mora artica, segale, caffè finlandese e quella liquirizia salata di cui nessuno La avverte. Suomikauppa spedisce alimentari finlandesi in tutto il mondo, ed è così che i finlandesi all’estero rifanno la scorta. Il secco e il sigillato viaggiano; carne e latticini non escono quasi mai dall’UE.',
    worldwide: 'Spedizione in tutto il mondo',
    oneOrder: 'Un ordine invece di cinque',
    cta: 'Veda gli alimentari finlandesi',
    soldBy: 'Venduto da Suomikauppa.fi',
  },
  nl: {
    adLabel: 'Advertentie',
    eyebrow: 'De voorraadkast, per post',
    headline: 'Het meeste op deze pagina kan naar u toe.',
    body: 'Vossenbes- en kruipbraamjam, rogge, Finse koffie en die gezouten drop waar niemand u voor waarschuwt. Suomikauppa verstuurt Finse levensmiddelen wereldwijd, en zo vullen Finnen in het buitenland hun kast aan. Droog en verzegeld reist; vlees en zuivel komen meestal de EU niet uit.',
    worldwide: 'Wereldwijde verzending',
    oneOrder: 'Eén bestelling in plaats van vijf',
    cta: 'Bekijk Finse levensmiddelen',
    soldBy: 'Verkocht door Suomikauppa.fi',
  },
  sv: {
    adLabel: 'Annons',
    eyebrow: 'Skafferiet, per post',
    headline: 'Det mesta på den här sidan går att skicka till dig.',
    body: 'Lingon- och hjortronsylt, råg, finskt kaffe och den saltlakrits ingen varnar dig för. Suomikauppa skickar finska matvaror över hela världen, och så fyller utlandsfinnar på skafferiet. Torrt och förslutet reser; kött och mejeri lämnar sällan EU.',
    worldwide: 'Skickar över hela världen',
    oneOrder: 'En beställning i stället för fem',
    cta: 'Se finska matvaror',
    soldBy: 'Säljs av Suomikauppa.fi',
  },
}

export default function FinnishPantryAd({ className = '' }: { className?: string }) {
  const { locale } = useLocale()
  const c = COPY[locale] ?? COPY.en

  const facts: { icon: typeof Globe; label: string }[] = [
    { icon: Globe, label: c.worldwide },
    { icon: Package, label: c.oneOrder },
  ]

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

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
        {facts.map((f) => (
          <li key={f.label} className="flex items-center gap-2 text-sm text-slate-700">
            <f.icon className="h-4 w-4 shrink-0" style={{ color: FIN_BLUE }} aria-hidden="true" />
            <span>{f.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        <a
          href={HREF}
          target="_blank"
          rel="sponsored nofollow noopener"
          onClick={() => trackAffiliateClick(SID, 'suomikauppa')}
          className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 font-semibold text-white no-underline shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          style={{ backgroundColor: FIN_BLUE, boxShadow: '0 14px 30px -12px rgba(0,47,108,0.55)' }}
        >
          {c.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
        <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{c.soldBy}</p>
      </div>

      <AffiliateDisclosure variant="inline" className="mt-6" />
    </section>
  )
}
