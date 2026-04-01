import ProjectCard from '../components/ProjectCard'
import './FeaturedProjects.css'

const projects = [
  {
    title: 'Clicker Game',
    description: 'Juego interactivo con sistema de mejoras, logros desbloqueables y auto-click. Persistencia con localStorage y animaciones con Anime.js.',
    tags: ['JavaScript', 'SCSS', 'Anime.js'],
    image: `${import.meta.env.BASE_URL}clicker-game-1.jpeg`,
    links: [
      { label: 'Web', url: 'https://david-gallo.github.io/clicker_game' },
      { label: 'GitHub', url: 'https://github.com/david-gallo/clicker_game' },
    ],
  },
  {
    title: 'AdoptMe API',
    description: 'API REST para gestión de adopción de mascotas. Autenticación JWT, documentación Swagger, tests con Mocha/Chai y Docker.',
    tags: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    links: [
      { label: 'GitHub', url: 'https://github.com/david-gallo/Proyecto-backend3-david-gallo' },
    ],
  },
  {
    title: 'E-commerce React',
    description: 'Tienda online con catálogo dinámico, navegación por rutas y datos integrados con Firebase/Firestore.',
    tags: ['React', 'Firebase', 'SCSS'],
    links: [
      { label: 'Web', url: 'https://david-gallo.github.io/EntregaFinalReact_DavidGallo' },
      { label: 'GitHub', url: 'https://github.com/david-gallo/EntregaFinalReact_DavidGallo' },
    ],
  },
]

const FeaturedProjects = () => {
  return (
    <section className="featured-projects">
      <h2 className="title">Proyectos</h2>
      <div className="projects-container">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProjects
