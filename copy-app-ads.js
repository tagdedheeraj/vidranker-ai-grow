
const fs = require('fs');
const path = require('path');

// Backup script to manually copy app-ads.txt to dist folder
const srcPath = path.join(__dirname, 'public', 'app-ads.txt');
const destPath = path.join(__dirname, 'dist', 'app-ads.txt');

try {
  // Check if source file exists
  if (fs.existsSync(srcPath)) {
    // Ensure dist directory exists
    const distDir = path.dirname(destPath);
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log('✓ app-ads.txt successfully copied to dist/app-ads.txt');
  } else {
    console.error('❌ Source file not found:', srcPath);
  }
} catch (error) {
  console.error('❌ Error copying app-ads.txt:', error);
}
