import { useEffect } from 'react'

interface SeoProps {
  title: string
  description: string
  /** Relative path like "/pricing" for canonical + OG url */
  path?: string
  /** Optional OG image (defaults to /logo-upscayl.png) */
  image?: string
  type?: string
}

const SITE = 'https://archstudios.dev'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Sets document title, meta description, canonical, and Open Graph tags. */
export function useSeo({ title, description, path = '/', image = '/logo-upscayl.png', type = 'website' }: SeoProps) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', SITE + path)
    setMeta('property', 'og:image', SITE + image)
    setMeta('property', 'og:site_name', 'Arch Studios')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', SITE + image)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', SITE + path)
  }, [title, description, path, image, type])
}
