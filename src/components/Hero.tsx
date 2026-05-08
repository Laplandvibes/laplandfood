import { Link } from 'react-router-dom'

/**
 * Home Hero — full-bleed image with the Finland-blue overlay convention.
 * One H1, two CTAs (primary internal: Recipes, secondary internal: Local Ingredients).
 */
export default function Hero() {
  return (
    <section className="relative pt-16 min-h-[88svh] overflow-hidden bg-gradient-to-br from-[#1A4A8A] via-[#002F6C] to-[#001F4A]">
      <img
        src="/images/hero-main.jpg"
        alt="Slow-cooked Lapland reindeer stew steaming in a cast-iron pot over an open campfire under a soft Arctic dusk"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#002F6C]/10 via-transparent to-[#002F6C]/55" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 min-h-[88svh] flex flex-col justify-center items-center text-center py-20">
        <p className="text-vibe-pink text-sm md:text-base font-semibold tracking-[0.22em] uppercase mb-5">
          Finnish Food, From the North
        </p>
        <h1 className="font-heading tracking-wide text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] text-white leading-[0.92] mb-7 max-w-5xl">
          HOW FINLAND
          <br />
          <span className="text-vibe-pink drop-shadow-[0_0_40px_rgba(236,72,153,0.5)]">EATS.</span>
        </h1>
        <p className="text-lg md:text-xl text-white/85 max-w-2xl mb-10 leading-relaxed">
          A field guide to Finnish food culture — where the ingredients come from, what the recipes actually taste like, and why the country now has more Michelin stars per capita than its neighbours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            to="/traditional-recipes"
            className="inline-flex items-center justify-center bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base shadow-[0_4px_28px_rgba(236,72,153,0.4)]"
          >
            Explore Traditional Recipes
          </Link>
          <Link
            to="/local-ingredients"
            className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-8 py-4 rounded-full border border-white/40 transition-colors text-base"
          >
            What Grows Up Here
          </Link>
        </div>
      </div>
    </section>
  )
}
