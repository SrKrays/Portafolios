import { experience } from '../data/content'
import Reveal, { RevealGroup, RevealItem } from './Reveal'

export default function Experience() {
  return (
    <section className="section-pad tight" id="experiencia">
      <div className="wrap">
        <Reveal className="s-head">
          <h2>Experiencia Profesional</h2>
          <div className="bar" />
          <p>
            Más allá de los proyectos: esto es lo que hago día a día con clientes reales y en mi trabajo
            actual.
          </p>
        </Reveal>

        <RevealGroup className="thist" stagger={0.14}>
          {experience.map((e) => (
            <RevealItem key={e.org} className="thist-item">
              <div className="thist-left">
                <h3>{e.org}</h3>
                <div className="role">{e.role}</div>
                <div className="meta">{e.meta}</div>
              </div>
              <div className="thist-right">
                <div>
                  <h4>Lo que hago</h4>
                  <ul>
                    {e.built.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Habilidades &amp; Impacto</h4>
                  <ul>
                    {e.impact.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
