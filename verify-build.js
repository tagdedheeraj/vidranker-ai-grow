
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying build output...');

const distDir = path.join(__dirname, 'dist');
const criticalFiles = [
  'app-ads.txt',
  'robots.txt', 
  'favicon.ico',
  '.well-known/app-ads.txt'
];

let allFilesFound = true;

criticalFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} found in dist/`);
    
    if (file.includes('app-ads.txt')) {
      const content = fs.readFileSync(filePath, 'utf8');
      console.log(`📄 ${file} content: ${content.trim()}`);
    }
  } else {
    console.error(`❌ ${file} NOT FOUND in dist/`);
    allFilesFound = false;
  }
});

if (allFilesFound) {
  console.log('🎉 All critical files verified in build output!');
} else {
  console.error('💥 Some critical files are missing from build output!');
  process.exit(1);
}
