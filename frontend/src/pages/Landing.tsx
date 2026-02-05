import Navbar from "../components/Navbar";
import ScrollProgress from "../components/ScrollProgress";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from "../animation/animations";
import {
  Sparkles,
  GripVertical,
  Zap,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Landing() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* SCROLL PROGRESS */}
      <ScrollProgress />

      {/* BACKGROUND */}
      <div className="neon-bg" />
      <div className="grid-bg" />

      <Navbar />

      {/* ================= HERO ================= */}
      <section className="min-h-[85vh] flex items-center justify-center px-4 pt-24 text-center">
        {loading ? (
          <HeroSkeleton />
        ) : (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="liquid-glass rounded-3xl p-10 sm:p-14 max-w-4xl"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold">
              Organize Your Tasks
              <span className="block bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                In Neon Flow
              </span>
            </h1>

            <p className="mt-6 text-slate-300 max-w-xl mx-auto">
              A modern task manager with drag & drop, smooth
              animation, and productivity-first design.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 px-10 py-4 rounded-full bg-accent text-black hover:scale-105 transition"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </motion.div>
        )}
      </section>

      <div className="neon-divider" />

      {/* ================= FEATURES ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="section px-6"
      >
        <div className="max-w-6xl mx-auto grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          <Feature
            icon={<GripVertical />}
            title="Drag & Reorder"
            desc="Rearrange tasks naturally with smooth drag interactions."
          />
          <Feature
            icon={<Sparkles />}
            title="Modern UI"
            desc="Neon and liquid glass interface designed for focus."
          />
          <Feature
            icon={<Zap />}
            title="Fast Workflow"
            desc="Create, edit, and manage tasks without friction."
          />
        </div>
      </motion.section>

      <div className="neon-divider" />

      {/* ================= BENTO ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="section px-6"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          <BentoCard
            icon={<Layers />}
            title="All-in-One Workspace"
            desc="Everything you need to manage tasks in one place."
            className="md:col-span-2"
          />
          <BentoCard
            icon={<Sparkles />}
            title="Designed for Focus"
            desc="Minimal distractions with maximum clarity."
          />
        </div>
      </motion.section>

      <div className="neon-divider" />

      {/* ================= CTA ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="section px-6 text-center"
      >
        <div className="liquid-glass max-w-3xl mx-auto rounded-3xl p-8 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to level up your productivity?
          </h2>
          <p className="text-slate-300 mb-8">
            Start managing tasks with a modern experience.
          </p>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-accent text-black hover:scale-105 transition"
          >
            Start Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="liquid-glass rounded-2xl p-6 border border-white/10 hover:border-accent transition">
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent/20 text-accent mb-4">
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </div>
  );
}

function BentoCard({
  icon,
  title,
  desc,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <div
      className={`liquid-glass rounded-3xl p-8 border border-white/10 hover:border-accent transition ${className}`}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent/20 text-accent mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div className="liquid-glass rounded-3xl p-10 sm:p-14 max-w-4xl space-y-6">
      <div className="skeleton h-10 w-3/4 mx-auto rounded-lg" />
      <div className="skeleton h-10 w-1/2 mx-auto rounded-lg" />
      <div className="skeleton h-4 w-2/3 mx-auto rounded" />
      <div className="skeleton h-12 w-40 mx-auto rounded-full" />
    </div>
  );
}
