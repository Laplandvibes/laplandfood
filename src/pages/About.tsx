import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { useLocale } from '../i18n/useLocale';

interface CoverItem { t: string; body: string; href: string }
interface PrincipleItem { t: string; body: string }

// Same card art as the Home pillar grid, keyed by href so the mapping cannot
// drift when the localized cover array order changes.
const COVER_IMAGES: Record<string, string> = {
  '/local-ingredients': '/images/card-ingredients.jpg',
  '/traditional-recipes': '/images/card-recipes.jpg',
  '/modern-lapland': '/images/card-modern.jpg',
  '/foraging-guide': '/images/card-foraging.jpg',
  '/michelin-dining': '/images/card-michelin.jpg',
  '/food-tours': '/images/card-tours.jpg',
};

export default function About() {
  const { t } = useTranslation('pages');
  const { to } = useLocale();
  const cover = (t('about.cover.items', { returnObjects: true }) as CoverItem[]) || [];
  const principles = (t('about.principles.items', { returnObjects: true }) as PrincipleItem[]) || [];

  return (
    <>
      <SEO titleKey="about.title" descriptionKey="about.description" path={'/about'} />
      <div className="min-h-screen bg-white">
        <Nav />

        <section className="relative pt-24 overflow-hidden bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] text-white">
          <img
            src="/images/hero-about.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#001F4A]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001F4A]/50 to-transparent" />
          <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-16 text-center lg:text-left">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3 drop-shadow-[0_2px_12px_rgba(0,15,40,0.9)]">
              {t('about.hero.kicker')}
            </p>
            <h1 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl mb-5 leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,15,40,0.85)]">
              {t('about.hero.headline')}
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,15,40,0.85)]">
              {t('about.hero.lead')}
            </p>
          </div>
        </section>
        <PageBreadcrumb />

        {/* Why this site exists */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-5">
              {t('about.why.headline')}
            </h2>
            <div className="prose prose-lg max-w-none text-[#002F6C]/85">
              <p className="leading-relaxed mb-5">{t('about.why.p1')}</p>
              <p className="leading-relaxed">
                <Trans i18nKey="about.why.p3" ns="pages" components={{ strong: <strong /> }} />
              </p>
            </div>
          </div>
        </section>

        {/* What we cover */}
        <section className="bg-[#F8FAFC] py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-3">
              {t('about.cover.headline')}
            </h2>
            <p className="text-base text-[#002F6C]/75 mb-10 max-w-2xl">
              {t('about.cover.lead')}
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {cover.map(c => (
                <Link key={c.href} to={to(c.href)} className="group rounded-2xl bg-white border border-[#002F6C]/10 hover:border-vibe-pink/40 hover:shadow-[0_8px_28px_rgba(0,47,108,0.08)] overflow-hidden transition-all">
                  {COVER_IMAGES[c.href] && (
                    <div className="relative h-36 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                      <img src={COVER_IMAGES[c.href]} alt="" aria-hidden="true" loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,31,74,0.55) 0%, rgba(0,31,74,0.05) 60%)' }} />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] group-hover:text-vibe-pink transition-colors mb-2">
                      {c.t}
                    </h3>
                    <p className="text-sm text-[#002F6C]/75 leading-relaxed">{c.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial principles */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-3">
              {t('about.principles.headline')}
            </h2>
            <p className="text-base text-[#002F6C]/75 mb-8">
              {t('about.principles.lead')}
            </p>
            <div className="space-y-6">
              {principles.map(p => (
                <div key={p.t} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6 sm:p-7">
                  <h3 className="font-heading tracking-wide text-xl text-[#002F6C] mb-2">{p.t}</h3>
                  <p className="text-sm sm:text-base text-[#002F6C]/80 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Network */}
        <section className="bg-[#002F6C] py-16 sm:py-20 text-white">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              {t('about.network.kicker')}
            </p>
            <h2 className="font-heading tracking-wide text-3xl sm:text-4xl mb-5">
              {t('about.network.headline')}
            </h2>
            <p className="text-base text-white/85 leading-relaxed mb-7">
              {t('about.network.lead')}
            </p>
            <div className="space-y-4 mb-7">
              <div className="rounded-xl bg-white/5 border border-white/15 p-5">
                <a href="https://laplanddining.com" target="_blank" rel="noopener" className="text-vibe-pink font-semibold text-lg hover:underline">
                  laplanddining.com →
                </a>
                <p className="text-sm text-white/80 leading-relaxed mt-1">
                  <Trans i18nKey="about.network.diningBody" ns="pages" components={{ em: <em /> }} />
                </p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/15 p-5">
                <a href="https://laplandbars.com" target="_blank" rel="noopener" className="text-vibe-pink font-semibold text-lg hover:underline">
                  laplandbars.com →
                </a>
                <p className="text-sm text-white/80 leading-relaxed mt-1">
                  {t('about.network.barsBody')}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/15 p-5">
                <a href="https://laplandnightlife.com" target="_blank" rel="noopener" className="text-vibe-pink font-semibold text-lg hover:underline">
                  laplandnightlife.com →
                </a>
                <p className="text-sm text-white/80 leading-relaxed mt-1">
                  {t('about.network.nightlifeBody')}
                </p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {t('about.network.footnote')}
            </p>
          </div>
        </section>

        {/* Get in touch */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-5">
              {t('about.contact.headline')}
            </h2>
            <div className="prose prose-lg max-w-none text-[#002F6C]/85">
              <p className="leading-relaxed mb-4">
                {t('about.contact.p1Prefix')}{' '}
                <a className="text-vibe-pink underline-offset-4 hover:underline" href="mailto:info@laplandvibes.com">
                  info@laplandvibes.com
                </a>
                {t('about.contact.p1Suffix')}
              </p>
              <p className="leading-relaxed mb-4">
                <Trans i18nKey="about.contact.p2" ns="pages" components={{ strong: <strong /> }} />
              </p>
              <p className="leading-relaxed">
                {t('about.contact.p3Prefix')}{' '}
                <Link to={to('/privacy')} className="text-vibe-pink underline-offset-4 hover:underline">{t('about.contact.privacyLabel')}</Link>,{' '}
                <Link to={to('/terms')} className="text-vibe-pink underline-offset-4 hover:underline">{t('about.contact.termsLabel')}</Link>,{' '}
                <Link to={to('/cookie-policy')} className="text-vibe-pink underline-offset-4 hover:underline">{t('about.contact.cookieLabel')}</Link>.
              </p>
            </div>
          </div>
        </section>

        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
}
