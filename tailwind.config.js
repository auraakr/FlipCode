/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.js', './src/**/*.{js,jsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#365CFF', dark: '#2B49CC', light: '#E8EDFF' },
        ink: '#1F2A44',
        cream: '#FDFCF7',
      },
    },
  },
  plugins: [],
};
