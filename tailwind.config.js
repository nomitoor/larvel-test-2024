/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './storage/framework/views/*.php',
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.tsx',
    './resources/**/*.jsx',
    './resources/**/*.vue',
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './resources/**/*.blade.php',
    './node_modules/tw-elements/dist/js/**/*.js',
    './resources/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#5b6ef4',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

