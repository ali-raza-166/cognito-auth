/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "white",
        secondary: "#242f3b",
        borderColor: "#eeeeee",
        // backgroundLight: "",
        backgroundLight: "#fff",
        backgroundHover: "#223a55",
      },
    },
  },
  plugins: [],
};
