/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        starlight: {
          blue: "#82AAFF",
          purple: "#C792E9",
          red: "#FF5370",
          orange: "#F88C6B",
          green: "#80CBC3",
          black: "#12111F",
          gray: "#4B4A55",
        },
      },
    },
  },
  plugins: [],
};
