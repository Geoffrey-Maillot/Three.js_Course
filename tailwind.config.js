/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./html/**/*.html", "./*.html"],
  daisyui: {
    themes: ["dracula", "light"],
  },
  plugins: [require("daisyui")],
};
