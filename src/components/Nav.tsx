import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LuMenu, LuX } from 'react-icons/lu'
import { navLinks, site } from '../data/content'
import styles from './Nav.module.css'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.inner} shell`}>
        <nav className={styles.navLeft} aria-label="Primary">
          {navLinks.map((l) => (
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
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={styles.overlayLink} onClick={close}>
              {l.label}
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
