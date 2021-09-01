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
            hr: {
              border: `3px solid #064E3B`,
              borderRadius: `2px`,
            },
          },
        },
        dark: {
          css: {
            color: "rgba(255,255,255, 0.95)",
            fontFamily: `${theme("fontFamily.source")}`,
            fontWeight: "400",
            h2: {
              fontFamily: `${theme("fontFamily.teko")}`,
              fontWeight: "300",
              color: "rgba(167, 243, 208, 1)",
            },
            h3: {
              fontFamily: `${theme("fontFamily.teko")}`,
              fontWeight: "300",
              color: "rgba(167, 243, 208, 1)",
            },
            h4: {
              fontFamily: `${theme("fontFamily.teko")}`,
              fontWeight: "300",
              color: "rgba(167, 243, 208, 1)",
            },
            a: {
              color: "rgba(167, 243, 208, 1)",
            },
            hr: {
              border: `3px solid rgba(52,211,153, 1)`,
              borderRadius: `2px`,
            },
          },
        },
        green: {
          css: {
            a: {
              color: "#065F46",
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
      transitionProperty: ["focus"],
      contrast: ["hover"],
      saturate: ["hover"],
      filter: ["hover"],
      grayscale: ["hover"],
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
}
