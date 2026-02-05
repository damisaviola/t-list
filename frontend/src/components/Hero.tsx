import { motion } from "framer-motion";
import { fadeUp, fadeScale } from "../animation/animations";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[85vh] flex items-center justify-center px-4 pt-28 text-center"
    >
      <motion.div
        className="liquid-glass rounded-3xl p-10 sm:p-14 max-w-3xl"
        variants={fadeScale}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold"
        >
          Build Your Life
          <span className="block bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            In Neon Flow
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-sm sm:text-lg text-slate-300"
        >
          Futuristic Gen-Z todo app with liquid glass UI,
          neon lights, and modern UX.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#todo"
            className="px-8 py-3 rounded-full bg-accent text-black font-medium hover:scale-105 transition"
          >
            Start Now
          </a>
          <button className="px-8 py-3 rounded-full border border-white/30 hover:border-accent">
            Explore
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
