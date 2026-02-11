import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileMiniBar from "./ProfileMiniBar";
import ProfileMiniChart from "./ProfileMiniChart";
import ProfileActions from "./ProfileActions";

import type { User, Stats } from "./types";

type Props = {
  user: User;
  stats: Stats;
  weeklyActivity: number[];
  chartKey: number;
};

export default function ProfileCard({
  user,
  stats,
  weeklyActivity,
  chartKey,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        p-6 sm:p-10
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        shadow-xl
      "
    >
      {/* ===== HEADER ===== */}
      <ProfileHeader user={user} />

      {/* ===== STATS ===== */}
      <div className="mt-8">
        <ProfileStats stats={stats} />
      </div>

      {/* ===== MINI BAR ===== */}
      <div className="mt-8">
        <ProfileMiniBar
          label="Weekly Productivity"
          value={stats.productivity}
        />
      </div>

      {/* ===== MINI CHART ===== */}
      <div className="mt-6 mb-12">
        <p className="text-xs text-slate-400 mb-3">
          Productivity · Last 7 days
        </p>

        <ProfileMiniChart
          key={chartKey}              // 🔑 penting biar animasi ke-trigger ulang
          data={weeklyActivity}
        />
      </div>

      {/* ===== ACTIONS ===== */}
      <ProfileActions />
    </div>
  );
}
