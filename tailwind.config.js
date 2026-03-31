/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vrc: {
          blue: '#1E90FF',
          neon: '#00FFFF',
          dark: '#0A0E14',
          panel: '#151C26',
        }
      },
      fontFamily: {
        cyber: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}