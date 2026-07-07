import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, Award, Utensils } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import IntroPoints from '../components/IntroPoints';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import AffiliateCTA from '../components/AffiliateCTA';
import { useLocale } from '../i18n/useLocale';

// No chef names, restaurants, or prices on dish cards: these describe the
// STYLE's recurring plates, not specific restaurant dishes. The old cards
// attributed invented dishes and prices to real people (ethics fix 2026-07-07).
interface Dish { name: string; description: string; technique: string; traditional: string; innovation: string }
interface TechItem { title: string; body: string }

const DISH_IMAGES = [
  '/images/dish-sous-vide-reindeer.jpg',
  '/images/dish-whitefish.jpg',
  '/images/dish-berry-tasting.jpg',
  '/images/dish-deconstructed-bidos.jpg',
];

export default function ModernLapland() {
  const { t } = useTranslation('pages');
  const { to } = useLocale();
  const dishes = (t('modernLapland.dishes', { returnObjects: true }) as Dish[]) || [];
  const techniques = (t('modernLapland.techniques.items', { returnObjects: true }) as TechItem[]) || [];

  return (
    <>
      <SEO titleKey="modernLapland.title" descriptionKey="modernLapland.description" path={'/modern-lapland'} />
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero
          eyebrow={t('modernLapland.hero.eyebrow')}
          title={t('modernLapland.hero.title')}
          titleHighlight={t('modernLapland.hero.titleHighlight')}
          subtitle={t('modernLapland.hero.subtitle')}
          imageUrl="/images/hero-modern.jpg"
          imageAlt="Plated tasting-menu dish of pink-cooked reindeer, foraged herbs, and bilberry reduction on a slate plate"
          primaryCta={{ label: t('modernLapland.hero.primaryCta'), href: to('/michelin-dining') }}
          secondaryCta={{ label: t('modernLapland.hero.secondaryCta'), href: to('/traditional-recipes') }}
        />

        <IntroPoints sectionKey="modernLapland" />

        {/* Signature dishes */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-2">
                {t('modernLapland.dishesKicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C]">
                {t('modernLapland.dishesHeadline')}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {dishes.map((d, i) => (
                <article key={d.name} className="group relative flex flex-col rounded-2xl bg-white border border-[#002F6C]/10 hover:border-vibe-pink/40 hover:shadow-[0_10px_32px_rgba(0,47,108,0.08)] transition-all overflow-hidden">
                  <div className="relative h-72 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                    <img src={DISH_IMAGES[i]} alt={d.name} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/5 via-[#002F6C]/15 to-[#002F6C]/70" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="font-heading tracking-wide text-2xl text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,15,40,0.6)]">
                        {d.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-[#002F6C]/85 leading-relaxed mb-5">{d.description}</p>
                    <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-3 text-xs mt-auto pt-4 border-t border-[#002F6C]/10">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/75 mb-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-vibe-pink" /> {t('modernLapland.dishLabels.technique')}
                        </p>
                        <p className="text-[#002F6C]/85 leading-tight">{d.technique}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/75 mb-1 flex items-center gap-1">
                          <Utensils className="w-3 h-3 text-vibe-pink" /> {t('modernLapland.dishLabels.from')}
                        </p>
                        <p className="text-[#002F6C]/85 leading-tight">{d.traditional}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/75 mb-1 flex items-center gap-1">
                          <Award className="w-3 h-3 text-vibe-pink" /> {t('modernLapland.dishLabels.twist')}
                        </p>
                        <p className="text-[#002F6C]/85 leading-tight">{d.innovation}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Techniques */}
        <section className="bg-[#F8FAFC] py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              {t('modernLapland.techniques.kicker')}
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-5">
              {t('modernLapland.techniques.headline')}
            </h2>
            <div className="prose prose-lg max-w-none text-[#002F6C]/85 mb-8">
              <p className="leading-relaxed">{t('modernLapland.techniques.lead')}</p>
            </div>
            <div className="space-y-5">
              {techniques.map(tech => (
                <div key={tech.title} className="rounded-2xl bg-white border border-[#002F6C]/10 p-6 sm:p-7">
                  <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-2">{tech.title}</h3>
                  <p className="text-sm sm:text-base text-[#002F6C]/80 leading-relaxed">{tech.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#002F6C] py-20 text-white">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading tracking-wide text-3xl sm:text-4xl mb-5">
              {t('modernLapland.stayNear.headline')}
            </h2>
            <p className="text-base text-white/80 mb-7">
              {t('modernLapland.stayNear.lead')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <AffiliateCTA partner="hotels" sid="modern_hotels_rovaniemi" destination="Rovaniemi, Finland" className="inline-flex items-center justify-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
                {t('modernLapland.stayNear.ctaPrimary')}
              </AffiliateCTA>
              <Link to={to('/food-tours')} className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-full border border-white/40 transition-colors">
                {t('modernLapland.stayNear.ctaSecondary')}
              </Link>
            </div>
          </div>
        </section>

        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
}
