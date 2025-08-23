
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying build output for static files...');

const distDir = path.join(__dirname, 'dist');
const requiredFiles = [
  'app-ads.txt',
  'robots.txt',
  'favicon.ico'
];

const requiredDirs = [
  '.well-known'
];

let allFilesExist = true;

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('❌ dist directory not found!');
  process.exit(1);
}

// Check required files
requiredFiles.forEach(fileName => {
  const filePath = path.join(distDir, fileName);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`✅ ${fileName} exists (${stats.size} bytes)`);
    
    if (fileName === 'app-ads.txt') {
      console.log(`📄 app-ads.txt content:`);
      console.log(content);
      if (content.includes('google.com, pub-2211398170597117')) {
        console.log('✅ AdMob publisher ID found in app-ads.txt');
      } else {
        console.error('❌ AdMob publisher ID missing from app-ads.txt');
        allFilesExist = false;
      }
    }
  } else {
    console.error(`❌ ${fileName} missing from dist folder!`);
    allFilesExist = false;
  }
});

// Check required directories
requiredDirs.forEach(dirName => {
  const dirPath = path.join(distDir, dirName);
  if (fs.existsSync(dirPath)) {
    console.log(`✅ ${dirName}/ directory exists`);
    
    // Check for app-ads.txt in .well-known
    if (dirName === '.well-known') {
      const wellKnownFile = path.join(dirPath, 'app-ads.txt');
      if (fs.existsSync(wellKnownFile)) {
        console.log('✅ .well-known/app-ads.txt exists');
      } else {
        console.error('❌ .well-known/app-ads.txt missing!');
        allFilesExist = false;
      }
    }
  } else {
    console.error(`❌ ${dirName}/ directory missing from dist folder!`);
    allFilesExist = false;
  }
});

// List all files in dist for debugging
console.log('\n📁 All files in dist directory:');
const listFiles = (dir, prefix = '') => {
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        console.log(`${prefix}📁 ${file}/`);
        listFiles(fullPath, prefix + '  ');
      } else {
        console.log(`${prefix}📄 ${file} (${stats.size} bytes)`);
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
};

listFiles(distDir);

if (allFilesExist) {
  console.log('\n✅ All static files verified successfully!');
  console.log('🚀 Ready for deployment to vidranker.space');
  process.exit(0);
} else {
  console.log('\n❌ Some files are missing. Build verification failed!');
  process.exit(1);
}
