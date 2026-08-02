import { lazy, Suspense } from 'react'
import { AppPromoNudge } from './components/AppPromo'
import { Routes, Route } from 'react-router-dom'
import CookieBanner from './components/CookieBanner'
import NewsletterPopup from './components/NewsletterPopup'
import ScrollToTop from './components/ScrollToTop'
const Home = lazy(() => import('./pages/Home'))
const LocalIngredients = lazy(() => import('./pages/LocalIngredients'))
const TraditionalRecipes = lazy(() => import('./pages/TraditionalRecipes'))
const ModernLapland = lazy(() => import('./pages/ModernLapland'))
const ForagingGuide = lazy(() => import('./pages/ForagingGuide'))
const FoodTours = lazy(() => import('./pages/FoodTours'))
const MichelinDining = lazy(() => import('./pages/MichelinDining'))
const About = lazy(() => import('./pages/About'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
const NotFound = lazy(() => import('./pages/NotFound'))
import { useLocale } from './i18n/useLocale'
import LocaleAutoRedirect from './i18n/LocaleAutoRedirect'
import { useTranslation } from 'react-i18next'

function LocaleSync() { useLocale(); return null; }

function LocalisedCookieBanner() {
  const { i18n } = useTranslation()
  return <CookieBanner lang={i18n.language} />
}

const PREFIXES = ['', '/fi', '/de', '/ja', '/es', '/br', '/cn', '/kr', '/fr', '/it', '/nl', '/sv'];
const PAGES: { path: string; element: React.ReactNode }[] = [
  { path: '/', element: <Home /> },
  { path: '/local-ingredients', element: <LocalIngredients /> },
  { path: '/traditional-recipes', element: <TraditionalRecipes /> },
  { path: '/modern-lapland', element: <ModernLapland /> },
  { path: '/foraging-guide', element: <ForagingGuide /> },
  { path: '/food-tours', element: <FoodTours /> },
  { path: '/michelin-dining', element: <MichelinDining /> },
  { path: '/about', element: <About /> },
  { path: '/privacy', element: <PrivacyPolicy /> },
  { path: '/terms', element: <Terms /> },
  { path: '/cookie-policy', element: <CookiePolicy /> },
];

const ROUTES: { path: string; element: React.ReactNode }[] = [];
for (const p of PAGES) {
  for (const prefix of PREFIXES) {
    const full = prefix === '' ? p.path : (p.path === '/' ? prefix : `${prefix}${p.path}`);
    ROUTES.push({ path: full, element: p.element });
  }
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <LocaleAutoRedirect />
      <LocaleSync />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <LocalisedCookieBanner />
      <NewsletterPopup />
      <AppPromoNudge />
    </>
  )
}
