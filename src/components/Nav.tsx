import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, ChevronDown } from 'lucide-react'
import LanguageSwitcher from '../i18n/LanguageSwitcher'
import EcosystemMenu from '../shared/EcosystemMenu'
import { useLocale } from '../i18n/useLocale'

/**
 * Päävalikko. 14.9.2026 (Vesa: "tee niille sitte oma alavalikko suomen marjat
 * tai jotain"): yksittäinen Hilla-linkki korvattiin Marjat-ryhmällä, jonka
 * alla ovat marjaopas (/berries) ja neljä marjasivua. Työpöydällä (xl) ryhmä
 * avautuu hoverilla, klikkauksella ja näppäimistöllä (Escape sulkee, fokuksen
 * poistuminen sulkee); mobiililaatikossa se on sisennetty lohko. Pelkkä React-
 * tila + Tailwind, ei animaatiokirjastoja.
 *
 * 23.9.2026: Reseptit-linkki muuttui samanlaiseksi ryhmäksi, kun sivustolle tuli
 * kaksi ruokalajisivua (poronkäristys, leipäjuusto). Linkkien määrä yläpalkissa
 * ei kasvanut: ryhmä istuu siinä missä Reseptit-linkki oli.
 */
const links = [
  { to: '/', key: 'home' },
  { to: '/local-ingredients', key: 'ingredients' },
  { to: '/modern-lapland', key: 'modern' },
  { to: '/foraging-guide', key: 'foraging' },
  { to: '/michelin-dining', key: 'michelin' },
  { to: '/food-tours', key: 'foodTours' },
  { to: '/about', key: 'about' },
] as const

/** Marjaryhmän sisältö. Ensimmäinen on kokoava opas, loput yksittäiset marjat
 *  sesonkijärjestyksessä (hilla → mustikka → puolukka → tyrni). */
export const BERRY_LINKS = [
  { to: '/berries', labelKey: 'berries.allBerries' },
  { to: '/cloudberry', labelKey: 'links.cloudberry' },
  { to: '/bilberry', labelKey: 'berries.bilberry' },
  { to: '/lingonberry', labelKey: 'berries.lingonberry' },
  { to: '/sea-buckthorn', labelKey: 'berries.seaBuckthorn' },
] as const

/** Reseptiryhmä: ensin kokoava reseptisivu, sitten ruokalajit hakukysynnän järjestyksessä
 *  (poronkäristys 14 800/kk, leipäjuusto 5 400/kk Suomessa, mitattu 23.9.2026). */
export const RECIPE_LINKS = [
  { to: '/traditional-recipes', labelKey: 'recipesMenu.all' },
  { to: '/poronkaristys', labelKey: 'recipesMenu.poronkaristys' },
  { to: '/leipajuusto', labelKey: 'recipesMenu.leipajuusto' },
] as const

type GroupItem = { to: string; labelKey: string }
type GroupId = 'berries' | 'recipes'

const GROUPS: { id: GroupId; labelKey: string; items: readonly GroupItem[] }[] = [
  { id: 'berries', labelKey: 'links.berries', items: BERRY_LINKS },
  { id: 'recipes', labelKey: 'links.recipes', items: RECIPE_LINKS },
]

// Ryhmät istuvat Raaka-aineet-linkin perässä: Marjat siinä missä Hilla oli,
// Reseptit siinä missä Reseptit-linkki oli.
const GROUPS_AFTER_INDEX = 1

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<GroupId | null>(null)
  const location = useLocation()
  const { t } = useTranslation('nav')
  const { to, pathWithoutLocale, locale } = useLocale()

  useEffect(() => {
    setOpen(false)
    setOpenGroup(null)
  }, [location.pathname])

  const isActive = (basePath: string) => {
    if (basePath === '/') return pathWithoutLocale === '/'
    return pathWithoutLocale.startsWith(basePath)
  }

  const desktopLink = (link: (typeof links)[number]) => (
    <Link
      key={link.to}
      to={to(link.to)}
      className={`px-3 py-2 text-sm whitespace-nowrap transition-colors duration-200 rounded-md ${
        isActive(link.to)
          ? 'text-white font-bold'
          : 'text-white/80 hover:text-white font-medium'
      }`}
    >
      {t(`links.${link.key}`)}
    </Link>
  )

  const mobileLink = (link: (typeof links)[number]) => (
    <Link
      key={link.to}
      to={to(link.to)}
      className={`px-4 py-3 text-sm rounded-lg transition-colors ${
        isActive(link.to)
          ? 'text-white font-bold bg-white/10'
          : 'text-white/80 hover:text-white font-medium hover:bg-white/5'
      }`}
    >
      {t(`links.${link.key}`)}
    </Link>
  )

  /* Pudotusvalikko. Kääre kantaa hover-tilan, jotta siirtymä napista
     paneeliin ei sulje valikkoa (paneelin pt-2 on kääreen sisällä, ei
     marginaali sen ulkopuolella). */
  const desktopGroup = (g: (typeof GROUPS)[number]) => {
    const isOpen = openGroup === g.id
    const active = g.items.some((b) => isActive(b.to))
    return (
      <div
        key={g.id}
        className="relative"
        onMouseEnter={() => setOpenGroup(g.id)}
        onMouseLeave={() => setOpenGroup((v) => (v === g.id ? null : v))}
        onKeyDown={(e) => { if (e.key === 'Escape') setOpenGroup(null) }}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenGroup((v) => (v === g.id ? null : v)) }}
      >
        <button
          type="button"
          onClick={() => setOpenGroup((v) => (v === g.id ? null : g.id))}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls={`nav-${g.id}-menu`}
          data-nav-group={g.id}
          className={`inline-flex items-center gap-1 px-3 py-2 text-sm whitespace-nowrap transition-colors duration-200 rounded-md ${
            active ? 'text-white font-bold' : 'text-white/80 hover:text-white font-medium'
          }`}
        >
          {t(g.labelKey)}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        {isOpen && (
          <div id={`nav-${g.id}-menu`} className="absolute left-0 top-full pt-2 z-50">
            <ul className="min-w-[230px] rounded-xl bg-[#002F6C] border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.35)] py-2">
              {g.items.map((b, i) => (
                <li key={b.to} className={i === 0 ? 'border-b border-white/15 mb-1 pb-1' : ''}>
                  <Link
                    to={to(b.to)}
                    data-nav-group-option={b.to}
                    className={`flex items-center min-h-11 px-4 py-2 text-sm transition-colors ${
                      isActive(b.to)
                        ? 'text-white font-bold bg-white/10'
                        : 'text-white/85 hover:text-white hover:bg-white/10 font-medium'
                    }`}
                  >
                    {t(b.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  /* Mobiililohko: otsake + sisennetyt linkit, samat 44 px:n rivit. */
  const mobileGroup = (g: (typeof GROUPS)[number]) => (
    <div key={g.id} className="flex flex-col gap-1">
      <p className="px-4 pt-3 pb-1 text-[11px] uppercase tracking-[0.18em] font-semibold text-white/60">
        {t(g.labelKey)}
      </p>
      {g.items.map((b) => (
        <Link
          key={b.to}
          to={to(b.to)}
          className={`px-4 pl-8 py-3 text-sm rounded-lg transition-colors ${
            isActive(b.to)
              ? 'text-white font-bold bg-white/10'
              : 'text-white/80 hover:text-white font-medium hover:bg-white/5'
          }`}
        >
          {t(b.labelKey)}
        </Link>
      ))}
    </div>
  )

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#002F6C] border-b border-white/20">
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <EcosystemMenu lang={locale} currentDomain="laplandfood.com" />
          <Link className="inline-flex items-center min-h-11" to={to('/')} aria-label={t('ariaHome')}
            onClick={() => {
              // 🔴 Verkostovika, mitattu 20.9.2026 seitsemällä sivustolla seitsemästä:
              // ScrollToTop kuuntelee pathnamea, joka ei muutu kun ollaan jo
              // etusivulla, joten logon klikkaus ei tehnyt siellä mitään.
              if (window.location.pathname.replace(/\/$/, '') === to('/').replace(/\/$/, '')) {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            {/* Verkoston standardikoko (CLAUDE.md logo-kuvio): text-2xl md:text-3xl.
                Tämä sivusto oli jäänyt yhden askeleen pienemmäksi (xl/2xl) ja
                näytti navissa kutistuneelta (Vesa 2026-08-10, kahdesti). */}
            <span className="font-heading tracking-wide text-2xl md:text-3xl">
              <span className="text-vibe-pink drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]">#</span>
              <span className="text-white">LAPLAND</span>
              <span className="text-vibe-pink">FOOD</span>
            </span>
          </Link>
        </div>

        <div className="hidden xl:flex items-center gap-0.5">
          {links.slice(0, GROUPS_AFTER_INDEX + 1).map(desktopLink)}
          {GROUPS.map(desktopGroup)}
          {links.slice(GROUPS_AFTER_INDEX + 1).map(desktopLink)}
          <LanguageSwitcher className="ml-2" />
        </div>

        <div className="xl:hidden flex items-center gap-1.5 shrink-0">
          <LanguageSwitcher />
          <button
            className="p-2 text-white min-w-11 min-h-11 flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label={open ? t('closeMenu') : t('openMenu')}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden bg-[#002F6C] border-t border-white/20">
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.slice(0, GROUPS_AFTER_INDEX + 1).map(mobileLink)}
            {GROUPS.map(mobileGroup)}
            {links.slice(GROUPS_AFTER_INDEX + 1).map(mobileLink)}
          </div>
        </div>
      )}
    </nav>
  )
}
