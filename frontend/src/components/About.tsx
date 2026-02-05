import { motion } from "framer-motion";
import { fadeUp } from "../animation/animations";

export default function About() {
  return (
    <motion.section
      id="about"
      className="section px-6 text-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="liquid-glass rounded-2xl p-6 sm:p-10 max-w-xl mx-auto">
        <p className="text-sm sm:text-base text-slate-300">
          Built with React, TypeScript, and Golang.
          Designed with Gen-Z neon, liquid glass,
          and futuristic UI principles.
        </p>
      </div>
    </motion.section>
  );
}
