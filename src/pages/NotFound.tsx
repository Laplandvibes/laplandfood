import { useTranslation } from 'react-i18next'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SharedNotFound from '../shared/NotFound'
import { useLocale } from '../i18n/useLocale'

// Thin wrapper around the canonical shared 404 (Vesa 2026-07-12: catch-all no
// longer renders the home page). Food-new's content pages render on bg-white
// (Home/About/recipes etc. all use `min-h-screen bg-white`), so this uses the
// light variant to match; the network-default vibe-pink accent still applies
// since it's the site's real CTA colour (unlike e.g. store's amber).
// No <Layout> wrapper exists on this site — every page composes its own
// Nav/Footer, so this wrapper does the same.
export default function NotFound() {
  const { t } = useTranslation('nav')
  const { to, locale } = useLocale()

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <SharedNotFound
        lang={locale}
        siteName="LaplandFood"
        homeHref={to('/')}
        variant="light"
        className="pt-16"
        links={[
          { href: to('/traditional-recipes'), label: t('links.recipes') },
          { href: to('/local-ingredients'), label: t('links.ingredients') },
          { href: to('/food-tours'), label: t('links.foodTours') },
        ]}
      />
      <Footer />
    </div>
  )
}
