import { writeFileSync } from 'fs';

const viteConfigContent = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi Vite yang sederhana dan bekerja
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  }
})`;

console.log('🔄 Memperbaiki vite.config.js...');
writeFileSync('vite.config.js', viteConfigContent);
console.log('✅ vite.config.js berhasil diperbaiki!');
console.log('🚀 Sekarang jalankan: npm run dev');