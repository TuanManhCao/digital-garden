/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-primary-alt": "#171818"
      }
    },
  },
  plugins: [],
  darkMode: "class"
};
