/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        dmsans: ["'DM Sans'", "'sans-serif'"],
        lato: ["'Lato'", "'sans-serif'"],
      },
    },
  },
  plugins: [],
};
