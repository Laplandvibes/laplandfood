import { Link } from 'react-router-dom';
import { Leaf, Thermometer } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
const ingredients = [{
  name: 'Reindeer & Venison',
  season: 'Year-round · best Oct–Mar',
  description: 'The heart of Arctic cuisine. Free-roaming reindeer raised in pristine wilderness — the most important protein in Sami culture for thousands of years.',
  nutritional: 'High protein, low fat, rich in B12 and iron',
  uses: 'Grilling, drying, smoking, slow-cooked stews',
  image: '/images/ingredient-reindeer.jpg'
}, {
  name: 'Bilberries & Lingonberries',
  season: 'August–September',
  description: 'Arctic superberries bursting with antioxidants. Wild-grown under the midnight sun in the tundra and boreal forest.',
  nutritional: 'Antioxidants, vitamin C, dietary fibre',
  uses: 'Jams, juices, baking, drying',
  image: '/images/ingredient-berries.jpg'
}, {
  name: 'Wild Mushrooms — Porcini & Milkcaps',
  season: 'July–September',
  description: "Forest gold from Lapland's old-growth forests. Traditionally dried for winter preserves.",
  nutritional: 'Protein, fibre, vitamin D',
  uses: 'Drying, preserving, soups, sauces',
  image: '/images/ingredient-mushrooms.jpg'
}, {
  name: 'Arctic Freshwater Fish',
  season: 'Year-round · winter ice-fishing',
  description: 'Crystal-clear lake fish — whitefish, pike, perch, trout. Ice fishing is a beloved winter tradition across Lapland.',
  nutritional: 'Omega-3 fatty acids, high protein, phosphorus',
  uses: 'Smoking, salting, grilling, chowder',
  image: '/images/ingredient-fish.jpg'
}, {
  name: 'Wild Herbs — Meadowsweet & Nettle',
  season: 'June–August',
  description: 'The power of wild plants. Traditional medicinal and culinary herbs used in Sami culture for generations.',
  nutritional: 'Minerals, vitamins, flavonoids',
  uses: 'Tea, salads, soups, drying',
  image: '/images/ingredient-herbs.jpg'
}, {
  name: 'Arctic Cloudberries',
  season: 'Mid-July to mid-August',
  description: 'The golden jewel of Lapland. Grows only in Arctic bogs and marshes — one of the rarest and most prized wild berries in the world.',
  nutritional: 'Vitamin C, vitamin E, omega-3 fatty acids',
  uses: 'Jams, desserts, liqueur, fresh eating',
  image: '/images/ingredient-cloudberries.jpg'
}];
export default function LocalIngredients() {
  return <><SEO title={'Local Ingredients of Lapland | Reindeer, Berries, Fish, Foraged Herbs | LaplandFood'} description={'What actually grows, swims, and grazes in Finnish Lapland — six core ingredients with seasons, sourcing, and how they end up on the plate.'} path={'/local-ingredients'} /><div className="min-h-screen bg-white">
      <Nav />
      <PageHero eyebrow="Pillar 01 · Ingredients" title="What grows" titleHighlight="up here." subtitle="Six ingredients that define Lapland’s pantry — where they come from, when they peak, and what they actually taste like." imageUrl="/images/hero-ingredients.jpg" imageAlt="Foraged cloudberries, lingonberries, and wild mushrooms arranged on rough birch wood at the edge of an Arctic forest" primaryCta={{
        label: 'Foraging guide',
        href: '/foraging-guide'
      }} secondaryCta={{
        label: 'Recipes that use these',
        href: '/traditional-recipes'
      }} />

      {/* === LONG-FORM INTRO === */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-[#002F6C]/85">
            <p className="text-xl leading-relaxed font-medium text-[#002F6C] mb-6">
              The Lapland pantry is short. That is its strength.
            </p>
            <p className="leading-relaxed mb-5">
              You can list every ingredient that defines Lapland cooking on one hand of fingers — reindeer, lake fish, foraged berries, foraged mushrooms, wild herbs, dairy. There is no hidden 30th ingredient that unlocks the cuisine. The skill is in what people learned to do with a small palette over a thousand years of Arctic winters: how to dry it, smoke it, ferment it, lacto-pickle it, slow-cook it, get it through to March without a refrigerator.
            </p>
            <p className="leading-relaxed mb-5">
              Almost everything on the cards below is wild. That distinguishes Lapland cuisine from almost every other food culture in Europe. Reindeer are technically herded, but they live on tens of thousands of square kilometres of unfenced wilderness; the herder’s job is to keep track of them, not feed them. Berries and mushrooms cannot be cultivated commercially in Lapland — the climate is too short and too wet — so the entire supply is foraged. Lake fish are caught one rod at a time, often through ice. The supply chain from forest floor to plate is sometimes literally a few hours.
            </p>
            <p className="leading-relaxed mb-5">
              That has consequences for flavour. Wild ingredients vary year to year and place to place in a way cultivated ones don’t. The cloudberries from a bog above Inari taste different from cloudberries 80 kilometres south above Saariselkä — different acidity, different sugar, different perfume. A reindeer that spent the autumn on the lichen plateau above Utsjoki tastes different from one that grazed mushroom flushes near Rovaniemi. Sami chefs and home cooks have always treated this as a feature: you cook around what the ingredient is doing this year, not a fixed recipe.
            </p>
            <p className="leading-relaxed">
              The six ingredient cards below are the foundation. Below them you’ll find longer essays on the three that visitors most often ask about — reindeer (the supply chain, the ethics, the cuts), cloudberries (why nobody can farm them and what that means for price), and lake fish (the role of ice fishing in winter). Then a final section on the everyman’s right that ties this whole pantry together legally and culturally.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {ingredients.map(i => <article key={i.name} className="flex flex-col rounded-2xl bg-white border border-[#002F6C]/10 hover:border-vibe-pink/40 hover:shadow-[0_10px_32px_rgba(0,47,108,0.08)] transition-all overflow-hidden">
                <div className="relative h-60 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                  <img src={i.image} alt="" loading="lazy" decoding="async" onError={e => {
                  e.currentTarget.style.display = 'none';
                }} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/15 via-[#002F6C]/35 to-[#002F6C]/85" />
                  <div className="absolute top-3 right-4">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-semibold bg-vibe-pink text-white px-2.5 py-1 rounded-full">
                      {i.season}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-5 right-5">
                    <h2 className="font-heading tracking-wide text-xl text-white leading-tight">{i.name}</h2>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-sm text-[#002F6C]/85 leading-relaxed mb-4">{i.description}</p>
                  <div className="grid grid-cols-1 gap-2.5 text-xs mt-auto pt-3 border-t border-[#002F6C]/10">
                    <div className="flex gap-2">
                      <Leaf className="w-3.5 h-3.5 text-vibe-pink mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/55">Nutrition: </span>
                        <span className="text-[#002F6C]/85">{i.nutritional}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Thermometer className="w-3.5 h-3.5 text-vibe-pink mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#002F6C]/55">Used in: </span>
                        <span className="text-[#002F6C]/85">{i.uses}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>)}
          </div>
        </div>
      </section>

      {/* === DEEP DIVE: REINDEER === */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            Deep dive · Reindeer
          </p>
          <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-5">
            How a reindeer ends up on a Lapland plate.
          </h2>
          <div className="prose prose-lg max-w-none text-[#002F6C]/85">
            <p className="leading-relaxed mb-5">
              Finland’s reindeer industry is regulated under the Reindeer Husbandry Act, which restricts ownership to people domiciled in the reindeer-herding area (effectively northern Finland). Animals belong to individual herders but graze together in cooperatives — <em>paliskunnat</em> — that share territory and labour. There are around 200,000 reindeer across roughly 54 cooperatives, all in Lapland and parts of Northern Ostrobothnia.
            </p>
            <p className="leading-relaxed mb-5">
              The herd is wild in everything but ownership. Reindeer roam freely across enormous stretches of unfenced taiga and tundra, eating what they find: lichen in winter (the diet that gives the meat its specific clean flavour), grasses and herbs in summer, mushroom flushes in autumn. Herders track their animals on snowmobiles and quad bikes, gather them twice a year for ear-marking and (in autumn) selection for slaughter, then let them disperse again.
            </p>
            <p className="leading-relaxed mb-5">
              The slaughter happens in autumn, typically October–November, when the animals are at peak weight. Each cooperative runs its own EU-approved slaughterhouse. Most of the meat is sold within a few hundred kilometres of where the animal lived — to Lapland restaurants, to specialist butchers in Helsinki and the rest of southern Finland, and to a small but serious export market in central Europe.
            </p>
            <p className="leading-relaxed mb-5">
              <strong>The cuts you’ll see on a Lapland menu</strong> map roughly to a beef vocabulary: <em>fileé</em> (fillet, sous-vide territory), <em>sisäpaisti / ulkopaisti</em> (silverside / topside, roasted whole or sliced for hot-smoked dishes), <em>poronkäristys</em> (sautéed reindeer, the everyday Finnish workhorse — thin slices, butter, salt, served on mash with lingonberry), and <em>suovas</em> (cold-smoked saddle, eaten in slivers with rye bread). Bidos uses tougher stewing cuts — typically shoulder and shank — which is why it cooks for hours.
            </p>
            <p className="leading-relaxed">
              Ethically, free-range Sami-herded reindeer is one of the most sustainable proteins on a European menu — no feedlot, no antibiotics, no enclosed grazing, native diet. The complication is climate: Lapland winters are getting wetter, ice layers form on the snowpack, reindeer cannot scrape through to lichen, and herders are having to supplementally feed in some cooperatives. That changes the supply chain and, slowly, the flavour. It is a story to watch over the next decade.
            </p>
          </div>
        </div>
      </section>

      {/* === DEEP DIVE: CLOUDBERRY === */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            Deep dive · Cloudberry
          </p>
          <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-5">
            The berry nobody can farm.
          </h2>
          <div className="prose prose-lg max-w-none text-[#002F6C]/85">
            <p className="leading-relaxed mb-5">
              Cloudberry — <em>hilla</em> in Finnish, <em>luomi</em> in North Sami — is the most prized wild berry in Lapland and the most stubbornly uncultivated of the world’s significant berries. It grows only in cold, acidic, waterlogged peat bogs in a narrow band of the northern hemisphere: northern Scandinavia, Finland, parts of Russia, Alaska, and northern Canada. Inside those zones it is surprisingly common. Outside them, it does not grow.
            </p>
            <p className="leading-relaxed mb-5">
              Decades of agricultural research have failed to commercialise it. Cloudberry plants are dioecious (separate male and female), grow extremely slowly, take 6–7 years to fruit even when conditions are perfect, are vulnerable to late spring frosts that destroy the year’s flowers, and need a specific combination of moisture, light, and bog chemistry that has resisted greenhouse simulation. Norwegian and Finnish researchers have made progress on cultivars but commercial yields are still a fraction of wild yields. So the entire Finnish supply — for jam manufacturers, liqueur producers (Lakka), restaurant kitchens — is wild-foraged.
            </p>
            <p className="leading-relaxed mb-5">
              That is why a kilo of fresh cloudberries at a Rovaniemi market in late July typically runs €25–€50 — five to ten times the price of bilberries — and why supply collapses if the spring frost comes a week late. It is also why cloudberry parfait is the Lapland fine-dining dessert. Every chef wants to use them while they last.
            </p>
            <p className="leading-relaxed">
              <strong>Picking ethic:</strong> cloudberry plants are slow to recover. The Sami principle — and the Finnish foraging convention — is to take fully ripe berries only, leave the unripe and overripe ones, and never strip a plant. If you’re foraging on a small bog, a kilo per family is plenty.
            </p>
          </div>
        </div>
      </section>

      {/* === DEEP DIVE: LAKE FISH + ICE FISHING === */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            Deep dive · Lake fish
          </p>
          <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-5">
            Why ice fishing produces the best fish of the year.
          </h2>
          <div className="prose prose-lg max-w-none text-[#002F6C]/85">
            <p className="leading-relaxed mb-5">
              Lapland sits on roughly 6,000 lakes, every one of them clean enough to drink from on a long-distance hike. The four fish that matter on the plate are <strong>whitefish (siika)</strong>, <strong>pike (hauki)</strong>, <strong>perch (ahven)</strong>, and <strong>brown trout / Arctic char (taimen / nieriä)</strong>. All four are native, all four are caught in commercial quantity by both small fishermen and ice-fishing enthusiasts, all four show up in different forms on Lapland menus.
            </p>
            <p className="leading-relaxed mb-5">
              Ice fishing — <em>pilkkiminen</em> — is more than a local hobby. It is the fishing method that produces the most flavourful Arctic lake fish of the year. Here is why: in winter, lake water is at its coldest and clearest. Fish metabolisms slow down, fat deposits firm up, and parasites die off (no warm-water vectors). The flesh of an ice-caught whitefish in February is denser, sweeter, and cleaner-tasting than the same fish caught in July. Lapland chefs schedule their menus around it.
            </p>
            <p className="leading-relaxed mb-5">
              The technique itself is straightforward — auger a hole through 50–80 cm of ice, drop a small jig with a single hook, wait — but it requires temperatures often colder than &minus;15 °C. The traditional Sami approach involved sealing the hole between visits to keep the warm under-ice water from refreezing the rod. Today most people use insulated tents (a small ice-fishing shelter is cheap and changes the experience completely).
            </p>
            <p className="leading-relaxed">
              On a menu: lightly smoked whitefish (<em>graavisiika</em>) and pike-roe-on-rye are everyday Lapland starters. A whole roasted brown trout is the classic main. Sápmi fish soup (recipe on the <Link to="/traditional-recipes" className="text-vibe-pink underline-offset-4 hover:underline">recipes page</Link>) uses whatever the fishermen brought in that week.
            </p>
          </div>
        </div>
      </section>

      {/* === EVERYMAN'S RIGHT === */}
      <section className="bg-[#002F6C] py-16 sm:py-20 text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            Everyman’s right
          </p>
          <h2 className="font-heading tracking-wide text-4xl sm:text-5xl mb-5">
            The legal framework that makes this all possible.
          </h2>
          <p className="text-base text-white/85 leading-relaxed mb-5">
            Almost every ingredient on this page is, legally, free. Finland’s <em>jokamiehenoikeus</em> (everyman’s right) is a centuries-old, codified principle that lets anyone — citizen or visitor — walk on, camp on, and forage from most land in Finland regardless of who owns it. You can pick berries, mushrooms, and wild herbs on private land without asking. You can fish with a single rod without a permit. You can sleep one night on most land without asking.
          </p>
          <p className="text-base text-white/85 leading-relaxed mb-7">
            What you cannot do: damage trees, hunt, drive a vehicle off-road, collect protected plants, light an open fire on someone’s land without permission, or pick from a cultivated garden. The principle is access without harm. It is one of the few legal frameworks in Europe that treats wild food as a shared resource, and it is the structural reason Lapland’s food culture survived modernisation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/foraging-guide" className="inline-flex items-center justify-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
              Read the foraging guide
            </Link>
            <Link to="/food-tours" className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-full border border-white/40 transition-colors">
              Or book a guided foraging walk
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div></>;
}