import './ProjectCard.css'

const ProjectCard = ({ title, description, tags, links, image }) => {
  return (
    <article className="project-card">
      {image && (
        <img className="project-card__preview" src={image} alt={title} loading="lazy" />
      )}
      <div className="project-card__info">
        <h3>{title}</h3>
        <p className="project-card__desc">{description}</p>
        <div className="project-card__tags">
          {tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-card__links">
          {links.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
