/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'distant-galaxy': 'SFDistantGalaxy',
        'distant-galaxy-outline': 'SFDistantGalaxyOutline',
        'distant-galaxy-symbols': 'SFDistantGalaxySymbols',
      },
    },
  },
  plugins: [],
};
