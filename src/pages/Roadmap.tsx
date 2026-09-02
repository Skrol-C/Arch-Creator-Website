import { roadmap } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import { useLocale } from '../hooks/useLocale'
import styles from './Roadmap.module.css'

const toneClass = (tone: string) => (tone === 'shipped' ? styles.toneShipped : tone === 'next' ? styles.toneNext : styles.toneLater)

export function Roadmap() {
  const { t, tk } = useLocale()
  return (
    <>
      <section className={styles.header}>
        <div className="shell">
          <Reveal>
            <div className={styles.headerInner}>
              <p className="kicker">{tk(roadmap.header.kicker)}</p>
              <h1 className={styles.title}>{t(roadmap.header.title)}</h1>
              <p className={styles.lede}>{t(roadmap.header.lede)}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className={styles.tracks}>
              {roadmap.tracks.map((t) => (
                <div key={t.label} className={styles.track}>
                  <div className={styles.trackHead}>
                    <span className={styles.trackLabel}>{tk(t.label)}</span>
                    <span className={styles.trackPct}>{t.pct}%</span>
                  </div>
                  <div className={styles.trackBar}>
                    <span className={styles.trackFill} style={{ width: `${t.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className={styles.timeline}>
            {roadmap.phases.map((phase, i) => (
              <Reveal key={phase.name} as="section" className={styles.phase} delay={i * 80}>
                <header className={styles.phaseHead}>
                  <span className={styles.phaseNum}>{phase.num}</span>
                  <div className={styles.phaseMeta}>
                    <div className={styles.phaseTitleRow}>
                      <h2 className={styles.phaseName}>{tk(phase.name)}</h2>
                      <span className={`${styles.phaseChip} ${toneClass(phase.tone)}`}>{tk(phase.chip)}</span>
                    </div>
                    <p className={styles.phaseLine}>{t(phase.line)}</p>
                  </div>
                </header>
                <div className={styles.phaseItems}>
                  {phase.items.map((item) => (
                    <article key={item.title} className={styles.item}>
                      <span className={styles.itemIcon}>
                        <item.icon size={20} />
                      </span>
                      <div className={styles.itemBody}>
                        <h3 className={styles.itemTitle}>{t(item.title)}</h3>
                        <p className={styles.itemText}>{t(item.body)}</p>
                      </div>
                      <div className={styles.tags}>
                        {item.tags.map((t) => (
                          <span key={t} className={styles.tag}>
                            {tk(t)}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
