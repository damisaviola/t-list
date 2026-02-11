import Navbar from "../components/Navbar";
import ScrollProgress from "../components/ScrollProgress";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  GripVertical,
  Zap,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ================= PAGE ================= */

export default function Landing() {
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* PARALLAX VALUES */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ScrollProgress />

      {/* PARALLAX BACKGROUND */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 neon-bg pointer-events-none"
      />
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 grid-bg pointer-events-none"
      />

      <Navbar />

      {/* ================= HERO ================= */}
      <section
  ref={heroRef}
  className="relative min-h-[90vh] flex items-center justify-center px-4 pt-28 text-center"
>
        {loading ? (
          <HeroSkeleton />
        ) : (
          <motion.div
            style={{ y: heroY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative liquid-glass rounded-3xl p-10 sm:p-14 max-w-4xl overflow-hidden"
          >
            {/* OVERLAY */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-accent/10 via-transparent to-transparent" />

            <div className="relative z-10">
              {/* PARALLAX BADGE */}
              <motion.div
                style={{ y: badgeY }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full text-xs font-semibold bg-accent/15 text-accent"
              >
                <Sparkles className="w-3 h-3" />
                Productivity reimagined
              </motion.div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold">
                Organize Your Tasks
                <span className="block bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  In Neon Flow
                </span>
              </h1>

              <p className="mt-6 text-slate-300 max-w-xl mx-auto">
                A next-generation task manager designed to help you
                stay focused, organized, and productive with
                smooth animations and modern interaction.
              </p>

              <div className="mt-10 flex justify-center">
                <Link
                  to="/login"
                  className="
                    inline-flex items-center gap-2
                    px-10 py-4 rounded-full
                    bg-accent text-black font-bold
                    hover:scale-105 active:scale-95
                    transition
                    shadow-[0_0_30px_rgba(0,242,255,0.35)]
                  "
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <NeonDivider />

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-24 px-6">
        <SectionHeader
          title="Core Features"
          desc="Everything you need to manage your tasks efficiently, without unnecessary complexity."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          <Feature
            icon={<GripVertical />}
            title="Drag & Reorder"
            desc="Organize tasks naturally with intuitive drag & drop interactions."
          />
          <Feature
            icon={<Sparkles />}
            title="Modern UI"
            desc="A clean neon-glass interface inspired by modern iOS design."
          />
          <Feature
            icon={<Zap />}
            title="Fast Workflow"
            desc="Create, update, and complete tasks without friction."
          />
        </motion.div>
      </section>

      <NeonDivider />

      {/* ================= PRODUCT ================= */}
      <section id="product" className="py-24 px-6">
        <SectionHeader
          title="Built for Focus"
          desc="Designed to reduce distractions and help you stay in flow."
        />

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <BentoCard
            icon={<Layers />}
            title="All-in-One Workspace"
            desc="Manage tasks, progress, and productivity in a single place."
            className="md:col-span-2"
          />
          <BentoCard
            icon={<Sparkles />}
            title="Designed for Clarity"
            desc="Minimal visual noise, maximum usability."
          />
        </div>
      </section>

      <NeonDivider />

      {/* ================= CTA ================= */}
      <section className="py-28 px-6 text-center">
        <div className="relative liquid-glass max-w-3xl mx-auto rounded-3xl p-10 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-accent/15 via-transparent to-transparent" />

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to boost your productivity?
          </h2>
          <p className="text-slate-300 mb-8">
            Start organizing your tasks with a modern,
            distraction-free experience.
          </p>

          <Link
            to="/login"
            className="
              inline-flex items-center gap-2
              px-10 py-4 rounded-full
              bg-accent text-black font-bold
              hover:scale-105 active:scale-95
              transition
            "
          >
            Start Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}

/* ================= SHARED ================= */

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <h2 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h2>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}

function NeonDivider() {
  return (
    <div className="relative h-24 flex items-center justify-center pointer-events-none">
      <div className="absolute w-2/3 h-px bg-accent/50" />
      <div className="absolute w-2/3 h-16 bg-accent/30 blur-3xl" />
    </div>
  );
}

/* ================= UI ================= */

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
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="liquid-glass rounded-2xl p-6 border border-white/10 hover:border-accent transition"
    >
      <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </motion.div>
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
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`liquid-glass rounded-3xl p-8 border border-white/10 ${className}`}
    >
      <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </motion.div>
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

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full liquid-glass border border-white/10 text-white text-lg shadow-xl"
    >
      ↑
    </motion.button>
  );
}
