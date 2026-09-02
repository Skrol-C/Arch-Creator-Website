import { Link } from 'react-router-dom'
import { LuMail, LuArrowDown } from 'react-icons/lu'
import { SiDiscord, SiTiktok, SiX } from 'react-icons/si'
import { footer, navLinks, resources, site } from '../data/content'
import { useLocale } from '../hooks/useLocale'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLocale()

  return (
    <footer className={styles.footer}>
      <div className={styles.band}>
        <div className={`shell ${styles.inner}`}>
          {/* Left: community + download */}
          <div className={styles.lead}>
            <h3 className={styles.headline}>
              {t(footer.headline[0])} <em>{t(footer.headline[1])}</em>
            </h3>
            <p className={styles.subhead}>{t(footer.subhead)}</p>

            <a href={site.discord} target="_blank" rel="noreferrer" className={styles.discordBtn}>
              <SiDiscord size={18} />
              {t(footer.joinDiscord)}
            </a>

            <Link to="/download" className={styles.downloadBtn}>
              <LuArrowDown size={16} />
              {t(footer.downloadApp)}
            </Link>
          </div>

          {/* Right: link columns */}
          <div className={styles.columns}>
            <nav aria-label={t('footer.siteAria')}>
              <ul className={styles.colList}>
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <Link className={styles.colLink} to={l.to}>
                      {t(l.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label={t('footer.resourcesAria')}>
              <ul className={styles.colList}>
                {resources.map((r) => (
                  <li key={r.to}>
                    <Link className={styles.colLink} to={r.to}>
                      {t(r.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`shell ${styles.bottom}`}>
          <span>
            &copy; {year} {site.name} · {t('misc.surveyConvergeLock')}
          </span>
          <div className={styles.socials}>
            <a href={`mailto:${site.email}`} aria-label={t('footer.emailAria')} title={t('footer.emailAria')}>
              <LuMail size={16} />
            </a>
            <a href={site.discord} target="_blank" rel="noreferrer" aria-label={t('footer.discordAria')} title={t('footer.discordAria')}>
              <SiDiscord size={15} />
            </a>
            <a href={site.tiktok} target="_blank" rel="noreferrer" aria-label={t('footer.tiktokAria')} title={t('footer.tiktokAria')}>
              <SiTiktok size={15} />
            </a>
            <a href={site.twitter} target="_blank" rel="noreferrer" aria-label={t('footer.xAria')} title={t('footer.xAria')}>
              <SiX size={15} />
            </a>
          </div>
        </div>

        {/* Giant brand wordmark bleeding off the bottom */}
        <div className={styles.wordmark} aria-hidden="true">
          {site.name}
        </div>
      </div>
    </footer>
  )
}
