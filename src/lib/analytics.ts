/**
 * Thin analytics shims. The site uses GA4 consent-mode v2 declared in
 * index.html. These helpers are safe to call before gtag is loaded — they
 * no-op until the analytics_storage consent is granted.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function safeGtag(...args: unknown[]): void {
  try {
    window.gtag?.(...args)
  } catch {
    /* swallow */
  }
}

export function trackNewsletterSignup(source: string): void {
  safeGtag('event', 'newsletter_signup', { source })
}

export function trackAffiliateClick(sid: string, partner: string): void {
  safeGtag('event', 'affiliate_click', { sid, partner })
}

export function trackHubClick(name: string): void {
  safeGtag('event', 'hub_click', { hub: name })
}
