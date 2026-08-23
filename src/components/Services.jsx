import { motion } from 'framer-motion'
import { services } from '../data/content'
import Reveal, { RevealGroup, RevealItem } from './Reveal'

// pequeña animación de "encendido" propia por tipo de ícono al aparecer en
// pantalla — nada exagerado, solo un gesto que le da vida a cada tarjeta
const ICON_MOTION = {
  web: { animate: { scale: [0.5, 1.1, 1], opacity: [0, 1, 1] }, transition: { duration: 0.7, ease: 'easeOut' } },
  cart: {
    animate: { x: [0, -5, 5, -3, 2, 0], y: [0, -3, 0, -1, 0], opacity: [0, 1, 1, 1, 1, 1] },
    transition: { duration: 0.9, ease: 'easeOut' },
  },
  grid: {
    animate: { rotate: [-18, 6, 0], scale: [0.6, 1.08, 1], opacity: [0, 1, 1] },
    transition: { duration: 0.7, ease: 'backOut' },
  },
  spark: {
    animate: { scale: [0.3, 1.25, 0.9, 1], rotate: [-25, 12, 0], opacity: [0, 1, 1, 1] },
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const ICONS = {
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="4" width="18" height="14" rx="1" />
      <path d="M3 9h18M8 21h8M12 18v3" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h2l2.6 12.6a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L21 7H6" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
    </svg>
  ),
}

export default function Services() {
  return (
    <section className="section-pad" id="servicios">
      <div className="wrap">
        <Reveal as="div" className="s-head">
          <h2>Qué Sé Hacer</h2>
          <div className="bar" />
          <p>
            De la idea al deploy: diseño, desarrollo y la infraestructura necesaria para que cada proyecto
            funcione de verdad, no solo se vea bien.
          </p>
        </Reveal>

        <RevealGroup className="services">
          {services.map((s) => (
            <RevealItem as="div" key={s.title} className="service">
              <motion.div
                className="ico"
                initial={{ opacity: 0 }}
                whileInView={ICON_MOTION[s.icon]?.animate}
                viewport={{ once: false, margin: '-60px' }}
                transition={ICON_MOTION[s.icon]?.transition}
              >
                {ICONS[s.icon]}
              </motion.div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
