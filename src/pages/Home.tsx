import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LuArrowRight } from 'react-icons/lu'
import { home } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import { InkWorld } from '../components/ui/InkWorld'
import { DownloadButton } from '../components/ui/DownloadButton'
import { prefersReducedMotion, useLazyLoad } from '../hooks/useInView'
import { useSeo } from '../hooks/useSeo'
import { useLocale } from '../hooks/useLocale'
import styles from './Home.module.css'

export function Home() {
  const [worldP, setWorldP] = useState(0.35)
  const { ref: monitorRef, shouldLoad: showMonitor } = useLazyLoad<HTMLDivElement>()
  const { t, tk } = useLocale()

  useSeo({
    title: 'Arch Studios — Worlds, built to last',
    description:
      'Arch Creator is the offline worldbuilding and writing app for storytellers. Worlds, characters, plot boards, and a manuscript that never leaves your device.',
    path: '/',
  })

  // The world forms as you scroll the hero away
  useEffect(() => {
    if (prefersReducedMotion()) {
      setWorldP(1)
      return
    }
    const onScroll = () => {
      const y = window.scrollY
      const k = Math.min(1, y / window.innerHeight)
      setWorldP(0.35 + k * 0.65)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* === Hero: the world born from ink === */}
      <section className={styles.hero}>
        <InkWorld progress={worldP} className={styles.ink} />
        <div className={`shell ${styles.heroInner}`}>
          <p className={styles.badge}>{t('hero.badge')}</p>
          <h1 className={styles.title}>
            {t('hero.title1')}
            <br />
            <em>{t('hero.title2')}</em>
          </h1>
          <p className={styles.lede}>{t('hero.lede')}</p>
          <div className={styles.ctaRow}>
            <DownloadButton>{t('hero.downloadFree')}</DownloadButton>
            <Link to="/explore" className="btn btn-ghost">
              {t('hero.tryDemo')}
            </Link>
          </div>
        </div>
        <div className={styles.scrollHint} aria-hidden="true">
          <span className={styles.scrollLine} />
          <span>{t('hero.scrollHint')}</span>
        </div>
      </section>

      {/* === The app, on a real screen === */}
      <section className={styles.screen}>
        <div className="shell">
          <Reveal>
            <div className={styles.screenHead}>
              <p className="kicker">{t(home.screenKicker)}</p>
              <h2 className={styles.screenTitle}>
                {t(home.screenTitle[0])} <em>{t(home.screenTitle[1])}</em>
              </h2>
              <p className={styles.screenLede}>{t(home.screenLede)}</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div ref={monitorRef} className={styles.monitor}>
              <div className={styles.monitorBezel}>
                {showMonitor && (
                  <video
                    className={styles.monitorVideo}
                    src="/video/app-montage.webm"
                    poster="/video/app-poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                  >
                    {t(home.videoFallback)}
                  </video>
                )}
              </div>
              <div className={styles.monitorStand} aria-hidden="true" />
              <div className={styles.monitorFoot} aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* === What's inside === */}
      <section className={styles.inside}>
        <div className="shell">
          <Reveal>
            <div className={styles.insideHead}>
              <p className="kicker">{t(home.insideKicker)}</p>
              <h2 className={styles.insideTitle}>
                {t(home.insideTitle[0])} <em>{t(home.insideTitle[1])}</em>
              </h2>
            </div>
          </Reveal>
          <ol className={styles.index}>
            {home.modules.map((m, i) => (
              <Reveal key={m.name} delay={(i % 2) * 80} as="li" className={styles.indexRow}>
                <span className={styles.indexNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.indexIcon}>
                  <m.icon size={18} />
                </span>
                <h3 className={styles.indexName}>{tk(m.name)}</h3>
                <p className={styles.indexBody}>{tk(m.body)}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <div className={styles.insideCta}>
              <Link to="/explore" className="btn btn-primary">
                {t(home.exploreLive)}
                <LuArrowRight className="chev" size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* === Ethos + colophon CTA === */}
      <section className={styles.colophon}>
        <div className="shell">
          <Reveal>
            <div className={styles.colophonInner}>
              <img src="/logo-upscayl.png" alt="" className={styles.colophonMark} width={54} height={54} />
              <h2 className={styles.colophonTitle}>{t(home.cta.title)}</h2>
              <p className={styles.colophonLede}>{t(home.cta.lede)}</p>
              <div className={styles.ctaRow}>
                <DownloadButton>{t(home.cta.download)}</DownloadButton>
                <Link to="/pricing" className="btn btn-ghost">
                  {t(home.cta.primary.label)}
                </Link>
              </div>
              <p className={styles.colophonEnd}>
                <span>Arch Studios</span>
                <span aria-hidden="true">·</span>
                <span>{t('misc.worldsBuiltToLast')}</span>
                <span aria-hidden="true">·</span>
                <span>{new Date().getFullYear()}</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
