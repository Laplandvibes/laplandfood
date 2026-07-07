import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Leaf, Thermometer } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import IntroPoints from '../components/IntroPoints';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import { useLocale } from '../i18n/useLocale';

interface Ingredient { name: string; season: string; description: string; nutritional: string; uses: string }

const INGREDIENT_IMAGES = [
  '/images/ingredient-reindeer.jpg',
  '/images/ingredient-berries.jpg',
  '/images/ingredient-mushrooms.jpg',
  '/images/ingredient-fish.jpg',
  '/images/ingredient-herbs.jpg',
  '/images/ingredient-cloudberries.jpg',
];

export default function LocalIngredients() {
  const { t } = useTranslation('pages');
  const { to } = useLocale();
  const ingredients = (t('localIngredients.ingredients', { returnObjects: true }) as Ingredient[]) || [];

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
        <section className="bg-[#F8FAFC] py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              {t('localIngredients.reindeerDeep.kicker')}
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-5">
              {t('localIngredients.reindeerDeep.headline')}
            </h2>
            <div className="prose prose-lg max-w-none text-[#002F6C]/85">
              <p className="leading-relaxed mb-5">
                <Trans i18nKey="localIngredients.reindeerDeep.p1" ns="pages" components={{ em: <em /> }} />
              </p>
              <p className="leading-relaxed mb-5">{t('localIngredients.reindeerDeep.p2')}</p>
              <p className="leading-relaxed mb-5">{t('localIngredients.reindeerDeep.p3')}</p>
              <p className="leading-relaxed mb-5">
                <Trans i18nKey="localIngredients.reindeerDeep.p4" ns="pages" components={{ em: <em />, strong: <strong /> }} />
              </p>
              <p className="leading-relaxed">{t('localIngredients.reindeerDeep.p5')}</p>
            </div>
          </div>
        </section>

        {/* Cloudberry deep dive */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              {t('localIngredients.cloudberryDeep.kicker')}
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-5">
              {t('localIngredients.cloudberryDeep.headline')}
            </h2>
            <div className="prose prose-lg max-w-none text-[#002F6C]/85">
              <p className="leading-relaxed mb-5">
                <Trans i18nKey="localIngredients.cloudberryDeep.p1" ns="pages" components={{ em: <em /> }} />
              </p>
              <p className="leading-relaxed mb-5">{t('localIngredients.cloudberryDeep.p2')}</p>
              <p className="leading-relaxed mb-5">{t('localIngredients.cloudberryDeep.p3')}</p>
              <p className="leading-relaxed">
                <Trans i18nKey="localIngredients.cloudberryDeep.p4" ns="pages" components={{ strong: <strong /> }} />
              </p>
            </div>
          </div>
        </section>

        {/* Fish deep dive */}
        <section className="bg-[#F8FAFC] py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              {t('localIngredients.fishDeep.kicker')}
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-5">
              {t('localIngredients.fishDeep.headline')}
            </h2>
            <div className="prose prose-lg max-w-none text-[#002F6C]/85">
              <p className="leading-relaxed mb-5">
                <Trans i18nKey="localIngredients.fishDeep.p1" ns="pages" components={{ strong: <strong /> }} />
              </p>
              <p className="leading-relaxed mb-5">
                <Trans i18nKey="localIngredients.fishDeep.p2" ns="pages" components={{ em: <em /> }} />
              </p>
              <p className="leading-relaxed mb-5">{t('localIngredients.fishDeep.p3')}</p>
              <p className="leading-relaxed">
                <Trans i18nKey="localIngredients.fishDeep.p4Prefix" ns="pages" components={{ em: <em /> }} />{' '}
                <Link to={to('/traditional-recipes')} className="text-vibe-pink underline-offset-4 hover:underline">{t('localIngredients.fishDeep.p4LinkLabel')}</Link>
                {t('localIngredients.fishDeep.p4Suffix')}
              </p>
            </div>
          </div>
        </section>

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

        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
}
