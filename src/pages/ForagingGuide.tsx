import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { AlertTriangle, MapPin, Calendar, Check, X } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import IntroPoints from '../components/IntroPoints';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import SuomikauppaPicks from '../components/SuomikauppaPicks';
import NordicbuddiesPicks from '../components/NordicbuddiesPicks';
import { useLocale } from '../i18n/useLocale';

interface ForageItem { name: string; season: string; difficulty: string; location: string; identification: string; tips: string; safety: string; sustainability: string }
interface CalendarItem { month: string; body: string }

const ITEM_IMAGES = [
  '/images/forage-bilberry.jpg',
  '/images/forage-lingonberry.jpg',
  '/images/forage-cloudberry.jpg',
  '/images/forage-mushrooms.jpg',
  '/images/forage-nettle.jpg',
];

export default function ForagingGuide() {
  const { t } = useTranslation('pages');
  const { to } = useLocale();
  const items = (t('foragingGuide.items', { returnObjects: true }) as ForageItem[]) || [];
  const rules = (t('foragingGuide.mushroomSafety.rules', { returnObjects: true }) as string[]) || [];
  const calendar = (t('foragingGuide.calendar.items', { returnObjects: true }) as CalendarItem[]) || [];
  const can = (t('foragingGuide.rights.can', { returnObjects: true }) as string[]) || [];
  const cannot = (t('foragingGuide.rights.cannot', { returnObjects: true }) as string[]) || [];

  return (
    <>
      <SEO titleKey="foragingGuide.title" descriptionKey="foragingGuide.description" path={'/foraging-guide'} />
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero
          eyebrow={t('foragingGuide.hero.eyebrow')}
          title={t('foragingGuide.hero.title')}
          titleHighlight={t('foragingGuide.hero.titleHighlight')}
          subtitle={t('foragingGuide.hero.subtitle')}
          imageUrl="/images/hero-foraging.jpg"
          imageAlt="Hand picking ripe cloudberries from a low Arctic bog, soft midnight-sun light from low on the horizon"
          primaryCta={{ label: t('foragingGuide.hero.primaryCta'), href: to('/food-tours') }}
          secondaryCta={{ label: t('foragingGuide.hero.secondaryCta'), href: to('/local-ingredients') }}
          pills={items.map(it => it.name)}
          pillHrefs={items.map((_, i) => `#forage-${i}`)}
        />

        <IntroPoints sectionKey="foragingGuide" />

        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-vibe-pink/5 border border-vibe-pink/30 p-6 sm:p-7 mb-10 flex gap-4">
              <AlertTriangle className="w-6 h-6 text-vibe-pink flex-shrink-0" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-vibe-pink mb-1.5">
                  {t('foragingGuide.alert.kicker')}
                </p>
                <p className="text-sm sm:text-base text-[#002F6C]/85 leading-relaxed">
                  {t('foragingGuide.alert.body')}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {items.map((it, i) => (
                <article key={it.name} id={`forage-${i}`} className="scroll-mt-24 flex flex-col rounded-2xl bg-white border border-[#002F6C]/10 hover:border-vibe-pink/40 hover:shadow-[0_10px_32px_rgba(0,47,108,0.08)] transition-all overflow-hidden">
                  <div className="relative h-60 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                    <img src={ITEM_IMAGES[i]} alt={it.name} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/5 via-[#002F6C]/15 to-[#002F6C]/70" />
                    <div className="absolute top-3 right-4">
                      <span className="text-[10px] uppercase tracking-[0.18em] font-semibold bg-vibe-pink text-white px-2.5 py-1 rounded-full">
                        {it.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-5 right-5">
                      <h2 className="font-heading tracking-wide text-xl text-white leading-tight">{it.name}</h2>
                      <p className="text-white/80 text-xs mt-0.5">{it.season}</p>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 text-sm">
                    <div className="mb-3">
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/75 mb-0.5 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-vibe-pink" /> {t('foragingGuide.labels.where')}
                      </p>
                      <p className="text-[#002F6C]/85 leading-snug">{it.location}</p>
                    </div>

                    <div className="mb-3">
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/75 mb-0.5">
                        {t('foragingGuide.labels.identify')}
                      </p>
                      <p className="text-[#002F6C]/85 leading-snug">{it.identification}</p>
                    </div>

                    <div className="mb-3">
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/75 mb-0.5 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-vibe-pink" /> {t('foragingGuide.labels.when')}
                      </p>
                      <p className="text-[#002F6C]/85 leading-snug">{it.tips}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-auto pt-3 border-t border-[#002F6C]/10 text-xs">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/75 mb-0.5">{t('foragingGuide.labels.safety')}</p>
                        <p className="text-[#002F6C]/80 leading-snug">{it.safety}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/75 mb-0.5">{t('foragingGuide.labels.sustainability')}</p>
                        <p className="text-[#002F6C]/80 leading-snug">{it.sustainability}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Mushroom safety */}
        {/* 🔴 Tämä oli sivun tärkein osio ja sen raskaslukuisin: yhdeksän
            kappaletta ja viisi sääntöä yhtenä 768 px:n pylväänä (Vesa
            2026-08-10: "tosi pitkä ja tylsä luettava vaikka tärkeä aihe").
            Turvallisuustekstiä ei lyhennetä — se järjestellään niin että sen
            voi myös silmäillä: varoitus omana palstanaan, viisi sääntöä
            numeroituina kortteina rinnalle, aloittelijan lajit erilleen. */}
        <section className="bg-[#F8FAFC] py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('foragingGuide.mushroomSafety.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C]">
                {t('foragingGuide.mushroomSafety.headline')}
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Vasen: miksi tämä on vakavaa. */}
              <div className="text-[#002F6C]/85">
                <p className="text-lg leading-relaxed mb-5 text-[#002F6C]">
                  <Trans i18nKey="foragingGuide.mushroomSafety.p1" ns="pages" components={{ em: <em /> }} />
                </p>
                <div className="rounded-2xl border-l-4 border-vibe-pink bg-white p-5 sm:p-6">
                  <AlertTriangle className="w-5 h-5 text-vibe-pink mb-2.5" aria-hidden="true" />
                  <p className="leading-relaxed text-sm sm:text-base">
                    <Trans i18nKey="foragingGuide.mushroomSafety.p2" ns="pages" components={{ strong: <strong /> }} />
                  </p>
                </div>
              </div>

              {/* Oikea: mitä teet. Numerot kortteina, ei sisennettynä listana —
                  säännön löytää uudestaan ilman että lukee koko osion. */}
              <div>
                <p className="leading-relaxed text-[#002F6C]/85 mb-5">
                  <Trans i18nKey="foragingGuide.mushroomSafety.rulesIntro" ns="pages" components={{ strong: <strong /> }} />
                </p>
                <ol className="space-y-3">
                  {rules.map((r, i) => (
                    <li key={i} className="flex gap-4 rounded-2xl bg-white border border-[#002F6C]/10 p-4 sm:p-5">
                      <span className="font-heading tracking-wide text-2xl text-vibe-pink leading-none shrink-0 w-7">
                        {i + 1}
                      </span>
                      <span className="text-sm sm:text-base leading-relaxed text-[#002F6C]/85">
                        <Trans i18nKey="" ns="pages" defaults={r} components={{ em: <em /> }} />
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Aloittelijan lajit + Lapin-huomio omalle riville, kahteen
                palstaan — nämä ovat eri kysymys kuin säännöt. */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-10 text-[#002F6C]/85">
              <p className="leading-relaxed">
                <Trans i18nKey="foragingGuide.mushroomSafety.p4" ns="pages" components={{ em: <em />, strong: <strong /> }} />
              </p>
              <p className="leading-relaxed">{t('foragingGuide.mushroomSafety.p5')}</p>
            </div>
          </div>
        </section>

        {/* Seasonal calendar */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('foragingGuide.calendar.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">
                {t('foragingGuide.calendar.headline')}
              </h2>
              <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">
                {t('foragingGuide.calendar.lead')}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {calendar.map(m => (
                <div key={m.month} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6">
                  <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-3">{m.month}</h3>
                  <p className="text-sm text-[#002F6C]/80 leading-relaxed">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Everyman's right detail */}
        {/* 🔴 Saat / Et saa oli kaksi peräkkäistä luettelomerkkilistaa yhdessä
            768 px:n pylväässä — lukijan piti muistaa kummassa listassa on
            kummalla puolella (Vesa 2026-08-10). Nämä ovat toistensa vastapari,
            joten ne kuuluvat vierekkäin: vihreä ✓ vasemmalla, pinkki ✕
            oikealla, sama rivikorkeus. Sisältö on sanasta sanaan sama. */}
        <section className="bg-[#002F6C] py-16 sm:py-20 text-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                {t('foragingGuide.rights.kicker')}
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl">
                {t('foragingGuide.rights.headline')}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5 lg:gap-7 items-start">
              <div className="rounded-2xl bg-white/5 border border-white/15 p-6 sm:p-7">
                <h3 className="font-heading tracking-wide text-2xl text-[#10B981] mb-4">
                  {t('foragingGuide.rights.canHeadline')}
                </h3>
                <ul className="space-y-3">
                  {can.map((line, i) => (
                    <li key={i} className="flex gap-3 text-sm sm:text-base leading-relaxed text-white/85">
                      <Check className="w-4 h-4 mt-1 shrink-0 text-[#10B981]" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/15 p-6 sm:p-7">
                <h3 className="font-heading tracking-wide text-2xl text-vibe-pink mb-4">
                  {t('foragingGuide.rights.cannotHeadline')}
                </h3>
                <ul className="space-y-3">
                  {cannot.map((line, i) => (
                    <li key={i} className="flex gap-3 text-sm sm:text-base leading-relaxed text-white/85">
                      <X className="w-4 h-4 mt-1 shrink-0 text-vibe-pink" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="max-w-3xl mt-8 leading-relaxed text-white/85">
              {t('foragingGuide.rights.closing')}
            </p>
          </div>
        </section>

        {/* Nordicbuddies (Daisycon 20538) — termospullo ja muki, ei ruokaa.
            Sijoitettu jokamiehenoikeus-osion JÄLKEEN, koska siinä lukija on juuri
            lukenut olevansa suolla tuntikausia. Sivun lopun Suomikauppa-kortti
            vastaa eri kysymykseen (marjat hillona jos et pääse suolle), joten
            kortit eivät ole päällekkäisiä eivätkä vierekkäin.
            🔴 Peppi, ei Muumeja: moomin_note, _affiliate/creatives.json. */}
        <div className="bg-white px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <NordicbuddiesPicks />
          </div>
        </div>

        {/* Guide CTA */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-5">
              {t('foragingGuide.guideCta.headline')}
            </h2>
            <p className="text-base text-[#002F6C]/75 mb-7">
              {t('foragingGuide.guideCta.lead')}
            </p>
            <Link to={to('/food-tours')} className="inline-flex items-center justify-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
              {t('foragingGuide.guideCta.cta')}
            </Link>
          </div>
        </section>

        {/* Suomikauppa-tuotenostot (Daisycon) sivun LOPUSSA, uutiskirjeen
            edella — sama paikka ja logiikka kuin FinnishPantryAd:lla Local
            ingredients -sivulla. Opas kertoo mustikasta, puolukasta ja
            hillasta suolla; kortti vastaa kysymykseen jonka sivu jattaa auki
            (entä jos en pääse suolle): samat marjat hillona ja
            pakastekuivattuna, dest-syvälinkit tuotesivuille. */}
        <div className="bg-[#F8FAFC] px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <SuomikauppaPicks variant="berries" />
          </div>
        </div>

        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
}
