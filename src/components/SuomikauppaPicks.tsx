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
 *   · reindeer → raaka-aineopas (LocalIngredients): porosäilykkeet + kuivaliha
 *                (handlet verifioitu 23.8.: sivu 200 + Shopify available:true;
 *                feedin riipisen-poronkaristys-300g oli 404 eikä kelvannut)
 *   · cloudberry → hillasyväsivu (/cloudberry): 🔴 kaupan KAIKKI lakkahillot
 *                olivat loppu 24.8. (varianttitason available:false, 3 handlea
 *                tarkistettu) — variantti myy verifioidut villimarjaklassikot
 *                ja copy sanoo hillatilanteen suoraan; se on sivun oma pointti
 *                niukkuudesta. Jos lakkahillo palaa varastoon, vaihda tänne
 *                (esim. finnish-flavours-suomalainen-premium-lakkahillo-250g)
 *                ja pehmennä copyn loppuunmyyntimaininta.
 *
 * 🔴 Maitotuotteita ei nosteta. Lihatuotteet sallittu 2026-08-23 (Vesa: poro
 * säilykkeenä = syy mainostaa) VAIN säilykkeinä/kuivattuina reindeer-
 * variantissa, jonka body + shipping-chip kertovat rehellisesti: EU:n sisällä
 * vapaata, muualle lukijan maan tuontisäännöt ratkaisevat (UK/US/JP/AU
 * pysäyttävät lihan usein — siksi ei "Ships worldwide" -chipiä tässä
 * variantissa). Muut variantit pysyvät kuivina/suljettuina. Ei hintoja copyssa (vanhenevat), ei
 * terveysväitteitä, ei keksittyjä faktoja.
 *
 * Tuotteet valittu katalogista 2026-08-15 varianttitason available=true
 * -ehdolla + kuvallisina. Jos tuote poistuu valikoimasta, Worker ohjaa dest-
 * URL:iin joka 404:aa kaupassa — vaihda silloin handle tähän tiedostoon.
 */

const FIN_BLUE = '#002F6C'

export type SuomikauppaPicksVariant = 'berries' | 'rye' | 'coffee' | 'reindeer' | 'cloudberry'

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
  reindeer: [
    {
      sid: 'food_guide_reindeer_pate',
      handle: 'riipisen-poro-pate-poro-patee-210g',
      brand: 'Riipisen',
      name: 'Poro paté',
      desc: {
        en: 'Slow-cooked reindeer pâté',
        fi: 'Hitaasti kypsennetty poropatee',
        de: 'Langsam gegarte Rentierpastete',
        ja: 'トナカイのパテ',
        es: 'Paté de reno de cocción lenta',
        'pt-BR': 'Patê de rena de cozimento lento',
        'zh-CN': '慢制驯鹿肉酱',
        ko: '천천히 익힌 순록 파테',
        fr: 'Pâté de renne cuit doucement',
        it: 'Paté di renna a cottura lenta',
        nl: 'Langzaam gegaarde rendierpaté',
        sv: 'Långlagad renpaté',
      },
    },
    {
      sid: 'food_guide_reindeer_soup',
      // Handle sanoo 350ml, kaupan sivu 550 ml (tuote uudistettu) — handle toimii.
      handle: 'jalostaja-juustoinen-savuporokeitto-350ml',
      brand: 'Jalostaja',
      name: 'Juustoinen savuporokeitto',
      desc: {
        en: 'Smoked-reindeer cheese soup',
        fi: 'Juustoinen savuporokeitto',
        de: 'Käsesuppe mit Räucherrentier',
        ja: 'スモークトナカイのチーズスープ',
        es: 'Sopa de queso con reno ahumado',
        'pt-BR': 'Sopa de queijo com rena defumada',
        'zh-CN': '烟熏驯鹿奶酪汤',
        ko: '훈제 순록 치즈 수프',
        fr: 'Soupe au fromage au renne fumé',
        it: 'Zuppa al formaggio con renna affumicata',
        nl: 'Kaassoep met gerookt rendier',
        sv: 'Ostsoppa med rökt ren',
      },
    },
    {
      sid: 'food_guide_reindeer_dried',
      handle: 'finnish-flavours-poron-kuivaliha-20g',
      brand: 'Finnish Flavours',
      name: 'Poron kuivaliha',
      desc: {
        en: 'Thin-sliced dried reindeer',
        fi: 'Ohut poron kuivaliha',
        de: 'Dünn geschnittenes Rentier-Trockenfleisch',
        ja: '薄切りのトナカイ干し肉',
        es: 'Finas láminas de reno seco',
        'pt-BR': 'Lascas finas de rena seca',
        'zh-CN': '薄切驯鹿肉干',
        ko: '얇게 쉰 순록 육포',
        fr: 'Fines lamelles de renne séché',
        it: 'Sottili fette di renna essiccata',
        nl: 'Flinterdun gedroogd rendier',
        sv: 'Tunna skivor torkat renkött',
      },
    },
  ],
  cloudberry: [
    {
      sid: 'cloudberry_guide_bilberry_jam',
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
      sid: 'cloudberry_guide_lingonberry_jam',
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
      sid: 'cloudberry_guide_queens_jam',
      handle: 'meritalo-suomalainen-kuningatarhillo-410g',
      brand: 'Meritalo',
      name: 'Kuningatarhillo',
      desc: {
        en: "Queen's jam of bilberry, raspberry and strawberry",
        fi: 'Kuningatarhillo suomalaisista marjoista',
        de: 'Königinnenkonfitüre aus Heidelbeere, Himbeere und Erdbeere',
        ja: 'ビルベリーとラズベリーと苺の「女王のジャム」',
        es: 'Mermelada de la reina: arándano, frambuesa y fresa',
        'pt-BR': 'Geleia da rainha: mirtilo, framboesa e morango',
        'zh-CN': '女王果酱：野生蓝莓、树莓与草莓',
        ko: '빌베리, 라즈베리, 딸기의 퀸즈 잼',
        fr: 'Confiture de la reine : myrtille, framboise et fraise',
        it: 'Confettura della regina: mirtillo, lampone e fragola',
        nl: 'Koninginnenjam van bosbes, framboos en aardbei',
        sv: 'Drottningsylt på blåbär, hallon och jordgubb',
      },
    },
  ],
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
  /** Korvaa CHROME:n "Ships worldwide" -chipin — lihavariantti ei saa luvata maailmanlaajuista toimitusta. */
  shipping?: string
}

const SECTION_COPY: Record<SuomikauppaPicksVariant, Record<Locale, SectionCopy>> = {
  reindeer: {
    en: {
      eyebrow: 'The tinned north',
      headline: 'Reindeer for your own pantry.',
      body: 'The same meat the fell kitchens work with, put up to keep: slow-cooked reindeer pâté, a smoked-reindeer cheese soup and paper-thin dried reindeer for the trail. Suomikauppa ships from Finland; inside the EU meat travels freely, elsewhere check your country’s import rules before ordering.',
      shipping: 'Ships from Finland',
    },
    fi: {
      eyebrow: 'Purkitettu pohjoinen',
      headline: 'Poroa omaan komeroon.',
      body: 'Samaa lihaa jota tunturikeittiöt käyttävät, säilöttynä: hitaasti kypsennetty poropatee, juustoinen savuporokeitto ja ohut poron kuivaliha retkelle. Suomikauppa toimittaa Suomesta; EU:n sisällä liha kulkee vapaasti, muualle tilatessa tarkista maasi tuontisäännöt.',
      shipping: 'Toimitus Suomesta',
    },
    de: {
      eyebrow: 'Der Norden in der Dose',
      headline: 'Rentier für den eigenen Vorrat.',
      body: 'Dasselbe Fleisch, mit dem die Fjellküchen arbeiten, haltbar gemacht: langsam gegarte Rentierpastete, eine Käsesuppe mit Räucherrentier und hauchdünnes Trockenfleisch für unterwegs. Suomikauppa versendet aus Finnland; innerhalb der EU reist Fleisch frei, für andere Länder prüfen Sie vor der Bestellung die Einfuhrregeln.',
      shipping: 'Versand aus Finnland',
    },
    ja: {
      eyebrow: '缶詰の北',
      headline: 'トナカイを自宅の食料棚に。',
      body: '山の台所が使うのと同じ肉を、保存できる形で。じっくり調理したトナカイのパテ、スモークトナカイのチーズスープ、トレイル用の薄い干し肉。Suomikauppa がフィンランドから発送します。EU域内は自由に送れますが、他の国へは注文前に輸入規則をご確認ください。',
      shipping: 'フィンランドから発送',
    },
    es: {
      eyebrow: 'El norte en conserva',
      headline: 'Reno para tu despensa.',
      body: 'La misma carne con la que trabajan las cocinas del norte, en conserva: paté de reno cocinado despacio, una sopa de queso con reno ahumado y finas láminas de reno seco para la ruta. Suomikauppa envía desde Finlandia; dentro de la UE la carne viaja libre, para otros países revisa las normas de importación antes de pedir.',
      shipping: 'Envío desde Finlandia',
    },
    'pt-BR': {
      eyebrow: 'O norte em conserva',
      headline: 'Rena para a sua despensa.',
      body: 'A mesma carne das cozinhas do norte, em conserva: patê de rena de cozimento lento, sopa de queijo com rena defumada e finas lascas de rena seca para a trilha. A Suomikauppa envia da Finlândia; dentro da UE a carne circula livre, para outros países confira as regras de importação antes de pedir.',
      shipping: 'Envio da Finlândia',
    },
    'zh-CN': {
      eyebrow: '罐头里的北方',
      headline: '把驯鹿带回自家橱柜。',
      body: '与山间厨房所用相同的肉，以耐存形式呈现：慢制驯鹿肉酱、烟熏驯鹿奶酪汤，以及适合远足的薄切驯鹿肉干。Suomikauppa 从芬兰发货；欧盟境内肉类可自由寄送，其他国家下单前请查阅本国进口规定。',
      shipping: '芬兰发货',
    },
    ko: {
      eyebrow: '통조림에 담은 북쪽',
      headline: '순록을 우리 집 찬장에.',
      body: '산의 부엌이 쓰는 것과 같은 고기를 저장 가능한 형태로: 천천히 익힌 순록 파테, 훈제 순록 치즈 수프, 트레일용 얇은 순록 육포. Suomikauppa가 핀란드에서 발송합니다. EU 안에서는 육류가 자유롭게 배송되며, 그 외 국가는 주문 전 수입 규정을 확인하세요.',
      shipping: '핀란드에서 발송',
    },
    fr: {
      eyebrow: 'Le Nord en conserve',
      headline: 'Du renne pour votre garde-manger.',
      body: 'La même viande que travaillent les cuisines du Nord, mise en conserve : pâté de renne cuit doucement, soupe au fromage au renne fumé et fines lamelles de renne séché pour la randonnée. Suomikauppa expédie depuis la Finlande ; dans l’UE la viande voyage librement, ailleurs vérifiez les règles d’importation avant de commander.',
      shipping: 'Expédié de Finlande',
    },
    it: {
      eyebrow: 'Il Nord in barattolo',
      headline: 'Renna per la tua dispensa.',
      body: 'La stessa carne delle cucine del Nord, conservata: paté di renna a cottura lenta, una zuppa al formaggio con renna affumicata e sottili fette di renna essiccata per il sentiero. Suomikauppa spedisce dalla Finlandia; nell’UE la carne viaggia libera, altrove controlla le regole di importazione prima di ordinare.',
      shipping: 'Spedito dalla Finlandia',
    },
    nl: {
      eyebrow: 'Het noorden in blik',
      headline: 'Rendier voor je eigen voorraadkast.',
      body: 'Hetzelfde vlees waar de fjellkeukens mee werken, houdbaar gemaakt: langzaam gegaarde rendierpaté, een kaassoep met gerookt rendier en flinterdun gedroogd rendier voor onderweg. Suomikauppa verzendt vanuit Finland; binnen de EU reist vlees vrij, daarbuiten check je vóór het bestellen de invoerregels van je land.',
      shipping: 'Verzending vanuit Finland',
    },
    sv: {
      eyebrow: 'Norr på burk',
      headline: 'Ren till ditt eget skafferi.',
      body: 'Samma kött som fjällköken arbetar med, konserverat: långlagad renpaté, en ostsoppa med rökt ren och tunna skivor torkat renkött för turen. Suomikauppa skickar från Finland; inom EU reser köttet fritt, beställer du någon annanstans, kontrollera landets importregler först.',
      shipping: 'Skickas från Finland',
    },
  },
  cloudberry: {
    en: {
      eyebrow: 'The pantry reality check',
      headline: 'Even the jam sells out.',
      body: 'Everything this page says about scarcity holds on the shelf too: when we last checked, the shop’s cloudberry jars were sold out, waiting on the next wild harvest. These Finnish wild-berry classics from the same forests are in stock, and Suomikauppa ships them worldwide.',
    },
    fi: {
      eyebrow: 'Komerorealismi',
      headline: 'Hillahillokin myydään loppuun.',
      body: 'Kaikki mitä tämä sivu sanoo niukkuudesta pätee myös kaupan hyllyyn: kun viimeksi tarkistimme, lakkahillopurkit olivat loppu ja odottivat seuraavaa villisatoa. Nämä suomalaiset villimarjaklassikot samoista metsistä ovat varastossa, ja Suomikauppa toimittaa ne maailmanlaajuisesti.',
    },
    de: {
      eyebrow: 'Realitätscheck im Regal',
      headline: 'Sogar die Konfitüre ist ausverkauft.',
      body: 'Was diese Seite über Knappheit sagt, gilt auch im Laden: Beim letzten Blick war die Moltebeerkonfitüre ausverkauft und wartet auf die nächste wilde Ernte. Diese finnischen Wildbeeren-Klassiker aus denselben Wäldern sind vorrätig, und Suomikauppa versendet sie weltweit.',
    },
    ja: {
      eyebrow: '食料棚の現実',
      headline: 'ジャムさえ売り切れる。',
      body: 'このページで語った希少さは、店の棚でも同じです。最後に確認した時点で、クラウドベリージャムの瓶は完売し、次の野生の収穫を待っていました。同じ森から生まれたフィンランドの定番ベリージャムは在庫があり、Suomikauppa が世界中へ発送します。',
    },
    es: {
      eyebrow: 'Realidad de despensa',
      headline: 'Hasta la mermelada se agota.',
      body: 'Lo que esta página cuenta sobre la escasez vale también para el estante: la última vez que miramos, los tarros de mora ártica estaban agotados, a la espera de la próxima cosecha silvestre. Estos clásicos finlandeses de bayas silvestres de los mismos bosques sí están en stock, y Suomikauppa los envía a todo el mundo.',
    },
    'pt-BR': {
      eyebrow: 'A despensa, sem filtro',
      headline: 'Até a geleia esgota.',
      body: 'O que esta página diz sobre escassez vale também para a prateleira: na última vez que olhamos, os potes de amora ártica estavam esgotados, esperando a próxima colheita silvestre. Estes clássicos finlandeses de frutas silvestres dos mesmos bosques estão em estoque, e a Suomikauppa envia para o mundo todo.',
    },
    'zh-CN': {
      eyebrow: '食品柜的现实',
      headline: '连果酱都会卖断货。',
      body: '这一页讲的稀缺，在货架上同样成立：我们上次查看时，云莓果酱已经售罄，要等下一季野生采收。来自同一片森林的芬兰野生浆果经典款有现货，Suomikauppa 发往全球。',
    },
    ko: {
      eyebrow: '식료품 선반의 현실',
      headline: '잼마저 품절됩니다.',
      body: '이 페이지가 말한 희소성은 매장 선반에서도 그대로입니다. 마지막으로 확인했을 때 클라우드베리 잼은 품절이었고, 다음 야생 수확을 기다리고 있었습니다. 같은 숲에서 온 핀란드 야생 베리 클래식은 재고가 있으며, Suomikauppa가 전 세계로 배송합니다.',
    },
    fr: {
      eyebrow: 'Le garde-manger, version réalité',
      headline: 'Même la confiture s’épuise.',
      body: 'Ce que cette page dit de la rareté vaut aussi en rayon : à notre dernier passage, les pots de mûre arctique étaient épuisés, dans l’attente de la prochaine récolte sauvage. Ces classiques finlandais de baies sauvages, issus des mêmes forêts, sont en stock, et Suomikauppa les expédie dans le monde entier.',
    },
    it: {
      eyebrow: 'La dispensa, senza filtri',
      headline: 'Persino la confettura va esaurita.',
      body: 'Quello che questa pagina racconta sulla scarsità vale anche sullo scaffale: all’ultimo controllo i vasetti di lampone artico erano esauriti, in attesa del prossimo raccolto selvatico. Questi classici finlandesi di bacche selvatiche degli stessi boschi sono disponibili, e Suomikauppa li spedisce in tutto il mondo.',
    },
    nl: {
      eyebrow: 'De voorraadkast, zonder opsmuk',
      headline: 'Zelfs de jam raakt uitverkocht.',
      body: 'Wat deze pagina over schaarste zegt, geldt ook voor het schap: bij onze laatste check waren de potten kruipbraamjam uitverkocht, in afwachting van de volgende wilde oogst. Deze Finse wildebessenklassiekers uit dezelfde bossen zijn op voorraad, en Suomikauppa verstuurt ze wereldwijd.',
    },
    sv: {
      eyebrow: 'Skafferiet, utan filter',
      headline: 'Till och med sylten tar slut.',
      body: 'Det den här sidan säger om knapphet gäller även hyllan: när vi senast kollade var hjortronsyltburkarna slutsålda i väntan på nästa vilda skörd. De här finska vildbärsklassikerna från samma skogar finns i lager, och Suomikauppa skickar dem över hela världen.',
    },
  },
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
      body: 'Beside every stew in Finnish Lapland sits dark rye: dense slow-baked loaves and thin crispbread that were made to keep through long winters. Suomikauppa ships the classics worldwide, flakes for the porridge pot included.',
    },
    fi: {
      eyebrow: 'Se toinen arktinen perusruoka',
      headline: 'Gahkun leivot itse. Rukiin voi tilata.',
      body: 'Suomen Lapissa padan vieressä on tumma ruis: tiiviit, hitaasti paistetut limput ja ohut hapankorppu, jotka tehtiin kestämään pitkät talvet. Suomikauppa toimittaa klassikot maailmanlaajuisesti, puuropadan hiutaleet mukaan lukien.',
    },
    de: {
      eyebrow: 'Das andere arktische Grundnahrungsmittel',
      headline: 'Gahkku backt man selbst. Roggen kann man bestellen.',
      body: 'Neben jedem Schmortopf in Finnisch-Lappland liegt dunkler Roggen: dichte, langsam gebackene Laibe und dünnes Knäckebrot, gemacht, um lange Winter zu überstehen. Suomikauppa versendet die Klassiker weltweit, Flocken für den Breitopf inklusive.',
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
      body: '在芬兰拉普兰，每一锅炖菜旁边都有深色黑麦：扎实的慢烤面包和薄脆面包，本就是为熬过漫长冬天而生。Suomikauppa 把这些经典发往全球，煮粥用的麦片也在内。',
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
      body: 'Naast elke stoofpot in Fins Lapland ligt donkere rogge: compacte, langzaam gebakken broden en dun knäckebröd, gemaakt om lange winters te doorstaan. Suomikauppa verstuurt de klassiekers wereldwijd, vlokken voor de pappot incluis.',
    },
    sv: {
      eyebrow: 'Den andra arktiska basvaran',
      headline: 'Gahkku bakar du själv. Råg går att beställa.',
      body: 'Bredvid varje gryta i finska Lappland ligger mörk råg: täta, långbakade limpor och tunt knäckebröd, gjorda för att klara långa vintrar. Suomikauppa skickar klassikerna över hela världen, grötflingor inräknade.',
    },
  },
  coffee: {
    en: {
      eyebrow: "The trail's other ritual",
      headline: 'Out here, coffee is boiled, not brewed.',
      body: 'On Lapland trails the pause matters as much as the route, and it comes with coarse-ground coffee heated in a blackened pot over the fire. The pot grind Finns take to the cabin ships worldwide, and so does the pot.',
    },
    fi: {
      eyebrow: 'Retken toinen rituaali',
      headline: 'Täällä kahvi keitetään, ei uuteta.',
      body: 'Lapin poluilla tauko on yhtä tärkeä kuin reitti, ja siihen kuuluu karkeaksi jauhettu kahvi mustuneessa pannussa nuotiolla. Pannujauhatus, jonka suomalaiset vievät mökille, lähtee postissa maailmalle, ja niin lähtee pannukin.',
    },
    de: {
      eyebrow: 'Das andere Ritual der Tour',
      headline: 'Hier draußen wird Kaffee gekocht, nicht gebrüht.',
      body: 'Auf Lapplands Pfaden zählt die Pause so viel wie die Route, mit grob gemahlenem Kaffee, der in einer geschwärzten Kanne überm Feuer heiß wird. Die Kannenmahlung, die Finnen mit zur Hütte nehmen, versendet Suomikauppa weltweit, die Kanne gleich mit.',
    },
    ja: {
      eyebrow: 'ツアーのもうひとつの儀式',
      headline: 'ここでは、コーヒーは淹れずに煮出します。',
      body: 'ラップランドの道では、休憩はルートと同じくらい大切。焚き火にかけた黒ずんだポットで粗挽きコーヒーを煮出すのがお決まりです。フィンランド人がコテージへ持っていく粗挽きは世界中へ発送できます。ポットも一緒に。',
    },
    es: {
      eyebrow: 'El otro ritual de la ruta',
      headline: 'Aquí el café se hierve, no se filtra.',
      body: 'En los senderos de Laponia la pausa importa tanto como la ruta, y llega con café molido grueso calentado en una cafetera ennegrecida sobre el fuego. La molienda de olla que los finlandeses llevan a la cabaña se envía a todo el mundo, y la cafetera también.',
    },
    'pt-BR': {
      eyebrow: 'O outro ritual da trilha',
      headline: 'Aqui o café é fervido, não coado.',
      body: 'Nas trilhas da Lapônia a pausa importa tanto quanto o caminho, e ela vem com café de moagem grossa aquecido numa cafeteira enegrecida sobre o fogo. A moagem de panela que os finlandeses levam para o chalé é enviada para o mundo todo, e a cafeteira também.',
    },
    'zh-CN': {
      eyebrow: '旅途的另一个仪式',
      headline: '在这里，咖啡是煮出来的，不是冲出来的。',
      body: '在拉普兰的路上，停下来歇脚和赶路一样重要：粗研磨的咖啡，在火上被熏黑的壶里煮开。芬兰人带去小木屋的壶煮咖啡粉可以发往全球，咖啡壶也一样。',
    },
    ko: {
      eyebrow: '여정의 또 다른 의식',
      headline: '여기서는 커피를 내리지 않고 끓입니다.',
      body: '라플란드의 길 위에서는 쉬는 시간이 길만큼 중요합니다. 모닥불 위 그을린 주전자에서 끓인 굵은 분쇄 커피와 함께요. 핀란드인들이 오두막에 챙겨 가는 주전자용 원두가 전 세계로 배송됩니다. 주전자까지도.',
    },
    fr: {
      eyebrow: "L'autre rituel du sentier",
      headline: 'Ici, le café se fait bouillir, pas filtrer.',
      body: "Sur les sentiers de Laponie, la pause compte autant que l'itinéraire : un café à mouture grossière chauffé dans une cafetière noircie au feu. La mouture que les Finlandais emportent au chalet s'expédie dans le monde entier, la cafetière aussi.",
    },
    it: {
      eyebrow: "L'altro rituale del sentiero",
      headline: 'Qui il caffè si fa bollire, non filtrare.',
      body: 'Sui sentieri della Lapponia la pausa conta quanto il percorso, e arriva con caffè macinato grosso scaldato in un bricco annerito sul fuoco. La macinatura da bricco che i finlandesi portano al cottage si spedisce in tutto il mondo, e anche il bricco.',
    },
    nl: {
      eyebrow: 'Het andere ritueel van de tocht',
      headline: 'Hier wordt koffie gekookt, niet gezet.',
      body: 'Op de paden van Lapland telt de pauze net zo zwaar als de route, met grofgemalen koffie die in een zwartgeblakerde pot boven het vuur heet wordt. De potmaling die Finnen mee naar de hut nemen wordt wereldwijd verzonden, en de pot zelf ook.',
    },
    sv: {
      eyebrow: 'Turens andra ritual',
      headline: 'Här ute kokas kaffet, det bryggs inte.',
      body: 'På Lapplands leder betyder pausen lika mycket som rutten, med grovmalet kaffe som hettas upp i en svartnad panna över elden. Kokmalningen som finländare tar med till stugan skickas över hela världen, och pannan med.',
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
          {c.shipping ?? chrome.worldwide}
        </span>
        <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{chrome.soldBy}</p>
      </div>

      <AffiliateDisclosure variant="inline" className="mt-6" />
    </section>
  )
}
