/**
 * FTC / DSA / consumer-protection-compliant affiliate disclosure.
 * Three variants:
 *   - 'light'  — for the blue/white food pages (white text on #002F6C band)
 *   - 'dark'   — for deep-night sections (snow/40 muted)
 *   - 'inline' — emphasised before-CTA notice on a light page section
 */
import { useTranslation } from 'react-i18next'

interface AffiliateDisclosureProps {
  variant?: 'light' | 'dark' | 'inline'
  className?: string
}

export default function AffiliateDisclosure({
  variant = 'light',
  className = '',
}: AffiliateDisclosureProps) {
  const { t } = useTranslation('common')
  const text = t('affiliateDisclosure.page')

  if (variant === 'inline') {
    return (
      <p
        className={`text-xs italic leading-relaxed max-w-3xl mx-auto px-4 text-[#002F6C]/65 ${className}`}
        role="note"
      >
        <span aria-hidden="true">ⓘ </span>
        {text}
      </p>
    )
  }
  if (variant === 'dark') {
    return (
      <p className={`text-[11px] text-snow/40 leading-relaxed ${className}`} role="note">
        <span aria-hidden="true">ⓘ </span>
        {text}
      </p>
    )
  }
  return (
    <p className={`text-[11px] leading-relaxed text-white/70 ${className}`} role="note">
      <span aria-hidden="true">ⓘ </span>
      {text}
    </p>
  )
}
