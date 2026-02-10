import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavbarContent() {
  const [open, setOpen] = useState(false);

  const user = {
    name: "Dami",
    email: "dami@genztodo.app",
  };

  // BODY SCROLL LOCK (MOBILE)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* BACKDROP BLUR (MOBILE) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <div className="relative z-50 liquid-glass rounded-full px-5 sm:px-8 py-3 flex items-center gap-4 border border-white/10 backdrop-blur-xl bg-black/20 shadow-2xl">

        {/* BRAND */}
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <span className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
            <span className="text-yellow-400">⚡</span> GenZ Todo
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <NavItem label="Home" href="/" />
          <NavItem label="Dashboard" href="/#dashboard" />
          <NavItem label="Tasks" href="/#todo" />
          <NavItem label="Stats" href="/#stats" />
        </div>

        {/* DESKTOP PROFILE (CLICKABLE) */}
        <Link
          to="/profile"
          className="hidden md:flex items-center gap-3 ml-auto hover:opacity-90 transition"
        >
          <div className="text-right text-xs leading-tight">
            <p className="text-white font-semibold">{user.name}</p>
            <p className="text-slate-400">{user.email}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-accent text-black font-bold flex items-center justify-center">
            {user.name.charAt(0)}
          </div>
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen(v => !v)}
          className="ml-auto md:hidden text-white text-xl"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>

        {/* MOBILE DROPDOWN */}
        <AnimatePresence>
          {open && (
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 140 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 70) setOpen(false);
              }}
              initial={{ opacity: 0, y: -14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="
                absolute top-full left-0 right-0 mt-3
                liquid-glass rounded-2xl p-4
                md:hidden shadow-2xl
                cursor-grab active:cursor-grabbing
              "
            >
              {/* HANDLE */}
              <div className="flex justify-center mb-3">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* PROFILE (MOBILE) */}
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-3 hover:bg-white/10 transition"
              >
                <div className="w-10 h-10 rounded-full bg-accent text-black font-bold flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <div className="text-sm">
                  <p className="text-white font-semibold leading-tight">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {user.email}
                  </p>
                </div>
              </Link>

              <div className="flex flex-col gap-2 text-sm text-slate-300">
                <MobileItem label="Home" to="/" onClick={() => setOpen(false)} />
                <MobileItem label="Dashboard" to="/#dashboard" onClick={() => setOpen(false)} />
                <MobileItem label="Tasks" to="/#todo" onClick={() => setOpen(false)} />
                <MobileItem label="Stats" to="/#stats" onClick={() => setOpen(false)} />
                <MobileItem label="Profile" to="/profile" onClick={() => setOpen(false)} />
                <MobileItem label="Settings" to="/settings" onClick={() => setOpen(false)} />

                <div className="h-px bg-white/10 my-2" />

                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition font-bold"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/* REUSABLE */

function NavItem({ label, href }: { label: string; href: string }) {
  return (
    <Link
      to={href}
      className="relative hover:text-white transition group"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
    </Link>
  );
}

function MobileItem({
  label,
  to,
  onClick,
}: {
  label: string;
  to: string;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="px-3 py-2 rounded-xl hover:bg-white/5 hover:text-white transition"
    >
      {label}
    </Link>
  );
}
