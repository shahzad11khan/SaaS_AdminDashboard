/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-blue-700',
    'bg-blue-300',
    'bg-orange-500',
    'bg-orange-300',
    'bg-green-300',

  ],
  theme: {
    extend: {},
  },
  plugins: [],
}