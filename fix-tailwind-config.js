import { writeFileSync } from 'fs';

const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [
    // Basic plugins tanpa dependencies eksternal
  ],
}`;

console.log('🔄 Memperbaiki tailwind.config.js...');
writeFileSync('tailwind.config.js', tailwindConfig);
console.log('✅ tailwind.config.js berhasil diperbaiki!');