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
    theme: {
      screens: {
        tablet: '640px',
        // => @media (min-width: 640px) { ... }

        laptop: '1024px',
        // => @media (min-width: 1024px) { ... }

        desktop: '1280px'
        // => @media (min-width: 1280px) { ... }
      }
    }
    // screens: {
    //   sm: { max: '567px' },

    //   md: { min: '568px', max: '1023px' },

    //   lg: { min: '1024px', max: '1279px' },

    //   xl: { min: '1280px', max: '1535px' },

    //   '2xl': { min: '1536px' }
    // }
  },
  plugins: []
}
