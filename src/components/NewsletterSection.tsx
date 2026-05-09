import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { trackNewsletterSignup } from '../lib/analytics'

const SUPABASE_URL = 'https://oogioaxmfnqcbvjbcodh.supabase.co'
const SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54'

/**
 * Inline pink Newsletter band — the only non-light section per LV brand canon.
 * Calls Supabase send-welcome-email Edge Function directly.
 * Source tag: laplandfood-inline.
 */
export default function NewsletterSection() {
  const { t } = useTranslation('pages')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setStatus('loading')
    setError('')
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-welcome-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ email, source: 'laplandfood-inline' }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      trackNewsletterSignup('laplandfood-inline')
      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <section className="bg-gradient-to-br from-vibe-pink to-pink-600 py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <p className="text-white/80 text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
          {t('newsletter.kicker')}
        </p>
        <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-white mb-4">
          {t('newsletter.headline')}
        </h2>
        <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto mb-8">
          {t('newsletter.subhead')}
        </p>

        {status === 'success' ? (
          <div className="bg-white/15 backdrop-blur border border-white/30 rounded-2xl px-6 py-5 max-w-md mx-auto">
            <p className="text-white font-semibold">{t('newsletter.successHeadline')}</p>
            <p className="text-white/80 text-sm mt-2">
              {t('newsletter.successBody')}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              placeholder={t('newsletter.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full bg-white/95 px-5 py-3.5 text-base text-[#002F6C] placeholder-[#002F6C]/40 focus:outline-none focus:ring-2 focus:ring-white"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-full bg-[#002F6C] hover:bg-[#001F4A] text-white font-semibold px-7 py-3.5 transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? t('newsletter.sending') : t('newsletter.submit')}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-white/90 text-sm mt-4">
            {t('newsletter.errorPrefix')} ({error}). {t('newsletter.errorRetry')}
          </p>
        )}
        <p className="text-white/70 text-xs mt-5">
          {t('newsletter.trust')}
        </p>
      </div>
    </section>
  )
}
