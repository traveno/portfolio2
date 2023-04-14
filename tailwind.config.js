const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
  daisyui: {
    themes: ['business']
  },
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Rubik', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}