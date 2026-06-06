/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1a2e4a",
          light: "#243a5c",
        },
        gold: "#d4831a",
        "grey-light": "#f4f6f9",
        body: "#212121",
        muted: "#6b7280",
        whatsapp: "#16a34a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        panel: "0 25px 50px -12px rgba(26, 46, 74, 0.18)",
      },
    },
  },
  plugins: [],
};
