
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vidrankersocilet.com',
  appName: 'VidRanker',
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
      applicationId: 'ca-app-pub-YOUR_PUBLISHER_ID~YOUR_APP_ID', // Replace with your actual publisher ID
      initializeForTesting: false, // Set to false for production
      testDeviceIds: ['2077ef9a63d2b398840261c8221a0c9b'], // Your test device IDs
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
