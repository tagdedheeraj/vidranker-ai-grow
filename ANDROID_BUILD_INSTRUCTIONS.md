
# VidRanker Android Build Instructions

## Prerequisites
- Android Studio installed
- Java 17 or higher
- Android SDK (API level 22+)
- Your AdMob Publisher ID: `ca-app-pub-2211398170597117`

## Step-by-Step Build Process

### 1. Export and Clone Project
1. Export your project to GitHub using the "Export to GitHub" button
2. Clone the repository locally:
```bash
git clone YOUR_GITHUB_REPO_URL
cd your-project-directory
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Add Android Platform
```bash
npx cap add android
```

### 4. Build Web Project
```bash
npm run build
```

### 5. Sync with Android
```bash
npx cap sync android
```

### 6. Configure AdMob in Android

#### Update AndroidManifest.xml
Open `android/app/src/main/AndroidManifest.xml` and add:

```xml
<!-- Add inside <application> tag -->
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-2211398170597117~YOUR_APP_ID"/>
```

**Important:** Replace `YOUR_APP_ID` with your actual AdMob App ID from your AdMob console.

#### Update Ad Unit IDs
In `src/services/admob.ts`, replace the test Ad Unit IDs:

- Banner ID: `ca-app-pub-2211398170597117/YOUR_BANNER_AD_UNIT_ID`
- Interstitial ID: `ca-app-pub-2211398170597117/YOUR_INTERSTITIAL_AD_UNIT_ID`

Get these IDs from your AdMob console.

### 7. Update Android Dependencies
```bash
npx cap update android
```

### 8. Build and Run

#### Option A: Open in Android Studio
```bash
npx cap open android
```
Then build and run from Android Studio.

#### Option B: Run directly
```bash
npx cap run android
```

## Troubleshooting Crashes

### Common Issues and Solutions:

1. **AdMob Initialization Failure**
   - Ensure your AdMob App ID is correct in `capacitor.config.ts`
   - Check that internet permissions are in AndroidManifest.xml

2. **Missing Ad Unit IDs**
   - Replace all test Ad Unit IDs with your real ones
   - Ensure Ad Units are created in your AdMob console

3. **AGP Version Issues**
   - Current AGP version: 8.12.1
   - Ensure Android Gradle Plugin compatibility

4. **Test vs Production Mode**
   - For testing: Set `isTesting: true` in AdMob service
   - For production: Set `isTesting: false` and `initializeForTesting: false`

## Production Configuration

Before publishing:

1. In `capacitor.config.ts`:
   ```typescript
   initializeForTesting: false
   ```

2. In `src/services/admob.ts`:
   ```typescript
   isTesting: false
   initializeForTesting: false
   ```

3. Replace all test Ad Unit IDs with production IDs

## Getting Your AdMob IDs

1. Go to [AdMob Console](https://admob.google.com/)
2. Select your app
3. Copy your App ID (format: `ca-app-pub-2211398170597117~XXXXXXXXXX`)
4. Create ad units and copy their IDs
5. Update all configuration files

## Support

If you encounter crashes:
1. Check Android Studio logs
2. Enable debug logging in AdMob service
3. Test with AdMob test IDs first
4. Gradually switch to production IDs

Your Publisher ID: `ca-app-pub-2211398170597117`
```
