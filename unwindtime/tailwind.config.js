/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'gray-c': {
        100: '#e0dfdb',
        800: '#6e737e',
        900: '#343b4b',
        1000: '#262323',
      },
      primary: {
        900: '#943a41',
        700: '#ad7174',
        400: '#c6a8a7',
      },
      danger: {
        600: '#eb5757',
      },
      white: '#fff',
    },
    extend: {
      dropShadow: {
        '3xl': '0px 4px 4px rgba(0, 0, 0, 0.25)',
        '4xl': ['0 35px 35px rgba(0, 0, 0, 0.25)', '0 45px 65px rgba(0, 0, 0, 0.15)'],
      },
    },
  },
  plugins: [],
};
