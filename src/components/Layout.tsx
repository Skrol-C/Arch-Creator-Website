import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { prefersReducedMotion } from '../hooks/useInView'
import { useLocalePrompt } from '../hooks/useLocalePrompt'
import { useLocale } from '../hooks/useLocale'
import { sound } from '../lib/sound'
import styles from './Layout.module.css'

const NAV_H = 88

export function Layout() {
  const { pathname, hash } = useLocation()
  const [soundOn, setSoundOn] = useState(sound.enabled)
  const { suggest, meta, accept, decline } = useLocalePrompt()
  const { t } = useLocale()

  // Global UI sound: play a click on interactive elements (unless it's a
  // text input), and a soft blip on hover.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('button, a, [role="button"], summary')) sound.click()
    }
    const onHover = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('button, a, [role="button"]')) sound.hover()
    }
    document.addEventListener('click', onClick)
    document.addEventListener('mouseover', onHover)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('mouseover', onHover)
    }
  }, [])

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

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    sound.setEnabled(next)
  }

  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />

      {/* Locale suggestion banner */}
      {suggest && meta && (
        <div className={styles.localeBanner} role="status">
          <span className={styles.localeFlag}>{meta.flag}</span>
          <p className={styles.localeText}>
            {t('layout.localeLooksLike')} <strong>{meta.label}</strong>.
          </p>
          <button type="button" className={`btn btn-primary ${styles.localeAccept}`} onClick={accept}>
            {t('layout.localeSwitch')}
          </button>
          <button type="button" className={styles.localeDecline} onClick={decline} aria-label={t('layout.localeDismiss')}>
            ✕
          </button>
        </div>
      )}

      {/* Sound toggle */}
      <button
        type="button"
        className={`${styles.soundBtn} ${soundOn ? styles.soundOn : ''}`}
        onClick={toggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? t('layout.soundMute') : t('layout.soundEnable')}
        title={soundOn ? t('layout.soundMute') : t('layout.soundEnable')}
      >
        {soundOn ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H2v6h4l5 4z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H2v6h4l5 4z" />
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </svg>
        )}
      </button>
    </>
  )
}
