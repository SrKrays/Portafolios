import { useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { href: '#servicios', label: 'Habilidades' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#trabajos', label: 'Trabajos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header({ ready }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="inner">
        <a href="#top" className="logo">
          MATEO<span>CÁRDENAS.</span>
        </a>

        <div className="nav-group">
          <nav>
            <ul className={open ? 'open' : ''}>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-label="Menú">
            ☰
          </button>
          <div className="status-badge">
            <span className="status-corner tl" />
            <span className="status-corner tr" />
            <span className="status-corner bl" />
            <span className="status-corner br" />
            <span className="status-dot" />
            Disponible para trabajar
          </div>
        </div>
      </div>
    </motion.header>
  )
}
