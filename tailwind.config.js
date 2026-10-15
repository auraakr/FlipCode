/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./App.js', './src/**/*.{js,jsx}'],
  presets: [require('nativewind/preset')],
  // Bobot font diatur lewat nama family (RN tidak memilih file font dari fontWeight).
  corePlugins: { fontWeight: false },
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#365CFF', dark: '#2B49CC', light: '#E8EDFF' },
        ink: '#1F2A44',
        cream: '#FDFCF7',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) =>
      addUtilities({
        '.font-light': { fontFamily: 'NunitoSans_300Light' },
        '.font-normal': { fontFamily: 'NunitoSans_400Regular' },
        '.font-medium': { fontFamily: 'NunitoSans_500Medium' },
        '.font-semibold': { fontFamily: 'NunitoSans_600SemiBold' },
        '.font-bold': { fontFamily: 'NunitoSans_700Bold' },
        '.font-extrabold': { fontFamily: 'NunitoSans_800ExtraBold' },
        '.font-black': { fontFamily: 'NunitoSans_900Black' },
      })
    ),
  ],
};
