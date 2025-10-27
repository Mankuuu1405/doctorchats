/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary':'#14B8A6'
      },
      animation: {
        'scroll-up': 'scroll-up 30s linear infinite',
        'scroll-down': 'scroll-down 30s linear infinite',
      },
      keyframes: {
        'scroll-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' }, // Adjust based on the number of cards
        },
        'scroll-down': {
          '0%': { transform: 'translateY(-50%)' }, // Adjust based on the number of cards
          '100%': { transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}