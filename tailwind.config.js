/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f7f4',
          100: '#e1ede6',
          200: '#c5dcd0',
          300: '#9ec2b1',
          400: '#72a28d',
          500: '#508571',
          600: '#3c6a58',
          700: '#325447',
          800: '#2b443b',
          900: '#1b382b', // Primary Earthy Forest Green
          950: '#0f2119',
        },
        cream: {
          50: '#fdfbf7', // Primary Light Warm Cream Background
          100: '#f9f6ef',
          200: '#f2ece0',
          300: '#e7dccb',
          400: '#d9c8b0',
          500: '#c5ae92',
        },
        charcoal: {
          800: '#27272a',
          900: '#18181b', // Primary Charcoal Black Text/Headers
          950: '#09090b',
        },
        accent: {
          gold: '#d4af37',
          amber: '#c87d53',
          sand: '#e8dfd1',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(27, 56, 43, 0.08), 0 4px 12px -4px rgba(0, 0, 0, 0.04)',
        'luxury-hover': '0 20px 40px -15px rgba(27, 56, 43, 0.15), 0 8px 20px -6px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
