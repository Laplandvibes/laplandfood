import { useTranslation } from 'react-i18next';
import { MapPin, Calendar } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import IntroPoints from '../components/IntroPoints';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import { gygSearchLink } from '../lib/gyg';
import { useLocale } from '../i18n/useLocale';

// No prices, durations, group sizes, or ratings on these cards: the CTA is a
// live GYG SEARCH (operators rotate), so we can't honestly claim any of those
// numbers. Location + season describe the trip type, which we can stand behind.
interface Tour {
  name: string;
  description: string;
  highlights: string[];
  location: string;
  season: string;
}

const TOUR_META = [
  { sid: 'tour_sami_culture', searchQuery: 'Sami food culture Lapland', image: '/images/tour-sami-culture.jpg' },
  { sid: 'tour_arctic_fine_dining', searchQuery: 'Lapland fine dining tasting menu', image: '/images/tour-fine-dining.jpg' },
  { sid: 'tour_foraging', searchQuery: 'Lapland foraging tour', image: '/images/tour-foraging.jpg' },
];

export default function FoodTours() {
  const { t } = useTranslation('pages');
  const { locale } = useLocale();
  const browseAllHref = gygSearchLink('Lapland food cooking class tour', 'browse_all', locale);
  const tours = (t('foodTours.tours', { returnObjects: true }) as Tour[]) || [];

  return (
    <>
      <SEO titleKey="foodTours.title" descriptionKey="foodTours.description" path={'/food-tours'} />
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero
          eyebrow={t('foodTours.hero.eyebrow')}
          title={t('foodTours.hero.title')}
          titleHighlight={t('foodTours.hero.titleHighlight')}
          subtitle={t('foodTours.hero.subtitle')}
          imageUrl="/images/hero-tours.jpg"
          imageAlt="Small group around a campfire in an Arctic forest, cooking foraged mushrooms over a kettle, golden-hour light"
          primaryCta={{ label: t('foodTours.hero.primaryCta'), href: browseAllHref, external: true, rel: 'sponsored nofollow noopener' }}
          pills={tours.map(tour => tour.location)}
        />

        <IntroPoints sectionKey="foodTours" />

        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-2">
                  {t('foodTours.listKicker')}
                </p>
                <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C]">
                  {t('foodTours.listHeadline')}
                </h2>
              </div>
              <a href={browseAllHref} target="_blank" rel="sponsored nofollow noopener" className="text-sm font-semibold text-vibe-pink hover:underline whitespace-nowrap">
                {t('foodTours.browseAllLabel')} →
              </a>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {tours.map((tour, i) => {
                const meta = TOUR_META[i];
                const href = gygSearchLink(meta.searchQuery, meta.sid, locale);
                return (
                  <article key={tour.name} className="group relative flex flex-col rounded-2xl bg-white border border-[#002F6C]/10 hover:border-vibe-pink/40 hover:shadow-[0_10px_32px_rgba(0,47,108,0.08)] transition-all overflow-hidden">
                    <div className="relative h-64 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                      <img src={meta.image} alt={tour.name} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/5 via-[#002F6C]/15 to-[#002F6C]/70" />
                      <div className="absolute bottom-4 left-5 right-5">
                        <h3 className="font-heading tracking-wide text-2xl text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,15,40,0.6)]">
                          {tour.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 p-6">
                      <p className="text-sm text-[#002F6C]/80 leading-relaxed mb-4">
                        {tour.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2.5 text-xs mb-4">
                        <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-vibe-pink flex-shrink-0" /> <span className="text-[#002F6C]/80">{tour.location}</span></div>
                        <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-vibe-pink flex-shrink-0" /> <span className="text-[#002F6C]/80">{tour.season}</span></div>
                      </div>

                      <ul className="space-y-1 mb-5 flex-1">
                        {tour.highlights.slice(0, 3).map(h => (
                          <li key={h} className="flex gap-2 text-xs text-[#002F6C]/75">
                            <span className="w-1 h-1 rounded-full bg-vibe-pink mt-1.5 flex-shrink-0" />
                            <span className="leading-snug">{h}</span>
                          </li>
                        ))}
                        {tour.highlights.length > 3 && <li className="text-xs text-[#002F6C]/75 pl-3">+ {tour.highlights.length - 3} {t('foodTours.moreLabel')}</li>}
                      </ul>

                      <a href={href} target="_blank" rel="sponsored nofollow noopener" className="block w-full text-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm">
                        {t('foodTours.checkAvailability')} →
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
}
