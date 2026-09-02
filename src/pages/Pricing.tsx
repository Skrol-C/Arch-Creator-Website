import { Fragment, useState } from 'react'
import {
  LuCheck,
  LuMinus,
  LuDownload,
  LuRefreshCw,
  LuShieldCheck,
  LuStar,
  LuChevronDown,
} from 'react-icons/lu'
import { pricing } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import { BuyButton, type PlanKey } from '../components/ui/BuyButton'
import { DownloadButton } from '../components/ui/DownloadButton'
import { Chapter } from '../components/ui/Chapter'
import { CostStory } from '../components/ui/CostStory'
import { useSeo } from '../hooks/useSeo'
import { useLocale } from '../hooks/useLocale'
import styles from './Pricing.module.css'

const MatrixCell = ({ v }: { v: string }) => {
  const { t } = useLocale()
  if (v === 'yes') return <LuCheck size={15} className={styles.mYes} aria-label={t('pricing.matrixYes')} />
  if (v === 'some') return <span className={styles.mSome} aria-label={t('pricing.matrixPartial')} />
  return <LuMinus size={15} className={styles.mNo} aria-label={t('pricing.matrixNo')} />
}

const TierCard = ({ tier }: { tier: (typeof pricing.tiers)[number] }) => {
  const { tk } = useLocale()
  return (
    <article
      className={`${styles.tierCard} ${tier.badge ? styles.tierCardHot : ''}`}
      style={{ '--tier-accent': tier.accent ?? 'var(--rule-strong)' } as React.CSSProperties}
    >
      {tier.badge && <span className={styles.tierBadge}>{tk(tier.badge)}</span>}
      <header className={styles.tierHead}>
        <h3 className={styles.tierName}>{tk(tier.name)}</h3>
      </header>
      <p className={styles.tierPrice}>
        {tier.price}
        <span className={styles.tierPer}>/{tk(tier.per)}</span>
      </p>
      <p className={styles.tierBlurb}>{tk(tier.blurb)}</p>

      <ul className={styles.tierList}>
        {(tier.includes ?? tier.highlights).map((inc) => (
          <li key={inc} className={styles.tierItem}>
            <LuCheck size={14} className={styles.tierCheck} />
            {tk(inc)}
          </li>
        ))}
      </ul>

      <div className={styles.tierAction}>
        {tier.action === 'download' ? (
          <DownloadButton variant={tier.badge ? 'primary' : 'ghost'} className={styles.tierBtn}>
            <LuDownload size={13} />
            {tk(tier.cta.label)}
          </DownloadButton>
        ) : (
          <BuyButton plan={tier.plan as PlanKey} variant={tier.badge ? 'primary' : 'ghost'} className={styles.tierBtn}>
            {tk(tier.cta.label)}
            <span className={styles.tierBtnPrice}>{tier.price}</span>
          </BuyButton>
        )}
      </div>
    </article>
  )
}

export function Pricing() {
  const p = pricing
  const { t, tk } = useLocale()

  useSeo({
    title: 'Pricing — Arch Creator',
    description:
      'Fair, one-time, yours. Free to start, then a single lifetime purchase: Keystone $60, Quill $30, or the Arch bundle $90. No subscriptions.',
    path: '/pricing',
  })

  return (
    <>
      <header className={styles.header}>
        <div className="shell">
          <Reveal>
            <div className={styles.headerInner}>
              <p className="kicker">{tk(p.header.kicker)}</p>
              <h1 className={styles.title}>{t(p.header.title)}</h1>
              <p className={styles.lede}>{t(p.header.lede)}</p>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---------- The rate card ---------- */}
      <section className={`section ${styles.rateSection}`}>
        <div className="shell">
          <Reveal>
            <div className={styles.rateHead}>
              <p className="kicker">{tk(p.rateCardKicker)}</p>
              <h2 className={styles.rateTitle}>
                {t(p.rateCardTitle[0])} <em>{t(p.rateCardTitle[1])}</em>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className={styles.tierGrid}>
              {p.tiers.map((t) => (
                <TierCard key={t.name} tier={t} />
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className={styles.rateFootnote}>{t(p.rateFootnote)}</p>
          </Reveal>

          {/* Guarantee strip */}
          <Reveal delay={60}>
            <div className={styles.guarantee}>
              {p.guarantee.map((g) => (
                <div key={g.strong} className={styles.guaranteeItem}>
                  <LuShieldCheck size={18} />
                  <span>
                    <strong>{t(g.strong)}</strong>
                    {t(g.suffix)}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Free vs Keystone ---------- */}
      <section className={`section ${styles.sectionAlt}`}>
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <p className="kicker">{tk(p.table.kicker)}</p>
              <h2 className="section-title">{t(p.table.title)}</h2>
              <p className="section-lede">{t(p.table.lede)}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.thLabel}>{t(p.table.thFeature)}</th>
                    <th className={styles.thFree}>{tk(p.tiers[0].name)}</th>
                    <th className={styles.thPro}>{tk(p.tiers[1].name)}</th>
                  </tr>
                </thead>
                <tbody>
                  {p.table.groups.map((g) => (
                    <Fragment key={g.name}>
                      <tr className={styles.groupRow}>
                        <td colSpan={3}>{tk(g.name)}</td>
                      </tr>
                      {g.rows.map((r) => (
                        <tr key={r.label}>
                          <td className={styles.tdLabel}>{tk(r.label)}</td>
                          <td className={styles.tdFree}>{tk(r.free)}</td>
                          <td className={styles.tdPro}>{tk(r.pro)}</td>
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

      {/* ---------- Quill chapter ---------- */}
      <Chapter
        num="II"
        kicker={tk(p.quill.kicker)}
        title={t(p.quill.title)}
        lede={t(p.quill.lede)}
        flip
      >
        <blockquote className={styles.quillQuote}>
          <LuStar size={16} className={styles.quillStar} />
          {t(p.quill.quote)}
        </blockquote>

        <div className={styles.hats}>
          {p.quill.hats.map((hat) => (
            <article key={hat.name} className={styles.hat}>
              <span className={styles.hatIcon}>
                <hat.icon size={18} />
              </span>
              <h3 className={styles.hatName}>{tk(hat.name)}</h3>
              <p className={styles.hatBody}>{tk(hat.body)}</p>
            </article>
          ))}
        </div>

        <ul className={styles.quillList}>
          {p.quill.learns.map((l) => (
            <li key={l} className={styles.quillListItem}>
              <LuCheck size={15} className={styles.quillCheck} />
              {tk(l)}
            </li>
          ))}
        </ul>

        <div className={styles.quillCta}>
          <p className={styles.quillNote}>{t(p.quill.note)}</p>
          <BuyButton plan="quill">
            {tk(p.quill.cta.label)}
            <span className={styles.quillPrice}>{p.quill.price}</span>
          </BuyButton>
        </div>
      </Chapter>

      {/* ---------- Compare appendix ---------- */}
      <section id="compare" className={`section ${styles.compare}`}>
        <div className="shell">
          <Reveal>
            <div className="section-head section-head--center">
              <p className="kicker">{tk(p.compare.kicker)}</p>
              <h2 className="section-title">{t(p.compare.title)}</h2>
              <p className="section-lede">{t(p.compare.lede)}</p>
            </div>
          </Reveal>

          <div className={styles.tools}>
            {p.compare.tools.map((tool, i) => (
              <Reveal key={tool.name} delay={i * 60} as="article" className={`${styles.tool} ${tool.highlight ? styles.toolHot : ''}`}>
                <p className={styles.toolName}>{tk(tool.name)}</p>
                <span className={styles.toolModel}>{tk(tool.model)}</span>
                <p className={styles.toolPrice}>{tool.price}</p>
                <span className={styles.toolNote}>{tk(tool.note)}</span>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <CostStory
              years={p.compare.costs.years}
              rows={p.compare.costs.rows}
            />
          </Reveal>

          <Reveal>
            <div className={styles.matrix}>
              <h3 className={styles.matrixTitle}>{t(p.compare.matrix.title)}</h3>
              <p className={styles.matrixLede}>{t(p.compare.matrix.lede)}</p>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.thLabel} />
                      {p.compare.matrix.columns.map((c, i) => (
                        <th key={c} className={`${styles.thM} ${i === 0 ? styles.thMHot : ''}`}>
                          {tk(c)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {p.compare.matrix.rows.map((row) => (
                      <tr key={row.label}>
                        <td className={styles.tdLabel}>{tk(row.label)}</td>
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
            <p className={styles.compareWhy}>{t(p.compare.why)}</p>
            <p className={styles.compareFootnote}>{t(p.compare.footnote)}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Notes + requirements ---------- */}
      <section className={`section ${styles.notes}`}>
        <div className="shell">
          <Reveal>
            <div className={styles.notesCard}>
              <img src="/logo-upscayl.png" alt="" className={styles.notesMark} width={32} height={32} />
              <h2 className={styles.notesTitle}>{t(p.notes.title)}</h2>
              <ul className={styles.notesList}>
                {p.notes.items.map((n) => (
                  <li key={n} className={styles.note}>
                    {t(n)}
                  </li>
                ))}
              </ul>
              <div className={styles.badges}>
                <span className={styles.badge}>
                  <LuShieldCheck size={15} /> {t('pricing.guarantee.0')} {t('pricing.guarantee.0By')}
                </span>
                <span className={styles.badge}>
                  <LuRefreshCw size={15} /> {t('pricing.guarantee.1')} {t('pricing.guarantee.1Forever')}
                </span>
                <span className={styles.badge}>
                  <LuDownload size={15} /> {t('pricing.guarantee.2')}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className={styles.requirements}>
              <p className={styles.reqHead}>{t(p.reqHead)}</p>
              <ul className={styles.reqList}>
                {p.requirements.map((r) => (
                  <li key={r} className={styles.req}>
                    <span className={styles.reqDot} />
                    {t(r)}
                  </li>
                ))}
              </ul>
              <p className={styles.macBadge}>{t(p.macBadge)}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className={`section ${styles.faq}`}>
        <div className="shell">
          <Reveal>
            <div className="section-head section-head--center">
              <p className="kicker">{tk(p.faq.kicker)}</p>
              <h2 className="section-title">{t(p.faq.title)}</h2>
              <p className="section-lede">{t(p.faq.lede)}</p>
            </div>
          </Reveal>

          <div className={styles.faqList}>
            {p.faq.items.map((item, i) => (
              <Reveal key={item.q} delay={(i % 2) * 60}>
                <FaqItem q={t(item.q)} a={t(item.a)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqItemOpen : ''}`}>
      <button
        type="button"
        className={styles.faqQ}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{q}</span>
        <LuChevronDown size={16} className={`${styles.faqChev} ${open ? styles.faqChevOpen : ''}`} />
      </button>
      <div className={`${styles.faqA} ${open ? styles.faqAOpen : ''}`}>
        <p>{a}</p>
      </div>
    </div>
  )
}
