import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Preloader de marca: caja centrada con contador + barra de progreso,
// tiempos calcados de la intro de sarthakjoshi.com (~2.2s totales antes
// de que aparezca el contenido del hero).
export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const DURATION = 1500 // ms de conteo, igual de largo que la intro de referencia
    let raf

    const tick = (now) => {
      const elapsed = now - start
      const p = Math.min(1, elapsed / DURATION)
      // easeOutExpo, para que el conteo arranque rápido y frene suave
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setPct(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(onDone, 260) // pequeña pausa antes del wipe, como en la referencia
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{
        clipPath: 'inset(0% 0% 100% 0%)',
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <div className="loader-box">
        <div className="loader-mark">VIN<span>PATH</span></div>
        <div className="loader-pct">{pct}%</div>
        <div className="loader-track">
          <motion.div
            className="loader-fill"
            animate={{ width: `${pct}%` }}
            transition={{ ease: 'linear', duration: 0.05 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
