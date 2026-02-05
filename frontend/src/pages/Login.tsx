import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  /* PAGE SKELETON */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const login = () => {
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      setShake(true);
      return;
    }

    setError("");
    setSubmitting(true);

    setTimeout(() => {
      localStorage.setItem("token", "logged-in");
      navigate("/app");
    }, 1200);
  };

  /* AUTO HIDE ERROR */
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(""), 2000);
    return () => clearTimeout(t);
  }, [error]);

  /* RESET SHAKE */
  useEffect(() => {
    if (!shake) return;
    const t = setTimeout(() => setShake(false), 400);
    return () => clearTimeout(t);
  }, [shake]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
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
            className="liquid-glass w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-xl"
          >
            <div className="flex flex-col items-center mb-8">
              <div className="skeleton h-10 w-10 rounded-full mb-3" />
              <div className="skeleton h-5 w-40 rounded-md mb-2" />
              <div className="skeleton h-4 w-56 rounded-md" />
            </div>

            <div className="space-y-4">
              <div className="skeleton h-12 w-full rounded-xl" />
              <div className="skeleton h-12 w-full rounded-xl" />
              <div className="skeleton h-12 w-full rounded-xl mt-6" />
            </div>
          </motion.div>
        ) : (
          /* ================= LOGIN CARD (NO ENTRY ANIMATION) ================= */
          <motion.div
            key="content"
            animate={shake ? { x: [-6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
            className="liquid-glass w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-xl"
          >
            {/* HEADER */}
            <div className="text-center mb-8">
              <div className="text-3xl mb-2">⚡</div>
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-sm text-slate-400 mt-1">
                Sign in to continue to GenZ Todo
              </p>
            </div>

            {/* ALERT (NO ANIMATION) */}
            {error && (
              <div
                className="
                  mb-5 rounded-xl px-4 py-3 text-sm
                  text-red-300
                  bg-red-500/10
                  border border-red-500/30
                "
              >
                {error}
              </div>
            )}

            {/* FORM */}
            <div className="space-y-4">
              {/* EMAIL */}
              <div>
                <label className="text-xs text-slate-400 mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={submitting}
                  className="
                    w-full px-4 py-3 rounded-xl
                    bg-black/40
                    border border-white/20
                    focus:outline-none focus:border-accent
                    transition disabled:opacity-60
                  "
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-xs text-slate-400 mb-1 block">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={submitting}
                    className="
                      w-full px-4 py-3 pr-11 rounded-xl
                      bg-black/40
                      border border-white/20
                      focus:outline-none focus:border-accent
                      transition disabled:opacity-60
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    disabled={submitting}
                    className="
                      absolute right-3 top-1/2 -translate-y-1/2
                      text-slate-400 hover:text-accent
                      transition disabled:opacity-50
                    "
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ACTION */}
            <button
              onClick={login}
              disabled={submitting}
              className={`
                mt-8 w-full py-3 rounded-xl
                font-semibold transition
                flex items-center justify-center gap-3
                ${
                  submitting
                    ? "bg-accent/70 text-black cursor-not-allowed"
                    : "bg-accent text-black hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 shadow-[0_0_24px_rgba(0,242,255,0.35)]"
                }
              `}
            >
              {submitting ? (
                <>
                  <Spinner />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* FOOTER */}
            <p className="text-xs text-center text-slate-400 mt-6">
              Demo login — any email & password will work.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= SPINNER ================= */

function Spinner() {
  return (
    <span
      className="
        inline-block h-4 w-4
        rounded-full
        border-2 border-black/30
        border-t-black
        animate-spin
      "
    />
  );
}
