/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'weserve-red': '#B0374B',
        'weserve-maroon': '#1F0608',
        'weserve-grey': '#60454C',
        'weserve-yellow': '#FFD15A',
        'weserve-light': '#8D90A8'
      },
      fontFamily: {
        'clash-display': 'Clash Display, sans-serif'
      },
      display: ["group-hover"],
    },
  },
  plugins: [],
}

