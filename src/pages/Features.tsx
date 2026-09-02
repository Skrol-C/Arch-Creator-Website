import { Link } from 'react-router-dom'
import { LuArrowRight } from 'react-icons/lu'
import { features } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import { DownloadButton } from '../components/ui/DownloadButton'
import { Chapter, Plate } from '../components/ui/Chapter'
import { useSeo } from '../hooks/useSeo'
import { useLocale } from '../hooks/useLocale'
import styles from './Features.module.css'

export function Features() {
  const { t, tk } = useLocale()

  useSeo({
    title: 'Features — Arch Creator',
    description:
      'Worldbuilding tools, all in one place. In-world calendars, ten lore categories, plot boards, the Arch Studio editor, the Quill assistant, and ambient audio, all offline.',
    path: '/features',
  })

  return (
    <>
      <header className={styles.header}>
        <div className="shell">
          <Reveal>
            <div className={styles.headerInner}>
              <p className="kicker">{tk(features.header.kicker)}</p>
              <h1 className={styles.title}>{t(features.header.title)}</h1>
              <p className={styles.lede}>{t(features.header.lede)}</p>
            </div>
          </Reveal>
        </div>
      </header>

      {/* The feature index, a compact ruled list */}
      <section className={styles.indexSection}>
        <div className="shell">
          <Reveal>
            <ol className={styles.index}>
              {features.grid.map((f, i) => (
                <li key={f.name} className={styles.indexRow}>
                  <span className={styles.indexNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.indexIcon}>
                    <f.icon size={17} />
                  </span>
                  <span className={styles.indexName}>{tk(f.name)}</span>
                  <span className={styles.indexBody}>{tk(f.body)}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* The chapters, asymmetric spreads with offset plates */}
      <div className={styles.spreads}>
        {features.blocks.map((b, i) => (
          <Chapter
            key={b.name}
            num={String(i + 1).padStart(2, '0')}
            kicker={tk(b.name)}
            title={
              <>
                {tk(b.name)} <em>{t(features.archiveInfix)}</em>
              </>
            }
            lede={tk(b.body)}
            flip={i % 2 === 1}
            mediaFirstMobile
            media={<Plate fig={tk(b.fig)} caption={tk(b.name)} src={b.image} alt={tk(b.alt)} />}
          >
            <ul className={styles.points}>
              {b.points.map((p) => (
                <li key={p} className={styles.point}>
                  {tk(p)}
                </li>
              ))}
            </ul>
            <Link to="/explore" className={`link-line ${styles.explore}`}>
              {t(features.tryDemo)}
              <LuArrowRight size={13} />
            </Link>
          </Chapter>
        ))}
      </div>

      <section className={`section ${styles.cta}`}>
        <div className="shell">
          <Reveal>
            <div className={styles.ctaInner}>
              <h2 className={styles.ctaTitle}>{t(features.cta.title)}</h2>
              <p className={styles.ctaLede}>{t(features.cta.lede)}</p>
              <div className={styles.ctaRow}>
                <DownloadButton>{t(features.cta.download)}</DownloadButton>
                <Link to="/explore" className="btn btn-ghost">
                  {t(features.cta.exploreLive)}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

