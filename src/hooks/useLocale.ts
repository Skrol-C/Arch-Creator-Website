import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { i18n, setLocale } from '../i18n'

export type Locale = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'ja' | 'ko' | 'pl' | 'ru' | 'nl' | 'tr'

export const LOCALES: { id: Locale; label: string; flag: string }[] = [
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'es', label: 'Español', flag: '🇪🇸' },
  { id: 'fr', label: 'Français', flag: '🇫🇷' },
  { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { id: 'pt', label: 'Português', flag: '🇵🇹' },
  { id: 'it', label: 'Italiano', flag: '🇮🇹' },
  { id: 'ja', label: '日本語', flag: '🇯🇵' },
  { id: 'ko', label: '한국어', flag: '🇰🇷' },
  { id: 'pl', label: 'Polski', flag: '🇵🇱' },
  { id: 'ru', label: 'Русский', flag: '🇷🇺' },
  { id: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { id: 'tr', label: 'Türkçe', flag: '🇹🇷' },
]

const STORAGE_KEY = 'locale'

/** Rough region → language mapping for auto-detect. */
const REGION_LOCALE: Record<string, Locale> = {
  US: 'en', GB: 'en', CA: 'en', AU: 'en',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es',
  FR: 'fr', BE: 'fr',
  DE: 'de', AT: 'de', CH: 'de',
  PT: 'pt', BR: 'pt',
  IT: 'it',
  JP: 'ja',
  KR: 'ko',
  PL: 'pl',
  RU: 'ru',
  NL: 'nl',
  TR: 'tr',
}

export function detectRegionLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && LOCALES.some((l) => l.id === stored)) return null // user chose
    const nav = navigator.language?.split('-')[0] as Locale | undefined
    if (nav && LOCALES.some((l) => l.id === nav)) return nav
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? ''
    const region = tz.split('/')[1]?.slice(0, 2)?.toUpperCase()
    if (region && REGION_LOCALE[region]) return REGION_LOCALE[region]
  } catch {
    /* ignore */
  }
  return null
}

export function useLocale() {
  const { t: i18nT } = useTranslation()
  const [locale, setLocaleState] = useState<Locale>(() => (i18n.language as Locale) || 'en')

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  // Keep local state in sync if i18n changes language elsewhere.
  useEffect(() => {
    const onLang = () => setLocaleState((i18n.language as Locale) || 'en')
    i18n.on('languageChanged', onLang)
    return () => {
      i18n.off('languageChanged', onLang)
    }
  }, [])

  const choose = useCallback((l: Locale) => {
    void setLocale(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  /** Translate a dotted key like "nav.features" or "hero.lede". */
  const t = useCallback((key: string, opts?: Record<string, unknown>) => i18nT(key, opts) as string, [i18nT])

  /**
   * Translate a content.ts value that is itself a key (e.g. home.modules[0].name).
   * If the value is a plain key it resolves directly; any other string passes
   * through unchanged (prices, versions, emails, URLs stay as-is).
   */
  const tk = useCallback(
    (value: string) => {
      const PREFIXES = [
        'nav.', 'hero.', 'home.', 'features.', 'pricing.', 'roadmap.', 'changelog.', 'legal.',
        'about.', 'notFound.', 'footer.', 'download.', 'explore.', 'misc.', 'cost.', 'layout.',
      ]
      if (PREFIXES.some((p) => value.startsWith(p))) {
        return i18nT(value) as string
      }
      return value
    },
    [i18nT],
  )

  return { locale, choose, t, tk }
}

export type { Locale as LocaleId }
