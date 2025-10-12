import { renameSync, readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, extname } from 'path';

function fixJSXExtensions() {
  const srcPath = join(process.cwd(), 'src');
  
  // Daftar file yang perlu diubah dari .js ke .jsx
  const filesToRename = [
    // Context files
    'contexts/AuthContext.js',
    'contexts/EditorContext.js',
    
    // Component files
    'components/common/Header.js',
    'components/common/Footer.js',
    'components/auth/Login.js',
    'components/auth/Register.js',
    'components/auth/AuthForm.js',
    'components/dashboard/Dashboard.js',
    'components/editor/InvitationEditor.js',
    'components/editor/TemplatePicker.js',
    'components/editor/CustomizationPanel.js',
    'components/editor/Preview.js',
    'components/invitation/InvitationPage.js',
    'components/invitation/RSVPForm.js',
    'components/invitation/GuestBook.js',
    'components/invitation/LocationMap.js',
    
    // Page files
    'pages/Home.js',
    'pages/Pricing.js',
    'pages/Templates.js',
    'pages/Features.js',
    
    // Main files
    'App.js',
    'main.js'
  ];

  console.log('🔄 Mengubah ekstensi file .js ke .jsx...');

  filesToRename.forEach(file => {
    const oldPath = join(srcPath, file);
    const newPath = join(srcPath, file.replace('.js', '.jsx'));
    
    if (existsSync(oldPath)) {
      renameSync(oldPath, newPath);
      console.log(`✅ ${file} → ${file.replace('.js', '.jsx')}`);
    } else {
      console.log(`⚠️  File tidak ditemukan: ${oldPath}`);
    }
  });

  console.log('✅ Semua file berhasil diubah!');
}

function updateViteConfig() {
  const viteConfigPath = join(process.cwd(), 'vite.config.js');
  
  if (existsSync(viteConfigPath)) {
    let content = readFileSync(viteConfigPath, 'utf8');
    
    // Update vite config untuk support JSX
    const newConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react({
      include: ['**/*.jsx', '**/*.js']
    })
  ],
  
  esbuild: {
    loader: 'jsx',
    include: /src\\\\/.*\\\\.jsx?$/,
    exclude: [],
  },
  
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
    }
  },
  
  server: {
    port: 3000,
    open: true,
  }
})`;

    writeFileSync(viteConfigPath, newConfig);
    console.log('✅ Vite config updated!');
  }
}

// Jalankan fix
fixJSXExtensions();
updateViteConfig();
console.log('🎉 JSX issue fixed! Sekarang jalankan: npm run dev');