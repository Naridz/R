/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Itim']
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "cupcake","dracula"],
  }
}
