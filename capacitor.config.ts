
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4915bcda5df44f5d8f4f54a36dbac309',
  appName: 'VidRanker - SEO Tags & Thumbnails',
  webDir: 'dist',
  server: {
    url: 'https://4915bcda-5df4-4f5d-8f4f-54a36dbac309.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    AdMob: {
      applicationId: 'ca-app-pub-3940256099942544~3347511713', // Test app ID
      initializeForTesting: true,
    },
  },
  android: {
    allowMixedContent: true,
  },
  ios: {
    contentInset: 'automatic',
  },
};

export default config;
