import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import IntroPoints from '../components/IntroPoints';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import AffiliateCTA from '../components/AffiliateCTA';
import SuomikauppaPicks from '../components/SuomikauppaPicks';
import { gygSearchLink } from '../lib/gyg';
import { useLocale } from '../i18n/useLocale';

interface SeasonPhase { period: string; title: string; body: string }
interface PriceFact { value: string; label: string }
interface ProductItem { title: string; body: string }
interface WhereWay { n: string; title: string; body: string }
interface NextStep { title: string; body: string; cta: string }

/**
 * /cloudberry — first of the berry deep pages (P5, plan 2026-08-23).
 * Demand: cloudberry 6,600/mo KD0 · cloudberry jam 590 KD0 · cloudberry
 * taste 90 KD5 (OpenSEO UK). Every number on the page comes from the site's
 * own cloudberryDeep + foragingGuide content — no new figures invented.
 * Anchor ids are load-bearing: the hero pills jump to them.
 */
const PILL_ANCHORS = ['#taste', '#season', '#right-to-pick', '#why-wild', '#price', '#products', '#where-to-taste'];

const LEDE = 'text-lg sm:text-xl text-[#002F6C] leading-relaxed mb-5';
const BODY = 'text-[#002F6C]/80 leading-relaxed mb-5';
const BODY_LAST = 'text-[#002F6C]/80 leading-relaxed';

/** Two-column band: sticky image beside prose (same pattern as the
 *  LocalIngredients deep dives — items-stretch, or lg:sticky has no track). */
function ImageProse({ id, kicker, headline, image, alt, imageRight, tint, children }: {
  id: string; kicker: string; headline: string; image: string; alt: string;
  imageRight?: boolean; tint?: boolean; children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-20 ${tint ? 'bg-[#F8FAFC]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-12 items-stretch">
          <div className={imageRight ? 'lg:order-last' : ''}>
            <div className="lg:sticky lg:top-24">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]">
                <img src={image} alt={alt} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div>
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">{kicker}</p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-6">{headline}</h2>
            <div className="max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Cloudberry() {
  const { t } = useTranslation('pages');
  const { to, locale } = useLocale();
  const pills = (t('cloudberry.hero.pills', { returnObjects: true }) as string[]) || [];
  const phases = (t('cloudberry.season.phases', { returnObjects: true }) as SeasonPhase[]) || [];
  const facts = (t('cloudberry.price.facts', { returnObjects: true }) as PriceFact[]) || [];
  const products = (t('cloudberry.products.items', { returnObjects: true }) as ProductItem[]) || [];
  const ways = (t('cloudberry.where.ways', { returnObjects: true }) as WhereWay[]) || [];
  const nextSteps = (t('cloudberry.nextSteps.items', { returnObjects: true }) as NextStep[]) || [];

  const gygHref = gygSearchLink('Lapland foraging tour', 'cloudberry_foraging_tour', locale);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t('cloudberry.title'),
    description: t('cloudberry.description'),
    about: 'Cloudberry (Rubus chamaemorus), Lapland food culture',
    publisher: { '@type': 'Organization', name: 'LaplandFood', url: 'https://laplandfood.com' },
    author: { '@type': 'Organization', name: 'LaplandFood', url: 'https://laplandfood.com' },
    datePublished: '2026-08-24T00:00:00+03:00',
    dateModified: '2026-08-24T00:00:00+03:00',
    image: 'https://laplandfood.com/images/hero-cloudberry.jpg',
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://laplandfood.com/cloudberry/' },
  };

  return (
    <>
      <SEO titleKey="cloudberry.title" descriptionKey="cloudberry.description" path={'/cloudberry'} schema={articleSchema} />
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero
          eyebrow={t('cloudberry.hero.eyebrow')}
          title={t('cloudberry.hero.title')}
          titleHighlight={t('cloudberry.hero.titleHighlight')}
          subtitle={t('cloudberry.hero.subtitle')}
          imageUrl="/images/hero-cloudberry.webp"
          imageAlt="Open Lapland mire in late July: ripe amber cloudberries in the foreground, cottongrass and a dark bog pool behind"
          primaryCta={{ label: t('cloudberry.hero.primaryCta'), href: to('/foraging-guide') }}
          secondaryCta={{ label: t('cloudberry.hero.secondaryCta'), href: to('/local-ingredients') }}
          pills={pills}
          pillHrefs={PILL_ANCHORS}
        />

        <IntroPoints sectionKey="cloudberry" />

        {/* Taste — the question travellers actually search for. The direct
            answer opens the section so it survives being read alone. */}
        <ImageProse
          id="taste"
          kicker={t('cloudberry.taste.kicker')}
          headline={t('cloudberry.taste.headline')}
          image="/images/cloudberry-ripeness.webp"
          alt="One ripe amber cloudberry and one unripe red cloudberry side by side on a Lapland bog"
          tint
        >
          <p className={LEDE}>{t('cloudberry.taste.answer')}</p>
          <p className={BODY}>{t('cloudberry.taste.p2')}</p>
          <p className={BODY_LAST}>
            <Trans i18nKey="cloudberry.taste.p3" ns="pages" components={{ em: <em /> }} />
          </p>
        </ImageProse>

        {/* Season */}
        <section id="season" className="scroll-mt-24 bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('cloudberry.season.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">
                {t('cloudberry.season.headline')}
              </h2>
              <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">
                {t('cloudberry.season.lead')}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {phases.map(ph => (
                <div key={ph.period} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6">
                  <span className="inline-block text-[10px] uppercase tracking-[0.18em] font-semibold bg-vibe-pink text-white px-2.5 py-1 rounded-full mb-3">
                    {ph.period}
                  </span>
                  <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-2 leading-tight">{ph.title}</h3>
                  <p className="text-sm text-[#002F6C]/80 leading-relaxed">{ph.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Everyman's right — blue impact band (a new white section drowns on
            this site; the blue band is how a section earns attention here). */}
        <section id="right-to-pick" className="scroll-mt-24 bg-[#002F6C] py-16 sm:py-20 text-white">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              {t('cloudberry.rights.kicker')}
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl mb-5">
              {t('cloudberry.rights.headline')}
            </h2>
            <p className="text-base text-white/85 leading-relaxed mb-5">
              <Trans i18nKey="cloudberry.rights.p1" ns="pages" components={{ em: <em /> }} />
            </p>
            <p className="text-base text-white/85 leading-relaxed mb-7">
              {t('cloudberry.rights.p2')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to={to('/foraging-guide')} className="inline-flex items-center justify-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
                {t('cloudberry.rights.ctaPrimary')}
              </Link>
              <Link to={to('/traditional-recipes')} className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-full border border-white/40 transition-colors">
                {t('cloudberry.rights.ctaSecondary')}
              </Link>
            </div>
          </div>
        </section>

        {/* Why nobody can farm it */}
        <ImageProse
          id="why-wild"
          kicker={t('cloudberry.whyWild.kicker')}
          headline={t('cloudberry.whyWild.headline')}
          image="/images/cloudberry-flowers.webp"
          alt="White cloudberry flowers scattered across a misty Lapland bog in early summer, the frost-fragile stage that decides the harvest"
          imageRight
        >
          <p className={LEDE}>{t('cloudberry.whyWild.p1')}</p>
          <p className={BODY}>{t('cloudberry.whyWild.p2')}</p>
          <p className={BODY}>{t('cloudberry.whyWild.p3')}</p>
          <p className={BODY_LAST}>
            <Trans i18nKey="cloudberry.whyWild.p4" ns="pages" components={{ strong: <strong /> }} />
          </p>
        </ImageProse>

        {/* Price & value */}
        <section id="price" className="scroll-mt-24 bg-[#F8FAFC] py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('cloudberry.price.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">
                {t('cloudberry.price.headline')}
              </h2>
              <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">
                {t('cloudberry.price.lead')}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {facts.map(f => (
                <div key={f.value} className="rounded-2xl bg-white border border-[#002F6C]/10 p-6">
                  <p className="font-heading tracking-wide text-4xl text-vibe-pink mb-2">{f.value}</p>
                  <p className="text-sm text-[#002F6C]/80 leading-relaxed">{f.label}</p>
                </div>
              ))}
            </div>
            <p className="max-w-3xl text-[#002F6C]/80 leading-relaxed">{t('cloudberry.price.p2')}</p>
          </div>
        </section>

        {/* Jam, liqueur, parfait */}
        <section id="products" className="scroll-mt-24 bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 lg:gap-12 items-center mb-10">
              <div>
                <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                  {t('cloudberry.products.kicker')}
                </p>
                <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">
                  {t('cloudberry.products.headline')}
                </h2>
                <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed max-w-2xl">
                  {t('cloudberry.products.lead')}
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]">
                <img src="/images/cloudberry-jam-cheese.webp" alt="Toasted wedges of Finnish bread cheese topped with cloudberry jam, a bowl of the jam beside the plate" loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {products.map(pr => (
                <div key={pr.title} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6">
                  <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-2 leading-tight">{pr.title}</h3>
                  <p className="text-sm text-[#002F6C]/80 leading-relaxed">{pr.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Suomikauppa: the pantry exit. Cloudberry jars at the shop were all
            sold out on 2026-08-24 (variant-level available:false, verified),
            which is the page's own point about scarcity — so the block sells
            the verified in-stock wild-berry classics and says so honestly. */}
        <div className="bg-white px-4 pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl">
            <SuomikauppaPicks variant="cloudberry" />
          </div>
        </div>

        {/* Where to taste it — blue band with the paid foraging exit */}
        <section id="where-to-taste" className="scroll-mt-24 bg-[#002F6C] py-16 sm:py-20 text-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('cloudberry.where.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl">
                {t('cloudberry.where.headline')}
              </h2>
              <p className="text-base text-white/85 leading-relaxed mt-5">
                {t('cloudberry.where.lead')}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {ways.map(w => (
                <div key={w.n} className="rounded-2xl bg-white/5 border border-white/15 p-6">
                  <p className="font-heading tracking-wide text-3xl text-vibe-pink mb-2">{w.n}</p>
                  <h3 className="font-heading tracking-wide text-2xl mb-2 leading-tight">{w.title}</h3>
                  <p className="text-sm text-white/85 leading-relaxed">{w.body}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={gygHref}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
              >
                {t('cloudberry.where.gygCta')}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link to={to('/michelin-dining')} className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-full border border-white/40 transition-colors">
                {t('cloudberry.where.diningCta')}
              </Link>
            </div>
          </div>
        </section>

        {/* Next steps — two editorial answers first, the paid one last */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('cloudberry.nextSteps.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C]">
                {t('cloudberry.nextSteps.headline')}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {nextSteps.map((s, i) => {
                const inner = (
                  <>
                    <h3 className="font-heading tracking-wide text-2xl sm:text-3xl text-[#002F6C] mb-3 group-hover:text-vibe-pink transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-[#002F6C]/70 leading-relaxed flex-1">{s.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-vibe-pink">
                      {s.cta}
                      {i === 2
                        ? <ArrowUpRight className="w-4 h-4" />
                        : <ArrowRight className="w-4 h-4" />}
                    </span>
                  </>
                );
                const card = 'group flex flex-col rounded-2xl bg-white border border-[#002F6C]/10 p-7 hover:border-vibe-pink/40 hover:shadow-[0_8px_28px_rgba(0,47,108,0.08)] transition-all';
                if (i === 2) {
                  return (
                    <AffiliateCTA
                      key={s.title}
                      partner="hotels"
                      sid="cloudberry_stay_rovaniemi"
                      destination="Rovaniemi, Finland"
                      className={card}
                    >
                      {inner}
                    </AffiliateCTA>
                  );
                }
                return (
                  <Link key={s.title} to={to(i === 0 ? '/foraging-guide' : '/traditional-recipes')} className={card}>
                    {inner}
                  </Link>
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
