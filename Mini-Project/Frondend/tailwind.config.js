/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {

  theme: {
    extend: {},
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