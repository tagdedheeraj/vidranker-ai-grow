
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
    // Custom plugin to ensure static files are copied to dist root
    {
      name: 'copy-static-files',
      generateBundle() {
        const staticFiles = [
          'app-ads.txt',
          'robots.txt',
          '.htaccess',
          '_redirects'
        ];
        
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
              console.log(`✓ ${fileName} copied to dist root`);
            }
          } catch (error) {
            console.warn(`Warning: Could not copy ${fileName}:`, error);
          }
        });
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ensure static files are properly served and copied
  publicDir: 'public',
  build: {
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    },
    // Ensure static files are not processed by build
    assetsInlineLimit: 0
  }
}));
