import { useEffect, useState } from "react"
import type { GithubData, Repo } from "../types/github"

export function useGithub(username: string) {
  const [user, setUser] = useState<GithubData | null>(null)
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`)
        ])

        setUser(await userRes.json())
        setRepos(await repoRes.json())
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [username])

  return { user, repos, loading }
}
