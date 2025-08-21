
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vidrankersocilet.com',
  appName: 'VidRanker',
  webDir: 'dist',
  // Comment out server URL for local loading - faster startup
  // server: {
  //   url: 'https://vidranker.space',
  //   cleartext: true,
  //   androidScheme: 'https'
  // },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Increased for better UX
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true, // Show loading indicator
      spinnerStyle: 'large',
      spinnerColor: '#000000',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: false
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
    webContentsDebuggingEnabled: true,
    loggingBehavior: 'none' // Optimize performance
  },
  ios: {
    contentInset: 'automatic',
  },
};

export default config;
