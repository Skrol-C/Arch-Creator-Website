/**
 * Hairline divider with a centre diamond, the classic engraving ornament.
 */
export function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`divider ${className}`} aria-hidden="true">
      <span className="divider-line" />
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="var(--sepia)" />
      </svg>
      <span className="divider-line" />
    </div>
  )
}
