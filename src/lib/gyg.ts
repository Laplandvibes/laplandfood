/**
 * GetYourGuide deep-link helper for laplandfood.com — Workerin kautta
 * 2026-08-03 alkaen.
 *
 * Tämä tiedosto rakensi aiemmin raakoja getyourguide.com-URLeja perusteella
 * "Worker collapses every slug to GYG's homepage (2026-05-02)". Väite ei pidä
 * enää paikkaansa: se oli curl-bot-fallback-artefakti, ja Worker on 2026-08-02
 * lähtien hoitanut slugin, /s?q=-haun JA kielen polkuprefiksin (`language=`-
 * parametri → GYG:n `<kieli>-<maa>/`-etuliite, ainoa lokalisointi jota GYG
 * kunnioittaa — raaka ?language= on GYG:llä no-op). Suora linkitys menettäisi
 * D1-klikkilokin ja veisi partner_id:n bundleen; Worker injektoi partner_id:n
 * ja cmp=lv_<domain>_<sid>:n itse.
 *
 * 2026-05-03 (verified): GYG does NOT have category landing pages for
 * `cooking-classes` or `food-tours` slugs on Lapland — both 404. The only
 * stable food category is `food-and-drink`. Anything more specific must use
 * search URLs (`gygSearchLink`) which always render a results page.
 */

import type { Locale } from '../i18n/config'

const GO = 'https://go.laplandvibes.com/go/activities'

/**
 * Worker `?language=` codes (same table as shared/gyg/picks.ts). `en` is GYG's
 * default and needs no param; `de` needs a code here even though the old raw
 * links didn't send one — they used the getyourguide.de domain instead.
 */
export const GYG_WORKER_LANG: Record<Locale, string | undefined> = {
  en: undefined, fi: 'fi', de: 'de', ja: 'ja', es: 'es', 'pt-BR': 'pt-br',
  'zh-CN': 'zh', ko: 'ko', fr: 'fr', it: 'it', nl: 'nl', sv: 'sv',
}

function workerUrl(path: string, params: Record<string, string | undefined>): string {
  const p = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) if (v) p.set(k, v)
  return `${GO}${path ? `/${path}` : ''}?${p.toString()}`
}

/** Deep link to a specific GYG product (`{city}-l{id}/{slug}-t{id}`). */
export function gygDeepLink(productPath: string, sid: string, lang: Locale = 'en'): string {
  const path = productPath.replace(/^\/+/, '').replace(/\/+$/, '')
  return workerUrl(path, { sid, language: GYG_WORKER_LANG[lang] })
}

/** Deep link to a category-level GYG page (`food-and-drink` only). */
export function gygCategoryLink(
  citySlug: string,
  category: 'food-and-drink',
  sid: string,
  lang: Locale = 'en',
): string {
  return workerUrl(`${citySlug}/${category}`, { sid, language: GYG_WORKER_LANG[lang] })
}

/** Search link — Worker rakentaa /s?q=-haun (ainoa URL jossa GYG kunnioittaa q:ta). */
export function gygSearchLink(query: string, sid: string, lang: Locale = 'en'): string {
  return workerUrl('', { sid, language: GYG_WORKER_LANG[lang], q: query })
}
