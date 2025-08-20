
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

class AdMobService {
  private isInitialized = false;
  private initializationAttempted = false;
  private isNativePlatform = false;
  private initializationFailed = false;

  constructor() {
    this.isNativePlatform = Capacitor.isNativePlatform();
    console.log('AdMobService: Platform detected:', Capacitor.getPlatform());
  }

  async initialize() {
    if (this.initializationAttempted || !this.isNativePlatform) {
      console.log('AdMobService: Skipping initialization - already attempted or not native platform');
      return;
    }
    
    this.initializationAttempted = true;

    try {
      console.log("AdMobService: Starting initialization...");
      
      // Enhanced delay to ensure app stability
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      await AdMob.initialize({
        testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
        initializeForTesting: true,
      });

      this.isInitialized = true;
      this.initializationFailed = false;
      console.log("AdMobService: Initialized successfully");
    } catch (error) {
      console.error("AdMobService: Initialization failed (app continues):", error);
      this.isInitialized = false;
      this.initializationFailed = true;
    }
  }

  async showBanner() {
    if (!this.isNativePlatform || this.initializationFailed) {
      console.log("AdMobService: Skipping banner - not native platform or init failed");
      return false;
    }

    try {
      if (!this.isInitialized) {
        console.log("AdMobService: Attempting initialization for banner...");
        await this.initialize();
      }

      if (!this.isInitialized || this.initializationFailed) {
        console.log("AdMobService: Cannot show banner - initialization failed");
        return false;
      }

      const bannerOptions: BannerAdOptions = {
        adId: 'ca-app-pub-3940256099942544/6300978111', // Google Test Banner
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: true
      };

      await AdMob.showBanner(bannerOptions);
      console.log("AdMobService: Banner ad displayed successfully");
      return true;
    } catch (error) {
      console.error("AdMobService: Banner ad failed (non-fatal):", error);
      return false;
    }
  }

  async showInterstitial() {
    if (!this.isNativePlatform || this.initializationFailed) {
      console.log("AdMobService: Skipping interstitial - not native platform or init failed");
      return false;
    }

    try {
      if (!this.isInitialized) {
        console.log("AdMobService: Attempting initialization for interstitial...");
        await this.initialize();
      }

      if (!this.isInitialized || this.initializationFailed) {
        console.log("AdMobService: Cannot show interstitial - initialization failed");
        return false;
      }

      await AdMob.prepareInterstitial({
        adId: 'ca-app-pub-3940256099942544/1033173712', // Google Test Interstitial
        isTesting: true
      });

      await AdMob.showInterstitial();
      console.log("AdMobService: Interstitial ad displayed successfully");
      return true;
    } catch (error) {
      console.error("AdMobService: Interstitial ad failed (non-fatal):", error);
      return false;
    }
  }

  async hideBanner() {
    if (!this.isNativePlatform || this.initializationFailed) {
      return;
    }

    try {
      if (this.isInitialized) {
        await AdMob.hideBanner();
        console.log("AdMobService: Banner hidden");
      }
    } catch (error) {
      console.error("AdMobService: Failed to hide banner (non-fatal):", error);
    }
  }

  async showInterstitialAfterAction() {
    if (!this.isNativePlatform || this.initializationFailed) {
      return;
    }

    setTimeout(async () => {
      const success = await this.showInterstitial();
      if (!success) {
        console.log("AdMobService: Interstitial not shown, app continues normally");
      }
    }, 1000);
  }

  isReady(): boolean {
    return this.isInitialized && this.isNativePlatform && !this.initializationFailed;
  }

  getStatus() {
    return {
      isNativePlatform: this.isNativePlatform,
      isInitialized: this.isInitialized,
      initializationAttempted: this.initializationAttempted,
      initializationFailed: this.initializationFailed
    };
  }

  resetFailedState() {
    this.initializationFailed = false;
    this.initializationAttempted = false;
    this.isInitialized = false;
  }
}

export const adMobService = new AdMobService();
