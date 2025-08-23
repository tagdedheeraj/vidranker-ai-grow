# Complete AdMob Integration Guide for VidRanker

## 🎯 Your AdMob Configuration
- **App ID**: `ca-app-pub-2211398170597117~9683407494`
- **Banner ID**: `ca-app-pub-2211398170597117/2547153500`
- **Interstitial ID**: `ca-app-pub-2211398170597117/8371175883`

## 🚀 Quick Setup (5 Steps)

### Step 1: Export & Clone
1. Export your project to GitHub
2. Clone locally: `git clone [your-repo-url]`
3. `cd [project-directory]`

### Step 2: Install & Add Android
```bash
npm install
npx cap add android
npm run build
npx cap sync android
```

### Step 3: Configure AndroidManifest.xml
Edit `android/app/src/main/AndroidManifest.xml`:
```xml
<application>
    <!-- Add this line inside <application> tag -->
    <meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="ca-app-pub-2211398170597117~9683407494"/>
</application>
```

### Step 4: Configure build.gradle
Edit `android/app/build.gradle`, add to dependencies:
```gradle
dependencies {
    implementation 'com.google.android.gms:play-services-ads:22.6.0'
    // ... other dependencies
}
```

### Step 5: Build & Run
```bash
npx cap update android
npx cap open android
```

In Android Studio:
1. Sync Project with Gradle Files
2. Build -> Clean Project
3. Build -> Rebuild Project
4. Run on device/emulator

## 🔍 Testing AdMob Integration

### In Your App:
1. Go to Settings page
2. Check AdMob Status component
3. Test "Show Banner" and "Show Interstitial" buttons
4. Verify ads appear on mobile device

### Console Logs to Look For:
```
✅ AdMob: Production initialization successful!
✅ AdMob: Banner ad displayed successfully!
✅ AdMob: Interstitial ad displayed successfully!
```

## 🚨 Common Issues & Fixes

### App Crashes on Startup
**Cause**: Missing AdMob App ID in AndroidManifest.xml
**Fix**: Add the meta-data tag exactly as shown in Step 3

### Ads Don't Show
**Possible Causes**:
- Not testing on actual device (emulator may not show ads)
- Network connectivity issues
- AdMob account not approved yet
- Ad inventory temporarily unavailable

**Fix**: 
- Test on real Android device
- Check internet connection
- Wait for AdMob account approval
- Check AdMob console for policy issues

### Build Errors
**Cause**: Java version or Android SDK issues
**Fix**: 
- Ensure Java 17 is installed
- Update Android SDK to latest version
- Clean and rebuild project

## 📱 AdMob Account Setup

### Domain Verification:
1. Ensure `https://vidranker.space/app-ads.txt` contains:
   ```
   google.com, pub-2211398170597117, DIRECT, f08c47fec0942fa0
   ```
2. In Google Play Console, set developer website to `https://vidranker.space`
3. Wait 24-48 hours for verification

### App-ads.txt Status:
- File is already configured in your React app
- Routes `/app-ads.txt` and `/.well-known/app-ads.txt` serve the content
- Domain verification should complete automatically

## 🎉 Success Indicators

### ✅ Setup Complete When:
- App starts without crashes
- AdMob Status shows "Ready"
- Banner ads appear at bottom of screen
- Interstitial ads show after actions
- Console shows successful initialization logs

### 📊 Revenue Tracking:
- Check AdMob console for impression data
- Monitor eCPM and fill rates
- Optimize ad placement based on performance

## 🔧 Advanced Configuration

### Custom Ad Positions:
Use the `useAdMob` hook in any component:
```typescript
import { useAdMob } from '../hooks/useAdMob';
import { BannerAdPosition } from '@capacitor-community/admob';

const { showBanner } = useAdMob();

// Show banner at top
showBanner(BannerAdPosition.TOP_CENTER);
```

### Ad Frequency Control:
Modify `enhancedAdMobService.ts` to add cooldown periods and frequency caps.

## 📞 Support

If you encounter issues:
1. Check Android Studio logs
2. Verify all configuration files
3. Test on multiple devices
4. Check AdMob console for account status

**Your AdMob integration is now complete and ready for production!** 🎉
