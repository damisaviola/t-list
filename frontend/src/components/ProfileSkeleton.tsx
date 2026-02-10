import { motion } from "framer-motion";

export default function ProfileSkeleton() {
  return (
    <div className="w-full max-w-xl space-y-8">

      {/* ===== PROFILE CARD ===== */}
      <div className="relative overflow-hidden liquid-glass rounded-3xl p-6 sm:p-10 border border-white/10">

        {/* DESKTOP SHIMMER */}
        <motion.div
          className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="flex flex-col items-center">
          {/* AVATAR */}
          <motion.div
            className="rounded-full bg-white/10 w-20 h-20 sm:w-28 sm:h-28"
            animate={{ opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />

          {/* NAME */}
          <div className="mt-4 h-5 sm:h-6 w-32 sm:w-44 rounded-full bg-white/10" />
          {/* EMAIL */}
          <div className="mt-2 h-4 w-44 sm:w-56 rounded-full bg-white/10" />
          {/* ROLE */}
          <div className="mt-3 h-4 w-20 rounded-full bg-white/10" />
        </div>
      </div>

      {/* ===== INFO CARDS ===== */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {[1, 2].map(i => (
          <motion.div
            key={i}
            className="rounded-2xl bg-white/5 border border-white/10 h-16 sm:h-20"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="liquid-glass rounded-3xl p-5 sm:p-8 border border-white/10 space-y-3">
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="h-11 sm:h-14 rounded-2xl bg-white/10"
            animate={{ opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
      </div>
    </div>
  );
}
