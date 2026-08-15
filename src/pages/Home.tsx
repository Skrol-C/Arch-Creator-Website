import { Link } from 'react-router-dom'
import { LuArrowRight, LuCheck } from 'react-icons/lu'
import { home, manuscript, site } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import styles from './Home.module.css'

export function Home() {
  const { hero } = home

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.orbit} aria-hidden="true">
          <span className={styles.ringA} />
          <span className={styles.ringB} />
          <span className={styles.tickN} />
          <span className={styles.tickE} />
          <span className={styles.tickS} />
          <span className={styles.tickW} />
          <span className={styles.needle} />
        </div>

        <div className={`shell ${styles.heroInner}`}>
          <Reveal>
            <p className={styles.badge}>{hero.badge}</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className={styles.title}>
              {hero.title[0]}
              <br />
              <em>{hero.title[1]}</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className={styles.lede}>{hero.lede}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className={styles.ctaRow}>
              <Link to={hero.ctaPrimary.to} className="btn btn-primary">
                {hero.ctaPrimary.label}
                <LuArrowRight className="chev" size={14} />
              </Link>
              <Link to={hero.ctaSecondary.to} className="btn btn-ghost">
                {hero.ctaSecondary.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.pills} aria-label="At a glance">
        <div className="shell">
          <Reveal>
            <ul className={styles.pillList}>
              {home.pills.map((p) => (
                <li key={p} className={styles.pill}>
                  <LuCheck size={13} className={styles.pillIcon} />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-head section-head--center">
              <p className="kicker">The studio, on your desk</p>
              <h2 className="section-title">
                A home for the <em>whole</em> process.
              </h2>
              <p className="section-lede">
                Every thread of your world — calendar, character, chapter — lives together in one calm,
                offline place. Here is Arch Studio, mid-draft.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <figure className={styles.mock} aria-label={`${site.product} writing interface mockup`}>
              <div className={styles.mockChrome}>
                <span className={styles.chromeDot} />
                <span className={styles.chromeDot} />
                <span className={styles.chromeDot} />
                <span className={styles.chromeTitle}>{manuscript.title}</span>
              </div>
              <div className={styles.mockBody}>
                <img
                  src="/screenshots/studio.png"
                  alt="The Arch Studio writing editor in Arch-Creator"
                  className={styles.mockShot}
                  width={1280}
                  height={800}
                />
              </div>
              <div className={styles.mockFoot}>
                {manuscript.stats.map((s) => (
                  <span key={s} className={styles.chip}>
                    {s}
                  </span>
                ))}
                <span className={`${styles.chip} ${styles.chipAccent}`}>Saved · offline</span>
              </div>
            </figure>
          </Reveal>

          <Reveal delay={80}>
            <p className={styles.exportRow}>
              <span className={styles.exportLabel}>Exports</span>
              <span className={styles.exportItems}>.docx&ensp;·&ensp;.epub&ensp;·&ensp;.pdf</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.modules}`}>
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <p className="kicker">Inside Arch-Creator</p>
              <h2 className="section-title">
                The pieces of a <em>world</em>.
              </h2>
            </div>
          </Reveal>
          <div className={styles.moduleGrid}>
            {home.modules.map((m, i) => (
              <Reveal key={m.name} delay={i * 90} as="article" className={styles.moduleCard}>
                <span className={styles.moduleIcon}>
                  <m.icon size={20} />
                </span>
                <h3 className={styles.moduleName}>{m.name}</h3>
                <p className={styles.moduleBody}>{m.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.ethos}`}>
        <div className="shell">
          <Reveal>
            <div className={styles.ethosInner}>
              <p className="kicker">{home.ethos.kicker}</p>
              <h2 className={styles.ethosTitle}>{home.ethos.title}</h2>
              <p className={styles.ethosLede}>{home.ethos.lede}</p>
              <blockquote className={styles.quote}>
                <p className={styles.quoteText}>{home.quote.text}</p>
                <cite className={styles.quoteCite}>{home.quote.author}</cite>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.cta}`}>
        <div className="shell">
          <Reveal>
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>{home.cta.title}</h2>
              <p className={styles.ctaLede}>{home.cta.lede}</p>
              <Link to={home.cta.primary.to} className="btn btn-primary">
                {home.cta.primary.label}
                <LuArrowRight className="chev" size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
