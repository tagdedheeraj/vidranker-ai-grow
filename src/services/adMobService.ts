
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

class AdMobService {
  private isInitialized = false;
  private bannerLoaded = false;
  private interstitialLoaded = false;
  
  // Production AdMob IDs
  private readonly APP_ID = 'ca-app-pub-2211398170597117~9683407494';
  private readonly BANNER_ID = 'ca-app-pub-2211398170597117/2547153500';
  private readonly INTERSTITIAL_ID = 'ca-app-pub-2211398170597117/8371175883';

  constructor() {
    console.log('🚀 AdMobService: Service created');
  }

  async initialize(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) {
      console.log('🌐 AdMobService: Web platform - ads disabled');
      return false;
    }

    if (this.isInitialized) {
      console.log('✅ AdMobService: Already initialized');
      return true;
    }

    try {
      console.log('🎯 AdMobService: Starting initialization...');
      
      await AdMob.initialize({
        testingDevices: [],
        initializeForTesting: false
      });

      this.isInitialized = true;
      console.log('✅ AdMobService: Initialization successful!');
      
      // Auto-load banner after initialization
      setTimeout(() => {
        this.loadAndShowBanner();
      }, 1000);
      
      return true;
    } catch (error) {
      console.error('❌ AdMobService: Initialization failed:', error);
      return false;
    }
  }

  async loadAndShowBanner(): Promise<boolean> {
    if (!this.isInitialized || !Capacitor.isNativePlatform()) {
      console.log('⏭️ AdMobService: Banner - not ready');
      return false;
    }

    try {
      console.log('🎯 AdMobService: Loading banner ad...');
      
      const bannerOptions: BannerAdOptions = {
        adId: this.BANNER_ID,
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: false
      };

      await AdMob.showBanner(bannerOptions);
      this.bannerLoaded = true;
      
      console.log('✅ AdMobService: Banner ad displayed!');
      return true;
    } catch (error) {
      console.error('❌ AdMobService: Banner failed:', error);
      return false;
    }
  }

  async loadAndShowInterstitial(): Promise<boolean> {
    if (!this.isInitialized || !Capacitor.isNativePlatform()) {
      console.log('⏭️ AdMobService: Interstitial - not ready');
      return false;
    }

    try {
      console.log('🎯 AdMobService: Loading interstitial ad...');
      
      // First prepare the interstitial
      await AdMob.prepareInterstitial({
        adId: this.INTERSTITIAL_ID,
        isTesting: false
      });

      console.log('✅ AdMobService: Interstitial prepared, showing...');
      
      // Then show it
      await AdMob.showInterstitial();
      
      console.log('✅ AdMobService: Interstitial ad displayed!');
      return true;
    } catch (error) {
      console.error('❌ AdMobService: Interstitial failed:', error);
      return false;
    }
  }

  async hideBanner(): Promise<void> {
    if (!this.bannerLoaded) return;
    
    try {
      await AdMob.hideBanner();
      this.bannerLoaded = false;
      console.log('✅ AdMobService: Banner hidden');
    } catch (error) {
      console.error('❌ AdMobService: Hide banner failed:', error);
    }
  }

  getStatus() {
    return {
      isInitialized: this.isInitialized,
      bannerLoaded: this.bannerLoaded,
      interstitialLoaded: this.interstitialLoaded,
      isNativePlatform: Capacitor.isNativePlatform()
    };
  }
}

export const adMobService = new AdMobService();
