import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ProfileSkeleton from "../components/ProfileSkeleton";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const user = {
    name: "Dami",
    email: "dami@genztodo.app",
    role: "Member",
    joinedAt: "January 2025",
  };

  // dummy stats (nanti bisa dari backend / context)
  const stats = {
    totalTasks: 42,
    completed: 29,
    pending: 13,
    productivity: 69, // %
  };

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.section
      className="min-h-screen px-4 pt-28 pb-16 flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center"
          >
            <ProfileSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full max-w-xl"
          >
            <ProfileCard user={user} stats={stats} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

/* ================= PROFILE CARD ================= */

function ProfileCard({
  user,
  stats,
}: {
  user: any;
  stats: any;
}) {
  return (
    <div className="relative rounded-3xl p-6 sm:p-10 bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-3xl font-semibold text-white">
          {user.name.charAt(0)}
        </div>

        <h1 className="mt-5 text-2xl font-semibold text-white">
          {user.name}
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          {user.email}
        </p>

        <span className="mt-3 px-4 py-1 rounded-full text-[11px] font-medium bg-white/10 text-slate-300">
          {user.role}
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Tasks" value={stats.totalTasks} />
        <StatCard label="Completed" value={stats.completed} />
        <StatCard label="Pending" value={stats.pending} />
        <StatCard label="Productivity" value={`${stats.productivity}%`} />
      </div>

      {/* INFO */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <InfoCard label="Role" value={user.role} />
        <InfoCard label="Joined" value={user.joinedAt} />
      </div>

      {/* ACTIONS */}
      <div className="space-y-3">
        <PrimaryButton label="Edit Profile" />
        <SecondaryButton label="Change Password" />
        <DangerButton label="Logout" />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
      <p className="text-xs text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-white font-medium">
        {value}
      </p>
    </div>
  );
}

function PrimaryButton({ label }: { label: string }) {
  return (
    <button className="
      w-full py-3.5 rounded-2xl
      font-semibold
      bg-white text-black
      hover:bg-slate-100
      transition
    ">
      {label}
    </button>
  );
}

function SecondaryButton({ label }: { label: string }) {
  return (
    <button className="
      w-full py-3.5 rounded-2xl
      font-medium
      bg-white/5 text-white
      border border-white/10
      hover:bg-white/10
      transition
    ">
      {label}
    </button>
  );
}

function DangerButton({ label }: { label: string }) {
  return (
    <button className="
      w-full py-3.5 rounded-2xl
      font-medium
      bg-red-500/10 text-red-400
      hover:bg-red-500 hover:text-white
      transition
    ">
      {label}
    </button>
  );
}
