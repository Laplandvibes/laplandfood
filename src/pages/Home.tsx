import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import NewsletterSection from '../components/NewsletterSection'
import SisterSiteCTAs from '../components/SisterSiteCTAs'
import { ArrowRight } from 'lucide-react'

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'LaplandFood',
      url: 'https://laplandfood.com',
      parentOrganization: { '@type': 'Organization', name: 'LaplandVibes', url: 'https://laplandvibes.com' },
      areaServed: { '@type': 'Country', name: 'Finland' },
    },
    {
      '@type': 'WebSite',
      name: 'LaplandFood',
      url: 'https://laplandfood.com',
      inLanguage: 'en',
      publisher: { '@type': 'Organization', name: 'Lapeso Oy' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is traditional Finnish food like?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Traditional Finnish food is built on what grows, swims, or grazes within walking distance: rye bread, fresh-water fish, reindeer, wild berries (bilberry, lingonberry, cloudberry), foraged mushrooms, dairy, and rye in many forms. The cuisine is seasonal, lightly seasoned, and centred on the ingredient rather than the technique.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Finland have Michelin-star restaurants?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The Michelin Guide covers Finland and lists multiple starred restaurants — most concentrated in Helsinki, with a growing fine-dining scene in Turku, Tampere, and Lapland. Per capita, Finland punches above its weight in the Nordics.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is Sami food?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sami food is the indigenous cuisine of Sápmi (northern Finland, Sweden, Norway, Russia). It centres on reindeer (every part used), Arctic fish, foraged berries and herbs, and slow-cooking methods like bidos stew. Recipes are seasonal and tied to the eight-season Sami calendar.',
          },
        },
      ],
    },
  ],
}

const pillars = [
  {
    eyebrow: 'Pillar 01',
    title: 'Local Ingredients',
    body: 'What actually grows, swims, and grazes here — reindeer, cloudberries, bilberries, Arctic fish, foraged herbs. Seasons, sourcing, and why the flavour is what it is.',
    href: '/local-ingredients',
    image: '/images/card-ingredients.jpg',
  },
  {
    eyebrow: 'Pillar 02',
    title: 'Traditional Recipes',
    body: 'Bidos reindeer stew, Sami flatbread, lake-fish soup, wild-berry kissel — the recipes that fed Sápmi through Arctic winters for thousands of years.',
    href: '/traditional-recipes',
    image: '/images/card-recipes.jpg',
  },
  {
    eyebrow: 'Pillar 03',
    title: 'Modern Lapland',
    body: 'How a new generation of chefs cooks the same ingredients with sous-vide, fermentation, and New Nordic technique. Where to taste it.',
    href: '/modern-lapland',
    image: '/images/card-modern.jpg',
  },
  {
    eyebrow: 'Pillar 04',
    title: 'Foraging Guide',
    body: 'Bilberry, lingonberry, cloudberry, mushrooms, nettle, meadowsweet — what to pick when, how to identify it, and how to do it sustainably under everyman’s right.',
    href: '/foraging-guide',
    image: '/images/card-foraging.jpg',
  },
  {
    eyebrow: 'Pillar 05',
    title: 'Michelin & Fine Dining',
    body: 'Finland’s Michelin scene at a glance — what’s starred, where, and what’s pushing fine dining inside the Arctic Circle.',
    href: '/michelin-dining',
    image: '/images/card-michelin.jpg',
  },
  {
    eyebrow: 'Pillar 06',
    title: 'Food Tours & Cooking Classes',
    body: 'Sami food journeys, fine-dining tours, foraging walks, brewery visits — bookable food experiences across Lapland.',
    href: '/food-tours',
    image: '/images/card-tours.jpg',
  },
]

const culturePoints = [
  {
    n: '01',
    title: 'Eight seasons, not four',
    body: 'The Sami calendar splits the year into eight seasons. Each one fixes what is on the table — ice-fishing in polar night, cloudberry picking under the midnight sun, mushroom and herb gathering before the first frost.',
  },
  {
    n: '02',
    title: 'Everyman’s right',
    body: 'Finland’s jokamiehenoikeus lets anyone forage berries, mushrooms, and wild herbs on most land — privately owned or not. It is one of the few legal frameworks in the world that treats the wild larder as a shared resource.',
  },
  {
    n: '03',
    title: 'Whole-animal use',
    body: 'In Sami food culture nothing on the reindeer is wasted: meat, marrow, blood, fat, hide, bone. Recipes evolved around full utilisation — that is why bidos uses tougher cuts and why blood pancakes (verilettut) became a Finnish staple.',
  },
  {
    n: '04',
    title: 'Lightly seasoned, ingredient-led',
    body: 'Finnish food rarely shouts. The flavours are dill, juniper, butter, salt, and the ingredient itself. The cooking is built to let the ingredient speak — a quiet contrast to the louder cuisines further south.',
  },
]

export default function Home() {
  useSEO({
    title: 'LaplandFood — How Finland Eats: Ingredients, Recipes, Michelin & Food Tours',
    description:
      'A field guide to Finnish food culture: where the ingredients come from, what the recipes actually taste like, the Michelin scene, and where to book a food tour in Lapland.',
    path: '/',
    schema: homeSchema,
  })

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero />

      {/* Intro band — what this site is */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-4">
            What this site is
          </p>
          <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-6">
            Finnish food, explained.
          </h2>
          <p className="text-base sm:text-lg text-[#002F6C]/75 leading-relaxed">
            LaplandFood is the cultural map of how Finland eats — written from the inside.
            Where the ingredients come from. The recipes that actually get made on a Tuesday.
            The Michelin scene most travellers miss. Foraging, food tours, and the food traditions that go back a thousand years.
            <br />
            <br />
            For where to actually <em>book a table</em>, head to{' '}
            <a className="text-vibe-pink underline-offset-4 hover:underline" href="https://laplanddining.com" target="_blank" rel="noopener">
              laplanddining.com
            </a>
            . For drinks,{' '}
            <a className="text-vibe-pink underline-offset-4 hover:underline" href="https://laplandbars.com" target="_blank" rel="noopener">
              laplandbars.com
            </a>
            . For the after-hours scene,{' '}
            <a className="text-vibe-pink underline-offset-4 hover:underline" href="https://laplandnightlife.com" target="_blank" rel="noopener">
              laplandnightlife.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* Pillar grid */}
      <section className="bg-[#F8FAFC] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              The Six Pillars
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-4">
              Start here.
            </h2>
            <p className="text-base sm:text-lg text-[#002F6C]/70 max-w-2xl mx-auto">
              Six maps of Finnish food culture. Pick one and go deep — every page links to the others.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((p) => (
              <Link
                key={p.href}
                to={p.href}
                className="group rounded-2xl bg-white border border-[#002F6C]/10 overflow-hidden hover:border-vibe-pink/40 hover:shadow-[0_8px_28px_rgba(0,47,108,0.08)] transition-all"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] relative overflow-hidden">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-vibe-pink/0 via-transparent to-vibe-pink/10 pointer-events-none" />
                </div>
                <div className="p-6">
                  <p className="text-vibe-pink text-xs font-semibold tracking-[0.18em] uppercase mb-2">
                    {p.eyebrow}
                  </p>
                  <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-2 group-hover:text-vibe-pink transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#002F6C]/70 leading-relaxed">{p.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-vibe-pink">
                    Read <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Culture / "what makes Finnish food Finnish" */}
      <section className="relative bg-[#002F6C] py-20 sm:py-24 text-white overflow-hidden">
        <img
          src="/images/culture-band.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/80 via-[#002F6C]/85 to-[#001F4A]/95" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              Why it tastes the way it does
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl mb-5">
              Four things that make Finnish food Finnish.
            </h2>
            <p className="text-base sm:text-lg text-white/75 leading-relaxed">
              Strip away the trends and most of Finnish cuisine still rests on these four foundations. They explain everything from why your hotel breakfast has rye crispbread to why a fine-dining tasting menu starts with juniper-cured fish.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {culturePoints.map((c) => (
              <div key={c.n} className="rounded-2xl bg-white/5 border border-white/15 p-7">
                <p className="font-heading tracking-wide text-3xl text-vibe-pink mb-3">{c.n}</p>
                <h3 className="font-heading tracking-wide text-2xl mb-3">{c.title}</h3>
                <p className="text-white/75 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summer band — LV ★ rule, with background image */}
      <section className="relative overflow-hidden">
        <div className="relative py-20 sm:py-28 md:py-32">
          <img
            src="/images/midnight-sun-band.jpg"
            alt=""
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#F4A93B]/85 via-[#F59E0B]/80 to-[#D97706]/90" />
          <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <p className="text-white/90 text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              June 6 – July 7 · 32 days of midnight sun
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-white mb-5 drop-shadow-[0_2px_12px_rgba(146,64,14,0.45)]">
              The midnight-sun food window.
            </h2>
            <p className="text-base sm:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed mb-8">
              Cloudberries ripen, lake fish hit peak, the herb beds explode, and the sun never sets. For four weeks Lapland’s kitchens swap heavy winter bracing for the lightest, brightest produce of the year. If you only come once, come now.
            </p>
            <Link
              to="/foraging-guide"
              className="inline-flex items-center justify-center bg-white hover:bg-white/95 text-[#92400E] font-semibold px-7 py-3.5 rounded-full transition-colors text-base shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
            >
              What’s in season →
            </Link>
          </div>
        </div>
      </section>

      <SisterSiteCTAs />

      <NewsletterSection />

      <Footer />
    </div>
  )
}
