import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Tambahkan ini untuk support JSX di file .js
      include: ['**/*.jsx', '**/*.js'] // Include .js files juga
    })
  ],
  
  // Konfigurasi untuk menangani JSX di file .js
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  
  // Alias untuk import yang lebih clean
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@contexts': resolve(__dirname, 'src/contexts'),
      '@styles': resolve(__dirname, 'src/styles'),
    }
  },
  
  // Server configuration
  server: {
    port: 3000,
    open: true,
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
})