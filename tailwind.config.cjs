/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primarysurface: '#F7FEFF',
        secondarysurface: '#FFFCF5',
        dangersurface: '#FFFAFA',
        successsurface: '#F8FBF9',
        primary: '#01959F',
        secondary: '#FA9810',
        success: '#43936C',
        danger: '#E11428',
        neutral20: '#FAFAFA',
        percent: '#757575',
        dash: '#E0E0E0',
      },
      fontFamily: {
        sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
        inter: 'Inter',
      },
    },
  },
  plugins: [],
}
