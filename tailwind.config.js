/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      display: ['group-hover', 'hover'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.group-hover-show': {
          display: 'none',
          '@media (hover: hover)': {
            '.group:hover &': {
              display: 'block',
            },
          },
        },
        '.hover-show': {
          display: 'none',
          '@media (hover: hover)': {
            '&:hover': {
              display: 'block',
            },
          },
        },
      });
    },
  ],
};


