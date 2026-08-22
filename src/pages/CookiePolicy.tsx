import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CookieContent from '../shared/Legal/CookieContent';
import { useLocale } from '../i18n/useLocale';
export default function CookiePolicy() {
  const { locale } = useLocale();
  return <><SEO titleKey="cookie.title" descriptionKey="cookie.description" path={'/cookie-policy'} /><div className="min-h-screen bg-deep-night">
      <Nav />
      {/* 🔴 The landmark for this page. shared/Legal/CookieContent opens a
          plain <div> (only its sibling TermsContent opens a <main>), so without
          this wrapper the page has NO main landmark at all -- measured from the
          rendered DOM 2026-08-13 across 10 network sites. Do not remove. */}
      <main>
        <CookieContent siteId="laplandfood" siteName="LaplandFood" lang={locale} />
      </main>
      <Footer />
    </div></>;
}