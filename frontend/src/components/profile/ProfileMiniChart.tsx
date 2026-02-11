// components/profile/ProfileMiniChart.tsx
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";

type Props = {
  data: number[];
};

export default function ProfileMiniChart({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.85 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative h-36
        rounded-2xl
        bg-white/5
        border border-white/10
        px-3 py-4
        overflow-hidden
      "
    >
      {/* soft glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />

      <Line
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              data,
              tension: 0.5,
              borderWidth: 6,
              borderColor: "rgba(255,255,255,0.15)",
              pointRadius: 0,
            },
            {
              data,
              tension: 0.5,
              borderWidth: 2,
              borderColor: "rgba(255,255,255,0.9)",
              fill: true,
              backgroundColor: ctx => {
                const { chart } = ctx;
                const { ctx: canvas, chartArea } = chart;
                if (!chartArea) return "transparent";

                const g = canvas.createLinearGradient(
                  0,
                  chartArea.top,
                  0,
                  chartArea.bottom
                );
                g.addColorStop(0, "rgba(255,255,255,0.25)");
                g.addColorStop(1, "rgba(255,255,255,0)");
                return g;
              },
              pointRadius: 3,
              pointHoverRadius: 6,
              pointBackgroundColor: "#fff",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 900,
            easing: "easeOutQuart",
          },
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: { display: false },
            y: { display: false },
          },
        }}
      />
    </motion.div>
  );
}
