/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          base: "#133234",
          dark: "#0d2527",
          deep: "#091c1d",
          accent: "#1e4d50",
          glow: "#235a5e"
        },
        orange: {
          brand: "#FF8A1F",
          light: "#FFAA4D",
          deep: "#E5720A",
          glow: "#FFB066"
        },
        cream: {
          DEFAULT: "#FFF4E0",
          muted: "#E0D7C5",
          dim: "#A39F93"
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
