
# Android Setup Guide - Meta Audience Network

## Step 1: Add Android Platform
```bash
npm run build
npx cap add android
```

## Step 2: Copy Configuration Files

After running `npx cap add android`, copy these files to the correct locations:

### 1. android/app/build.gradle
Copy content from: `android-build.gradle`

### 2. android/app/src/main/AndroidManifest.xml  
Copy content from: `android-manifest.xml`

### 3. android/app/proguard-rules.pro
Copy content from: `android-proguard-rules.pro`

### 4. android/app/src/main/java/com/vidrankersocilet/com/MainActivity.java
Copy content from: `android-main-activity.java`

## Step 3: Build and Run
```bash
npx cap sync android
npx cap open android
```

## Meta Audience Network Configuration:
- **App ID:** 1160387479246621
- **Banner Placement:** 1160387479246621_1164434622175240
- **Interstitial Placement:** 1160387479246621_1161152762503426

## Important Notes:
- Ads only work on real Android devices (not emulator)
- Build the app in Android Studio before running
- Check Settings page for ad status monitoring
