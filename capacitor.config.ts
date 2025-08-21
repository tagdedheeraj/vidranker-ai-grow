
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vidrankersocilet.com',
  appName: 'VidRanker',
  webDir: 'dist',
  server: {
    url: 'https://vidranker.space',
    cleartext: true,
    androidScheme: 'https'
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
      applicationId: 'ca-app-pub-2211398170597117~9683407494',
      initializeForTesting: false,
      testDeviceIds: [],
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
      maxAdContentRating: 'MA'
    },
    CapacitorHttp: {
      enabled: true
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  ios: {
    contentInset: 'automatic',
  },
};

export default config;
