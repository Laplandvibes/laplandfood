import { Link } from 'react-router-dom';
import { Award, Sparkles, ChefHat, Star, Wine, Clock, Users, Leaf, MapPin } from 'lucide-react';
import { SEO } from '../hooks/useSEO';
import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import AffiliateCTA from '../components/AffiliateCTA';
const facts = [{
  icon: Award,
  title: 'Helsinki carries the stars',
  body: "Finland's Michelin-listed restaurants are concentrated in Helsinki — every starred Finnish restaurant in recent editions of the Nordic Guide has been in the capital. Turku and Tampere have been on inspectors' radar but stars come and go."
}, {
  icon: Sparkles,
  title: 'Lapland is fine-dining ambitious',
  body: 'Lapland itself does not currently hold a Michelin star, but its premium restaurants — Nili, Aanaar, Rakas — are pushing what a tasting-menu evening looks like inside the Arctic Circle, with foraged ingredients no Helsinki kitchen can match for freshness.'
}, {
  icon: ChefHat,
  title: 'Reservations matter',
  body: 'Lapland flagships are small (often 30–60 covers) and the chef-table seats fill fastest. Book peak winter (mid-Dec → Feb) and the midnight-sun window (Jun 6 → Jul 7) at least 6–8 weeks ahead. Helsinki Michelin rooms regularly have 4–6 week waits.'
}];
const helsinkiRooms = [{
  name: 'Olo',
  where: 'Pohjoisesplanadi, Helsinki',
  angle: 'Long-standing fine-dining institution. Tasting menus rooted in Finnish ingredients with classical Nordic technique.',
  band: '€€€€'
}, {
  name: 'Palace',
  where: '10th floor, Eteläranta — harbour view',
  angle: 'Old-school Helsinki harbour view, modern execution. Classic Finnish fish course (kuha pike-perch) is the signature.',
  band: '€€€€'
}, {
  name: 'Demo',
  where: 'Uudenmaankatu, Helsinki',
  angle: 'Compact tasting-menu room, ingredient-led, often cited in the Guide for value-versus-skill ratio.',
  band: '€€€'
}, {
  name: 'Grön',
  where: 'Albertinkatu, Helsinki',
  angle: 'Plant-led tasting menu (vegetables, fish, foraged) with a tight wine pairing. Books out fastest in the city.',
  band: '€€€€'
}, {
  name: 'Inari',
  where: 'Albertinkatu, Helsinki',
  angle: 'Sami-influenced fine dining — same chef pedigree as Olo, smaller room, more focused.',
  band: '€€€€'
}, {
  name: 'Ora',
  where: 'Huvilakatu, Eira',
  angle: 'Modern Nordic in a residential room. Often praised for chef Sasu Laukkonen’s ingredient-driven menu.',
  band: '€€€€'
}, {
  name: 'Finnjävel',
  where: 'Helsinki',
  angle: 'Modern Finnish — re-imagined classics. Less hushed than the others; more theatrical service.',
  band: '€€€'
}, {
  name: 'Ultima',
  where: 'Helsinki',
  angle: 'Tasting menu sourced from a vertical farm in the basement. The most genuinely "Helsinki 2026" room on this list.',
  band: '€€€€'
}];
const laplandRooms = [{
  name: 'Ravintola Nili',
  city: 'Rovaniemi',
  address: 'Valtakatu 20, central Rovaniemi · 5-minute walk from the train station',
  image: '/images/restaurant-nili.jpg',
  angle: 'The most-cited fine-dining room in Lapland. Sami-rooted plates — sous-vide reindeer fillet with bilberry reduction is the signature — alongside a wild-berry programme that leans on what Inari foragers brought in that morning. Open kitchen, warm wood interior, 60 covers.',
  signature: 'Sous-vide reindeer fillet · pine-cured Arctic char · cloudberry parfait',
  band: '€€€ — tasting menu €68 · à la carte mains €28–€42',
  booking: 'Book 3–4 weeks ahead in summer / December. Walk-ins possible Tue–Wed.',
  sid: 'rovaniemi'
}, {
  name: 'Restaurant Aanaar',
  city: 'Inari',
  address: 'Hotel Kultahovi, Saarikoskentie 2, Inari · on the Juutuanjoki river',
  image: '/images/restaurant-aanaar.jpg',
  angle: 'The closest thing to a destination dining experience deep in Sami country. Chef builds menus around Inari’s eight Sami seasons — lacto-fermented bilberries, smoked reindeer heart, cold-cured Arctic char — and the wine list is unusually deep for a town of 7,000.',
  signature: '7-course wild-berry tasting · smoked reindeer heart · birch-syrup parfait',
  band: '€€€€ — tasting menu €85, with paired wines €145',
  booking: 'Two seatings per night, 32 covers total. Book 6–8 weeks ahead in winter and midnight-sun window.',
  sid: 'inari'
}, {
  name: 'Rakas at Arctic TreeHouse Hotel',
  city: 'Rovaniemi · Santa Park area',
  address: 'Tarvantie 3, 7 km from central Rovaniemi · taxi or hotel shuttle',
  image: '/images/restaurant-rakas.jpg',
  angle: 'Glass-roofed dining room facing north — fully panoramic over the spruce forest, designed so you can watch the aurora during the tasting menu in winter. Confit Arctic whitefish under wild-herb oil is the room’s signature, plated with foraged microgreens and edible flowers.',
  signature: 'Confit Arctic whitefish · pine-cured trout · chocolate–lingonberry dome',
  band: '€€€€ — 4-course menu €78 · 7-course menu €115',
  booking: 'Hotel guests get priority. Non-guests book 4 weeks ahead in winter.',
  sid: 'arctic_treehouse'
}];
const courseFlow = [{
  n: '01',
  label: 'Welcome bites',
  body: 'Two or three small bites at the table — pickled vegetables, smoked fish on rye, a foraged-herb broth shot. Sets the seasonal tone.'
}, {
  n: '02',
  label: 'Cold opener',
  body: 'Arctic char or whitefish in some form — cured, smoked, or as tartare. Almost always with a foraged-herb element.'
}, {
  n: '03',
  label: 'Hot starter',
  body: 'Mushroom or root vegetable dish in autumn; berry or herb-led plate in summer. Where chefs show off their fermentation work.'
}, {
  n: '04',
  label: 'Fish course',
  body: 'Pike-perch, trout, or pike, depending on what the local fishermen brought in. Cooked to centre-pink, with a butter-or-cream sauce.'
}, {
  n: '05',
  label: 'Reindeer or game',
  body: 'The main protein. Fillet sous-vide, slow-braised shoulder, or smoked saddle. Bilberry, lingonberry, or juniper anchor the plate.'
}, {
  n: '06',
  label: 'Cheese (optional)',
  body: 'Aged Finnish cheese — Lappi or Tervaleipäjuusto-style — with a tar-honey or cloudberry preserve.'
}, {
  n: '07',
  label: 'Pre-dessert',
  body: 'A small palate cleanser — birch-sap sorbet, cloudberry consommé, lingonberry granita.'
}, {
  n: '08',
  label: 'Dessert',
  body: 'Cloudberry parfait or chocolate–lingonberry dome are the two most common. Coffee comes in a copper kettle.'
}];
const bookingNotes = [{
  icon: Clock,
  label: 'Plan 3 hours minimum',
  body: 'A full Lapland tasting menu runs 2.5–3.5 hours. Don’t book a 9 PM show afterwards.'
}, {
  icon: Wine,
  label: 'Wine pairing pays off',
  body: 'Most Lapland flagships have a sommelier picking small-producer European wines. Pairings run €45–€95 on top of the menu.'
}, {
  icon: Leaf,
  label: 'Tell them about allergies early',
  body: 'Tasting menus are pre-built and bring complex foraged ingredients. Allergies / vegetarian / vegan: flag at booking, not on the night.'
}, {
  icon: Users,
  label: 'Smart casual',
  body: 'No restaurant in Finland will turn you away in jeans, but the rooms expect an effort. Trainers and hoodies feel out of place.'
}];
export default function MichelinDining() {
  return <><SEO titleKey="michelinDining.title" descriptionKey="michelinDining.description" path={'/michelin-dining'} /><div className="min-h-screen bg-white">
      <Nav />
      <PageHero eyebrow="Pillar 05 · Michelin" title="Michelin" titleHighlight="& fine dining." subtitle="Finland's Michelin scene at a glance — what is starred, where, what is pushing fine dining inside the Arctic Circle, and how to actually book a table." imageUrl="/images/hero-michelin.jpg" imageAlt="Tasting-menu plating with foraged herbs and gold-rimmed dishware on a dark linen table" primaryCta={{
        label: 'Where to book in Lapland',
        href: '/michelin-dining#lapland'
      }} secondaryCta={{
        label: 'Helsinki rooms',
        href: '/michelin-dining#helsinki'
      }} />

      {/* Three structural facts */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              The state of fine dining in Finland
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">
              Three things to know first.
            </h2>
            <p className="text-base sm:text-lg text-[#002F6C]/75 leading-relaxed">
              The Michelin Guide for Nordic countries updates each year — for the current star list always check{' '}
              <a className="text-vibe-pink underline-offset-4 hover:underline" href="https://guide.michelin.com/en/fi/restaurants" target="_blank" rel="noopener">
                guide.michelin.com
              </a>
              . The structural picture below is stable and is the right starting point if you’re planning a fine-dining trip to Finland.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {facts.map(f => <div key={f.title} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-7">
                <f.icon className="w-7 h-7 text-vibe-pink mb-4" />
                <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-2">{f.title}</h3>
                <p className="text-sm text-[#002F6C]/75 leading-relaxed">{f.body}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Helsinki rooms */}
      <section id="helsinki" className="bg-[#F8FAFC] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-2">
                Helsinki Michelin
              </p>
              <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-4">
                Eight rooms worth booking in Helsinki.
              </h2>
              <p className="text-base text-[#002F6C]/75 leading-relaxed">
                Star designations change year to year — verify the current list on the Guide before booking. The eight below are the rooms that have been in or close to the Guide consistently and that travellers come back to talk about. Price band uses the Michelin Guide convention: € (under €40 pp), €€ (€40–€80), €€€ (€80–€140), €€€€ (€140+).
              </p>
            </div>
            <AffiliateCTA partner="hotels" sid="michelin_helsinki" destination="Helsinki, Finland" className="inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm whitespace-nowrap">
              Hotels in Helsinki
            </AffiliateCTA>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {helsinkiRooms.map(r => <div key={r.name} className="rounded-2xl bg-white border border-[#002F6C]/10 p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-heading tracking-wide text-xl text-[#002F6C]">{r.name}</h3>
                  <span className="text-xs font-bold text-vibe-pink whitespace-nowrap mt-1">{r.band}</span>
                </div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-[#002F6C]/55 flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3" /> {r.where}
                </p>
                <p className="text-sm text-[#002F6C]/75 leading-relaxed">{r.angle}</p>
              </div>)}
          </div>
          <p className="text-center text-xs text-[#002F6C]/55 mt-8 max-w-2xl mx-auto">
            Independent editorial. Not affiliated with the Michelin Guide. Star designations and Bib Gourmand listings are valid only as of the current Nordic Guide edition — check guide.michelin.com before you book.
          </p>
        </div>
      </section>

      {/* Lapland flagship rooms */}
      <section id="lapland" className="bg-[#002F6C] py-16 sm:py-20 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              Lapland fine dining
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl mb-5">
              Three rooms to book.
            </h2>
            <p className="text-base text-white/80">
              These are the kitchens that take the cooking seriously enough to compete with Helsinki on plate-craft, while sourcing entirely from Lapland. None hold a Michelin star at the time of writing — but in a five-year horizon any of them could.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {laplandRooms.map(r => <article key={r.name} className="flex flex-col rounded-2xl bg-white/5 border border-white/15 overflow-hidden hover:border-vibe-pink/40 transition-all">
                <div className="relative h-60 bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A] overflow-hidden">
                  <img src={r.image} alt="" loading="lazy" decoding="async" onError={e => {
                  e.currentTarget.style.display = 'none';
                }} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/15 via-[#002F6C]/30 to-[#002F6C]/85" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-semibold bg-vibe-pink text-white px-2.5 py-1 rounded-full">
                      {r.city}
                    </span>
                    <h3 className="font-heading tracking-wide text-2xl text-white leading-tight mt-2">{r.name}</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-white/65 mb-3 flex items-start gap-1.5">
                    <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" /> {r.address}
                  </p>
                  <p className="text-sm text-white/85 leading-relaxed mb-4">{r.angle}</p>

                  <div className="space-y-2 text-xs mb-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-white/55 mb-0.5 flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-vibe-pink fill-vibe-pink" /> Signature plates
                      </p>
                      <p className="text-white/80 leading-snug">{r.signature}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-white/55 mb-0.5">Price band</p>
                      <p className="text-white/80 leading-snug">{r.band}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-white/55 mb-0.5">Booking</p>
                      <p className="text-white/80 leading-snug">{r.booking}</p>
                    </div>
                  </div>

                  <AffiliateCTA partner="hotels" sid={`lapland_room_${r.sid}`} destination={r.city.split('·')[0].trim() + ', Finland'} className="mt-auto block w-full text-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm">
                    Hotels near {r.city.split('·')[0].trim()}
                  </AffiliateCTA>
                </div>
              </article>)}
          </div>
        </div>
      </section>

      {/* What a Michelin meal looks like */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
              What you’re actually paying for
            </p>
            <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-5">
              A Finnish tasting menu, course by course.
            </h2>
            <p className="text-base sm:text-lg text-[#002F6C]/75 leading-relaxed">
              The structure is consistent across both Helsinki Michelin rooms and Lapland’s flagship kitchens. Knowing the rough flow helps you pace the wine, leave room for dessert, and not panic when the bill arrives.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {courseFlow.map(c => <div key={c.n} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-5">
                <p className="font-heading tracking-wide text-2xl text-vibe-pink mb-2">{c.n}</p>
                <h3 className="font-heading tracking-wide text-lg text-[#002F6C] mb-2">{c.label}</h3>
                <p className="text-xs text-[#002F6C]/75 leading-relaxed">{c.body}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Booking notes */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="font-heading tracking-wide text-3xl sm:text-4xl md:text-5xl text-[#002F6C] mb-3 text-center">
            Four things first-timers get wrong.
          </h2>
          <p className="text-base text-[#002F6C]/70 text-center max-w-2xl mx-auto mb-10">
            Lapland kitchens are forgiving. They are still small rooms with chef-led service. These are the four corrections we hand to a friend before their first booking.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bookingNotes.map(n => <div key={n.label} className="rounded-2xl bg-white border border-[#002F6C]/10 p-6">
                <n.icon className="w-6 h-6 text-vibe-pink mb-3" />
                <h3 className="font-heading tracking-wide text-xl text-[#002F6C] mb-2">{n.label}</h3>
                <p className="text-sm text-[#002F6C]/75 leading-relaxed">{n.body}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Stay-near + cross-link CTA */}
      <section id="stay" className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading tracking-wide text-3xl sm:text-4xl text-[#002F6C] mb-5">
            Stay near the kitchens.
          </h2>
          <p className="text-base text-[#002F6C]/75 mb-7">
            For a fine-dining trip the cleanest plan is a hotel within a 10-minute walk (or short taxi) of where you’re eating. Rovaniemi for Nili / Rakas, Inari for Aanaar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <AffiliateCTA partner="hotels" sid="michelin_stay_rovaniemi" destination="Rovaniemi, Finland" className="inline-flex items-center justify-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
              Hotels near Rovaniemi
            </AffiliateCTA>
            <AffiliateCTA partner="hotels" sid="michelin_stay_inari" destination="Inari, Finland" className="inline-flex items-center justify-center border border-[#002F6C]/25 text-[#002F6C] hover:bg-[#002F6C]/5 font-semibold px-7 py-3.5 rounded-full transition-colors">
              Hotels near Inari
            </AffiliateCTA>
          </div>
          <p className="text-sm text-[#002F6C]/70">
            Want a guide who handles the transport, the reservations, and chef introductions for you?{' '}
            <Link to="/food-tours" className="text-vibe-pink underline-offset-4 hover:underline">
              Book an Arctic fine-dining tour
            </Link>
            .
          </p>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div></>;
}