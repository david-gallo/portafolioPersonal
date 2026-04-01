const GITHUB_USER = 'david-gallo'
const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos`

export const fetchGitHubRepos = async () => {
  const res = await fetch(`${API_URL}?per_page=100&sort=updated`)

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`)
  }

  return res.json()
}
