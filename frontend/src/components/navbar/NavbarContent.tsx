// components/NavbarContent.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavbarContent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===== MOBILE BACKDROP BLUR ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="
              fixed inset-0 z-40
              bg-black/40 backdrop-blur-md
              md:hidden
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ===== NAVBAR ===== */}
      <div className="relative z-50 liquid-glass rounded-full px-5 sm:px-8 py-3 flex items-center gap-4 border border-white/10 backdrop-blur-xl bg-black/20 shadow-2xl">

        {/* BRAND */}
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <span className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
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
            className="px-6 py-2 rounded-full text-xs font-bold bg-accent text-black hover:scale-105 transition"
          >
            Login
          </Link>
        </div>

        {/* ===== MOBILE DROPDOWN ===== */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute top-full left-0 right-0 mt-3
                liquid-glass rounded-2xl p-4
                md:hidden
                shadow-2xl
              "
            >
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
                  className="mt-1 px-4 py-2 rounded-xl bg-accent text-black font-bold text-center"
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

/* ===== REUSABLE ===== */

function NavItem({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="relative hover:text-white transition group">
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
      className="px-3 py-2 rounded-xl hover:bg-white/5 hover:text-white transition"
    >
      {label}
    </a>
  );
}
