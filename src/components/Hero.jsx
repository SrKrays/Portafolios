import { useState } from 'react'
import { motion } from 'framer-motion'
import Counter from './Counter'

const EASE = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

export default function Hero({ ready }) {
  // La foto va en public/photo.jpg — apenas se agregue ese archivo, se
  // muestra sola. Hasta entonces, cae al placeholder con las iniciales.
  const [photoOk, setPhotoOk] = useState(true)

  return (
    <section className="hero" id="hero">
      <span className="hero-corner tl" />
      <span className="hero-corner tr" />

      <div className="rail rail-left">
        <span className="rail-dot" />
        <span className="rail-line" />
        <span className="rail-label">Web</span>
      </div>
      <div className="rail rail-right">
        <span className="rail-label">Desarrollo</span>
        <span className="rail-line" />
        <span className="rail-dot" />
      </div>

      <div className="wrap">
        <motion.div
          className="hero-card"
          variants={container}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
        >
          <div className="hero-card-main">
            <motion.div variants={item} className="eyebrow">
              MATEO CÁRDENAS
            </motion.div>
            <motion.h1 variants={item} className="hero-card-title">
              Desarrollador <span className="outline">Web</span>
            </motion.h1>
            <motion.div variants={item} className="role-line">
              Full Stack Junior · React &amp; .NET · Córdoba, Argentina
            </motion.div>
            <motion.p variants={item} className="lede">
              Desarrollador full stack junior especializado en React y .NET. Construyo proyectos reales
              de punta a punta — de la primera línea de código al sitio en producción — y busco mi primer
              puesto formal como programador.
            </motion.p>
            <motion.div variants={item} className="cta-row">
              <a href="#trabajos" className="btn btn-fill">
                Ver Trabajos →
              </a>
              <a href="#contacto" className="btn btn-ghost">
                Contactar
              </a>
            </motion.div>
          </div>

          <motion.div variants={item} className="hero-photo">
            {photoOk ? (
              <img src="/photo.jpg" alt="Mateo Cárdenas" onError={() => setPhotoOk(false)} />
            ) : (
              <div className="hero-photo-fallback">MC</div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          className="stat-row hero-stats"
        >
          <div className="stat">
            <Counter value="6+" />
            <span>Proyectos en producción</span>
          </div>
          <div className="stat">
            <Counter value="100%" />
            <span>Código propio, sin templates</span>
          </div>
          <div className="stat">
            <Counter value="2" />
            <span>Stacks: React &amp; .NET</span>
          </div>
        </motion.div>
      </div>

      <div className="scroll-hint">
        <span className="scroll-mouse" />
        Scrolleá para explorar
      </div>
    </section>
  )
}
