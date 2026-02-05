export default function Projects() {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl mb-16">Selected Work</h2>

        <div className="grid md:grid-cols-3 gap-8 auto-rows-[240px]">
          
          <div className="md:col-span-2 row-span-2 p-8 rounded-3xl bg-glass backdrop-blur-xl shadow-glass border border-white/10 hover:border-accent transition">
            <h3 className="text-2xl mb-4">Liquid Glass Portfolio</h3>
            <p className="text-slate-300">
              Futuristic personal website using glassmorphism,
              animated gradients, and bento-based layout.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-glass backdrop-blur-xl shadow-glass border border-white/10 hover:border-accent transition">
            Dashboard UI
          </div>

          <div className="p-8 rounded-3xl bg-glass backdrop-blur-xl shadow-glass border border-white/10 hover:border-accent transition">
            Experimental UI Lab
          </div>

        </div>
      </div>
    </section>
  );
}
