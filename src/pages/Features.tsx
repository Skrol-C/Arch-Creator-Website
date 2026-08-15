import { Link } from 'react-router-dom'
import { LuArrowRight } from 'react-icons/lu'
import { features } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import styles from './Features.module.css'

export function Features() {
  return (
    <>
      <section className={styles.header}>
        <div className="shell">
          <Reveal>
            <div className={styles.headerInner}>
              <p className="kicker">{features.header.kicker}</p>
              <h1 className={styles.title}>{features.header.title}</h1>
              <p className={styles.lede}>{features.header.lede}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className={styles.grid}>
            {features.grid.map((f, i) => (
              <Reveal key={f.name} delay={(i % 3) * 90} as="article" className={styles.card}>
                <span className={styles.cardIcon}>
                  <f.icon size={20} />
                </span>
                <h3 className={styles.cardName}>{f.name}</h3>
                <p className={styles.cardBody}>{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.blocks}>
        <div className={styles.blockList}>
          {features.blocks.map((b, i) => (
            <Reveal key={b.name} as="article" className={`${styles.block} ${i % 2 === 1 ? styles.blockAlt : ''}`}>
              <div className={`shell ${styles.blockInner}`}>
                <div className={styles.blockCopy}>
                  <span className={styles.blockIcon}>
                    <b.icon size={22} />
                  </span>
                  <h2 className={styles.blockName}>{b.name}</h2>
                  <p className={styles.blockBody}>{b.body}</p>
                  <ul className={styles.points}>
                    {b.points.map((p) => (
                      <li key={p} className={styles.point}>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.blockShotWrap}>
                  <img
                    src={b.image}
                    alt={b.alt}
                    className={styles.shot}
                    loading="lazy"
                    width={1440}
                    height={900}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`section ${styles.cta}`}>
        <div className="shell">
          <Reveal>
            <div className={styles.ctaInner}>
              <h2 className={styles.ctaTitle}>Ready to give your world a home?</h2>
              <Link to="/pricing" className="btn btn-primary">
                Download free
                <LuArrowRight className="chev" size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
