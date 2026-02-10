import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
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
    <div className="rounded-3xl p-6 sm:p-10 bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
      <ProfileHeader user={user} />
      <ProfileStats stats={stats} />

      <div className="mt-6 mb-10">
        <p className="text-xs text-slate-400 mb-3">
          Productivity · Last 7 days
        </p>
        <ProfileMiniChart data={weeklyActivity} chartKey={chartKey} />
      </div>

      <ProfileActions />
    </div>
  );
}
