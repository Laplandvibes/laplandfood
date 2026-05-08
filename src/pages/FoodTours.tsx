import { Clock, Users, MapPin, Star, Calendar } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import { gygSearchLink } from '../lib/gyg';
const tours = [{
  name: 'Sami Culture Food Journey',
  duration: '6 hours',
  groupSize: '4–12 people',
  difficulty: 'Easy',
  price: 'from €185',
  rating: 4.9,
  description: 'A deep dive into Sami food culture. Meet local producers, learn traditional techniques, and taste authentic flavours straight from the Arctic.',
  highlights: ['Visit a reindeer herder and taste bidos stew', 'Traditional Sami bread baking', 'Wild ingredient foraging with a guide', 'Sami museum food culture workshop', 'Visits to local Arctic producers'],
  location: 'Inari – Utsjoki region',
  season: 'June – September',
  sid: 'tour_sami_culture',
  href: gygSearchLink('Sami food culture Lapland', 'tour_sami_culture'),
  image: '/images/tour-sami-culture.jpg'
}, {
  name: 'Arctic Fine-Dining Experience',
  duration: '8 hours',
  groupSize: '2–8 people',
  difficulty: 'Moderate',
  price: 'from €295',
  rating: 4.8,
  description: "An exclusive journey through Lapland's finest restaurants. Michelin-recommended venues and award-winning chefs cooking with the purest Arctic ingredients.",
  highlights: ['3-course lunch at a regional flagship restaurant', 'Back-of-house kitchen tour with the head chef', 'Arctic ingredients masterclass', 'Fine-dining technique demonstration', '5-course gourmet dinner with wine pairing'],
  location: 'Rovaniemi',
  season: 'Year-round',
  sid: 'tour_arctic_fine_dining',
  href: gygSearchLink('Lapland fine dining tasting menu', 'tour_arctic_fine_dining'),
  image: '/images/tour-fine-dining.jpg'
}, {
  name: 'Wild Foraging Expedition',
  duration: '4 hours',
  groupSize: '6–15 people',
  difficulty: 'Moderate',
  price: 'from €95',
  rating: 4.7,
  description: 'Hands-on guided foraging in old-growth forest and bog. Learn safe identification of berries, mushrooms, and wild herbs, then cook what you pick.',
  highlights: ['Mushroom safety masterclass', 'Bilberry, lingonberry, and cloudberry picking (in season)', 'Wild herb identification', 'Forage-to-table cooking session over campfire', 'Take-home Lapland foraging guidebook'],
  location: 'Rovaniemi / Levi area',
  season: 'July – September',
  sid: 'tour_foraging',
  href: gygSearchLink('Lapland foraging tour', 'tour_foraging'),
  image: '/images/tour-foraging.jpg'
}];

// 2026-05-03: GYG `lapland-l662/food-and-drink/` category landing surfaces
// almost no actual food experiences (mostly husky / aurora cross-listings).
// Search query for "Lapland food cooking" returns the relevant set reliably.
const browseAllHref = gygSearchLink('Lapland food cooking class tour', 'browse_all');
export default function FoodTours() {
  return <><SEO titleKey="foodTours.title" descriptionKey="foodTours.description" path={'/food-tours'} /><div className="min-h-screen bg-white">
      <Nav />
      <PageHero eyebrow="Pillar 06 · Tours" title="Eat your way" titleHighlight="around Lapland." subtitle="Three bookable food experiences that go deeper than a tasting menu — Sami culture, Arctic fine dining, and a guided foraging walk that ends in dinner." imageUrl="/images/hero-tours.jpg" imageAlt="Small group around a campfire in an Arctic forest, cooking foraged mushrooms over a kettle, golden-hour light" primaryCta={{
        label: 'Browse all on GetYourGuide',
        href: browseAllHref,
        external: true
      }} />

      {/* === LONG-FORM INTRO === */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-[#002F6C]/85">
            <p className="text-xl leading-relaxed font-medium text-[#002F6C] mb-6">
              The food experiences in Lapland that are worth your money are the ones that put you in front of the people who actually do this for a living.
            </p>
            <p className="leading-relaxed mb-5">
              Skip the restaurant-tour-with-a-coach treatment. The trips below are small-group, often booked direct with the operator, and led by Sami foragers, fine-dining chefs, or working reindeer herders. You eat, but the bigger thing is access — to a herd, to a chef’s kitchen, to a forager’s favourite bog. Most cost less than a Helsinki tasting menu and last twice as long.
            </p>
            <p className="leading-relaxed mb-5">
              Three trips cover most of what visitors look for. The <strong>Sami Culture Food Journey</strong> goes deep on Sami foodways — bidos with a herder, traditional bread baking, a foraging session, the cultural context. The <strong>Arctic Fine-Dining Experience</strong> is a single intensive day that gets you a back-of-house kitchen tour, a cooking masterclass, and a multi-course dinner with wine pairing — the full Lapland equivalent of a Copenhagen culinary day. The <strong>Wild Foraging Expedition</strong> is the single best afternoon a beginner can spend with a Sami forager — learn safe identification, fill a basket, then cook what you picked over a campfire.
            </p>
            <p className="leading-relaxed">
              All three are bookable through GetYourGuide. We surface the search results for each so you see live availability and current prices — operators rotate, dates change, prices shift. The "Check availability" button on each card runs a live GYG search, not a fixed product page.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-2">
                Three trips worth taking
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C]">
                Book one of these.
              </h2>
            </div>
            <a href={browseAllHref} target="_blank" rel="sponsored nofollow noopener" className="text-sm font-semibold text-vibe-pink hover:underline whitespace-nowrap">
              See all on GetYourGuide →
            </a>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {tours.map(t => <article key={t.name} className="group relative flex flex-col rounded-2xl bg-white border border-[#002F6C]/10 hover:border-vibe-pink/40 hover:shadow-[0_10px_32px_rgba(0,47,108,0.08)] transition-all overflow-hidden">
                <div className="relative h-64 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                  <img src={t.image} alt="" loading="lazy" decoding="async" onError={e => {
                  e.currentTarget.style.display = 'none';
                }} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/15 via-[#002F6C]/35 to-[#002F6C]/85" />
                  <div className="absolute top-4 left-5 right-5 flex items-start justify-between">
                    <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur text-[#002F6C] text-xs font-semibold px-3 py-1.5 rounded-full">
                      <Star className="w-3 h-3 text-vibe-pink fill-vibe-pink" />
                      {t.rating}
                    </span>
                    <span className="bg-vibe-pink text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {t.price}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="font-heading tracking-wide text-2xl text-white leading-tight">
                      {t.name}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <p className="text-sm text-[#002F6C]/80 leading-relaxed mb-4">
                    {t.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 text-xs mb-4">
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-vibe-pink flex-shrink-0" /> <span className="text-[#002F6C]/80">{t.duration}</span></div>
                    <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-vibe-pink flex-shrink-0" /> <span className="text-[#002F6C]/80">{t.groupSize}</span></div>
                    <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-vibe-pink flex-shrink-0" /> <span className="text-[#002F6C]/80">{t.location}</span></div>
                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-vibe-pink flex-shrink-0" /> <span className="text-[#002F6C]/80">{t.season}</span></div>
                  </div>

                  <ul className="space-y-1 mb-5 flex-1">
                    {t.highlights.slice(0, 3).map(h => <li key={h} className="flex gap-2 text-xs text-[#002F6C]/75">
                        <span className="w-1 h-1 rounded-full bg-vibe-pink mt-1.5 flex-shrink-0" />
                        <span className="leading-snug">{h}</span>
                      </li>)}
                    {t.highlights.length > 3 && <li className="text-xs text-[#002F6C]/55 pl-3">+ {t.highlights.length - 3} more</li>}
                  </ul>

                  <a href={t.href} target="_blank" rel="sponsored nofollow noopener" className="block w-full text-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm">
                    Check availability →
                  </a>
                </div>
              </article>)}
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div></>;
}