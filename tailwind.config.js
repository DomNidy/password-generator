/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      "bg-grayish-gradient": {
        background: " rgb(38,40,59)",
        background:
          "-moz-linear-gradient(360deg, rgba(38,40,59,1) 0%, rgba(17,15,36,1) 100%)",
        background:
          "-webkit-linear-gradient(360deg, rgba(38,40,59,1) 0%, rgba(17,15,36,1) 100%)",
        background:
          "linear-gradient(360deg, rgba(38,40,59,1) 0%, rgba(17,15,36,1) 100%)",
        filter:
          'progid:DXImageTransform.Microsoft.gradient(startColorstr="#26283b",endColorstr="#110f24",GradientType=1)',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".bg-grayish-gradient": {
          background: " rgb(38,40,59)",
          background:
            "-moz-linear-gradient(360deg, rgba(38,40,59,1) 0%, rgba(17,15,36,1) 100%)",
          background:
            "-webkit-linear-gradient(360deg, rgba(38,40,59,1) 0%, rgba(17,15,36,1) 100%)",
          background:
            "linear-gradient(360deg, rgba(38,40,59,1) 0%, rgba(17,15,36,1) 100%)",
          filter:
            'progid:DXImageTransform.Microsoft.gradient(startColorstr="#26283b",endColorstr="#110f24",GradientType=1)',
        },
      });
    }),
  ],
};
