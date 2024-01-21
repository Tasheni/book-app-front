/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {},
  },
  daisyui:{
    themes: ["light", "dark", "cupcake", "valentine", "cyberpunk"],
      },
  plugins: [require("daisyui")],
}

