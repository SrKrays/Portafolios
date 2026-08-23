export const services = [
  {
    icon: 'web',
    title: 'Frontend & Interfaces',
    text: 'Interfaces rápidas y responsivas con React + Vite, animaciones con Framer Motion y GSAP, foco en detalle visual y performance de carga.',
  },
  {
    icon: 'cart',
    title: 'E-commerce & Pagos',
    text: 'Tiendas online con carrito, checkout e integración de MercadoPago, más paneles de administración de productos, precios y pedidos.',
  },
  {
    icon: 'grid',
    title: 'Backend & APIs',
    text: 'APIs propias en .NET/C#, bases de datos MySQL, autenticación y lógica de negocio para sistemas completos: membresías, turnos, pedidos.',
  },
  {
    icon: 'spark',
    title: 'Identidad Visual & UI',
    text: 'Paleta, tipografía y dirección de arte propias para cada proyecto — sin templates, sin perder consistencia técnica ni tiempos de entrega.',
  },
]

export const projectHistory = [
  {
    tag: 'Cliente Real',
    name: 'Bruzz — Carta Digital',
    role: 'Sistema de carta digital para restaurante',
    meta: 'bruzz.com.ar · Córdoba, Argentina',
    built: [
      'Carta digital completa con categorías y promos dinámicas',
      'Promo estacional "Circuito Gastronómico" con lógica propia',
      'Deploy en dominio propio (Ferozo/DonWeb)',
    ],
    stack: 'React 19, Framer Motion, GSAP, .NET/C#, MySQL (Clever Cloud)',
    result: [
      'En uso real todos los días en el restaurante donde trabajo',
      'No es un ejercicio de práctica: es mi propio trabajo resolviendo un problema real',
    ],
  },
  {
    tag: 'Cliente',
    name: 'Miastral',
    role: 'Plataforma de bienestar / Diseño Humano',
    meta: 'miastral.vercel.app · byvalentinam.com',
    built: [
      'Tienda con carrito y checkout, membresías',
      'Panel admin de productos y pedidos',
      'Autenticación e integración de MercadoPago',
    ],
    stack: 'React 19 + Vite + Bootstrap, R3F/drei, .NET/C#, MySQL',
    result: [
      'El proyecto full-stack más completo que hice hasta ahora',
      'Auth + pagos + admin funcionando de punta a punta',
    ],
  },
  {
    tag: 'Cliente',
    name: 'Maryland Store — iPhone',
    role: 'Tienda online de productos Apple',
    meta: 'iphone-cliente.vercel.app',
    built: [
      'Landing de producto con carrusel destacado del último iPhone',
      'Categorías: iPhone, Accesorios, Ofertas, con buscador y cuenta de usuario',
      'Paleta rosa/fucsia propia, distinta al resto del portfolio',
    ],
    stack: 'React + Vite',
    result: [
      'E-commerce real en producción, no una demo',
      'Header completo con búsqueda, cuenta y carrito',
    ],
  },
  {
    tag: 'Cliente',
    name: 'Ástian Tennis',
    role: 'Distribuidor mayorista de tenis y pádel',
    meta: 'tennis-black.vercel.app · Córdoba, Argentina',
    built: [
      'Catálogo real con productos y precios cargados a agosto 2026',
      'Arquitectura por componentes (Nav, Hero, Categories, ProductCard)',
      'Hook propio useCountUp para animar los contadores del hero',
    ],
    stack: 'React + Vite, Framer Motion',
    result: [
      '101 páginas de catálogo y 6 categorías en producción',
      'Roadmap propio: backend .NET + SQL y pedidos por WhatsApp',
    ],
  },
  {
    tag: 'Cliente',
    name: '3D Fans',
    role: 'Tienda de impresión 3D de figuras coleccionables',
    meta: '3-d-fans.vercel.app',
    built: [
      'Catálogo por categorías: figuras, llaveros, posavasos, dioramas',
      'Sistema de piezas personalizadas con cotización',
      'Franja navegable de fandoms (Dragon Ball, Star Wars, Marvel, Pokémon, etc.)',
    ],
    stack: 'React + Vite',
    result: [
      'Identidad "pop" propia, distinta al resto del portfolio',
      'Muestra versatilidad de dirección de arte según el cliente',
    ],
  },
  {
    tag: 'Proyecto Propio',
    name: 'Kray Sekai',
    role: 'App de entrenamiento personal, temática Dragon Ball',
    meta: 'senkai-beta.vercel.app',
    built: [
      'Dashboard tipo "scouter" con Power Level y progreso por etapa Saiyan',
      '10 secciones: hábitos, personaje, entrenamiento, rutinas, nutrición, grupos, estadísticas',
      'Fase 0 — esqueleto visual completo con datos mock, sin backend todavía',
    ],
    stack: 'React + Vite + Tailwind CSS',
    result: [
      'Mapa completo de pantallas con dirección visual ya definida',
      'Próxima fase planeada: backend .NET + EF Core + SQL para el MVP real',
    ],
  },
]

export const cases = [
  {
    title: 'Bruzz — Carta Digital',
    problem:
      'El restaurante donde trabajo de mozo necesitaba modernizar su carta en papel y poder actualizar precios y promos sin depender de una imprenta.',
    approach: 'Sistema de carta digital 100% a medida, con categorías, promos dinámicas y deploy en dominio propio.',
    tools: 'React 19, Framer Motion, GSAP, .NET, MySQL',
    outcome: 'En uso real todos los días — validación de negocio real, no un proyecto de práctica.',
  },
  {
    title: 'Miastral — Plataforma Full-Stack',
    problem:
      'Una consultora de Diseño Humano necesitaba una plataforma completa: tienda, membresías y panel de administración, todo integrado.',
    approach:
      'Frontend React con carrito, checkout y experiencia 3D; backend .NET con auth y MercadoPago; base MySQL en la nube.',
    tools: 'React, R3F/drei, .NET, MySQL, MercadoPago',
    outcome: 'Plataforma funcionando de punta a punta — el proyecto técnico más ambicioso que hice hasta ahora.',
  },
  {
    title: 'Maryland Store — iPhone',
    problem: 'Una tienda de productos Apple necesitaba una landing de e-commerce con presencia real, no una demo.',
    approach:
      'Tienda con carrusel de producto destacado, categorías (iPhone, Accesorios, Ofertas), buscador y cuenta de usuario en el header.',
    tools: 'React, Vite',
    outcome: 'E-commerce real en producción, con cliente real detrás.',
  },
  {
    title: 'Ástian Tennis — Catálogo Mayorista',
    problem:
      'Un distribuidor mayorista de tenis y pádel en Córdoba necesitaba mostrar su catálogo real con precios actualizados.',
    approach:
      'Aplicación React con arquitectura por componentes, catálogo cargado desde datos estructurados y animaciones de contador en el hero.',
    tools: 'React, Vite, Framer Motion',
    outcome: '101 páginas de catálogo en producción, con roadmap definido hacia un backend propio.',
  },
  {
    title: '3D Fans — Impresión 3D Coleccionable',
    problem: 'Un emprendimiento de figuras impresas en 3D necesitaba mostrar catálogo y recibir pedidos personalizados.',
    approach: 'Tienda con categorías, franja de fandoms navegable y flujo de cotización para piezas a medida.',
    tools: 'React, Vite',
    outcome: 'Identidad visual "pop" propia — el proyecto más colorido del portfolio.',
  },
  {
    title: 'Kray Sekai — App de Entrenamiento',
    problem: 'Faltaba una forma más motivadora de trackear entrenamiento personal, sin la frialdad de una app genérica.',
    approach:
      'Dashboard estilo "scouter" de Dragon Ball: Power Level, etapas Saiyan, rutinas, nutrición y grupos, todo mapeado visualmente antes de tocar el backend.',
    tools: 'React, Vite, Tailwind CSS',
    outcome: 'Fase 0 completa — esqueleto visual listo, próximo paso es el backend real en .NET.',
  },
]

export const stack = [
  'React',
  'Vite',
  '.NET / C#',
  'MySQL',
  'MercadoPago',
  'Framer Motion',
  'GSAP',
  'React Three Fiber',
  'Tailwind CSS',
  'Bootstrap',
  'Vercel',
  'GitHub',
]

export const experience = [
  {
    org: 'Cliente — Valentina M. (Miastral / Diseño Humano)',
    role: 'Desarrollador Full Stack — Plataforma Miastral',
    meta: 'Remoto · byvalentinam.com · 2026 – Actualidad',
    built: [
      'Tienda con carrito, checkout y sistema de membresías',
      'Panel de administración de productos y pedidos',
      'Autenticación de usuarios e integración de pagos con MercadoPago',
    ],
    impact: [
      'Plataforma funcionando de punta a punta, en producción real',
      'Relación de cliente activa y continua, no un proyecto cerrado',
    ],
  },
  {
    org: 'Bruzz',
    role: 'Mozo / Camarero — y desarrollador de su sistema de carta digital',
    meta: 'Córdoba, Argentina · bruzz.com.ar · 2023 – Actualidad',
    built: [
      'Atención al cliente, organización de pedidos y capacitación de nuevos empleados',
      'Diseñé y desarrollé, por iniciativa propia, el sistema de carta digital que el restaurante usa hoy',
    ],
    impact: [
      'Comunicación con el público, trabajo bajo presión y liderazgo en tareas operativas',
      'Ejemplo directo de cómo identifico un problema real del negocio y lo resuelvo con código',
    ],
  },
]

export const contact = {
  location: 'Córdoba, Argentina',
  availability: '20–30 hs / semana',
  email: 'mateocardenas029@gmail.com',
  social: 'GitHub: github.com/SrKrays',
  phone: '+54 3543 630784',
  whatsapp: 'https://wa.me/5493543630784',
}
