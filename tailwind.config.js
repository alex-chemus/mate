/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        'bg-color-1': 'var(--bg-color-1)',
        'bg-color-2': 'var(--bg-color-2)',
        'bg-color-3': 'var(--bg-color-3)',
        'heading-color-1': 'var(--heading-color-1)',
        'text-color-1': 'var(--text-color-1)',
        'text-color-2': 'var(--text-color-2)',
        'accent': 'var(--accent)',
        'red': 'var(--red)',
        'light-border-1': 'rgb(118 118 118 / .3)',
        'light-border-2': 'rgb(118 118 118 / .2)',
        'dark-border-1': 'rgb(118 118 118 / .4)',
        'dark-border-2': 'rgb(118 118 118 / .3)'
      },
      fontFamily: {
        findcreek: 'Findcreek, sans-serif',
        montserrat: 'Montserrat, sans-serif',
        roboto: 'Roboto, sans-serif',
        'noto-sans': 'Noto Sans, sans-serif'
      },
      boxShadow: {
        'light-element': '0 2px 6px 0 rgba(0 0 0 / .1)',
        'light-block': '0 2px 6px 0 rgba(0 0 0 / .15)',
        'dark-element': '0 2px 12px 0 rgba(0 0 0 / .5)',
        'dark-block': '0 2px 14px 0 rgba(0 0 0 / .8)'
      }
    },
    screens: {
      xl: '1440px',
      lg: '992px',
      md: '768px',
      sm: '480px'
    }
  },
  plugins: [],
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]']
}

