import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Clock, Users, Flame, ChefHat, ArrowRight } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import IntroPoints from '../components/IntroPoints';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import SuomikauppaPicks from '../components/SuomikauppaPicks';
import { useLocale } from '../i18n/useLocale';

interface ContextItem { title: string; body: string }
interface SapmiItem { title: string; body: string }
interface Recipe { name: string; difficulty: string; time: string; serves: string; tradition: string; description: string; ingredients: string[]; instructions: string[]; tips: string }
interface SeasonItem { sami: string; en: string; when: string; body: string }
interface MethodItem { title: string; body: string }

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Traditional Sami Recipes: Authentic Lapland Food Culture',
  about: 'Sami cuisine, traditional Finnish Lapland recipes',
  publisher: { '@type': 'Organization', name: 'LaplandFood', url: 'https://laplandfood.com' },
  inLanguage: 'en'
,
  author: { "@type": "Organization", name: "LaplandFood", url: "https://laplandfood.com" },
  datePublished: "2025-01-01T00:00:00+02:00",
  dateModified: "2026-05-16T00:00:00+02:00",
  image: "https://laplandfood.com/og/traditional-recipes-1200x630.jpg",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://laplandfood.com" },
};

const CONTEXT_ICONS = [Flame, Clock, Users];
const RECIPE_IMAGES = ['/images/recipe-bidos.jpg', '/images/recipe-gahkku.jpg', '/images/recipe-fish-soup.jpg', '/images/recipe-kissel.jpg'];
// Index-mapped to the seasons/methods arrays in locales (same order in all 12).
const SEASON_IMAGES = [
  '/images/season-dalvi.jpg',
  '/images/season-giddadalvi.jpg',
  '/images/season-gidda.jpg',
  '/images/season-giddageassi.jpg',
  '/images/season-geassi.jpg',
  '/images/season-cakcageassi.jpg',
  '/images/season-cakca.jpg',
  '/images/season-cakcadalvi.jpg',
];
const METHOD_IMAGES = ['/images/cook-open-fire.jpg', '/images/cook-earth-oven.jpg', '/images/cook-hot-stones.jpg', '/images/cook-smoking.jpg'];

export default function TraditionalRecipes() {
  const { t } = useTranslation('pages');
  const { to } = useLocale();
  const context = (t('traditionalRecipes.context.items', { returnObjects: true }) as ContextItem[]) || [];
  const sapmi = (t('traditionalRecipes.sapmi.items', { returnObjects: true }) as SapmiItem[]) || [];
  const recipes = (t('traditionalRecipes.recipes', { returnObjects: true }) as Recipe[]) || [];
  const seasons = (t('traditionalRecipes.seasons.items', { returnObjects: true }) as SeasonItem[]) || [];
  const methods = (t('traditionalRecipes.methods.items', { returnObjects: true }) as MethodItem[]) || [];

  return (
    <>
      <SEO titleKey="traditionalRecipes.title" descriptionKey="traditionalRecipes.description" path={'/traditional-recipes'} schema={articleSchema} />
      <div className="min-h-screen bg-white">
        <Nav />

        <PageHero
          eyebrow={t('traditionalRecipes.hero.eyebrow')}
          title={t('traditionalRecipes.hero.title')}
          titleHighlight={t('traditionalRecipes.hero.titleHighlight')}
          subtitle={t('traditionalRecipes.hero.subtitle')}
          imageUrl="/images/hero-recipes.jpg"
          imageAlt="Cast iron pot of reindeer stew bubbling over an open campfire at dusk"
          primaryCta={{ label: t('traditionalRecipes.hero.primaryCta'), href: `${to('/traditional-recipes')}#recipes` }}
          secondaryCta={{ label: t('traditionalRecipes.hero.secondaryCta'), href: to('/modern-lapland') }}
          pills={recipes.map(r => r.name)}
        />

        <IntroPoints sectionKey="traditionalRecipes" />

        {/* Cultural context */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('traditionalRecipes.context.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C]">
                {t('traditionalRecipes.context.headline')}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {context.map((c, i) => {
                const Icon = CONTEXT_ICONS[i];
                return (
                  <div key={c.title} className="rounded-2xl bg-[#F8FAFC] p-7 border border-[#002F6C]/10">
                    <Icon className="w-7 h-7 text-vibe-pink mb-4" />
                    <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-2">{c.title}</h3>
                    <p className="text-sm text-[#002F6C]/75 leading-relaxed">{c.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sápmi context */}
        <section className="bg-[#002F6C] py-20 text-white">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('traditionalRecipes.sapmi.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl mb-5">
                {t('traditionalRecipes.sapmi.headline')}
              </h2>
              <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                {t('traditionalRecipes.sapmi.lead')}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {sapmi.map((s) => (
                <div key={s.title} className="rounded-2xl bg-white/5 border border-white/15 p-6">
                  <h4 className="font-heading tracking-wide text-xl mb-3">{s.title}</h4>
                  <p className="text-sm text-white/75 leading-relaxed">
                    <Trans i18nKey="" ns="pages" defaults={s.body} components={{ em: <em /> }} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recipes */}
        <section id="recipes" className="bg-white py-20 sm:py-24">
          {/* 🔴 Oli max-w-4xl + space-y-12 = neljä reseptiä yhtenä 896 px:n
              pylväänä keskellä 1920 px:n ruutua, ja sivun korkeus turhaan
              nelinkertainen (Vesa 2026-08-10). Leveys 7xl ja kortit 2×2 xl:stä
              ylöspäin. Kortin SISÄINEN ainekset/ohje-jako menee samalla yhteen
              sarakkeeseen xl:ssä — kaksi saraketta puolikkaan levyisessä
              kortissa oli juuri se ahtaus jota vastaan tämä muutos tehtiin. */}
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('traditionalRecipes.recipesKicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C]">
                {t('traditionalRecipes.recipesHeadline')}
              </h2>
            </div>

            <div className="grid xl:grid-cols-2 gap-8 items-start">
              {recipes.map((r, idx) => (
                <article key={r.name} className="rounded-3xl bg-[#F8FAFC] border border-[#002F6C]/10 overflow-hidden">
                  <div className="relative h-56 sm:h-72 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                    <img src={RECIPE_IMAGES[idx]} alt={r.name} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/5 via-[#002F6C]/15 to-[#002F6C]/70" />
                    <div className="absolute bottom-5 left-7 sm:left-9 right-7 sm:right-9">
                      <span className="text-[11px] uppercase tracking-[0.18em] font-semibold bg-vibe-pink text-white px-3 py-1.5 rounded-full">
                        {r.tradition}
                      </span>
                      <h3 className="font-heading tracking-wide text-3xl sm:text-4xl text-white leading-tight mt-3">
                        {r.name}
                      </h3>
                    </div>
                  </div>
                  <header className="p-7 sm:p-9 border-b border-[#002F6C]/10">
                    <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">{r.description}</p>
                  </header>

                  <div className="p-7 sm:p-9 space-y-7">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <Clock className="w-5 h-5 text-vibe-pink mx-auto mb-1.5" />
                        <p className="text-xs uppercase tracking-wider text-[#002F6C]/60 font-semibold">{t('traditionalRecipes.recipeLabels.time')}</p>
                        <p className="text-sm text-[#002F6C] font-semibold mt-0.5">{r.time}</p>
                      </div>
                      <div>
                        <Users className="w-5 h-5 text-vibe-pink mx-auto mb-1.5" />
                        <p className="text-xs uppercase tracking-wider text-[#002F6C]/60 font-semibold">{t('traditionalRecipes.recipeLabels.serves')}</p>
                        <p className="text-sm text-[#002F6C] font-semibold mt-0.5">{r.serves}</p>
                      </div>
                      <div>
                        <ChefHat className="w-5 h-5 text-vibe-pink mx-auto mb-1.5" />
                        <p className="text-xs uppercase tracking-wider text-[#002F6C]/60 font-semibold">{t('traditionalRecipes.recipeLabels.level')}</p>
                        <p className="text-sm text-[#002F6C] font-semibold mt-0.5">{r.difficulty}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-7">
                      <div>
                        <h4 className="font-heading tracking-wide text-xl text-[#002F6C] mb-3">{t('traditionalRecipes.recipeLabels.ingredients')}</h4>
                        <ul className="space-y-2">
                          {r.ingredients.map(ing => (
                            <li key={ing} className="flex gap-2.5 text-sm text-[#002F6C]/85">
                              <span className="w-1.5 h-1.5 rounded-full bg-vibe-pink mt-2 flex-shrink-0" />
                              {ing}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-heading tracking-wide text-xl text-[#002F6C] mb-3">{t('traditionalRecipes.recipeLabels.instructions')}</h4>
                        <ol className="space-y-3">
                          {r.instructions.map((step, i) => (
                            <li key={step} className="flex gap-3 text-sm text-[#002F6C]/85">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-vibe-pink/15 text-vibe-pink text-xs font-bold flex items-center justify-center">
                                {i + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white border-l-4 border-vibe-pink p-5">
                      <p className="text-xs uppercase tracking-[0.18em] font-semibold text-vibe-pink mb-1">
                        {t('traditionalRecipes.recipeLabels.tip')}
                      </p>
                      <p className="text-sm text-[#002F6C]/80 italic leading-relaxed">{r.tips}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Eight Sami seasons */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('traditionalRecipes.seasons.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">
                {t('traditionalRecipes.seasons.headline')}
              </h2>
              <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed mb-4">
                {t('traditionalRecipes.seasons.p1')}
              </p>
              <p className="text-base text-[#002F6C]/75 leading-relaxed">
                {t('traditionalRecipes.seasons.p2')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
              {seasons.map((s, idx) => (
                <div key={s.sami} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 overflow-hidden">
                  <div className="relative h-36 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                    <img src={SEASON_IMAGES[idx]} alt={`${s.sami} / ${s.en}`} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,31,74,0.72) 0%, rgba(0,31,74,0.10) 60%)' }} />
                    <span className="absolute top-3 right-4 text-[10px] uppercase tracking-wider font-semibold bg-white/90 text-[#002F6C] px-2.5 py-1 rounded-full">{s.when}</span>
                    <h3 className="absolute bottom-3 left-5 right-5 font-heading tracking-wide text-2xl text-white leading-tight">
                      {s.sami} <span className="text-vibe-pink font-semibold text-sm">/ {s.en}</span>
                    </h3>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-sm text-[#002F6C]/80 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modern revival */}
        <section className="bg-[#F8FAFC] py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              {t('traditionalRecipes.revival.kicker')}
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-6">
              {t('traditionalRecipes.revival.headline')}
            </h2>
            <div className="relative rounded-2xl overflow-hidden h-52 sm:h-64 md:h-72 mb-8 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]">
              <img src="/images/lead-traditional-recipes.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="prose prose-lg max-w-none text-[#002F6C]/85">
              <p className="leading-relaxed mb-5">{t('traditionalRecipes.revival.p1')}</p>
              <p className="leading-relaxed mb-5">{t('traditionalRecipes.revival.p2')}</p>
              <p className="leading-relaxed mb-5">
                <Trans i18nKey="traditionalRecipes.revival.p3" ns="pages" components={{ em: <em /> }} />
              </p>
              <p className="leading-relaxed mb-5">{t('traditionalRecipes.revival.p4')}</p>
              <p className="leading-relaxed">
                {t('traditionalRecipes.revival.p5Prefix')}{' '}
                <Link to={to('/modern-lapland')} className="text-vibe-pink underline-offset-4 hover:underline">{t('traditionalRecipes.revival.p5ModernLabel')}</Link>
                {t('traditionalRecipes.revival.p5Mid')}{' '}
                <Link to={to('/food-tours')} className="text-vibe-pink underline-offset-4 hover:underline">{t('traditionalRecipes.revival.p5ToursLabel')}</Link>
                {t('traditionalRecipes.revival.p5Suffix')}
              </p>
            </div>
          </div>
        </section>

        {/* Cooking methods */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('traditionalRecipes.methods.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-4">
                {t('traditionalRecipes.methods.headline')}
              </h2>
              <p className="text-[#002F6C]/75 leading-relaxed">
                {t('traditionalRecipes.methods.lead')}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
              {methods.map((m, idx) => (
                <div key={m.title} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 overflow-hidden text-center">
                  <div className="relative h-28 sm:h-32 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                    <img src={METHOD_IMAGES[idx]} alt={m.title} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,31,74,0.55) 0%, rgba(0,31,74,0.05) 60%)' }} />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="font-heading tracking-wide text-xl text-[#002F6C] mb-2">{m.title}</h3>
                    <p className="text-sm text-[#002F6C]/70">{m.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-6">
              {t('traditionalRecipes.ctaStrip.headline')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to={to('/food-tours')} className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
                {t('traditionalRecipes.ctaStrip.tours')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to={to('/local-ingredients')} className="inline-flex items-center justify-center gap-2 border border-[#002F6C]/25 text-[#002F6C] hover:bg-[#002F6C]/5 font-semibold px-7 py-3.5 rounded-full transition-colors">
                {t('traditionalRecipes.ctaStrip.ingredients')}
              </Link>
              <Link to={to('/modern-lapland')} className="inline-flex items-center justify-center gap-2 border border-[#002F6C]/25 text-[#002F6C] hover:bg-[#002F6C]/5 font-semibold px-7 py-3.5 rounded-full transition-colors">
                {t('traditionalRecipes.ctaStrip.modern')}
              </Link>
            </div>
          </div>
        </section>

        {/* Suomikauppa-tuotenostot (Daisycon) sivun LOPUSSA, uutiskirjeen
            edella. Reseptisivu paattyy "kokeile kotona" -tunnelmaan; ruis on
            se osa poydasta jota lukija ei leivo itse gahkun tapaan, joten
            klassikkoleivat + hiutaleet dest-syvälinkkeinä vastaavat sivun
            omaan aukkoon. Ei liha- eikä maitotuotteita (tuontisäännöt). */}
        <div className="bg-[#F8FAFC] px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <SuomikauppaPicks variant="rye" />
          </div>
        </div>

        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
}
