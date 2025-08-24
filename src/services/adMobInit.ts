
import { Capacitor } from '@capacitor/core';
import { AdMob } from '@capacitor-community/admob';

export interface AdMobConfig {
  appId: string;
  bannerId: string;
  interstitialId: string;
  isTestMode: boolean;
}

export class AdMobInitService {
  private static instance: AdMobInitService;
  private isInitialized = false;
  private config: AdMobConfig;

  private constructor() {
    this.config = {
      appId: 'ca-app-pub-2211398170597117~9683407494',
      bannerId: 'ca-app-pub-2211398170597117/2547153500',
      interstitialId: 'ca-app-pub-2211398170597117/8371175883',
      isTestMode: false // Production mode
    };
  }

  static getInstance(): AdMobInitService {
    if (!AdMobInitService.instance) {
      AdMobInitService.instance = new AdMobInitService();
    }
    return AdMobInitService.instance;
  }

  async initialize(): Promise<boolean> {
    try {
      console.log('🎯 AdMob: Starting initialization...');
      
      if (!Capacitor.isNativePlatform()) {
        console.log('🌐 AdMob: Web platform detected - ads disabled');
        return false;
      }

      if (this.isInitialized) {
        console.log('✅ AdMob: Already initialized');
        return true;
      }

      // Initialize with production settings
      await AdMob.initialize({
        testingDevices: [], // Empty for production
        initializeForTesting: false, // Production mode
      });

      this.isInitialized = true;
      console.log('✅ AdMob: Initialization successful!');
      return true;

    } catch (error) {
      console.error('❌ AdMob: Initialization failed:', error);
      this.isInitialized = false;
      return false;
    }
  }

  getConfig(): AdMobConfig {
    return this.config;
  }

  isReady(): boolean {
    return this.isInitialized && Capacitor.isNativePlatform();
  }
}

export const adMobInit = AdMobInitService.getInstance();
