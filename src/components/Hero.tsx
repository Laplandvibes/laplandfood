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
      {/* 🔴 ART-DIRECTED, not just two formats of one file. The hero box is
          landscape on a desktop and hard PORTRAIT on a phone (min-h-88svh at
          375 px ≈ 375×715), so object-cover throws away the left and right of
          any 16:9 source. This flat-lay puts the food around the EDGES and
          keeps the middle clear for the H1 — which means the phone crop of the
          landscape file would have shown an empty tablecloth and no food at
          all. The portrait file is the same table shot vertically, with the
          food along the top and bottom edges instead. */}
      <picture>
        <source media="(max-width: 767px)" type="image/avif" srcSet="/images/hero-main-portrait.avif" />
        <source media="(max-width: 767px)" type="image/webp" srcSet="/images/hero-main-portrait.webp" />
        <source media="(max-width: 767px)" srcSet="/images/hero-main-portrait.jpg" />
        <source type="image/avif" srcSet="/images/hero-main.avif" />
        <source type="image/webp" srcSet="/images/hero-main.webp" />
        <img
          src="/images/hero-main.jpg"
          alt="An overhead Lapland table: reindeer sautéed in a cast-iron pan, bowls of cloudberries, bilberries and lingonberries, a cold-smoked whitefish on birch, torn rye bread, chanterelles and juniper on pale wood and linen"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
      {/* Warm-neutral centred scrim, never a flat blue wash — the 2026-07-07
          lesson still holds, and this image is warmer still. What changed on
          2026-08-10 is WHERE the contrast has to come from: the old hero was
          dark blue dusk and the type sat on it unaided, this one is pale linen
          in exactly the place the H1 lands. So the radial is stronger and the
          edges are left almost untouched — the food keeps its own light and
          the darkening reads as natural falloff around the table. */}
      {/* 🔴 Measured, not eyeballed. At the first strength the pale linen left
          the pink kicker at 1.10:1 and the sub-head at 4.39:1 against white —
          the old dark-blue hero carried the same pink at ~5:1, so a lighter
          scrim here would have been a real accessibility regression dressed up
          as restraint. These values put the sub-head over 4.5:1 and the pink
          over 3:1 for large text, with the ellipse kept narrow enough that the
          food around the edge keeps its own light. Re-measure if the image
          changes: hide the hero copy, screenshot, sample the worst pixel under
          each text band. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_74%_80%_at_50%_46%,rgba(22,13,5,0.84)_0%,rgba(22,13,5,0.76)_46%,rgba(22,13,5,0.36)_78%,rgba(22,13,5,0.06)_94%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,13,5,0.34)_0%,rgba(22,13,5,0.06)_46%,transparent_78%)]" />

      {/* pb clears the stat-tile band that overlaps the hero bottom (-mt on Home) */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 min-h-[88svh] flex flex-col justify-center items-center text-center pt-20 pb-32 md:pb-36">
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
