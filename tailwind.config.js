/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './Layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(var(--primary), <alpha-value>)',
        'text-color': 'rgba(var(--text-color), <alpha-value>)',
        secondary: 'rgba(var(--secondary), <alpha-value>)',
        tertiary: 'rgba(var(--tertiary), <alpha-value>)'
      },
      maxWidth: {
        'screen-80': '80vw'
      }
    },
    screens: {
      xs: { max: '480px' },
      sm: { min: '481px', max: '780px' },
      md: { min: '781px', max: '1023px' },

      lg: { min: '1024px', max: '1279px' },

      xl: { min: '1280px', max: '1535px' },

      '2xl': { min: '1536px' }
    }
  },
  plugins: []
}
