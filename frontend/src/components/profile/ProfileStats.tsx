// components/profile/ProfileStats.tsx
import type { Stats } from "../../components/profile/types";

export default function ProfileStats({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <Stat label="Tasks" value={stats.totalTasks} />
      <Stat label="Done" value={stats.completed} />
      <Stat label="Pending" value={stats.pending} />
      <Stat label="Streak" value={`${stats.streak}d`} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
