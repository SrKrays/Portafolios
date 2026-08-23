import { useEffect, useRef } from 'react'

// En sarthakjoshi.com el fondo (líneas + puntos animados) no aparece del
// todo hasta que el usuario scrollea 1 o 2 veces — el primer scroll "termina
// de cargar" la escena. Acá replicamos esa sensación: el fondo decorativo
// (grilla/partículas y la daga) arranca apagado y va apareciendo a medida
// que se scrollea, en vez de estar 100% visible desde el primer frame.
const REVEAL_DISTANCE = 640 // px de scroll para completar el "boot" — ~1-2 scrolls de mouse
const MIN_OPACITY = 0.22

export default function EnvironmentReveal({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    let raf = null

    const apply = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / REVEAL_DISTANCE))
      const eased = 1 - Math.pow(1 - p, 2) // ease-out: arranca rápido, se asienta suave
      if (ref.current) {
        ref.current.style.opacity = String(MIN_OPACITY + eased * (1 - MIN_OPACITY))
      }
      raf = null
    }

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // sin transform acá a propósito: los hijos (canvas / daga) usan
  // position:fixed y un transform en este wrapper les crearía un nuevo
  // "containing block", rompiendo su anclaje al viewport.
  return (
    <div ref={ref} className="env-reveal" style={{ opacity: MIN_OPACITY }}>
      {children}
    </div>
  )
}
