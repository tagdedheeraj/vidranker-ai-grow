
# Complete Android Setup Script for VidRanker with AdMob
# Run this script step by step after exporting to GitHub

Write-Host "=== VidRanker Complete Android Setup with AdMob ===" -ForegroundColor Green

Write-Host "`n📋 Prerequisites Check:" -ForegroundColor Yellow
Write-Host "✓ Android Studio installed" -ForegroundColor White
Write-Host "✓ Java 17 installed" -ForegroundColor White
Write-Host "✓ Android SDK configured" -ForegroundColor White
Write-Host "✓ Project exported to GitHub and cloned locally" -ForegroundColor White

Write-Host "`n🚀 Step 1: Install Dependencies" -ForegroundColor Yellow
Write-Host "npm install" -ForegroundColor Cyan

Write-Host "`n🚀 Step 2: Add Android Platform" -ForegroundColor Yellow
Write-Host "npx cap add android" -ForegroundColor Cyan

Write-Host "`n🚀 Step 3: Build Web Project" -ForegroundColor Yellow
Write-Host "npm run build" -ForegroundColor Cyan

Write-Host "`n🚀 Step 4: Sync to Android" -ForegroundColor Yellow
Write-Host "npx cap sync android" -ForegroundColor Cyan

Write-Host "`n🔧 Step 5: CRITICAL - Manual Configuration" -ForegroundColor Red
Write-Host "After running the above commands, you MUST:" -ForegroundColor White
Write-Host "`n1. Edit android/app/src/main/AndroidManifest.xml" -ForegroundColor Cyan
Write-Host "   Add this inside <application> tag:" -ForegroundColor White
Write-Host '   <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="ca-app-pub-2211398170597117~9683407494"/>' -ForegroundColor Yellow

Write-Host "`n2. Edit android/app/build.gradle" -ForegroundColor Cyan
Write-Host "   Add this in dependencies section:" -ForegroundColor White
Write-Host "   implementation 'com.google.android.gms:play-services-ads:22.6.0'" -ForegroundColor Yellow

Write-Host "`n🚀 Step 6: Final Build Commands" -ForegroundColor Yellow
Write-Host "npx cap update android" -ForegroundColor Cyan
Write-Host "npx cap copy android" -ForegroundColor Cyan

Write-Host "`n🎯 Step 7: Open in Android Studio" -ForegroundColor Yellow
Write-Host "npx cap open android" -ForegroundColor Cyan

Write-Host "`n📱 Step 8: In Android Studio:" -ForegroundColor Yellow
Write-Host "1. Click 'Sync Project with Gradle Files'" -ForegroundColor White
Write-Host "2. Build -> Clean Project" -ForegroundColor White
Write-Host "3. Build -> Rebuild Project" -ForegroundColor White
Write-Host "4. Run the app on device/emulator" -ForegroundColor White

Write-Host "`n🔍 Step 9: Verify AdMob Integration:" -ForegroundColor Yellow
Write-Host "1. Check Android logs for AdMob initialization messages" -ForegroundColor White
Write-Host "2. Navigate to Settings page to see AdMob status" -ForegroundColor White
Write-Host "3. Test banner and interstitial ads" -ForegroundColor White

Write-Host "`n⚠️ Common Issues & Solutions:" -ForegroundColor Red
Write-Host "• App crashes on startup: Check AndroidManifest.xml has AdMob App ID" -ForegroundColor White
Write-Host "• Ads don't show: Verify internet permission and wait for ad loading" -ForegroundColor White
Write-Host "• Build errors: Ensure Java 17 and latest Android SDK" -ForegroundColor White

Write-Host "`n🎉 Setup Complete!" -ForegroundColor Green
Write-Host "Your app should now show AdMob ads on Android devices!" -ForegroundColor White
