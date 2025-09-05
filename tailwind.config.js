/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210, 36%, 96%)',
        accent: 'hsl(160, 60%, 45%)',
        primary: 'hsl(210, 90%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
        'text-primary': 'hsl(210, 29%, 23%)',
        'text-secondary': 'hsl(210, 29%, 43%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 29%, 23%, 0.1)',
        'modal': '0 10px 30px hsla(210, 29%, 23%, 0.15)',
      },
    },
  },
  plugins: [],
}