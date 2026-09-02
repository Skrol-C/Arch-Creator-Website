// Remove the near-black background from the app icon PNG, producing a
// transparent-background brand mark (public/logo-transparent.png).
// Usage: node scripts/keyout-logo.mjs <input.png> <output.png> [threshold]
import { readFileSync, writeFileSync } from 'node:fs'
import { PNG } from 'pngjs'

const [, , input, output, thr] = process.argv
if (!input || !output) {
  console.error('usage: node keyout-logo.mjs <input> <output> [threshold]')
  process.exit(1)
}

const threshold = thr ? Number(thr) : 40
const src = PNG.sync.read(readFileSync(input))
const out = new PNG({ width: src.width, height: src.height })

for (let i = 0; i < src.data.length; i += 4) {
  const r = src.data[i]
  const g = src.data[i + 1]
  const b = src.data[i + 2]
  const a = src.data[i + 3]
  // Luma of the pixel; if it's dark enough treat as background (transparent)
  const luma = 0.299 * r + 0.587 * g + 0.114 * b
  const isDarkBg = luma < threshold && r < 90 && b < 90
  out.data[i] = r
  out.data[i + 1] = g
  out.data[i + 2] = b
  out.data[i + 3] = isDarkBg ? 0 : a
}

writeFileSync(output, PNG.sync.write(out))
console.log(`wrote ${output} (${src.width}x${src.height})`)
