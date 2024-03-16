/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   primary: "#004AAD",
      //   bgColor: "#F0F5FC",
      // },
    },
  },
  plugins: [require("daisyui")],
};
