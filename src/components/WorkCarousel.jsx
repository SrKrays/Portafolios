import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cases, stack } from '../data/content'
import Reveal from './Reveal'

const EASE = [0.65, 0, 0.35, 1]

export default function WorkCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  const go = (next) => {
    setDirection(next > index || (index === cases.length - 1 && next === 0) ? 1 : -1)
    setIndex((next + cases.length) % cases.length)
  }

  // autoplay cada 2s, se pausa con el mouse encima y retoma al salir
  useEffect(() => {
    if (paused) return undefined
    timer.current = setInterval(() => go(index + 1), 2000)
    return () => clearInterval(timer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused])

  const c = cases[index]

  return (
    <section className="section-pad tight" id="trabajos">
      <div className="wrap">
        <Reveal className="s-head">
          <h2>Trabajos Seleccionados</h2>
          <div className="bar" />
          <p>Problema, enfoque y resultado de cada caso — así los presento en una entrevista.</p>
        </Reveal>

        <Reveal className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="carousel-track">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={c.title}
                className="cslide"
                custom={direction}
                initial={{ x: direction * 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -direction * 60, opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(index + 1)
                  else if (info.offset.x > 60) go(index - 1)
                }}
              >
                <div className="card">
                  <h3>{c.title}</h3>
                  <div className="row">
                    <div className="label">Problema</div>
                    <div className="val">{c.problem}</div>
                  </div>
                  <div className="row">
                    <div className="label">Enfoque</div>
                    <div className="val">{c.approach}</div>
                  </div>
                  <div className="row">
                    <div className="label">Herramientas</div>
                    <div className="val tools">{c.tools}</div>
                  </div>
                  <div className="outcome">
                    <div className="label">Resultado</div>
                    <div className="val">{c.outcome}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="carousel-nav">
            <button className="cbtn" onClick={() => go(index - 1)} aria-label="Anterior">
              ‹
            </button>
            <div className="dots">
              {cases.map((cs, i) => (
                <div
                  key={cs.title}
                  className={`dot ${i === index ? 'active' : ''}`}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button className="cbtn" onClick={() => go(index + 1)} aria-label="Siguiente">
              ›
            </button>
          </div>
        </Reveal>

        <div style={{ marginTop: 90 }}>
          <Reveal className="s-head" style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: 22 }}>Stack</h2>
          </Reveal>
          <motion.div
            className="badges"
            initial="off"
            whileInView="on"
            viewport={{ once: false, margin: '-60px' }}
            transition={{ staggerChildren: 0.09, delayChildren: 0.1 }}
          >
            {stack.map((s) => (
              <motion.div
                className="badge"
                key={s}
                variants={{
                  off: { opacity: 0.15, scale: 0.92, boxShadow: '0 0 0 rgba(212,245,60,0)' },
                  on: {
                    opacity: [0.15, 1, 0.85, 1],
                    scale: [0.92, 1.08, 1],
                    boxShadow: [
                      '0 0 0 rgba(212,245,60,0)',
                      '0 0 14px rgba(212,245,60,.65)',
                      '0 0 0 rgba(212,245,60,0)',
                    ],
                    transition: { duration: 0.55, ease: 'easeOut' },
                  },
                }}
              >
                {s}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
