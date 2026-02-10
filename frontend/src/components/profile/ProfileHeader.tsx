// components/profile/ProfileHeader.tsx
import type { User } from "../../components/profile/types";

export default function ProfileHeader({ user }: { user: User }) {
  return (
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
  );
}
