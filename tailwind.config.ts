import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#14171A',
          cream: '#FAFAF7',
          teal: '#1B3A34',
          orange: '#BA7517',
        },
      },
      fontFamily: {
        sans: 'var(--font-inter)',
        display: 'var(--font-space-grotesk)',
      },
    },
  },
  plugins: [],
}
export default config
