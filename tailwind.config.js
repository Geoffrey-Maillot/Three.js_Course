/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  daisyui: {
    themes: ['dracula'],
  },
  plugins: [require('daisyui')],
};
