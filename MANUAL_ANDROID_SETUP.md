
# Manual Android Setup to Fix AdMob Crashes

## CRITICAL STEP: Edit AndroidManifest.xml

**यह सबसे important step है जो crash को fix करता है!**

### Step 1: Android Studio में AndroidManifest.xml खोलें
```
android/app/src/main/AndroidManifest.xml
```

### Step 2: <application> tag के अंदर यह meta-data add करें:
```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-2211398170597117~9683407494"/>
```

### Step 3: Complete AndroidManifest.xml Example:
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.vidrankersocilet.com">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <!-- ADD THIS LINE - यह crash को fix करता है -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-2211398170597117~9683407494"/>

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTask"
            android:theme="@style/AppTheme.NoActionBarLaunch">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>
</manifest>
```

## Complete Build Commands (After Manual Edit):

```bash
# 1. Clean build
npm run build

# 2. Sync with Android
npx cap sync android

# 3. Update Android dependencies
npx cap update android

# 4. Open in Android Studio
npx cap open android

# 5. In Android Studio:
#    - Click "Sync Project with Gradle Files"
#    - Build -> Clean Project
#    - Build -> Rebuild Project
#    - Run the app
```

## Troubleshooting:

### If app still crashes:
1. Check console logs in Android Studio
2. Verify meta-data line is exactly as shown above
3. Ensure no typos in App ID
4. Clean and rebuild project

### Test Mode Configuration:
- Current configuration uses Google test ads
- App ID: ca-app-pub-2211398170597117~9683407494 (real)
- Banner ID: ca-app-pub-3940256099942544/6300978111 (test)
- Interstitial ID: ca-app-pub-3940256099942544/1033173712 (test)

**यह setup crash को prevent करेगा और test ads दिखाएगा!**
