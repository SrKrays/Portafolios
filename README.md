# Mateo Cárdenas — Portfolio personal (React + Vite)

Portfolio personal para búsqueda laboral como desarrollador web junior.
Reutiliza la base visual e identidad de VinPath (negro + verde neón, daga
animada, tipografía Fraunces + Space Grotesk), con el contenido re-armado
para mostrar proyectos propios en vez de servicios de agencia.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Build de producción

```bash
npm run build
npm run preview
```

## Estructura

- `src/data/content.js` — todo el contenido editable (habilidades, historial
  de proyectos, casos del carrusel, stack, datos de contacto). Para actualizar
  textos o agregar un proyecto nuevo, se edita solo este archivo.
- `src/components/Loader.jsx` — preloader de marca (contador 0→100% + wipe).
- `src/components/BackgroundGrid.jsx` — fondo animado tipo grilla/ola en canvas.
- `src/components/Dagger.jsx` — elemento 3D/SVG animado del hero, heredado de VinPath.
- `src/components/Reveal.jsx` — wrapper de scroll-reveal (fade + translateY)
  reutilizado en todas las secciones, con variante `RevealGroup`/`RevealItem`
  para animaciones escalonadas (stagger).
- `src/components/WorkCarousel.jsx` — carrusel de casos con flechas, dots,
  autoplay y drag táctil.

## Proyectos mostrados

Bruzz (carta digital, cliente real), Miastral (plataforma full-stack),
Maryland Store — iPhone (e-commerce), Ástian Tennis (catálogo mayorista),
3D Fans (impresión 3D coleccionable) y Kray Sekai (app propia, en desarrollo).

## Dependencias

- `react`, `react-dom` — v19
- `framer-motion`, `gsap` — animaciones (loader, scroll-reveal, carrusel, daga)
- `vite`, `@vitejs/plugin-react` — build/dev
