import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import TermsContent from '../../../shared/Legal/TermsContent';
export default function Terms() {
  return <><SEO title={'Terms of Use | LaplandFood'} description={'Terms of use for laplandfood.com — operated by Lapeso Oy. We are an editorial publisher; bookings happen via partner sites and their own terms apply.'} path={'/terms'} /><div className="min-h-screen bg-deep-night">
      <Nav />
      <TermsContent siteName="LaplandFood" siteUrl="laplandfood.com" />
      <Footer />
    </div></>;
}