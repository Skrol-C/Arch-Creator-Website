import { useEffect, useState } from 'react'
import { LuDownload, LuLoader } from 'react-icons/lu'
import { Reveal } from '../components/ui/Reveal'
import { detectPlatform, resolveInstallerUrl, type PlatformId } from '../lib/download'
import { useSeo } from '../hooks/useSeo'
import { useLocale } from '../hooks/useLocale'
import styles from './Download.module.css'

const LATEST_VERSION = '2.5.0'

/** Official Apple logo path (Simple Icons). */
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

/** Official Windows 4-pane logo (Simple Icons). */
function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M0 3.449L9.75 2.1v9.451H0v-8.102zm10.949-1.602L24 0v11.4H10.949V1.847zm-10.949 9.948H9.75v8.303l-9.75-1.352v-6.951zm10.949 0H24v9.902L10.949 20.354V11.795z" />
    </svg>
  )
}

const PLATFORMS: {
  id: PlatformId
  name: string
  icon: 'apple' | 'windows' | 'tux'
  chipClass: string
  line: string
  variants: { label: string; note: string; available: boolean }[]
}[] = [
  {
    id: 'macos',
    name: 'macOS',
    icon: 'apple',
    chipClass: styles.chipMac,
    line: 'download.mac.line',
    variants: [{ label: 'download.mac.variant.0', note: 'download.mac.variant.0.note', available: true }],
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: 'windows',
    chipClass: styles.chipWin,
    line: 'download.windows.line',
    variants: [
      { label: 'download.windows.variant.0', note: 'download.windows.variant.0.note', available: true },
      { label: 'download.windows.variant.1', note: 'download.windows.variant.1.note', available: false },
    ],
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: 'tux',
    chipClass: styles.chipLin,
    line: 'download.linux.line',
    variants: [
      { label: 'download.linux.variant.0', note: 'download.linux.variant.0.note', available: false },
      { label: 'download.linux.variant.1', note: 'download.linux.variant.1.note', available: false },
    ],
  },
]

export function Download() {
  const [detected, setDetected] = useState<PlatformId>('windows')
  const [busy, setBusy] = useState<PlatformId | null>(null)
  const { t } = useLocale()

  useSeo({
    title: 'Download — Arch Creator',
    description:
      'Download Arch Creator for Windows and macOS. Free to start, no account, your worlds live on your machine.',
    path: '/download',
  })

  useEffect(() => {
    setDetected(detectPlatform())
  }, [])

  const grab = async (platform: PlatformId) => {
    setBusy(platform)
    try {
      const url = await resolveInstallerUrl(platform)
      window.location.href = url
    } finally {
      setBusy(null)
    }
  }

  const renderIcon = (p: (typeof PLATFORMS)[number]) => {
    if (p.icon === 'apple') return <AppleLogo className={styles.osLogo} />
    if (p.icon === 'windows') return <WindowsLogo className={styles.osLogo} />
    return <img src="/linux-tux.png" alt="" className={styles.osLogo} width={44} height={44} />
  }

  return (
    <>
      <header className={styles.header}>
        <div className="shell">
          <Reveal>
            <div className={styles.headerInner}>
              <p className="kicker">{t('download.kicker')}{LATEST_VERSION}</p>
              <h1 className={styles.title}>
                {t('download.title')}
              </h1>
              <p className={styles.lede}>{t('download.lede')}</p>
            </div>
          </Reveal>
        </div>
      </header>

      <section className={`section ${styles.stage}`}>
        <div className="shell">
          <div className={styles.grid}>
            {PLATFORMS.map((p, i) => (
              <Reveal key={p.id} delay={i * 90} as="article" className={styles.card}>
                <span className={`${styles.cardIcon} ${p.chipClass}`}>{renderIcon(p)}</span>
                <h2 className={styles.cardName}>{p.name}</h2>
                <p className={styles.cardLine}>{t(p.line)}</p>

                <div className={styles.variants}>
                  {p.variants.map((v) => (
                    <button
                      key={v.label}
                      type="button"
                      className={styles.variant}
                      disabled={!v.available || busy !== null}
                      onClick={() => grab(p.id)}
                    >
                      <span className={styles.variantInfo}>
                        <span className={styles.variantLabel}>{t(v.label)}</span>
                        <span className={styles.variantNote}>{t(v.note)}</span>
                      </span>
                      {v.available ? (
                        busy === p.id ? (
                          <LuLoader size={16} className={styles.spin} />
                        ) : (
                          <LuDownload size={16} />
                        )
                      ) : (
                        <span className={styles.variantSoon}>{t('download.soon')}</span>
                      )}
                    </button>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Auto-detect */}
          <Reveal>
            <div className={styles.detectRow}>
              <p className={styles.detectLabel}>
                {t('download.detectLabel')} <strong>{PLATFORMS.find((p) => p.id === detected)?.name}</strong>.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                disabled={busy !== null}
                onClick={() => grab(detected)}
              >
                {busy === detected ? <LuLoader size={14} className={styles.spin} /> : <LuDownload size={14} />}
                {t('download.detectAuto')}
              </button>
            </div>
          </Reveal>

          <Reveal>
            <p className={styles.footnote}>{t('download.footnote')}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
