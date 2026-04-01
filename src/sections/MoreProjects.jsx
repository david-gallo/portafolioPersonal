import useGitHubRepos from '../hooks/useGitHubRepos'
import InfiniteCarousel from '../components/InfiniteCarousel'
import './MoreProjects.css'

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C#': '#178600',
  C: '#555555',
  'C++': '#f34b7d',
  Ruby: '#701516',
  Go: '#00add8',
  Rust: '#dea584',
  PHP: '#4f5d95',
  Shell: '#89e051',
}

const RepoMiniCard = ({ repo }) => (
  <a
    href={repo.url}
    target="_blank"
    rel="noopener noreferrer"
    className="repo-mini"
  >
    <div className="repo-mini__header">
      {repo.language && (
        <span className="repo-mini__lang">
          <span
            className="repo-mini__dot"
            style={{ background: LANG_COLORS[repo.language] || 'var(--accent)' }}
          />
          {repo.language}
        </span>
      )}
      {repo.stars > 0 && (
        <span className="repo-mini__stars">★ {repo.stars}</span>
      )}
    </div>
    <span className="repo-mini__name">{repo.name}</span>
    {repo.description && (
      <span className="repo-mini__desc">{repo.description}</span>
    )}
    <span className="repo-mini__link">
      Ver en GitHub
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  </a>
)

const MoreProjects = () => {
  const { repos, loading, error } = useGitHubRepos()

  if (loading) {
    return (
      <section className="more-projects">
        <h2>Otros proyectos</h2>
        <p className="more-projects__status">Cargando repos...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="more-projects">
        <h2>Otros proyectos</h2>
        <p className="more-projects__status">No se pudieron cargar los repos.</p>
      </section>
    )
  }

  if (repos.length === 0) return null

  return (
    <section className="more-projects">
      <h2>Otros proyectos</h2>
      <InfiniteCarousel speed={0.7} className="repo-carousel">
        {repos.map((repo) => (
          <RepoMiniCard key={repo.name} repo={repo} />
        ))}
      </InfiniteCarousel>
    </section>
  )
}

export default MoreProjects
