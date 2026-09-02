import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './keys'

// Load a translation JSON for the given language. Files live in
// public/locales/{lang}/translation.json so they can be fetched lazily.
async function loadLocale(lang: string): Promise<Record<string, unknown>> {
  const res = await fetch(`/locales/${lang}/translation.json`)
  if (!res.ok) throw new Error(`missing locale ${lang}`)
  return res.json()
}

export function initI18n() {
  return i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'pl', 'ru', 'nl', 'tr'],
    interpolation: { escapeValue: false },
    // English ships in the bundle so nothing ever shows a raw key.
    resources: { en: { translation: en } },
    react: { useSuspense: false },
    returnNull: false,
    parseMissingKeyHandler: (key) => resolveKey('en', key) ?? key,
  })
}

/** Resolve a key against a specific bundle, falling back to English. */
export function resolveKey(lang: string, key: string): string | undefined {
  const walk = (bundle: unknown, path: string[]): string | undefined => {
    let node: unknown = bundle
    for (const part of path) {
      if (node && typeof node === 'object' && part in (node as Record<string, unknown>)) {
        node = (node as Record<string, unknown>)[part]
      } else {
        return undefined
      }
    }
    return typeof node === 'string' ? node : undefined
  }
  const parts = key.split('.')
  const direct = walk(i18n.getResourceBundle(lang, 'translation'), parts)
  if (direct) return direct
  return walk(i18n.getResourceBundle('en', 'translation'), parts)
}

export async function setLocale(lang: string) {
  try {
    // Always fetch the real file so an empty stub can never mask content.
    const bundle = await loadLocale(lang)
    i18n.addResourceBundle(lang, 'translation', bundle, true, true)
  } catch {
    // File missing: keep whatever we have (English stub or nothing).
  }
  await i18n.changeLanguage(lang)
}

export { i18n }
