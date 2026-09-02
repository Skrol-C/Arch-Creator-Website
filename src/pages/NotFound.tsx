import { Link } from 'react-router-dom'
import { LuArrowLeft, LuHouse, LuSearch } from 'react-icons/lu'
import { Reveal } from '../components/ui/Reveal'
import { InkWorld } from '../components/ui/InkWorld'
import { useLocale } from '../hooks/useLocale'
import styles from './NotFound.module.css'

export function NotFound() {
  const { t } = useLocale()
  return (
    <section className={styles.wrap}>
      <InkWorld className={styles.ink} />
      <div className={`shell ${styles.inner}`}>
        <Reveal>
          <p className={styles.kicker}>{t('notFound.kicker')}</p>
          <h1 className={styles.title}>
            {t('notFound.title1')} <em>{t('notFound.title2')}</em>.
          </h1>
          <p className={styles.lede}>{t('notFound.lede')}</p>
          <div className={styles.actions}>
            <Link to="/" className="btn btn-primary">
              <LuHouse size={14} />
              {t('notFound.home')}
            </Link>
            <Link to="/explore" className="btn btn-ghost">
              <LuSearch size={14} />
              {t('notFound.demo')}
            </Link>
            <Link to="/download" className="btn btn-ghost">
              <LuArrowLeft size={14} />
              {t('notFound.download')}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
