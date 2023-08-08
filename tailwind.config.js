/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#263D52',
        header: '#1E3142',
        graph: '#223546',
        control: '#294055',
        exit: '#263D52'
      }
    },
  },
  plugins: [],
}

