import type { ReactNode, AnchorHTMLAttributes } from 'react'
import { useLocale } from '../i18n/useLocale';
import { GYG_WORKER_LANG } from '../lib/gyg';

/**
 * LaplandVibes affiliate CTA. All affiliate clicks are funnelled through
 * https://go.laplandvibes.com — the Cloudflare Worker handles CJ tracking,
 * GYG partner_id injection, and per-domain Website ID attribution.
 *
 * NOTE on GYG: a known bug (see bug_go_lv_worker_gyg_dropped.md) collapses
 * every GYG slug to the homepage. For activities CTAs that need a deep link
 * to a specific product, bypass the Worker — see lib/gyg.ts.
 */

export type AffiliatePartner =
  | 'hotels'
  | 'hotels-seasonal'
  | 'hotels-budget'
  | 'cars'
  | 'activities'

export interface AffiliateCTAProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> {
  partner: AffiliatePartner
  sid: string
  destination?: string
  query?: Record<string, string>
  children: ReactNode
}

const REDIRECT_HOST = 'https://go.laplandvibes.com'

type _Lang = "en" | "fi" | "de" | "ja" | "es" | "pt-BR" | "zh-CN" | "ko" | "fr" | "it" | "nl" | "sv";
const HOTELS_LOCALE: Record<_Lang, string> = {
  en: "en_US",
  fi: "fi_FI",
  de: "de_DE",
  ja: "ja_JP",
  es: "es_ES",
  "pt-BR": "pt_BR",
  "zh-CN": "zh_CN",
  ko: "ko_KR",
  fr: "fr_FR",
  it: "it_IT",
  nl: "nl_NL",
  sv: "sv_SE",
};
const CARS_LANG: Record<_Lang, string> = {
  en: "en",
  fi: "fi",
  de: "de",
  ja: "ja",
  es: "es",
  "pt-BR": "pt",
  "zh-CN": "zh",
  ko: "ko",
  fr: "fr",
  it: "it",
  nl: "nl",
  sv: "sv",
};


export function buildAffiliateHref({
  partner,
  sid,
  destination,
  query,
  lang = "en",
}: Pick<AffiliateCTAProps, 'partner' | 'sid' | 'destination' | 'query'> & { lang?: _Lang }): string {
  if (partner === 'activities') {
    // Reitittää Workerin kautta 2026-08-03 alkaen. Worker hoitaa slugin,
    // /s?q=-haun JA kielen polkuprefiksin (raaka ?language= on GYG:llä no-op,
    // ja vanha getyourguide.de-domain-taulu jätti muut kielet englanniksi).
    // Suora linkitys menettäisi D1-klikkilokin ja veisi partner_id:n bundleen.
    const params = new URLSearchParams({ sid });
    const gygLang = GYG_WORKER_LANG[lang];
    if (gygLang) params.set('language', gygLang);
    const path = (destination ?? '').replace(/^\/+/, '').replace(/\/+$/, '');
    if (query) for (const [k, v] of Object.entries(query)) if (v) params.set(k, v);
    return `${REDIRECT_HOST}/go/activities${path ? `/${path}` : ''}?${params.toString()}`;
  }
  const params = new URLSearchParams({ sid, ...(query || {}) })
  // 🔴 cars käyttää pickup_location=IATA, EI ss:ää — ss=IATA valuu EB:n
  // ?location=-tekstihakuun, jonka EB pudottaa tyhjäksi etusivuksi (3.8.2026).
  if (destination) {
    if (partner === "cars") params.set('pickup_location', destination)
    else params.set('ss', anchorHotelsSs(partner, destination))
  }
  if (partner === "hotels" || partner === "hotels-seasonal" || partner === "hotels-budget") {
    params.set("locale", HOTELS_LOCALE[lang]);
  } else if (partner === "cars") {
    params.set("lang", CARS_LANG[lang]);
  }
  return `${REDIRECT_HOST}/go/${partner}?${params.toString()}`
}

export default function AffiliateCTA({
  partner,
  sid,
  destination,
  query,
  children,
  ...rest
}: AffiliateCTAProps) {
  const { locale: lang } = useLocale();
  return (
    <a
      {...rest}
      href={buildAffiliateHref({ partner, sid, destination, query, lang })}
      target="_blank"
      rel="sponsored nofollow noopener"
    >
      {children}
    </a>
  )
}

/**
 * Anchor any hotels search to Finnish Lapland. A bare "Lapland"/"Levi"/etc.
 * makes the lodging partner geocode to *Lapland, Indiana, USA* — a real revenue/trust
 * bug (Vesa 2026-07-08). Force ", Finland" onto every hotels query that does
 * not already name the country; leave cars/activities queries untouched.
 * Callers cannot re-introduce the bug.
 */
function anchorHotelsSs(partner: string, destination: string): string {
  const isHotels = partner === "hotels" || partner === "hotels-seasonal" || partner === "hotels-budget";
  if (!isHotels) return destination;
  return /finland|suomi/i.test(destination) ? destination : `${destination.replace(/[\s,]+$/, "")}, Finland`;
}
