/**
 * Outbound referral tagging (network rule, Vesa 2026-07-24).
 *
 * Every outbound link to a business's / venue's / operator's OWN website must
 * carry `utm_source=laplandvibes&utm_medium=referral&utm_campaign=food_<context>`
 * so the business sees LaplandVibes in its analytics. Apply at RENDER sites —
 * data files keep clean URLs.
 *
 * Do NOT tag: Google Maps links, affiliate links (go.laplandvibes.com, GYG),
 * internal/network links, or social profiles. Do not change rel to sponsored —
 * this is an unpaid editorial referral.
 */
export function withReferral(url: string, campaign: string): string {
  try {
    const u = new URL(url)
    u.searchParams.set('utm_source', 'laplandvibes')
    u.searchParams.set('utm_medium', 'referral')
    u.searchParams.set('utm_campaign', campaign)
    return u.toString()
  } catch {
    return url
  }
}
