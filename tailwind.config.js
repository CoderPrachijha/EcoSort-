/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        recycle: "#16a34a",
        compost: "#ca8a04",
        hazard: "#dc2626",
        general: "#6b7280"
      }
    },
  },
  plugins: [],
};
