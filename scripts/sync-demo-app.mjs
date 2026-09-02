// Sync the Arch Creator web build into public/demo-app so the Explore page's
// live demo works on the hosted site. Rebuilds the app with a relative base
// (so its assets resolve under /demo-app/) and copies the dist output in.
// Usage: node scripts/sync-demo-app.mjs
import { execSync } from 'node:child_process'
import { existsSync, rmSync, cpSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const appDir = process.env.ARCH_CREATOR_APP_DIR || 'C:\\Users\\banan\\Documents\\Arch-Creator\\tauri-app'
const srcDist = path.join(appDir, 'dist')
const dest = path.join(root, 'public', 'demo-app')

function dirSize(dir) {
  let total = 0
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    total += entry.isDirectory() ? dirSize(p) : statSync(p).size
  }
  return total
}

if (!existsSync(path.join(appDir, 'package.json'))) {
  console.error(`[demo] Arch Creator app not found at ${appDir}`)
  console.error('[demo] Set ARCH_CREATOR_APP_DIR to point at the tauri-app folder.')
  process.exit(1)
}

console.log('[demo] building Arch Creator web bundle (relative base)...')
execSync('npx vite build --base ./', { cwd: appDir, stdio: 'inherit' })

console.log('[demo] clearing old demo-app...')
rmSync(dest, { recursive: true, force: true })

console.log('[demo] copying dist -> public/demo-app...')
cpSync(srcDist, dest, { recursive: true })

const size = dirSize(dest)
console.log(`[demo] done. demo-app is ${(size / 1024 / 1024).toFixed(1)} MB.`)
