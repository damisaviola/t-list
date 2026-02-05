const skills = [
  "React",
  "TypeScript",
  "Tailwind",
  "Next.js",
  "Motion UI",
  "Creative Coding",
];

export default function Skills() {
  return (
    <section id="skills" className="py-40">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl mb-16">Things I Play With</h2>

        <div className="flex flex-wrap justify-center gap-6">
          {skills.map(skill => (
            <span
              key={skill}
              className="px-8 py-4 rounded-full bg-glass backdrop-blur-xl border border-white/10 shadow-glass
              hover:scale-110 hover:border-accent transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
