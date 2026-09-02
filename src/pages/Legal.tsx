import { Fragment, useState } from 'react'
import { LuScale } from 'react-icons/lu'
import { legal } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import { useLocale } from '../hooks/useLocale'
import styles from './Legal.module.css'

const inline = (text: string) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>))

interface SectionDef {
  title: string
  body?: string[]
  list?: string[]
  note?: string
}

function DocSection({ section }: { section: SectionDef }) {
  const { tk } = useLocale()
  return (
    <section className={styles.sec}>
      <h2 className={styles.secTitle}>{tk(section.title)}</h2>
      {section.body?.map((p) => (
        <p key={p} className={styles.secP}>
          {inline(tk(p))}
        </p>
      ))}
      {section.list && (
        <ul className={styles.secList}>
          {section.list.map((l) => (
            <li key={l} className={styles.secLi}>
              {inline(tk(l))}
            </li>
          ))}
        </ul>
      )}
      {section.note && <p className={styles.secNote}>{inline(tk(section.note))}</p>}
    </section>
  )
}

function DocTable({ head, rows }: { head: string[]; rows: string[][] }) {
  const { tk } = useLocale()
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{tk(h)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Legal() {
  const [active, setActive] = useState(legal.docs[0].id)
  const doc = legal.docs.find((d) => d.id === active) ?? legal.docs[0]
  const m = legal.meta
  const { t, tk } = useLocale()

  return (
    <>
      <section className={styles.header}>
        <div className="shell">
          <Reveal>
            <div className={styles.headerInner}>
              <p className="kicker">{tk(legal.header.kicker)}</p>
              <h1 className={styles.title}>{t(legal.header.title)}</h1>
              <p className={styles.lede}>{t(legal.header.lede)}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className={styles.layout}>
            <nav className={styles.subnav} aria-label={t(legal.subnavAria)}>
              {legal.docs.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={`${styles.subnavBtn} ${active === d.id ? styles.subnavActive : ''}`}
                  onClick={() => setActive(d.id)}
                  aria-pressed={active === d.id}
                >
                  {tk(d.label)}
                </button>
              ))}
            </nav>

            <div className={styles.doc}>
              <Reveal key={active}>
                <header className={styles.docHead}>
                  <span className={styles.docTitle}>
                    <LuScale size={15} />
                    {tk(doc.title)}
                  </span>
                  <span className={styles.docMeta}>
                    {m.operator} · {m.app} · {t(legal.effectiveLabel)} {m.effective}
                  </span>
                </header>

                {active === 'terms' && (
                  <>
                    <p className={styles.intro}>{inline(t(legal.terms.intro))}</p>
                    {legal.terms.sections.map((s) => (
                      <DocSection key={s.title} section={s} />
                    ))}
                  </>
                )}

                {active === 'privacy' && (
                  <>
                    <p className={styles.intro}>{inline(t(legal.privacy.intro))}</p>
                    {legal.privacy.sections.map((s) => (
                      <DocSection key={s.title} section={s} />
                    ))}
                    <p className={styles.secNote}>{inline(t(legal.privacy.note))}</p>
                  </>
                )}

                {active === 'licenses' && (
                  <>
                    <p className={styles.intro}>{inline(t(legal.licenses.intro))}</p>
                    <section className={styles.sec}>
                      <h2 className={styles.secTitle}>{t(legal.thirdParty)}</h2>
                      <DocTable head={legal.licenses.table.head} rows={legal.licenses.table.rows} />
                    </section>
                    {legal.licenses.sections.map((s) => (
                      <DocSection key={s.title} section={s} />
                    ))}
                    <p className={styles.secNote}>{inline(t(legal.licenses.note))}</p>
                  </>
                )}

                {active === 'credits' && (
                  <>
                    <p className={styles.intro}>{inline(t(legal.credits.intro))}</p>
                    <section className={styles.sec}>
                      <h2 className={styles.secTitle}>{t(legal.bundledMusic)}</h2>
                      <DocTable head={legal.credits.music.head} rows={legal.credits.music.rows} />
                    </section>
                    {legal.credits.sections.map((s) => (
                      <DocSection key={s.title} section={s} />
                    ))}
                    <p className={styles.secNote}>{inline(t(legal.credits.note))}</p>
                  </>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
