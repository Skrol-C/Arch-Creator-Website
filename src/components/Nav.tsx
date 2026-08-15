import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LuChevronDown, LuMenu, LuX } from 'react-icons/lu'
import { navLeft, navRightLinks, resources, resourcesLabel, site } from '../data/content'
import styles from './Nav.module.css'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [resOpen, setResOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setResOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!resOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setResOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [resOpen])

  const close = () => setOpen(false)

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.inner} shell`}>
        <nav className={styles.navLeft} aria-label="Primary">
          {navLeft.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/" className={styles.brand} onClick={close} aria-label={`${site.name} home`}>
          <img src="/logo.png" alt="" className={styles.logo} width={30} height={30} />
          <span className={styles.wordmark}>{site.name}</span>
        </Link>

        <div className={styles.navRight}>
          {navRightLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              {l.label}
            </NavLink>
          ))}

          <div
            className={styles.resources}
            onMouseEnter={() => setResOpen(true)}
            onMouseLeave={() => setResOpen(false)}
          >
            <button
              type="button"
              className={`${styles.resBtn} ${resOpen ? styles.resBtnOpen : ''}`}
              aria-haspopup="true"
              aria-expanded={resOpen}
              onClick={() => setResOpen((v) => !v)}
            >
              {resourcesLabel}
              <LuChevronDown size={12} className={styles.resChev} />
            </button>
            <div className={`${styles.resMenu} ${resOpen ? styles.resMenuOpen : ''}`}>
              {resources.map((r) => (
                <Link key={r.to} to={r.to} className={styles.resLink} onClick={close}>
                  {r.label}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/pricing" className={`btn btn-primary ${styles.downloadBtn}`}>
            Download
          </Link>

          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {open ? <LuX size={22} /> : <LuMenu size={22} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}>
        <nav className={styles.overlayNav} aria-label="Mobile">
          {[...navLeft, ...navRightLinks].map((l) => (
            <NavLink key={l.to} to={l.to} className={styles.overlayLink} onClick={close}>
              {l.label}
            </NavLink>
          ))}
          <p className={styles.overlayGroupLabel}>{resourcesLabel}</p>
          {resources.map((r) => (
            <NavLink key={r.to} to={r.to} className={styles.overlayResLink} onClick={close}>
              {r.label}
            </NavLink>
          ))}
          <Link to="/pricing" className={`btn btn-primary ${styles.overlayCta}`} onClick={close}>
            Download
          </Link>
        </nav>
      </div>
    </header>
  )
}
