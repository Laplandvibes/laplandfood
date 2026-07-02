import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocale } from '../i18n/useLocale'

/**
 * Home Hero — full-bleed image with the Finland-blue overlay convention.
 * One H1, two CTAs (primary internal: Recipes, secondary internal: Local Ingredients).
 */
export default function Hero() {
  const { t } = useTranslation('pages')
  const { to } = useLocale()
  return (
    <section className="relative pt-16 min-h-[88svh] overflow-hidden bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]">
      <img
        src="/images/hero-main.jpg"
        alt="Slow-cooked Lapland reindeer stew steaming in a cast-iron pot over an open campfire under a soft Arctic dusk"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,47,108,0.80)_0%,rgba(0,47,108,0.42)_50%,rgba(0,47,108,0.30)_100%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 min-h-[88svh] flex flex-col justify-center items-center text-center py-20">
        <p className="text-vibe-pink text-sm md:text-base font-semibold tracking-[0.22em] uppercase mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {t('hero.kicker')}
        </p>
        <h1 className="font-heading tracking-wide text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.92] mb-7 max-w-5xl break-words drop-shadow-[0_4px_24px_rgba(0,15,40,0.9)]">
          {t('hero.h1Part1')}
          <br />
          <span className="text-vibe-pink drop-shadow-[0_0_40px_rgba(236,72,153,0.5)]">{t('hero.h1Part2')}</span>
        </h1>
        <p className="text-lg md:text-xl text-white/95 max-w-2xl mb-10 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {t('hero.subhead')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            to={to('/traditional-recipes')}
            className="inline-flex items-center justify-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base shadow-[0_4px_28px_rgba(236,72,153,0.4)]"
          >
            {t('hero.ctaPrimary')}
          </Link>
          <Link
            to={to('/local-ingredients')}
            className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-8 py-4 rounded-full border border-white/40 transition-colors text-base"
          >
            {t('hero.ctaSecondary')}
          </Link>
        </div>
      </div>
    </section>
  )
}
