import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import PageBreadcrumb from './PageBreadcrumb'

interface PageHeroProps {
  eyebrow?: string
  title: string
  titleHighlight?: string
  subtitle: string
  imageUrl: string
  imageAlt: string
  primaryCta?: { label: string; href: string; external?: boolean; rel?: string }
  secondaryCta?: { label: string; href: string; external?: boolean; rel?: string }
  /** Fact pills derived from the page's existing localized data (names, places). */
  pills?: string[]
  /**
   * Optional in-page anchors, parallel to `pills`. When pillHrefs[i] is set the
   * pill renders as a jump link ("#recipe-2") instead of dead text — these pages
   * run 8,500–14,000 px tall on a phone, and the hero chips were the natural
   * wayfinding row that did nothing (2026-08-23 yleisilme pass).
   */
  pillHrefs?: string[]
  children?: ReactNode
}

/**
 * PageHero — top-of-pillar-page hero band for laplandfood.com.
 * Image background + Finland-blue overlay (matches laplandwellness convention).
 * Use min-h with svh so iOS Safari URL-bar dynamics don't crop the H1.
 * Content is centred below lg (phones/tablets read it as a poster), left-aligned
 * from lg up where the left scrim keeps the photo visible on the right.
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
  pills,
  pillHrefs,
  children,
}: PageHeroProps) {
  const renderCta = (cta: { label: string; href: string; external?: boolean; rel?: string }, primary: boolean) => {
    const cls = primary
      ? 'inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-base shadow-[0_4px_24px_rgba(236,72,153,0.35)]'
      : 'inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-full border border-white/40 transition-colors text-base'
    if (cta.external) {
      return (
        <a key={cta.label} href={cta.href} target="_blank" rel={cta.rel ?? "noopener"} className={cls}>
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
    <>
    <section className="relative pt-16 min-h-[60svh] md:min-h-[68svh] overflow-hidden bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]">
      <img
        src={imageUrl}
        alt={imageAlt}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Below lg the text is centred, so use an even scrim; from lg the left
          scrim keeps the left-aligned H1 legible while the photo shows right. */}
      <div className="absolute inset-0 bg-[#001F4A]/50 lg:hidden" />
      <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#001F4A]/70 via-[#002F6C]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#001F4A]/40 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex flex-col justify-center items-center text-center lg:items-start lg:text-left min-h-[60svh] md:min-h-[68svh]">
        {eyebrow && (
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-4 drop-shadow-[0_2px_12px_rgba(0,15,40,0.9)]">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading tracking-wide text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-6 max-w-4xl drop-shadow-[0_4px_24px_rgba(0,15,40,0.85)]">
          {title}{' '}
          {titleHighlight && (
            <span className="text-vibe-pink drop-shadow-[0_0_30px_rgba(236,72,153,0.55)]">
              {titleHighlight}
            </span>
          )}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mb-6 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,15,40,0.85)]">
          {subtitle}
        </p>
        {pills && pills.length > 0 && (
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8 max-w-3xl">
            {pills.map((pill, i) => {
              const href = pillHrefs?.[i]
              const inner = (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-vibe-pink flex-shrink-0" aria-hidden="true" />
                  {pill}
                </>
              )
              return href ? (
                <a
                  key={pill}
                  href={href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-3.5 py-1.5 text-xs sm:text-sm text-white/95 hover:border-vibe-pink/70 hover:bg-white/20 transition-colors"
                >
                  {inner}
                </a>
              ) : (
                <span
                  key={pill}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-3.5 py-1.5 text-xs sm:text-sm text-white/95"
                >
                  {inner}
                </span>
              )
            })}
          </div>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {primaryCta && renderCta(primaryCta, true)}
            {secondaryCta && renderCta(secondaryCta, false)}
          </div>
        )}
        {children}
      </div>
    </section>
    <PageBreadcrumb />
    </>
  )
}
