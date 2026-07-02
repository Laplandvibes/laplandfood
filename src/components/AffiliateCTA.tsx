import type { ReactNode, AnchorHTMLAttributes } from 'react'
import { useLocale } from '../i18n/useLocale';

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

type _Lang = "en" | "fi" | "de" | "ja" | "es" | "pt-BR" | "zh-CN" | "ko" | "fr" | "it" | "nl";
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
};
const GYG_DOMAIN: Record<_Lang, string> = {
  en: "https://www.getyourguide.com",
  fi: "https://www.getyourguide.com",
  de: "https://www.getyourguide.de",
  ja: "https://www.getyourguide.com",
  es: "https://www.getyourguide.es",
  "pt-BR": "https://www.getyourguide.com.br",
  "zh-CN": "https://www.getyourguide.com",
  ko: "https://www.getyourguide.com",
  fr: "https://www.getyourguide.fr",
  it: "https://www.getyourguide.it",
  nl: "https://www.getyourguide.nl",
};


export function buildAffiliateHref({
  partner,
  sid,
  destination,
  query,
  lang = "en",
}: Pick<AffiliateCTAProps, 'partner' | 'sid' | 'destination' | 'query'> & { lang?: _Lang }): string {
  if (partner === 'activities') {
    const path = (destination ?? '').replace(/^\/+/, '').replace(/\/+$/, '')
    const url = new URL(path ? `${GYG_DOMAIN[lang]}/${path}/` : `${GYG_DOMAIN[lang]}/`)
    url.searchParams.set('partner_id', 'VRMKD7N')
    url.searchParams.set('cmp', `lv_laplandfood_${sid}`)
    if (lang === "fi") url.searchParams.set("language", "fi");
    if (lang === "ja") url.searchParams.set("language", "ja");
    if (lang === "es") url.searchParams.set("language", "es");
    if (lang === "pt-BR") url.searchParams.set("language", "pt");
    if (lang === "zh-CN") url.searchParams.set("language", "zh");
    if (lang === "ko") url.searchParams.set("language", "ko");
    if (lang === "it") url.searchParams.set("language", "it");
    if (lang === "nl") url.searchParams.set("language", "nl");
    if (query) for (const [k, v] of Object.entries(query)) if (v) url.searchParams.set(k, v)
    return url.toString()
  }
  const params = new URLSearchParams({ sid, ...(query || {}) })
  if (destination) params.set('ss', destination)
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
