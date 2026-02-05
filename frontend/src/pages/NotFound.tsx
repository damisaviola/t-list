import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowLeft, LogIn } from "lucide-react";

export default function NotFound() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* BACKGROUND */}
      <div className="neon-bg" />
      <div className="grid-bg" />

      <AnimatePresence mode="wait">
        {loading ? (
          /* ================= SKELETON ================= */
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="liquid-glass w-full max-w-md rounded-3xl p-8 sm:p-10 shadow-xl"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="skeleton h-12 w-12 rounded-xl" />
              <div className="skeleton h-10 w-24 rounded-md" />
              <div className="skeleton h-4 w-56 rounded-md" />

              <div className="flex gap-3 mt-6">
                <div className="skeleton h-11 w-32 rounded-xl" />
                <div className="skeleton h-11 w-24 rounded-xl" />
              </div>
            </div>
          </motion.div>
        ) : (
          /* ================= CONTENT ================= */
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="liquid-glass w-full max-w-md rounded-3xl p-8 sm:p-10 text-center shadow-xl"
          >
            {/* ICON */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-accent/15 text-accent shadow-[0_0_24px_rgba(0,242,255,0.35)]">
                <AlertTriangle className="w-7 h-7" />
              </div>
            </div>

            {/* TITLE */}
            <h1 className="text-5xl font-extrabold tracking-tight mb-3">
              404
            </h1>

            <p className="text-slate-300 mb-8">
              The page you’re trying to access doesn’t exist.
            </p>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="
                  inline-flex items-center justify-center gap-2
                  px-6 py-3 rounded-xl
                  bg-accent text-black font-semibold
                  hover:-translate-y-0.5 hover:scale-[1.02]
                  transition shadow-[0_0_24px_rgba(0,242,255,0.35)]
                "
              >
                <ArrowLeft className="w-4 h-4" />
                Home
              </Link>

              <Link
                to="/login"
                className="
                  inline-flex items-center justify-center gap-2
                  px-6 py-3 rounded-xl
                  border border-white/20
                  text-slate-200
                  hover:bg-white/10
                  transition
                "
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            </div>

            {/* FOOTER */}
            <p className="text-xs text-slate-500 mt-6">
              GenZ Todo • Page Not Found
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
