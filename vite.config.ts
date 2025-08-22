
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync, existsSync, mkdirSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Enhanced plugin to ensure static files are copied to dist root
    {
      name: 'copy-static-files-to-root',
      writeBundle() {
        const staticFiles = [
          'app-ads.txt',
          'robots.txt',
          '.htaccess',
          '_redirects',
          'favicon.ico'
        ];
        
        console.log('🔧 Starting static file copy process...');
        
        staticFiles.forEach(fileName => {
          const srcPath = path.resolve(__dirname, `public/${fileName}`);
          const destPath = path.resolve(__dirname, `dist/${fileName}`);
          
          try {
            if (existsSync(srcPath)) {
              // Ensure dist directory exists
              const distDir = path.dirname(destPath);
              if (!existsSync(distDir)) {
                mkdirSync(distDir, { recursive: true });
              }
              copyFileSync(srcPath, destPath);
              console.log(`✅ ${fileName} copied to dist root successfully`);
            } else {
              console.warn(`⚠️  ${fileName} not found in public directory`);
            }
          } catch (error) {
            console.error(`❌ Error copying ${fileName}:`, error);
          }
        });
        
        console.log('🎉 Static file copy process completed');
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Enhanced public directory handling
  publicDir: 'public',
  build: {
    copyPublicDir: true,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    },
    // Ensure static files are not processed by build pipeline
    assetsInlineLimit: 0
  }
}));
