/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "text-white",
    "text-black",
    "hover:bg-gray-100",
    "hover:bg-gray-200",
    "hover:text-blue-600",
    "hover:text-blue-800",
    "border",
    "border-gray-300",
    "rounded",
    "p-4",
    "text-center",
    // Add any others you use dynamically
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
