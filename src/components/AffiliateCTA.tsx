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
  const params = new URLSearchParams({ sid, ...(query || {}) })
  if (destination && partner !== 'activities') params.set('ss', destination)
  const pathname =
    partner === 'activities' && destination ? `/go/activities/${destination}` : `/go/${partner}`
  return `${REDIRECT_HOST}${pathname}?${params.toString()}`
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
