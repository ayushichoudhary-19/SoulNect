/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      colors: {
        'soft-purple': '#DCC7DA',
        'soft-blue': '#B4DBD8',
        'soft-pink': '#FBC9C8',
        'soft-green': '#ADF7B6',
        'soft-orange': '#F8CC9D',
        'vibrant-yellow': '#F5E960',
        'vibrant-green': 'rgb(85,214,194)',
        'soft-vibrant-green': "#f3fdfa",
        'vibrant-peach': '#F49097',
        'vibrant-cyan': '#9CF6F6',
        'ligt-green': '#A5FFD6',
        'light-blue': '#ABC4FF',
        'vibrant-purple': {
          50:  '#faf4fc',
          100: '#f5e8fa',
          200: '#eed3f6',
          300: '#e4b8f1',
          400: '#dc9eec',
          500: '#DFB2F4',
          600: '#c38fd8',
          700: '#a46fb9',
          800: '#885c99',
          900: '#6c4879',
        },
      },
    },
  },
  plugins: [],
}
