import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

// Cada vez que se entra a una sección nueva, un flash breve tipo "beat de
// carga" recorre el fondo — le da al scroll una sensación de peso/impacto
// en vez de un desplazamiento plano.
export default function ScrollPulse() {
  const ref = useRef(null)

  useEffect(() => {
    const pulse = () => {
      gsap.killTweensOf(ref.current)
      gsap.fromTo(
        ref.current,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 0.6,
          scale: 1,
          duration: 0.22,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(ref.current, { opacity: 0, duration: 0.55, ease: 'power2.in' })
          },
        },
      )
    }

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray('.hero, .s-head')
      targets.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 68%',
          onEnter: pulse,
          onEnterBack: pulse,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return <div className="scroll-pulse" ref={ref} aria-hidden="true" />
}
