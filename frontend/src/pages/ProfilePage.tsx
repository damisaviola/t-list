import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import ProfileSkeleton from "../components/ProfileSkeleton";
import ProfileCard from "../components/profile/ProfileCard";
import type { User, Stats } from "../components/profile/types";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [chartKey, setChartKey] = useState(0);

  const user: User = {
    name: "Dami",
    email: "dami@genztodo.app",
    role: "Member",
    joinedAt: "January 2025",
  };

  const stats: Stats = {
    totalTasks: 42,
    completed: 29,
    pending: 13,
    productivity: 69,
    streak: 5,
  };

  const weeklyActivity = [3, 5, 4, 6, 2, 7, 4];

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      setChartKey(prev => prev + 1); // 🔥 trigger chart animation
    }, 1200);

    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen px-4 pt-28 pb-16 flex justify-center">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="w-full flex justify-center"
          >
            <ProfileSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl"
          >
            <ProfileCard
              user={user}
              stats={stats}
              weeklyActivity={weeklyActivity}
              chartKey={chartKey}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
