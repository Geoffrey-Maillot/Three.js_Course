/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./*.html", "./**/*.html"],
  daisyui: {
    themes: ["dracula", "pastel"],
  },
  plugins: [require("daisyui")],
};
