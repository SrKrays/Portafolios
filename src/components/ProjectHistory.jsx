import { projectHistory } from '../data/content'
import Reveal, { RevealGroup, RevealItem } from './Reveal'

export default function ProjectHistory() {
  return (
    <section className="section-pad" id="proyectos">
      <div className="wrap">
        <Reveal className="s-head">
          <h2>Portfolio de Proyectos</h2>
          <div className="bar" />
          <p>
            Seis proyectos reales, no ejercicios de práctica: cada uno resolvió un problema concreto
            para un cliente o un negocio real.
          </p>
        </Reveal>

        <RevealGroup className="thist" stagger={0.14}>
          {projectHistory.map((p) => (
            <RevealItem key={p.name} className="thist-item">
              <div className="thist-left">
                <span className="tag">{p.tag}</span>
                <h3>{p.name}</h3>
                <div className="role">{p.role}</div>
                <div className="meta">{p.meta}</div>
              </div>
              <div className="thist-right">
                <div>
                  <h4>Construido</h4>
                  <ul>
                    {p.built.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Stack &amp; Resultado</h4>
                  <p className="stack-line">{p.stack}</p>
                  <ul style={{ marginTop: 14 }}>
                    {p.result.map((r) => (
                      <li key={r}>{r}</li>
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
