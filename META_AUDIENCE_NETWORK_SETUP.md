
# Meta Audience Network Setup Guide

## 🚨 CRITICAL: Complete Setup Steps

### 1. Remove AdMob Dependencies
AdMob has been completely removed from the project. The new Meta Audience Network is now integrated.

### 2. Android Configuration Files

#### AndroidManifest.xml
Path: `android/app/src/main/AndroidManifest.xml`
Copy content from: `meta-android-manifest.xml`

**Key Addition:**
```xml
<meta-data
    android:name="com.facebook.sdk.ApplicationId"
    android:value="1160387479246621"/>
```

#### build.gradle (App Level)
Path: `android/app/build.gradle`
Copy content from: `meta-build-gradle.gradle`

**Key Addition:**
```gradle
implementation 'com.facebook.android:audience-network-sdk:6.+'
```

#### Project Level build.gradle
Path: `android/build.gradle`
Ensure these repositories are present:
```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        jitpack()
    }
}
```

#### ProGuard Rules
Path: `android/app/proguard-rules.pro`
Copy content from: `meta-proguard-rules.pro`

### 3. Ad Configuration

**App ID:** `1160387479246621`
**Interstitial Placement ID:** `1160387479246621_1161152762503426`
**Banner Placement ID:** `1160387479246621_1164434622175240`

### 4. Build Commands

```bash
# Clean and rebuild
rm -rf android/
npm run build
npx cap add android

# Manual file configuration (copy the files above)

# Update and sync
npx cap update android
npx cap sync android
npx cap open android
```

### 5. Android Studio Steps

1. **Sync Project with Gradle Files**
2. **Build → Clean Project**
3. **Build → Rebuild Project**
4. Connect real Android device
5. **Run** the app

### 6. Features

✅ **Banner Ads:** Auto-load at bottom of screen after 2 seconds
✅ **Interstitial Ads:** Load and show immediately when triggered
✅ **Status Monitoring:** Real-time ad status in Settings page
✅ **Manual Controls:** Show/hide banner and trigger interstitial ads

### 7. Testing

- Banner ads will appear at the bottom of the screen
- Interstitial ads can be triggered from Home page or Settings
- Status can be monitored in Settings → Meta Audience Network Status
- Console logs show detailed ad loading information

**IMPORTANT:** Ads only work on real Android devices, NOT emulator or web browser!

### 8. Success Indicators

- App launches without crash
- Settings page shows "✅ Meta Audience Network Ready"
- Banner ads appear at bottom automatically
- Interstitial ads work when clicked
- Console shows: "✅ Meta Audience Network: Banner displayed!"
