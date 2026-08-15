import { chromium } from 'playwright'
import { mkdirSync, readdirSync, renameSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public', 'video')
mkdirSync(OUT, { recursive: true })

const APP = 'http://localhost:1420'
const log = (msg) => console.log(`[video] ${msg}`)
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const preload = () => {
  window.localStorage.clear()
  window.localStorage.setItem('loadingAnimation', 'true')
  window.localStorage.setItem('cursorEnabled', 'false')
  window.localStorage.setItem('ambientEffects', 'false')
  window.localStorage.setItem('soundEnabled', 'false')
  window.localStorage.setItem('reduceMotion', 'false')
  window.localStorage.setItem('lastSeenVersion', '2.3.1')
}

const launch = async () => {
  for (const channel of ['chrome', 'msedge']) {
    try {
      return await chromium.launch({ channel })
    } catch {
      /* try next */
    }
  }
  return chromium.launch()
}

const browser = await launch()
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: OUT, size: { width: 1280, height: 720 } },
})
await context.addInitScript(preload)
const page = await context.newPage()
page.setDefaultTimeout(15000)
page.on('dialog', (d) => void d.dismiss())

const step = async (label, fn) => {
  try {
    await fn()
    log(`done: ${label}`)
  } catch (e) {
    log(`warn: ${label} — ${String(e).split('\n')[0]}`)
  }
}

/* 1. Boot: loading-screen intro, then the landing hero */
await page.goto(`${APP}/`, { waitUntil: 'domcontentloaded' }).catch(() => {})
await page.waitForSelector('.app-container', { timeout: 30000 }).catch(() => {})
await wait(4200)
await wait(2000)
await step('poster', () => page.screenshot({ path: path.join(OUT, 'app-poster.jpg'), type: 'jpeg', quality: 82 }))
await wait(1500)

/* 2. Start with a world -> Worlds view */
await step('worlds view', async () => {
  await page.getByRole('button', { name: 'Start with a world' }).click()
  await wait(1600)
})

/* 3. Create a world -> animated cover */
await step('create world', async () => {
  await page.getByRole('button', { name: 'New world' }).click()
  await page.fill('[aria-label="New world name"]', 'The Ember Coast')
  await page.keyboard.press('Enter')
  await wait(2000)
})

/* 4. Open the world -> WorldOpenIntro */
await step('open world', async () => {
  await page.locator('.wv-card:not(.wv-add)').first().click()
  await wait(3400)
})
await step('dismiss world intro', async () => {
  await page.locator('[aria-label*="Entering"]').click({ force: true }).catch(() => {})
  await wait(1200)
})

/* 5. Worldbuilding -> WorldbuildingIntro */
await step('open worldbuilding', async () => {
  await page
    .locator('.wo-link:has-text("Worldbuilding")')
    .click()
    .catch(async () => {
      await page.getByRole('button', { name: 'Worldbuilding', exact: true }).click().catch(() => {})
    })
  await wait(3400)
})

await wait(1200)
await browser.close()

const files = readdirSync(OUT).filter((f) => f.endsWith('.webm'))
log(`recorded: ${files.join(', ')}`)
if (files.length) {
  const src = path.join(OUT, files[0])
  const dst = path.join(OUT, 'app-montage.webm')
  if (src !== dst) renameSync(src, dst)
  log('saved -> public/video/app-montage.webm')
}
log('finished')
