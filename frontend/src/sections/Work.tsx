import { PROJECTS } from "../data/projects"
import SectionHeader from "../components/ui/SectionHeader"
import { motion } from "framer-motion"

export default function Work({ isDark }: { isDark: boolean }) {
  return (
    <section id="work" className="mb-40">
      <SectionHeader title="Karya Terpilih" subtitle="Arsip Proyek" isDark={isDark} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map(p => (
          <motion.div key={p.id} whileHover={{ y: -5 }} className="border rounded-2xl p-8">
            <h3 className="text-xl font-bold">{p.title}</h3>
            <p className="text-sm text-zinc-500 mt-2">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
