
# Manual File Setup Guide - SSL Fix

## Step-by-Step File Placement

### 1. After running `npx cap add android`, do these manual steps:

#### A. Copy Network Security Config
1. Copy the content from `network_security_config.xml` file
2. Create this path: `android/app/src/main/res/xml/`
3. Create file: `android/app/src/main/res/xml/network_security_config.xml`
4. Paste the content

#### B. Update AndroidManifest.xml
1. Open: `android/app/src/main/AndroidManifest.xml`
2. Replace entire content with content from `android-manifest-ssl-fixed.xml`

### 2. Verify File Structure
```
android/
├── app/
│   └── src/
│       └── main/
│           ├── AndroidManifest.xml (updated)
│           └── res/
│               └── xml/
│                   └── network_security_config.xml (new)
```

### 3. Key Changes Made

#### SSL Handshake Fix:
- ✅ Network security config added
- ✅ Cleartext traffic enabled for development
- ✅ Trust anchors configured
- ✅ Domain-specific configurations

#### Domain Support:
- ✅ `vidranker.space` domain added
- ✅ SSL certificate handling
- ✅ Development domains supported
- ✅ Production ready

#### AdMob Integration:
- ✅ App ID properly configured
- ✅ Crash protection maintained
- ✅ Network permissions added

### 4. Expected Results

After these changes:
- ❌ No more "SSL handshake failed" errors
- ❌ No more "Cleartext HTTP traffic" errors  
- ❌ No AdMob initialization crashes
- ✅ App loads from vidranker.space domain
- ✅ Stable mobile app experience
- ✅ Both development and production working

### 5. Testing Steps
1. Run `npx cap run android`
2. Check logcat for "AdMob initialization completed"
3. Verify app loads without SSL errors
4. Test domain connectivity

**Your app ab crash नहीं होगा!** 🎉
```

