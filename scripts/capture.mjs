import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/screenshots')
mkdirSync(OUT, { recursive: true })

const APP = 'http://localhost:1420'
const log = (msg) => console.log(`[capture] ${msg}`)
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const preload = () => {
  window.localStorage.setItem('reduceMotion', 'true')
  window.localStorage.setItem('loadingAnimation', 'false')
  window.localStorage.setItem('cursorEnabled', 'false')
  window.localStorage.setItem('ambientEffects', 'false')
  window.localStorage.setItem('soundEnabled', 'false')
  window.localStorage.setItem('selectSkin', 'panel')
  window.localStorage.setItem('lastSeenVersion', '2.3.1')
}

const launch = async () => {
  for (const channel of ['chrome', 'msedge']) {
    try {
      const b = await chromium.launch({ channel })
      log(`using system ${channel}`)
      return b
    } catch {
      /* try next */
    }
  }
  log('using bundled chromium')
  return chromium.launch()
}

const browser = await launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
await context.addInitScript(preload)
const page = await context.newPage()
page.setDefaultTimeout(15000)
page.on('dialog', (d) => void d.dismiss())

const shot = (name) => page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: false })
const sidebar = (name) => page.locator('.sidebar-nav').getByRole('button', { name }).first()
const reset = async () => {
  await page.reload({ waitUntil: 'domcontentloaded' }).catch(() => {})
  await page.waitForSelector('.app-container', { timeout: 25000 }).catch(() => {})
  await page.waitForSelector('.sidebar-nav .sidebar-item', { timeout: 20000 }).catch(() => {})
  await page.locator('.rl-overlay').click({ force: true }).catch(() => {})
  await wait(1200)
}

const section = async (name, fn) => {
  try {
    await fn()
    log(`done: ${name}`)
  } catch (err) {
    log(`FAILED: ${name} — ${err?.message ?? err}`.split('\n')[0])
  }
}

/* 1. Seed the demo world and load the shelf */
await section('home-shelf', async () => {
  await page.goto(`${APP}/#demo`, { waitUntil: 'domcontentloaded' }).catch(() => {})
  await page.waitForSelector('.app-container', { timeout: 30000 })
  await page.waitForSelector('.sidebar-nav .sidebar-item', { timeout: 25000 })
  await page.locator('.rl-overlay').click({ force: true }).catch(() => {})
  await page.waitForSelector('text=The Drowned Coast', { timeout: 15000 }).catch(() => {})
  await wait(1600)
  await shot('home-shelf')
})

/* 2. Worlds grid */
await section('worlds', async () => {
  await sidebar('Worlds').click()
  await wait(1600)
  await shot('worlds')
})

/* 3. Create a book linked to the demo world -> lands in Studio */
await section('book-create', async () => {
  await page.getByRole('button', { name: 'New book in The Drowned Coast', exact: true }).click()
  await page.waitForSelector('#bed-title', { timeout: 10000 })
  await page.fill('#bed-title', 'Tidefall')
  await page.click('.bed-btn-primary')
  await wait(2200)
  await shot('binder')
})

/* 4. Studio: add a chapter, write prose, open Quill pane */
await section('studio', async () => {
  await page.getByRole('button', { name: 'New chapter', exact: true }).click()
  await wait(1000)
  await page.locator('.as-chapter-row').first().click().catch(() => {})
  await wait(900)
  const title = page.locator('.as-chapter-head [aria-label="Chapter title"]').first()
  await title.click()
  await title.fill('The Atrium Clock')
  const prose = page.locator('[aria-label="Chapter prose"]').first()
  await prose.click()
  await page.keyboard.type(
    'The brass clock in the Atrium tower had run slow for three days, and Kael noticed because no one else would. Ten minutes, then eleven — the city moved to its beat and never felt the drag. He pressed his palm flat against the copper face and felt, beneath the polished plate, something that had never been there before: a second mechanism, ticking in the dark.',
  )
  await wait(800)
  await page.getByRole('button', { name: 'Open Quill pane', exact: true }).click().catch(() => {})
  await wait(3000)
  await shot('studio')
  await page.locator('.as-pane-quill').screenshot({ path: path.join(OUT, 'quill.png') }).catch(() => {})
})

/* 5. Plot board */
await section('plot', async () => {
  await sidebar('Plot').click()
  await wait(1400)
  await page.locator('.plot-intro').click({ force: true }).catch(() => {})
  await wait(1000)
  await page.getByRole('button', { name: 'Board', exact: true }).click().catch(() => {})
  await wait(1200)
  await shot('plot')
})

/* 6. Library + Worldbuilding overlay */
await section('library', async () => {
  await sidebar('Library').click()
  await wait(1600)
  await shot('library')
  await page.locator('[title="Worldbuilding"]').click()
  await wait(2000)
  await page.locator('[class*="intro"]').first().click({ force: true }).catch(() => {})
  await wait(1000)
  await shot('worldbuilding')
})

/* 7. World overview + calendar (build a calendar via History) */
await section('calendar', async () => {
  await reset()
  await sidebar('Worlds').click()
  await wait(1400)
  await page.locator('.wv-card').first().click()
  await wait(1800)
  await page.locator('[aria-label="Entering The Drowned Coast"]').click({ force: true }).catch(() => {})
  await wait(1000)
  await page.locator('.wo-link:has-text("History")').click().catch(async () => {
    await page.getByRole('button', { name: 'History', exact: true }).click()
  })
  await wait(1200)
  const preset = page.locator('.cs-preset').first()
  if ((await preset.count()) > 0) {
    await preset.click()
    await wait(400)
  }
  for (let i = 0; i < 14; i++) {
    const build = page.locator('.cs-next:has-text("Build calendar")')
    if ((await build.count()) > 0) {
      await build.first().click()
      break
    }
    const next = page.locator('.cs-next').first()
    if ((await next.count()) === 0) break
    await next.click()
    await wait(300)
  }
  await wait(1400)
  await shot('calendar')
})

/* 8. Final shelf (book + world present) */
await section('shelf', async () => {
  await reset()
  await sidebar('Home').click()
  await wait(1400)
  await shot('shelf')
})

await browser.close()
log('finished')
