import { useTranslation } from 'react-i18next';
import type { PhotoCredit } from '../data/photoCredits';

/** Sulkeet: ja ja zh täysleveinä verkoston kanonin mukaan, muissa välilyönti eteen. */
const PARENS: Record<string, [string, string]> = { ja: ['（', '）'], 'zh-CN': ['（', '）'] };

/**
 * Pienten korttien ruudukon kuvalähteet yhtenä rivinä ruudukon alla, korttien järjestyksessä:
 * "Kuvat: Avotuli (Isojärvi, kallerna, CC BY-SA 4.0) · Kuumat kivet (…)" (19.10.2026).
 *
 * Vesa 26.9.2026: korttiruudukossa tekijä- ja lisenssimerkintä ei kuulu kuvan päälle, vaan yhdeksi
 * riviksi ruudukon alle. /traditional-recipes-sivun menetelmäkortit ovat puhelimella 162 × 112 px,
 * ja Museoviraston kuvan nelirivinen merkintä peitti kuvan lähes kokonaan. Malli
 * laplanddining-new/src/components/GridPhotoCredits.tsx.
 *
 * 🔴 16 px ja muste /75: yli 80 merkin lähderivi on §33:n mukaan leipätekstiä (portti `kuvateksti`).
 * Hillitty = paikka ja väri, ei pieni koko. Tekijä ja lisenssi linkkeinä (CC BY / BY-SA vaatii).
 * `data-lv-kuvalahteet`: mittarit löytävät rivin tällä attribuutilla.
 */
export default function GridPhotoCredits({ items, className = '' }: { items: { title: string; credit?: PhotoCredit }[]; className?: string }) {
  const { t, i18n } = useTranslation('common');
  const list = items.filter((it): it is { title: string; credit: PhotoCredit } => !!it.credit);
  if (list.length === 0) return null;
  const [open, close] = PARENS[i18n.language] ?? [' (', ')'];
  return (
    <p data-lv-kuvalahteet="" className={`text-center text-base leading-snug text-[#002F6C]/75 ${className}`}>
      {list.length > 1 ? t('photo.labelMany') : t('photo.label')}
      {list.map((it, i) => (
        <span key={it.title}>
          {i > 0 && <>&nbsp;· </>}
          {it.title}
          {open}
          {it.credit.place ? `${it.credit.place}, ` : ''}
          <a href={it.credit.sourceUrl} target="_blank" rel="noopener" className="lv-tap underline decoration-[#002F6C]/40 underline-offset-2 hover:text-[#002F6C]">
            {it.credit.author}
          </a>
          ,{' '}
          <a href={it.credit.licenseUrl} target="_blank" rel="license noopener" className="lv-tap whitespace-nowrap underline decoration-[#002F6C]/40 underline-offset-2 hover:text-[#002F6C]">
            {it.credit.license}
          </a>
          {it.credit.modified ? `, ${t('photo.modified')}` : ''}
          {close}
        </span>
      ))}
    </p>
  );
}
