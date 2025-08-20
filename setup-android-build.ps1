
# PowerShell script to set up Android build with AdMob
# Run this script step by step in PowerShell

Write-Host "=== VidRanker Android Build Setup ===" -ForegroundColor Green

# Step 1: Export project from GitHub and navigate to it
Write-Host "Step 1: Export your project to GitHub first, then clone it locally" -ForegroundColor Yellow
Write-Host "Run these commands after cloning your GitHub repository:" -ForegroundColor Yellow
Write-Host "cd your-project-directory" -ForegroundColor Cyan

# Step 2: Install dependencies
Write-Host "`nStep 2: Installing npm dependencies..." -ForegroundColor Yellow
Write-Host "npm install" -ForegroundColor Cyan

# Step 3: Add Android platform
Write-Host "`nStep 3: Adding Android platform..." -ForegroundColor Yellow
Write-Host "npx cap add android" -ForegroundColor Cyan

# Step 4: Build the web project
Write-Host "`nStep 4: Building web project..." -ForegroundColor Yellow
Write-Host "npm run build" -ForegroundColor Cyan

# Step 5: Sync with Android
Write-Host "`nStep 5: Syncing with Android platform..." -ForegroundColor Yellow
Write-Host "npx cap sync android" -ForegroundColor Cyan

# Step 6: Update Android dependencies
Write-Host "`nStep 6: Updating Android dependencies..." -ForegroundColor Yellow
Write-Host "npx cap update android" -ForegroundColor Cyan

# Step 7: Manual configuration steps
Write-Host "`nStep 7: Manual Configuration Required:" -ForegroundColor Red
Write-Host "1. Open android/app/src/main/AndroidManifest.xml" -ForegroundColor White
Write-Host "2. Add your AdMob App ID (replace 1234567890 with your actual App ID):" -ForegroundColor White
Write-Host "   <meta-data android:name=`"com.google.android.gms.ads.APPLICATION_ID`" android:value=`"ca-app-pub-2211398170597117~YOUR_APP_ID`"/>" -ForegroundColor Cyan
Write-Host "3. Ensure internet permissions are present" -ForegroundColor White

# Step 8: Update AdMob service with real Ad Unit IDs
Write-Host "`nStep 8: Update AdMob Service:" -ForegroundColor Red
Write-Host "Replace test Ad Unit IDs in src/services/admob.ts with your actual Ad Unit IDs:" -ForegroundColor White
Write-Host "- Banner: ca-app-pub-2211398170597117/YOUR_BANNER_AD_UNIT_ID" -ForegroundColor Cyan
Write-Host "- Interstitial: ca-app-pub-2211398170597117/YOUR_INTERSTITIAL_AD_UNIT_ID" -ForegroundColor Cyan

# Step 9: Open in Android Studio or run
Write-Host "`nStep 9: Build and Run:" -ForegroundColor Yellow
Write-Host "Option A - Open in Android Studio:" -ForegroundColor White
Write-Host "npx cap open android" -ForegroundColor Cyan
Write-Host "`nOption B - Run directly:" -ForegroundColor White
Write-Host "npx cap run android" -ForegroundColor Cyan

Write-Host "`n=== Setup Complete! ===" -ForegroundColor Green
Write-Host "Make sure you have:" -ForegroundColor Yellow
Write-Host "- Android Studio installed" -ForegroundColor White
Write-Host "- Android SDK configured" -ForegroundColor White
Write-Host "- Java 17 installed" -ForegroundColor White
Write-Host "- Your actual AdMob App ID and Ad Unit IDs" -ForegroundColor White
