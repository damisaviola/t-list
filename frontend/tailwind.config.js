/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },

      colors: {
        bg: "#050505",

        accent: "#00f2ff",

        // optional helper colors (tidak wajib, tapi rapi)
        glass: "rgba(255,255,255,0.05)",
        glassBorder: "rgba(255,255,255,0.1)",
      },

      backdropBlur: {
        xs: "2px",
      },

      boxShadow: {
        neon: "0 0 30px rgba(0,242,255,0.35)",
        neonSoft: "0 0 20px rgba(0,242,255,0.2)",
      },
    },
  },
  plugins: [],
};
