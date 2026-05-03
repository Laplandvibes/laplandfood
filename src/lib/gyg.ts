/**
 * GetYourGuide deep-link helper for laplandfood.com.
 *
 * Mirrors the laplanddining-new pattern (verified 2026-05-03) because
 * laplandfood and laplanddining surface the same kinds of GYG products
 * (food-and-drink experiences in Finnish Lapland).
 *
 * Background: the `go.laplandvibes.com/go/activities/*` Cloudflare Worker
 * collapses every slug to `getyourguide.com/` (homepage). To preserve user
 * intent AND affiliate attribution we build the direct GYG URL with our
 * `partner_id` baked into the query string. GYG's affiliate system reads
 * `partner_id` from query params — same attribution path, no worker hop.
 *
 * 2026-05-03 (verified): GYG does NOT have category landing pages for
 * `cooking-classes` or `food-tours` slugs on Lapland — both 404. The only
 * stable food category is `food-and-drink`. Anything more specific must use
 * search URLs (`gygSearchLink`) which always render a results page.
 */

const GYG_PARTNER_ID = 'VRMKD7N'
const SITE_TAG = 'laplandfood'

/**
 * Build a deep link to a specific GYG product (food tour, cooking class,
 * brewery tour with food, etc.).
 *
 * @param productPath  Full path component after `getyourguide.com/`.
 *                     Format: `{city-slug}-l{cityId}/{product-slug}-t{productId}`.
 *                     Example: `rovaniemi-l2653/lapland-cuisine-cooking-class-t423842`.
 * @param sid          Per-placement campaign tag, e.g. `tour_sami_culture`.
 */
export function gygDeepLink(productPath: string, sid: string): string {
  const path = productPath.replace(/^\/+/, '')
  const url = new URL(`https://www.getyourguide.com/${path}/`)
  url.searchParams.set('partner_id', GYG_PARTNER_ID)
  url.searchParams.set('cmp', `lv_${SITE_TAG}_${sid}`)
  return url.toString()
}

/**
 * Build a deep link to a category-level GYG page. Only `food-and-drink` is
 * a verified-working slug for Lapland and Finnish cities (2026-05-03).
 * Other food-related categories (`cooking-classes`, `food-tours`) 404 on
 * Lapland — use {@link gygSearchLink} for those instead.
 *
 * @param citySlug   GYG city slug + ID, e.g. `lapland-l662`, `rovaniemi-l2653`.
 * @param category   Category path segment. Use `food-and-drink` only.
 * @param sid        Per-placement campaign tag.
 */
export function gygCategoryLink(
  citySlug: string,
  category: 'food-and-drink',
  sid: string,
): string {
  const url = new URL(`https://www.getyourguide.com/${citySlug}/${category}/`)
  url.searchParams.set('partner_id', GYG_PARTNER_ID)
  url.searchParams.set('cmp', `lv_${SITE_TAG}_${sid}`)
  return url.toString()
}

/**
 * Build a GetYourGuide search URL. Always returns a results page even when
 * no city/category combination matches — safer than gambling on category
 * slugs that may 404 (e.g. `cooking-classes` for Lapland).
 *
 * @param query  Free-text search, e.g. `lapland cooking class`, `rovaniemi food tour`.
 * @param sid    Per-placement campaign tag.
 */
export function gygSearchLink(query: string, sid: string): string {
  const url = new URL(`https://www.getyourguide.com/s/`)
  url.searchParams.set('q', query)
  url.searchParams.set('partner_id', GYG_PARTNER_ID)
  url.searchParams.set('cmp', `lv_${SITE_TAG}_${sid}`)
  return url.toString()
}
