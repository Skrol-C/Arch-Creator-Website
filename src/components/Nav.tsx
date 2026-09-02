import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LuChevronDown, LuMenu, LuMoon, LuSun, LuX, LuGlobe } from 'react-icons/lu'
import { navLeft, navRightLinks, resources, site } from '../data/content'
import { useTheme } from '../hooks/useTheme'
import { LOCALES, useLocale } from '../hooks/useLocale'
import styles from './Nav.module.css'

export function Nav() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [resOpen, setResOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const resTimer = useRef<number | null>(null)
  const langTimer = useRef<number | null>(null)
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()
  const { locale, choose, t } = useLocale()

  // Hide the header when scrolling down, reveal when scrolling up (or at top)
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      setHidden(y > 120 && y > lastY)
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setResOpen(false)
    setLangOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!resOpen && !langOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setResOpen(false)
        setLangOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [resOpen, langOpen])

  const close = () => setOpen(false)

  const openRes = () => {
    if (resTimer.current) window.clearTimeout(resTimer.current)
    setResOpen(true)
  }
  const closeRes = () => {
    if (resTimer.current) window.clearTimeout(resTimer.current)
    resTimer.current = window.setTimeout(() => setResOpen(false), 250)
  }
  const openLang = () => {
    if (langTimer.current) window.clearTimeout(langTimer.current)
    setLangOpen(true)
  }
  const closeLang = () => {
    if (langTimer.current) window.clearTimeout(langTimer.current)
    langTimer.current = window.setTimeout(() => setLangOpen(false), 250)
  }

  useEffect(
    () => () => {
      if (resTimer.current) window.clearTimeout(resTimer.current)
      if (langTimer.current) window.clearTimeout(langTimer.current)
    },
    [],
  )

  return (
    <header className={`${styles.header} ${hidden ? styles.hidden : ''} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.inner} shell`}>
        <nav className={styles.navLeft} aria-label={t('nav.primaryAria')}>
          {navLeft.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              {t(l.label)}
            </NavLink>
          ))}
        </nav>

        <Link to="/" className={styles.brand} onClick={close} aria-label={t('nav.brandAria', { name: site.name })}>
          <img src="/logo-upscayl.png" alt="" className={styles.mark} width={30} height={30} />
          <span className={styles.wordmark}>{site.name}</span>
        </Link>

        <div className={styles.navRight}>
          {navRightLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              {t(l.label)}
            </NavLink>
          ))}

          <button
            type="button"
            className={styles.themeBtn}
            onClick={toggle}
            aria-label={theme === 'light' ? t('nav.themeToDark') : t('nav.themeToLight')}
            title={theme === 'light' ? t('nav.themeToDark') : t('nav.themeToLight')}
          >
            {theme === 'light' ? <LuMoon size={16} /> : <LuSun size={16} />}
          </button>

          {/* Language picker */}
          <div
            className={styles.language}
            onMouseEnter={openLang}
            onMouseLeave={closeLang}
          >
            <button
              type="button"
              className={`${styles.langBtn} ${langOpen ? styles.langBtnOpen : ''}`}
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
              title={t('nav.languageTitle')}
            >
              <LuGlobe size={16} />
              <span className={styles.langCode}>{locale.toUpperCase()}</span>
              <LuChevronDown size={12} className={styles.langChev} />
            </button>
            <div className={`${styles.langMenu} ${langOpen ? styles.langMenuOpen : ''}`}>
              {LOCALES.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className={`${styles.langItem} ${l.id === locale ? styles.langItemActive : ''}`}
                  onClick={() => {
                    choose(l.id)
                    setLangOpen(false)
                  }}
                  title={l.label}
                >
                  <span className={styles.langFlag}>{l.flag}</span>
                  <span className={styles.langCode}>{l.id.toUpperCase()}</span>
                  {l.id === locale && <span className={styles.langCheck}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div
            className={styles.resources}
            onMouseEnter={openRes}
            onMouseLeave={closeRes}
          >
            <button
              type="button"
              className={`${styles.resBtn} ${resOpen ? styles.resBtnOpen : ''}`}
              aria-haspopup="true"
              aria-expanded={resOpen}
              onClick={() => setResOpen((v) => !v)}
            >
              {t('nav.resources')}
              <LuChevronDown size={12} className={styles.resChev} />
            </button>
            <div className={`${styles.resMenu} ${resOpen ? styles.resMenuOpen : ''}`}>
              {resources.map((r) => (
                <Link key={r.to} to={r.to} className={styles.resLink} onClick={close}>
                  {t(r.label)}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/download" className={`btn btn-primary ${styles.downloadBtn}`}>
            {t('nav.download')}
          </Link>

          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t('nav.toggleMenu')}
          >
            {open ? <LuX size={22} /> : <LuMenu size={22} />}
          </button>
        </div>
      </div>

      {createPortal(
        <div id="mobile-menu" className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}>
          <nav className={styles.overlayNav} aria-label={t('nav.mobileAria')}>
            {[...navLeft, ...navRightLinks].map((l) => (
              <NavLink key={l.to} to={l.to} className={styles.overlayLink} onClick={close}>
                {t(l.label)}
              </NavLink>
            ))}
            <p className={styles.overlayGroupLabel}>{t('nav.resources')}</p>
            {resources.map((r) => (
              <NavLink key={r.to} to={r.to} className={styles.overlayResLink} onClick={close}>
                {t(r.label)}
              </NavLink>
            ))}
            <Link to="/download" className={`btn btn-primary ${styles.overlayCta}`} onClick={close}>
              {t('nav.downloadFree')}
            </Link>
          </nav>
        </div>,
        document.body,
      )}
    </header>
  )
}
