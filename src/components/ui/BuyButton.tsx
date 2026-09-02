import { useState } from 'react'
import { openCheckout, type PlanKey } from '../../lib/checkout'

export type { PlanKey }

interface BuyButtonProps {
  plan: PlanKey
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'ghost'
}

/**
 * Opens the Freemius overlay checkout for the given plan, on the page.
 * Falls back to the hosted checkout in a new tab if the overlay fails.
 */
export function BuyButton({ plan, children, className = '', variant = 'primary' }: BuyButtonProps) {
  const [busy, setBusy] = useState(false)

  return (
    <button
      type="button"
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`}
      aria-busy={busy}
      onClick={() => {
        setBusy(true)
        openCheckout(plan).finally(() => setBusy(false))
      }}
    >
      {children}
    </button>
  )
}
