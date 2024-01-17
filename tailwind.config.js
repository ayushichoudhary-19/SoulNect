/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        'soft-purple': '#DCC7DA',
        'soft-blue': '#B4DBD8',
        'soft-pink': '#FBC9C8',
        'soft-green': '#ADF7B6',
        'soft-orange': '#F8CC9D',
        'vibrant-purple': '#DFB2F4',
        'vibrant-yellow': '#F5E960',
        'vibrant-green': 'rgb(85,214,194)',
        'vibrant-peach': '#F49097',
        'vibrant-cyan': '#9CF6F6',
        'ligt-green': '#A5FFD6',
        'light-blue': '#ABC4FF',
    },},
  },
  plugins: [],
}

