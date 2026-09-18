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
 * Yhteinen marjasivu (14.9.2026, Vesa: "puolukka- ja mustikkasivut samalla
 * mallilla kuin hilla … oliko tyrni myös?"). Sama rakenne kuin /cloudberry:
 * hero pillereineen → johdanto → maku → sesonki → jokamiehenoikeus (sininen
 * kaista) → vertailu (puolukka vs karpalo, mustikka vs pensasmustikka, tyrnin
 * piikit) → mitä se on arvoltaan / C-vitamiini → tuotteet → Suomikauppa →
 * missä maistaa (sininen kaista + GYG) → seuraavat askeleet.
 *
 * Kaikki copy tulee `pages.<key>`-lohkosta 12 kielellä. Sivukohtaiset erot
 * (kuvat, GYG-haku, majoituskaupunki, kuvatekstit omille valokuvoille) ovat
 * tässä konfiguraatiossa, eivät kopioidussa komponentissa.
 */
export interface BerryConfig {
  key: 'lingonberry' | 'bilberry' | 'seaBuckthorn';
  path: string;
  hero: { image: string; alt: string };
  taste: { image?: string; alt?: string; ownPhoto?: boolean };
  versus: { image?: string; alt?: string; ownPhoto?: boolean };
  /** Yksi kuva per tuotekortti, indeksi vastaa `products.items`-taulukkoa
   *  (sama jarjestys kaikilla 12 kielella). Vesa 15.9.: paljaat tekstikortit
   *  eivat kelpaa, kun sivu kertoo mita marjasta tehdaan. */
  products: { images: string[]; alts: string[] };
  gyg: { query: string; sid: string };
  stay: { destination: string; sid: string };
  about: string;
  datePublished: string;
}

const PILL_ANCHORS = ['#taste', '#season', '#right-to-pick', '#versus', '#price', '#products', '#where-to-taste'];

const LEDE = 'text-lg sm:text-xl text-[#002F6C] leading-relaxed mb-5';
const BODY = 'text-[#002F6C]/80 leading-relaxed mb-5';
const BODY_LAST = 'text-[#002F6C]/80 leading-relaxed';

/** Two-column band: sticky image beside prose. Without an image the prose
 *  takes the full measure — a text-only section is better than a filler
 *  picture that says nothing (Vesa 11.9.: ei koristekuvia). */
function ImageProse({ id, kicker, headline, image, alt, caption, credit, imageRight, tint, children }: {
  id: string; kicker: string; headline: string; image?: string; alt?: string; caption?: string; credit?: string;
  imageRight?: boolean; tint?: boolean; children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-20 ${tint ? 'bg-[#F8FAFC]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className={image ? 'grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-12 items-stretch' : ''}>
          {image && (
            <div className={imageRight ? 'lg:order-last' : ''}>
              <div className="lg:sticky lg:top-24">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]">
                  <img src={image} alt={alt ?? ''} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                {caption && (
                  <p className="mt-3 text-xs sm:text-[13px] text-[#002F6C]/70 leading-snug">
                    {caption}
                    {credit && <span className="text-[#002F6C]/70"> · {credit}</span>}
                  </p>
                )}
              </div>
            </div>
          )}
          <div className={image ? '' : 'max-w-3xl'}>
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">{kicker}</p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-6">{headline}</h2>
            <div className="max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BerryPage({ cfg }: { cfg: BerryConfig }) {
  const { t } = useTranslation('pages');
  const { t: tc } = useTranslation('common');
  const { to, locale } = useLocale();
  const k = cfg.key;
  const arr = <T,>(key: string) => (t(`${k}.${key}`, { returnObjects: true }) as T[]) || [];
  const pills = arr<string>('hero.pills');
  const phases = arr<SeasonPhase>('season.phases');
  const facts = arr<PriceFact>('price.facts');
  const products = arr<ProductItem>('products.items');
  const ways = arr<WhereWay>('where.ways');
  const nextSteps = arr<NextStep>('nextSteps.items');
  const captionTaste = t(`${k}.captions.taste`, { defaultValue: '' }) as string;
  const captionVersus = t(`${k}.captions.versus`, { defaultValue: '' }) as string;
  const credit = tc('photo.credit');

  const gygHref = gygSearchLink(cfg.gyg.query, cfg.gyg.sid, locale);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t(`${k}.title`),
    description: t(`${k}.description`),
    about: cfg.about,
    publisher: { '@type': 'Organization', name: 'LaplandFood', url: 'https://laplandfood.com' },
    author: { '@type': 'Organization', name: 'LaplandFood', url: 'https://laplandfood.com' },
    datePublished: cfg.datePublished,
    dateModified: cfg.datePublished,
    image: `https://laplandfood.com${cfg.hero.image.replace(/\.webp$/, '.jpg')}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://laplandfood.com${cfg.path}/` },
  };

  return (
    <>
      <SEO titleKey={`${k}.title`} descriptionKey={`${k}.description`} path={cfg.path} schema={articleSchema} />
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero
          eyebrow={t(`${k}.hero.eyebrow`)}
          title={t(`${k}.hero.title`)}
          titleHighlight={t(`${k}.hero.titleHighlight`)}
          subtitle={t(`${k}.hero.subtitle`)}
          imageUrl={cfg.hero.image}
          imageAlt={t(`${k}.hero.imageAlt`, { defaultValue: cfg.hero.alt })}
          primaryCta={{ label: t(`${k}.hero.primaryCta`), href: to('/foraging-guide') }}
          secondaryCta={{ label: t(`${k}.hero.secondaryCta`), href: to('/berries') }}
          pills={pills}
          pillHrefs={PILL_ANCHORS}
        />

        <IntroPoints sectionKey={k} />

        {/* Taste — the question travellers search for; the answer opens the section. */}
        <ImageProse
          id="taste"
          kicker={t(`${k}.taste.kicker`)}
          headline={t(`${k}.taste.headline`)}
          image={cfg.taste.image}
          alt={cfg.taste.alt}
          caption={cfg.taste.ownPhoto ? captionTaste : undefined}
          credit={cfg.taste.ownPhoto ? credit : undefined}
          tint
        >
          <p className={LEDE}>{t(`${k}.taste.answer`)}</p>
          <p className={BODY}>{t(`${k}.taste.p2`)}</p>
          <p className={BODY_LAST}>
            <Trans i18nKey={`${k}.taste.p3`} ns="pages" components={{ em: <em /> }} />
          </p>
        </ImageProse>

        {/* Season */}
        <section id="season" className="scroll-mt-24 bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">{t(`${k}.season.kicker`)}</p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">{t(`${k}.season.headline`)}</h2>
              <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">{t(`${k}.season.lead`)}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lv-grid-3">
              {phases.map(ph => (
                <div key={ph.period} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6">
                  <span className="inline-block text-[10px] uppercase tracking-[0.18em] font-semibold bg-vibe-pink text-white px-2.5 py-1 rounded-full mb-3">{ph.period}</span>
                  <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-2 leading-tight">{ph.title}</h3>
                  <p className="text-sm text-[#002F6C]/80 leading-relaxed">{ph.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Everyman's right — blue impact band */}
        <section id="right-to-pick" className="scroll-mt-24 bg-[#002F6C] py-16 sm:py-20 text-white">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">{t(`${k}.rights.kicker`)}</p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl mb-5">{t(`${k}.rights.headline`)}</h2>
            <p className="text-base text-white/85 leading-relaxed mb-5">
              <Trans i18nKey={`${k}.rights.p1`} ns="pages" components={{ em: <em /> }} />
            </p>
            <p className="text-base text-white/85 leading-relaxed mb-7">{t(`${k}.rights.p2`)}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to={to('/foraging-guide')} className="inline-flex items-center justify-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
                {t(`${k}.rights.ctaPrimary`)}
              </Link>
              <Link to={to('/traditional-recipes')} className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-full border border-white/40 transition-colors">
                {t(`${k}.rights.ctaSecondary`)}
              </Link>
            </div>
          </div>
        </section>

        {/* Versus / why the thorns */}
        <ImageProse
          id="versus"
          kicker={t(`${k}.versus.kicker`)}
          headline={t(`${k}.versus.headline`)}
          image={cfg.versus.image}
          alt={cfg.versus.alt}
          caption={cfg.versus.ownPhoto ? captionVersus : undefined}
          credit={cfg.versus.ownPhoto ? credit : undefined}
          imageRight
        >
          <p className={LEDE}>
            <Trans i18nKey={`${k}.versus.p1`} ns="pages" components={{ em: <em /> }} />
          </p>
          <p className={BODY}>
            <Trans i18nKey={`${k}.versus.p2`} ns="pages" components={{ em: <em /> }} />
          </p>
          <p className={BODY}>{t(`${k}.versus.p3`)}</p>
          <p className={BODY_LAST}>
            <Trans i18nKey={`${k}.versus.p4`} ns="pages" components={{ strong: <strong /> }} />
          </p>
        </ImageProse>

        {/* Price / value (or vitamin C for sea buckthorn) */}
        <section id="price" className="scroll-mt-24 bg-[#F8FAFC] py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">{t(`${k}.price.kicker`)}</p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">{t(`${k}.price.headline`)}</h2>
              <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">{t(`${k}.price.lead`)}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 lv-grid-3">
              {facts.map(f => (
                <div key={f.value} className="rounded-2xl bg-white border border-[#002F6C]/10 p-6">
                  <p className="font-heading tracking-wide text-4xl text-vibe-pink mb-2">{f.value}</p>
                  <p className="text-sm text-[#002F6C]/80 leading-relaxed">{f.label}</p>
                </div>
              ))}
            </div>
            <p className="max-w-3xl text-[#002F6C]/80 leading-relaxed">{t(`${k}.price.p2`)}</p>
          </div>
        </section>

        {/* Products — jokainen kortti nayttaa mita siina lukee (Vesa 15.9.). */}
        <section id="products" className="scroll-mt-24 bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">{t(`${k}.products.kicker`)}</p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">{t(`${k}.products.headline`)}</h2>
              <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">{t(`${k}.products.lead`)}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
              {products.map((pr, i) => (
                <article key={pr.title} className="flex flex-col rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 overflow-hidden">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]">
                    <img src={cfg.products.images[i]} alt={cfg.products.alts[i] ?? ''} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-2 leading-tight">{pr.title}</h3>
                    <p className="text-sm text-[#002F6C]/80 leading-relaxed">{pr.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Suomikauppa: the pantry exit — the shop's verified wild-berry classics. */}
        <div className="bg-white px-4 pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl">
            <SuomikauppaPicks variant="berries" />
          </div>
        </div>

        {/* Where to taste it — blue band with the paid foraging exit */}
        <section id="where-to-taste" className="scroll-mt-24 bg-[#002F6C] py-16 sm:py-20 text-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">{t(`${k}.where.kicker`)}</p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl">{t(`${k}.where.headline`)}</h2>
              <p className="text-base text-white/85 leading-relaxed mt-5">{t(`${k}.where.lead`)}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 lv-grid-3">
              {ways.map(w => (
                <div key={w.n} className="rounded-2xl bg-white/5 border border-white/15 p-6">
                  <p className="font-heading tracking-wide text-3xl text-vibe-pink mb-2">{w.n}</p>
                  <h3 className="font-heading tracking-wide text-2xl mb-2 leading-tight">{w.title}</h3>
                  <p className="text-sm text-white/85 leading-relaxed">{w.body}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={gygHref} target="_blank" rel="sponsored nofollow noopener" className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
                {t(`${k}.where.gygCta`)}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link to={to('/michelin-dining')} className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-full border border-white/40 transition-colors">
                {t(`${k}.where.diningCta`)}
              </Link>
            </div>
          </div>
        </section>

        {/* Next steps — two editorial answers first, the paid one last */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">{t(`${k}.nextSteps.kicker`)}</p>
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
                      {i === 2 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </span>
                  </>
                );
                const cls = 'group flex flex-col rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6 hover:border-vibe-pink/40 transition-colors';
                if (i === 0) return <Link key={s.title} to={to('/foraging-guide')} className={cls}>{inner}</Link>;
                if (i === 1) return <Link key={s.title} to={to('/berries')} className={cls}>{inner}</Link>;
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
