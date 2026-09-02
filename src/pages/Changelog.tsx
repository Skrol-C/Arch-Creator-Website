import { Fragment, useEffect, useState } from 'react'
import { LuChevronDown, LuSparkles } from 'react-icons/lu'
import changelogRaw from '../data/changelog.md?raw'
import { changelog } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import { useLocale } from '../hooks/useLocale'
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

/**
 * Fetch releases from the public GitHub mirror. The release body is written
 * from the app's CHANGELOG (same ### category / - item markdown), so it parses
 * with the same logic as the bundled file. This is what keeps the site's
 * changelog in sync automatically when a new build ships.
 */
const RELEASES_URL = 'https://api.github.com/repos/Skrol-C/Arch-Creator-Releases/releases?per_page=50'

function parseReleaseBody(release: { tag_name: string; published_at: string; body: string }): Release {
  // The body is markdown without the "## [x.y.z]" header; synthesize it so the
  // existing parser handles category/item extraction.
  const synthesized = `## [${release.tag_name.replace(/^v/, '')}] - ${release.published_at.slice(0, 10)}\n${release.body ?? ''}`
  const parsed = parseChangelog(synthesized)
  return parsed[0] ?? { version: release.tag_name.replace(/^v/, ''), date: release.published_at.slice(0, 10), categories: [] }
}

async function fetchReleases(): Promise<Release[]> {
  // Cache in sessionStorage so repeat visits within a session don't re-hit
  // the unauthenticated GitHub API rate limit (60 req/hr per IP).
  const CACHE_KEY = 'changelog-releases-v1'
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) return JSON.parse(cached) as Release[]
  } catch {
    /* storage unavailable */
  }
  const res = await fetch(RELEASES_URL, { headers: { Accept: 'application/vnd.github+json' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = (await res.json()) as { tag_name: string; published_at: string; body: string }[]
  const releases = json.map(parseReleaseBody).filter((r) => r.categories.length > 0)
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(releases))
  } catch {
    /* storage unavailable */
  }
  return releases
}

export function Changelog() {
  const bundled = parseChangelog(changelogRaw)
  const upcoming = bundled.find((r) => r.version === 'Unreleased') ?? null

  const [live, setLive] = useState<Release[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    fetchReleases()
      .then((releases) => {
        if (alive) setLive(releases)
      })
      .catch(() => {
        if (alive) setFailed(true)
      })
    return () => {
      alive = false
    }
  }, [])

  // Prefer live releases from GitHub; fall back to the bundled file.
  const published = live ?? (failed ? bundled.filter((r) => r.version !== 'Unreleased') : null)
  const featured = published?.[0] ?? null
  const older = published ? published.slice(1) : []

  const { t, tk } = useLocale()

  return (
    <>
      <section className={styles.header}>
        <div className="shell">
          <Reveal>
            <div className={styles.headerInner}>
              <p className="kicker">{tk(changelog.header.kicker)}</p>
              <h1 className={styles.title}>{t(changelog.header.title)}</h1>
              <p className={styles.lede}>{t(changelog.header.lede)}</p>
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
                  <LuSparkles size={13} /> {t(changelog.upcoming)}
                </span>
                {upcoming.categories.length > 0 && (
                  <div className={styles.upcomingBody}>
                    {upcoming.categories.map((cat) => (
                      <CategoryBlock key={cat.title} cat={cat} />
                    ))}
                  </div>
                )}
                {upcoming.categories.length === 0 && (
                  <p className={styles.upcomingEmpty}>{t(changelog.upcomingEmpty)}</p>
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
                <h2 className={styles.olderTitle}>{t(changelog.earlier)}</h2>
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
