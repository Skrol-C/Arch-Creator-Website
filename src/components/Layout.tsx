import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { prefersReducedMotion } from '../hooks/useInView'

const NAV_H = 88

export function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY - NAV_H
        window.scrollTo({ top, left: 0, behavior: 'auto' })
      })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.1 })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
