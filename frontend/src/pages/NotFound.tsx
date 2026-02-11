// src/pages/NotFound.tsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Home, Ghost } from "lucide-react";

export default function NotFound() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200); 
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-[#050505]">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          /* ================= PREMIUM SKELETON ================= */
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-md liquid-glass border border-white/10 rounded-[2.5rem] p-10 overflow-hidden"
          >
            <div className="flex flex-col items-center">
              {/* Icon Skeleton */}
              <div className="w-20 h-20 rounded-3xl bg-white/5 mb-8" />
              
              {/* Text Skeleton */}
              <div className="h-12 w-32 bg-white/10 rounded-2xl mb-4" />
              <div className="h-3 w-20 bg-white/5 rounded-full mb-6" />
              <div className="h-4 w-full bg-white/5 rounded-full mb-2" />
              <div className="h-4 w-2/3 bg-white/5 rounded-full mb-10" />
              
              {/* Button Skeleton */}
              <div className="w-full h-14 bg-white/10 rounded-2xl mb-3" />
              <div className="w-full h-14 bg-white/5 rounded-2xl" />
            </div>

            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        ) : (
          /* ================= CONTENT ================= */
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="liquid-glass border border-white/10 rounded-[2.5rem] p-10 text-center shadow-2xl group">
              {/* ICON AREA */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex justify-center mb-8"
              >
                <div className="relative w-20 h-20 rounded-3xl flex items-center justify-center bg-white/[0.03] border border-white/10 text-accent shadow-2xl shadow-accent/10">
                  <Ghost className="w-10 h-10" />
                </div>
              </motion.div>

              <div className="relative z-10">
                <h1 className="text-6xl font-black tracking-tighter text-white mb-2 uppercase leading-none italic">
                  404<span className="text-accent">.</span>
                </h1>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-6">
                   Lost in Space
                </p>
                <p className="text-slate-400 text-sm mb-10 leading-relaxed">
                  Halaman yang kamu cari tidak ditemukan atau telah pindah ke dimensi lain.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] hover:bg-accent transition-all active:scale-95 shadow-xl shadow-white/5"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-500" />
                  Go Back
                </Link>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.5em]">
                  GenZ Todo • 0x404 Error
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}