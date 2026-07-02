import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import TermsContent from '../../../shared/Legal/TermsContent';
import { useLocale } from '../i18n/useLocale';
export default function Terms() {
  const { locale } = useLocale();
  return <><SEO titleKey="terms.title" descriptionKey="terms.description" path={'/terms'} /><div className="min-h-screen bg-deep-night">
      <Nav />
      <TermsContent siteName="LaplandFood" siteUrl="laplandfood.com" lang={locale} />
      <Footer />
    </div></>;
}