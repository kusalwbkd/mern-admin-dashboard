/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'my-columns': 'auto 1fr',
       
       
      },

 
    },
  },
  
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
      themes: ['winter', 'dracula'],
    },
   
};