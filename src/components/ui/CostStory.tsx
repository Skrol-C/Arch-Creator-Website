import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../hooks/useInView'
import { useLocale } from '../../hooks/useLocale'
import styles from './CostStory.module.css'

interface CostRow {
  name: string
  values: number[]
  highlight?: boolean
}

interface CostStoryProps {
  years: number[]
  rows: CostRow[]
}

/**
 * Scroll-driven "cost over time" story. As the section scrolls into view, the
 * competitor bars climb over 1, 3 and 5 years while Arch Creator stays flat.
 * A running "what you save" counter tracks the widening gap.
 */
export function CostStory({ years, rows }: CostStoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const { t, tk } = useLocale()

  useEffect(() => {
    if (prefersReducedMotion()) {
      setProgress(1)
      return
    }
    const el = sectionRef.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // start when the section top enters ~80% of the viewport,
      // done when its bottom reaches ~20%
      const start = vh * 0.85
      const end = vh * 0.2
      const total = rect.height + (start - end)
      const traveled = start - rect.top
      setProgress(Math.min(1, Math.max(0, traveled / total)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const maxYear = Math.max(...years)
  const ourRow = rows.find((r) => r.highlight)
  const ourCost = ourRow?.values[ourRow.values.length - 1] ?? 60
  // Average cost of the "renting" tools at the furthest year
  const renters = rows.filter((r) => !r.highlight)
  const avgRentAtMax = renters.length
    ? renters.reduce((s, r) => s + r.values[r.values.length - 1], 0) / renters.length
    : 0
  const savings = Math.max(0, Math.round((avgRentAtMax - ourCost) * progress))

  return (
    <div ref={sectionRef} className={styles.story}>
      <p className={styles.kicker}>{t('cost.kicker')}</p>
      <h3 className={styles.title}>
        {t('cost.title1')} <em>{t('cost.title2')}</em>. {t('cost.title3')} <em>{t('cost.title4')}</em>.
      </h3>
      <p className={styles.lede}>{t('cost.lede')}</p>

      <div className={styles.chart}>
        {/* header row: years */}
        <div className={styles.headRow}>
          <span className={styles.headName}>{t('cost.tool')}</span>
          {years.map((y) => (
            <span key={y} className={styles.headYear}>
              {y} {y === 1 ? t('cost.year') : t('cost.years')}
            </span>
          ))}
        </div>

        {rows.map((row) => (
          <div key={row.name} className={`${styles.row} ${row.highlight ? styles.rowHot : ''}`}>
            <span className={styles.rowName}>{tk(row.name)}</span>
            <div className={styles.bars}>
              {row.values.map((v, i) => {
                const year = years[i]
                const frac = year / maxYear
                const eased = 1 - Math.pow(1 - progress * frac, 3)
                const widthPct = 18 + 82 * eased
                return (
                  <div key={i} className={styles.barWrap}>
                    <div className={styles.barTrack}>
                      <div
                        className={`${styles.barFill} ${row.highlight ? styles.barFillHot : ''}`}
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                    <span className={styles.barVal}>${v.toLocaleString()}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.outcome}>
        <p className={styles.outcomeLabel}>
          {t('cost.after', { years: maxYear })}
        </p>
        <p className={styles.outcomeAvg}>${avgRentAtMax.toLocaleString()}</p>
        <p className={styles.outcomeVersus}>{t('cost.vs')}</p>
        <p className={styles.outcomeOurs}>${ourCost}</p>
        <p className={styles.outcomeSave}>
          {t('cost.save')} <strong>${savings.toLocaleString()}</strong>
        </p>
      </div>
    </div>
  )
}
