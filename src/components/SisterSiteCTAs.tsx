import { useTranslation } from 'react-i18next'
import { trackHubClick } from '../lib/analytics'

/**
 * Outbound CTAs to the three nearest sister sites in the LV ecosystem.
 * laplandfood.com is the food-culture editor; readers ready to BOOK go to:
 *  - laplanddining.com (sit-down, table booking, fine dining)
 *  - laplandbars.com   (drink culture, breweries, ice bars)
 *  - laplandnightlife.com (evening + late dining)
 */
interface Sibling { title: string; eyebrow: string; body: string }

// DEEP pages that deliver each card's promise ("Book a table" / "Find a bar" /
// "After-dinner"), NOT the sibling homepage (Vesa 2026-07-08). Verified live 200.
const SIBLING_HREFS = [
  'https://laplanddining.com/restaurants/',
  'https://laplandbars.com/bars/',
  'https://laplandnightlife.com/nightclubs/',
]

// Generoitu tälle sivustolle 2026-08-10 (Vesa: "ei kuvia tässä osiossa?").
// 🔴 Omat kuvat, EI sisarsivustojen omia — verkoston sääntö: sama kuva ei saa
// esiintyä kahdella ekosysteemisivulla. Kukin kuvaa sitä mitä kortti lupaa:
// katettu pöytä / panimon tiski / tyhjä keikkalava.
const SIBLING_IMAGES = [
  '/images/sister-dining',
  '/images/sister-bars',
  '/images/sister-nightlife',
]

export default function SisterSiteCTAs() {
  const { t } = useTranslation('pages')
  const siblings = (t('sisters.items', { returnObjects: true }) as Sibling[]) || []

  return (
    <section className="bg-[#F8FAFC] py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            {t('sisters.kicker')}
          </p>
          <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-4">
            {t('sisters.headline')}
          </h2>
          <p className="text-base sm:text-lg text-[#002F6C]/70 max-w-2xl mx-auto">
            {t('sisters.subhead')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {siblings.map((s, i) => (
            <a
              key={SIBLING_HREFS[i]}
              href={SIBLING_HREFS[i]}
              target="_blank"
              rel="noopener"
              onClick={() => trackHubClick(s.eyebrow)}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[#002F6C]/10 hover:border-vibe-pink/40 hover:shadow-[0_8px_28px_rgba(0,47,108,0.08)] transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]">
                <picture>
                  <source type="image/avif" srcSet={`${SIBLING_IMAGES[i]}.avif`} />
                  <source type="image/webp" srcSet={`${SIBLING_IMAGES[i]}.webp`} />
                  <img
                    src={`${SIBLING_IMAGES[i]}.jpg`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    onError={e => { e.currentTarget.style.display = 'none' }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-vibe-pink text-xs font-semibold tracking-[0.18em] uppercase mb-3">
                  {s.eyebrow}
                </p>
                <h3 className="font-heading tracking-wide text-2xl sm:text-3xl text-[#002F6C] mb-3 group-hover:text-vibe-pink transition-colors">
                  {s.title}
                </h3>
                <p className="flex-1 text-sm text-[#002F6C]/70 leading-relaxed">{s.body}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-vibe-pink">
                  {t('sisters.visitLabel')} →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
