import { Link } from 'react-router-dom'
import { Sparkles, Award, Utensils } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'
import Nav from '../components/Nav'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'
import NewsletterSection from '../components/NewsletterSection'
import AffiliateCTA from '../components/AffiliateCTA'

const dishes = [
  {
    name: 'Sous-vide Reindeer Fillet & Bilberry Cream',
    chef: 'Sami Tallberg',
    restaurant: 'Ravintola Nili, Rovaniemi',
    description:
      'Classic reindeer cooked to 54 °C, served with wild bilberry sauce and beetroot crisps.',
    technique: 'Sous-vide',
    traditional: 'Traditional roasted reindeer',
    innovation: 'Precision temperature cooking and modern plating',
    price: 'from €42',
    image: '/images/dish-sous-vide-reindeer.jpg',
  },
  {
    name: 'Arctic Whitefish & Wild Herb Oil',
    chef: 'Marja Vuorilehto',
    restaurant: 'Arctic TreeHouse Hotel',
    description:
      'Lake whitefish cooked confit-style, meadowsweet, berry aïoli, and edible flowers.',
    technique: 'Confit + molecular gastronomy',
    traditional: 'Smoked whitefish',
    innovation: 'Low-temperature cooking + foraged wild flowers',
    price: 'from €38',
    image: '/images/dish-whitefish.jpg',
  },
  {
    name: '7-Course Wild-Berry Tasting Menu',
    chef: 'Petteri Luoto',
    restaurant: 'Restaurant Aanaar, Inari',
    description:
      'A full dinner journey built around Lapland’s wild berries — from amuse-bouche to dessert.',
    technique: 'New Nordic + fermentation',
    traditional: 'Berry compote and jams',
    innovation: 'Lacto-fermented berries and natural acidities',
    price: 'from €85',
    image: '/images/dish-berry-tasting.jpg',
  },
  {
    name: 'Deconstructed Bidos & Bone-Marrow Dust',
    chef: 'Niillas Somby',
    restaurant: 'Sápmi Cultural Center',
    description: 'A molecular-gastronomy reimagining of the classic Sami reindeer stew.',
    technique: 'Deconstruction + spherification',
    traditional: 'Bidos reindeer stew',
    innovation: 'Separating and reassembling flavours with modern technique',
    price: 'from €45',
    image: '/images/dish-deconstructed-bidos.jpg',
  },
]

export default function ModernLapland() {
  useSEO({
    title: 'Modern Arctic Cuisine | New Nordic in Lapland | LaplandFood',
    description:
      'How a new generation of Finnish chefs cooks reindeer, lake fish, and wild berries with sous-vide, fermentation, and New Nordic technique. Where to taste it.',
    path: '/modern-lapland',
  })

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <PageHero
        eyebrow="Pillar 03 · Modern"
        title="The new"
        titleHighlight="Arctic kitchen."
        subtitle="Sous-vide reindeer. Lacto-fermented bilberries. Confit whitefish under wild herb oil. Modern Lapland cuisine takes the same ingredients the Sami have used for a thousand years and applies New Nordic technique."
        imageUrl="/images/hero-modern.jpg"
        imageAlt="Plated tasting-menu dish of pink-cooked reindeer, foraged herbs, and bilberry reduction on a slate plate"
        primaryCta={{ label: 'Where to book', href: '/michelin-dining' }}
        secondaryCta={{ label: 'The traditional recipes', href: '/traditional-recipes' }}
      />

      {/* === LONG-FORM INTRO === */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-[#002F6C]/85">
            <p className="text-xl leading-relaxed font-medium text-[#002F6C] mb-6">
              The shift took about ten years. Lapland fine dining went from "tourist hotel restaurant with reindeer pepper steak" to "small chef-led tasting-menu rooms that compete with Helsinki on plate-craft."
            </p>
            <p className="leading-relaxed mb-5">
              Three things made it happen. First, the New Nordic movement that started at Noma in Copenhagen in the mid-2000s reframed everything Scandinavia had been treating as embarrassingly rural — foraged herbs, smoked fish, lacto-fermentation, slow-cooked game, dairy from a single farm — as the sophisticated end of the cuisine. Once that had cultural cover, Lapland chefs who had been doing those things their whole lives had room to put them on a fine-dining plate without apology.
            </p>
            <p className="leading-relaxed mb-5">
              Second, the technique came north. Sous-vide circulators got cheaper, vacuum bags became standard, and ingredients that had traditionally been over-cooked into stew (because that was the only way to make a tough cut palatable) could now be cooked to centre-pink at 54 °C and served as the headline protein. Reindeer fillet — a cut that used to be reserved for special occasions because it was so easy to ruin — became the modern Lapland signature. Not because it’s trendy, but because the technique finally caught up with the ingredient.
            </p>
            <p className="leading-relaxed mb-5">
              Third, the supply chain professionalised. Foragers and small fishermen started selling directly to restaurants instead of through wholesalers. Sami cooperatives certified parts of their reindeer slaughter for restaurant trade. Specialty producers — birch-syrup makers, smokehouses, lingonberry-vinegar fermenters — set up across Lapland to sell to chefs. A modern Lapland tasting menu can list eleven ingredients on a plate and have all of them sourced within 200 kilometres.
            </p>
            <p className="leading-relaxed">
              The four dishes below are signatures from the rooms doing this best. Below the cards is a longer piece on what New Nordic technique actually <em>is</em> — beyond the brand — and how it shows up in a Lapland kitchen.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-2">
              Four signature dishes
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C]">
              Modern Lapland on the plate.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {dishes.map((d) => (
              <article
                key={d.name}
                className="group relative flex flex-col rounded-2xl bg-white border border-[#002F6C]/10 hover:border-vibe-pink/40 hover:shadow-[0_10px_32px_rgba(0,47,108,0.08)] transition-all overflow-hidden"
              >
                <div className="relative h-72 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                  <img
                    src={d.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/15 via-[#002F6C]/40 to-[#002F6C]/85" />
                  <div className="absolute top-4 right-5">
                    <span className="bg-vibe-pink text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {d.price}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="font-heading tracking-wide text-2xl text-white leading-tight">
                      {d.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-[#002F6C]/65 mb-3">
                    <span className="font-semibold text-[#002F6C]/85">{d.chef}</span> · {d.restaurant}
                  </p>
                  <p className="text-sm text-[#002F6C]/85 leading-relaxed mb-5">{d.description}</p>
                  <div className="grid grid-cols-3 gap-3 text-xs mt-auto pt-4 border-t border-[#002F6C]/10">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/55 mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-vibe-pink" /> Technique
                      </p>
                      <p className="text-[#002F6C]/85 leading-tight">{d.technique}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/55 mb-1 flex items-center gap-1">
                        <Utensils className="w-3 h-3 text-vibe-pink" /> From
                      </p>
                      <p className="text-[#002F6C]/85 leading-tight">{d.traditional}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/55 mb-1 flex items-center gap-1">
                        <Award className="w-3 h-3 text-vibe-pink" /> Twist
                      </p>
                      <p className="text-[#002F6C]/85 leading-tight">{d.innovation}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* === NEW NORDIC TECHNIQUE — long-form === */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            What "New Nordic" actually means
          </p>
          <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-5">
            Five techniques that show up on every Lapland tasting menu.
          </h2>
          <div className="prose prose-lg max-w-none text-[#002F6C]/85 mb-8">
            <p className="leading-relaxed">
              "New Nordic" is a marketing term for what is, on a plate, a specific set of cooking techniques applied to a specific set of ingredients. Strip the branding and you find the five things below — they are what your menu is doing whether the chef calls it New Nordic, Modern Sami, Arctic Cuisine, or just dinner.
            </p>
          </div>
          <div className="space-y-5">
            {[
              {
                t: 'Lacto-fermentation',
                body: 'Salt and time turn raw vegetables and berries into intensely flavoured, mildly acidic preserves. Lacto-fermented bilberries on a meat plate are the classic Lapland move — they cut through the richness of reindeer fat the way capers cut through butter. Look for words like "fermented" or "pickled" on the menu.',
              },
              {
                t: 'Sous-vide',
                body: 'Vacuum-sealing protein and cooking it in temperature-controlled water at exactly the doneness you want. The reason your reindeer fillet is uniformly pink edge to edge with no grey ring around the middle. Slow, precise, and forgiving — and crucial for a cut as lean as reindeer.',
              },
              {
                t: 'Cold curing & cold smoking',
                body: 'Salt-and-sugar cure (graavi) is centuries old; cold smoke is centuries older. New Nordic kitchens combine both. A graavisiika (cured whitefish) cold-smoked for 4 hours is the most-served fish opener in Lapland fine dining. The fish is technically raw and the texture is silken.',
              },
              {
                t: 'Foraged garnish',
                body: 'Wild herbs and edible flowers that no commercial supplier in southern Finland can match for freshness. Wood sorrel, meadowsweet flowers, juniper sprouts, pine shoots, fireweed, angelica — the Lapland forester delivers the finishing touches on the plate. Often picked the same morning.',
              },
              {
                t: 'Whole-ingredient use',
                body: 'A trademark of both Sami food and New Nordic cuisine. Bone marrow becomes a sauce thickener. Fish heads become broth. Reindeer hides go to a tannery, not a bin. Restaurants that take this seriously will tell you on the menu — "from snout to tail" — and the bill reflects it.',
              },
            ].map((tech) => (
              <div key={tech.t} className="rounded-2xl bg-white border border-[#002F6C]/10 p-6 sm:p-7">
                <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-2">{tech.t}</h3>
                <p className="text-sm sm:text-base text-[#002F6C]/80 leading-relaxed">{tech.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#002F6C] py-20 text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading tracking-wide text-3xl sm:text-4xl mb-5">
            Stay near the kitchens.
          </h2>
          <p className="text-base text-white/80 mb-7">
            Lapland’s top restaurants are spread across Rovaniemi, Inari, Levi, and Saariselkä. The cleanest plan: pick a hotel within walking distance of where you want to eat, and let us handle the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AffiliateCTA
              partner="hotels"
              sid="modern_hotels_rovaniemi"
              destination="Rovaniemi, Finland"
              className="inline-flex items-center justify-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              Hotels in Rovaniemi
            </AffiliateCTA>
            <Link
              to="/food-tours"
              className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-full border border-white/40 transition-colors"
            >
              Or book a fine-dining tour
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  )
}
