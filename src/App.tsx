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

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/local-ingredients" element={<LocalIngredients />} />
        <Route path="/traditional-recipes" element={<TraditionalRecipes />} />
        <Route path="/modern-lapland" element={<ModernLapland />} />
        <Route path="/foraging-guide" element={<ForagingGuide />} />
        <Route path="/food-tours" element={<FoodTours />} />
        <Route path="/michelin-dining" element={<MichelinDining />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <CookieBanner />
      <NewsletterPopup />
    </>
  )
}
