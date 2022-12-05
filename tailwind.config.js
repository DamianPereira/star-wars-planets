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
      aspectRatio: {
        'video-vertical': '9 / 16',
        thin: '32 / 9',
      },
      backgroundImage: {
        'star-wars-horizontal': 'url(images/background.svg)',
        'star-wars-vertical': 'url(images/background-vertical.svg)',
        'star-wars-thin': 'url(images/background-thin.svg)',
      },
    },
  },
  plugins: [],
};
