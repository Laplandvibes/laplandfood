import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Award, Sparkles, ChefHat, Star, Wine, Clock, Users, Leaf, MapPin } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import AffiliateCTA from '../components/AffiliateCTA';
import { useLocale } from '../i18n/useLocale';
import { withReferral } from '../lib/withReferral';

interface Fact { title: string; body: string }
interface HelsinkiRoom { name: string; where: string; angle: string; band: string }
interface LaplandRoom { name: string; city: string; address: string; angle: string; signature: string; band: string; booking: string }
interface CourseItem { n: string; label: string; body: string }
interface Note { label: string; body: string }

const FACT_ICONS = [Award, Sparkles, ChefHat];
const NOTE_ICONS = [Clock, Wine, Leaf, Users];
const LAPLAND_IMAGES = ['/images/restaurant-nili.jpg', '/images/restaurant-aanaar.jpg', '/images/restaurant-rakas.jpg'];
const LAPLAND_SIDS = ['rovaniemi', 'inari', 'arctic_treehouse'];
// Index-mapped to michelinDining.helsinki.rooms (Olo, Palace, Demo, Grön,
// Inari, Ora, Finnjävel, Ultima — same order in all 12 locales). Interior
// mood shots from the existing batch-4 image set.
const HELSINKI_IMAGES = [
  '/images/hki-olo.jpg',
  '/images/hki-palace.jpg',
  '/images/hki-demo.jpg',
  '/images/hki-gron.jpg',
  '/images/hki-inari.jpg',
  '/images/hki-ora.jpg',
  '/images/hki-finnjavel.jpg',
  '/images/hki-ultima.jpg',
];

export default function MichelinDining() {
  const { t } = useTranslation('pages');
  const { to } = useLocale();
  const facts = (t('michelinDining.facts', { returnObjects: true }) as Fact[]) || [];
  const helsinkiRooms = (t('michelinDining.helsinki.rooms', { returnObjects: true }) as HelsinkiRoom[]) || [];
  const laplandRooms = (t('michelinDining.lapland.rooms', { returnObjects: true }) as LaplandRoom[]) || [];
  const courseFlow = (t('michelinDining.courseFlow.items', { returnObjects: true }) as CourseItem[]) || [];
  const bookingNotes = (t('michelinDining.bookingNotes.items', { returnObjects: true }) as Note[]) || [];

  return (
    <>
      <SEO titleKey="michelinDining.title" descriptionKey="michelinDining.description" path={'/michelin-dining'} />
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero
          eyebrow={t('michelinDining.hero.eyebrow')}
          title={t('michelinDining.hero.title')}
          titleHighlight={t('michelinDining.hero.titleHighlight')}
          subtitle={t('michelinDining.hero.subtitle')}
          imageUrl="/images/hero-michelin.jpg"
          imageAlt="Tasting-menu plating with foraged herbs and gold-rimmed dishware on a dark linen table"
          primaryCta={{ label: t('michelinDining.hero.primaryCta'), href: `${to('/michelin-dining')}#lapland` }}
          secondaryCta={{ label: t('michelinDining.hero.secondaryCta'), href: `${to('/michelin-dining')}#helsinki` }}
          pills={laplandRooms.map(r => r.name)}
          pillHrefs={laplandRooms.map((_, i) => `#lapland-room-${i}`)}
        />

        {/* Three structural facts */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10 max-w-3xl mx-auto">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('michelinDining.factsKicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">
                {t('michelinDining.factsHeadline')}
              </h2>
              <p className="text-base sm:text-lg text-[#002F6C]/75 leading-relaxed">
                {t('michelinDining.factsLeadPrefix')}{' '}
                <a className="text-vibe-pink underline-offset-4 hover:underline" href={withReferral('https://guide.michelin.com/en/fi/restaurants', 'food_michelin_guide')} target="_blank" rel="noopener">
                  guide.michelin.com
                </a>
                {t('michelinDining.factsLeadSuffix')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {facts.map((f, i) => {
                const Icon = FACT_ICONS[i];
                return (
                  <div key={f.title} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-7">
                    <Icon className="w-7 h-7 text-vibe-pink mb-4" />
                    <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-2">{f.title}</h3>
                    <p className="text-sm text-[#002F6C]/75 leading-relaxed">{f.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Helsinki rooms */}
        <section id="helsinki" className="bg-[#F8FAFC] py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-2">
                  {t('michelinDining.helsinki.kicker')}
                </p>
                <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-4">
                  {t('michelinDining.helsinki.headline')}
                </h2>
                <p className="text-base text-[#002F6C]/75 leading-relaxed">
                  {t('michelinDining.helsinki.lead')}
                </p>
              </div>
              <AffiliateCTA partner="hotels" sid="michelin_helsinki" destination="Helsinki, Finland" className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm whitespace-nowrap">
                {t('michelinDining.helsinki.ctaHotels')}
              </AffiliateCTA>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {helsinkiRooms.map((r, idx) => (
                <div key={r.name} className="rounded-2xl bg-white border border-[#002F6C]/10 overflow-hidden">
                  <div className="relative h-36 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                    <img src={HELSINKI_IMAGES[idx]} alt="" aria-hidden="true" loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,31,74,0.65) 0%, rgba(0,31,74,0.08) 60%)' }} />
                    <h3 className="absolute bottom-3 left-5 right-5 font-heading tracking-wide text-xl text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,15,40,0.6)]">{r.name}</h3>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-[11px] uppercase tracking-wider font-semibold text-[#002F6C]/75 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {r.where}
                      </p>
                      <span className="text-xs font-bold text-vibe-pink whitespace-nowrap">{r.band}</span>
                    </div>
                    <p className="text-sm text-[#002F6C]/75 leading-relaxed">{r.angle}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-[#002F6C]/75 mt-8 max-w-2xl mx-auto">
              {t('michelinDining.helsinki.footnote')}
            </p>
          </div>
        </section>

        {/* Lapland flagship rooms */}
        <section id="lapland" className="bg-[#002F6C] py-16 sm:py-20 text-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10 max-w-3xl mx-auto">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('michelinDining.lapland.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl mb-5">
                {t('michelinDining.lapland.headline')}
              </h2>
              <p className="text-base text-white/80">
                {t('michelinDining.lapland.lead')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {laplandRooms.map((r, i) => {
                const cityName = r.city.split('·')[0].trim();
                return (
                  <article key={r.name} id={`lapland-room-${i}`} className="scroll-mt-24 flex flex-col rounded-2xl bg-white/5 border border-white/15 overflow-hidden hover:border-vibe-pink/40 transition-all">
                    <div className="relative h-60 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                      <img src={LAPLAND_IMAGES[i]} alt={r.name} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/5 via-[#002F6C]/15 to-[#002F6C]/70" />
                      <div className="absolute bottom-4 left-5 right-5">
                        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold bg-vibe-pink text-white px-2.5 py-1 rounded-full">
                          {r.city}
                        </span>
                        <h3 className="font-heading tracking-wide text-2xl text-white leading-tight mt-2">{r.name}</h3>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-xs text-white/65 mb-3 flex items-start gap-1.5">
                        <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" /> {r.address}
                      </p>
                      <p className="text-sm text-white/85 leading-relaxed mb-4">{r.angle}</p>

                      <div className="space-y-2 text-xs mb-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-white/80 mb-0.5 flex items-center gap-1.5">
                            <Star className="w-3 h-3 text-vibe-pink fill-vibe-pink" /> {t('michelinDining.lapland.labels.signature')}
                          </p>
                          <p className="text-white/80 leading-snug">{r.signature}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-white/80 mb-0.5">{t('michelinDining.lapland.labels.band')}</p>
                          <p className="text-white/80 leading-snug">{r.band}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-white/80 mb-0.5">{t('michelinDining.lapland.labels.booking')}</p>
                          <p className="text-white/80 leading-snug">{r.booking}</p>
                        </div>
                      </div>

                      <AffiliateCTA partner="hotels" sid={`lapland_room_${LAPLAND_SIDS[i]}`} destination={cityName + ', Finland'} className="mt-auto block w-full text-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm">
                        {t('michelinDining.lapland.labels.hotelsNearPrefix')} {cityName}
                      </AffiliateCTA>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Course flow */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('michelinDining.courseFlow.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">
                {t('michelinDining.courseFlow.headline')}
              </h2>
              <p className="text-base sm:text-lg text-[#002F6C]/75 leading-relaxed">
                {t('michelinDining.courseFlow.lead')}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {courseFlow.map(c => (
                <div key={c.n} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-5">
                  <p className="font-heading tracking-wide text-2xl text-vibe-pink mb-2">{c.n}</p>
                  <h3 className="font-heading tracking-wide text-lg text-[#002F6C] mb-2">{c.label}</h3>
                  <p className="text-xs text-[#002F6C]/75 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking notes */}
        <section className="bg-[#F8FAFC] py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 className="font-heading tracking-wide text-3xl sm:text-4xl md:text-5xl text-[#002F6C] mb-3 text-center">
              {t('michelinDining.bookingNotes.headline')}
            </h2>
            <p className="text-base text-[#002F6C]/70 text-center max-w-2xl mx-auto mb-10">
              {t('michelinDining.bookingNotes.lead')}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bookingNotes.map((n, i) => {
                const Icon = NOTE_ICONS[i];
                return (
                  <div key={n.label} className="rounded-2xl bg-white border border-[#002F6C]/10 p-6">
                    <Icon className="w-6 h-6 text-vibe-pink mb-3" />
                    <h3 className="font-heading tracking-wide text-xl text-[#002F6C] mb-2">{n.label}</h3>
                    <p className="text-sm text-[#002F6C]/75 leading-relaxed">{n.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stay near */}
        <section id="stay" className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-5">
              {t('michelinDining.stayNear.headline')}
            </h2>
            <p className="text-base text-[#002F6C]/75 mb-7">
              {t('michelinDining.stayNear.lead')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <AffiliateCTA partner="hotels" sid="michelin_stay_rovaniemi" destination="Rovaniemi, Finland" className="inline-flex items-center justify-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
                {t('michelinDining.stayNear.ctaRovaniemi')}
              </AffiliateCTA>
              <AffiliateCTA partner="hotels" sid="michelin_stay_inari" destination="Inari, Finland" className="inline-flex items-center justify-center border border-[#002F6C]/25 text-[#002F6C] hover:bg-[#002F6C]/5 font-semibold px-7 py-3.5 rounded-full transition-colors">
                {t('michelinDining.stayNear.ctaInari')}
              </AffiliateCTA>
            </div>
            <p className="text-sm text-[#002F6C]/70">
              {t('michelinDining.stayNear.tourPrefix')}{' '}
              <Link to={to('/food-tours')} className="text-vibe-pink underline-offset-4 hover:underline">
                {t('michelinDining.stayNear.tourLabel')}
              </Link>
              .
            </p>
          </div>
        </section>

        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
}
