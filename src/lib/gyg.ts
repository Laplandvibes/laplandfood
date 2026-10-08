/**
 * GetYourGuide link helper for laplandfood.com — Workerin kautta
 * 2026-08-03 alkaen.
 *
 * Tämä tiedosto rakensi aiemmin raakoja getyourguide.com-URLeja perusteella
 * "Worker collapses every slug to GYG's homepage (2026-05-02)". Väite ei pidä
 * enää paikkaansa: se oli curl-bot-fallback-artefakti. Worker hoitaa slugin ja
 * kielen polkuprefiksin (`language=` → GYG:n `<kieli>-<maa>/`-etuliite, ainoa
 * lokalisointi jota GYG kunnioittaa — raaka ?language= on GYG:llä no-op).
 * Suora linkitys menettäisi D1-klikkilokin ja veisi partner_id:n bundleen;
 * Worker injektoi partner_id:n ja cmp=lv_<domain>_<sid>:n itse.
 *
 * 🔴🔴 EI HAKUA (8.10.2026). GYG:n haku `/s?q=` kuoli 23.8.2026 (antoi
 * Stonehengen jokaiseen hakuun), joten Worker taittaa q-linkin aihesivulle
 * (LV-GYG-TOPIC 4.10.) tai, jos sana ei osu sen taulukkoon, Lapin yleissivulle
 * (500+ retkeä). Tämä tiedosto väitti hakua toimivaksi, ja FoodTours-sivun
 * kolme "Tarkista saatavuus" -nappia veivät siksi yleislistaan. Linkki on nyt
 * aina polku, jonka sivusto rakentaa itse:
 *   tuote     `<paikka-lNNN>/<slug-tNNN>`  → yksi retki ("Tarkista saatavuus")
 *   kategoria `<paikka-lNNN>/<nimi-tcNNN>` → GYG:n ylläpitämä lista ("Selaa")
 * Polut otetaan GYG-katalogista (`_gyg-catalog/catalog.json`, 30.7.2026) tai
 * shared/gyg/picks.ts:stä — ei koskaan käsin arvaten: väärä tunnus ei anna
 * 404:ää vaan oikean näköisen sivun jostain muualta maailmasta.
 *
 * 2026-05-03: `cooking-classes`- ja `food-tours`-slugit ilman `-tcNNN`-tunnusta
 * antoivat 404:n. Ruoan kategoria on `food-drinks-tc103` (Lappi 312 tulosta,
 * picks.ts CATEGORY_LINKS 30.7.).
 */

import type { Locale } from '../i18n/config'
import { GYG_LOCALE_PREFIX, gygProductPath } from '../shared/gyg/picks'

const GO = 'https://go.laplandvibes.com/go/activities'

/** Lapin ruoka- ja juomakategoria (picks.ts CATEGORY_LINKS['laplandfood-new'], 312 tulosta 30.7.). */
export const GYG_FOOD_DRINKS_LAPLAND = 'lapland-finland-l2652/food-drinks-tc103'

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

/**
 * Link to a GYG product (`{city}-l{id}/{slug}-t{id}`), category
 * (`{city}-l{id}/{name}-tc{id}`) or location (`{city}-l{id}`).
 *
 * 🔴 A PRODUCT gets its locale prefix HERE, not from the Worker: since
 * 20.9.2026 the Worker adds none to a product path (LV-GYG-PRODUCT-NOPREFIX),
 * so `?language=fi` opened the product in English. Non-English products go as
 * `<lang>-<cc>/-t<id>/` without `language`; English keeps the full slug.
 * Category and location paths keep `language`, which the Worker turns into
 * the prefix. Same rule as gygHref in shared/gyg/picks.ts.
 */
export function gygDeepLink(path: string, sid: string, lang: Locale = 'en'): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '')
  const goPath = GYG_LOCALE_PREFIX[lang] ? gygProductPath(clean, lang) : clean
  const isLocalisedProduct = goPath.includes('/-t')
  return workerUrl(goPath, { sid, language: isLocalisedProduct ? undefined : GYG_WORKER_LANG[lang] })
}

/**
 * Hakusanalinkki — VAIN aiheelle, jolle GYG:llä ei ole kategoriaa eikä
 * tuotetta. Haku ei toimi (kuollut 23.8.2026): Worker valitsee sanoista
 * aihesivun (LV-GYG-TOPIC), ja keräilyllä sitä ei ole, joten nämä linkit
 * päätyvät Lapin yleissivulle. Käytössä 8.10.2026 vain marjasivujen
 * "Selaa keräilyretkiä" -napeissa, avoin asia: GYG-katalogissa on yksi
 * keräilytuote (Luoston marjaretki t1247324), ei keräilykategoriaa.
 * Älä lisää uusia kutsuja — rakenna polku gygDeepLinkillä.
 */
export function gygSearchLink(query: string, sid: string, lang: Locale = 'en'): string {
  return workerUrl('', { sid, language: GYG_WORKER_LANG[lang], q: query })
}
