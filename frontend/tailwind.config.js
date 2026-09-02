/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        civic: {
          navy: '#0b2545',
          dark: '#13315c',
          blue: '#134074',
          light: '#8da9c4',
          bg: '#eef4f8',
          saffron: '#f77f00',
          saffronLight: '#fff3e0',
          green: '#1b998b',
          greenLight: '#e8f8f5',
          accent: '#0066cc'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
