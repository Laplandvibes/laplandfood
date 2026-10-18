import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageBreadcrumb from './PageBreadcrumb'
import PhotoCredit from './PhotoCredit'
import { creditFor } from '../data/photoCredits'
import { bebasEm } from '../lib/otsikkoRivit'

interface PageHeroProps {
  eyebrow?: string
  title: string
  titleHighlight?: string
  subtitle: string
  imageUrl: string
  imageAlt: string
  /** Valinnainen srcset (4.10.2026): uusille valokuvaheroille 1280 + 2400 px, jotta puhelin ei lataa
   *  työpöydän tiedostoa eikä 2 000 px:n näyttö venytä pientä. */
  imageSrcSet?: string
  /** 'strong' (4.10.2026): kirkkaalle valokuvalle (lumi) tummempi verho, jotta valkoinen otsikko ja
   *  ingressi pysyvät ≥ 3:1 / 4,5:1. Mitattu audit_hero_text_contrast.mjs:llä /traditional-recipes. */
  scrim?: 'default' | 'strong'
  /** Kuvan rajauskohta (object-position) puhelimen kaistassa ja oletuksena myös lg+:ssa. */
  imagePosition?: string
  /** Rajauskohta lg+:ssa, jos eri kuin puhelimella (teksti peittää vasemman puolen). */
  imagePositionLg?: string
  /** 'bleed' = maisema koko heron taustana, teksti vasemmalla liukuman päällä (oletus).
   *  'split' = lähikuva (annos, lautanen) oikealla puoliskolla kokonaan näkyvissä ja teksti vasemmalla
   *  sinisellä: keskellä oleva lautanen jäisi muuten tekstin ja liukuman alle (18.10.2026). */
  layout?: 'bleed' | 'split'
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
  imageSrcSet,
  scrim = 'default',
  imagePosition = '50% 50%',
  imagePositionLg,
  layout = 'bleed',
  primaryCta,
  secondaryCta,
  pills,
  pillHrefs,
  children,
}: PageHeroProps) {
  const { t: tc } = useTranslation('common')
  const split = layout === 'split'
  // Otsikko tietokoneella enintään kahdelle riville (Vesa 3.10.2026: "tehdään turhaan kolmirivisiä"):
  // koko = pienempi kahdesta, suunniteltu koko tai koko jolla puolikas otsikko mahtuu palstaan.
  // 1,12 = varaa sille, ettei rivi katkea tasan puolivälistä.
  const puoliEm = (bebasEm(`${title} ${titleHighlight ?? ''}`.trim(), 0.025) / 2) * 1.12
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
    {/* 18.10.2026 (Vesa: "hero kuvat on ihan päin vittua"): verkoston heromalli kuten
        laplandactivities 17.10. ja skiresorts 3.10. Alle 1024 px kuva on oma puhdas kaistansa
        ilman tummennusta ja teksti sen alla Suomen-sinisellä pohjalla; lg+:ssa teksti kuvan
        päällä vasemmalla yhden vaakaliukuman varassa. Tekstin takana ollut sumennettu laikku
        on poistettu: Vesa hylkäsi sen 17.10. ("eikö ne ole mielestäsi kauheat?"). */}
    <section className={`relative pt-16 overflow-hidden bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] lg:flex lg:items-center ${split ? 'lg:bg-none lg:bg-[#002F6C] lg:min-h-[70svh]' : 'lg:min-h-[76svh]'}`}>
      <div
        className={`relative h-[42svh] min-h-[240px] sm:h-[380px] md:h-[440px] lg:absolute lg:h-auto lg:min-h-0 overflow-hidden ${split ? 'lg:inset-y-0 lg:right-0 lg:w-[48%]' : 'lg:inset-0'}`}
        data-lv-tp-tausta="hero"
      >
        <img
          src={imageUrl}
          srcSet={imageSrcSet}
          // Puhelimen kaista on lähes neliö, joten vaakakuva piirtyy ~1,6 × ikkunan levyisenä
          // (laplandactivities 17.10.: sizes 100vw sai puhelimen valitsemaan liian pienen tiedoston).
          sizes={imageSrcSet ? (split ? '(max-width: 639px) 160vw, (min-width: 1024px) 48vw, 100vw' : '(max-width: 639px) 160vw, 100vw') : undefined}
          alt={imageAlt}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
          className="absolute inset-0 w-full h-full object-cover [object-position:var(--hero-pos)] lg:[object-position:var(--hero-pos-lg)]"
          style={{ ['--hero-pos' as string]: imagePosition, ['--hero-pos-lg' as string]: imagePositionLg ?? imagePosition }}
        />
        {split ? (
          // Vain kuvan vasen reuna sulautuu siniseen; itse annos jää koskemattomaksi.
          <div aria-hidden="true" className="hidden lg:block absolute inset-y-0 left-0 w-28 xl:w-40 bg-gradient-to-r from-[#002F6C] to-transparent" />
        ) : (
          <div
            aria-hidden="true"
            className={`hidden lg:block absolute inset-0 bg-gradient-to-r ${scrim === 'strong' ? 'from-[#001F4A]/92 via-[#001F4A]/80' : 'from-[#001F4A]/88 via-[#001F4A]/72'} via-60% to-transparent`}
          />
        )}
        {/* Avoimen lisenssin kuvan tekijä + lisenssi piirtyy automaattisesti polun
            perusteella (src/data/photoCredits.ts). Omat kuvat eivät saa merkintää. */}
        <PhotoCredit credit={creditFor(imageUrl)} label={tc('photo.label')} modifiedLabel={tc('photo.modified')} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-7 pb-10 sm:pt-9 sm:pb-12 lg:py-20">
        <div className={`@container max-w-3xl mx-auto lg:mx-0 text-center lg:text-left ${split ? 'lg:max-w-[calc(52vw-max(0px,(100vw-80rem)/2)-5rem)]' : 'lg:max-w-[56rem]'}`}>
        {/* 🔴 Yläotsake kiinteällä laatalla (18.9.2026): pinkki #EC4899 / #001F4A = 4,6:1
            kuvasta riippumatta. Alle 1024 px laatta on sinisellä pohjalla, lg+ kuvan päällä. */}
        {eyebrow && (
          <p className="inline-block max-w-full rounded-2xl sm:rounded-full bg-[#001F4A] px-3.5 py-1.5 text-center leading-snug text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-4">
            {eyebrow}
          </p>
        )}
          <h1
            className={`font-heading tracking-wide text-5xl sm:text-6xl md:text-7xl text-white leading-[0.95] mb-5 lg:[font-size:min(var(--h1-max),calc(100cqi/var(--h1-em)))] ${split ? 'lg:[--h1-max:3.75rem]' : 'lg:[--h1-max:4.5rem] xl:[--h1-max:5.5rem] lg:drop-shadow-[0_2px_14px_rgba(0,15,40,0.6)]'}`}
            style={{ ['--h1-em' as string]: puoliEm.toFixed(2) }}
          >
            {title}{' '}
            {titleHighlight && (
              <span className="text-vibe-pink">
                {titleHighlight}
              </span>
            )}
          </h1>
          {/* Leipäteksti vasemmalle myös puhelimella (Vesa 18.10.2026: keskitetty monirivinen
              kappale = reunat hyppivät); otsikko, yläotsake, sirut ja napit keskellä. */}
          <p className="text-base sm:text-lg md:text-xl text-white/95 mb-6 leading-relaxed text-left text-pretty lg:max-w-2xl lg:drop-shadow-[0_2px_10px_rgba(0,15,40,0.7)]">
            {subtitle}
          </p>
        {pills && pills.length > 0 && (
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
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
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#001F4A]/60 px-3.5 py-1.5 text-xs sm:text-sm text-white/95 hover:border-vibe-pink/70 hover:bg-[#001F4A]/80 transition-colors"
                >
                  {inner}
                </a>
              ) : (
                <span
                  key={pill}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#001F4A]/60 px-3.5 py-1.5 text-xs sm:text-sm text-white/95"
                >
                  {inner}
                </span>
              )
            })}
          </div>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
            {primaryCta && renderCta(primaryCta, true)}
            {secondaryCta && renderCta(secondaryCta, false)}
          </div>
        )}
        {children}
        </div>
      </div>
    </section>
    <PageBreadcrumb />
    </>
  )
}
