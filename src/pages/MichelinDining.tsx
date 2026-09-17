import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, Wine, Clock, Users, Leaf, MapPin, ArrowUpRight } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import AffiliateCTA from '../components/AffiliateCTA';
import StarMap from '../components/StarMap';
import { useLocale } from '../i18n/useLocale';

/**
 * Michelin ja fine dining — Suomen tähtilista 2026 + Lapin kolme salia.
 *
 * 🔴🔴 17.9.2026 (Vesa): edellisen päivän uudelleenkirjoitus poisti Helsingin
 * tähtiravintolat kokonaan ja otsikoi sivun "Lapissa ei ole yhtään tähteä" ja
 * "emmekä ole syöneet niissä". Vesa: *"olisihan siellä voinut pitää ne suomen
 * michelin ravintolat? miksi ne piti poistaa kokonaan?"* ja *"emme ole käyneet
 * niissä? ketä vittua tällänen kiinnostaa?"* Hän oli oikeassa kummassakin:
 *
 * 1. Lista on julkinen fakta (Pohjoismaiden opas 2026, julkistettu 1.6.2026),
 *    ja Michelinin nimen käyttö sen lähteenä on viittaavaa käyttöä. 16.9. oikeat
 *    viat olivat KEKSITTY hinta-asteikko €–€€€€ ja AI-kuvat oikeista saleista —
 *    ne pysyvät poissa. Lista itse ei ollut vika.
 * 2. Otsikko kertoo mitä sivulla ON (Suomen tähdet + Lapin salit), ei mitä
 *    siellä ei ole. Sama sääntö kuin marjasivulla 15.9. ("heivaa vittun tuo neljä").
 * 3. Toimituksen omat kokemukset eivät ole lukijan asia. Korttien faktat ovat
 *    oppaan ja ravintoloiden omia (tähtivuodet, keittiömestarit), ei arvioita.
 *
 * 🔴 17.9. ilta (Vesa: *"eikö nämä ole aika tylsän näköiset?"*): 11 samanlaista
 * sinistä gradienttilaatikkoa oli juuri se templaten paneeli, jonka 11.9. sääntö
 * kieltää. Kuvia ei silti tule: tekoälykuva oikean ravintolan salista on väärä
 * väite, eikä omia tai lisensoituja kuvia näistä saleista ole. Tilalle aitoa
 * ainetta: Suomen kartta (StarMap), jossa tähtikaupungit ja Lapin salit ovat
 * samalla siluetilla 800 km:n päässä toisistaan — sivun ydinväite yhtenä kuvana —
 * ja kortit, joiden visuaali on itse tähti (iso pinkki ★/★★ Bebasilla), ei
 * gradienttiotsake. Kortissa ei ole hintaluokkaa, katuosoitetta eikä kuvaa:
 * hintaa emme voi todentaa, osoitteet muuttuvat (Demo muutti 2025) ja ravintolan
 * salista ei esitetä generoitua kuvaa.
 *
 * Lapin kolme salia: Googlen arviot viikkotilannekuvasta
 * (`scripts/update-restaurant-ratings.mjs`), aukiolot ravintoloiden sivuilta 16.9.2026.
 */

interface StarRoom { name: string; city: string; stars: string; angle: string }
interface LaplandRoom {
  name: string; city: string; address: string; angle: string;
  order: string; hours: string; booking: string;
  /** Googlen käyttäjäarvio omasta tilannekuvastamme — tyhjä jos paikkaa ei ole siinä. */
  rating: string; ratingCount: string;
}
interface Note { label: string; body: string }
interface MapCopy { legendStars: string; caption: string; aria: string }

const NOTE_ICONS = [Clock, Wine, Leaf, Users];
const LAPLAND_SIDS = ['rovaniemi', 'inari', 'arctic_treehouse'];
// Suomen valikoima englanniksi: sama maa/kieli-polku kuin oppaan omissa artikkeli- ja
// ravintolaosoitteissa (guide.michelin.com/fi/en/…). Vanha /en/fi/ oli päätelty, ei luettu.
const MICHELIN_URL = 'https://guide.michelin.com/fi/en/restaurants';
/** Tähtikortin indeksi → kartan kaupunki. Kortit 0–5 ovat Helsingissä, 6 Turussa, 7 Porvoossa. */
const STAR_CITY_SLUG = ['helsinki', 'helsinki', 'helsinki', 'helsinki', 'helsinki', 'helsinki', 'turku', 'porvoo'];
/** Lapin salien indeksi → kartan kaupunki (Nili Rovaniemi, Aanaar Inari, Rakas Rovaniemi). */
const ROOM_CITY_SLUG = ['rovaniemi', 'inari', 'rovaniemi'];

function countPins(rows: { city: string }[], slugs: string[]) {
  const out: { slug: string; label: string; count: number }[] = [];
  rows.forEach((r, i) => {
    const slug = slugs[i];
    if (!slug) return;
    const label = r.city.split('·')[0].trim();
    const hit = out.find((p) => p.slug === slug);
    if (hit) hit.count += 1;
    else out.push({ slug, label, count: 1 });
  });
  return out;
}

export default function MichelinDining() {
  const { t } = useTranslation('pages');
  const { to } = useLocale();
  const starRooms = (t('michelinDining.michelin.rooms', { returnObjects: true }) as StarRoom[]) || [];
  const laplandRooms = (t('michelinDining.lapland.rooms', { returnObjects: true }) as LaplandRoom[]) || [];
  const notes = (t('michelinDining.before.items', { returnObjects: true }) as Note[]) || [];
  const mapCopy = (t('michelinDining.michelin.map', { returnObjects: true }) as MapCopy) || ({} as MapCopy);

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
          primaryCta={{ label: t('michelinDining.hero.primaryCta'), href: `${to('/michelin-dining')}#michelin` }}
          secondaryCta={{ label: t('michelinDining.hero.secondaryCta'), href: `${to('/michelin-dining')}#lapland` }}
          pills={laplandRooms.map(r => r.name)}
          pillHrefs={laplandRooms.map((_, i) => `#lapland-room-${i}`)}
        />

        {/* Suomen tähtilista 2026 — sivun lupaus, siksi ensimmäisenä */}
        <section id="michelin" className="scroll-mt-16 bg-[#F8FAFC] py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center mb-12">
              <div className="lg:col-span-3 max-w-2xl">
                <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                  {t('michelinDining.michelin.kicker')}
                </p>
                <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">
                  {t('michelinDining.michelin.headline')}
                </h2>
                <p className="text-base sm:text-lg text-[#002F6C]/75 leading-relaxed">
                  {t('michelinDining.michelin.lead')}
                </p>
              </div>
              <div className="lg:col-span-2">
                <StarMap
                  stars={countPins(starRooms, STAR_CITY_SLUG)}
                  rooms={countPins(laplandRooms, ROOM_CITY_SLUG)}
                  legendStars={mapCopy.legendStars}
                  legendRooms={t('michelinDining.lapland.kicker')}
                  caption={mapCopy.caption}
                  ariaLabel={mapCopy.aria}
                  distance="800 km"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {starRooms.map((r) => {
                const glyphs = (r.stars.match(/★/g) || []).join('');
                const year = r.stars.replace(/★/g, '').trim();
                const two = glyphs.length >= 2;
                const starsLabel = t(two ? 'michelinDining.michelin.labels.twoStars' : 'michelinDining.michelin.labels.oneStar');
                return (
                  <article key={r.name} className="flex gap-5 rounded-2xl bg-white border border-[#002F6C]/10 p-5 sm:p-6">
                    {/* Kortin visuaali on itse tähti — ei gradienttiotsake, ei kuva (ks. tiedoston alku). */}
                    <div className="flex-shrink-0 w-16 text-center pt-0.5">
                      <span role="img" aria-label={starsLabel} title={starsLabel} className="block font-heading text-4xl leading-none text-vibe-pink tracking-tight">
                        {glyphs}
                      </span>
                      <span className="block mt-1.5 text-[11px] font-bold tracking-wider text-[#002F6C]/60">{year}</span>
                    </div>
                    <div className="min-w-0">
                      {/* 3xl vasta lg:ssä: 640 px:ssä kortti on 288 px ja "Finnjävel Salonki" katkesi 30 px:llä (mitattu). */}
                      <h3 className="font-heading tracking-wide text-2xl lg:text-3xl text-[#002F6C] leading-none">{r.name}</h3>
                      <p className="mt-1.5 flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-[#002F6C]/60">
                        <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" /> {r.city}
                      </p>
                      <p className="mt-3 text-sm text-[#002F6C]/75 leading-relaxed">{r.angle}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-4 rounded-2xl bg-white border border-[#002F6C]/10 p-5 sm:p-6 sm:flex sm:items-baseline sm:gap-6">
              <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] leading-none sm:w-56 sm:flex-shrink-0 mb-2 sm:mb-0">
                {t('michelinDining.michelin.bibLabel')}
              </h3>
              <p className="text-sm text-[#002F6C]/75 leading-relaxed">{t('michelinDining.michelin.bibBody')}</p>
            </div>

            <p className="mt-8 max-w-3xl text-base text-[#002F6C]/75 leading-relaxed">
              {t('michelinDining.michelin.note')}
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href={MICHELIN_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-1.5 min-h-11 border border-[#002F6C]/25 text-[#002F6C] hover:bg-[#002F6C]/5 font-semibold px-6 rounded-full transition-colors text-sm"
              >
                {t('michelinDining.michelin.linkLabel')}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <AffiliateCTA partner="hotels" sid="michelin_helsinki" destination="Helsinki, Finland" className="inline-flex items-center justify-center min-h-11 bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-6 rounded-full transition-colors text-sm">
                {t('michelinDining.michelin.ctaHotels')}
              </AffiliateCTA>
            </div>
          </div>
        </section>

        {/* Lapin kolme salia — sivun toinen puoli */}
        <section id="lapland" className="scroll-mt-16 bg-[#002F6C] py-16 sm:py-20 text-white">
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
              <p className="text-base text-white/80 mt-3">
                {t('michelinDining.lapland.booking')}
              </p>
            </div>

            {/* 🔴 Kolme saraketta vasta lg:stä (1024). `md:grid-cols-3` antoi 768 px:ssä
                227 px leveät kortit, otsikot 2–3 rivillä ja 703 px korkean kortin
                (mitattu 17.9.2026, Vesa: "ei ole optimoitu ollenkaan tablet näkymässä").
                Tabletilla kortti on yksin koko leveydellä ja jakaa sisältönsä kahteen
                palstaan OMAN leveytensä mukaan (@container, @xl = 576 px) — viewportin
                breakpoint ei erota 700 px:n tablettikorttia 390 px:n työpöytäsarakkeesta. */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {laplandRooms.map((r, i) => {
                const cityName = r.city.split('·')[0].trim();
                return (
                  <article key={r.name} id={`lapland-room-${i}`} className="@container scroll-mt-24 rounded-2xl bg-white/5 border border-white/15 p-6 hover:border-vibe-pink/40 transition-colors">
                    {/* 🔴 Ei kuvaa: tässä oli AI-kuva oikean ravintolan salista. Kortti on
                        yksi tasainen pinta, ei gradienttiotsaketta (Vesa 17.9.: "tylsän näköiset"). */}
                    {/* @xl = 36 rem = 576 px kortin OMAA leveyttä: 768 px:n tabletissa kortin
                        sisältö on 672 px (raja @2xl:lle, ei aina ylity), 640 px:n ruudussa 544. */}
                    <div className="grid gap-4 @xl:grid-cols-[minmax(0,1fr)_17rem] @xl:gap-x-10">
                      <div className="min-w-0">
                        <span className="inline-block text-[10px] uppercase tracking-[0.18em] font-semibold bg-vibe-pink text-white px-2.5 py-1 rounded-full">
                          {r.city}
                        </span>
                        <h3 className="font-heading tracking-wide text-3xl text-white leading-none mt-4">{r.name}</h3>
                        {r.rating && (
                          <p className="mt-2 flex flex-wrap items-center gap-x-1.5 text-sm text-white/90">
                            <Star className="w-4 h-4 text-vibe-pink fill-vibe-pink" aria-hidden="true" />
                            <span className="font-semibold">{r.rating}</span>
                            <span className="text-white/70 text-xs">
                              {t('michelinDining.lapland.labels.rating')} · {r.ratingCount}
                            </span>
                          </p>
                        )}
                        <p className="text-xs text-white/65 mt-3 mb-3 flex items-start gap-1.5">
                          <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" aria-hidden="true" /> {r.address}
                        </p>
                        <p className="text-sm text-white/85 leading-relaxed">{r.angle}</p>
                      </div>

                      <div className="flex flex-col min-w-0">
                        <dl className="space-y-2 text-xs mb-5">
                          {([['order', r.order], ['hours', r.hours], ['booking', r.booking]] as const).map(([key, value]) => (
                            <div key={key}>
                              <dt className="text-[10px] uppercase tracking-wider font-semibold text-white/80 mb-0.5">
                                {t(`michelinDining.lapland.labels.${key}`)}
                              </dt>
                              <dd className="text-white/80 leading-snug m-0">{value}</dd>
                            </div>
                          ))}
                        </dl>

                        <AffiliateCTA partner="hotels" sid={`lapland_room_${LAPLAND_SIDS[i]}`} destination={cityName + ', Finland'} className="mt-auto block w-full text-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm">
                          {t('michelinDining.lapland.labels.hotelsNearPrefix')} {cityName}
                        </AffiliateCTA>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ennen kuin varaat */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 className="font-heading tracking-wide text-3xl sm:text-4xl md:text-5xl text-[#002F6C] mb-3 text-center">
              {t('michelinDining.before.headline')}
            </h2>
            <p className="text-base text-[#002F6C]/75 text-center max-w-2xl mx-auto mb-10">
              {t('michelinDining.before.lead')}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {notes.map((n, i) => {
                const Icon = NOTE_ICONS[i];
                return (
                  <div key={n.label} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6">
                    {Icon && <Icon className="w-6 h-6 text-vibe-pink mb-3" />}
                    <h3 className="font-heading tracking-wide text-xl text-[#002F6C] mb-2">{n.label}</h3>
                    <p className="text-sm text-[#002F6C]/75 leading-relaxed">{n.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Yövy lähellä */}
        <section id="stay" className="bg-[#F8FAFC] py-16">
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
            <p className="text-sm text-[#002F6C]/75">
              {t('michelinDining.stayNear.tourPrefix')}{' '}
              <Link to={to('/food-tours')} className="text-vibe-pink underline-offset-4 hover:underline">
                {t('michelinDining.stayNear.tourLabel')}
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Lähderivi: mistä tähdet, luvut ja päivämäärät ovat */}
        <section className="bg-white pb-14">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="text-xs text-[#002F6C]/70 leading-relaxed border-t border-[#002F6C]/10 pt-6">
              {t('michelinDining.sources')}
            </p>
          </div>
        </section>

        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
}
