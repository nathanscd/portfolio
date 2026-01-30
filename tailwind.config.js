/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        racing: {
          red: '#FF001D',
          black: '#111111',
          gray: '#F4F4F4',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        race: ['Orbitron', 'sans-serif'],
      }
    },
  },
  plugins: [],
}