import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const structure = {
  'public': {
    'index.html': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Undangan Digital - Buat Undangan Online Profesional</title>
    <meta name="description" content="Buat undangan digital yang elegan dan profesional">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>`,
    'images': {}
  },
  'src': {
    'main.jsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
    'App.jsx': `import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App`,
    'styles': {
      'globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles akan ditambahkan di sini */`
    }
  }
};

function createStructure(basePath, structure) {
  for (const [path, content] of Object.entries(structure)) {
    const fullPath = join(basePath, path);
    
    if (typeof content === 'object') {
      mkdirSync(fullPath, { recursive: true });
      createStructure(fullPath, content);
    } else {
      writeFileSync(fullPath, content);
      console.log(`✅ Created: ${fullPath}`);
    }
  }
}

// Run setup
createStructure(__dirname, structure);
console.log('🎉 Project structure created successfully!');