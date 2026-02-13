/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'neuro-safe': '#10B981', // Green
        'neuro-warn': '#F59E0B', // Orange
        'neuro-panic': '#EF4444', // Red
        'neuro-dark': '#111827',
      }
    },
  },
  plugins: [],
}
