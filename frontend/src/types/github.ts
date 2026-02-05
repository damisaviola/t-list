export interface GithubData {
  avatar_url: string
  name: string
  public_repos: number
  followers: number
  bio: string
}

export interface Repo {
  id: number
  name: string
  description: string
  stargazers_count: number
  language: string
  html_url: string
}
