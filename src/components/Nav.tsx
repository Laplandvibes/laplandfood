import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from '../i18n/LanguageSwitcher'
import EcosystemMenu from '../shared/EcosystemMenu'
import { useLocale } from '../i18n/useLocale'

const links = [
  { to: '/', key: 'home' },
  { to: '/local-ingredients', key: 'ingredients' },
  { to: '/traditional-recipes', key: 'recipes' },
  { to: '/modern-lapland', key: 'modern' },
  { to: '/foraging-guide', key: 'foraging' },
  { to: '/michelin-dining', key: 'michelin' },
  { to: '/food-tours', key: 'foodTours' },
  { to: '/about', key: 'about' },
] as const

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation('nav')
  const { to, pathWithoutLocale, locale } = useLocale()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const isActive = (basePath: string) => {
    if (basePath === '/') return pathWithoutLocale === '/'
    return pathWithoutLocale.startsWith(basePath)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#002F6C] border-b border-white/20">
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <EcosystemMenu lang={locale} currentDomain="laplandfood.com" />
          <Link to={to('/')} aria-label={t('ariaHome')}>
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
          {links.map((link) => (
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
          ))}
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
            {links.map((link) => (
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
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
