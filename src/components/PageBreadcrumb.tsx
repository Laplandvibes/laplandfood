import Breadcrumbs from '../../../shared/Breadcrumbs'
import { useLocale } from '../i18n/useLocale'
import { useTranslation } from 'react-i18next'

/**
 * Ecosystem breadcrumb, rendered BELOW the hero (mounted once inside PageHero)
 * so it reads as the first line of page content instead of a bar wedged between
 * the nav and the hero. Self-hides on home + unmapped routes.
 */
export default function PageBreadcrumb() {
  const { locale, to } = useLocale()
  const { t } = useTranslation('nav')
  const labelMap: Record<string, string> = {
    '/local-ingredients': t('links.ingredients'),
    '/traditional-recipes': t('links.recipes'),
    '/modern-lapland': t('links.modern'),
    '/foraging-guide': t('links.foraging'),
    '/michelin-dining': t('links.michelin'),
    '/food-tours': t('links.foodTours'),
    '/about': t('links.about'),
  }
  return (
    <Breadcrumbs
      lang={locale}
      to={to}
      labelMap={labelMap}
      className="bg-white text-deep-night border-b border-deep-night/10"
      accentClassName="hover:text-vibe-pink hover:opacity-100"
    />
  )
}
