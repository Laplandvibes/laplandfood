import type { ReactNode, AnchorHTMLAttributes } from 'react'

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

export function buildAffiliateHref({
  partner,
  sid,
  destination,
  query,
}: Pick<AffiliateCTAProps, 'partner' | 'sid' | 'destination' | 'query'>): string {
  if (partner === 'activities') {
    const path = (destination ?? '').replace(/^\/+/, '').replace(/\/+$/, '')
    const url = new URL(path ? `https://www.getyourguide.com/${path}/` : 'https://www.getyourguide.com/')
    url.searchParams.set('partner_id', 'VRMKD7N')
    url.searchParams.set('cmp', `lv_laplandfood_${sid}`)
    if (query) for (const [k, v] of Object.entries(query)) if (v) url.searchParams.set(k, v)
    return url.toString()
  }
  const params = new URLSearchParams({ sid, ...(query || {}) })
  if (destination) params.set('ss', destination)
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
  return (
    <a
      {...rest}
      href={buildAffiliateHref({ partner, sid, destination, query })}
      target="_blank"
      rel="sponsored nofollow noopener"
    >
      {children}
    </a>
  )
}
