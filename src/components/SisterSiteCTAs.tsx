import { trackHubClick } from '../lib/analytics'

/**
 * Outbound CTAs to the three nearest sister sites in the LV ecosystem.
 * laplandfood.com is the food-culture editor; readers ready to BOOK go to:
 *  - laplanddining.com (sit-down, table booking, fine dining)
 *  - laplandbars.com   (drink culture, breweries, ice bars)
 *  - laplandnightlife.com (evening + late dining)
 */
const siblings = [
  {
    title: 'Book a table',
    eyebrow: 'LaplandDining',
    body: 'Where to actually eat: 60+ vetted restaurants across Lapland with menus, hours, and direct booking links.',
    href: 'https://laplanddining.com',
  },
  {
    title: 'Find a bar or brewery',
    eyebrow: 'LaplandBars',
    body: 'Craft breweries, ice bars, hotel bars, and the local pubs where Finns actually drink — with what they pour and when they open.',
    href: 'https://laplandbars.com',
  },
  {
    title: 'After-dinner Lapland',
    eyebrow: 'LaplandNightlife',
    body: 'DJs, late kitchens, live-music venues, the polar-night party calendar — what to do once the kitchen closes.',
    href: 'https://laplandnightlife.com',
  },
]

export default function SisterSiteCTAs() {
  return (
    <section className="bg-[#F8FAFC] py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            When you’re hungry
          </p>
          <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-4">
            Eat, drink, stay out late.
          </h2>
          <p className="text-base sm:text-lg text-[#002F6C]/70 max-w-2xl mx-auto">
            LaplandFood is the cultural map. For the table you’ll actually sit at, the pint you’ll actually order, and the places that stay open after midnight, head to the sister sites below.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {siblings.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener"
              onClick={() => trackHubClick(s.eyebrow)}
              className="group rounded-2xl bg-white border border-[#002F6C]/10 p-7 hover:border-vibe-pink/40 hover:shadow-[0_8px_28px_rgba(0,47,108,0.08)] transition-all"
            >
              <p className="text-vibe-pink text-xs font-semibold tracking-[0.18em] uppercase mb-3">
                {s.eyebrow}
              </p>
              <h3 className="font-heading tracking-wide text-2xl sm:text-3xl text-[#002F6C] mb-3 group-hover:text-vibe-pink transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-[#002F6C]/70 leading-relaxed">{s.body}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-vibe-pink">
                Visit →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
