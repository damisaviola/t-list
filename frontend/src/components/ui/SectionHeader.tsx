import { motion } from "framer-motion"

export default function SectionHeader({
  title,
  subtitle,
  isDark
}: {
  title: string
  subtitle: string
  isDark: boolean
}) {
  return (
    <div className="mb-12">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-2 ${
          isDark ? "text-zinc-500" : "text-zinc-400"
        }`}
      >
        {subtitle}
      </motion.p>
      <h2 className={`text-4xl font-bold tracking-tighter ${
        isDark ? "text-white" : "text-zinc-900"
      }`}>
        {title}
      </h2>
    </div>
  )
}
