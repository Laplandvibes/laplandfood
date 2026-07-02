import SharedNewsletterPopup from '../../../shared/NewsletterPopup'
import { trackNewsletterSignup } from '../lib/analytics'
import { useLocale } from '../i18n/useLocale'

/**
 * Site wrapper for the shared #LaplandVibes ecosystem newsletter popup.
 *
 * laplandfood.com origin must be added to the send-welcome-email Edge
 * Function CORS allowlist before the direct Supabase call works in
 * production (see `project_lv_newsletter_system.md`).
 *
 * Trigger: 25 s OR 55 % scroll, suppressed on /privacy /terms /cookie-policy.
 * Welcome email is the master #LaplandVibes-branded one — there is one
 * audience across the whole network, the source tag differentiates the
 * referring site for analytics only.
 */
const SUPABASE_URL = 'https://oogioaxmfnqcbvjbcodh.supabase.co'
const SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54'

// Food-site-specific popup copy. The shared default talks about aurora
// alerts and glass igloos — not the right context for a recipes + restaurants
// guide.
const POPUP_COPY: Record<string, { headline: string; description: string }> = {
  en: {
    headline: 'Finnish food in your inbox.',
    description: 'Seasonal recipes when berry, mushroom or game season opens, plus a Lapland restaurant worth driving for. Written from Finland.',
  },
  fi: {
    headline: 'Suomalainen ruoka sähköpostiisi.',
    description: 'Kausiresepti kun marja-, sieni- tai riistakausi avautuu, ja yksi Lapin ravintola jonka takia kannattaa ajaa mutka. Kirjoitettu Suomesta.',
  },
  de: {
    headline: 'Finnische Küche in Ihrem Postfach.',
    description: 'Saisonrezepte zur Beeren-, Pilz- oder Wildsaison sowie ein lappländisches Restaurant, für das sich ein Umweg lohnt. Geschrieben aus Finnland.',
  },
  ja: {
    headline: 'フィンランドの食を、あなたのメールボックスへ。',
    description: 'ベリー、きのこ、ジビエの旬が始まるたびに季節のレシピを。さらに、わざわざ足を運ぶ価値のあるラップランドのレストランを一軒。フィンランドからお届けします。',
  },
  es: {
    headline: 'La cocina finlandesa en tu correo.',
    description: 'Recetas de temporada cuando se abre la época de las bayas, las setas o la caza, y un restaurante de Laponia por el que merece la pena desviarse. Escrito desde Finlandia.',
  },
  'pt-BR': {
    headline: 'A comida finlandesa na sua caixa de entrada.',
    description: 'Receitas da estação quando começa a temporada de frutas silvestres, cogumelos ou caça, mais um restaurante na Lapônia que vale o desvio. Escrito da Finlândia.',
  },
  'zh-CN': {
    headline: '把芬兰美食送进你的邮箱。',
    description: '浆果、菌菇或野味当季时，为你送上时令食谱，再附上一家值得绕路前往的拉普兰餐厅。来自芬兰的第一手内容。',
  },
  ko: {
    headline: '핀란드의 맛을 메일함으로.',
    description: '베리, 버섯, 사냥철이 열릴 때마다 제철 레시피를, 그리고 일부러 찾아갈 만한 라플란드 식당 한 곳을 함께. 핀란드 현지에서 씁니다.',
  },
  fr: {
    headline: 'La cuisine finlandaise dans votre boîte mail.',
    description: 'Des recettes de saison dès l\'ouverture de la cueillette des baies, des champignons ou de la chasse, et un restaurant de Laponie qui vaut le détour. Écrit depuis la Finlande.',
  },
  it: {
    headline: 'La cucina finlandese nella tua casella di posta.',
    description: 'Ricette di stagione quando si aprono la raccolta di bacche, funghi o la stagione della cacciagione, e un ristorante della Lapponia per cui vale la pena fare una deviazione. Scritto dalla Finlandia.',
  },
  nl: {
    headline: 'Finse keuken in je inbox.',
    description: 'Seizoensrecepten zodra het bessen-, paddenstoelen- of wildseizoen begint, plus een restaurant in Lapland waarvoor je gerust een omweg maakt. Geschreven vanuit Finland.',
  },
}

export default function NewsletterPopup() {
  const { locale } = useLocale()
  const copy = POPUP_COPY[locale as string] ?? POPUP_COPY.en
  return (
    <SharedNewsletterPopup
      siteId="laplandfood"
      brandWord="FOOD"
      lang={locale as 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl'}
      headline={copy.headline}
      description={copy.description}
      supabaseUrl={SUPABASE_URL}
      supabaseAnonKey={SUPABASE_PUBLISHABLE_KEY}
      onSubscribed={(s) => trackNewsletterSignup(s)}
    />
  )
}
