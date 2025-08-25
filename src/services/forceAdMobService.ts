
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

class ForceAdMobService {
  private isInitialized = false;
  private initializationPromise: Promise<boolean> | null = null;
  
  // Your real AdMob IDs
  private readonly APP_ID = 'ca-app-pub-2211398170597117~9683407494';
  private readonly BANNER_ID = 'ca-app-pub-2211398170597117/2547153500';
  private readonly INTERSTITIAL_ID = 'ca-app-pub-2211398170597117/8371175883';

  async forceInitialize(): Promise<boolean> {
    // If already initializing, wait for it
    if (this.initializationPromise) {
      return await this.initializationPromise;
    }

    // If already initialized, return true
    if (this.isInitialized) {
      console.log('🎯 ForceAdMob: Already initialized');
      return true;
    }

    // Check if native platform
    if (!Capacitor.isNativePlatform()) {
      console.log('🌐 ForceAdMob: Not native platform');
      return false;
    }

    // Create initialization promise
    this.initializationPromise = this._performInitialization();
    const result = await this.initializationPromise;
    
    // Clear the promise after completion
    this.initializationPromise = null;
    
    return result;
  }

  private async _performInitialization(): Promise<boolean> {
    try {
      console.log('🚀 ForceAdMob: FORCE initializing...');
      
      await AdMob.initialize({
        testingDevices: [],
        initializeForTesting: false
      });

      this.isInitialized = true;
      console.log('✅ ForceAdMob: SUCCESSFULLY initialized!');
      
      // Force load banner immediately after init
      setTimeout(() => {
        this.forceBannerLoad();
      }, 1000);
      
      return true;
    } catch (error) {
      console.error('❌ ForceAdMob: Initialization FAILED:', error);
      this.isInitialized = false;
      return false;
    }
  }

  async forceBannerLoad(): Promise<boolean> {
    console.log('🎯 ForceAdMob: FORCE loading banner...');
    
    if (!this.isInitialized || !Capacitor.isNativePlatform()) {
      console.log('❌ ForceAdMob: Not ready for banner');
      return false;
    }

    try {
      // Hide any existing banner first
      try {
        await AdMob.hideBanner();
        console.log('🗑️ ForceAdMob: Hidden existing banner');
      } catch (e) {
        // Ignore if no banner to hide
      }

      // Wait a moment then show new banner
      await new Promise(resolve => setTimeout(resolve, 500));

      const bannerOptions: BannerAdOptions = {
        adId: this.BANNER_ID,
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: false // Real ads
      };

      await AdMob.showBanner(bannerOptions);
      
      console.log('✅ ForceAdMob: BANNER LOADED SUCCESSFULLY! 🎉');
      return true;
    } catch (error) {
      console.error('❌ ForceAdMob: Banner FAILED:', error);
      return false;
    }
  }

  async forceInterstitialLoad(): Promise<boolean> {
    console.log('🎯 ForceAdMob: FORCE loading interstitial...');
    
    if (!this.isInitialized || !Capacitor.isNativePlatform()) {
      console.log('❌ ForceAdMob: Not ready for interstitial');
      return false;
    }

    try {
      console.log('📋 ForceAdMob: Preparing interstitial...');
      
      await AdMob.prepareInterstitial({
        adId: this.INTERSTITIAL_ID,
        isTesting: false // Real ads
      });

      console.log('📺 ForceAdMob: Showing interstitial...');
      
      await AdMob.showInterstitial();
      
      console.log('✅ ForceAdMob: INTERSTITIAL SHOWN SUCCESSFULLY! 🎉');
      return true;
    } catch (error) {
      console.error('❌ ForceAdMob: Interstitial FAILED:', error);
      return false;
    }
  }

  async hideBanner(): Promise<void> {
    try {
      await AdMob.hideBanner();
      console.log('🗑️ ForceAdMob: Banner hidden');
    } catch (error) {
      console.error('❌ ForceAdMob: Hide banner failed:', error);
    }
  }

  getStatus() {
    return {
      isInitialized: this.isInitialized,
      isNativePlatform: Capacitor.isNativePlatform(),
      platform: Capacitor.getPlatform()
    };
  }

  // Multiple retry mechanism
  async retryBannerLoad(maxRetries = 3): Promise<boolean> {
    for (let i = 0; i < maxRetries; i++) {
      console.log(`🔄 ForceAdMob: Banner retry attempt ${i + 1}/${maxRetries}`);
      
      const success = await this.forceBannerLoad();
      if (success) {
        return true;
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('❌ ForceAdMob: All banner retry attempts failed');
    return false;
  }
}

export const forceAdMobService = new ForceAdMobService();
