import { useEffect, useRef } from 'react'

// Fondo animado: grilla/ola en canvas (igual espíritu que el hero de
// sarthakjoshi.com) + una capa extra de partículas tipo "chispas" flotando,
// más un desplazamiento sutil ligado al scroll para dar sensación de
// profundidad (parallax).
export default function BackgroundGrid() {
  const canvasRef = useRef(null)
  const scrollRef = useRef(0)
  const lastScrollRef = useRef(0)
  const reactRef = useRef(0) // "empuje" de reacción al scroll, sube y decae solo

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollRef.current
      lastScrollRef.current = y
      scrollRef.current = y
      // cualquier scroll (subiendo o bajando) suma empuje a la reacción de
      // las líneas; el signo de delta define si empujan para un lado u otro
      const next = reactRef.current + delta * 0.9
      reactRef.current = Math.max(-38, Math.min(38, next))
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h, t = 0
    let raf

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const rows = 22
    const cols = 34

    // partículas tipo chispa, suben lento y se reinician arriba
    const particles = Array.from({ length: 46 }, () => spawnParticle(true))
    function spawnParticle(initial) {
      return {
        x: Math.random() * window.innerWidth,
        y: initial ? Math.random() * window.innerHeight : window.innerHeight + 20,
        r: Math.random() * 1.6 + 0.4,
        speed: Math.random() * 0.35 + 0.08,
        drift: (Math.random() - 0.5) * 0.3,
        hue: Math.random() > 0.5 ? 'lime' : 'cyan',
        alpha: Math.random() * 0.5 + 0.15,
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const parallax = scrollRef.current * 0.06
      const baseY = h * 0.62 + parallax
      const spacingX = w / cols
      const spacingY = 26

      // el "empuje" de reacción al scroll decae solo (como un resorte) —
      // reacciona tanto a scrollear hacia abajo como hacia arriba
      reactRef.current *= 0.92
      const react = reactRef.current

      const pts = []
      for (let r = 0; r <= rows; r++) {
        pts[r] = []
        for (let c = 0; c <= cols; c++) {
          const x = c * spacingX
          // idle con más vida: mayor amplitud/velocidad de "marea" que antes
          const wobble = Math.sin(c * 0.4 + r * 0.3 + t) * 13 + Math.cos(r * 0.5 - t * 0.9) * 10
          // reacción de scroll: una ondulación extra que sube/baja y se
          // apaga sola, más marcada en las filas de adelante (fade alto)
          const fadeRow = 1 - r / rows
          const reactWave = react * fadeRow * Math.sin(c * 0.5 + r * 0.35 + t * 2.4)
          const y = baseY + r * spacingY * 0.9 - rows * spacingY * 0.45 + wobble + reactWave - r * r * 0.6
          pts[r][c] = [x, y]
        }
      }

      for (let r = 0; r <= rows; r++) {
        ctx.beginPath()
        const fade = 1 - r / rows
        ctx.strokeStyle = `rgba(212,245,60,${0.05 + fade * 0.14})`
        for (let c = 0; c <= cols; c++) {
          const [x, y] = pts[r][c]
          if (c === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      ctx.strokeStyle = 'rgba(34,211,238,0.06)'
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath()
        for (let r = 0; r <= rows; r++) {
          const [x, y] = pts[r][c]
          if (r === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // capa de chispas flotando (profundidad extra)
      for (const p of particles) {
        p.y -= p.speed
        p.x += p.drift
        if (p.y < -10) Object.assign(p, spawnParticle(false))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle =
          p.hue === 'lime' ? `rgba(212,245,60,${p.alpha})` : `rgba(34,211,238,${p.alpha})`
        ctx.fill()
      }

      t += 0.011
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} id="bgcanvas" />
}
