import SharedNewsletterPopup from '../../../shared/NewsletterPopup'
import { trackNewsletterSignup } from '../lib/analytics'

/**
 * Site wrapper for the shared #LaplandVibes ecosystem newsletter popup.
 *
 * laplandfood.com origin must be added to the send-welcome-email Edge
 * Function CORS allowlist before the direct Supabase call works in
 * production (see `project_lv_newsletter_system.md`).
 *
 * Trigger: 25 s OR 55 % scroll, suppressed on /privacy /terms /cookie-policy.
 * Welcome email is the master #LaplandVibes-branded one — there is one
 * audience across the whole network, the source tag differentiates the
 * referring site for analytics only.
 */
const SUPABASE_URL = 'https://oogioaxmfnqcbvjbcodh.supabase.co'
const SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54'

export default function NewsletterPopup() {
  return (
    <SharedNewsletterPopup
      siteId="laplandfood"
      brandWord="FOOD"
      supabaseUrl={SUPABASE_URL}
      supabaseAnonKey={SUPABASE_PUBLISHABLE_KEY}
      onSubscribed={(s) => trackNewsletterSignup(s)}
    />
  )
}
