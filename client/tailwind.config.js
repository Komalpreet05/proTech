/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4caf4f",
        secondary: "#F5F7FA",
        light: "#F8F9FA",
        dark: "#343A40",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"], // Set Inter as the primary sans-serif font
      },
    },
  },
  plugins: [],
};
