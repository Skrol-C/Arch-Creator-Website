import { useEffect, useRef, useState } from 'react'

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useInView<T extends HTMLElement>(options?: {
  threshold?: number
  rootMargin?: string
  once?: boolean
}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options?.once !== false) io.disconnect()
        } else if (options?.once === false) {
          setInView(false)
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -8% 0px',
      },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [options?.threshold, options?.rootMargin, options?.once])

  return { ref, inView }
}
