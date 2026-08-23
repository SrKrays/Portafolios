import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import {
  VIEW_BOX,
  GROUP_TRANSFORM,
  POMMEL_FILL,
  POMMEL_LINES,
  BRAID,
  GUARD_FILL,
  GUARD_LINES,
  BLADE_FILL,
  BLADE_DETAILS,
  FRACTURE_LINES,
  FRAGMENT_MAIN_FILL,
  FRAGMENT_MAIN_LINES,
  FRAGMENTS_SECONDARY,
} from '../assets/daggerPaths'

// ─────────────────────────────────────────────────────────────────────────
// Daga VinPath — reconstrucción vectorial fiel a la imagen de referencia.
// ESTE ASSET ES FINAL: los paths de `daggerPaths.js` y la estructura de
// grupos (#pommel, #grip, #guard, #blade, #blade-details, #fracture,
// #fragment-main, #fragments-secondary) NO se tocan en este archivo. Todo lo
// que sigue trabaja exclusivamente sobre posición/escala/rotación/opacidad/
// z-index/animación de ese SVG ya terminado, vía CSS + GSAP sobre los grupos
// existentes — nunca sobre los `<path>` en sí.
//
// v11: integración "detrás de VINPATH" + desarme cinematográfico con
// ScrollTrigger. Toda la intensidad de la puesta en escena se controla desde
// un único objeto, DAGGER_CONFIG, más abajo.
// ─────────────────────────────────────────────────────────────────────────

// ── único lugar para tocar la intensidad de la composición/animación ──
const DAGGER_CONFIG = {
  opacity: 0.2, // presencia base de la daga entera (0.12–0.22 pedido)
  scale: 1, // multiplicador extra sobre el tamaño ya fijado en CSS (.dagger width)
  rotation: -25, // inclinación inicial, en reposo (grados)
  floatY: 22, // vaivén vertical del floating idle (px, -22..+22)
  floatRotation: 3.5, // vaivén rotacional del floating idle (deg, -3.5..+3.5)
  mouseX: 10, // parallax de mouse — desplazamiento máx. horizontal (px)
  mouseY: 8, // parallax de mouse — desplazamiento máx. vertical (px)
  scrollRotation: 40, // grados totales que gira la daga a lo largo del desarme
  fragmentDistance: 80, // distancia base (px) que recorren las piezas al desarmarse
}

// multiplicadores de profundidad por pieza — más alto = reacciona más
// (genera la sensación de que los fragmentos "flotan" más cerca de cámara)
const DEPTH = {
  pommel: 0.7,
  grip: 0.8,
  guard: 0.9,
  blade: 1.0,
  fragmentMain: 1.2,
  fragmentsSecondary: 1.4,
}

function Fill({ d, className, style }) {
  if (!d) return null
  return <path d={d} className={className} style={style} />
}

function Lines({ paths, className }) {
  return paths.map((d, i) => <path key={i} d={d} className={className} />)
}

// arma un set de keyframes (0/20/40/60/80/100%) para un desplazamiento que
// arranca lento y acelera levemente hacia el final — así el desarme se
// siente progresivo, no lineal ni repentino.
function buildKeyframes({ y = 0, x = 0, rotation = 0 }) {
  const curve = [0, 0.09, 0.28, 0.52, 0.79, 1] // progresión no lineal (organic ease-in)
  const pct = ['0%', '20%', '40%', '60%', '80%', '100%']
  const kf = {}
  pct.forEach((p, i) => {
    kf[p] = {
      y: y * curve[i],
      x: x * curve[i],
      rotation: rotation * curve[i],
    }
  })
  return kf
}

export default function Dagger() {
  const wrapRef = useRef(null) // capa fija: posición/escala/rotación base + parallax + rotación de scroll
  const floatRef = useRef(null) // capa interna: floating idle
  const svgRef = useRef(null)
  const pommelRef = useRef(null)
  const gripRef = useRef(null)
  const guardRef = useRef(null)
  const fragMainRef = useRef(null)
  const fragSecRefs = useRef([])

  useEffect(() => {
    const root = wrapRef.current
    const float = floatRef.current
    const svg = svgRef.current
    if (!root || !float || !svg) return

    // Nota: por pedido explícito, la daga anima siempre — incluso con
    // "reducir movimiento" activado en el sistema — porque es la pieza
    // central de identidad del Hero. El resto del sitio (Reveal, Counter,
    // etc.) sigue respetando esa preferencia normalmente.
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    const isTablet = window.matchMedia('(max-width: 1080px)').matches
    const isMobile = window.matchMedia('(max-width: 860px)').matches
    // responsive: en pantallas chicas, reducir separación/rotación/parallax
    // (ítem 20) sin tocar el SVG — solo escalamos los mismos números.
    const responsiveScale = isMobile ? 0.45 : isTablet ? 0.7 : 1
    let onMove = null

    const ctx = gsap.context(() => {
      const groups = [
        '#pommel',
        '#grip .braid-piece',
        '#guard',
        '#blade',
        '#blade-details',
        '#fracture',
        '#fragment-main',
        '#fragments-secondary .fragment-small',
      ]
      const targets = groups.flatMap((sel) => Array.from(svg.querySelectorAll(sel)))

      gsap.set(root, { opacity: 0, rotate: DAGGER_CONFIG.rotation, scale: DAGGER_CONFIG.scale })
      gsap.set(targets, { opacity: 0, scale: 0.94, transformOrigin: '50% 50%' })

      // ── 1) Entrada elegante y progresiva (~1.4s): se insinúa, se revela ──
      // la empuñadura, luego la hoja, luego los fragmentos, y asienta con un
      // pequeño overshoot final. Sin DrawSVG (plugin pago no disponible):
      // se logra con opacity/scale escalonado por grupo — mismo efecto
      // percibido de "materializarse" pieza por pieza.
      const tl = gsap.timeline({ delay: 0.2 })
      tl.to(root, { opacity: DAGGER_CONFIG.opacity, duration: 0.5, ease: 'power1.out' })
      groups.forEach((sel, i) => {
        const els = svg.querySelectorAll(sel)
        tl.to(
          els,
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.045, ease: 'power2.out' },
          i === 0 ? '<0.05' : '-=0.32',
        )
      })
      // asentamiento: leve overshoot de rotación sobre el reposo, como si la
      // daga "cayera" un poco en su lugar al terminar de aparecer
      tl.fromTo(
        root,
        { rotate: DAGGER_CONFIG.rotation - 3 },
        { rotate: DAGGER_CONFIG.rotation, duration: 0.55, ease: 'back.out(1.6)' },
        '-=0.3',
      )

      // ── 2) Floating idle permanente, muy sutil (ítem 9) ──
      tl.add(() => {
        gsap.to(float, {
          y: DAGGER_CONFIG.floatY,
          rotate: `+=${DAGGER_CONFIG.floatRotation * 2}`,
          duration: gsap.utils.random(4.5, 6.5),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })

        // el trenzado también "respira": cada segmento gira/se desplaza un
        // pelín, con fase propia, para que la daga no se sienta rígida
        const braidPieces = Array.from(svg.querySelectorAll('.braid-piece'))
        braidPieces.forEach((el, i) => {
          gsap.to(el, {
            x: (i % 2 === 0 ? 1 : -1) * 5,
            rotate: (i % 2 === 0 ? 1 : -1) * 3,
            duration: 2.6 + (i % 3) * 0.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: i * 0.12,
            transformOrigin: '50% 50%',
          })
        })

        gsap.to('#guard', {
          x: 6,
          rotate: 2.2,
          duration: 3.1,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          transformOrigin: '50% 50%',
        })
        gsap.to('#blade, #blade-details', {
          y: 12,
          rotate: -1.8,
          duration: 3.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          transformOrigin: '50% 0%',
        })

        if (fragMainRef.current) {
          gsap.to(fragMainRef.current, {
            y: 16,
            rotate: '+=3',
            duration: 3.4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        }
        fragSecRefs.current.forEach((el, i) => {
          if (!el) return
          const cfg = [
            { y: 24, rotate: 7, x: 0, dur: 2.6 },
            { y: 14, rotate: 4, x: 9, dur: 3.1 },
            { y: 20, rotate: 9, x: -7, dur: 2.3 },
            { y: 16, rotate: 5, x: 6, dur: 3.7 },
          ][i % 4]
          gsap.to(el, {
            y: cfg.y,
            x: cfg.x,
            rotate: `+=${cfg.rotate}`,
            duration: cfg.dur,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: i * 0.15,
          })
        })

        // "chispa de daño": la grieta de la fractura titila de forma
        // irregular, como metal dañado con una conexión floja.
        const fractureLines = svg.querySelectorAll('#fracture .d-accent-line')
        if (fractureLines.length) {
          gsap.to(fractureLines, {
            opacity: () => gsap.utils.random(0.25, 1),
            duration: () => gsap.utils.random(0.08, 0.4),
            repeat: -1,
            repeatRefresh: true,
            ease: 'none',
          })
        }
      })

      // ── 3) Parallax de mouse (ítem 10) — gsap.quickTo, nada de tweens ──
      // por evento. Desactivado en touch. La daga completa se mueve un
      // poco, la empuñadura un poco menos (queda "más atrás"), los
      // fragmentos un poco más (quedan "más cerca" de cámara) — profundidad.
      if (!isTouch) {
        const mx = DAGGER_CONFIG.mouseX
        const my = DAGGER_CONFIG.mouseY
        const quickX = gsap.quickTo(root, 'x', { duration: 0.9, ease: 'power2.out' })
        const quickY = gsap.quickTo(root, 'y', { duration: 0.9, ease: 'power2.out' })

        const hiltX = gripRef.current && gsap.quickTo(gripRef.current, 'x', { duration: 1, ease: 'power2.out' })
        const hiltY = pommelRef.current && gsap.quickTo(pommelRef.current, 'y', { duration: 1, ease: 'power2.out' })

        const fragQuick = fragSecRefs.current.map((el) =>
          el
            ? {
                x: gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power2.out' }),
                y: gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power2.out' }),
              }
            : null,
        )
        const fragMainQuick = fragMainRef.current
          ? {
              x: gsap.quickTo(fragMainRef.current, 'x', { duration: 1.05, ease: 'power2.out' }),
              y: gsap.quickTo(fragMainRef.current, 'y', { duration: 1.05, ease: 'power2.out' }),
            }
          : null

        onMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5 // -0.5..0.5
          const ny = e.clientY / window.innerHeight - 0.5
          quickX(nx * mx * 2)
          quickY(ny * my * 2)
          // empuñadura: capa "detrás", reacciona bastante menos que el resto
          if (hiltX) hiltX(nx * mx * 0.5)
          if (hiltY) hiltY(ny * my * 0.4)
          // fragmentos: capa "adelante", reaccionan más — profundidad
          if (fragMainQuick) {
            fragMainQuick.x(nx * mx * 1.5)
            fragMainQuick.y(ny * my * 1.4)
          }
          fragQuick.forEach((q, i) => {
            if (!q) return
            const boost = 1.7 + i * 0.3
            q.x(nx * mx * boost * 0.6)
            q.y(ny * my * boost * 0.6)
          })
        }
        window.addEventListener('mousemove', onMove, { passive: true })
      }

      // ── 4) ScrollTrigger — desarme cinematográfico y reversible (ítems ──
      // 11 a 15). Una sola timeline con scrub: recorrerla hacia abajo
      // desarma la daga, hacia arriba la vuelve a ensamblar — no hay una
      // segunda animación paralela, es la misma timeline "scrubbeada".
      const distScale = (DAGGER_CONFIG.fragmentDistance / 80) * responsiveScale
      const rotScale = (DAGGER_CONFIG.scrollRotation / 40) * responsiveScale
      const disassembleSpan = () => window.innerHeight * 2.2

      const scrollCfg = {
        trigger: document.documentElement,
        start: 0,
        end: disassembleSpan,
        scrub: 0.8,
      }

      // rotación completa de la daga a lo largo del desarme — cinematográfica,
      // no un simple par de grados (ítem 14). Mismos fraccionamientos que
      // producen los valores de referencia del pedido con la config default.
      gsap.to(root, {
        keyframes: {
          '0%': { rotate: DAGGER_CONFIG.rotation },
          '25%': { rotate: DAGGER_CONFIG.rotation + 0.13 * DAGGER_CONFIG.scrollRotation },
          '50%': { rotate: DAGGER_CONFIG.rotation + 0.375 * DAGGER_CONFIG.scrollRotation },
          '75%': { rotate: DAGGER_CONFIG.rotation + 0.75 * DAGGER_CONFIG.scrollRotation },
          '100%': { rotate: DAGGER_CONFIG.rotation + 0.925 * DAGGER_CONFIG.scrollRotation },
        },
        ease: 'none',
        scrollTrigger: scrollCfg,
      })

      // empuñadura: pomo + trenzado se separan hacia arriba, sutil
      if (pommelRef.current) {
        gsap.to(
          pommelRef.current,
          {
            keyframes: buildKeyframes({ y: -95 * DEPTH.pommel * distScale, rotation: -14 * DEPTH.pommel * rotScale }),
            ease: 'none',
            scrollTrigger: scrollCfg,
          },
        )
      }
      if (gripRef.current) {
        gsap.to(gripRef.current, {
          keyframes: buildKeyframes({ y: -70 * DEPTH.grip * distScale, rotation: -10 * DEPTH.grip * rotScale }),
          ease: 'none',
          scrollTrigger: scrollCfg,
        })
      }
      // guarda
      if (guardRef.current) {
        gsap.to(guardRef.current, {
          keyframes: buildKeyframes({ y: -40 * DEPTH.guard * distScale, rotation: -7 * DEPTH.guard * rotScale }),
          ease: 'none',
          scrollTrigger: scrollCfg,
        })
      }
      // hoja (+ detalles + fractura, se abren juntas) — mismo selector
      // múltiple que ya usaba la implementación anterior, sin envolver los
      // grupos originales en un contenedor nuevo.
      const bladeEls = svg.querySelectorAll('#blade, #blade-details, #fracture')
      if (bladeEls.length) {
        gsap.to(bladeEls, {
          keyframes: buildKeyframes({ x: 74 * DEPTH.blade * distScale, rotation: 13 * DEPTH.blade * rotScale }),
          ease: 'none',
          scrollTrigger: scrollCfg,
        })
      }
      // fragmento principal
      if (fragMainRef.current) {
        gsap.to(fragMainRef.current, {
          keyframes: buildKeyframes({
            x: -112 * DEPTH.fragmentMain * distScale,
            y: 74 * DEPTH.fragmentMain * distScale,
            rotation: -29 * DEPTH.fragmentMain * rotScale,
          }),
          ease: 'none',
          scrollTrigger: scrollCfg,
        })
      }
      // fragmentos secundarios: cada uno con trayectoria propia (dirección,
      // distancia y leve variación de escala/opacidad) para que se sientan
      // independientes, no un bloque que se mueve en línea recta (ítem 12/15)
      fragSecRefs.current.forEach((el, i) => {
        if (!el) return
        const dir = i % 2 === 0 ? 1 : -1
        const spread = 1 + i * 0.35
        const dist = DAGGER_CONFIG.fragmentDistance * DEPTH.fragmentsSecondary * distScale * spread
        const kf = buildKeyframes({
          x: dir * dist * 0.85,
          y: dist * (0.6 + i * 0.12),
          rotation: dir * (16 + i * 6) * rotScale,
        })
        // pequeña variación de escala/opacidad hacia el final — se sienten
        // "dispersos", no clones del mismo movimiento
        kf['80%'].scale = 1 - i * 0.03
        kf['80%'].opacity = 0.92
        kf['100%'].scale = 0.94 - i * 0.03
        kf['100%'].opacity = 0.85
        gsap.to(el, { keyframes: kf, ease: 'none', scrollTrigger: scrollCfg })
      })

      // ── 5) tras completar el desarme, si el usuario sigue bajando hacia ──
      // las siguientes secciones, la presencia de la daga se reduce del
      // todo de forma gradual (ítem "Fase 6") — sigue siendo la misma
      // lógica de scroll, sin listeners manuales.
      // OJO: acá usamos `fromTo` con un "desde" EXPLÍCITO (DAGGER_CONFIG.opacity)
      // en vez de `to` — con `to`, GSAP toma como punto de partida el valor
      // que tenía `root.opacity` en el momento en que se crea este tween
      // (0, porque se crea antes de que la entrada termine de animar a 0.2).
      // Eso hacía que, al volver a scrollear hacia arriba después de haber
      // pasado por el desarme completo, el scrub volviera a ese "0"
      // congelado en vez de al 0.2 real — la daga "desaparecía" en vez de
      // recomponerse. `immediateRender:false` evita que este tween pise el
      // fade-in de la entrada apenas se monta el componente.
      gsap.fromTo(
        root,
        { opacity: DAGGER_CONFIG.opacity },
        {
          opacity: DAGGER_CONFIG.opacity * 0.2,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: document.documentElement,
            start: disassembleSpan,
            end: 'bottom bottom',
            scrub: 0.8,
          },
        },
      )
    }, wrapRef)

    return () => {
      if (onMove) window.removeEventListener('mousemove', onMove)
      ctx.revert()
    }
  }, [])

  return (
    // .dagger-anchor: capa pura de CSS (fixed + centrado), NUNCA tocada por
    // GSAP — así el centrado no compite con las transformaciones (x/y/rotate)
    // que GSAP le aplica a `.dagger` (wrapRef) por dentro. Antes ambas cosas
    // vivían en el mismo elemento y, en ventanas más angostas que 1440px, el
    // posicionamiento por vw/% quedaba descentrado.
    <div className="dagger-anchor" aria-hidden="true">
      <div className="dagger hero-dagger" ref={wrapRef}>
        <div className="dagger-glow" />
        <div className="dagger-float" ref={floatRef}>
        <svg
          ref={svgRef}
          id="vinpath-dagger"
          viewBox={VIEW_BOX}
          className="dagger-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="dagger" transform={GROUP_TRANSFORM}>
            <g id="pommel" ref={pommelRef}>
              <Fill d={POMMEL_FILL} className="d-fill" />
              <Lines paths={POMMEL_LINES} className="d-line" />
            </g>

            <g id="grip" ref={gripRef}>
              {BRAID.map((seg, i) => (
                <g key={i} id={`braid-${String(i + 1).padStart(2, '0')}`} className="braid-piece">
                  <Fill d={seg.fill} className="d-fill" />
                  <Lines paths={seg.lines} className="d-line" />
                </g>
              ))}
            </g>

            <g id="guard" ref={guardRef}>
              <Fill d={GUARD_FILL} className="d-fill d-accent" />
              <Lines paths={GUARD_LINES} className="d-line d-accent-line" />
            </g>

            <g id="blade">
              <Fill d={BLADE_FILL} className="d-fill" />
            </g>

            <g id="blade-details">
              <Lines paths={BLADE_DETAILS} className="d-line" />
            </g>

            <g id="fracture">
              <Lines paths={FRACTURE_LINES} className="d-line d-accent-line" />
            </g>

            <g id="fragment-main" ref={fragMainRef}>
              <Fill d={FRAGMENT_MAIN_FILL} className="d-fill d-accent" />
              <Lines paths={FRAGMENT_MAIN_LINES} className="d-line d-accent-line" />
            </g>

            <g id="fragments-secondary">
              {FRAGMENTS_SECONDARY.map((frag, i) => (
                <g
                  key={i}
                  id={`fragment-small-${String(i + 1).padStart(2, '0')}`}
                  className="fragment-small"
                  ref={(el) => (fragSecRefs.current[i] = el)}
                >
                  <Fill d={frag.fill} className="d-fill d-accent" />
                  <Lines paths={frag.lines} className="d-line d-accent-line" />
                </g>
              ))}
            </g>
          </g>
        </svg>
        </div>
      </div>
    </div>
  )
}
