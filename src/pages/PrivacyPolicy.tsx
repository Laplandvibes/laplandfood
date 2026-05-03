import { useSEO } from '../hooks/useSEO'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PrivacyContent from '../../../shared/Legal/PrivacyContent'

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy | LaplandFood',
    description:
      'How LaplandFood (operated by Lapeso Oy) collects, uses, and protects your personal data. GDPR-compliant, with your rights and complaint routes.',
    path: '/privacy',
  })
  return (
    <div className="min-h-screen bg-deep-night">
      <Nav />
      <PrivacyContent siteName="LaplandFood" />
      <Footer />
    </div>
  )
}
