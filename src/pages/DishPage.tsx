import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUpRight, ChefHat, Clock, Users } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import IntroPoints from '../components/IntroPoints';
import PageHero from '../components/PageHero';
import PhotoCredit from '../components/PhotoCredit';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import AffiliateCTA from '../components/AffiliateCTA';
import SuomikauppaPicks, { type SuomikauppaPicksVariant } from '../components/SuomikauppaPicks';
import { creditFor } from '../data/photoCredits';
import { gygSearchLink } from '../lib/gyg';
import { useLocale } from '../i18n/useLocale';

interface Recipe {
  name: string;
  description: string;
  time: string;
  serves: string;
  level: string;
  ingredients: string[];
  instructions: string[];
  tip: string;
}
interface Card { title: string; body: string }
interface Fact { value: string; label: string; source: string }
interface Place { name: string; town: string; body: string }
interface FaqItem { question: string; answer: string }
interface NextStep { title: string; body: string; cta: string }

/**
 * Ruokalajisivu (23.9.2026, Vesa: "Teetkö myös leipäjuusto ja poronkäristys
 * sivut?"). Mitattu kysyntä 23.9.: poronkäristys 14 800/kk ja leipäjuusto
 * 5 400/kk Suomessa, ruotsiksi renskav 5 400 ja kaffeost 2 400, KD 0 — eikä
 * sivustolla ollut kummallekaan omaa sivua.
 *
 * Rakenne marjasivujen mallista, yksi ero: RESEPTI TULEE HETI JOHDANNON
 * JÄLKEEN. Hakutulos on molemmilla hauilla reseptisivuja (lapinliha, Valio,
 * K-Ruoka; ICA ja Arla ruotsiksi), ja Vesa sanoi reseptisivusta 15.9.:
 * "asiakkaan mielenkiinto pitäisi saada kiinnostumaan heti jollain wau
 * reseptillä". Tausta, muunnelmat ja luvut tulevat vasta sen jälkeen.
 *
 * Kaikki copy tulee `pages.<key>`-lohkosta 12 kielellä; reseptin nimikkeet
 * (Aika, Annoksia, Taso, Ainekset, Valmistus, Vinkki) ovat reseptisivun
 * valmiiksi käännetyt `traditionalRecipes.recipeLabels`. Luvut näytetään
 * lähteineen (`facts.items[].source`) — ei yhtään lukua ilman lähdettä.
 */
export interface DishConfig {
  key: 'poronkaristys' | 'leipajuusto';
  path: string;
  hero: { image: string; alt: string };
  about: { image?: string; alt?: string; ownPhoto?: boolean };
  /** Indeksi vastaa `recipes.items`-taulukkoa (sama järjestys kaikilla 12 kielellä). */
  recipes: { image?: string; alt?: string; fit?: 'cover' | 'contain'; totalTime: string; category: string }[];
  suomikauppa?: SuomikauppaPicksVariant;
  gyg: { query: string; sid: string };
  stay: { destination: string; sid: string };
  /** Seuraavat askeleet -korttien 1 ja 2 sisäiset kohteet; kolmas on majoitus. */
  next: [string, string];
  aboutSchema: string;
  datePublished: string;
}

const PILL_ANCHORS = ['#recipe', '#what-it-is', '#variations', '#facts', '#where-to-eat', '#faq'];

const LEDE = 'text-lg sm:text-xl text-[#002F6C] leading-relaxed mb-5';
const BODY = 'text-[#002F6C]/80 leading-relaxed mb-5';
const BODY_LAST = 'text-[#002F6C]/80 leading-relaxed';
const KICKER = 'text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3';

/** Kuvaton resepti näytetään ilman kuvaa, ei toisen ruoan kuvalla: aitoa kuvaa ei
 *  kaikille resepteille ole, ja väärä kuva on huonompi kuin ei kuvaa (Vesa 11.9.). */
function RecipeCard({ recipe, image, alt, fit = 'cover', labels, featured, id }: {
  recipe: Recipe; image?: string; alt?: string; fit?: 'cover' | 'contain'; featured: boolean; id: string;
  labels: { time: string; serves: string; level: string; ingredients: string; instructions: string; tip: string };
}) {
  const { t: tc } = useTranslation('common');
  return (
    <article id={id} className="scroll-mt-24 overflow-hidden rounded-3xl border border-[#002F6C]/10 bg-[#F8FAFC]">
      <div className={image ? 'grid lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]' : ''}>
        {image && (
          <div className={`relative ${featured ? 'min-h-[260px] lg:min-h-[420px]' : 'min-h-[220px] lg:min-h-[340px]'} ${fit === 'contain' ? 'bg-[#E7E5E0]' : 'bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]'}`}>
            {/* contain = koko kuva näkyviin (arkistokuva pyöreästä juustosta: cover zoomasi sen harmaaksi pinnaksi) */}
            <img src={image} alt={alt ?? recipe.name} loading={featured ? 'eager' : 'lazy'} decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className={`absolute inset-0 h-full w-full ${fit === 'contain' ? 'object-contain p-6 pb-20' : 'object-cover'}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002F6C]/70 via-transparent to-transparent" />
            <h3 className="absolute bottom-5 left-6 right-6 font-heading tracking-wide text-3xl sm:text-4xl text-white leading-tight">
              {recipe.name}
            </h3>
            <PhotoCredit credit={creditFor(image)} label={tc('photo.label')} />
          </div>
        )}
        <div className="p-7 sm:p-9">
          {!image && (
            <h3 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] leading-tight mb-4">{recipe.name}</h3>
          )}
          <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed mb-6">{recipe.description}</p>
          <div className="grid grid-cols-3 gap-4 text-center mb-7">
            <div>
              <Clock className="w-5 h-5 text-vibe-pink mx-auto mb-1.5" aria-hidden="true" />
              <p className="text-xs uppercase tracking-wider text-[#002F6C]/70 font-semibold">{labels.time}</p>
              <p className="text-sm text-[#002F6C] font-semibold mt-0.5">{recipe.time}</p>
            </div>
            <div>
              <Users className="w-5 h-5 text-vibe-pink mx-auto mb-1.5" aria-hidden="true" />
              <p className="text-xs uppercase tracking-wider text-[#002F6C]/70 font-semibold">{labels.serves}</p>
              <p className="text-sm text-[#002F6C] font-semibold mt-0.5">{recipe.serves}</p>
            </div>
            <div>
              <ChefHat className="w-5 h-5 text-vibe-pink mx-auto mb-1.5" aria-hidden="true" />
              <p className="text-xs uppercase tracking-wider text-[#002F6C]/70 font-semibold">{labels.level}</p>
              <p className="text-sm text-[#002F6C] font-semibold mt-0.5">{recipe.level}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-7">
            <div>
              <h4 className="font-heading tracking-wide text-xl text-[#002F6C] mb-3">{labels.ingredients}</h4>
              <ul className="space-y-2">
                {recipe.ingredients.map(ing => (
                  <li key={ing} className="flex gap-2.5 text-sm text-[#002F6C]/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-vibe-pink mt-2 flex-shrink-0" aria-hidden="true" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading tracking-wide text-xl text-[#002F6C] mb-3">{labels.instructions}</h4>
              <ol className="space-y-3">
                {recipe.instructions.map((step, i) => (
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
          <div className="mt-7 rounded-2xl bg-white border-l-4 border-vibe-pink p-5">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-vibe-pink mb-1">{labels.tip}</p>
            <p className="text-sm text-[#002F6C]/80 italic leading-relaxed">{recipe.tip}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Kuva + teksti rinnakkain; ilman kuvaa teksti saa koko leveyden (Vesa 11.9.: ei koristekuvia). */
function ImageProse({ id, kicker, headline, image, alt, caption, children }: {
  id: string; kicker: string; headline: string; image?: string; alt?: string; caption?: string; children: ReactNode;
}) {
  const { t: tc } = useTranslation('common');
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className={image ? 'grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-12 items-stretch' : ''}>
          {image && (
            <div>
              <div className="lg:sticky lg:top-24">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]">
                  <img src={image} alt={alt ?? ''} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
                  <PhotoCredit credit={creditFor(image)} label={tc('photo.label')} />
                </div>
                {caption && <p className="mt-3 text-xs sm:text-[13px] text-[#002F6C]/70 leading-snug">{caption}</p>}
              </div>
            </div>
          )}
          <div className={image ? '' : 'max-w-3xl'}>
            <p className={KICKER}>{kicker}</p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-6">{headline}</h2>
            <div className="max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DishPage({ cfg }: { cfg: DishConfig }) {
  const { t } = useTranslation('pages');
  const { t: tc } = useTranslation('common');
  const { to, locale } = useLocale();
  const k = cfg.key;
  const arr = <T,>(key: string) => (t(`${k}.${key}`, { returnObjects: true }) as T[]) || [];
  const pills = arr<string>('hero.pills');
  const recipes = arr<Recipe>('recipes.items');
  const variations = arr<Card>('variations.items');
  const facts = arr<Fact>('facts.items');
  const places = arr<Place>('where.items');
  const faq = arr<FaqItem>('faq.items');
  const nextSteps = arr<NextStep>('nextSteps.items');
  const labels = {
    time: t('traditionalRecipes.recipeLabels.time'),
    serves: t('traditionalRecipes.recipeLabels.serves'),
    level: t('traditionalRecipes.recipeLabels.level'),
    ingredients: t('traditionalRecipes.recipeLabels.ingredients'),
    instructions: t('traditionalRecipes.recipeLabels.instructions'),
    tip: t('traditionalRecipes.recipeLabels.tip'),
  };
  const [featured, ...more] = recipes;

  const gygHref = gygSearchLink(cfg.gyg.query, cfg.gyg.sid, locale);
  const pageUrl = `https://laplandfood.com${to(cfg.path)}`.replace(/\/?$/, '/');
  const ORG = { '@type': 'Organization', name: 'LaplandFood', url: 'https://laplandfood.com' };
  const abs = (p: string) => `https://laplandfood.com${p.split('?')[0]}`;
  // Recipe-solmun kuva on pakollinen rikastetulle tulokselle: kuvattomalle reseptille
  // sivun ensimmäinen oikea annoskuva (sama ruoka), ei pääkuvaa (poro tiellä ei ole annos).
  const dishImage = cfg.recipes.find(r => r.image)?.image ?? cfg.hero.image;

  // Article + reseptit + UKK yhdessä @graphissa, kaikki sivun omasta lokalisoidusta
  // datasta (sama malli kuin /traditional-recipes 14.9.). Ei arvosanoja eikä
  // ravintoarvoja reseptisolmuihin: annoskohtaista laskelmaa ei ole, joten sitä ei keksitä.
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: t(`${k}.title`),
        description: t(`${k}.description`),
        about: cfg.aboutSchema,
        publisher: ORG,
        author: ORG,
        datePublished: cfg.datePublished,
        dateModified: cfg.datePublished,
        image: abs(cfg.hero.image),
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      },
      ...recipes.map((r, i) => ({
        '@type': 'Recipe',
        '@id': `${pageUrl}#recipe-${i}`,
        name: r.name,
        description: r.description,
        image: [abs(cfg.recipes[i]?.image ?? dishImage)],
        author: ORG,
        datePublished: cfg.datePublished,
        recipeCuisine: 'Finnish',
        recipeCategory: cfg.recipes[i]?.category,
        totalTime: cfg.recipes[i]?.totalTime,
        recipeYield: r.serves,
        recipeIngredient: r.ingredients,
        recipeInstructions: r.instructions.map((step, n) => ({ '@type': 'HowToStep', position: n + 1, text: step })),
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      })),
      ...(faq.length > 0
        ? [{
            '@type': 'FAQPage',
            mainEntity: faq.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
          }]
        : []),
    ],
  };

  return (
    <>
      <SEO titleKey={`${k}.title`} descriptionKey={`${k}.description`} path={cfg.path} schema={schema} />
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero
          eyebrow={t(`${k}.hero.eyebrow`)}
          title={t(`${k}.hero.title`)}
          titleHighlight={t(`${k}.hero.titleHighlight`)}
          subtitle={t(`${k}.hero.subtitle`)}
          imageUrl={cfg.hero.image}
          imageAlt={t(`${k}.hero.imageAlt`, { defaultValue: cfg.hero.alt })}
          primaryCta={{ label: t(`${k}.hero.primaryCta`), href: `${to(cfg.path)}#recipe` }}
          secondaryCta={{ label: t(`${k}.hero.secondaryCta`), href: to('/traditional-recipes') }}
          pills={pills}
          pillHrefs={PILL_ANCHORS}
        />

        <IntroPoints sectionKey={k} />

        {/* Resepti heti johdannon jälkeen — hakija tuli reseptin takia. */}
        {featured && (
          <section id="recipe" className="scroll-mt-24 bg-white py-16 sm:py-20">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-8">
                <p className={KICKER}>{t(`${k}.recipes.kicker`)}</p>
                <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">{t(`${k}.recipes.headline`)}</h2>
                <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">{t(`${k}.recipes.lead`)}</p>
              </div>
              <div className="space-y-8">
                <RecipeCard id="recipe-0" recipe={featured} image={cfg.recipes[0]?.image} alt={cfg.recipes[0]?.alt} labels={labels} featured />
                {more.map((r, i) => (
                  <RecipeCard key={r.name} id={`recipe-${i + 1}`} recipe={r} image={cfg.recipes[i + 1]?.image} alt={cfg.recipes[i + 1]?.alt} fit={cfg.recipes[i + 1]?.fit} labels={labels} featured={false} />
                ))}
              </div>
            </div>
          </section>
        )}

        <ImageProse
          id="what-it-is"
          kicker={t(`${k}.about.kicker`)}
          headline={t(`${k}.about.headline`)}
          image={cfg.about.image}
          alt={cfg.about.alt}
          caption={cfg.about.ownPhoto ? `${t(`${k}.about.caption`, { defaultValue: '' })} · ${tc('photo.credit')}` : undefined}
        >
          <p className={LEDE}>{t(`${k}.about.p1`)}</p>
          <p className={BODY}>{t(`${k}.about.p2`)}</p>
          <p className={BODY_LAST}>
            <Trans i18nKey={`${k}.about.p3`} ns="pages" components={{ em: <em />, strong: <strong /> }} />
          </p>
        </ImageProse>

        {variations.length > 0 && (
          <section id="variations" className="scroll-mt-24 bg-white py-16 sm:py-20">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-10">
                <p className={KICKER}>{t(`${k}.variations.kicker`)}</p>
                <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">{t(`${k}.variations.headline`)}</h2>
                <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">{t(`${k}.variations.lead`)}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lv-grid-3">
                {variations.map(v => (
                  <div key={v.title} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6">
                    <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-2 leading-tight">{v.title}</h3>
                    <p className="text-sm text-[#002F6C]/80 leading-relaxed">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Luvut lähteineen: jokaisen kortin alla näkyy mistä luku on. */}
        {facts.length > 0 && (
          <section id="facts" className="scroll-mt-24 bg-[#F8FAFC] py-16 sm:py-20">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-10">
                <p className={KICKER}>{t(`${k}.facts.kicker`)}</p>
                <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">{t(`${k}.facts.headline`)}</h2>
                <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">{t(`${k}.facts.lead`)}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lv-grid-3">
                {facts.map(f => (
                  <div key={f.label} className="flex flex-col rounded-2xl bg-white border border-[#002F6C]/10 p-6">
                    <p className="font-heading tracking-wide text-4xl text-vibe-pink mb-2">{f.value}</p>
                    <p className="text-sm text-[#002F6C]/80 leading-relaxed flex-1">{f.label}</p>
                    <p className="mt-4 text-xs text-[#002F6C]/60 leading-snug">{f.source}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {cfg.suomikauppa && (
          <div className="bg-[#F8FAFC] px-4 pb-16 sm:pb-20">
            <div className="mx-auto max-w-5xl">
              <SuomikauppaPicks variant={cfg.suomikauppa} />
            </div>
          </div>
        )}

        {/* Missä syödä Lapissa — sininen kaista, maksettu ulospääsy viimeisenä */}
        <section id="where-to-eat" className="scroll-mt-24 bg-[#002F6C] py-16 sm:py-20 text-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className={KICKER}>{t(`${k}.where.kicker`)}</p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl">{t(`${k}.where.headline`)}</h2>
              <p className="text-base text-white/85 leading-relaxed mt-5">{t(`${k}.where.lead`)}</p>
            </div>
            {places.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 lv-grid-3">
                {places.map(p => (
                  <div key={p.name} className="rounded-2xl bg-white/5 border border-white/15 p-6">
                    <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-white/70 mb-2">{p.town}</p>
                    <h3 className="font-heading tracking-wide text-2xl mb-2 leading-tight">{p.name}</h3>
                    <p className="text-sm text-white/85 leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={gygHref} target="_blank" rel="sponsored nofollow noopener" className="inline-flex items-center justify-center gap-2 bg-[#DB2777] hover:bg-[#BE185D] text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
                {t(`${k}.where.gygCta`)}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link to={to('/michelin-dining')} className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-full border border-white/40 transition-colors">
                {t(`${k}.where.diningCta`)}
              </Link>
            </div>
          </div>
        </section>

        {/* UKK näkyvissä kokonaan (ei haitaria): vastaukset ovat hakijan tarkentavat kysymykset. */}
        {faq.length > 0 && (
          <section id="faq" className="scroll-mt-24 bg-white py-16 sm:py-20">
            <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
              <p className={KICKER}>{t(`${k}.faq.kicker`)}</p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-8">{t(`${k}.faq.headline`)}</h2>
              <dl className="divide-y divide-[#002F6C]/10 border-y border-[#002F6C]/10">
                {faq.map(f => (
                  <div key={f.question} className="py-5">
                    <dt className="font-semibold text-[#002F6C] text-base sm:text-lg mb-2">{f.question}</dt>
                    <dd className="text-[#002F6C]/80 leading-relaxed">{f.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* Seuraavat askeleet — kaksi toimituksellista, maksettu viimeisenä */}
        <section className="bg-[#F8FAFC] py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className={KICKER}>{t(`${k}.nextSteps.kicker`)}</p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C]">{t(`${k}.nextSteps.headline`)}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lv-grid-3">
              {nextSteps.map((s, i) => {
                const inner = (
                  <>
                    <h3 className="font-heading tracking-wide text-2xl sm:text-3xl text-[#002F6C] mb-3 group-hover:text-vibe-pink transition-colors">{s.title}</h3>
                    <p className="text-sm text-[#002F6C]/70 leading-relaxed flex-1">{s.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-vibe-pink">
                      {s.cta}
                      {i === 2 ? <ArrowUpRight className="w-4 h-4" aria-hidden="true" /> : <ArrowRight className="w-4 h-4" aria-hidden="true" />}
                    </span>
                  </>
                );
                const cls = 'group flex flex-col rounded-2xl bg-white border border-[#002F6C]/10 p-6 hover:border-vibe-pink/40 transition-colors';
                if (i < 2) return <Link key={s.title} to={to(cfg.next[i])} className={cls}>{inner}</Link>;
                return (
                  <AffiliateCTA key={s.title} partner="hotels" sid={cfg.stay.sid} destination={cfg.stay.destination} className={cls}>
                    {inner}
                  </AffiliateCTA>
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
