/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './source/**/*.{tsx,ts}'],
  safelist: [
    'fill-primary',
    'fill-warning',
    'fill-error',
    'fill-success',
    'fill-secondary',
    'fill-dark-200',
  ],
  theme: {
    extend: {
      fontFamily: {
        tomorrow: ['Tomorrow', 'sans-serif']
      },
      backgroundImage: {
        'texture': "url('/texture.png')",
      },
      colors: {
        
      },      
      borderRadius: {
        base: '1.2vh',
      },
      textShadow: {
        xs: `-0 -1px 0 #0000001b, 0 -1px 0 #0000001b, -0 1px 0 #0000001b, 0 1px 0 #0000001b, -1px -0 0 #0000001b, 1px -0 0 #0000001b, -1px 0 0 #0000001b, 1px 0 0 #0000001b, -1px -1px 0 #0000001b, 1px -1px 0 #0000001b, -1px 1px 0 #0000001b, 1px 1px 0 #0000001b, -1px -1px 0 #0000001b, 1px -1px 0 #0000001b, -1px 1px 0 #0000001b, 1px 1px 0 #0000001b`,
        sm: `-0 -1px 0 #0000003a, 0 -1px 0 #0000003a, -0 1px 0 #0000003a, 0 1px 0 #0000003a, -1px -0 0 #0000003a, 1px -0 0 #0000003a, -1px 0 0 #0000003a, 1px 0 0 #0000003a, -1px -1px 0 #0000003a, 1px -1px 0 #0000003a, -1px 1px 0 #0000003a, 1px 1px 0 #0000003a, -1px -1px 0 #0000003a, 1px -1px 0 #0000003a, -1px 1px 0 #0000003a, 1px 1px 0 #0000003a`,
        lg: `0 1px 0 rgba(0, 0, 0, 0.6), 1px 0 0 rgba(0, 0, 0, 0.6), -1px 0 0 rgba(0, 0, 0, 0.6), 0 -1px 0 rgba(0, 0, 0, 0.6)`,
        md: `-0 -1px 0 #0000006e, 0 -1px 0 #0000006e, -0 1px 0 #0000006e, 0 1px 0 #0000006e, -1px -0 0 #0000006e, 1px -0 0 #0000006e, -1px 0 0 #0000006e, 1px 0 0 #0000006e, -1px -1px 0 #0000006e, 1px -1px 0 #0000006e, -1px 1px 0 #0000006e, 1px 1px 0 #0000006e, -1px -1px 0 #0000006e, 1px -1px 0 #0000006e, -1px 1px 0 #0000006e, 1px 1px 0 #0000006e`,
        strong: '0 var(--tw-text-shadow-strong-y, 0.4vh) 0 rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    function ({ addUtilities }) {
      const values = Array.from({ length: 15 }, (_, i) => i);
      const newUtilities = {};

      values.forEach(value => {
        newUtilities[`.text-shadow-strong-${value}`] = {
          '--tw-text-shadow-strong-y': `0.${value}vh`,
          'text-shadow': '0 var(--tw-text-shadow-strong-y) 0 rgba(0, 0, 0, 0.8)'
        };
      });

      addUtilities(newUtilities);
    }
  ],
};