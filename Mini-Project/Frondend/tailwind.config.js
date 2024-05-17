/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {

  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
  content: [
    "./index.html",
    "./src/**/*.{jsx,js,ts,tsx}",
    flowbite.content(),
  ],
}