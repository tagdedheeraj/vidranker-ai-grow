
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

class UnifiedAdMobService {
  private isInitialized = false;
  private bannerShown = false;
  
  // Updated AdMob IDs
  private readonly APP_ID = 'ca-app-pub-8658337038682012~3040147524';
  private readonly BANNER_ID = 'ca-app-pub-8658337038682012/4284962341';
  private readonly INTERSTITIAL_ID = 'ca-app-pub-8658337038682012/4284962341';

  async initialize(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) {
      console.log('🌐 Web platform - ads disabled');
      return false;
    }

    if (this.isInitialized) {
      console.log('✅ Already initialized');
      return true;
    }

    try {
      console.log('🚀 Initializing AdMob...');
      
      await AdMob.initialize({
        testingDevices: [],
        initializeForTesting: false
      });

      this.isInitialized = true;
      console.log('✅ AdMob initialized successfully!');
      
      // Auto-load banner after 2 seconds
      setTimeout(() => {
        this.showBanner();
      }, 2000);
      
      return true;
    } catch (error) {
      console.error('❌ AdMob initialization failed:', error);
      return false;
    }
  }

  async showBanner(): Promise<boolean> {
    if (!this.isInitialized || !Capacitor.isNativePlatform()) {
      console.log('❌ AdMob not ready for banner');
      return false;
    }

    if (this.bannerShown) {
      console.log('✅ Banner already showing');
      return true;
    }

    try {
      console.log('🎯 Loading banner ad...');
      
      const bannerOptions: BannerAdOptions = {
        adId: this.BANNER_ID,
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: false
      };

      await AdMob.showBanner(bannerOptions);
      this.bannerShown = true;
      
      console.log('✅ Banner ad displayed!');
      return true;
    } catch (error) {
      console.error('❌ Banner failed:', error);
      return false;
    }
  }

  async showInterstitial(): Promise<boolean> {
    if (!this.isInitialized || !Capacitor.isNativePlatform()) {
      console.log('❌ AdMob not ready for interstitial');
      return false;
    }

    try {
      console.log('🎯 Loading interstitial ad...');
      
      await AdMob.prepareInterstitial({
        adId: this.INTERSTITIAL_ID,
        isTesting: false
      });

      await AdMob.showInterstitial();
      
      console.log('✅ Interstitial ad displayed!');
      return true;
    } catch (error) {
      console.error('❌ Interstitial failed:', error);
      return false;
    }
  }

  async hideBanner(): Promise<void> {
    if (this.bannerShown && Capacitor.isNativePlatform()) {
      try {
        await AdMob.hideBanner();
        this.bannerShown = false;
        console.log('✅ Banner hidden');
      } catch (error) {
        console.error('❌ Hide banner failed:', error);
      }
    }
  }

  getStatus() {
    return {
      isInitialized: this.isInitialized,
      bannerShown: this.bannerShown,
      isNativePlatform: Capacitor.isNativePlatform()
    };
  }
}

export const unifiedAdMobService = new UnifiedAdMobService();
