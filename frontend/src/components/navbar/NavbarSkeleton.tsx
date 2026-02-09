import { motion } from "framer-motion";

export default function NavbarSkeleton() {
  return (
    <div className="
      relative overflow-hidden
      liquid-glass rounded-full
      px-5 sm:px-8 py-3
      flex items-center gap-6
      border border-white/5
      bg-white/5 backdrop-blur-md
    ">
      {/* SHIMMER OVERLAY */}
      <motion.div
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-r
          from-transparent via-white/10 to-transparent
        "
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* BRAND */}
      <motion.div
        className="h-5 w-28 rounded-full bg-white/10"
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* MENU ITEMS */}
      <div className="hidden md:flex gap-6">
        {[1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            className="h-3 w-14 rounded-full bg-white/10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.12,
            }}
          />
        ))}
      </div>

      {/* LOGIN BUTTON */}
      <motion.div
        className="ml-auto h-9 w-20 rounded-full bg-white/10"
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
