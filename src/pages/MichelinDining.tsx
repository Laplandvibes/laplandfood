import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Award, Sparkles, ChefHat, Star, Wine, Clock, Users, Leaf, MapPin, ArrowUpRight } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import AffiliateCTA from '../components/AffiliateCTA';
import { useLocale } from '../i18n/useLocale';

/**
 * Michelin ja fine dining — kirjoitettu uusiksi 16.9.2026 (Vesa).
 *
 * 🔴🔴 MITÄ SIVULLA OLI VIKANA. Vesa luki sivun ja kysyi kolme asiaa: *"mitä nuo
 * euron merkit ovat? google arvostelut voisivat olla aidotkin? … mikä helvetin
 * viinipari. mitä tämä osio yrittää tehdä ja onnistuuko?"* Vastaus mitattuna:
 *
 * 1. Sivu lainasi Michelinin auktoriteettia. Hintaluokat €/€€/€€€/€€€€ olivat
 *    MEIDÄN keksimämme — sivu myönsi sen itse keskellä kappaletta — ja ne olivat
 *    myös vääriä: Nili oli merkitty €€€ = 80–140 €/hlö, kun ravintolan oma sivu
 *    myi 16.9.2026 neljän ruokalajin menua 45 €:lla. Michelin käyttää täsmälleen
 *    samaa merkintätapaa, joten olimme ottaneet heidän asteikkonsa ulkoasun ja
 *    täyttäneet sen arvauksilla. Siksi sivu tarvitsi alaviitteen "ei yhteyksiä
 *    Michelin-oppaaseen": se näytti siltä että se olisi opas.
 * 2. Helsingin seitsemän korttia olivat sivun suurin lohko, 800 km väärässä
 *    paikassa, meidän piirtämillämme ★-merkeillä ja AI-kuvilla ravintoloista
 *    joissa emme ole käyneet. Nyt lyhyt rehellinen lohko + linkki oppaaseen.
 * 3. 🔴🔴 Lapin korteissa oli AI-kuva `alt="Ravintola Nili"` — eli tekaistu kuva
 *    oikean yrityksen salista. Se on sama sääntö kuin kumppanin tuotteella:
 *    tietystä oikeasta kohteesta ei esitetä keksittyä kuvaa. Gradientti on
 *    rehellisempi kuin väärä kuva, joten kuvat poistettiin kunnes on oma.
 * 4. Yleinen kahdeksan ruokalajin tasting menu -läpikäynti poistettiin
 *    kokonaan: se ei kuvannut yhtäkään oikeaa ravintolaa.
 *
 * 🟢 Tilalle: Googlen oikeat käyttäjäarviot omasta viikkotilannekuvastamme
 * (`openhours.json`, mitattu 11.9.2026 — jo maksettu, ei uutta rajapintakulua)
 * ja ravintoloiden omilta sivuilta tarkistetut aukioloajat.
 *
 * Rima on Tietoa-sivulta: ystävän pitäisi pystyä lukemaan tämä ja varaamaan pöytä.
 */

interface Point { title: string; body: string }
interface LaplandRoom {
  name: string; city: string; address: string; angle: string;
  order: string; hours: string; booking: string;
  /** Googlen käyttäjäarvio omasta tilannekuvastamme — tyhjä jos paikkaa ei ole siinä. */
  rating: string; ratingCount: string;
}
interface Note { label: string; body: string }

const POINT_ICONS = [Award, Sparkles, ChefHat];
const NOTE_ICONS = [Clock, Wine, Leaf, Users];
const LAPLAND_SIDS = ['rovaniemi', 'inari', 'arctic_treehouse'];
const MICHELIN_URL = 'https://guide.michelin.com/en/fi/restaurants';

export default function MichelinDining() {
  const { t } = useTranslation('pages');
  const { to } = useLocale();
  const points = (t('michelinDining.answer.points', { returnObjects: true }) as Point[]) || [];
  const laplandRooms = (t('michelinDining.lapland.rooms', { returnObjects: true }) as LaplandRoom[]) || [];
  const notes = (t('michelinDining.before.items', { returnObjects: true }) as Note[]) || [];

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
          primaryCta={{ label: t('michelinDining.hero.primaryCta'), href: `${to('/michelin-dining')}#lapland` }}
          secondaryCta={{ label: t('michelinDining.hero.secondaryCta'), href: `${to('/michelin-dining')}#helsinki` }}
          pills={laplandRooms.map(r => r.name)}
          pillHrefs={laplandRooms.map((_, i) => `#lapland-room-${i}`)}
        />

        {/* Suora vastaus: Lapissa ei ole tähtiä */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('michelinDining.answer.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">
                {t('michelinDining.answer.headline')}
              </h2>
              <p className="text-base sm:text-lg text-[#002F6C]/75 leading-relaxed">
                {t('michelinDining.answer.leadPrefix')}{' '}
                <a href={MICHELIN_URL} target="_blank" rel="noopener" className="text-vibe-pink underline-offset-4 hover:underline">
                  guide.michelin.com
                </a>
                {t('michelinDining.answer.leadSuffix')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {points.map((p, i) => {
                const Icon = POINT_ICONS[i];
                return (
                  <div key={p.title} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6">
                    {Icon && <Icon className="w-6 h-6 text-vibe-pink mb-3" />}
                    <h3 className="font-heading tracking-wide text-xl text-[#002F6C] mb-2">{p.title}</h3>
                    <p className="text-sm text-[#002F6C]/75 leading-relaxed">{p.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lapin kolme salia — sivun ydin, siksi ennen Helsinkiä */}
        <section id="lapland" className="bg-[#002F6C] py-16 sm:py-20 text-white">
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
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {laplandRooms.map((r, i) => {
                const cityName = r.city.split('·')[0].trim();
                return (
                  <article key={r.name} id={`lapland-room-${i}`} className="scroll-mt-24 flex flex-col rounded-2xl bg-white/5 border border-white/15 overflow-hidden hover:border-vibe-pink/40 transition-all">
                    {/* 🔴 Ei kuvaa: tässä oli AI-kuva oikean ravintolan salista. Kunnes
                        omaa valokuvaa on, otsikkolaatta on gradientti. */}
                    <div className="relative bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] px-6 pt-6 pb-5">
                      <span className="text-[10px] uppercase tracking-[0.18em] font-semibold bg-vibe-pink text-white px-2.5 py-1 rounded-full">
                        {r.city}
                      </span>
                      <h3 className="font-heading tracking-wide text-2xl text-white leading-tight mt-3">{r.name}</h3>
                      {r.rating && (
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-white/90">
                          <Star className="w-4 h-4 text-vibe-pink fill-vibe-pink" aria-hidden="true" />
                          <span className="font-semibold">{r.rating}</span>
                          <span className="text-white/70 text-xs">
                            {t('michelinDining.lapland.labels.rating')} · {r.ratingCount}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-xs text-white/65 mb-3 flex items-start gap-1.5">
                        <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" aria-hidden="true" /> {r.address}
                      </p>
                      <p className="text-sm text-white/85 leading-relaxed mb-4">{r.angle}</p>

                      <dl className="space-y-2 text-xs mb-4">
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
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Helsinki: lyhyt ja rehellinen, ei meidan arvioita */}
        <section id="helsinki" className="bg-[#F8FAFC] py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              {t('michelinDining.helsinki.kicker')}
            </p>
            <h2 className="font-heading tracking-wide text-3xl sm:text-4xl md:text-5xl text-[#002F6C] mb-5">
              {t('michelinDining.helsinki.headline')}
            </h2>
            <p className="text-base text-[#002F6C]/75 leading-relaxed mb-4">
              {t('michelinDining.helsinki.lead')}
            </p>
            <p className="text-base text-[#002F6C]/75 leading-relaxed mb-7">
              {t('michelinDining.helsinki.note')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={MICHELIN_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-1.5 min-h-11 border border-[#002F6C]/25 text-[#002F6C] hover:bg-[#002F6C]/5 font-semibold px-6 rounded-full transition-colors text-sm"
              >
                {t('michelinDining.helsinki.linkLabel')}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <AffiliateCTA partner="hotels" sid="michelin_helsinki" destination="Helsinki, Finland" className="inline-flex items-center justify-center min-h-11 bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-6 rounded-full transition-colors text-sm">
                {t('michelinDining.helsinki.ctaHotels')}
              </AffiliateCTA>
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

        {/* Lahderivi: mista luvut ovat ja milloin mitattu */}
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
