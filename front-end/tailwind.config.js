/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
      extend: {
        fontFamily: {
          'nunito': 'Nunito, sans-serif',
          'kantit': 'Kanit, sans-serif',
          'dancing': 'Dancing Script, cursive'
        },
        colors: {
          'purple-1': '#D0A2F7',
          'purple-2': '#DCBFFF',
          'purple-3': '#E5D4FF',
          'purple-4': '#F1EAFF',
          'gray-opacity': '#646464',
          'red-bg':'#C92127',
          'background-template' : '#EDEBE4',
          'background-pink': '#F3DFE0'
        },
      },
    },
    plugins: [],
  }