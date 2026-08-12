import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Leaf, Thermometer, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import IntroPoints from '../components/IntroPoints';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import AffiliateCTA from '../components/AffiliateCTA';
import FinnishPantryAd from '../components/FinnishPantryAd';
import { useLocale } from '../i18n/useLocale';

interface Ingredient { name: string; season: string; description: string; nutritional: string; uses: string }
interface NextStep { title: string; body: string; cta: string }

const INGREDIENT_IMAGES = [
  '/images/ingredient-reindeer.jpg',
  '/images/ingredient-berries.jpg',
  '/images/ingredient-mushrooms.jpg',
  '/images/ingredient-fish.jpg',
  '/images/ingredient-herbs.jpg',
  '/images/ingredient-cloudberries.jpg',
];

/**
 * One deep-dive essay.
 *
 * 🔴 The three of these used to be identical stacked slabs: kicker, headline,
 * a decorative banner image nobody could act on, then four to five paragraphs
 * in a single narrow column. Three in a row read as one long grey wall (Vesa
 * 2026-08-10: "ei niin inspiroiva"), which is the same complaint that killed
 * the four-paragraph intros on every pillar page on 2026-07-07 — the fix was
 * applied to the tops of the pages and never to their middles.
 *
 * So: the image becomes a companion to the prose rather than a lid on it
 * (sticky beside the text from lg, alternating sides so the three do not
 * stamp out the same shape), the first paragraph is set as a lede, and each
 * one carries its number so they read as a series with an order.
 */
function DeepDive({ n, kicker, headline, image, alt, imageRight, children }: {
  n: string; kicker: string; headline: string; image: string; alt: string;
  imageRight?: boolean; children: ReactNode;
}) {
  return (
    <section className={imageRight ? 'bg-white py-16 sm:py-20' : 'bg-[#F8FAFC] py-16 sm:py-20'}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* items-stretch, NOT items-start: the image column has to inherit the
            row's full height or `lg:sticky` has no track to travel along, and
            the picture just sits at the top with dead white beside four
            paragraphs of text. */}
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-12 items-stretch">
          <div className={imageRight ? 'lg:order-last' : ''}>
            {/* Sticky only from lg: on a phone the image has already been read
                by the time the prose starts, and a pinned image there would
                eat a third of a small screen for the whole essay. */}
            <div className="lg:sticky lg:top-24">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]">
                <img src={image} alt={alt} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-heading tracking-wide text-3xl text-vibe-pink leading-none">{n}</span>
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase">
                {kicker}
              </p>
            </div>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-6">
              {headline}
            </h2>
            <div className="max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** First paragraph of a deep dive: bigger and at full ink, so the essay opens
 *  instead of starting flat. */
const LEDE = 'text-lg sm:text-xl text-[#002F6C] leading-relaxed mb-5';
const BODY = 'text-[#002F6C]/80 leading-relaxed mb-5';
const BODY_LAST = 'text-[#002F6C]/80 leading-relaxed';

export default function LocalIngredients() {
  const { t } = useTranslation('pages');
  const { to } = useLocale();
  const ingredients = (t('localIngredients.ingredients', { returnObjects: true }) as Ingredient[]) || [];
  const nextSteps = (t('localIngredients.nextSteps.items', { returnObjects: true }) as NextStep[]) || [];

  return (
    <>
      <SEO titleKey="localIngredients.title" descriptionKey="localIngredients.description" path={'/local-ingredients'} />
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero
          eyebrow={t('localIngredients.hero.eyebrow')}
          title={t('localIngredients.hero.title')}
          titleHighlight={t('localIngredients.hero.titleHighlight')}
          subtitle={t('localIngredients.hero.subtitle')}
          imageUrl="/images/hero-ingredients.webp"
          imageAlt="Foraged cloudberries, lingonberries, and wild mushrooms arranged on rough birch wood at the edge of an Arctic forest"
          primaryCta={{ label: t('localIngredients.hero.primaryCta'), href: to('/foraging-guide') }}
          secondaryCta={{ label: t('localIngredients.hero.secondaryCta'), href: to('/traditional-recipes') }}
          pills={ingredients.map(i => i.name)}
        />

        <IntroPoints sectionKey="localIngredients" />

        {/* Ingredient cards */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {ingredients.map((i, idx) => (
                <article key={i.name} className="flex flex-col rounded-2xl bg-white border border-[#002F6C]/10 hover:border-vibe-pink/40 hover:shadow-[0_10px_32px_rgba(0,47,108,0.08)] transition-all overflow-hidden">
                  <div className="relative h-60 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                    <img src={INGREDIENT_IMAGES[idx]} alt={i.name} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/5 via-[#002F6C]/15 to-[#002F6C]/70" />
                    <div className="absolute top-3 right-4">
                      <span className="text-[10px] uppercase tracking-[0.18em] font-semibold bg-vibe-pink text-white px-2.5 py-1 rounded-full">
                        {i.season}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-5 right-5">
                      <h2 className="font-heading tracking-wide text-xl text-white leading-tight">{i.name}</h2>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-sm text-[#002F6C]/85 leading-relaxed mb-4">{i.description}</p>
                    <div className="grid grid-cols-1 gap-2.5 text-xs mt-auto pt-3 border-t border-[#002F6C]/10">
                      <div className="flex gap-2">
                        <Leaf className="w-3.5 h-3.5 text-vibe-pink mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/75">{t('localIngredients.labels.nutrition')} </span>
                          <span className="text-[#002F6C]/85">{i.nutritional}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Thermometer className="w-3.5 h-3.5 text-vibe-pink mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/75">{t('localIngredients.labels.usedIn')} </span>
                          <span className="text-[#002F6C]/85">{i.uses}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Reindeer deep dive */}
        <DeepDive
          n="01"
          kicker={t('localIngredients.reindeerDeep.kicker')}
          headline={t('localIngredients.reindeerDeep.headline')}
          image="/images/lead-reindeer.jpg"
          alt="A free-ranging reindeer herd strung out across open snow-covered fell in low Arctic light"
        >
          <p className={LEDE}>
            <Trans i18nKey="localIngredients.reindeerDeep.p1" ns="pages" components={{ em: <em /> }} />
          </p>
          <p className={BODY}>{t('localIngredients.reindeerDeep.p2')}</p>
          <p className={BODY}>{t('localIngredients.reindeerDeep.p3')}</p>
          <p className={BODY}>
            <Trans i18nKey="localIngredients.reindeerDeep.p4" ns="pages" components={{ em: <em />, strong: <strong /> }} />
          </p>
          <p className={BODY_LAST}>{t('localIngredients.reindeerDeep.p5')}</p>
        </DeepDive>

        {/* Cloudberry deep dive */}
        <DeepDive
          n="02"
          kicker={t('localIngredients.cloudberryDeep.kicker')}
          headline={t('localIngredients.cloudberryDeep.headline')}
          image="/images/lead-cloudberry.jpg"
          alt="Ripe amber cloudberries on low stems in an open mire, the only place the plant fruits"
          imageRight
        >
          <p className={LEDE}>
            <Trans i18nKey="localIngredients.cloudberryDeep.p1" ns="pages" components={{ em: <em /> }} />
          </p>
          <p className={BODY}>{t('localIngredients.cloudberryDeep.p2')}</p>
          <p className={BODY}>{t('localIngredients.cloudberryDeep.p3')}</p>
          <p className={BODY_LAST}>
            <Trans i18nKey="localIngredients.cloudberryDeep.p4" ns="pages" components={{ strong: <strong /> }} />
          </p>
        </DeepDive>

        {/* Fish deep dive */}
        <DeepDive
          n="03"
          kicker={t('localIngredients.fishDeep.kicker')}
          headline={t('localIngredients.fishDeep.headline')}
          image="/images/lead-lake-fish.jpg"
          alt="An augered hole in the ice on a frozen Lapland lake, a wooden stool and a thermos beside it and a line of tracks running back to the shore"
        >
          <p className={LEDE}>
            <Trans i18nKey="localIngredients.fishDeep.p1" ns="pages" components={{ strong: <strong /> }} />
          </p>
          <p className={BODY}>
            <Trans i18nKey="localIngredients.fishDeep.p2" ns="pages" components={{ em: <em /> }} />
          </p>
          <p className={BODY}>{t('localIngredients.fishDeep.p3')}</p>
          <p className={BODY_LAST}>
            <Trans i18nKey="localIngredients.fishDeep.p4Prefix" ns="pages" components={{ em: <em /> }} />{' '}
            <Link to={to('/traditional-recipes')} className="text-vibe-pink underline-offset-4 hover:underline">{t('localIngredients.fishDeep.p4LinkLabel')}</Link>
            {t('localIngredients.fishDeep.p4Suffix')}
          </p>
        </DeepDive>

        {/* Everyman's right */}
        <section className="bg-[#002F6C] py-16 sm:py-20 text-white">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              {t('localIngredients.everymansRight.kicker')}
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl mb-5">
              {t('localIngredients.everymansRight.headline')}
            </h2>
            <p className="text-base text-white/85 leading-relaxed mb-5">
              <Trans i18nKey="localIngredients.everymansRight.p1" ns="pages" components={{ em: <em /> }} />
            </p>
            <p className="text-base text-white/85 leading-relaxed mb-7">
              {t('localIngredients.everymansRight.p2')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to={to('/foraging-guide')} className="inline-flex items-center justify-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
                {t('localIngredients.everymansRight.ctaPrimary')}
              </Link>
              <Link to={to('/food-tours')} className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-full border border-white/40 transition-colors">
                {t('localIngredients.everymansRight.ctaSecondary')}
              </Link>
            </div>
          </div>
        </section>

        {/* Where this ends up.
            🔴 Until 2026-08-10 this page ended on the everyman's-right band and
            handed the reader straight to the newsletter. Nine thousand pixels of
            what grows here, and no answer to the obvious next question — cook it,
            taste it, or go. The two internal cards carry the page's own promise
            forward; the third is the page's first paid exit (Vesa 2026-08-10). */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('localIngredients.nextSteps.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C]">
                {t('localIngredients.nextSteps.headline')}
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

                // The paid one is last on purpose: the reader gets both editorial
                // answers before the one that earns.
                if (i === 2) {
                  return (
                    <AffiliateCTA
                      key={s.title}
                      partner="hotels"
                      sid="ingredients_stay_rovaniemi"
                      destination="Rovaniemi, Finland"
                      className={card}
                    >
                      {inner}
                    </AffiliateCTA>
                  );
                }
                return (
                  <Link key={s.title} to={to(i === 0 ? '/traditional-recipes' : '/food-tours')} className={card}>
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Suomikauppa (Daisycon) sivun LOPUSSA, uutiskirjeen edella. Sivu
            kertoo mita Lapissa syodaan ja jattaa lukijan kysymyksen kanssa jota
            se ei ratkaise: mista naita saa kotoa kasin. Kortti on vastaus sivun
            omaan aukkoon, ei keskeytys kesken lukemisen. */}
        <div className="bg-[#F8FAFC] px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <FinnishPantryAd />
          </div>
        </div>

        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
}
