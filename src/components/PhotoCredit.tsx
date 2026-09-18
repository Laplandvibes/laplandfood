import type { PhotoCredit as Credit } from '../data/photoCredits';

/**
 * Tekijä ja lisenssi kuvan päälle — vain avoimen lisenssin kuville
 * (`src/data/photoCredits.ts`). Omat kuvat eivät saa merkintää.
 * Malli: stayinlapland-new/src/components/PhotoCredit.tsx (18.9.2026).
 *
 * Koko 9–10 px (Vesa 18.9.2026 laplandwellness: *"eikä tuo cc by tartte olla
 * noin isona"*). Kiinteä musta/55-pohja pitää valkoisen tekstin luettavana
 * kuvasta riippumatta. Linkit ovat pieniä, joten `lv-tap` antaa 44 px:n
 * osuma-alueen. `rel` sisältää `noopener` mutta EI `noreferrer` (verkoston sääntö).
 *
 * `label` tuo oman välimerkkinsä ("Kuva: ", "写真："), jotta CJK saa täysleveän kaksoispisteen.
 */
export default function PhotoCredit({ credit, label }: { credit?: Credit; label: string }) {
  if (!credit) return null;
  return (
    <span className="absolute bottom-0 right-0 z-20 max-w-full rounded-tl bg-black/55 px-1.5 py-[2px] text-[9px] sm:text-[10px] leading-tight text-white">
      {credit.place} · {label}
      <a href={credit.sourceUrl} target="_blank" rel="noopener" className="lv-tap underline decoration-white/50 underline-offset-2 hover:decoration-white">
        {credit.author}
      </a>
      {', '}
      <a href={credit.licenseUrl} target="_blank" rel="license noopener" className="lv-tap underline decoration-white/50 underline-offset-2 hover:decoration-white">
        {credit.license}
      </a>
    </span>
  );
}
