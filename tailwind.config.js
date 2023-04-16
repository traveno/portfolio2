const defaultTheme = require('tailwindcss/defaultTheme');
const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [require('@tailwindcss/typography'), require("daisyui"), addDynamicIconSelectors(), require('tailwindcss-bg-patterns')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          '.bg-absolute': {
            'background-color': '#FFFFFF'
          }  
        },
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          '.bg-absolute': {
            'background-color': '#000000'
          }
        }
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Rubik', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'code-pattern': "url('/code-bg.png')"
      }
    }
  }
}