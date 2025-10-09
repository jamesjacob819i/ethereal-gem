/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf7ff',
          100: '#f3edff',
          200: '#e9ddff',
          300: '#d7c2ff',
          400: '#be99ff',
          500: '#a36cff',
          600: '#8a3fff',
          700: '#7c25ff',
          800: '#6920d1',
          900: '#571cac',
          950: '#360b75',
        },
        gold: {
          50: '#fffef7',
          100: '#fffbeb',
          200: '#fef3c7',
          300: '#fde68a',
          400: '#fcd34d',
          500: '#fbbf24',
          600: '#f59e0b',
          700: '#d97706',
          800: '#b45309',
          900: '#92400e',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}