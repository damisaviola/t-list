import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeUp } from "../animation/animations";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading sebentar untuk efek skeleton yang cantik
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    /* STRATEGI CENTERING: 
       Gunakan container full-width dengan flex justify-center. 
       Ini mencegah konflik antara Tailwind 'translate' dan Framer Motion 'transform'.
    */
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl pointer-events-auto"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <NavbarSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <NavbarContent />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

/* ================= REAL NAVBAR CONTENT ================= */

function NavbarContent() {
  return (
    <div className="liquid-glass rounded-full px-5 sm:px-8 py-3 flex items-center gap-6 shadow-2xl border border-white/10 backdrop-blur-xl bg-black/20">
      
      {/* BRAND / LOGO */}
      <Link to="/" className="hover:opacity-80 transition-opacity">
        <span className="font-bold text-sm sm:text-base text-white flex items-center gap-2 whitespace-nowrap">
          <span className="text-yellow-400">⚡</span> GenZ Todo
        </span>
      </Link>

      {/* NAV LINKS */}
      <div className="hidden md:flex gap-6 text-xs sm:text-sm font-medium text-slate-300">
        <a href="#home" className="hover:text-white transition-colors relative group">
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
        </a>
        <a href="#todo" className="hover:text-white transition-colors relative group">
          App
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
        </a>
        <a href="#todo" className="hover:text-white transition-colors relative group">
          About
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
        </a>
      </div>

      {/* LOGIN BUTTON (The Polished Version) */}
      <div className="ml-auto">
        <Link
          to="/login"
          className="group relative px-6 py-2 rounded-full text-xs sm:text-sm font-bold
                     bg-accent text-black overflow-hidden inline-block
                     transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                     hover:-translate-y-0.5 hover:scale-105 active:scale-95
                     shadow-[0_0_15px_rgba(0,242,255,0.3)]
                     hover:shadow-[0_0_25px_rgba(0,242,255,0.6)]
                     will-change-transform"
        >
          {/* GLOW OVERLAY */}
          <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* SHIMMER ANIMATION */}
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                       bg-gradient-to-r from-transparent via-white/70 to-transparent
                       transition-transform duration-1000 ease-in-out skew-x-[-20deg]"
          />

          <span className="relative z-10">Login</span>
        </Link>
      </div>
    </div>
  );
}

/* ================= SKELETON STATE ================= */

function NavbarSkeleton() {
  return (
    <div className="liquid-glass rounded-full px-5 sm:px-8 py-3 flex items-center gap-6 border border-white/5 bg-white/5 backdrop-blur-md">
      <div className="h-5 w-28 bg-white/10 animate-pulse rounded-full" />
      <div className="hidden md:flex gap-6">
        <div className="h-3 w-12 bg-white/10 animate-pulse rounded-full" />
        <div className="h-3 w-12 bg-white/10 animate-pulse rounded-full" />
        <div className="h-3 w-12 bg-white/10 animate-pulse rounded-full" />
      </div>
      <div className="ml-auto h-9 w-20 bg-white/10 animate-pulse rounded-full" />
    </div>
  );
}