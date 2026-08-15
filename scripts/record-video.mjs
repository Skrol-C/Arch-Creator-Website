import { chromium } from 'playwright'
import { mkdirSync, readdirSync, renameSync, rmSync, statSync } from 'node:fs'
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

/* 1. Boot: loading intro, then the landing hero (brief) */
await page.goto(`${APP}/`, { waitUntil: 'domcontentloaded' }).catch(() => {})
await page.waitForSelector('.app-container', { timeout: 30000 }).catch(() => {})
await wait(3800)
await wait(1400)
await step('poster', () => page.screenshot({ path: path.join(OUT, 'app-poster.jpg'), type: 'jpeg', quality: 82 }))
await wait(800)

/* 2. Start with a world -> create it */
await step('worlds view', async () => {
  await page.getByRole('button', { name: 'Start with a world' }).click()
  await wait(1200)
})
await step('create world', async () => {
  await page.getByRole('button', { name: 'New world' }).click()
  await page.fill('[aria-label="New world name"]', 'The Ember Coast')
  await page.keyboard.press('Enter')
  await wait(1600)
})

/* 3. Open Worldbuilding directly -> WorldbuildingIntro */
await step('open worldbuilding', async () => {
  await page.locator('.wv-open--ghost').click().catch(async () => {
    await page.getByRole('button', { name: 'Worldbuilding', exact: true }).click().catch(() => {})
  })
  await wait(2600)
})

/* 4. Power builder: tab -> add -> intro + wizard */
await step('power tab', async () => {
  await page.locator('.tab').filter({ hasText: 'Power' }).first().click()
  await wait(1200)
})
await step('power add', async () => {
  await page
    .getByRole('button', { name: /ignite|add.*power/i })
    .first()
    .click()
    .catch(async () => {
      await page.getByRole('button', { name: /add/i }).first().click().catch(() => {})
    })
  await wait(5200)
})

/* 5. Currency builder: escape wizard, switch tab, add -> intro */
await step('to currency', async () => {
  await page.keyboard.press('Escape').catch(() => {})
  await wait(600)
  await page.locator('.tab').filter({ hasText: 'Currency' }).first().click()
  await wait(1200)
  await page
    .getByRole('button', { name: /add.*currency|coin|mint/i })
    .first()
    .click()
    .catch(async () => {
      await page.getByRole('button', { name: /add/i }).first().click().catch(() => {})
    })
  await wait(5200)
})

await wait(800)
await browser.close()

const files = readdirSync(OUT).filter((f) => f.endsWith('.webm'))
log(`recorded: ${files.join(', ')}`)
const newest = files
  .map((f) => ({ f, t: statSync(path.join(OUT, f)).mtimeMs }))
  .sort((a, b) => b.t - a.t)[0]
if (newest && newest.f !== 'app-montage.webm') {
  rmSync(path.join(OUT, 'app-montage.webm'), { force: true })
  renameSync(path.join(OUT, newest.f), path.join(OUT, 'app-montage.webm'))
}
log('saved -> public/video/app-montage.webm')
log('finished')
