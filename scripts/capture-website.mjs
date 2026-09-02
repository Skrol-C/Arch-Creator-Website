// Website screenshot capture — takes full-page + viewport shots of every page
// Usage: node scripts/capture-website.mjs [baseUrl]
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = process.argv[2] ?? 'http://localhost:5173'
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.shots')
mkdirSync(OUT, { recursive: true })

const PAGES = ['/', '/explore', '/features', '/pricing', '/about', '/changelog', '/roadmap', '/legal']
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

const browser = await chromium.launch()
for (const vp of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
  // Force reduced motion OFF so we capture the full choreography
  await context.addInitScript(() => {
    const orig = window.matchMedia.bind(window)
    window.matchMedia = (q) => {
      const m = orig(q)
      if (q.includes('prefers-reduced-motion')) return { ...m, matches: false }
      return m
    }
  })
  const page = await context.newPage()
  page.setDefaultTimeout(20000)
  for (const route of PAGES) {
    try {
      await page.goto(BASE + route, { waitUntil: 'networkidle' })
      await page.waitForTimeout(900)
      const slug = route === '/' ? 'home' : route.slice(1)
      await page.screenshot({ path: path.join(OUT, `${slug}-${vp.name}.png`), fullPage: false })
      console.log(`[shot] ${slug} @ ${vp.name}`)
    } catch (err) {
      console.log(`[FAIL] ${route} @ ${vp.name}: ${String(err).split('\n')[0]}`)
    }
  }
  await context.close()
}
await browser.close()
console.log('done')
