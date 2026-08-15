import { Fragment } from 'react'
import { LuChevronDown, LuSparkles } from 'react-icons/lu'
import changelogRaw from '../data/changelog.md?raw'
import { changelog } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import styles from './Changelog.module.css'

interface Category {
  title: string
  items: string[]
}

interface Release {
  version: string
  date: string
  categories: Category[]
}

function parseChangelog(raw: string): Release[] {
  const releases: Release[] = []
  let current: Release | null = null
  let currentCat: Category | null = null
  for (const line of raw.split(/\r?\n/)) {
    const versionMatch = line.match(/^##\s+\[([^\]]+)\](?:\s*-\s*(.*))?$/)
    if (versionMatch) {
      current = { version: versionMatch[1], date: (versionMatch[2] ?? '').trim(), categories: [] }
      currentCat = null
      releases.push(current)
      continue
    }
    if (!current) continue
    const catMatch = line.match(/^###\s+(.+)$/)
    if (catMatch) {
      currentCat = { title: catMatch[1], items: [] }
      current.categories.push(currentCat)
      continue
    }
    const itemMatch = line.match(/^-\s+(.+)$/)
    if (itemMatch && currentCat) {
      currentCat.items.push(itemMatch[1])
      continue
    }
    if (currentCat && currentCat.items.length > 0 && line.trim() && !line.startsWith('#')) {
      currentCat.items[currentCat.items.length - 1] += ' ' + line.trim()
    }
  }
  return releases
}

const inline = (text: string) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>))

function CategoryBlock({ cat }: { cat: Category }) {
  return (
    <section className={styles.cat}>
      <h3 className={styles.catTitle}>{cat.title}</h3>
      <ul className={styles.catList}>
        {cat.items.map((item, i) => (
          <li key={i} className={styles.catItem}>
            {inline(item)}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Changelog() {
  const releases = parseChangelog(changelogRaw)
  const upcoming = releases.find((r) => r.version === 'Unreleased') ?? null
  const published = releases.filter((r) => r.version !== 'Unreleased')
  const featured = published[0] ?? null
  const older = published.slice(1)

  return (
    <>
      <section className={styles.header}>
        <div className="shell">
          <Reveal>
            <div className={styles.headerInner}>
              <p className="kicker">{changelog.header.kicker}</p>
              <h1 className={styles.title}>{changelog.header.title}</h1>
              <p className={styles.lede}>{changelog.header.lede}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          {upcoming && (
            <Reveal>
              <div className={styles.upcoming}>
                <span className={styles.upcomingChip}>
                  <LuSparkles size={13} /> Upcoming
                </span>
                {upcoming.categories.length > 0 && (
                  <div className={styles.upcomingBody}>
                    {upcoming.categories.map((cat) => (
                      <CategoryBlock key={cat.title} cat={cat} />
                    ))}
                  </div>
                )}
                {upcoming.categories.length === 0 && (
                  <p className={styles.upcomingEmpty}>Next release notes land here.</p>
                )}
              </div>
            </Reveal>
          )}

          {featured && (
            <Reveal>
              <article className={styles.featured}>
                <header className={styles.featuredHead}>
                  <span className={styles.versionChip}>v{featured.version}</span>
                  <span className={styles.date}>{featured.date}</span>
                </header>
                <div className={styles.featuredBody}>
                  {featured.categories.map((cat) => (
                    <CategoryBlock key={cat.title} cat={cat} />
                  ))}
                </div>
              </article>
            </Reveal>
          )}

          {older.length > 0 && (
            <div className={styles.older}>
              <Reveal>
                <h2 className={styles.olderTitle}>Earlier releases</h2>
              </Reveal>
              {older.map((rel, i) => (
                <Reveal key={rel.version} delay={i * 60}>
                  <details className={styles.details}>
                    <summary className={styles.summary}>
                      <span className={styles.summaryVersion}>v{rel.version}</span>
                      <span className={styles.summaryDate}>{rel.date}</span>
                      <LuChevronDown size={15} className={styles.summaryChev} />
                    </summary>
                    <div className={styles.detailsBody}>
                      {rel.categories.map((cat) => (
                        <CategoryBlock key={cat.title} cat={cat} />
                      ))}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
