import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../i18n/useLocale';

export interface FAQItem {
  question: string;
  answer: string;
}

// Per-question deep links into the pillar pages that back each answer
// (network rule: FAQ answers must link to our own supporting content).
// Keys are nav.links entries → labels come pre-translated in all 11 locales.
const FAQ_ROUTE = {
  ingredients: '/local-ingredients',
  recipes: '/traditional-recipes',
  modern: '/modern-lapland',
  foraging: '/foraging-guide',
  michelin: '/michelin-dining',
  foodTours: '/food-tours',
} as const;
const FAQ_LINKS: (keyof typeof FAQ_ROUTE)[][] = [
  ['recipes', 'ingredients'],   // 1 what traditional Finnish food is like
  ['michelin', 'modern'],       // 2 Michelin stars in Finland / Lapland
  ['recipes', 'foodTours'],     // 3 Sami food → recipes + Sami food journeys
  ['foraging', 'foodTours'],    // 4 everyman's right → foraging + guided walks
  ['foraging', 'ingredients'],  // 5 cloudberry season → calendar + deep dive
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation('pages');
  const { t: tNav } = useTranslation('nav');
  const { to } = useLocale();
  const items = (t('home.faq.items', { returnObjects: true }) as FAQItem[]) || [];

  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-vibe-pink text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
            {t('home.faq.eyebrow')}
          </p>
          <h2 className="font-heading tracking-wide text-4xl sm:text-5xl md:text-6xl text-[#002F6C] mb-4">
            {t('home.faq.headline')}
          </h2>
          <p className="text-base sm:text-lg text-[#002F6C]/70">
            {t('home.faq.lead')}
          </p>
        </div>

        <div className="space-y-3">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden transition-colors duration-300 border ${
                  isOpen
                    ? 'bg-[#F8FAFC] border-vibe-pink/40'
                    : 'bg-white border-[#002F6C]/10 hover:border-[#002F6C]/25'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-4 px-5 sm:px-6 py-5 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <span className="font-heading tracking-wide text-lg text-vibe-pink/60 shrink-0 leading-tight pt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-medium text-[#002F6C] text-base sm:text-lg leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen ? 'rotate-180 text-vibe-pink' : 'text-[#002F6C]/50'
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pl-14 sm:pl-16">
                    <p className="text-[#002F6C]/75 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                    {(FAQ_LINKS[index] ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                        {FAQ_LINKS[index].map((key) => (
                          <Link
                            key={key}
                            to={to(FAQ_ROUTE[key])}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-vibe-pink hover:text-[#002F6C] transition-colors"
                          >
                            {tNav(`links.${key}`)} <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-[#002F6C]/60 mt-10">
          {t('home.faq.stillPrefix')}
          <a href="mailto:info@laplandvibes.com" className="text-vibe-pink underline-offset-4 hover:underline">
            info@laplandvibes.com
          </a>
          {t('home.faq.stillSuffix')}
        </p>
      </div>
    </section>
  );
}
