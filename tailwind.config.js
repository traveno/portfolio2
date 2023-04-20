const defaultTheme = require('tailwindcss/defaultTheme');
const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [require('@tailwindcss/typography'), require("daisyui"), addDynamicIconSelectors(), require('tailwindcss-bg-patterns')],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],

        },
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],

        }
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Rubik', ...defaultTheme.fontFamily.sans],
        'mono': ['SourceCodePro', ...defaultTheme.fontFamily.mono]
      },
      backgroundImage: {
        'code-pattern': "url('/code-bg.png')"
      }
    }
  }
}