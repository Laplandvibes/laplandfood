import { Routes, Route } from 'react-router-dom'
import CookieBanner from './components/CookieBanner'
import NewsletterPopup from './components/NewsletterPopup'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import LocalIngredients from './pages/LocalIngredients'
import TraditionalRecipes from './pages/TraditionalRecipes'
import ModernLapland from './pages/ModernLapland'
import ForagingGuide from './pages/ForagingGuide'
import FoodTours from './pages/FoodTours'
import MichelinDining from './pages/MichelinDining'
import About from './pages/About'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import CookiePolicy from './pages/CookiePolicy'
import { useLocale } from './i18n/useLocale'

function LocaleSync() { useLocale(); return null; }

const ROUTES: { path: string; element: React.ReactNode }[] = [
  { path: '/', element: <Home /> },
  { path: '/fi', element: <Home /> },
  { path: '/local-ingredients', element: <LocalIngredients /> },
  { path: '/fi/local-ingredients', element: <LocalIngredients /> },
  { path: '/traditional-recipes', element: <TraditionalRecipes /> },
  { path: '/fi/traditional-recipes', element: <TraditionalRecipes /> },
  { path: '/modern-lapland', element: <ModernLapland /> },
  { path: '/fi/modern-lapland', element: <ModernLapland /> },
  { path: '/foraging-guide', element: <ForagingGuide /> },
  { path: '/fi/foraging-guide', element: <ForagingGuide /> },
  { path: '/food-tours', element: <FoodTours /> },
  { path: '/fi/food-tours', element: <FoodTours /> },
  { path: '/michelin-dining', element: <MichelinDining /> },
  { path: '/fi/michelin-dining', element: <MichelinDining /> },
  { path: '/about', element: <About /> },
  { path: '/fi/about', element: <About /> },
  { path: '/privacy', element: <PrivacyPolicy /> },
  { path: '/fi/privacy', element: <PrivacyPolicy /> },
  { path: '/terms', element: <Terms /> },
  { path: '/fi/terms', element: <Terms /> },
  { path: '/cookie-policy', element: <CookiePolicy /> },
  { path: '/fi/cookie-policy', element: <CookiePolicy /> },
];

export default function App() {
  return (
    <>
      <ScrollToTop />
      <LocaleSync />
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<Home />} />
      </Routes>
      <CookieBanner />
      <NewsletterPopup />
    </>
  )
}
