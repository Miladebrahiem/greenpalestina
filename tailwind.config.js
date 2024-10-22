/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#232D3D',
        secondary: '#F4E956',
        green: {
          DEFAULT: '#34D399',
          dark: '#059669',
        },
      },
      fontFamily: {
        merriweather: ['Merriweather', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      fontSize: {
        'h1': '30px',
        'h2': '20px',
        'body': '18px',
      },
      animation: {
        wave: 'wave 3s ease-in-out infinite',
        build: 'build 2s ease-out forwards',
        sun: 'sun 4s ease-in-out infinite',
        cloud: 'cloud 20s linear infinite',
      },
    },
  },
  plugins: [],
};