import { Link } from 'react-router-dom';
import { Clock, Users, Flame, ChefHat, ArrowRight } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Traditional Sami Recipes — Authentic Lapland Food Culture',
  about: 'Sami cuisine, traditional Finnish Lapland recipes',
  publisher: {
    '@type': 'Organization',
    name: 'LaplandFood',
    url: 'https://laplandfood.com'
  },
  inLanguage: 'en'
};
const recipes = [{
  name: 'Bidos — Traditional Reindeer Stew',
  difficulty: 'Moderate',
  time: '3–4 hours',
  serves: '6–8 people',
  tradition: 'Sami Heritage',
  image: '/images/recipe-bidos.jpg',
  description: 'Slow-braised reindeer stew — the soul food of Sami culture for centuries. Simple, warming, and deeply nourishing.',
  ingredients: ['1 kg reindeer meat (stewing cut)', '4–5 potatoes, cubed', '2 carrots, sliced', '1 onion, diced', '2 tbsp butter or reindeer fat', 'Salt and black pepper to taste', 'Fresh dill'],
  instructions: ['Cut the reindeer meat into 3–4 cm pieces', 'Heat the fat in a heavy-bottomed pot over medium-high heat', 'Brown the meat thoroughly on all sides', 'Add the onion and sauté until translucent', 'Pour in water to just cover the meat', 'Simmer on low heat for 2–3 hours until the meat is tender', 'Add potatoes and carrots in the last hour', 'Season generously with salt and pepper', 'Garnish with fresh dill and serve'],
  tips: 'Traditionally cooked over an open fire on low heat for a long time — patience is the secret ingredient.'
}, {
  name: 'Gahkku — Sami Flatbread',
  difficulty: 'Easy',
  time: '45 min + rising',
  serves: '1 loaf',
  tradition: 'Ancient Sami Recipe',
  image: '/images/recipe-gahkku.jpg',
  description: 'Simple yet nourishing — a long-lasting bread that has fuelled Arctic journeys for generations.',
  ingredients: ['500 g wheat flour', '250 ml lukewarm water', '1 tsp salt', '1 tsp sugar', '1 sachet dried yeast', '2 tbsp oil'],
  instructions: ['Mix all dry ingredients together', 'Add the lukewarm water and oil', 'Knead into a smooth dough', 'Leave to rise in a warm place for 30 minutes', 'Shape into a round loaf', 'Bake at 225°C for 25–30 minutes', 'The bread is ready when it sounds hollow when tapped'],
  tips: 'Traditionally baked on hot stones or over an open campfire.'
}, {
  name: 'Sápmi Fish Soup',
  difficulty: 'Easy',
  time: '45 minutes',
  serves: '4–6 people',
  tradition: 'Arctic Fishing Culture',
  image: '/images/recipe-fish-soup.jpg',
  description: 'A beloved fish chowder using the cleanest lake fish and wild herbs — a taste of the Arctic shore.',
  ingredients: ['800 g fresh lake fish (whitefish or trout)', '1 litre fish stock or water', '3–4 potatoes, cubed', '1 carrot, sliced', '1 onion', '250 ml cream', 'Fresh dill', 'Salt and white pepper'],
  instructions: ['Clean and fillet the fish', 'Simmer the fish head and bones for stock', 'Strain the stock and return to the pot', 'Add potatoes and carrots', 'Cook for 15 minutes', 'Add fish pieces and onion', 'Cook for a further 10 minutes', 'Stir in cream and dill stems', 'Season with salt and white pepper, add fresh dill to serve'],
  tips: 'Old trick: add dill stems during cooking, fresh leaves only at the very end.'
}, {
  name: 'Wild Berry Kissel',
  difficulty: 'Easy',
  time: '30 minutes',
  serves: '4–6 people',
  tradition: 'Summer Preservation Tradition',
  image: '/images/recipe-kissel.jpg',
  description: "The classic way to enjoy Lapland's wild berries. Packed with antioxidants and bursting with natural Arctic flavour.",
  ingredients: ['500 g mixed berries (bilberries, lingonberries)', '100–150 g sugar to taste', '3 tbsp potato starch', '1 litre water', 'Vanilla sugar'],
  instructions: ['Simmer the berries in water for 10 minutes', 'Blend and strain if desired', 'Add sugar and vanilla sugar', 'Mix potato starch with cold water', 'Stir starch mixture into the hot berry liquid', 'Cook 2–3 minutes until thickened', 'Serve warm or cold'],
  tips: 'Traditionally sweetened with wild honey rather than sugar — try it both ways.'
}];
const culturalContext = [{
  icon: Flame,
  title: 'Energy Efficiency',
  body: 'Recipes designed to minimise fuel and time in a harsh Arctic climate. Slow simmer + high-fat protein = maximum kilocalories per stick of firewood.'
}, {
  icon: Clock,
  title: 'Long Shelf Life',
  body: 'Foods crafted to last without refrigeration or preservatives — drying, smoking, fermenting, and freezing in the snow.'
}, {
  icon: Users,
  title: 'Community',
  body: 'Cooking and sharing food is the central social ritual of Sami life. The pot in the middle of the lavvu (tipi) is, literally, the centre.'
}];
const cookingMethods = [{
  title: 'Open Fire',
  body: 'Grilling and roasting directly over campfire flames'
}, {
  title: 'Earth Oven',
  body: 'Slow underground cooking in earth pits'
}, {
  title: 'Hot Stones',
  body: 'Baking bread on fire-heated flat stones'
}, {
  title: 'Smoking',
  body: 'Preserving meat and fish with cold or hot smoke'
}];
export default function TraditionalRecipes() {
  return <><SEO titleKey="traditionalRecipes.title" descriptionKey="traditionalRecipes.description" path={'/traditional-recipes'} schema={articleSchema} /><div className="min-h-screen bg-white">
      <Nav />

      <PageHero eyebrow="Pillar 02 · Recipes" title="Traditional" titleHighlight="Sami Recipes." subtitle="A deep dive into Sami food heritage. These recipes have sustained people through Arctic winters for thousands of years — each one carrying wisdom, flavour, and a connection to the land." imageUrl="/images/hero-recipes.jpg" imageAlt="Cast iron pot of reindeer stew bubbling over an open campfire at dusk" primaryCta={{
        label: 'Jump to Recipes',
        href: '/traditional-recipes#recipes'
      }} secondaryCta={{
        label: 'Modern Cuisine',
        href: '/modern-lapland'
      }} />

      {/* === LONG-FORM INTRO ESSAY === */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-[#002F6C]/85">
            <p className="text-xl leading-relaxed font-medium text-[#002F6C] mb-6">
              The recipes on this page are not heritage in the sealed-museum sense. They are still cooked.
            </p>
            <p className="leading-relaxed mb-5">
              Walk into a Sami home in Inari or Utsjoki on a Tuesday in November and you will smell <em>bidos</em> on the stove — the same slow-braised reindeer stew the family grandmother cooked, made the same way, with the same cuts, on a heat low enough that the pot barely whispers. The fact that the stove is now electric and the meat comes from a registered cooperative herd does not change the recipe. It changes the timing slightly. That is all.
            </p>
            <p className="leading-relaxed mb-5">
              That continuity is the point. Sami cuisine survived where most pre-industrial Arctic food cultures did not, because it never depended on imported ingredients to taste like itself. Reindeer, lake fish, foraged berries, wild herbs, rye flour, butter, salt — almost everything is sourced within walking distance of where it is eaten. When supply chains break (war, sanctions, pandemic), Lapland’s kitchens keep going. That has been tested in living memory.
            </p>
            <p className="leading-relaxed mb-5">
              The four recipes below are the entry points. <strong>Bidos</strong> is the soul-food protein dish. <strong>Gahkku</strong> is the daily bread. <strong>Sápmi fish soup</strong> uses what came out of the lake that week. <strong>Wild-berry kissel</strong> is dessert and breakfast and a way to preserve the summer. If you cook only these four, you have already covered most of the year of a traditional Sápmi household.
            </p>
            <p className="leading-relaxed">
              Read the cultural context first. The recipes will make more sense — particularly why some of them call for "salt to taste" rather than a number of grams (because in a real Sami kitchen, salt was rationed by what the household had bought down south that autumn). Below the recipes you’ll find the eight Sami seasons in detail, the modern Sami food revival, and the four traditional cooking methods that still show up in fine-dining kitchens across Lapland.
            </p>
          </div>
        </div>
      </section>

      {/* Cultural context */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              The wisdom of Sami food culture
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C]">
              Why the recipes look the way they do.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {culturalContext.map(c => <div key={c.title} className="rounded-2xl bg-[#F8FAFC] p-7 border border-[#002F6C]/10">
                <c.icon className="w-7 h-7 text-vibe-pink mb-4" />
                <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-2">{c.title}</h3>
                <p className="text-sm text-[#002F6C]/75 leading-relaxed">{c.body}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Sápmi context band */}
      <section className="bg-[#002F6C] py-20 text-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              The Sami people & their food heritage
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl mb-5">
              Sápmi — one of Europe’s oldest cuisines.
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              The Sami are the indigenous people of Sápmi — a vast Arctic homeland spanning northern Finland, Sweden, Norway, and Russia. Their cuisine is one of the oldest living food cultures in Europe, shaped entirely by the land, the seasons, and reindeer-herding life.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-white/5 border border-white/15 p-6">
              <h4 className="font-heading tracking-wide text-xl mb-3">Sápmi — the homeland</h4>
              <p className="text-sm text-white/75 leading-relaxed">
                Sápmi covers over 400,000 km² across four nations. Finnish Sápmi (Saamelaisten kotiseutualue) is the northernmost region of Finland — Enontekiö, Inari, and Utsjoki municipalities.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/15 p-6">
              <h4 className="font-heading tracking-wide text-xl mb-3">Sami languages</h4>
              <p className="text-sm text-white/75 leading-relaxed">
                There are nine living Sami languages. North Sami is the most widely spoken. Many traditional recipe names — like <em>bidos</em> and <em>gahkku</em> — come straight from North Sami.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/15 p-6">
              <h4 className="font-heading tracking-wide text-xl mb-3">Eight seasons, not four</h4>
              <p className="text-sm text-white/75 leading-relaxed">
                Sami timekeeping divides the year into eight seasons. Each one fixes what is on the table — ice-fishing in polar night, cloudberry picking in midsummer, mushrooms before the first frost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recipes */}
      <section id="recipes" className="bg-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              Authentic recipes
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C]">
              Four recipes to start with.
            </h2>
          </div>

          <div className="space-y-12">
            {recipes.map(r => <article key={r.name} className="rounded-3xl bg-[#F8FAFC] border border-[#002F6C]/10 overflow-hidden">
                <div className="relative h-56 sm:h-72 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                  <img src={r.image} alt="" loading="lazy" decoding="async" onError={e => {
                  e.currentTarget.style.display = 'none';
                }} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/10 via-[#002F6C]/30 to-[#002F6C]/85" />
                  <div className="absolute bottom-5 left-7 sm:left-9 right-7 sm:right-9">
                    <span className="text-[11px] uppercase tracking-[0.18em] font-semibold bg-vibe-pink text-white px-3 py-1.5 rounded-full">
                      {r.tradition}
                    </span>
                    <h3 className="font-heading tracking-wide text-3xl sm:text-4xl text-white leading-tight mt-3">
                      {r.name}
                    </h3>
                  </div>
                </div>
                <header className="p-7 sm:p-9 border-b border-[#002F6C]/10">
                  <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed">{r.description}</p>
                </header>

                <div className="p-7 sm:p-9 space-y-7">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <Clock className="w-5 h-5 text-vibe-pink mx-auto mb-1.5" />
                      <p className="text-xs uppercase tracking-wider text-[#002F6C]/60 font-semibold">Time</p>
                      <p className="text-sm text-[#002F6C] font-semibold mt-0.5">{r.time}</p>
                    </div>
                    <div>
                      <Users className="w-5 h-5 text-vibe-pink mx-auto mb-1.5" />
                      <p className="text-xs uppercase tracking-wider text-[#002F6C]/60 font-semibold">Serves</p>
                      <p className="text-sm text-[#002F6C] font-semibold mt-0.5">{r.serves}</p>
                    </div>
                    <div>
                      <ChefHat className="w-5 h-5 text-vibe-pink mx-auto mb-1.5" />
                      <p className="text-xs uppercase tracking-wider text-[#002F6C]/60 font-semibold">Level</p>
                      <p className="text-sm text-[#002F6C] font-semibold mt-0.5">{r.difficulty}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-7">
                    <div>
                      <h4 className="font-heading tracking-wide text-xl text-[#002F6C] mb-3">Ingredients</h4>
                      <ul className="space-y-2">
                        {r.ingredients.map(ing => <li key={ing} className="flex gap-2.5 text-sm text-[#002F6C]/85">
                            <span className="w-1.5 h-1.5 rounded-full bg-vibe-pink mt-2 flex-shrink-0" />
                            {ing}
                          </li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-heading tracking-wide text-xl text-[#002F6C] mb-3">Instructions</h4>
                      <ol className="space-y-3">
                        {r.instructions.map((step, i) => <li key={step} className="flex gap-3 text-sm text-[#002F6C]/85">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-vibe-pink/15 text-vibe-pink text-xs font-bold flex items-center justify-center">
                              {i + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>)}
                      </ol>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white border-l-4 border-vibe-pink p-5">
                    <p className="text-xs uppercase tracking-[0.18em] font-semibold text-vibe-pink mb-1">
                      Traditional tip
                    </p>
                    <p className="text-sm text-[#002F6C]/80 italic leading-relaxed">{r.tips}</p>
                  </div>
                </div>
              </article>)}
          </div>
        </div>
      </section>

      {/* === EIGHT SAMI SEASONS — long-form === */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              The Sami calendar
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">
              Eight seasons, eight pantries.
            </h2>
            <p className="text-base sm:text-lg text-[#002F6C]/80 leading-relaxed mb-4">
              The four-season calendar is a temperate-Europe assumption. The Sami divide the year into eight, each tied to what the reindeer are doing, what the lake looks like, and what is ripe in the forest. If you want to understand why a Sami kitchen looks the way it looks, you start here.
            </p>
            <p className="text-base text-[#002F6C]/75 leading-relaxed">
              The names below are the North Sami originals. The dates are approximate — Sápmi’s seasons run more on phenology (what the land is doing) than on the calendar.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[{
              sami: 'Dálvi',
              en: 'Winter',
              when: 'Dec – Feb',
              body: 'Polar night and the deepest cold. Reindeer are in the winter pastures, scraping for lichen under the snow. The household lives off what was preserved in autumn: dried reindeer (suovas), salted fish, frozen berries, rye flour. Bidos is the everyday dinner — slow-cooked fat protein that keeps people warm.'
            }, {
              sami: 'Giđđadálvi',
              en: 'Spring-winter',
              when: 'Mar – Apr',
              body: 'The light comes back. Reindeer calving begins; herders move with the herd. Ice fishing is at its best — the sun is out long enough to fish on the lake without freezing, and the fish are still under thick ice. Smoked whitefish dominates. Days lengthen 7 minutes per day.'
            }, {
              sami: 'Giđđa',
              en: 'Spring',
              when: 'May',
              body: 'Snowmelt. The reindeer move toward summer pastures. The first young birch leaves and nettle shoots appear — the first fresh greens in seven months. Birch sap is collected and either drunk fresh or fermented. The first eggs from migrating birds arrive.'
            }, {
              sami: 'Giđđageassi',
              en: 'Spring-summer',
              when: 'Jun',
              body: 'The first half of the midnight sun. Reindeer give birth; calves run. The ground is finally warm enough for wild herbs (meadowsweet, yarrow, angelica). Baked goods replace stews. Fresh dairy and butter return from the mountain pastures.'
            }, {
              sami: 'Geassi',
              en: 'Summer',
              when: 'Jul',
              body: 'Full midnight sun. The cloudberry harvest — three to six weeks where families spend whole evenings in the bog picking. Herbs are dried for winter; berries are jammed, frozen, or fermented. Lake fishing is daily. The kitchen barely closes.'
            }, {
              sami: 'Čakčageassi',
              en: 'Autumn-summer',
              when: 'Aug – early Sep',
              body: 'Bilberry and lingonberry season. Mushrooms emerge — porcini, milkcaps, chanterelle. Days are still long; nights start to cool. The reindeer are at peak weight. The pantry fills up: jams, salted fish, dried mushrooms, frozen berries.'
            }, {
              sami: 'Čakča',
              en: 'Autumn',
              when: 'Sep – Oct',
              body: 'The slaughter season. Reindeer are gathered; herders select which animals to slaughter for winter. Meat is processed: smoked, dried (suovas), and frozen. This is the protein bank that has to last seven months. The first frosts sweeten the lingonberries.'
            }, {
              sami: 'Čakčadálvi',
              en: 'Autumn-winter',
              when: 'Nov',
              body: 'The dark returns. Snow settles. Final preserving work — salt fish, lay down jams, take stock. The kitchen leans on warmth: stews, soups, baked rye breads, hot berry juices. The bidos pot is on the stove most days.'
            }].map(s => <div key={s.sami} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6 sm:p-7">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-heading tracking-wide text-2xl text-[#002F6C]">
                    {s.sami} <span className="text-vibe-pink font-semibold text-base">/ {s.en}</span>
                  </h3>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#002F6C]/60">{s.when}</span>
                </div>
                <p className="text-sm text-[#002F6C]/80 leading-relaxed">{s.body}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* === MODERN SAMI FOOD REVIVAL — long-form === */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            Modern Sami food revival
          </p>
          <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-6">
            Why the recipes are coming back.
          </h2>
          <div className="prose prose-lg max-w-none text-[#002F6C]/85">
            <p className="leading-relaxed mb-5">
              For most of the 20th century, Sami food existed in two parallel realities. In Sami homes it was just dinner — unselfconscious, unromanticised, the same food the previous generation cooked. Outside Sápmi it was almost invisible: a footnote in tourism brochures, occasionally exoticised, more often ignored.
            </p>
            <p className="leading-relaxed mb-5">
              The reversal started in the late 2000s. New Nordic cuisine, kicked off by Copenhagen’s Noma, made foraged, hyper-local, indigenous-northern food briefly fashionable in fine-dining rooms across Scandinavia. Finnish chefs noticed that the cuisine the rest of the world was getting excited about — wild herbs, lacto-fermented berries, smoked fish, slow-cooked game — had been on Sami plates for a thousand years. The pipeline ran the other way for a while: Sami techniques and ingredients flowed into Helsinki tasting menus.
            </p>
            <p className="leading-relaxed mb-5">
              Then the Sami food world started reclaiming the conversation. Restaurant Aanaar in Inari built a fine-dining programme that is unapologetically Sami first and gastronomic second. The Slow Food Sápmi chapter pushed for protected status for traditional products like <em>suovas</em> (cold-smoked reindeer) and <em>guompa</em> (fermented angelica). Sami chefs started training Sami apprentices instead of sending them to French-classical kitchens. The 2017 Indigenous Terra Madre summit in Inari — global indigenous-food gathering — was a turning point.
            </p>
            <p className="leading-relaxed mb-5">
              The current moment is interesting. Sami food is on Helsinki Michelin-listed menus and on the everyday table in Utsjoki, but the recipes are converging less than you’d expect. The fine-dining versions get the technique upgrade — sous-vide, lacto-fermentation, foraged-flower garnish. The home versions stay almost unchanged. Both are valid. The recipes on this page are the home versions.
            </p>
            <p className="leading-relaxed">
              If you want to taste the fine-dining interpretation, head to <Link to="/modern-lapland" className="text-vibe-pink underline-offset-4 hover:underline">Modern Lapland</Link>. If you want to taste the home version cooked by someone who grew up cooking it, the <Link to="/food-tours" className="text-vibe-pink underline-offset-4 hover:underline">Sami Culture Food Journey</Link> on the Tours page is the closest thing to an introduction.
            </p>
          </div>
        </div>
      </section>

      {/* Cooking methods */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              How a pre-stove kitchen worked
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl text-[#002F6C] mb-4">
              Four traditional cooking methods.
            </h2>
            <p className="text-[#002F6C]/75 leading-relaxed">
              All four still show up in fine-dining kitchens across Lapland — chefs use them because they produce flavours nothing modern can replicate. Open fire creates a Maillard reaction at temperatures sous-vide cannot touch. Hot stones bake bread with a specific dryness. Earth ovens braise on retained heat alone. Smoking is, in 2026, still the simplest preservation method humans have.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {cookingMethods.map(m => <div key={m.title} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6 text-center">
                <h3 className="font-heading tracking-wide text-xl text-[#002F6C] mb-2">{m.title}</h3>
                <p className="text-sm text-[#002F6C]/70">{m.body}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-6">
            Cook it at home — or have someone teach you in person.
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/food-tours" className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
              Cooking experiences <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/local-ingredients" className="inline-flex items-center justify-center gap-2 border border-[#002F6C]/25 text-[#002F6C] hover:bg-[#002F6C]/5 font-semibold px-7 py-3.5 rounded-full transition-colors">
              Local ingredients
            </Link>
            <Link to="/modern-lapland" className="inline-flex items-center justify-center gap-2 border border-[#002F6C]/25 text-[#002F6C] hover:bg-[#002F6C]/5 font-semibold px-7 py-3.5 rounded-full transition-colors">
              Modern interpretations
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div></>;
}