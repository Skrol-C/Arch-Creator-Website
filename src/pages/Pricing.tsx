import { Fragment } from 'react'
import {
  LuArrowUpRight,
  LuArrowRight,
  LuCheck,
  LuMinus,
  LuDownload,
  LuRefreshCw,
  LuShieldCheck,
  LuStar,
} from 'react-icons/lu'
import { pricing, urls } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import styles from './Pricing.module.css'

const hrefFor = (key: string) =>
  key === 'releases' ? urls.releases : key === 'proPurchase' ? urls.proPurchase : urls.quillPurchase

const MatrixCell = ({ v }: { v: string }) => {
  if (v === 'yes') return <LuCheck size={15} className={styles.mYes} aria-label="Yes" />
  if (v === 'some') return <span className={styles.mSome} aria-label="Partial" />
  return <LuMinus size={15} className={styles.mNo} aria-label="No" />
}

export function Pricing() {
  const p = pricing
  const maxCost = Math.max(...p.compare.costs.rows.flatMap((r) => r.values))

  return (
    <>
      <section className={styles.header}>
        <div className="shell">
          <Reveal>
            <div className={styles.headerInner}>
              <p className="kicker">{p.header.kicker}</p>
              <h1 className={styles.title}>{p.header.title}</h1>
              <p className={styles.lede}>{p.header.lede}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Tier cards ---------- */}
      <section className="section">
        <div className="shell">
          <div className={styles.tierGrid}>
            {p.tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 110} as="article" className={`${styles.tier} ${t.highlight ? styles.tierHot : ''}`}>
                {t.highlight && <span className={styles.hotTag}>Most popular</span>}
                <p className={`${styles.tierName} ${t.highlight ? styles.tierNameHot : ''}`}>{t.name}</p>
                <p className={styles.price}>
                  {t.price}
                  <span className={styles.per}>/{t.per}</span>
                </p>
                <p className={`${styles.blurb} ${t.highlight ? styles.blurbHot : ''}`}>{t.blurb}</p>
                <ul className={styles.highlights}>
                  {t.highlights.map((h) => (
                    <li key={h} className={styles.highlight}>
                      <LuCheck size={14} className={styles.hlCheck} />
                      {h}
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
        </div>
      </section>

      {/* ---------- Free vs Pro table ---------- */}
      <section className={`section ${styles.sectionAlt}`}>
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <p className="kicker">Comparison</p>
              <h2 className="section-title">{p.table.title}</h2>
              <p className="section-lede">{p.table.lede}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.thLabel}>Feature</th>
                    <th className={styles.thFree}>{p.tiers[0].name}</th>
                    <th className={styles.thPro}>{p.tiers[1].name}</th>
                  </tr>
                </thead>
                <tbody>
                  {p.table.groups.map((g) => (
                    <Fragment key={g.name}>
                      <tr className={styles.groupRow}>
                        <td colSpan={3}>{g.name}</td>
                      </tr>
                      {g.rows.map((r) => (
                        <tr key={r.label}>
                          <td className={styles.tdLabel}>{r.label}</td>
                          <td className={styles.tdFree}>{r.free}</td>
                          <td className={styles.tdPro}>{r.pro}</td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Free & Pro panels ---------- */}
      <section className="section">
        <div className="shell">
          <div className={styles.planGrid}>
            <Reveal as="article" className={styles.planFree}>
              <p className={styles.planKicker}>{p.free.kicker}</p>
              <h2 className={styles.planTitle}>{p.free.title}</h2>
              <p className={styles.planLede}>{p.free.lede}</p>
              <ul className={styles.planList}>
                {p.free.items.map((item) => (
                  <li key={item} className={styles.planItem}>
                    <LuCheck size={15} className={styles.hlCheck} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={hrefFor(p.free.cta.href)}
                target="_blank"
                rel="noreferrer"
                className={`btn btn-ghost ${styles.planCta}`}
              >
                <LuDownload size={14} />
                {p.free.cta.label}
              </a>
            </Reveal>

            <Reveal as="article" className={styles.planPro} delay={120}>
              <p className={styles.planKickerHot}>{p.pro.kicker}</p>
              <h2 className={styles.planTitleHot}>{p.pro.title}</h2>
              <p className={styles.planPrice}>
                {p.pro.price}
                <span className={styles.planPer}>/{p.pro.per}</span>
              </p>
              <p className={styles.planLedeHot}>{p.pro.lede}</p>
              <ul className={styles.planListHot}>
                {p.pro.items.map((item) => (
                  <li key={item} className={styles.planItemHot}>
                    <LuCheck size={15} className={styles.hlCheckHot} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={hrefFor(p.pro.cta.href)}
                target="_blank"
                rel="noreferrer"
                className={`btn btn-primary ${styles.planCta}`}
              >
                {p.pro.cta.label}
                <LuArrowRight className="chev" size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Quill ---------- */}
      <section id="quill" className={styles.quill}>
        <div className="shell">
          <Reveal>
            <div className={styles.quillHead}>
              <p className={styles.quillKicker}>{p.quill.kicker}</p>
              <h2 className={styles.quillTitle}>{p.quill.title}</h2>
              <p className={styles.quillLede}>{p.quill.lede}</p>
            </div>
          </Reveal>

          <Reveal>
            <blockquote className={styles.quillQuote}>
              <LuStar size={16} className={styles.quillStar} />
              {p.quill.quote}
            </blockquote>
          </Reveal>

          <div className={styles.hats}>
            {p.quill.hats.map((hat, i) => (
              <Reveal key={hat.name} delay={i * 80} as="article" className={styles.hat}>
                <span className={styles.hatIcon}>
                  <hat.icon size={20} />
                </span>
                <h3 className={styles.hatName}>{hat.name}</h3>
                <p className={styles.hatBody}>{hat.body}</p>
              </Reveal>
            ))}
          </div>

          <div className={styles.quillSplit}>
            <Reveal>
              <div className={styles.quillCol}>
                <h3 className={styles.quillSub}>How Quill learns</h3>
                <ul className={styles.quillList}>
                  {p.quill.learns.map((l) => (
                    <li key={l} className={styles.quillListItem}>
                      <LuCheck size={15} className={styles.quillCheck} />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <img
                src="/screenshots/quill-window.png"
                alt="The Quill continuity pane in Arch-Creator"
                className={styles.quillShot}
                loading="lazy"
                width={1440}
                height={900}
              />
            </Reveal>
          </div>

          <div className={styles.quillSplit}>
            <Reveal>
              <div className={styles.quillCol}>
                <h3 className={styles.quillSub}>Today</h3>
                <ul className={styles.quillList}>
                  {p.quill.today.map((l) => (
                    <li key={l} className={styles.quillListItem}>
                      <span className={styles.quillDot} />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className={styles.quillCol}>
                <h3 className={styles.quillSub}>On the horizon</h3>
                <ul className={styles.quillList}>
                  {p.quill.horizon.map((l) => (
                    <li key={l} className={styles.quillListItem}>
                      <span className={styles.quillDot} />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className={styles.quillCta}>
              <p className={styles.quillNote}>{p.quill.note}</p>
              <a
                href={hrefFor(p.quill.cta.href)}
                target="_blank"
                rel="noreferrer"
                className={`btn btn-primary ${styles.quillBtn}`}
              >
                {p.quill.cta.label}
                <span className={styles.quillPrice}>{p.quill.price}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Compare ---------- */}
      <section id="compare" className={`section ${styles.compare}`}>
        <div className="shell">
          <Reveal>
            <div className="section-head section-head--center">
              <p className="kicker">{p.compare.kicker}</p>
              <h2 className="section-title">{p.compare.title}</h2>
              <p className="section-lede">{p.compare.lede}</p>
            </div>
          </Reveal>

          <div className={styles.tools}>
            {p.compare.tools.map((tool, i) => (
              <Reveal key={tool.name} delay={i * 60} as="article" className={`${styles.tool} ${tool.highlight ? styles.toolHot : ''}`}>
                <p className={styles.toolName}>{tool.name}</p>
                <span className={styles.toolModel}>{tool.model}</span>
                <p className={styles.toolPrice}>{tool.price}</p>
                <span className={styles.toolNote}>{tool.note}</span>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className={styles.costs}>
              <h3 className={styles.costsTitle}>{p.compare.costs.title}</h3>
              <p className={styles.costsLede}>{p.compare.costs.lede}</p>
              <div className={styles.costsHead}>
                <span className={styles.costsNameHead}>Tool</span>
                {p.compare.costs.years.map((y) => (
                  <span key={y} className={styles.costsYearHead}>
                    {y} {y === 1 ? 'year' : 'years'}
                  </span>
                ))}
              </div>
              {p.compare.costs.rows.map((row) => (
                <div key={row.name} className={`${styles.costRow} ${row.highlight ? styles.costRowHot : ''}`}>
                  <span className={styles.costName}>{row.name}</span>
                  {row.values.map((v, i) => (
                    <span key={i} className={styles.costVal}>
                      ${v.toLocaleString()}
                    </span>
                  ))}
                  <span className={styles.costBar}>
                    <span
                      className={`${styles.costBarFill} ${row.highlight ? styles.costBarFillHot : ''}`}
                      style={{ width: `${(Math.max(...row.values) / maxCost) * 100}%` }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.matrix}>
              <h3 className={styles.matrixTitle}>{p.compare.matrix.title}</h3>
              <p className={styles.matrixLede}>{p.compare.matrix.lede}</p>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.thLabel} />
                      {p.compare.matrix.columns.map((c, i) => (
                        <th key={c} className={`${styles.thM} ${i === 0 ? styles.thMHot : ''}`}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {p.compare.matrix.rows.map((row) => (
                      <tr key={row.label}>
                        <td className={styles.tdLabel}>{row.label}</td>
                        {row.values.map((v, i) => (
                          <td key={i} className={`${styles.tdM} ${i === 0 ? styles.tdMHot : ''}`}>
                            <MatrixCell v={v} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className={styles.compareWhy}>{p.compare.why}</p>
            <p className={styles.compareFootnote}>{p.compare.footnote}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Notes + requirements ---------- */}
      <section className={`section ${styles.notes}`}>
        <div className="shell">
          <Reveal>
            <div className={styles.notesCard}>
              <h2 className={styles.notesTitle}>{p.notes.title}</h2>
              <ul className={styles.notesList}>
                {p.notes.items.map((n) => (
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

          <Reveal delay={100}>
            <div className={styles.requirements}>
              <p className={styles.reqHead}>System requirements</p>
              <ul className={styles.reqList}>
                {p.requirements.map((r) => (
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
    </>
  )
}
