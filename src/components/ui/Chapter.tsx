import { Reveal } from './Reveal'
import styles from './Chapter.module.css'

interface ChapterProps {
  num: string
  kicker: string
  title: React.ReactNode
  lede?: string
  children: React.ReactNode
  /** The media column, pass a <Plate> or any figure */
  media?: React.ReactNode
  /** Reverses the copy/plate columns on wide screens */
  flip?: boolean
  /** Render the media column on top on mobile too */
  mediaFirstMobile?: boolean
}

/**
 * An editorial spread: a numbered chapter whose copy sits in a measured column
 * with marginalia, and whose media sits in an offset, oversized plate.
 * This is the structural unit of the site, no more centered hero + card grids.
 */
export function Chapter({ num, kicker, title, lede, children, media, flip = false, mediaFirstMobile = false }: ChapterProps) {
  return (
    <section className={`${styles.spread} ${flip ? styles.flip : ''}`}>
      <div className={`shell-wide ${styles.inner}`}>
        <Reveal className={`${styles.copy} ${mediaFirstMobile ? styles.copyBelowMobile : ''}`}>
          <header className={styles.head}>
            <p className={styles.num}>{num}</p>
            <div>
              <p className="kicker">{kicker}</p>
              <h2 className={styles.title}>{title}</h2>
              {lede && <p className={styles.lede}>{lede}</p>}
            </div>
          </header>
          <div className={styles.marginalia} aria-hidden="true">
            <span className={styles.margRule} />
            <span className={styles.margText}>{num}</span>
          </div>
          <div className={styles.body}>{children}</div>
        </Reveal>

        {media && (
          <Reveal delay={120} className={`${styles.media} ${mediaFirstMobile ? styles.mediaTopMobile : ''}`}>
            {media}
          </Reveal>
        )}
      </div>
    </section>
  )
}

/**
 * A figure that fills the Chapter's media column, an engraved plate with
 * caption. The screenshot is sepia at rest and "inks in" to color on hover.
 */
export function Plate({
  fig,
  caption,
  src,
  alt,
  children,
  wide = false,
}: {
  fig: string
  caption: string
  src?: string
  alt?: string
  children?: React.ReactNode
  /** renders the media full-width of the spread instead of offset */
  wide?: boolean
}) {
  return (
    <figure className={`${styles.plate} ${wide ? styles.plateWide : ''}`}>
      <div className="plate-media">
        {src ? <img src={src} alt={alt ?? ''} className="plate-img" loading="lazy" width={1440} height={900} /> : children}
      </div>
      <figcaption className="plate-caption">
        <span className="plate-fig">{fig}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  )
}
