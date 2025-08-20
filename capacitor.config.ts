
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
      backgroundColor: '#FF0000',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
