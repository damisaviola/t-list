export default function ProfileActions() {
  return (
    <div className="space-y-3 mt-8">
      <Primary label="Edit Profile" />
      <Secondary label="Change Password" />
      <Danger label="Logout" />
    </div>
  );
}

function Primary({ label }: { label: string }) {
  return (
    <button className="w-full py-3.5 rounded-2xl font-semibold bg-white text-black hover:bg-slate-100 transition">
      {label}
    </button>
  );
}

function Secondary({ label }: { label: string }) {
  return (
    <button className="w-full py-3.5 rounded-2xl font-medium bg-white/5 text-white border border-white/10 hover:bg-white/10 transition">
      {label}
    </button>
  );
}

function Danger({ label }: { label: string }) {
  return (
    <button className="w-full py-3.5 rounded-2xl font-medium bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition">
      {label}
    </button>
  );
}
