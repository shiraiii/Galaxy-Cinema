const { Margin } = require('@mui/icons-material')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    screens:{
      'screen360': '360px',
      'sm':'640px',
      'md':'768px',
      'lg':'1024px',
      'xl':'1280px',
      '4xl':'52rem',
      '6xl':'72rem',
      'screen1200':'1200px',
      'screen1390': '1390px',
      'screen1440': '1440px',
    },
    extend: {},
  },
  plugins: [],
  important: true,
}

