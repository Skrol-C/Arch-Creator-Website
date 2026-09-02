import { LuArrowUpRight, LuMail } from 'react-icons/lu'
import { about, contact, site } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import { useSeo } from '../hooks/useSeo'
import { useLocale } from '../hooks/useLocale'
import styles from './About.module.css'

export function About() {
  const { t, tk } = useLocale()

  useSeo({
    title: 'About — Arch Studios',
    description:
      'A small studio for storytellers. Arch Studios builds Arch Creator, the offline worldbuilding and writing app for people who make worlds.',
    path: '/about',
  })

  return (
    <>
      <header className={styles.header}>
        <div className="shell">
          <Reveal>
            <div className={styles.headerInner}>
              <p className="kicker">{tk(about.header.kicker)}</p>
              <h1 className={styles.title}>{t(about.header.title)}</h1>
              <p className={styles.lede}>{t(about.header.lede)}</p>
            </div>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className={styles.story}>
              {about.story.map((p, i) => (
                <p key={p} className={`${styles.storyPara} ${i === 0 ? styles.storyParaFirst : ''}`}>
                  {t(p)}
                </p>
              ))}
            </div>
          </Reveal>

          <div className={styles.values}>
            {about.values.map((v, i) => (
              <Reveal key={v.name} delay={i * 100} as="article" className={styles.value}>
                <span className={styles.valueIcon}>
                  <v.icon size={20} />
                </span>
                <p className={styles.valueStep}>0{i + 1}</p>
                <h2 className={styles.valueName}>{tk(v.name)}</h2>
                <p className={styles.valueBody}>{tk(v.body)}</p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className={styles.colophon}>
              <img src="/logo-upscayl.png" alt="" className={styles.colophonMark} width={44} height={44} />
              <p className={styles.colophonLine}>
                <span>{tk(about.values[0].name)}</span>
                <span aria-hidden="true">·</span>
                <span>{tk(about.values[1].name)}</span>
                <span aria-hidden="true">·</span>
                <span>{tk(about.values[2].name)}</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.contact}`}>
        <div className="shell">
          <div className={styles.contactCard}>
            <div className={styles.contactCol}>
              <p className="kicker">{tk(contact.kicker)}</p>
              <h2 className={styles.contactTitle}>{t(contact.title)}</h2>
              <p className={styles.contactLede}>{t(contact.lede)}</p>
              <a className={`btn btn-ghost ${styles.mailBtn}`} href={`mailto:${site.email}`}>
                <LuMail size={15} />
                {site.email}
              </a>
            </div>
            <div className={styles.contactCol}>
              <p className={styles.newsHead}>{t(contact.discordTitle)}</p>
              <p className={styles.newsLed}>{t(contact.discordLed)}</p>
              <a
                href={site.discord}
                target="_blank"
                rel="noreferrer"
                className={`btn btn-primary ${styles.discordBtn}`}
              >
                {t(contact.joinDiscord)}
                <LuArrowUpRight size={14} />
              </a>
              <p className={styles.newsNote}>{t(contact.newsNote)}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
