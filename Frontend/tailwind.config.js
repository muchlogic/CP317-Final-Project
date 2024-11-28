/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3dshadow": "10px 10px 0px -1px rgba(0, 0, 0, 0.75)",
        "3dshadow2": "10px 10px 0px -4px rgba(0,0,0,1)",
      },
    },
    fontFamily: {
      WintryFont: ["Wintry", "sans-serif"],
      Penlike: ["Penlike", "sans-serif"],
    },
  },
  plugins: [],
};
