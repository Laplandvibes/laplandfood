import SharedNewsletterPopup from '../../../shared/NewsletterPopup'
import { trackNewsletterSignup } from '../lib/analytics'
import { useLocale } from '../i18n/useLocale'

/**
 * Site wrapper for the shared #LaplandVibes ecosystem newsletter popup.
 *
 * laplandfood.com origin must be added to the send-welcome-email Edge
 * Function CORS allowlist before the direct Supabase call works in
 * production (see `project_lv_newsletter_system.md`).
 *
 * Founder popup (2026-08-09): the old food-specific copy promised seasonal
 * recipe sends the consumer newsletter has never kept (0 sends). Do not
 * re-add per-site copy overrides here — the shared founder default is the
 * network standard on every tourism site.
 */
const SUPABASE_URL = 'https://oogioaxmfnqcbvjbcodh.supabase.co'
const SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54'

export default function NewsletterPopup() {
  const { locale } = useLocale()
  return (
    <SharedNewsletterPopup
      siteId="laplandfood"
      brandWord="FOOD"
      lang={locale as 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl'}
      supabaseUrl={SUPABASE_URL}
      supabaseAnonKey={SUPABASE_PUBLISHABLE_KEY}
      onSubscribed={(s) => trackNewsletterSignup(s)}
    />
  )
}
