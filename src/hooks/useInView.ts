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

/**
 * Lazy-mount: returns a ref + a boolean that flips true once the element is
 * near the viewport (and stays true). Use to defer heavy media (videos,
 * iframes) until the user is about to see them.
 */
export function useLazyLoad<T extends HTMLElement>(rootMargin = '400px') {
  const ref = useRef<T>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return { ref, shouldLoad }
}
