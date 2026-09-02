import { useState } from 'react'
import { LuExternalLink, LuRefreshCw, LuRotateCw } from 'react-icons/lu'
import { Reveal } from '../components/ui/Reveal'
import { DownloadButton } from '../components/ui/DownloadButton'
import { useLazyLoad } from '../hooks/useInView'
import { useLocale } from '../hooks/useLocale'
import { useSeo } from '../hooks/useSeo'
import styles from './Explore.module.css'

/**
 * Explore, the REAL Arch Creator app, running live in the browser.
 * The app's web build is bundled at /demo-app (same origin), so the iframe
 * works identically in local dev and on the hosted site. Pre-seeded with a
 * demo world via the #demo deep-link. The iframe only mounts once it's near
 * the viewport so the heavy app bundle isn't fetched on page load.
 */
const DEMO_SRC = '/demo-app/index.html#demo'

export function Explore() {
  const [frameKey, setFrameKey] = useState(0)
  const { ref: frameRef, shouldLoad } = useLazyLoad<HTMLDivElement>('300px')
  const { t } = useLocale()

  useSeo({
    title: 'Explore the Live Demo — Arch Creator',
    description:
      'Try Arch Creator live in your browser. Click through the real app, crack a category open, and write a line. Pre-loaded with a demo world.',
    path: '/explore',
  })

  return (
    <>
      <header className={styles.header}>
        <div className="shell">
          <Reveal>
            <div className={styles.headerInner}>
              <p className="kicker">{t('explore.kicker')}</p>
              <h1 className={styles.title}>
                {t('explore.title1')} <em>{t('explore.title2')}</em>
              </h1>
              <p className={styles.lede}>{t('explore.lede')}</p>
            </div>
          </Reveal>
        </div>
      </header>

      <section className={styles.stage}>
        <div className="shell-wide">
          <Reveal>
            <div className={styles.stageWindow}>
              <div className={styles.frameBar}>
                <div className={styles.frameDots} aria-hidden="true">
                  <span className={styles.frameDot} />
                  <span className={styles.frameDot} />
                  <span className={styles.frameDot} />
                </div>
                <span className={styles.frameTitle}>{t('explore.frameTitle')}</span>
                <div className={styles.frameActions}>
                  <a className={styles.frameLink} href="/demo-app/" target="_blank" rel="noreferrer">
                    <LuExternalLink size={13} />
                    {t('explore.openFullscreen')}
                  </a>
                  <button type="button" className={styles.frameReset} onClick={() => setFrameKey((k) => k + 1)}>
                    <LuRefreshCw size={13} />
                    {t('explore.resetDemo')}
                  </button>
                </div>
              </div>

              <div className={styles.frameWrap}>
                {shouldLoad ? (
                  <div className={styles.frameScaler}>
                    <iframe
                      key={frameKey}
                      className={styles.frame}
                      src={DEMO_SRC}
                      title={t('explore.frameTitle')}
                      loading="eager"
                      allow="autoplay; fullscreen"
                    />
                    {/* Mobile portrait: the app is a desktop UI, so we show a
                        scaled-down preview and prompt to rotate for the full
                        interactive experience. */}
                    <div className={styles.rotateOverlay} aria-hidden="true">
                      <span className={styles.rotateIcon}>
                        <LuRotateCw size={22} />
                      </span>
                      <p className={styles.rotateText}>{t('explore.rotatePrompt')}</p>
                      <p className={styles.rotateSub}>{t('explore.rotateSub')}</p>
                    </div>
                  </div>
                ) : (
                  <div ref={frameRef} className={styles.framePlaceholder}>
                    <span className={styles.framePlaceholderText}>{t('explore.loading')}</span>
                  </div>
                )}
              </div>

              <p className={styles.frameNote}>{t('explore.frameNote')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="shell">
          <Reveal>
            <div className={styles.ctaInner}>
              <h2 className={styles.ctaTitle}>{t('explore.ctaTitle')}</h2>
              <p className={styles.ctaLede}>{t('explore.ctaLede')}</p>
              <div className={styles.ctaRow}>
                <DownloadButton className={styles.ctaBtn}>{t('explore.download')}</DownloadButton>
                <a href="/pricing" className="btn btn-ghost">
                  {t('explore.seePricing')}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
