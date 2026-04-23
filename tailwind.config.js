/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{njk,md,html}",
    "./src/_includes/**/*.{njk,html}"
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          primary: '#7C3AED',
          light: '#A78BFA',
          dark: '#5B21B6',
        },
        black: '#0A0A0A',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'nav': '0.5px',
        'label': '2px',
        'tight': '-0.5px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}
