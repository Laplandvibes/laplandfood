import { Link } from 'react-router-dom';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
export default function About() {
  return <><SEO titleKey="about.title" descriptionKey="about.description" path={'/about'} /><div className="min-h-screen bg-white">
      <Nav />

      {/* Tightened hero — no empty real estate, no operating-company name */}
      <section className="pt-24 bg-[#002F6C] text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-16">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            About LaplandFood
          </p>
          <h1 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl mb-5 leading-[1.05]">
            Finnish food, written from the inside.
          </h1>
          <p className="text-base sm:text-lg text-white/85 leading-relaxed">
            LaplandFood is the cultural-map sister site in the LaplandVibes network — independent editorial about Finnish food culture, sourcing, traditional Sami recipes, modern Arctic kitchens, and where to actually eat in Lapland.
          </p>
        </div>
      </section>

      {/* === WHY THIS SITE EXISTS === */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-5">
            Why this site exists.
          </h2>
          <div className="prose prose-lg max-w-none text-[#002F6C]/85">
            <p className="leading-relaxed mb-5">
              Most of what is written about Lapland food in English exists in two registers. There is the brochure register — "magical Sami flavours under the midnight sun," vague, breathless, ingredient-shy. And there is the academic register — careful, fully-referenced ethnography that nobody reads on a phone before booking dinner.
            </p>
            <p className="leading-relaxed mb-5">
              We try to occupy the gap. Plain editorial sentences. Specific ingredients and specific restaurants. Numbers where numbers help — how many reindeer cooperatives, what a tasting menu actually costs, when the cloudberry window closes — and no numbers at all when they would just be filler. Written from inside the Arctic Circle, not from a desk in London or Helsinki.
            </p>
            <p className="leading-relaxed">
              The bar we hold ourselves to: <strong>a friend visiting Lapland for the first time should be able to read three pages here and leave with enough context to plan a real food trip.</strong> If a section doesn’t pass that test we rewrite it.
            </p>
          </div>
        </div>
      </section>

      {/* === WHAT WE COVER === */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-3">
            What we cover.
          </h2>
          <p className="text-base text-[#002F6C]/75 mb-10 max-w-2xl">
            Six pillars. Each is a deep page that could stand alone. Together they form the field guide we wish had existed when we started writing about this region.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[{
              t: 'Local Ingredients',
              body: 'What grows, swims, and grazes here. Reindeer, cloudberries, bilberries, Arctic fish, foraged herbs. Where they come from, when they peak.',
              href: '/local-ingredients'
            }, {
              t: 'Traditional Recipes',
              body: 'Bidos, Gahkku, Sápmi fish soup, wild-berry kissel — plus the cultural context that explains why they look the way they do.',
              href: '/traditional-recipes'
            }, {
              t: 'Modern Lapland',
              body: 'New Nordic technique applied to Lapland ingredients. Sous-vide, fermentation, cold curing, foraged garnish. Where to taste it.',
              href: '/modern-lapland'
            }, {
              t: 'Foraging Guide',
              body: 'Five core wild foods, mushroom safety in detail, an 8-month seasonal calendar, and the everyman’s right that makes it all legal.',
              href: '/foraging-guide'
            }, {
              t: 'Michelin & Fine Dining',
              body: 'Helsinki’s Michelin scene, Lapland’s three flagship rooms, what a tasting menu actually looks like, how booking works.',
              href: '/michelin-dining'
            }, {
              t: 'Food Tours & Cooking Classes',
              body: 'The food experiences worth booking — Sami food journeys, fine-dining tours, foraging walks. Curated, not exhaustive.',
              href: '/food-tours'
            }].map(c => <Link key={c.href} to={c.href} className="group rounded-2xl bg-white border border-[#002F6C]/10 hover:border-vibe-pink/40 p-6 transition-all">
                <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] group-hover:text-vibe-pink transition-colors mb-2">
                  {c.t}
                </h3>
                <p className="text-sm text-[#002F6C]/75 leading-relaxed">{c.body}</p>
              </Link>)}
          </div>
        </div>
      </section>

      {/* === EDITORIAL PRINCIPLES === */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-3">
            How we choose what to recommend.
          </h2>
          <p className="text-base text-[#002F6C]/75 mb-8">
            We are an independent publisher. The principles below are how we keep it honest.
          </p>
          <div className="space-y-6">
            {[{
              t: 'Recommend like you would to a friend',
              body: 'The simplest filter. Every restaurant, tour, ingredient supplier, and producer on this site is one we would send a friend to. If we wouldn’t, it doesn’t go on the page.'
            }, {
              t: 'Specifics over vibes',
              body: 'A claim like "the best fine dining in Lapland" is meaningless without specifics. We tell you what to order, what it costs, when to book, where to walk in from. Anything we can’t pin down to a specific, we leave out.'
            }, {
              t: 'Affiliate doesn’t change the editorial',
              body: 'Some booking links pay us a commission if you book through them. None of those links unlock content, change the order of recommendations, or buy a place on the page. The same restaurants would be on the page if no affiliate programme existed.'
            }, {
              t: 'No fake stats, no fake quotes',
              body: 'If we cite a number, it has a source we could point to. If we quote a chef, we spoke to them. If we are uncertain about something — current Michelin star count, the exact year a tradition started — we say so and link out to the authoritative source.'
            }, {
              t: 'Update over delete',
              body: 'Restaurants close, chefs move, prices shift. When we discover a page is wrong we update it with a date stamp. We don’t pretend the wrong version never existed.'
            }].map(p => <div key={p.t} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6 sm:p-7">
                <h3 className="font-heading tracking-wide text-xl text-[#002F6C] mb-2">{p.t}</h3>
                <p className="text-sm sm:text-base text-[#002F6C]/80 leading-relaxed">{p.body}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* === HOW THE NETWORK FITS TOGETHER === */}
      <section className="bg-[#002F6C] py-16 sm:py-20 text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            The network
          </p>
          <h2 className="font-heading tracking-wide text-3xl sm:text-4xl mb-5">
            Where to go for the things this site doesn’t cover.
          </h2>
          <p className="text-base text-white/85 leading-relaxed mb-7">
            LaplandFood is the cultural-map site. It is deliberately not a restaurant directory or a booking engine. The sister sites below take over where this one stops:
          </p>
          <div className="space-y-4 mb-7">
            <div className="rounded-xl bg-white/5 border border-white/15 p-5">
              <a href="https://laplanddining.com" target="_blank" rel="noopener" className="text-vibe-pink font-semibold text-lg hover:underline">
                laplanddining.com →
              </a>
              <p className="text-sm text-white/80 leading-relaxed mt-1">
                Where to <em>actually book a table</em>. Restaurant-by-restaurant directory with menus, hours, and direct booking links. If a place is on a list here, it’s on a page there.
              </p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-5">
              <a href="https://laplandbars.com" target="_blank" rel="noopener" className="text-vibe-pink font-semibold text-lg hover:underline">
                laplandbars.com →
              </a>
              <p className="text-sm text-white/80 leading-relaxed mt-1">
                Bars, breweries, ice bars, hotel bars, the local pubs where Finns actually drink. Drink culture, opening hours, what they pour.
              </p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/15 p-5">
              <a href="https://laplandnightlife.com" target="_blank" rel="noopener" className="text-vibe-pink font-semibold text-lg hover:underline">
                laplandnightlife.com →
              </a>
              <p className="text-sm text-white/80 leading-relaxed mt-1">
                After-dinner Lapland: DJs, late kitchens, live-music venues, polar-night party calendar. Where the night goes.
              </p>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            The full network footer at the bottom of every page lists all the LaplandVibes spokes (where to stay, things to do, transport, ski resorts, husky safaris, nature, work in Lapland, …).
          </p>
        </div>
      </section>

      {/* === GET IN TOUCH === */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-5">
            Get in touch.
          </h2>
          <div className="prose prose-lg max-w-none text-[#002F6C]/85">
            <p className="leading-relaxed mb-4">
              For all enquiries — editorial, partnerships, press, corrections, factual disputes — write to{' '}
              <a className="text-vibe-pink underline-offset-4 hover:underline" href="mailto:info@laplandvibes.com">
                info@laplandvibes.com
              </a>
              . We answer in Finnish or English, usually within two working days.
            </p>
            <p className="leading-relaxed mb-4">
              <strong>If you spot something wrong</strong> — a closed restaurant, a wrong opening time, a price that doesn’t match reality, a fact we got wrong — please tell us. We update faster than we publish.
            </p>
            <p className="leading-relaxed">
              For privacy, terms, and cookie policy, see <Link to="/privacy" className="text-vibe-pink underline-offset-4 hover:underline">Privacy</Link>, <Link to="/terms" className="text-vibe-pink underline-offset-4 hover:underline">Terms</Link>, <Link to="/cookie-policy" className="text-vibe-pink underline-offset-4 hover:underline">Cookie Policy</Link>.
            </p>
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div></>;
}