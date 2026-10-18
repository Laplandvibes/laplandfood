import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocale } from '../i18n/useLocale'
import PhotoCredit from './PhotoCredit'
import { creditFor } from '../data/photoCredits'
import { bebasEm, Fraasit, ilmanValeja, YKSI_RIVI_EM } from '../lib/otsikkoRivit'

/** Etusivun herokuva (18.10.2026, Vesa: "etusivun hero kuva ei ole mielestäni hyvä"): tekoälyn asetelman
 *  tilalle oikea poronkäristysannos (Antonio Caiazzo, Flickr, CC BY-SA 2.0: vain pienennys, näyttörajaus CSS:llä).
 *  Annos on lähikuva, joten tietokoneella kuva on oikealla puoliskolla kokonaan näkyvissä ja teksti vasemmalla
 *  (sama 'split' kuin PageHerossa). 🔴 Sivuston jakokortti EI saa tulla tästä BY-SA-kuvasta (§34.2): lv-opsin
 *  sivustot.json og.korttikuva osoittaa omaan kuvaan. */
const HERO = {
  src: '/images/hero-poronkaristys-annos-1920.webp',
  srcSet: '/images/hero-poronkaristys-annos-800.webp 800w, /images/hero-poronkaristys-annos-1280.webp 1280w, /images/hero-poronkaristys-annos-1920.webp 1920w, /images/hero-poronkaristys-annos-2560.webp 2560w',
  pos: '55% 45%',
  posLg: '58% 45%',
}

/**
 * Home Hero — full-bleed image with the Finland-blue overlay convention.
 * One H1, two CTAs (primary internal: Recipes, secondary internal: Local Ingredients).
 */
export default function Hero() {
  const { t } = useTranslation('pages')
  const { t: tc } = useTranslation('common')
  const { to, locale } = useLocale()
  // Vesa 3.10.2026: "tehdään turhaan kolmirivisiä". Otsikko on kaksi osaa ("HOW FINLAND" + pinkki "EATS."), ja pakotettu
  // <br> jätti tietokoneella toisen osan yksin riville 9 kielellä, vaikka koko otsikko on 17–25 merkkiä ja mahtuu
  // 1088 px:n palstaan yhdelle riville. xl+: yhdelle riville, kun se on enintään YKSI_RIVI_EM; pidempi (ja, ko)
  // pysyy kahtena osana. Koko lg+ = pienempi kahdesta, suunniteltu --h1-max tai koko jolla pisin rivi mahtuu
  // (100cqi / em). 🔴 Yksi rivi vasta xl:stä: 1024 px:ssä rivi täyttää koko palstan ja pinkki loppuosa osui
  // kuvan vaaleaan reunaan, ohi soikean tummennuksen ("maut." 3,6:1, "COME." 3,6:1, "LA FINLANDIA." 4,1:1 —
  // 12–24 % pikseleistä alle 3:1, heroteksti-portti 3.10.). 1440 ja 2000 px:ssä yksi rivi on puhdas.
  const [p1, p2] = [t('hero.h1Part1'), t('hero.h1Part2')]
  const cjk = ilmanValeja(locale)
  const koko = bebasEm(`${p1}${cjk ? '' : ' '}${p2}`, 0.025)
  const yksiRivi = koko <= YKSI_RIVI_EM
  const kaksiEm = Math.max(bebasEm(p1, 0.025), bebasEm(p2, 0.025))
  return (
    <section className="relative pt-16 overflow-hidden bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] lg:bg-none lg:bg-[#002F6C] lg:min-h-[80svh] lg:flex lg:items-center">
      {/* 18.10.2026 (Vesa: "etusivun hero kuva ei ole mielestäni hyvä"): verkoston heromalli
          kuten PageHero. Alle 1024 px kuva on oma puhdas kaistansa ilman tummennusta ja teksti
          sen alla; lg+:ssa teksti vasemmalla kuvan päällä yhden vaakaliukuman varassa. Vanha
          keskitetty soikea tummennus (radial) on poistettu kokonaan, se peitti kuvan keskeltä. */}
      <div
        className="relative h-[42svh] min-h-[260px] sm:h-[400px] md:h-[460px] lg:absolute lg:inset-y-0 lg:right-0 lg:w-[48%] lg:h-auto lg:min-h-0 overflow-hidden"
        data-lv-tp-tausta="hero"
      >
        <img
          src={HERO.src}
          srcSet={HERO.srcSet}
          sizes="(max-width: 639px) 160vw, (min-width: 1024px) 48vw, 100vw"
          alt={t('hero.imageAlt')}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
          className="absolute inset-0 w-full h-full object-cover [object-position:var(--hero-pos)] lg:[object-position:var(--hero-pos-lg)]"
          style={{ ['--hero-pos' as string]: HERO.pos, ['--hero-pos-lg' as string]: HERO.posLg }}
        />
        <div aria-hidden="true" className="hidden lg:block absolute inset-y-0 left-0 w-28 xl:w-40 bg-gradient-to-r from-[#002F6C] to-transparent" />
        <PhotoCredit credit={creditFor(HERO.src)} label={tc('photo.label')} modifiedLabel={tc('photo.modified')} />
      </div>

      {/* pb jättää tilaa heron alareunan päälle nouseville lukulaatoille (-mt etusivulla). */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-8 pb-24 md:pb-28 lg:pt-24 lg:pb-36">
        <div className="@container max-w-3xl mx-auto lg:mx-0 lg:max-w-[calc(52vw-max(0px,(100vw-80rem)/2)-5rem)] flex flex-col items-center text-center lg:items-start lg:text-left">
        {/* 🔴 Muste #F9A8D4 (heroteksti-portti 20.9.2026): rivi on pientä tekstiä, raja 4,5:1. */}
        <p className="text-[#F9A8D4] text-sm md:text-base font-semibold tracking-[0.22em] uppercase mb-5">
          {t('hero.kicker')}
        </p>
        <h1
          className={`font-heading tracking-wide text-5xl sm:text-6xl md:text-7xl lg:[--h1-max:6rem] xl:[--h1-max:clamp(96px,1.5vw_+_76.8px,115.2px)] lg:[font-size:min(var(--h1-max),calc(100cqi/var(--h1-em-lg)))] xl:[font-size:min(var(--h1-max),calc(100cqi/var(--h1-em-xl)))] text-white leading-[0.92] mb-7 break-words lg:drop-shadow-[0_2px_14px_rgba(0,15,40,0.6)]${cjk ? ' [word-break:keep-all] [overflow-wrap:anywhere]' : ''}`}
          style={{ ['--h1-em-lg' as string]: kaksiEm.toFixed(2), ['--h1-em-xl' as string]: (yksiRivi ? koko : kaksiEm).toFixed(2) }}
        >
          <Fraasit text={p1} lang={locale} />
          <br className={yksiRivi ? 'xl:hidden' : undefined} />
          {yksiRivi && (cjk ? <wbr /> : ' ')}
          <span className="text-vibe-pink"><Fraasit text={p2} lang={locale} /></span>
        </h1>
        {/* Leipäteksti vasemmalle myös puhelimella (Vesa 18.10.2026). */}
        <p className="text-lg md:text-xl text-white/95 max-w-2xl mb-10 leading-relaxed text-left text-pretty lg:drop-shadow-[0_2px_10px_rgba(0,15,40,0.7)]">
          {t('hero.subhead')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            to={to('/traditional-recipes')}
            // 🔴 #DB2777, ei #EC4899: valkoinen 16 px:n teksti #EC4899:n päällä on 3,53:1, #DB2777:n 4,63:1.
            className="inline-flex items-center justify-center bg-[#DB2777] hover:bg-[#BE185D] text-white font-semibold px-8 py-4 rounded-full transition-colors text-base shadow-[0_4px_28px_rgba(219,39,119,0.4)]"
          >
            {t('hero.ctaPrimary')}
          </Link>
          <Link
            to={to('/local-ingredients')}
            className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-4 rounded-full border border-white/40 transition-colors text-base"
          >
            {t('hero.ctaSecondary')}
          </Link>
        </div>
        </div>
      </div>
    </section>
  )
}
