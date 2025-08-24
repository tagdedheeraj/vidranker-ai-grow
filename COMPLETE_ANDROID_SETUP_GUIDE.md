
# Complete Android Setup Guide for AdMob

## 🚨 CRITICAL: Files You Must Manually Create/Edit

### 1. MainActivity.java
Path: `android/app/src/main/java/com/vidrankersocilet/com/MainActivity.java`
Copy content from: `android-mainactivity-template.java`

### 2. MainApplication.java  
Path: `android/app/src/main/java/com/vidrankersocilet/com/MainApplication.java`
Copy content from: `android-mainapplication-template.java`

### 3. AndroidManifest.xml
Path: `android/app/src/main/AndroidManifest.xml`  
Copy content from: `complete-androidmanifest-template.xml`

### 4. build.gradle
Path: `android/app/build.gradle`
Copy content from: `enhanced-build-gradle-template.gradle`

## 🛠️ Step by Step Commands

### Phase 1: Clean & Rebuild
```bash
# 1. Clean everything
rm -rf android/
rm -rf dist/
rm -rf node_modules/

# 2. Fresh install
npm install
npm run build

# 3. Add Android platform
npx cap add android
```

### Phase 2: Manual File Setup
1. Open Android Studio
2. Navigate to project folders
3. Create the 4 files listed above with exact content
4. **Sync Project with Gradle Files**

### Phase 3: Build & Test
```bash
# 1. Update capacitor
npx cap update android

# 2. Sync changes  
npx cap sync android

# 3. Open in Android Studio
npx cap open android
```

### Phase 4: Android Studio Final Steps
1. **Build → Clean Project**
2. **Build → Rebuild Project**  
3. Connect real Android device
4. Click **Run** button

## ✅ Success Indicators
- App launches without crash
- Settings page shows "✅ AdMob Ready"
- Banner ads appear at bottom
- Interstitial ads work when clicked
- Console logs show: "✅ AdMob: Banner ad displayed successfully!"

## 🚨 Common Issues & Fixes
- **Gradle sync fails**: Check build.gradle syntax
- **App crashes on start**: Verify AndroidManifest.xml AdMob App ID
- **Ads don't show**: Ensure MainActivity.java registers AdMob plugin
- **Build errors**: Clean project and rebuild

**IMPORTANT**: Ads only work on real Android devices, NOT emulator or web browser!
