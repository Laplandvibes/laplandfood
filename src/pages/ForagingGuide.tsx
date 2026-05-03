import { Link } from 'react-router-dom'
import { AlertTriangle, MapPin, Calendar } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'
import Nav from '../components/Nav'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'
import NewsletterSection from '../components/NewsletterSection'

const items = [
  {
    name: 'Bilberry (Vaccinium myrtillus)',
    season: 'July – September',
    difficulty: 'Easy',
    location: 'Dry pine forests and heathlands',
    identification:
      'Low shrub, oval leaves, dark blue-black berries. Stains fingers and tongue blue.',
    tips: 'Peak picking in mid-August. Only harvest fully ripe berries.',
    safety: 'Cannot be confused with poisonous look-alikes — safe to pick.',
    sustainability: 'Pick no more than half the berries on any one plant.',
    image: '/images/forage-bilberry.jpg',
  },
  {
    name: 'Lingonberry (Vaccinium vitis-idaea)',
    season: 'August – October',
    difficulty: 'Easy',
    location: 'Dry pine forests and heathlands',
    identification:
      'Small evergreen shrub, shiny round leaves, bright red berries in clusters.',
    tips: 'Stores well after a frost. Wait until fully ripe before picking.',
    safety: 'Distinct from all poisonous berries — easy to identify.',
    sustainability: 'Leave young and small plants undisturbed.',
    image: '/images/forage-lingonberry.jpg',
  },
  {
    name: 'Cloudberry (Rubus chamaemorus)',
    season: 'July – August',
    difficulty: 'Moderate',
    location: 'Bogs and marshland',
    identification:
      'Low-growing plant, three-lobed leaves, single amber-orange berry per stem.',
    tips: 'Pick only fully ripe berries. Perishable — process quickly after picking.',
    safety: 'Found only in boggy terrain — watch your step.',
    sustainability: 'Arctic rarity. Take only what you need.',
    image: '/images/forage-cloudberry.jpg',
  },
  {
    name: 'Wild Mushrooms — Porcini & Milkcaps',
    season: 'July – September',
    difficulty: 'Challenging',
    location: 'Old spruce forests and mixed woodland',
    identification:
      'Porcini: brown cap, white stem, spongy underside. Milkcap: funnel shape, milky sap when cut.',
    tips: 'Dry immediately after picking. Learn identification with 100 % certainty first.',
    safety: 'CRITICAL: always confirm identification before eating any mushroom.',
    sustainability: 'Cut at the stem — do not damage the mycelium underneath.',
    image: '/images/forage-mushrooms.jpg',
  },
  {
    name: 'Stinging Nettle (Urtica dioica)',
    season: 'May – August',
    difficulty: 'Easy',
    location: 'Nutrient-rich soil, near buildings and clearings',
    identification: 'Serrated leaves, stings bare skin on contact.',
    tips: 'Harvest young shoots. Stinging effect disappears completely after drying or cooking.',
    safety: 'Use gloves when picking.',
    sustainability: 'Pick only the top leaves — leave the roots intact.',
    image: '/images/forage-nettle.jpg',
  },
]

export default function ForagingGuide() {
  useSEO({
    title: 'Foraging Guide for Lapland | Berries, Mushrooms, Wild Herbs | LaplandFood',
    description:
      "Five core wild ingredients to forage in Finnish Lapland — bilberry, lingonberry, cloudberry, mushrooms, nettle. Identification, season, and how to do it sustainably under Finland's everyman’s right.",
    path: '/foraging-guide',
  })

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <PageHero
        eyebrow="Pillar 04 · Foraging"
        title="The wild"
        titleHighlight="larder."
        subtitle="Finland’s jokamiehenoikeus (everyman’s right) lets anyone forage berries, mushrooms, and wild herbs across most of the country. Here are the five things to know first."
        imageUrl="/images/hero-foraging.jpg"
        imageAlt="Hand picking ripe cloudberries from a low Arctic bog, soft midnight-sun light from low on the horizon"
        primaryCta={{ label: 'Book a guided walk', href: '/food-tours' }}
        secondaryCta={{ label: 'How these end up on the plate', href: '/local-ingredients' }}
      />

      {/* === LONG-FORM INTRO === */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-[#002F6C]/85">
            <p className="text-xl leading-relaxed font-medium text-[#002F6C] mb-6">
              Foraging in Finland is not eccentric. It is a routine summer activity for around 40 % of the population.
            </p>
            <p className="leading-relaxed mb-5">
              That number, from the most recent Natural Resources Institute Finland (Luke) household surveys, is the structural fact you need before reading anything else on this page. Picking berries and mushrooms isn’t a niche subculture — it is a mainstream Finnish activity that cuts across cities and countryside, age, and income. People talk about their best bog the way other countries talk about their best fishmonger. There is a national vocabulary for it.
            </p>
            <p className="leading-relaxed mb-5">
              The legal framework that makes this possible is <em>jokamiehenoikeus</em>, "everyman’s right" — the centuries-old principle, codified in modern Finnish law, that anyone (citizen or visitor) may walk on, swim from, camp on, and forage from most land in Finland regardless of who owns it. This is not a tolerance or a custom. It is a legal right. The owner cannot legally tell you to leave a forest you are picking berries in, as long as you are not damaging anything and you are not within the immediate yard area of a house.
            </p>
            <p className="leading-relaxed mb-5">
              That changes how foraging works. You do not need permission. You do not need to know the landowner. You can step off a road into the forest and pick. The constraints are ethical (don’t over-harvest, don’t damage the plant) and practical (know what you’re picking) — not legal.
            </p>
            <p className="leading-relaxed">
              This page covers the practical side. The five most-picked wild foods in Lapland with proper identification notes. The mushroom-safety section you must read before picking your first one. A season-by-season foraging calendar. The everyman’s-right rules in detail. And the case for booking a guided walk for your first time even if you never plan to need a guide again.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-vibe-pink/5 border border-vibe-pink/30 p-6 sm:p-7 mb-10 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-vibe-pink flex-shrink-0" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-vibe-pink mb-1.5">
                Read this first
              </p>
              <p className="text-sm sm:text-base text-[#002F6C]/85 leading-relaxed">
                Mushroom poisoning is real and irreversible. If you cannot identify a mushroom with 100 % certainty — using a guidebook or, better, an experienced local — leave it alone. For your first forage, book a guided walk; one afternoon with a guide is worth a season of guessing.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {items.map((it) => (
              <article
                key={it.name}
                className="flex flex-col rounded-2xl bg-white border border-[#002F6C]/10 hover:border-vibe-pink/40 hover:shadow-[0_10px_32px_rgba(0,47,108,0.08)] transition-all overflow-hidden"
              >
                <div className="relative h-60 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                  <img
                    src={it.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/15 via-[#002F6C]/35 to-[#002F6C]/85" />
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
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/55 mb-0.5 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-vibe-pink" /> Where it grows
                    </p>
                    <p className="text-[#002F6C]/85 leading-snug">{it.location}</p>
                  </div>

                  <div className="mb-3">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/55 mb-0.5">
                      How to identify it
                    </p>
                    <p className="text-[#002F6C]/85 leading-snug">{it.identification}</p>
                  </div>

                  <div className="mb-3">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/55 mb-0.5 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-vibe-pink" /> When to pick
                    </p>
                    <p className="text-[#002F6C]/85 leading-snug">{it.tips}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto pt-3 border-t border-[#002F6C]/10 text-xs">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/55 mb-0.5">Safety</p>
                      <p className="text-[#002F6C]/80 leading-snug">{it.safety}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/55 mb-0.5">Sustainably</p>
                      <p className="text-[#002F6C]/80 leading-snug">{it.sustainability}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* === MUSHROOM SAFETY LONG-FORM === */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            Mushroom safety
          </p>
          <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-5">
            Read this before you pick a single mushroom.
          </h2>
          <div className="prose prose-lg max-w-none text-[#002F6C]/85">
            <p className="leading-relaxed mb-5">
              The mushroom-safety conversation in Finland is calm, precise, and unforgiving. It is the most controlled risk in the foraging culture. Most years, the Finnish Poison Information Centre handles a few hundred mushroom-related calls; serious poisonings are rare; deaths in any given year are most often from a single species, the death cap (<em>Amanita phalloides</em>), and a near-identical cousin, the destroying angel (<em>Amanita virosa</em>).
            </p>
            <p className="leading-relaxed mb-5">
              <strong>The death cap and destroying angel are present in Finnish forests.</strong> Both are deadly even in tiny quantities — there is no antidote and the toxicity is delayed (you feel fine for 6–24 hours, then your liver starts to fail). The destroying angel is white, looks innocuous, and grows in spruce and birch forests across the country including Lapland. Several other common Finnish mushrooms are gastrically toxic, hallucinogenic, or simply unpleasant.
            </p>
            <p className="leading-relaxed mb-5">
              <strong>The five rules every Finnish picker follows:</strong>
            </p>
            <ol className="space-y-3 mb-6 list-decimal list-inside marker:text-vibe-pink marker:font-bold">
              <li className="leading-relaxed">If you are not 100 % certain of the species — not 90 %, not "it looks like a porcini" — don’t pick it. There is no exception to this rule.</li>
              <li className="leading-relaxed">Cross-check with two independent sources: a guidebook, an app (Pikkupilkku and iNaturalist are both useful), and ideally an experienced human.</li>
              <li className="leading-relaxed">Pay attention to <em>everything</em>: cap shape, gills or pores, stem ring, base of the stem (always dig the whole thing up — many deadly species are identified by the cup at the base), spore print, smell, where it’s growing, what it’s growing on.</li>
              <li className="leading-relaxed">Never pick from a single perspective. Carry the whole mushroom home and check again in good light. If anything is ambiguous, throw it out.</li>
              <li className="leading-relaxed">Cook all wild mushrooms before eating, even the ones that are technically edible raw. This is a Finnish convention rather than a strict rule, but it is what every experienced picker does.</li>
            </ol>
            <p className="leading-relaxed mb-5">
              <strong>The four mushrooms a beginner can learn to identify safely</strong> in a single afternoon with a guidebook are: porcini / cep (<em>Boletus edulis</em>), false morel (<em>Gyromitra esculenta</em> — but <strong>only after parboiling twice and discarding the water</strong>; many Finns will tell you it is delicious, many others will tell you to avoid it entirely; both are right), saffron milk cap (<em>Lactarius deliciosus</em>), and chanterelle (<em>Cantharellus cibarius</em>). Of these, porcini and chanterelle have no dangerous look-alikes in Finland and are the recommended starting points.
            </p>
            <p className="leading-relaxed">
              If you are going to pick mushrooms in Lapland for the first time, do it with someone who already knows. The cost-to-confidence ratio of a 4-hour guided walk is unbeatable — and in Lapland the guides are typically Sami foragers who learned this from their grandparents, not commercial guides reading from a script.
            </p>
          </div>
        </div>
      </section>

      {/* === SEASONAL FORAGING CALENDAR === */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              Seasonal calendar
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">
              Month by month, what is in the forest.
            </h2>
            <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">
              Lapland’s foraging window is short and intense — roughly May through late September. Inside that window, every two weeks the dominant target shifts. This is the calendar a local picker plans the summer by.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { month: 'May', body: 'Snow recedes. First nettles, first young birch leaves, birch sap (drilled from the trunk and drunk fresh, used in syrup, or fermented). Cold, but the foraging year has started.' },
              { month: 'June', body: 'Wild herbs peak — meadowsweet, yarrow, angelica, sorrel. The first fresh greens after seven months. Some early herbs are dried for winter teas.' },
              { month: 'July (early)', body: 'The herb window closes; everything is leafing aggressively. The bog plants flower — cloudberry blooms have set. This is the calm before the picking storm.' },
              { month: 'July (late) – early August', body: 'Cloudberry season — typically a 3-week window depending on bog location. The most intensive picking activity of the year. Many Finnish offices effectively pause for it.' },
              { month: 'August', body: 'Bilberry peaks. First lingonberries (still tart). First mushrooms — chanterelle is usually first, porcini second. Long-light evenings make this the best month for foraging-and-cooking.' },
              { month: 'September', body: 'Lingonberry sweetens after first frost. Mushroom season at its peak — porcini, milkcaps, chanterelle, ceps. Days shortening fast; pickers are out from sunrise.' },
              { month: 'October', body: 'Last mushrooms. Last lingonberries (now best after night frosts). Final preserving work — drying, jamming, freezing. The calendar essentially closes after first heavy snow.' },
              { month: 'November – April', body: 'Forest dormancy. Foraging stops. Indoor work — preserving, smoking, drying, fermenting — picks up. Ice fishing replaces foraging for fresh protein.' },
            ].map((m) => (
              <div key={m.month} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6">
                <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-3">{m.month}</h3>
                <p className="text-sm text-[#002F6C]/80 leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === EVERYMAN'S RIGHT FULL DETAIL === */}
      <section className="bg-[#002F6C] py-16 sm:py-20 text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            Everyman’s right · the rules
          </p>
          <h2 className="font-heading tracking-wide text-4xl sm:text-5xl mb-5">
            What you can and can’t do.
          </h2>
          <div className="prose prose-lg max-w-none text-white/85">
            <p className="leading-relaxed mb-6">
              <strong className="text-white">You can:</strong>
            </p>
            <ul className="space-y-2 mb-6">
              <li>Walk, ski, cycle, ride, and otherwise move through forests, meadows, and uncultivated land.</li>
              <li>Pick wild berries, mushrooms, and unprotected wildflowers and herbs.</li>
              <li>Fish with a single rod and lure (no permit needed for basic angling, the fisheries management fee covers most lakes).</li>
              <li>Camp temporarily — typically one night — on most uncultivated land, away from houses.</li>
              <li>Swim, wash, and use water from any water body, including private ones.</li>
              <li>Cross frozen lakes and rivers, snowmobile or ski on most uncultivated terrain (with snowmobile-specific rules).</li>
            </ul>
            <p className="leading-relaxed mb-6">
              <strong className="text-white">You cannot:</strong>
            </p>
            <ul className="space-y-2 mb-6">
              <li>Damage trees, dig up roots, take moss or lichen in commercial quantities.</li>
              <li>Hunt or trap (separate licences required).</li>
              <li>Drive a motor vehicle off-road outside marked tracks (snowmobiles have their own rules).</li>
              <li>Light an open fire on someone’s land without permission. Use marked fire pits, or get the landowner’s OK.</li>
              <li>Pick from a cultivated garden, orchard, or field — these are not "uncultivated land".</li>
              <li>Disturb a private home’s immediate yard area (within sight of the house).</li>
              <li>Leave litter. Whatever you bring in, you take out.</li>
            </ul>
            <p className="leading-relaxed">
              The principle is access without harm. Foragers who respect the spirit of the law find Finnish landowners almost unfailingly relaxed about strangers picking on their land. The few problems happen when a foraging party damages trees, leaves rubbish, or gets too close to a private home. Treat the forest carefully and you will have access to one of Europe’s last truly free wild larders.
            </p>
          </div>
        </div>
      </section>

      {/* === GUIDE CTA === */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-5">
            One afternoon with a guide saves a season of guessing.
          </h2>
          <p className="text-base text-[#002F6C]/75 mb-7">
            Lapland’s guided foraging walks are not the bus-tour version. They are typically led by Sami foragers, run as small groups of 6–15, and start with the mushroom-safety lecture you actually need. End with cooking what you picked over a campfire. Most cost less than a fine-dining starter.
          </p>
          <Link to="/food-tours" className="inline-flex items-center justify-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
            Browse guided walks
          </Link>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  )
}
