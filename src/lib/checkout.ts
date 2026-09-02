import { Checkout } from '@freemius/checkout'

export type PlanKey = 'keystone' | 'quill' | 'arch'

export const FREEMIUS_PRODUCT_ID = '38053'

export const FREEMIUS_PLANS = {
  keystone: { id: '63329', label: 'Keystone', price: 60, accent: '#e8590c' },
  quill: { id: '63349', label: 'Quill', price: 30, accent: '#a855f7' },
  arch: { id: '63355', label: 'Arch', price: 90, accent: '#f368e0' },
} as const

export type FreemiusPlan = (typeof FREEMIUS_PLANS)[PlanKey]

let instance: Checkout | null = null

function getCheckout(): Checkout {
  if (!instance) instance = new Checkout({ product_id: FREEMIUS_PRODUCT_ID })
  return instance
}

/** Hosted fallback, Freemius accepts every checkout option as a URL parameter. */
function hostedUrl(plan: FreemiusPlan): string {
  const params = new URLSearchParams({
    product_id: FREEMIUS_PRODUCT_ID,
    plan_id: plan.id,
    billing_cycle: 'lifetime',
    licenses: '2',
  })
  return `https://checkout.freemius.com/?${params.toString()}`
}

function isMobile(): boolean {
  return typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window)
}

export async function openCheckout(plan: PlanKey): Promise<void> {
  const def = FREEMIUS_PLANS[plan]
  // On mobile the overlay iframe is cramped and hard to use, so open the
  // hosted checkout in a new tab instead.
  if (isMobile()) {
    window.open(hostedUrl(def), '_blank', 'noopener,noreferrer')
    return
  }
  try {
    await getCheckout().open({
      plan_id: def.id,
      licenses: 2,
      billing_cycle: 'lifetime',
      title: `Arch Creator, ${def.label}`,
    })
  } catch {
    window.open(hostedUrl(def), '_blank', 'noopener,noreferrer')
  }
}
