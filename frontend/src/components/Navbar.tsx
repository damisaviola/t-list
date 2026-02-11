import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeUp } from "../animation/animations";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl pointer-events-auto"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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

/* ================= CONTENT ================= */

function NavbarContent() {
  const [open, setOpen] = useState(false);

  /* 🔒 BODY SCROLL LOCK (iOS FEEL) */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ================= BACKDROP BLUR (MOBILE) ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ================= NAVBAR ================= */}
      <div className="relative z-50 liquid-glass rounded-full px-5 sm:px-8 py-3 flex items-center gap-4 border border-white/10 backdrop-blur-xl bg-black/20 shadow-2xl">

        {/* BRAND */}
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <span className="font-bold text-sm sm:text-base text-white flex items-center gap-2 whitespace-nowrap">
            <span className="text-yellow-400">⚡</span> GenZ Todo
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <NavItem label="Home" href="#home" />
          <NavItem label="Dashboard" href="#dashboard" />
          <NavItem label="Tasks" href="#todo" />
          <NavItem label="Stats" href="#stats" />
          <NavItem label="Settings" href="#settings" />
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(v => !v)}
          className="ml-auto md:hidden text-white text-xl"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>

        {/* DESKTOP LOGIN */}
        <div className="hidden md:block ml-auto">
          <Link
            to="/login"
            className="
              px-6 py-2 rounded-full text-xs sm:text-sm font-bold
              bg-accent text-black
              transition-all hover:-translate-y-0.5 hover:scale-105
              shadow-[0_0_15px_rgba(0,242,255,0.4)]
            "
          >
            Login
          </Link>
        </div>

        {/* ================= MOBILE DROPDOWN ================= */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="
                absolute top-full left-0 right-0 mt-3
                liquid-glass rounded-2xl p-4
                md:hidden shadow-2xl
              "
            >
              {/* HANDLE BAR (iOS STYLE) */}
              <div className="flex justify-center mb-3">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              <div className="flex flex-col gap-2 text-sm text-slate-300">
                <MobileItem label="Home" href="#home" onClick={() => setOpen(false)} />
                <MobileItem label="Dashboard" href="#dashboard" onClick={() => setOpen(false)} />
                <MobileItem label="Tasks" href="#todo" onClick={() => setOpen(false)} />
                <MobileItem label="Stats" href="#stats" onClick={() => setOpen(false)} />
                <MobileItem label="Settings" href="#settings" onClick={() => setOpen(false)} />

                <div className="h-px bg-white/10 my-2" />

                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="
                    mt-1 px-4 py-2 rounded-xl
                    bg-accent text-black
                    font-bold text-center
                  "
                >
                  Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/* ================= REUSABLE ================= */

function NavItem({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="hover:text-white transition relative group">
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
    </a>
  );
}

function MobileItem({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="
        px-3 py-2 rounded-xl
        hover:bg-white/5 hover:text-white
        transition
      "
    >
      {label}
    </a>
  );
}

/* ================= SKELETON ================= */

function NavbarSkeleton() {
  return (
    <div className="liquid-glass rounded-full px-5 sm:px-8 py-3 flex items-center gap-6 border border-white/5 bg-white/5 backdrop-blur-md">
      <div className="h-5 w-28 bg-white/10 animate-pulse rounded-full" />
      <div className="hidden md:flex gap-6">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="h-3 w-14 bg-white/10 animate-pulse rounded-full"
          />
        ))}
      </div>
      <div className="ml-auto h-9 w-20 bg-white/10 animate-pulse rounded-full" />
    </div>
  );
}
