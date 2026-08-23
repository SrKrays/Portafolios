import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Cuenta de 0 al valor final en `duration` segundos. Se dispara cada vez que
// entra en el viewport (subiendo o bajando el scroll), no solo la primera
// vez — por eso `useInView` va con `once:false`.
export default function Counter({ value, duration = 1.5, className }) {
  const match = String(value).match(/^(\D*)([\d.]+)(\D*)$/)
  const [, prefix = '', numStr = '0', suffix = ''] = match || []
  const target = parseFloat(numStr) || 0
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0

  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-10% 0px -10% 0px' })
  const [display, setDisplay] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setDisplay(target)
      return
    }
    const start = performance.now()
    const from = 0
    const tick = (now) => {
      const p = Math.min(1, (now - start) / (duration * 1000))
      // easeOutExpo: arranca rápido y se asienta suave, se siente "vivo"
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setDisplay(from + (target - from) * eased)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => rafRef.current && cancelAnimationFrame(rafRef.current)
  }, [inView, target, duration])

  const shown = decimals ? display.toFixed(decimals) : Math.round(display)

  return (
    <b ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </b>
  )
}
