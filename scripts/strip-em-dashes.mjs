// Strip all em dashes (U+2014) from user-facing and source files, replacing
// them with punctuation that reads naturally (colon after "Fig.", comma
// otherwise, nothing after a period/colon).
import { readFileSync, writeFileSync } from 'node:fs'
import { globSync } from 'node:fs'

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : globSync('src/**/*.{ts,tsx,css,md}', { nodir: true })

let total = 0
for (const f of files) {
  let text = readFileSync(f, 'utf8')
  const before = text
  // decorative multi-dash rules
  text = text.replace(/\u2014{3,}/g, '===')
  text = text.replace(/\u2014{2}/g, '--')
  // "Fig. 01 — The Plate" -> "Fig. 01: The Plate"
  text = text.replace(/(Fig\.\s*\d+)\s*\u2014\s*/g, '$1: ')
  // " — " preceded by sentence end -> just a space
  text = text.replace(/([.:])\s*\u2014\s*/g, '$1 ')
  // any remaining spaced em dash -> comma
  text = text.replace(/\s*\u2014\s*/g, ', ')
  // bare em dash with no spaces -> hyphen
  text = text.replace(/\u2014/g, '-')
  if (text !== before) {
    writeFileSync(f, text)
    const n = (before.match(/\u2014/g) || []).length
    total += n
    console.log(`[${f}] removed ${n}`)
  }
}
console.log(`total em dashes removed: ${total}`)
