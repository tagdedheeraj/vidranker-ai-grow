
# Android Crash Fix - AdMob Integration

## Problem
App crashes with error: "Missing application ID. AdMob publishers should follow the instructions"

## Solution Steps

### Step 1: Re-setup Android Platform
```bash
# Remove existing Android platform (if exists)
npx cap remove android

# Add Android platform fresh
npx cap add android

# Build the web project
npm run build

# Sync with Android
npx cap sync android
```

### Step 2: CRITICAL - Edit AndroidManifest.xml
**यह सबसे important step है!**

1. Open Android Studio:
```bash
npx cap open android
```

2. Navigate to: `android/app/src/main/AndroidManifest.xml`

3. Add this meta-data inside `<application>` tag:
```xml
<application
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:supportsRtl="true"
    android:theme="@style/AppTheme">

    <!-- ADD THIS LINE - CRITICAL FOR ADMOB -->
    <meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="ca-app-pub-2211398170597117~9683407494"/>

    <!-- Your activities and other components -->
    
</application>
```

### Step 3: Clean and Rebuild
1. In Android Studio:
   - Build → Clean Project
   - Build → Rebuild Project

2. Or from terminal:
```bash
cd android
./gradlew clean
./gradlew build
```

### Step 4: Run the App
```bash
npx cap run android
```

## Expected Result
- App will launch without crashing
- AdMob will initialize properly
- Test ads will be displayed

## Verification
- Check logcat for "AdMob initialization completed" message
- No more "Missing application ID" errors
- App runs smoothly

## Important Notes
- App ID: `ca-app-pub-2211398170597117~9683407494`
- Currently using test ads to prevent crashes
- This configuration is safe for testing and development

## If Still Crashes
1. Verify the meta-data line is exactly as shown above
2. Check for typos in the App ID
3. Ensure the meta-data is inside `<application>` tag
4. Clean and rebuild again
