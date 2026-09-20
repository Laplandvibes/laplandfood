import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import IntroPoints from '../components/IntroPoints';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import AffiliateCTA from '../components/AffiliateCTA';
import SuomikauppaPicks from '../components/SuomikauppaPicks';
import { useLocale } from '../i18n/useLocale';

interface GuideCard { name: string; latin: string; season: string; body: string; cta: string }
interface CalendarItem { period: string; title: string; body: string }
interface OtherBerry { name: string; latin: string; when: string; body: string }
interface NextStep { title: string; body: string; cta: string }

/**
 * /berries — "Suomen marjat" (Vesa 14.9.2026: "tee niille sitte oma alavalikko
 * suomen marjat tai jotain"). Kokoava sivu neljälle marjaoppaalle: hilla,
 * mustikka, puolukka, tyrni. Ei omaa faktakerrosta — luvut asuvat
 * marjasivuilla, tämä sivu vastaa "mikä marja, milloin, mihin oppaaseen".
 *
 * Kuvat: hero = oma valokuva Sallan pitkospuilta 11.8.2026; korttikuvat ovat
 * samat kuin marjasivuilla (sama sivusto, sama kuva ok — sääntö kieltää saman
 * kuvan eri EKOSYSTEEMIsivustoilla).
 */
const GUIDE_PATHS = ['/cloudberry', '/bilberry', '/lingonberry', '/sea-buckthorn'];
const GUIDE_IMAGES = [
  '/images/forage-cloudberry.jpg',
  '/images/hero-bilberry.jpg',
  '/images/lingonberry-shrub.jpg',
  '/images/sea-buckthorn-branch.jpg',
];
const GUIDE_ALTS = [
  'Ripe amber cloudberries on an open Lapland bog',
  'Ripe bilberries on a low green shrub in a Salla forest',
  'Lingonberry shrub with ripe red berries on pale lichen under pines',
  'Sea buckthorn branch heavy with orange berries on a stony shore',
];

export default function Berries() {
  const { t } = useTranslation('pages');
  const { to } = useLocale();
  const cards = (t('berries.guides.cards', { returnObjects: true }) as GuideCard[]) || [];
  const calendar = (t('berries.calendar.items', { returnObjects: true }) as CalendarItem[]) || [];
  const nextSteps = (t('berries.nextSteps.items', { returnObjects: true }) as NextStep[]) || [];
  const other = (t('berries.other.items', { returnObjects: true }) as OtherBerry[]) || [];

  const pageUrl = `https://laplandfood.com${to('/berries')}`.replace(/\/?$/, '/');
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: t('berries.title'),
        description: t('berries.description'),
        url: pageUrl,
        publisher: { '@type': 'Organization', name: 'LaplandFood', url: 'https://laplandfood.com' },
        datePublished: '2026-09-14T00:00:00+03:00',
        dateModified: '2026-09-14T00:00:00+03:00',
        image: 'https://laplandfood.com/images/hero-berries.jpg',
      },
      {
        '@type': 'ItemList',
        name: t('berries.guides.headline'),
        itemListElement: cards.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          url: `https://laplandfood.com${to(GUIDE_PATHS[i])}`.replace(/\/?$/, '/'),
        })),
      },
    ],
  };

  return (
    <>
      <SEO titleKey="berries.title" descriptionKey="berries.description" path="/berries" schema={schema} />
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero
          eyebrow={t('berries.hero.eyebrow')}
          title={t('berries.hero.title')}
          titleHighlight={t('berries.hero.titleHighlight')}
          subtitle={t('berries.hero.subtitle')}
          imageUrl="/images/hero-berries.webp"
          imageAlt="Wooden duckboards leading across an open mire towards a bare fell at Salla, low cloud overhead"
          primaryCta={{ label: t('berries.hero.primaryCta'), href: to('/foraging-guide') }}
          secondaryCta={{ label: t('berries.hero.secondaryCta'), href: to('/local-ingredients') }}
          pills={cards.map(c => c.name)}
          pillHrefs={GUIDE_PATHS.map(p => to(p))}
        />

        <IntroPoints sectionKey="berries" />

        {/* The four guides */}
        <section id="guides" className="scroll-mt-24 bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">{t('berries.guides.kicker')}</p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">{t('berries.guides.headline')}</h2>
              <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">{t('berries.guides.lead')}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {cards.map((c, i) => (
                <Link
                  key={c.name}
                  to={to(GUIDE_PATHS[i])}
                  className="group flex flex-col rounded-3xl bg-[#F8FAFC] border border-[#002F6C]/10 overflow-hidden hover:border-vibe-pink/40 hover:shadow-[0_10px_32px_rgba(0,47,108,0.08)] transition-all"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                    <img src={GUIDE_IMAGES[i]} alt={GUIDE_ALTS[i]} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                    <span className="absolute top-3 right-4 text-[10px] uppercase tracking-[0.18em] font-semibold bg-white/95 text-[#002F6C] px-2.5 py-1 rounded-full">{c.season}</span>
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <h3 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] leading-tight group-hover:text-vibe-pink transition-colors">{c.name}</h3>
                    <p className="text-xs italic text-[#002F6C]/70 mt-1 mb-3">{c.latin}</p>
                    <p className="text-sm sm:text-base text-[#002F6C]/80 leading-relaxed flex-1">{c.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-vibe-pink">
                      {c.cta} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Season ladder */}
        <section id="calendar" className="scroll-mt-24 bg-[#002F6C] py-16 sm:py-20 text-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">{t('berries.calendar.kicker')}</p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl">{t('berries.calendar.headline')}</h2>
            </div>
            <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 lv-grid-3">
              {calendar.map((c) => (
                <li key={c.period} className="rounded-2xl bg-white/5 border border-white/15 p-5 flex flex-col">
                  <span className="inline-block self-start text-[10px] uppercase tracking-[0.18em] font-semibold bg-[#DB2777] text-white px-2.5 py-1 rounded-full mb-3">{c.period}</span>
                  <h3 className="font-heading tracking-wide text-2xl leading-tight mb-2">{c.title}</h3>
                  <p className="text-sm text-white/85 leading-relaxed">{c.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Ja loput. Vesa 15.9.2026 luki alavalikon ja huomasi katteettoman
            lupauksen: nelja marjaa ei ole "kaikki Suomen marjat". Arktiset
            Aromit ry:n oma virke sanoo noin 50 lajia, joista 37 syotavia
            (haettu 15.9.2026) — ja sivu sanoo sen nyt itse. */}
        <section id="other-berries" className="scroll-mt-24 bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">{t('berries.other.kicker')}</p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">{t('berries.other.headline')}</h2>
              <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">{t('berries.other.lead')}</p>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
              {other.map(o => (
                <li key={o.name} className="border-t-2 border-[#002F6C]/15 pt-4">
                  <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] leading-tight">{o.name}</h3>
                  <p className="text-xs italic text-[#002F6C]/70 mt-0.5">{o.latin}</p>
                  <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-vibe-pink mt-2">{o.when}</p>
                  <p className="text-sm text-[#002F6C]/80 leading-relaxed mt-2">{o.body}</p>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[#002F6C]/70 mt-8">{t('berries.other.note')}</p>
          </div>
        </section>

        {/* Suomikauppa: the pantry exit shared by every berry page. */}
        <div className="bg-white px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <SuomikauppaPicks variant="berries" />
          </div>
        </div>

        {/* Next steps */}
        <section className="bg-[#F8FAFC] py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">{t('berries.nextSteps.kicker')}</p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C]">{t('berries.nextSteps.headline')}</h2>
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
                const cls = 'group flex flex-col rounded-2xl bg-white border border-[#002F6C]/10 p-6 hover:border-vibe-pink/40 transition-colors';
                if (i === 0) return <Link key={s.title} to={to('/foraging-guide')} className={cls}>{inner}</Link>;
                if (i === 1) return <Link key={s.title} to={to('/traditional-recipes')} className={cls}>{inner}</Link>;
                return (
                  <AffiliateCTA key={s.title} partner="hotels" sid="berries_stay_rovaniemi" destination="Rovaniemi, Finland" className={cls}>
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
