import { useTranslation } from 'react-i18next';

interface IntroPoint { n: string; title: string; body: string }

// Lead + three numbered reason cards — the standard top-of-pillar intro.
// Replaces the old multi-paragraph essays (Vesa 2026-07-07: nobody reads a
// wall of text at the top of a page). Reads `{sectionKey}.intro.lead` and
// `{sectionKey}.intro.points` from the pages namespace.
export default function IntroPoints({ sectionKey }: { sectionKey: string }) {
  const { t } = useTranslation('pages');
  const points = (t(`${sectionKey}.intro.points`, { returnObjects: true }) as IntroPoint[]) || [];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <p className="text-xl sm:text-2xl leading-relaxed font-medium text-[#002F6C] max-w-3xl mb-10">
          {t(`${sectionKey}.intro.lead`)}
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {points.map(p => (
            <div key={p.n} className="rounded-2xl bg-[#F8FAFC] border border-[#002F6C]/10 p-6">
              <p className="font-heading tracking-wide text-3xl text-vibe-pink mb-2">{p.n}</p>
              <h3 className="font-heading tracking-wide text-2xl text-[#002F6C] mb-2 leading-tight">{p.title}</h3>
              <p className="text-sm text-[#002F6C]/80 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
