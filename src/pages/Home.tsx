import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import SisterSiteCTAs from '../components/SisterSiteCTAs';
import FAQ, { type FAQItem } from '../components/FAQ';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '../i18n/useLocale';
import HomeAdSlots, { MainPartnerBanner } from '../shared/HomeAdSlots';
import { AD_SLOTS } from '../data/adSlots';
import GygPicks from '../components/GygPicks';
import { AppPromoHero } from '../components/AppPromo';

interface Pillar { eyebrow: string; title: string; body: string }
interface CulturePoint { n: string; title: string; body: string }

const PILLAR_HREFS = ['/local-ingredients', '/traditional-recipes', '/modern-lapland', '/foraging-guide', '/michelin-dining', '/food-tours'];
const PILLAR_IMAGES = ['/images/card-ingredients.jpg', '/images/card-recipes.jpg', '/images/card-modern.jpg', '/images/card-foraging.jpg', '/images/card-michelin.jpg', '/images/card-tours.jpg'];

// FAQPage entries are generated from the same localized home.faq.items the
// visible <FAQ /> accordion renders — Google requires schema Q&A to match
// on-page content, so the two must never diverge. inLanguage per node is
// injected by <SEO /> from the active locale.
const buildHomeSchema = (faqItems: FAQItem[]) => ({
  '@context': 'https://schema.org',
  '@graph': [{
    '@type': 'Organization',
    name: 'LaplandFood',
    url: 'https://laplandfood.com',
    parentOrganization: {
      '@type': 'Organization',
      name: 'LaplandVibes',
      url: 'https://laplandvibes.com'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Finland'
    }
  }, {
    '@type': 'WebSite',
    name: 'LaplandFood',
    url: 'https://laplandfood.com',
    publisher: {
      '@type': 'Organization',
      name: 'Lapeso Oy'
    }
  }, {
    '@type': 'FAQPage',
    mainEntity: faqItems.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  }]
});

export default function Home() {
  const { t } = useTranslation('pages');
  const { to, locale } = useLocale();
  const pillars = (t('home.pillars', { returnObjects: true }) as Pillar[]) || [];
  const culturePoints = (t('home.culture', { returnObjects: true }) as CulturePoint[]) || [];
  const faqItems = (t('home.faq.items', { returnObjects: true }) as FAQItem[]) || [];

  // Stat tiles use REAL counts derived from the same localized data arrays the
  // pillar pages render — the numbers can never drift from the actual content.
  const stats = [
    { value: ((t('localIngredients.ingredients', { returnObjects: true }) as unknown[]) || []).length, label: t('home.stats.ingredients') },
    { value: ((t('traditionalRecipes.recipes', { returnObjects: true }) as unknown[]) || []).length, label: t('home.stats.recipes') },
    { value: ((t('traditionalRecipes.seasons.items', { returnObjects: true }) as unknown[]) || []).length, label: t('home.stats.seasons') },
    { value: ((t('michelinDining.lapland.rooms', { returnObjects: true }) as unknown[]) || []).length, label: t('home.stats.kitchens') },
  ].filter(s => s.value > 0);

  return (
    <>
      <SEO titleKey="home.title" descriptionKey="home.description" path={'/'} schema={buildHomeSchema(faqItems)} />
      <div className="min-h-screen bg-white">
        <Nav />
        <Hero />

        {/* Stat glass tiles overlapping the hero bottom — real numbers only.
            🔴 These MUST stay the first thing after <Hero />. The negative
            margin is what makes them sit on the hero image, and when the app
            block was inserted above them (2026-08-02) they rode up over IT
            instead — the figures landed on top of the app card's own copy and
            read as a rendering fault (Vesa 2026-08-10, with a screenshot).
            Anything new on this page goes BELOW this section. */}
        <section aria-label="LaplandFood in numbers" className="relative z-10 -mt-16 md:-mt-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {stats.map(s => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[#002F6C]/10 bg-white/90 backdrop-blur-md p-4 md:p-5 text-center shadow-[0_8px_30px_rgba(0,31,74,0.16)]"
                >
                  <p className="font-heading tracking-wide text-4xl md:text-5xl text-vibe-pink leading-none">{s.value}</p>
                  <p className="mt-2 text-[11px] md:text-xs uppercase tracking-[0.14em] font-semibold text-[#002F6C]/70 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App launch block, directly under the site's own opening. At the foot
            of the page it measured 81 % down a 33 000 px front page, and an
            announcement nobody scrolls to is not an announcement. */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppPromoHero />
        </div>

        {/* PÄÄKUMPPANI-banneri heti heron alla — sivun paras mainospaikka,
            tyhjänä kompakti house-ad → LV Media -portaali */}
        <MainPartnerBanner config={AD_SLOTS} locale={locale} surface="light" className="bg-white" />

        {/* Intro band — soft blue panel so the section reads as its own room
            instead of floating in bare white (Vesa 2026-08-24: "pitäisikö
            tälle osiolle olla jokin tausta?"). Same surface family as
            IntroPoints on the pillar pages. */}
        <section className="relative overflow-hidden bg-[#F2F7FC] py-16 sm:py-20">
          <div aria-hidden="true" className="absolute -top-28 -left-24 w-96 h-96 rounded-full bg-[#BFD8F0]/45 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-36 -right-28 w-96 h-96 rounded-full bg-vibe-pink/10 blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-4">
              {t('home.intro.kicker')}
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-6">
              {t('home.intro.headline')}
            </h2>
            <p className="text-base sm:text-lg text-[#002F6C]/75 leading-relaxed">
              {t('home.intro.p1')}
              <br />
              <br />
              {t('home.intro.p2Prefix')} <em>{t('home.intro.p2Em')}</em>{t('home.intro.p2Mid')}{' '}
              <a className="text-vibe-pink underline-offset-4 hover:underline" href="https://laplanddining.com" target="_blank" rel="noopener">
                laplanddining.com
              </a>
              {t('home.intro.p2DiningSuffix')}{' '}
              <a className="text-vibe-pink underline-offset-4 hover:underline" href="https://laplandbars.com" target="_blank" rel="noopener">
                laplandbars.com
              </a>
              {t('home.intro.p2BarsSuffix')}{' '}
              <a className="text-vibe-pink underline-offset-4 hover:underline" href="https://laplandnightlife.com" target="_blank" rel="noopener">
                laplandnightlife.com
              </a>
              {t('home.intro.p2End')}
            </p>
          </div>
        </section>

        {/* Kumppaniosio ylhäällä (jaettu malli): kakkospääkumppani + 6
            premium-paikkaa — pääkumppanit eivät näy vierekkäin (banneri ↑)

            🔴 Renderöidään VAIN kun kakkospaikka on myyty (Vesa 2026-08-10).
            Tyhjänä tämä oli sivun toinen "Haluatko mainoksesi tähän?" — iso
            tumma laatikko keskellä valkoista lukuvirtaa, heti heron alla
            olevan kompaktin bannerin perään. Kaksi myyntipuhetta peräkkäin
            sivustolla jolla ei ole yhtään kumppania ei myy toista paikkaa;
            se kertoo lukijalle että talo on tyhjä. Yksi house-ad riittää, ja
            se on heron alla oleva. Kauppa → täytä sponsors[1] → lohko palaa. */}
        {AD_SLOTS.sponsors?.[1] && (
          <HomeAdSlots config={AD_SLOTS} locale={locale} surface="light" className="bg-white" />
        )}

        {/* Varattavat GYG-tuotteet — korkealla sivulla mutta myytyjen mainospaikkojen ALAPUOLELLA */}
        <GygPicks />


        {/* Pillar grid */}
        <section className="bg-[#F8FAFC] py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('home.pillarsKicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-4">
                {t('home.pillarsHeadline')}
              </h2>
              <p className="text-base sm:text-lg text-[#002F6C]/70 max-w-2xl mx-auto">
                {t('home.pillarsLead')}
              </p>
            </div>
            {/* 2-col compact tiles on mobile (image + title) so the pillar row
                isn't an endless single-column scroll; full cards with body sm+. */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {pillars.map((p, i) => (
                <Link key={PILLAR_HREFS[i]} to={to(PILLAR_HREFS[i])} className="group rounded-xl sm:rounded-2xl bg-white border border-[#002F6C]/10 overflow-hidden hover:border-vibe-pink/40 hover:shadow-[0_8px_28px_rgba(0,47,108,0.08)] transition-all">
                  <div className="aspect-[4/3] sm:aspect-[16/10] bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] relative overflow-hidden">
                    <img src={PILLAR_IMAGES[i]} alt={p.title} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-vibe-pink/0 via-transparent to-vibe-pink/10 pointer-events-none" />
                  </div>
                  <div className="p-3 sm:p-6">
                    <p className="text-vibe-pink text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase mb-1 sm:mb-2">
                      {p.eyebrow}
                    </p>
                    <h3 className="font-heading tracking-wide text-base sm:text-2xl text-[#002F6C] mb-1 sm:mb-2 leading-tight group-hover:text-vibe-pink transition-colors">
                      {p.title}
                    </h3>
                    <p className="hidden sm:block text-sm text-[#002F6C]/70 leading-relaxed">{p.body}</p>
                    <span className="mt-2 sm:mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-vibe-pink">
                      {t('home.readLabel')} <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="relative bg-[#002F6C] py-20 sm:py-24 text-white overflow-hidden">
          <img src="/images/culture-band.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/40 via-[#002F6C]/35 to-[#001F4A]/60" />
          <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('home.cultureKicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl mb-5">
                {t('home.cultureHeadline')}
              </h2>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                {t('home.cultureLead')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {culturePoints.map(c => (
                <div key={c.n} className="rounded-2xl bg-white/5 border border-white/15 p-7">
                  <p className="font-heading tracking-wide text-3xl text-vibe-pink mb-3">{c.n}</p>
                  <h3 className="font-heading tracking-wide text-2xl mb-3">{c.title}</h3>
                  <p className="text-white/75 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Summer band */}
        <section className="relative overflow-hidden">
          <div className="relative py-20 sm:py-28 md:py-32">
            <picture>
              <source srcSet="/images/midnight-sun-band.avif" type="image/avif" />
              <source srcSet="/images/midnight-sun-band.webp" type="image/webp" />
              <img
                src="/images/midnight-sun-band.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-[#5C2E0B]/75 via-[#B45309]/30 to-[#7C2D12]/55" />
            <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
              <p className="text-white/90 text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('home.summer.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-white mb-5 drop-shadow-[0_2px_12px_rgba(146,64,14,0.45)]">
                {t('home.summer.headline')}
              </h2>
              <p className="text-base sm:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed mb-8">
                {t('home.summer.lead')}
              </p>
              <Link to={to('/foraging-guide')} className="inline-flex items-center justify-center bg-white hover:bg-white/95 text-[#92400E] font-semibold px-7 py-3.5 rounded-full transition-colors text-base shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
                {t('home.summer.cta')}
              </Link>
            </div>
          </div>
        </section>

        <FAQ />

        <SisterSiteCTAs />

        <NewsletterSection />


        <Footer />
      </div>
    </>
  );
}
