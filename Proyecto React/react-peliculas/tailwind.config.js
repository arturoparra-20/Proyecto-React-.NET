/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a2e', // Fondo oscuro principal
        secondary: '#16213e', // Fondo secundario oscuro
        accent: '#0f3460', // Color de acento
        textLight: '#ffffff', // Texto claro
        textAccent: '#e94560', // Texto de acento
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'], // Nueva fuente
      },
    },
  },
  plugins: [],
};

