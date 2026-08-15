import { Link } from 'react-router-dom'
import { LuMail, LuGithub, LuArrowUpRight } from 'react-icons/lu'
import { footer, navLinks, site, urls } from '../data/content'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className="shell">
        <div className={styles.grid}>
          <div>
            <Link to="/" className={styles.brand} aria-label={`${site.name} home`}>
              <img src="/logo.png" alt="" className={styles.logo} width={30} height={30} />
              <span className={styles.wordmark}>{site.name}</span>
            </Link>
            <p className={styles.blurb}>{footer.blurb}</p>
            <p className={styles.tagline}>{footer.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <p className={styles.colHead}>Site</p>
            <ul className={styles.colList}>
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link className={styles.colLink} to={l.to}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link className={styles.colLink} to="/pricing">
                  Download
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Connect">
            <p className={styles.colHead}>Connect</p>
            <ul className={styles.colList}>
              <li>
                <a className={`${styles.colLink} ${styles.social}`} href={`mailto:${site.email}`}>
                  <LuMail size={15} /> {site.email}
                </a>
              </li>
              <li>
                <a
                  className={`${styles.colLink} ${styles.social}`}
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LuGithub size={15} /> GitHub
                </a>
              </li>
              <li>
                <a
                  className={`${styles.colLink} ${styles.social}`}
                  href={urls.releases}
                  target="_blank"
                  rel="noreferrer"
                >
                  Releases <LuArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span>
            &copy; {year} {site.name}. All rights reserved.
          </span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
