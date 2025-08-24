
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
      console.log('📱 Platform:', Capacitor.getPlatform());
      console.log('🔧 Native Platform:', Capacitor.isNativePlatform());
      
      if (!Capacitor.isNativePlatform()) {
        console.log('🌐 AdMob: Web platform detected - ads disabled');
        return false;
      }

      if (this.isInitialized) {
        console.log('✅ AdMob: Already initialized');
        return true;
      }

      console.log('🚀 AdMob: Initializing with production settings...');
      console.log('📊 App ID:', this.config.appId);
      console.log('🎯 Banner ID:', this.config.bannerId);
      console.log('📺 Interstitial ID:', this.config.interstitialId);

      // Initialize with production settings
      await AdMob.initialize({
        testingDevices: [], // Empty for production
        initializeForTesting: false, // Production mode
      });

      this.isInitialized = true;
      console.log('✅ AdMob: Production initialization successful!');
      console.log('🎊 AdMob: Ready to show ads!');
      return true;

    } catch (error) {
      console.error('❌ AdMob: Initialization failed:', error);
      console.error('💡 AdMob: Check Android configuration files!');
      this.isInitialized = false;
      return false;
    }
  }

  getConfig(): AdMobConfig {
    return this.config;
  }

  isReady(): boolean {
    const ready = this.isInitialized && Capacitor.isNativePlatform();
    console.log('🔍 AdMob Ready Check:', ready);
    return ready;
  }
}

export const adMobInit = AdMobInitService.getInstance();
