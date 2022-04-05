const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  // These paths are just examples, customize them to match your project structure
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            color: "#334155",
            fontWeight: "400",
            strong: {
              color: "#064e3b",
            },
            h1: {
              fontWeight: "600",
              color: "rgba(0,0,0,0.85)",
            },
            h2: {
              fontWeight: "600",
              fontSize: "2.3rem",
              color: "#065f46",
            },
            h3: {
              fontWeight: "600",
              fontSize: "2rem",
              color: "#065f46",
            },
            h4: {
              fontWeight: "600",
              fontSize: "1.8rem",
              color: "#065f46",
            },
            hr: {
              border: `3px solid #064E3B`,
              borderRadius: `2px`,
            },
          },
        },
        dark: {
          css: {
            color: "#d1d5db",
            fontWeight: "400",
            h2: {
              fontWeight: "600",
              fontSize: "2.3rem",
              color: "rgba(167, 243, 208, 1)",
            },
            h3: {
              fontWeight: "600",
              fontSize: "2rem",
              color: "rgba(167, 243, 208, 1)",
            },
            h4: {
              fontWeight: "600",
              fontSize: "1.8rem",
              color: "rgba(167, 243, 208, 1)",
            },
            a: {
              color: "rgba(167, 243, 208, 1)",
            },
            hr: {
              border: `3px solid rgba(52,211,153, 1)`,
              borderRadius: `2px`,
            },
            strong: {
              color: "#34D399",
            },
          },
        },
        emerald: {
          css: {
            a: {
              color: "#065F46",
            },
            h2: {
              color: "#065F46",
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
}
