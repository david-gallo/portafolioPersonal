import { useState, useEffect } from 'react'
import { fetchGitHubRepos } from '../services/github'

// Repos que ya están en la card principal (FeaturedProjects)
const EXCLUDED_REPOS = [
  'clicker_game',
  'Proyecto-backend3-david-gallo',
  'EntregaFinalReact_DavidGallo',
  'Repositorio-Personal-V1',
]

const useGitHubRepos = () => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetchGitHubRepos()
      .then((data) => {
        if (cancelled) return
        const filtered = data
          .filter((r) => !r.fork && !EXCLUDED_REPOS.includes(r.name))
          .map((r) => ({
            name: r.name,
            description: r.description,
            language: r.language,
            stars: r.stargazers_count,
            url: r.html_url,
            homepage: r.homepage,
          }))
        setRepos(filtered)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  return { repos, loading, error }
}

export default useGitHubRepos
