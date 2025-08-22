
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
    // Custom plugin to ensure app-ads.txt is copied to dist root
    {
      name: 'copy-app-ads',
      generateBundle() {
        // This ensures app-ads.txt is copied to dist root during build
        const srcPath = path.resolve(__dirname, 'public/app-ads.txt');
        const destPath = path.resolve(__dirname, 'dist/app-ads.txt');
        
        try {
          if (existsSync(srcPath)) {
            // Ensure dist directory exists
            const distDir = path.dirname(destPath);
            if (!existsSync(distDir)) {
              mkdirSync(distDir, { recursive: true });
            }
            copyFileSync(srcPath, destPath);
            console.log('✓ app-ads.txt copied to dist root');
          }
        } catch (error) {
          console.warn('Warning: Could not copy app-ads.txt:', error);
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ensure static files like app-ads.txt are properly served
  publicDir: 'public',
  build: {
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
}));
