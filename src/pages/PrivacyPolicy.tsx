import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PrivacyContent from '../../../shared/Legal/PrivacyContent';
import { useLocale } from '../i18n/useLocale';
export default function PrivacyPolicy() {
  const { locale } = useLocale();
  return <><SEO titleKey="privacy.title" descriptionKey="privacy.description" path={'/privacy'} /><div className="min-h-screen bg-deep-night">
      <Nav />
      <PrivacyContent siteName="LaplandFood" lang={locale} />
      <Footer />
    </div></>;
}