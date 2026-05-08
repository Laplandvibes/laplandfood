import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PrivacyContent from '../../../shared/Legal/PrivacyContent';
export default function PrivacyPolicy() {
  return <><SEO titleKey="privacy.title" descriptionKey="privacy.description" path={'/privacy'} /><div className="min-h-screen bg-deep-night">
      <Nav />
      <PrivacyContent siteName="LaplandFood" />
      <Footer />
    </div></>;
}