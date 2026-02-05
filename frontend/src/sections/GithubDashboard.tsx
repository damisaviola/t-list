import SectionHeader from "../components/ui/SectionHeader"
import { useGithub } from "../hooks/useGithub"

export default function GithubDashboard({ isDark }: { isDark: boolean }) {
  const { user, repos, loading } = useGithub("shadcn")

  return (
    <section id="github" className="mb-40">
      <SectionHeader title="Status Real-time" subtitle="Kesehatan Sistem" isDark={isDark} />

      {loading ? (
        <p className="text-zinc-500">Loading...</p>
      ) : (
        <pre className="text-xs text-zinc-500">
          {JSON.stringify({ user, repos }, null, 2)}
        </pre>
      )}
    </section>
  )
}
