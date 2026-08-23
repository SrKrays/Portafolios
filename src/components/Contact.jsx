import { contact } from '../data/content'
import Reveal from './Reveal'

export default function Contact() {
  return (
    <section className="section-pad" id="contacto">
      <div className="wrap contact-box">
        <Reveal as="h2">Busco mi primer puesto como programador.</Reveal>
        <Reveal as="p" delay={0.08}>
          Abierto a oportunidades como desarrollador junior en Córdoba y a distancia. Escribime y
          coordinamos una charla.
        </Reveal>

        <Reveal className="contact-grid" delay={0.14}>
          <div className="contact-cell">
            <div className="k">Ubicación</div>
            <div className="v">{contact.location}</div>
          </div>
          <div className="contact-cell">
            <div className="k">Disponibilidad</div>
            <div className="v">{contact.availability}</div>
          </div>
          <div className="contact-cell">
            <div className="k">Email</div>
            <div className="v">{contact.email}</div>
          </div>
          <div className="contact-cell">
            <div className="k">Teléfono</div>
            <div className="v">{contact.phone}</div>
          </div>
          <div className="contact-cell">
            <div className="k">GitHub</div>
            <div className="v">{contact.social}</div>
          </div>
        </Reveal>

        <Reveal
          as="a"
          delay={0.2}
          className="btn btn-fill"
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          Escribime por WhatsApp
        </Reveal>
      </div>
    </section>
  )
}
