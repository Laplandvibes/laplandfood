import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CookieContent from '../../../shared/Legal/CookieContent';
import { useLocale } from '../i18n/useLocale';
export default function CookiePolicy() {
  const { locale } = useLocale();
  return <><SEO titleKey="cookie.title" descriptionKey="cookie.description" path={'/cookie-policy'} /><div className="min-h-screen bg-deep-night">
      <Nav />
      <CookieContent siteId="laplandfood" siteName="LaplandFood" lang={locale} />
      <Footer />
    </div></>;
}