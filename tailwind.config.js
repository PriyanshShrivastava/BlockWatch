/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        josefin: ["'Josefin Sans'", "'sans-serif'"],
        lato: ["'Lato'", "'sans-serif'"],
      },
    },
  },
  plugins: [],
};
