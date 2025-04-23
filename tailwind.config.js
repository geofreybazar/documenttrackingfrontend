/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regalblue': '#233DFF',
        'lightblue': '#c0c7ff',
        'offwhite':  '#F7F7F7',
        'bluelight': '#1565C0',
        'nudewhite': '#F7EFE5',
        'blackpearl': '#02070E',
        'linkwater': '#C4C5C6',
        'graywhite': '#F0F3F5',
        'Gray23': '#3B62A4',
        'Gray55': '#fff',
        'Gray56': '#E5E7EB',
      },
    },
  },
  plugins: [],
}

