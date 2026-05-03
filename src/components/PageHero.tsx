import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface PageHeroProps {
  eyebrow?: string
  title: string
  titleHighlight?: string
  subtitle: string
  imageUrl: string
  imageAlt: string
  primaryCta?: { label: string; href: string; external?: boolean }
  secondaryCta?: { label: string; href: string; external?: boolean }
  children?: ReactNode
}

/**
 * PageHero — top-of-pillar-page hero band for laplandfood.com.
 * Image background + Finland-blue overlay (matches laplandwellness convention).
 * Use min-h with svh so iOS Safari URL-bar dynamics don't crop the H1.
 */
export default function PageHero({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  imageUrl,
  imageAlt,
  primaryCta,
  secondaryCta,
  children,
}: PageHeroProps) {
  const renderCta = (cta: { label: string; href: string; external?: boolean }, primary: boolean) => {
    const cls = primary
      ? 'inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-base shadow-[0_4px_24px_rgba(236,72,153,0.35)]'
      : 'inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-full border border-white/40 transition-colors text-base'
    if (cta.external) {
      return (
        <a key={cta.label} href={cta.href} target="_blank" rel="noopener" className={cls}>
          {cta.label}
        </a>
      )
    }
    return (
      <Link key={cta.label} to={cta.href} className={cls}>
        {cta.label}
      </Link>
    )
  }

  return (
    <section className="relative pt-16 min-h-[68svh] md:min-h-[78svh] overflow-hidden bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]">
      <img
        src={imageUrl}
        alt={imageAlt}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/30 via-[#002F6C]/30 to-[#002F6C]/85" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 flex flex-col justify-center min-h-[68svh] md:min-h-[78svh]">
        {eyebrow && (
          <p className="text-vibe-pink text-sm md:text-base font-semibold tracking-[0.18em] uppercase mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading tracking-wide text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-6 max-w-4xl">
          {title}{' '}
          {titleHighlight && (
            <span className="text-vibe-pink drop-shadow-[0_0_30px_rgba(236,72,153,0.45)]">
              {titleHighlight}
            </span>
          )}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
          {subtitle}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {primaryCta && renderCta(primaryCta, true)}
            {secondaryCta && renderCta(secondaryCta, false)}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
