# Plan de Desarrollo - Portafolio David Gallo

## Resumen del Producto

Portafolio personal **single-page** con un diseño de **"card gigante"** interactiva que se revela con scroll. Estilo **minimalista y elegante**, con tema oscuro/claro, paleta de colores en variables CSS para fácil personalización.

**Concepto de interacción (3 capas de scroll):**

1. **Capa superior (card principal):** Lo primero que se ve. Contiene perfil, tecnologías y los 3 proyectos principales.
2. **Capa intermedia (más info):** Al hacer scroll hacia abajo, la card sube y revela: "Sobre mí", educación/certificaciones, proyectos secundarios (traídos desde la API de GitHub).
3. **Capa inferior (contacto):** Al hacer scroll de nuevo, sube otra sección con el formulario de contacto y link a GitHub.

**Stack técnico:** React 19 + Vite + anime.js + CSS Variables + GitHub API.

**Idioma:** Español.

**Objetivo:** Conseguir el primer empleo como desarrollador.

---

## Decisiones Clave

| Decisión | Elección |
|----------|----------|
| Nombre mostrado | David Gallo |
| Foto de perfil | Pendiente (último paso) |
| Tecnologías a mostrar | HTML5, JavaScript, Node.js, Docker, MongoDB, React (JSX) |
| Proyectos principales | Clicker Game + Backend project + Node.js project (3 total) |
| Redes sociales | Solo GitHub |
| Diseño | Card gigante con scroll, minimalista, elegante |
| Tema | Oscuro/Claro con toggle |
| Paleta de colores | Actual (acento púrpura #aa3bff), todo en CSS variables |
| Tipografía | system-ui (actual), fácil de cambiar después |
| Idioma | Español |
| Deploy | GitHub Pages |
| API de GitHub | Sí, para traer repos secundarios automáticamente |
| CV descargable | Pendiente decisión (ver nota de seguridad abajo) |
| Carpetas vacías (auth, products, store) | Eliminar |

### Nota sobre el CV descargable

Es una práctica común en portafolios. Para proteger tus datos:
- Creá una **versión pública** del CV sin dirección exacta, sin DNI, sin teléfono personal.
- Dejá solo: nombre, email profesional, GitHub, ciudad (sin dirección), y tu perfil profesional.
- Así quien quiera contactarte lo hace por el formulario o email, sin exponer datos sensibles.

---

## Fases y Pasos

---

### FASE 0: Limpieza y Preparación

> Ordenar el proyecto antes de construir.

- [x] **0.1** Eliminar carpetas vacías que no se usan (`auth`, `products`, `store`, `services`, `utils`, `router`).
- [x] **0.2** Actualizar el `index.html`: título, meta description, idioma a `es`, favicon.
- [x] **0.3** Actualizar el `README.md` con info real del proyecto (nombre, descripción, cómo correrlo).
- [x] **0.4** Reorganizar la estructura de carpetas para que tenga sentido con un single-page:

```
src/
  components/       → Componentes reutilizables (TechnologyCard, ProjectCard, etc.)
  sections/         → Secciones de la página (Hero, AboutMe, Projects, Contact, etc.)
  hooks/            → Custom hooks (useScrollReveal, useGitHubRepos, useTheme, etc.)
  services/         → Llamadas a API (github.js)
  assets/           → Imágenes e íconos
  styles/           → CSS variables, reset, y estilos globales
  App.jsx
  App.css
  main.jsx
```

---

### FASE 1: Sistema de Diseño Base

> Definir los cimientos visuales antes de construir componentes.

- [x] **1.1** Crear archivo `styles/variables.css` con TODAS las variables de diseño:
  - Colores (primario, secundario, acento, fondos, textos)
  - Versión light y dark de cada color
  - Espaciados (xs, sm, md, lg, xl)
  - Border-radius
  - Sombras
  - Transiciones
  - Tipografía (tamaños, pesos)

- [x] **1.2** Crear `styles/reset.css` con un CSS reset limpio.

- [x] **1.3** Implementar el **toggle de tema oscuro/claro**:
  - Custom hook `useTheme` que lea la preferencia del sistema y permita cambiarla.
  - Guardar la preferencia en `localStorage`.
  - Botón toggle (ícono sol/luna) en una esquina.

- [x] **1.4** Revisar y aprobar cómo se ve el tema claro vs oscuro (solo con fondo y textos básicos).

---

### FASE 2: Layout Principal y Mecánica de Scroll

> La interacción core del portafolio: las capas que suben con scroll.

- [x] **2.1** Refactorizar `App.jsx`: separar la lógica actual de scroll/animación en un custom hook `useScrollReveal`.

- [x] **2.2** Definir la estructura de las 3 capas en el HTML/JSX:
  - Capa 1 (más abajo / contacto)
  - Capa 2 (medio / más info)
  - Capa 3 (arriba / card principal - lo primero que se ve)

- [x] **2.3** Implementar la mecánica de scroll para las 3 capas con anime.js:
  - Scroll down 1: Card principal sube → revela capa intermedia.
  - Scroll down 2: Capa intermedia sube → revela contacto.
  - Scroll up: vuelve paso a paso.

- [x] **2.4** Agregar indicadores visuales de scroll (flechitas o dots que muestren en qué capa estás).

- [x] **2.5** Revisar, probar y ajustar la mecánica. Que sea suave y responsive.

---

### FASE 3: Card Principal (Capa Superior)

> Lo primero que ve el reclutador. Tiene que impactar.

- [x] **3.1** Componente `sections/Hero.jsx`: Foto de perfil (placeholder por ahora) + nombre "David Gallo" + subtítulo "Desarrollador Full Stack Jr" + link a GitHub.

- [x] **3.2** Componente `components/TechnologyCard.jsx`: Refactorizar el actual. Agregar íconos/imágenes para cada tecnología: HTML5, JavaScript, Node.js, Docker, MongoDB, React.

- [x] **3.3** Sección `sections/TechStack.jsx`: Grid con las TechnologyCards. Elegante, con las animaciones hover actuales.

- [x] **3.4** Componente `components/ProjectCard.jsx`: Card para cada proyecto con:
  - Nombre del proyecto
  - Descripción corta (1-2 líneas)
  - Tecnologías usadas (tags/chips)
  - Link al repo de GitHub
  - Link al deploy (si tiene)
  - Screenshot o imagen representativa (placeholder por ahora)

- [x] **3.5** Sección `sections/FeaturedProjects.jsx`: Los 3 proyectos principales en grid.

- [x] **3.6** Indicador de "↓ scroll para ver más" con animación sutil.

- [x] **3.7** Revisar y ajustar el layout de la card principal. Asegurarse de que se ve bien en desktop y mobile.

---

### FASE 4: Capa Intermedia (Más Información)

> Contenido secundario pero valioso.

- [x] **4.1** Sección `sections/AboutMe.jsx`: Texto breve sobre quién sos, qué te motiva, qué buscás. (Redactamos juntos el texto).

- [x] **4.2** Sección `sections/Education.jsx`: Certificaciones, cursos, formación relevante. (Me pasás la info y la armamos).

- [x] **4.3** Sección `sections/MoreProjects.jsx`: Proyectos secundarios traídos desde la **API de GitHub**.
  - Servicio `services/github.js` que consulte `https://api.github.com/users/TU_USUARIO/repos`.
  - Custom hook `useGitHubRepos` que consuma el servicio.
  - Excluir los 3 proyectos principales (ya están arriba).
  - Mostrar: nombre, descripción, lenguaje, estrellas, link.

- [x] **4.4** Revisar y ajustar la capa intermedia.

---

### FASE 5: Capa de Contacto

> Que puedan contactarte fácilmente.

- [x] **5.1** Sección `sections/Contact.jsx` con formulario:
  - Campos: Nombre, Email, Mensaje.
  - Servicio: Web3Forms (POST a api.web3forms.com/submit).
  - Validación HTML nativa (required) + estados de envío.

- [x] **5.2** Link a GitHub debajo del formulario (con ícono FaGithub).

- [ ] **5.3** (Opcional) Botón de descarga de CV si decidís incluirlo.

- [x] **5.4** Footer mínimo: "© 2026 David Gallo".

- [x] **5.5** Revisar y ajustar la sección de contacto.

---

### FASE 6: Responsive y Pulido

> Que se vea bien en todos los dispositivos.

- [x] **6.1** Testing y ajustes en **mobile** (< 768px):
  - La card principal debe adaptarse a 1 columna.
  - Los proyectos se apilan.
  - El scroll entre capas sigue funcionando.
  - Touch events para el scroll en móviles.

- [x] **6.2** Testing en **tablet** (768px - 1024px).

- [x] **6.3** Animaciones de entrada para las secciones (fade-in sutil al aparecer).

- [x] **6.4** Micro-interacciones y hover effects finales.

- [x] **6.5** Optimizar imágenes y assets.

---

### FASE 7: SEO y Performance

> Para que te encuentren y cargue rápido.

- [x] **7.1** Meta tags en `index.html`: title, description, og:image, og:title, twitter card.

- [x] **7.2** Carga diferida (lazy loading) de imágenes.

- [ ] **7.3** Verificar performance con Lighthouse (mínimo 90+).

- [x] **7.4** Agregar `robots.txt` y `sitemap.xml` básicos.

---

### FASE 8: Deploy

> Publicar tu portafolio al mundo.

- [x] **8.1** Configurar Vite para build de producción con base path `/Repositorio-Personal-V1/`.

- [x] **8.2** GitHub Actions workflow para deploy automático en push a `main`.

- [ ] **8.3** Verificar que todo funciona en producción.

- [ ] **8.4** Configurar dominio personalizado (opcional, si comprás uno en el futuro).

---

### FASE 9: Toques Finales

> Los últimos detalles.

- [x] **9.1** Agregar la **foto de perfil** real.
- [ ] **9.2** Agregar **screenshots reales** de los proyectos.
- [ ] **9.3** Agregar el **CV descargable** (si decidís incluirlo).
- [ ] **9.4** Revisión final completa.
- [ ] **9.5** Compartir con alguien para feedback.

---

## Información Pendiente que Necesito de Vos

1. **Tu usuario de GitHub** → para el link y la API.
2. **Info de los 3 proyectos principales** → nombre, descripción, tecnologías, links.
3. **Tu formación/cursos/certificaciones** → para la sección de educación.
4. **Texto "Sobre mí"** → lo podemos redactar juntos cuando lleguemos a esa fase.
5. **Screenshots de los proyectos** → cuando estén listos.
6. **Foto de perfil** → cuando la tengas.

---

## Cómo Vamos a Trabajar

1. Vamos fase por fase, paso por paso.
2. Después de cada paso, revisamos juntos.
3. Si algo no te gusta, lo cambiamos antes de seguir.
4. Si tenés dudas, preguntá sin miedo. Estás acá para aprender.
5. Cada paso está pensado para ser pequeño y manejable.

**¿Listo? Revisá este plan y decime qué cambiarías, qué agregarías, o qué no te convence. Cuando lo apruebes, arrancamos con la Fase 0.**
