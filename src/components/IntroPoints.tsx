import { useTranslation } from 'react-i18next';

interface IntroPoint { n: string; title: string; body: string }

/**
 * Lead + three numbered reason cards — the standard top-of-pillar intro.
 * Replaces the old multi-paragraph essays (Vesa 2026-07-07: nobody reads a
 * wall of text at the top of a page). Reads `{sectionKey}.intro.lead` and
 * `{sectionKey}.intro.points` from the pages namespace.
 *
 * Restyled 2026-08-24 (Vesa: "kohta 1–3 … visuaalisuus poor"): the section
 * sits on a soft blue panel with two blurred brand-colour glows so it stops
 * reading as bare white; the lead gets a pink rule above it; the cards are
 * white with a watermark numeral, a pink index chip and a hover lift. Pure
 * CSS, no libraries, transforms only.
 */
export default function IntroPoints({ sectionKey }: { sectionKey: string }) {
  const { t } = useTranslation('pages');
  const points = (t(`${sectionKey}.intro.points`, { returnObjects: true }) as IntroPoint[]) || [];

  return (
    <section className="relative overflow-hidden bg-[#F2F7FC] py-16 sm:py-20">
      {/* Soft depth — decorative only, sits behind the content */}
      <div aria-hidden="true" className="absolute -top-28 -right-24 w-96 h-96 rounded-full bg-[#BFD8F0]/45 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-36 -left-28 w-96 h-96 rounded-full bg-vibe-pink/10 blur-3xl" />
      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <div aria-hidden="true" className="w-10 h-1 rounded-full bg-vibe-pink mb-5" />
        <p className="text-xl sm:text-2xl leading-relaxed font-medium text-[#002F6C] max-w-3xl mb-10">
          {t(`${sectionKey}.intro.lead`)}
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {points.map(p => (
            <div
              key={p.n}
              className="relative overflow-hidden rounded-2xl bg-white border border-[#002F6C]/10 p-6 shadow-[0_6px_24px_rgba(0,47,108,0.06)] hover:border-vibe-pink/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span
                aria-hidden="true"
                className="absolute -top-4 right-2 font-heading text-[92px] leading-none text-[#002F6C]/[0.06] select-none pointer-events-none"
              >
                {p.n}
              </span>
              <span className="relative inline-flex items-center rounded-full bg-vibe-pink/10 text-vibe-pink text-xs font-semibold tracking-[0.14em] px-2.5 py-1 mb-3">
                {p.n}
              </span>
              <h3 className="relative font-heading tracking-wide text-2xl text-[#002F6C] mb-2 leading-tight">{p.title}</h3>
              <p className="relative text-sm text-[#002F6C]/80 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
