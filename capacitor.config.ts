
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vidrankersocilet.com',
  appName: 'VidRanker',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      spinnerStyle: 'large',
      spinnerColor: '#000000',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: false
    },
    AdMob: {
      applicationId: 'ca-app-pub-2211398170597117~9683407494',
      initializeForTesting: false, // Production mode
      testDeviceIds: [], // Empty for production
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
    webContentsDebuggingEnabled: false, // Disabled for production
    loggingBehavior: 'none'
  },
  ios: {
    contentInset: 'automatic',
  },
};

export default config;
