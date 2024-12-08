/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'insider-dark-blue': '#051235',
        'insider-green': '#ACFDF5',
        'insider-gradient': 'linear-gradient(90deg, #ACFDF5 0%, #4FDCCE 100%)',
      }
    },
  },
  plugins: [],
}

