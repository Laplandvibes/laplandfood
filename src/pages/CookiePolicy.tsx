import { useSEO } from '../hooks/useSEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CookieContent from '../../../shared/Legal/CookieContent'

export default function CookiePolicy() {
  useSEO({
    title: 'Cookie Policy | LaplandFood',
    description:
      'Cookies and tracking on laplandfood.com — what we set, why, and how to opt out. GA4 consent-mode v2 default-denied until you accept.',
    path: '/cookie-policy',
  })
  return (
    <div className="min-h-screen bg-deep-night">
      <Nav />
      <CookieContent siteId="laplandfood" siteName="LaplandFood" />
      <Footer />
    </div>
  )
}
