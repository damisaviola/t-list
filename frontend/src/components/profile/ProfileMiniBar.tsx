import { motion } from "framer-motion";

type Props = {
  label: string;
  value: number; // 0 - 100
};

export default function ProfileMiniBar({ label, value }: Props) {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-xs text-slate-300 font-medium">{value}%</p>
      </div>

      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full rounded-full bg-white"
        />
      </div>
    </div>
  );
}
