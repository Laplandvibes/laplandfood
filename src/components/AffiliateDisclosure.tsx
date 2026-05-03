/**
 * FTC / DSA / consumer-protection-compliant affiliate disclosure.
 * Three variants:
 *   - 'light'  — for the blue/white food pages (white text on #002F6C band)
 *   - 'dark'   — for deep-night sections (snow/40 muted)
 *   - 'inline' — emphasised before-CTA notice on a light page section
 */
interface AffiliateDisclosureProps {
  variant?: 'light' | 'dark' | 'inline'
  className?: string
}

const TEXT =
  'This page contains affiliate links. If you book through these links, LaplandVibes may receive a commission at no extra cost to you.'

export default function AffiliateDisclosure({
  variant = 'light',
  className = '',
}: AffiliateDisclosureProps) {
  if (variant === 'inline') {
    return (
      <p
        className={`text-xs italic leading-relaxed max-w-3xl mx-auto px-4 text-[#002F6C]/65 ${className}`}
        role="note"
      >
        <span aria-hidden="true">ⓘ </span>
        {TEXT}
      </p>
    )
  }
  if (variant === 'dark') {
    return (
      <p className={`text-[11px] text-snow/40 leading-relaxed ${className}`} role="note">
        <span aria-hidden="true">ⓘ </span>
        {TEXT}
      </p>
    )
  }
  return (
    <p className={`text-[11px] leading-relaxed text-white/70 ${className}`} role="note">
      <span aria-hidden="true">ⓘ </span>
      {TEXT}
    </p>
  )
}
