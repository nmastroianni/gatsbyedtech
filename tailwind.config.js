const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        teko: ["'Teko'", ...defaultTheme.fontFamily.sans],
        source: ["'Source Sans Pro'", ...defaultTheme.fontFamily.sans],
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: "rgba(0,0,0,0.7)",
            fontFamily: `${theme("fontFamily.source")}`,
            fontWeight: "400",
            h1: {
              fontFamily: `${theme("fontFamily.teko")}`,
              fontWeight: "300",
              color: "rgba(0,0,0,0.85)",
            },
            h2: {
              fontFamily: `${theme("fontFamily.teko")}`,
              fontWeight: "300",
              color: "rgba(0,0,0,0.85)",
            },
            h3: {
              fontFamily: `${theme("fontFamily.teko")}`,
              fontWeight: "300",
              color: "rgba(0,0,0,0.85)",
            },
            h4: {
              fontFamily: `${theme("fontFamily.teko")}`,
              fontWeight: "300",
              color: "rgba(0,0,0,0.85)",
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
}
