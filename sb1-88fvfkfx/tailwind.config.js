/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          500: '#2a4365',
          600: '#1a365d',
          700: '#153e75',
        },
      },
    },
  },
  plugins: [],
};