export default function Badge({
  children,
  isDark
}: {
  children: React.ReactNode
  isDark: boolean
}) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-medium uppercase tracking-wider ${
      isDark
        ? "bg-zinc-900 border-zinc-800 text-zinc-400"
        : "bg-zinc-100 border-zinc-200 text-zinc-600"
    }`}>
      {children}
    </span>
  )
}
