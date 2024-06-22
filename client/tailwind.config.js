/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#FF5072",//used as a dark shade for the border outline
        bgPrimary: "#FFE0E6",//used for the body background
        secondary: "#F9C6DE",//used for bg in input values
        buttonColor: "#D87488"//button color
      }
    },
  },
  plugins: [],
}

