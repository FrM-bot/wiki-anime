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
      sm: { max: '567px' },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: '568px', max: '1023px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: '1024px', max: '1279px' },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: '1280px', max: '1535px' },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': { min: '1536px' }
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: []
}
