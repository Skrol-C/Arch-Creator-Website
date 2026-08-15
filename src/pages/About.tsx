import { useState } from 'react'
import type { FormEvent } from 'react'
import { LuArrowRight, LuMail } from 'react-icons/lu'
import { about, contact, site, urls } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import styles from './About.module.css'

export function About() {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className={styles.header}>
        <div className="shell">
          <Reveal>
            <div className={styles.headerInner}>
              <p className="kicker">{about.header.kicker}</p>
              <h1 className={styles.title}>{about.header.title}</h1>
              <p className={styles.lede}>{about.header.lede}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className={styles.story}>
              {about.story.map((p) => (
                <p key={p.slice(0, 24)} className={styles.storyPara}>
                  {p}
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
                <h2 className={styles.valueName}>{v.name}</h2>
                <p className={styles.valueBody}>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.contact}`}>
        <div className="shell">
          <div className={styles.contactCard}>
            <div className={styles.contactCol}>
              <p className="kicker">{contact.kicker}</p>
              <h2 className={styles.contactTitle}>{contact.title}</h2>
              <p className={styles.contactLede}>{contact.lede}</p>
              <a className={`btn btn-ghost ${styles.mailBtn}`} href={`mailto:${site.email}`}>
                <LuMail size={15} />
                {site.email}
              </a>
            </div>
            <div className={styles.contactCol}>
              <p className={styles.newsHead}>{contact.newsletterTitle}</p>
              <p className={styles.newsLed}>{contact.newsletterLed}</p>
              {submitted ? (
                <p className={styles.newsDone}>
                  You are on the list. The next letter will find its way to you.
                </p>
              ) : (
                <form className={styles.newsForm} onSubmit={onSubmit}>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={styles.newsInput}
                  />
                  <button type="submit" className="btn btn-primary" aria-label="Subscribe to the Survey">
                    Subscribe
                    <LuArrowRight className="chev" size={14} />
                  </button>
                </form>
              )}
              <p className={styles.newsNote}>
                A few letters a year. No spam, unsubscribe any time.
              </p>
            </div>
          </div>

          <Reveal>
            <div className={styles.socialRow}>
              <span className={styles.socialHead}>Find the studio elsewhere</span>
              <a
                href={urls.releases}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
