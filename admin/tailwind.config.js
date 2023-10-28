/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'jakartaPlus': '"Plus Jakarta Sans"'
      },
      colors: {
        primaryGreen: "#14b8a6",
        secondaryLightBlue: "#f5f5f4",
        lightSlate: "#f8fafc",
        primaryDarkGray: "#2a3547",
        primaryLightGray: '#f1f7f8',
        secondaryLightGray: "#e5eaef",
        greenish: "#e8f7ff",
        // danger: "#f43f5e",
        danger: "#fa896b",
        bulk: "#737373"
      },
      objectPosition: {
        top: {
          '35': '35%'
        }
      }
    },
  },
  plugins: [],
  darkMode: "class"
};