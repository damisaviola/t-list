// src/components/TodoSkeleton.tsx
import { motion } from "framer-motion";

export const TodoSkeletonItem = ({ index }: { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative overflow-hidden p-4 sm:p-5 rounded-[1.5rem] bg-white/5 border border-white/5 h-[84px] flex items-center gap-5"
    >
      {/* Circle Placeholder (Checkbox) */}
      <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />

      {/* Text Placeholder */}
      <div className="flex-1 space-y-3">
        {/* Judul Task */}
        <div className="h-3 w-3/4 bg-white/10 rounded-full" />
        {/* Meta Info (Category/Priority) */}
        <div className="flex gap-2">
          <div className="h-2 w-12 bg-white/5 rounded-full" />
          <div className="h-2 w-16 bg-white/5 rounded-full" />
        </div>
      </div>

      {/* Shimmer Effect (Kilauan Berjalan) */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export const TodoSkeletonList = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <TodoSkeletonItem key={i} index={i} />
      ))}
    </div>
  );
};