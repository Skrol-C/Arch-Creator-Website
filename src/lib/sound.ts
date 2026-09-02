// Lightweight UI sound layer: soft clicks on buttons/links and a subtle
// hover blip, generated with Web Audio (no audio files). Muted by default
// until the user opts in, remembered in localStorage.
type Ctx = AudioContext | null

let ctx: Ctx = null
let enabled = false

try {
  enabled = localStorage.getItem('soundEnabled') === '1'
} catch {
  /* ignore */
}

function getCtx(): AudioContext | null {
  if (!enabled) return null
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function blip(freq: number, dur: number, gain = 0.04, type: OscillatorType = 'sine') {
  const ac = getCtx()
  if (!ac) return
  const osc = ac.createOscillator()
  const g = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, ac.currentTime)
  g.gain.setValueAtTime(gain, ac.currentTime)
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur)
  osc.connect(g)
  g.connect(ac.destination)
  osc.start()
  osc.stop(ac.currentTime + dur)
}

export const sound = {
  /** Soft paper click for buttons/links. */
  click() {
    blip(520, 0.07, 0.045, 'triangle')
  },
  /** Tiny higher blip for hovers. */
  hover() {
    blip(880, 0.035, 0.012, 'sine')
  },
  /** A small "pop" for opening menus/panels. */
  open() {
    blip(420, 0.09, 0.05, 'triangle')
    window.setTimeout(() => blip(620, 0.07, 0.03, 'triangle'), 45)
  },
  /** A deeper "thunk" for closing. */
  close() {
    blip(300, 0.08, 0.04, 'triangle')
  },
  get enabled() {
    return enabled
  },
  setEnabled(on: boolean) {
    enabled = on
    try {
      localStorage.setItem('soundEnabled', on ? '1' : '0')
    } catch {
      /* ignore */
    }
    if (on) {
      sound.open()
    } else if (ctx) {
      void ctx.close()
      ctx = null
    }
  },
}
