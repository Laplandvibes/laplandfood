import SharedCookieBanner from '../../../shared/CookieBanner'

/**
 * Per-site wrapper for the shared rising-flagpole cookie banner. Only the
 * localStorage consentKey changes per site — copy is identical across the
 * network. The same key is referenced by index.html's GA4 consent-mode
 * bootstrap so accept/decline propagates to gtag.
 */
export default function CookieBanner() {
  return <SharedCookieBanner consentKey="laplandfood_cookie_consent" />
}
