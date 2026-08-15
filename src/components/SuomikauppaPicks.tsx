import { ArrowUpRight, Globe } from 'lucide-react'
import { useLocale } from '../i18n/useLocale'
import type { Locale } from '../i18n/config'
import { trackAffiliateClick } from '../lib/analytics'
import AffiliateDisclosure from './AffiliateDisclosure'

/**
 * Suomikauppa.fi-tuotenostot (Daisycon 17977) — kolme tuotetta per opassivu,
 * dest-syvälinkit suoraan tuotesivuille redirect-Workerin kautta.
 *
 * Sisarkomponentti FinnishPantryAd:lle (Local ingredients -sivun yleiskortti):
 * sama visuaalinen kieli (valkoinen kortti, Suomi-sininen yläreuna, mainos-
 * merkintä, inline-disclosure) ja sama kielimekanismi (inline COPY per locale),
 * mutta tuotetasolla. Jokainen nosto vastaa sivun omaan aiheeseen:
 *   · berries → marjaopas (ForagingGuide): hillot + pakastekuivattu mustikka
 *   · rye     → perinneruokaopas (TraditionalRecipes): ruisleipäklassikot
 *   · coffee  → retkiopas (FoodTours): pannukahvi + nuotiokahvipannu
 *
 * 🔴 Tähän EI tule liha- eikä maitotuotteita: ne pysähtyvät UK/US/JP/AU-
 * tuontisääntöihin eikä sivusto tiedä lukijan maata. Kaikki nostot ovat
 * kuivia/suljettuja ja säilyviä. Ei hintoja copyssa (vanhenevat), ei
 * terveysväitteitä, ei keksittyjä faktoja.
 *
 * Tuotteet valittu katalogista 2026-08-15 varianttitason available=true
 * -ehdolla + kuvallisina. Jos tuote poistuu valikoimasta, Worker ohjaa dest-
 * URL:iin joka 404:aa kaupassa — vaihda silloin handle tähän tiedostoon.
 */

const FIN_BLUE = '#002F6C'

export type SuomikauppaPicksVariant = 'berries' | 'rye' | 'coffee'

interface Product {
  sid: string
  handle: string
  brand: string
  /** Tuotenimi kaupan mukaan (erisnimi — ei käännetä). */
  name: string
  desc: Record<Locale, string>
}

function hrefFor(sid: string, handle: string): string {
  const dest = `https://suomikauppa.fi/products/${handle}`
  return `https://go.laplandvibes.com/go/suomikauppa?sid=${sid}&dest=${encodeURIComponent(dest)}`
}

const PRODUCTS: Record<SuomikauppaPicksVariant, Product[]> = {
  berries: [
    {
      sid: 'food_guide_berries_bilberry_jam',
      handle: 'finnish-flavours-suomalainen-mustikkahillo-400g',
      brand: 'Finnish Flavours',
      name: 'Mustikkahillo',
      desc: {
        en: 'Finnish bilberry jam',
        fi: 'Suomalainen mustikkahillo',
        de: 'Finnische Heidelbeerkonfitüre',
        ja: 'フィンランドのビルベリージャム',
        es: 'Mermelada finlandesa de arándano',
        'pt-BR': 'Geleia finlandesa de mirtilo-silvestre',
        'zh-CN': '芬兰野生蓝莓果酱',
        ko: '핀란드 빌베리 잼',
        fr: 'Confiture finlandaise de myrtille sauvage',
        it: 'Confettura finlandese di mirtillo',
        nl: 'Finse bosbessenjam',
        sv: 'Finsk blåbärssylt',
      },
    },
    {
      sid: 'food_guide_berries_lingonberry_jam',
      handle: 'finnish-flavours-suomalainen-puolukkahillo-400g',
      brand: 'Finnish Flavours',
      name: 'Puolukkahillo',
      desc: {
        en: 'Finnish lingonberry jam',
        fi: 'Suomalainen puolukkahillo',
        de: 'Finnische Preiselbeerkonfitüre',
        ja: 'フィンランドのコケモモジャム',
        es: 'Mermelada finlandesa de arándano rojo',
        'pt-BR': 'Geleia finlandesa de airela',
        'zh-CN': '芬兰越橘果酱',
        ko: '핀란드 링곤베리 잼',
        fr: "Confiture finlandaise d'airelle rouge",
        it: 'Confettura finlandese di mirtillo rosso',
        nl: 'Finse vossenbessenjam',
        sv: 'Finsk lingonsylt',
      },
    },
    {
      sid: 'food_guide_berries_dried_bilberry',
      handle: 'poikain-parhaat-pakastekuivattu-mustikka-15g',
      brand: 'Poikain Parhaat',
      name: 'Pakastekuivattu mustikka',
      desc: {
        en: 'Freeze-dried whole bilberries',
        fi: 'Pakastekuivattua mustikkaa sellaisenaan',
        de: 'Gefriergetrocknete Heidelbeeren',
        ja: 'フリーズドライのビルベリー',
        es: 'Arándanos liofilizados enteros',
        'pt-BR': 'Mirtilos-silvestres liofilizados',
        'zh-CN': '冻干整颗野生蓝莓',
        ko: '통째로 동결건조한 빌베리',
        fr: 'Myrtilles sauvages lyophilisées',
        it: 'Mirtilli liofilizzati interi',
        nl: 'Gevriesdroogde hele bosbessen',
        sv: 'Frystorkade hela blåbär',
      },
    },
  ],
  rye: [
    {
      sid: 'food_guide_rye_jalkiuuni',
      handle: 'oululainen-jalkiuuni-aito-ruis-4kpl-240g',
      brand: 'Oululainen',
      name: 'Jälkiuuni Aito Ruis',
      desc: {
        en: 'Slow-baked wholegrain rye bread',
        fi: 'Hitaasti paistettu täysjyväruisleipä',
        de: 'Langsam gebackenes Vollkorn-Roggenbrot',
        ja: 'じっくり焼いた全粒ライ麦パン',
        es: 'Pan de centeno integral de horneado lento',
        'pt-BR': 'Pão de centeio integral de forno lento',
        'zh-CN': '慢烤全麦黑麦面包',
        ko: '천천히 구운 통곡물 호밀빵',
        fr: 'Pain de seigle complet cuit lentement',
        it: 'Pane di segale integrale a cottura lenta',
        nl: 'Langzaam gebakken volkoren roggebrood',
        sv: 'Långbakat fullkornsrågbröd',
      },
    },
    {
      sid: 'food_guide_rye_hapankorppu',
      handle: 'vaasan-hapankorppu-original-200g',
      brand: 'Vaasan',
      name: 'Hapankorppu Original',
      desc: {
        en: 'Thin wholegrain rye crispbread',
        fi: 'Ohut täysjyväruishapankorppu',
        de: 'Dünnes Roggen-Knäckebrot',
        ja: '薄焼きライ麦クリスプブレッド',
        es: 'Pan crujiente fino de centeno integral',
        'pt-BR': 'Pão crocante fino de centeio integral',
        'zh-CN': '全麦黑麦薄脆面包',
        ko: '얇은 통곡물 호밀 크리스프브레드',
        fr: 'Pain croustillant fin de seigle complet',
        it: 'Pane croccante sottile di segale integrale',
        nl: 'Dun volkoren roggeknäckebröd',
        sv: 'Tunt knäckebröd av fullkornsråg',
      },
    },
    {
      sid: 'food_guide_rye_flakes',
      handle: 'myllarin-luomu-ruishiutale-500g',
      brand: 'Myllärin',
      name: 'Luomu Ruishiutale',
      desc: {
        en: 'Organic rye flakes for porridge and baking',
        fi: 'Luomuruishiutaleita puuroon ja leivontaan',
        de: 'Bio-Roggenflocken für Brei und Gebäck',
        ja: 'オーガニックのライ麦フレーク、お粥や焼き菓子に',
        es: 'Copos de centeno ecológicos para gachas y horneado',
        'pt-BR': 'Flocos de centeio orgânicos para mingau e pães',
        'zh-CN': '有机黑麦片，煮粥烘焙皆宜',
        ko: '죽과 베이킹용 유기농 호밀 플레이크',
        fr: 'Flocons de seigle bio pour porridge et boulange',
        it: 'Fiocchi di segale bio per porridge e forno',
        nl: 'Biologische roggevlokken voor pap en bakken',
        sv: 'Ekologiska rågflingor till gröt och bak',
      },
    },
  ],
  coffee: [
    {
      sid: 'food_guide_coffee_kulta_katriina',
      handle: 'meira-kulta-katriina-perinteinen-500g-pannujauhatus-kahvi',
      brand: 'Kulta Katriina',
      name: 'Perinteinen pannukahvi',
      desc: {
        en: 'Traditional coarse grind for pot brewing',
        fi: 'Perinteinen karkea pannujauhatus',
        de: 'Traditionell grob gemahlen für die Kanne',
        ja: 'ポット抽出用の伝統的な粗挽き',
        es: 'Molienda gruesa tradicional para hervir',
        'pt-BR': 'Moagem grossa tradicional para café de panela',
        'zh-CN': '传统粗研磨，适合壶煮',
        ko: '주전자 추출용 전통 굵은 분쇄',
        fr: 'Mouture grossière traditionnelle pour la casserole',
        it: 'Macinatura grossa tradizionale per il bricco',
        nl: 'Traditionele grove maling voor potkoffie',
        sv: 'Traditionellt grovmalet kokkaffe',
      },
    },
    {
      sid: 'food_guide_coffee_juhla_mokka',
      handle: 'paulig-juhla-mokka-pannujauhatus-500g',
      brand: 'Paulig',
      name: 'Juhla Mokka pannujauhatus',
      desc: {
        en: 'Light-roast classic in pot grind',
        fi: 'Vaaleapaahtoinen klassikko pannujauhatuksella',
        de: 'Hell gerösteter Klassiker, grob gemahlen',
        ja: '浅煎りの定番、粗挽きタイプ',
        es: 'Clásico de tueste claro, molienda gruesa',
        'pt-BR': 'Clássico de torra clara, moagem grossa',
        'zh-CN': '浅焙经典，壶煮研磨',
        ko: '라이트 로스트 클래식, 주전자용 분쇄',
        fr: 'Classique en torréfaction claire, mouture grossière',
        it: 'Classico a tostatura chiara, macinatura grossa',
        nl: 'Licht gebrande klassieker, grove maling',
        sv: 'Ljusrostad klassiker, kokmalen',
      },
    },
    {
      sid: 'food_guide_coffee_pot',
      handle: 'muurikka-nuotiokahvipannu-1-5-l',
      brand: 'Muurikka',
      name: 'Nuotiokahvipannu 1,5 l',
      desc: {
        en: 'The campfire coffee pot itself',
        fi: 'Itse nuotiokahvipannu',
        de: 'Die Lagerfeuer-Kaffeekanne selbst',
        ja: '焚き火用コーヒーポットそのもの',
        es: 'La cafetera de fogata en sí',
        'pt-BR': 'A própria cafeteira de fogueira',
        'zh-CN': '篝火咖啡壶本壶',
        ko: '모닥불 커피 주전자 그 자체',
        fr: 'La cafetière de feu de camp elle-même',
        it: 'La caffettiera da fuoco di campo',
        nl: 'De kampvuurkoffiepot zelf',
        sv: 'Själva kaffepannan för lägereld',
      },
    },
  ],
}

interface SectionCopy {
  eyebrow: string
  headline: string
  body: string
}

const SECTION_COPY: Record<SuomikauppaPicksVariant, Record<Locale, SectionCopy>> = {
  berries: {
    en: {
      eyebrow: 'The jarred shortcut',
      headline: 'Same berries, no mire required.',
      body: 'If the season is wrong or the forest is far, the pantry route exists: bilberry and lingonberry preserves made with Finnish berries, and freeze-dried berries that keep the taste sharp. Suomikauppa ships them worldwide.',
    },
    fi: {
      eyebrow: 'Purkitettu oikotie',
      headline: 'Samat marjat ilman suota.',
      body: 'Jos sesonki on väärä tai metsä kaukana, on olemassa komeroreitti: suomalaisista marjoista tehdyt mustikka- ja puolukkahillot sekä pakastekuivatut marjat, joissa maku pysyy terävänä. Suomikauppa toimittaa ne maailmanlaajuisesti.',
    },
    de: {
      eyebrow: 'Die Abkürzung im Glas',
      headline: 'Dieselben Beeren, ganz ohne Moor.',
      body: 'Wenn die Saison nicht passt oder der Wald weit weg ist, gibt es den Vorratsweg: Heidelbeer- und Preiselbeerkonfitüre aus finnischen Beeren und gefriergetrocknete Beeren, die ihren Geschmack behalten. Suomikauppa versendet sie weltweit.',
    },
    ja: {
      eyebrow: '瓶詰めの近道',
      headline: '同じベリーを、湿原へ行かずに。',
      body: '季節が合わなくても、森が遠くても、食料棚という道があります。フィンランド産ベリーのビルベリージャムとコケモモジャム、そして味がそのまま残るフリーズドライベリー。Suomikauppa が世界中へ発送します。',
    },
    es: {
      eyebrow: 'El atajo en tarro',
      headline: 'Las mismas bayas, sin pisar la turbera.',
      body: 'Si la temporada no acompaña o el bosque queda lejos, existe la vía de la despensa: mermeladas de arándano y arándano rojo hechas con bayas finlandesas, y bayas liofilizadas que conservan el sabor. Suomikauppa las envía a todo el mundo.',
    },
    'pt-BR': {
      eyebrow: 'O atalho no vidro',
      headline: 'As mesmas frutas, sem pisar no pântano.',
      body: 'Se a estação não ajuda ou a floresta fica longe, existe o caminho da despensa: geleias de mirtilo-silvestre e airela feitas com frutas finlandesas, e frutas liofilizadas que guardam o sabor. A Suomikauppa envia para o mundo todo.',
    },
    'zh-CN': {
      eyebrow: '罐子里的捷径',
      headline: '同样的浆果，不必走进沼泽。',
      body: '季节不对，森林太远，还有食品柜这条路：用芬兰浆果做的野生蓝莓酱和越橘酱，以及锁住风味的冻干浆果。Suomikauppa 发往全球。',
    },
    ko: {
      eyebrow: '병에 담긴 지름길',
      headline: '같은 베리, 습지는 건너뛰고.',
      body: '계절이 맞지 않거나 숲이 멀다면 식료품 창고라는 길이 있습니다. 핀란드 베리로 만든 빌베리 잼과 링곤베리 잼, 맛이 그대로 남는 동결건조 베리. Suomikauppa가 전 세계로 배송합니다.',
    },
    fr: {
      eyebrow: 'Le raccourci en bocal',
      headline: 'Les mêmes baies, sans traverser la tourbière.',
      body: "Si la saison ne s'y prête pas ou si la forêt est loin, il reste la voie du garde-manger : confitures de myrtille sauvage et d'airelle rouge aux baies finlandaises, et baies lyophilisées qui gardent leur goût. Suomikauppa les expédie dans le monde entier.",
    },
    it: {
      eyebrow: 'La scorciatoia in vasetto',
      headline: 'Le stesse bacche, senza torbiera.',
      body: "Se la stagione è sbagliata o il bosco è lontano, c'è la via della dispensa: confetture di mirtillo e mirtillo rosso fatte con bacche finlandesi, e bacche liofilizzate che conservano il gusto. Suomikauppa le spedisce in tutto il mondo.",
    },
    nl: {
      eyebrow: 'De kortere weg in een pot',
      headline: 'Dezelfde bessen, zonder het veen in.',
      body: 'Als het seizoen niet meezit of het bos ver weg is, is er de voorraadkastroute: bosbessen- en vossenbessenjam van Finse bessen, en gevriesdroogde bessen die hun smaak houden. Suomikauppa verstuurt ze wereldwijd.',
    },
    sv: {
      eyebrow: 'Genvägen på burk',
      headline: 'Samma bär, utan myren.',
      body: 'Om säsongen är fel eller skogen långt borta finns skafferivägen: blåbärs- och lingonsylt gjord på finska bär, och frystorkade bär som behåller smaken. Suomikauppa skickar dem över hela världen.',
    },
  },
  rye: {
    en: {
      eyebrow: 'The other Arctic staple',
      headline: 'Gahkku you bake. Rye you can order.',
      body: 'Beside every stew in Finnish Lapland sits dark rye — dense slow-baked loaves and thin crispbread that were made to keep through long winters. Suomikauppa ships the classics worldwide, flakes for the porridge pot included.',
    },
    fi: {
      eyebrow: 'Se toinen arktinen perusruoka',
      headline: 'Gahkun leivot itse. Rukiin voi tilata.',
      body: 'Suomen Lapissa padan vieressä on tumma ruis — tiiviit, hitaasti paistetut limput ja ohut hapankorppu, jotka tehtiin kestämään pitkät talvet. Suomikauppa toimittaa klassikot maailmanlaajuisesti, puuropadan hiutaleet mukaan lukien.',
    },
    de: {
      eyebrow: 'Das andere arktische Grundnahrungsmittel',
      headline: 'Gahkku backt man selbst. Roggen kann man bestellen.',
      body: 'Neben jedem Schmortopf in Finnisch-Lappland liegt dunkler Roggen — dichte, langsam gebackene Laibe und dünnes Knäckebrot, gemacht, um lange Winter zu überstehen. Suomikauppa versendet die Klassiker weltweit, Flocken für den Breitopf inklusive.',
    },
    ja: {
      eyebrow: 'もうひとつの北極の主食',
      headline: 'ガフクは自分で焼く。ライ麦は注文できる。',
      body: 'フィンランド・ラップランドでは、煮込みの傍らにいつも黒いライ麦パンがあります。ぎっしり詰まったじっくり焼きのパンと薄いクリスプブレッドは、長い冬を越すために生まれたもの。Suomikauppa が定番を世界中へ届けます。お粥用のフレークも。',
    },
    es: {
      eyebrow: 'El otro básico ártico',
      headline: 'El gahkku se hornea. El centeno se pide.',
      body: 'Junto a cada guiso de la Laponia finlandesa hay centeno oscuro: hogazas densas de horneado lento y pan crujiente fino, hechos para aguantar inviernos largos. Suomikauppa envía los clásicos a todo el mundo, copos para las gachas incluidos.',
    },
    'pt-BR': {
      eyebrow: 'O outro básico do Ártico',
      headline: 'Gahkku você assa. Centeio dá para pedir.',
      body: 'Ao lado de cada ensopado da Lapônia finlandesa há centeio escuro: pães densos de forno lento e pão crocante fino, feitos para durar invernos longos. A Suomikauppa envia os clássicos para o mundo todo, flocos para o mingau incluídos.',
    },
    'zh-CN': {
      eyebrow: '另一种北极主食',
      headline: 'Gahkku 自己烤，黑麦可以下单。',
      body: '在芬兰拉普兰，每一锅炖菜旁边都有深色黑麦——扎实的慢烤面包和薄脆面包，本就是为熬过漫长冬天而生。Suomikauppa 把这些经典发往全球，煮粥用的麦片也在内。',
    },
    ko: {
      eyebrow: '또 하나의 북극 주식',
      headline: '가흐쿠는 직접 굽고, 호밀은 주문하면 됩니다.',
      body: '핀란드 라플란드에서는 스튜 옆에 늘 어두운 호밀빵이 놓입니다. 촘촘하게 천천히 구운 빵과 얇은 크리스프브레드는 긴 겨울을 버티기 위해 만들어졌습니다. Suomikauppa가 이 클래식들을 전 세계로 배송합니다. 죽 끓일 플레이크까지.',
    },
    fr: {
      eyebrow: "L'autre aliment de base arctique",
      headline: 'Le gahkku se pétrit. Le seigle se commande.',
      body: "À côté de chaque ragoût de Laponie finlandaise, il y a du seigle noir : des pains denses cuits lentement et un pain croustillant fin, faits pour tenir les longs hivers. Suomikauppa expédie ces classiques dans le monde entier, flocons pour le porridge compris.",
    },
    it: {
      eyebrow: "L'altro alimento base artico",
      headline: 'Il gahkku lo cuoci tu. La segale si ordina.',
      body: 'Accanto a ogni stufato della Lapponia finlandese c’è segale scura: pagnotte dense a cottura lenta e pane croccante sottile, nati per durare inverni lunghi. Suomikauppa spedisce i classici in tutto il mondo, fiocchi per il porridge compresi.',
    },
    nl: {
      eyebrow: 'Het andere Arctische hoofdvoedsel',
      headline: 'Gahkku bak je zelf. Rogge bestel je.',
      body: 'Naast elke stoofpot in Fins Lapland ligt donkere rogge — compacte, langzaam gebakken broden en dun knäckebröd, gemaakt om lange winters te doorstaan. Suomikauppa verstuurt de klassiekers wereldwijd, vlokken voor de pappot incluis.',
    },
    sv: {
      eyebrow: 'Den andra arktiska basvaran',
      headline: 'Gahkku bakar du själv. Råg går att beställa.',
      body: 'Bredvid varje gryta i finska Lappland ligger mörk råg — täta, långbakade limpor och tunt knäckebröd, gjorda för att klara långa vintrar. Suomikauppa skickar klassikerna över hela världen, grötflingor inräknade.',
    },
  },
  coffee: {
    en: {
      eyebrow: "The trail's other ritual",
      headline: 'Out here, coffee is boiled, not brewed.',
      body: 'On Lapland trails the pause matters as much as the route, and it comes with coarse-ground coffee heated in a blackened pot over the fire. The pot grind Finns take to the cabin ships worldwide — and so does the pot.',
    },
    fi: {
      eyebrow: 'Retken toinen rituaali',
      headline: 'Täällä kahvi keitetään, ei uuteta.',
      body: 'Lapin poluilla tauko on yhtä tärkeä kuin reitti, ja siihen kuuluu karkeaksi jauhettu kahvi mustuneessa pannussa nuotiolla. Pannujauhatus, jonka suomalaiset vievät mökille, lähtee postissa maailmalle — ja niin lähtee pannukin.',
    },
    de: {
      eyebrow: 'Das andere Ritual der Tour',
      headline: 'Hier draußen wird Kaffee gekocht, nicht gebrüht.',
      body: 'Auf Lapplands Pfaden zählt die Pause so viel wie die Route — mit grob gemahlenem Kaffee, der in einer geschwärzten Kanne überm Feuer heiß wird. Die Kannenmahlung, die Finnen mit zur Hütte nehmen, versendet Suomikauppa weltweit — die Kanne gleich mit.',
    },
    ja: {
      eyebrow: 'ツアーのもうひとつの儀式',
      headline: 'ここでは、コーヒーは淹れずに煮出します。',
      body: 'ラップランドの道では、休憩はルートと同じくらい大切。焚き火にかけた黒ずんだポットで粗挽きコーヒーを煮出すのがお決まりです。フィンランド人がコテージへ持っていく粗挽きは世界中へ発送できます——ポットごと。',
    },
    es: {
      eyebrow: 'El otro ritual de la ruta',
      headline: 'Aquí el café se hierve, no se filtra.',
      body: 'En los senderos de Laponia la pausa importa tanto como la ruta, y llega con café molido grueso calentado en una cafetera ennegrecida sobre el fuego. La molienda de olla que los finlandeses llevan a la cabaña se envía a todo el mundo, y la cafetera también.',
    },
    'pt-BR': {
      eyebrow: 'O outro ritual da trilha',
      headline: 'Aqui o café é fervido, não coado.',
      body: 'Nas trilhas da Lapônia a pausa importa tanto quanto o caminho, e ela vem com café de moagem grossa aquecido numa cafeteira enegrecida sobre o fogo. A moagem de panela que os finlandeses levam para o chalé é enviada para o mundo todo — e a cafeteira também.',
    },
    'zh-CN': {
      eyebrow: '旅途的另一个仪式',
      headline: '在这里，咖啡是煮出来的，不是冲出来的。',
      body: '在拉普兰的路上，停下来歇脚和赶路一样重要——粗研磨的咖啡，在火上被熏黑的壶里煮开。芬兰人带去小木屋的壶煮咖啡粉可以发往全球，咖啡壶也一样。',
    },
    ko: {
      eyebrow: '여정의 또 다른 의식',
      headline: '여기서는 커피를 내리지 않고 끓입니다.',
      body: '라플란드의 길 위에서는 쉬는 시간이 길만큼 중요합니다. 모닥불 위 그을린 주전자에서 끓인 굵은 분쇄 커피와 함께요. 핀란드인들이 오두막에 챙겨 가는 주전자용 원두가 전 세계로 배송됩니다. 주전자까지도.',
    },
    fr: {
      eyebrow: "L'autre rituel du sentier",
      headline: 'Ici, le café se fait bouillir, pas filtrer.',
      body: "Sur les sentiers de Laponie, la pause compte autant que l'itinéraire — avec un café à mouture grossière chauffé dans une cafetière noircie au feu. La mouture que les Finlandais emportent au chalet s'expédie dans le monde entier, la cafetière aussi.",
    },
    it: {
      eyebrow: "L'altro rituale del sentiero",
      headline: 'Qui il caffè si fa bollire, non filtrare.',
      body: 'Sui sentieri della Lapponia la pausa conta quanto il percorso, e arriva con caffè macinato grosso scaldato in un bricco annerito sul fuoco. La macinatura da bricco che i finlandesi portano al cottage si spedisce in tutto il mondo — e anche il bricco.',
    },
    nl: {
      eyebrow: 'Het andere ritueel van de tocht',
      headline: 'Hier wordt koffie gekookt, niet gezet.',
      body: 'Op de paden van Lapland telt de pauze net zo zwaar als de route — met grofgemalen koffie die in een zwartgeblakerde pot boven het vuur heet wordt. De potmaling die Finnen mee naar de hut nemen wordt wereldwijd verzonden, en de pot zelf ook.',
    },
    sv: {
      eyebrow: 'Turens andra ritual',
      headline: 'Här ute kokas kaffet, det bryggs inte.',
      body: 'På Lapplands leder betyder pausen lika mycket som rutten — med grovmalet kaffe som hettas upp i en svartnad panna över elden. Kokmalningen som finländare tar med till stugan skickas över hela världen, och pannan med.',
    },
  },
}

interface ChromeCopy {
  adLabel: string
  worldwide: string
  cta: string
  soldBy: string
}

/** adLabel/worldwide/soldBy sanasta sanaan samat kuin FinnishPantryAd:ssa,
 *  jotta mainosmerkintä on identtinen joka Suomikauppa-pinnalla. */
const CHROME: Record<Locale, ChromeCopy> = {
  en: { adLabel: 'Ad', worldwide: 'Ships worldwide', cta: 'View product', soldBy: 'Sold by Suomikauppa.fi' },
  fi: { adLabel: 'Mainos', worldwide: 'Toimitus maailmanlaajuisesti', cta: 'Katso tuote', soldBy: 'Myynti: Suomikauppa.fi' },
  de: { adLabel: 'Anzeige', worldwide: 'Weltweiter Versand', cta: 'Zum Produkt', soldBy: 'Verkauf durch Suomikauppa.fi' },
  ja: { adLabel: '広告', worldwide: '世界中へ配送', cta: '商品を見る', soldBy: '販売：Suomikauppa.fi' },
  es: { adLabel: 'Anuncio', worldwide: 'Envíos a todo el mundo', cta: 'Ver producto', soldBy: 'Vendido por Suomikauppa.fi' },
  'pt-BR': { adLabel: 'Anúncio', worldwide: 'Envio para todo o mundo', cta: 'Ver produto', soldBy: 'Vendido pela Suomikauppa.fi' },
  'zh-CN': { adLabel: '广告', worldwide: '全球配送', cta: '查看商品', soldBy: '由 Suomikauppa.fi 销售' },
  ko: { adLabel: '광고', worldwide: '전 세계 배송', cta: '상품 보기', soldBy: 'Suomikauppa.fi 판매' },
  fr: { adLabel: 'Annonce', worldwide: 'Livraison dans le monde entier', cta: 'Voir le produit', soldBy: 'Vendu par Suomikauppa.fi' },
  it: { adLabel: 'Annuncio', worldwide: 'Spedizione in tutto il mondo', cta: 'Vedi il prodotto', soldBy: 'Venduto da Suomikauppa.fi' },
  nl: { adLabel: 'Advertentie', worldwide: 'Wereldwijde verzending', cta: 'Bekijk product', soldBy: 'Verkocht door Suomikauppa.fi' },
  sv: { adLabel: 'Annons', worldwide: 'Skickar över hela världen', cta: 'Se produkten', soldBy: 'Säljs av Suomikauppa.fi' },
}

export default function SuomikauppaPicks({
  variant,
  className = '',
}: {
  variant: SuomikauppaPicksVariant
  className?: string
}) {
  const { locale } = useLocale()
  const c = SECTION_COPY[variant][locale] ?? SECTION_COPY[variant].en
  const chrome = CHROME[locale] ?? CHROME.en
  const products = PRODUCTS[variant]

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
          {chrome.adLabel}
        </span>
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: FIN_BLUE }}>
          {c.eyebrow}
        </p>
      </div>

      <h2 className="mb-3 max-w-2xl text-2xl font-bold leading-tight sm:text-3xl">{c.headline}</h2>
      <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">{c.body}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {products.map((p) => (
          <a
            key={p.sid}
            href={hrefFor(p.sid, p.handle)}
            target="_blank"
            rel="sponsored nofollow noopener"
            onClick={() => trackAffiliateClick(p.sid, 'suomikauppa')}
            className="group flex flex-col rounded-2xl border border-slate-900/10 bg-white p-5 no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,47,108,0.12)]"
            style={{ borderColor: 'rgba(0,47,108,0.14)' }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{p.brand}</p>
            <p className="mt-1 font-bold leading-snug" style={{ color: FIN_BLUE }}>
              {p.name}
            </p>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{p.desc[locale] ?? p.desc.en}</p>
            <span
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: FIN_BLUE }}
            >
              {chrome.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="flex items-center gap-2 text-sm text-slate-700">
          <Globe className="h-4 w-4 shrink-0" style={{ color: FIN_BLUE }} aria-hidden="true" />
          {chrome.worldwide}
        </span>
        <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{chrome.soldBy}</p>
      </div>

      <AffiliateDisclosure variant="inline" className="mt-6" />
    </section>
  )
}
