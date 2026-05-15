/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9'
        },
        accent: {
          peach: '#ffd2ae',
          blue: '#9bc3ff',
          mist: '#f6f7fb'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
        glass: '0 18px 35px rgba(15, 23, 42, 0.08)'
      },
      backgroundImage: {
        aura: 'radial-gradient(circle at top left, rgba(255, 210, 174, 0.8), transparent 35%), radial-gradient(circle at top right, rgba(155, 195, 255, 0.5), transparent 30%), linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)'
      }
    }
  },
  plugins: []
};
