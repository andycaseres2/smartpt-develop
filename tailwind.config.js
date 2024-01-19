/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-red-500": "#F70000",
        "primary-red-600": "#D93535",
        "primary-pink-50": "#FFCDCD",
        "primary-pink-500": "#FF6B7C",
        "primary-pink-600": "#D94457",
        "primary-yellow-50": "#FFF4CD",
        "primary-yellow-500": "#FBD34D",
        "primary-yellow-600": "#FAA500",
        "primary-orange-500": "#F76800",
        "primary-purple-50": "#DDD7FF",
        "primary-purple-500": "#6B257D",
        "primary-purple-600": "#6528E5",
        "primary-blue-50": "#D7E4FF",
        "primary-blue-500": "#477BFF",
        "primary-blue-600": "#2961CE",
        "primary-lightblue-50": "#CDFFF6",
        "primary-lightblue-500": "#9FF3E0",
        "primary-lightblue-600": "#75EED1",
        "primary-green-500": "#60D935",
        "primary-green-600": "#76B158",
        "primary-gray-50": "##AEAEAE",
        "primary-gray-300": "#BDBDBD",
        "primary-gray-500": "#636363",
      },
      boxShadow: {
        "3xl": "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
