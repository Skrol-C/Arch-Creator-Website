import { LuCheck, LuArrowUpRight, LuDownload, LuShieldCheck, LuRefreshCw } from 'react-icons/lu'
import { pricing, urls } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import styles from './Pricing.module.css'

const hrefFor = (key: string) =>
  key === 'releases' ? urls.releases : key === 'proPurchase' ? urls.proPurchase : urls.quillPurchase

export function Pricing() {
  return (
    <>
      <section className={styles.header}>
        <div className="shell">
          <Reveal>
            <div className={styles.headerInner}>
              <p className="kicker">{pricing.header.kicker}</p>
              <h1 className={styles.title}>{pricing.header.title}</h1>
              <p className={styles.lede}>{pricing.header.lede}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className={styles.tierGrid}>
            {pricing.tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 110} as="article" className={`${styles.tier} ${t.highlight ? styles.tierHot : ''}`}>
                {t.highlight && <span className={styles.hotTag}>Most popular</span>}
                <p className={`${styles.tierName} ${t.highlight ? styles.tierNameHot : ''}`}>{t.name}</p>
                <p className={styles.price}>
                  {t.price}
                  <span className={styles.per}>/{t.per}</span>
                </p>
                <p className={`${styles.blurb} ${t.highlight ? styles.blurbHot : ''}`}>{t.blurb}</p>
                <ul className={styles.features}>
                  {t.features.map((f) => (
                    <li key={f} className={styles.feature}>
                      <LuCheck size={15} className={styles.check} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={hrefFor(t.cta.href)}
                  target="_blank"
                  rel="noreferrer"
                  className={`btn ${t.highlight ? 'btn-primary' : 'btn-ghost'} ${styles.tierCta}`}
                >
                  {t.cta.label}
                  <LuArrowUpRight size={14} />
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className={styles.requirements}>
              <p className={styles.reqHead}>System requirements</p>
              <ul className={styles.reqList}>
                {pricing.requirements.map((r) => (
                  <li key={r} className={styles.req}>
                    <span className={styles.reqDot} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.notes}`}>
        <div className="shell">
          <Reveal>
            <div className={styles.notesCard}>
              <h2 className={styles.notesTitle}>{pricing.notes.title}</h2>
              <ul className={styles.notesList}>
                {pricing.notes.items.map((n) => (
                  <li key={n} className={styles.note}>
                    {n}
                  </li>
                ))}
              </ul>
              <div className={styles.badges}>
                <span className={styles.badge}>
                  <LuShieldCheck size={15} /> Secure checkout via Lemon Squeezy
                </span>
                <span className={styles.badge}>
                  <LuRefreshCw size={15} /> In-app updates included
                </span>
                <span className={styles.badge}>
                  <LuDownload size={15} /> Offline installer
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
