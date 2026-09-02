import { useEffect, useRef } from 'react'

interface InkWorldProps {
  /** 0-1: how far the world has formed */
  progress?: number
  className?: string
  paused?: boolean
}

const TAU = Math.PI * 2

/**
 * A canvas "world born from ink" animation:
 * 1. ink swirls and coalesces into a sphere
 * 2. red continent veins glow through
 * 3. the arch mark resolves
 * 4. ember dust drifts
 * Loops forever; pauses when `paused`. Respects reduced motion (static frame).
 */
export function InkWorld({ progress = 1, className = '', paused = false }: InkWorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let t = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Deterministic pseudo-random (stable across frames)
    const rand = (seed: number) => {
      const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
      return x - Math.floor(x)
    }

    // Pre-generate ember particles + continent blobs
    const EMBERS = 60
    const embers = Array.from({ length: EMBERS }, (_, i) => ({
      x: rand(i + 1),
      y: rand(i + 101),
      r: 0.4 + rand(i + 201) * 1.6,
      speed: 0.05 + rand(i + 301) * 0.12,
      drift: rand(i + 401) * TAU,
    }))

    const BLOBS = 9
    const blobs = Array.from({ length: BLOBS }, (_, i) => ({
      a: rand(i + 7) * TAU,
      da: (rand(i + 17) - 0.5) * 0.55,
      r: 0.28 + rand(i + 27) * 0.4,
      phase: rand(i + 37) * TAU,
    }))

    const archStroke = (p: number) => {
      ctx.beginPath()
      ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.3, Math.PI * 0.15, Math.PI * 0.85)
      const grad = ctx.createLinearGradient(w / 2, h / 2 - 120, w / 2, h / 2 + 120)
      grad.addColorStop(0, '#ff2b4f')
      grad.addColorStop(0.5, '#e6193c')
      grad.addColorStop(1, '#8b0000')
      ctx.strokeStyle = grad
      ctx.lineWidth = 3
      ctx.globalAlpha = p
      ctx.lineCap = 'round'
      ctx.stroke()
      // inner arch
      ctx.beginPath()
      ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.24, Math.PI * 0.18, Math.PI * 0.82)
      ctx.lineWidth = 1.4
      ctx.globalAlpha = p * 0.7
      ctx.stroke()
      // plinth
      ctx.beginPath()
      ctx.moveTo(w / 2 - Math.min(w, h) * 0.33, h / 2 + Math.min(w, h) * 0.3)
      ctx.lineTo(w / 2 + Math.min(w, h) * 0.33, h / 2 + Math.min(w, h) * 0.3)
      ctx.globalAlpha = p
      ctx.lineWidth = 2.5
      ctx.stroke()
      // star
      const s = Math.min(w, h) * 0.05
      ctx.save()
      ctx.translate(w / 2, h / 2 - Math.min(w, h) * 0.12)
      ctx.globalAlpha = p
      ctx.fillStyle = '#ff5c74'
      ctx.beginPath()
      for (let k = 0; k < 4; k++) {
        ctx.moveTo(0, -s)
        ctx.lineTo(s * 0.25, -s * 0.25)
        ctx.lineTo(s, 0)
        ctx.lineTo(s * 0.25, s * 0.25)
        ctx.lineTo(0, s)
        ctx.lineTo(-s * 0.25, s * 0.25)
        ctx.lineTo(-s, 0)
        ctx.lineTo(-s * 0.25, -s * 0.25)
        ctx.closePath()
      }
      ctx.fill()
      ctx.restore()
      ctx.globalAlpha = 1
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      const p = reduce ? 1 : progress
      // swirl speed slows as the world forms
      const swirl = reduce ? 0 : (1 - p) * 0.35

      // --- ink swirl ---
      const cx = w / 2
      const cy = h / 2
      const R = Math.min(w, h) * 0.36
      const arms = 3
      ctx.lineWidth = 1.2
      for (let arm = 0; arm < arms; arm++) {
        ctx.beginPath()
        for (let a = 0; a < TAU; a += 0.05) {
          const rad = R * (0.25 + 0.75 * (a / TAU)) * (1 - p * 0.55)
          const x = cx + Math.cos(a + arm * (TAU / 3) + t * swirl) * rad
          const y = cy + Math.sin(a + arm * (TAU / 3) + t * swirl) * rad
          if (a === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(168,22,42,${0.25 * (1 - p)})`
        ctx.stroke()
      }

      // --- planet ---
      const planetR = R * (0.55 + 0.45 * p)
      const grad = ctx.createRadialGradient(cx - planetR * 0.3, cy - planetR * 0.3, planetR * 0.1, cx, cy, planetR)
      grad.addColorStop(0, '#2a2433')
      grad.addColorStop(0.6, '#16101c')
      grad.addColorStop(1, '#0a060e')
      ctx.beginPath()
      ctx.arc(cx, cy, planetR * p, 0, TAU)
      ctx.fillStyle = grad
      ctx.fill()

      // --- glowing continent veins ---
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, planetR * p, 0, TAU)
      ctx.clip()
      for (const b of blobs) {
        const bx = cx + Math.cos(b.a + t * b.da * 0.2) * planetR * 0.5 * p
        const by = cy + Math.sin(b.a + t * b.da * 0.2) * planetR * 0.5 * p
        const br = planetR * b.r * p
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, br)
        g.addColorStop(0, `rgba(230,25,60,${0.5 * p})`)
        g.addColorStop(1, 'rgba(230,25,60,0)')
        ctx.beginPath()
        ctx.arc(bx, by, br, 0, TAU)
        ctx.fillStyle = g
        ctx.fill()
      }
      ctx.restore()

      // rim light
      ctx.beginPath()
      ctx.arc(cx, cy, planetR * p, 0, TAU)
      ctx.strokeStyle = `rgba(255,43,79,${0.35 * p})`
      ctx.lineWidth = 1.5
      ctx.stroke()

      // --- arch mark ---
      if (p > 0.6) {
        archStroke(Math.min(1, (p - 0.6) / 0.4))
      }

      // --- embers ---
      if (!reduce) {
        for (const e of embers) {
          const ex = ((e.x + t * e.speed * 0.2) % 1) * w
          const ey = ((e.y - t * e.speed) % 1 + 1) % 1 * h
          ctx.beginPath()
          ctx.arc(ex, ey, e.r, 0, TAU)
          ctx.fillStyle = `rgba(255,80,110,${0.4 * (1 - p * 0.4)})`
          ctx.fill()
        }
      }

      t += 0.016
      if (!paused) raf = requestAnimationFrame(draw)
    }

    if (reduce) {
      draw() // static frame
    } else {
      draw()
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [progress, paused])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
