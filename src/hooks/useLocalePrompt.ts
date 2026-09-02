import { useEffect, useState } from 'react'
import { detectRegionLocale, LOCALES, useLocale, type Locale } from './useLocale'

/**
 * On first visit, detect the visitor's region/language and offer to switch the
 * UI to it with a small dismissible banner. Only shows once per visit.
 */
export function useLocalePrompt() {
  const { locale, choose } = useLocale()
  const [suggest, setSuggest] = useState<Locale | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const detected = detectRegionLocale()
    if (detected && detected !== locale && !dismissed) {
      // Only suggest after a short beat so it doesn't flash on load
      const t = window.setTimeout(() => setSuggest(detected), 1200)
      return () => window.clearTimeout(t)
    }
  }, [locale, dismissed])

  const accept = () => {
    if (suggest) choose(suggest)
    setSuggest(null)
  }

  const decline = () => {
    setSuggest(null)
    setDismissed(true)
  }

  const meta = suggest ? LOCALES.find((l) => l.id === suggest) : null

  return { suggest, meta, accept, decline }
}
