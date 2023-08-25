/** @type {import('tailwindcss').Config} */
// import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      // fontFamily: {
			// 	sans: ['Quicksand', ...defaultTheme.fontFamily.sans]
			// },
      colors: {
        primary: 'rgba(var(--primary) / <alpha-value>)',
        secondary: 'rgba(var(--secondary) / <alpha-value>)',
        tertiary: 'rgba(var(--tertiary) / <alpha-value>)',
        'text-color': 'rgba(var(--text-color) / <alpha-value>)',
        'dark-v1': 'rgba(var(--dark-v1) / <alpha-value>)',
        'dark-v2': 'rgba(var(--dark-v2) / <alpha-value>)'

      },
      maxWidth: {
        'screen-content': '60vw'
      }
    },
  },
  plugins: [],
	darkMode: ['class', '[data-theme="dark"]']
}

