
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
      
      // Add delay before initialization to ensure app is fully loaded
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await AdMob.initialize({
        testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
        initializeForTesting: true, // Keep true for testing to avoid crashes
      });

      this.isInitialized = true;
      this.initializationFailed = false;
      console.log("AdMobService: Initialized successfully");
    } catch (error) {
      console.error("AdMobService: Initialization failed:", error);
      this.isInitialized = false;
      this.initializationFailed = true;
      // Gracefully handle initialization failure without crashing
    }
  }

  async showBanner() {
    if (!this.isNativePlatform || this.initializationFailed) {
      console.log("AdMobService: Not on native platform or initialization failed, skipping banner ad");
      return false;
    }

    try {
      if (!this.isInitialized) {
        console.log("AdMobService: Not initialized, attempting to initialize...");
        await this.initialize();
      }

      if (!this.isInitialized || this.initializationFailed) {
        console.log("AdMobService: Still not initialized or failed, skipping banner");
        return false;
      }

      const bannerOptions: BannerAdOptions = {
        // Always use test ads to prevent crashes
        adId: 'ca-app-pub-3940256099942544/6300978111', // Google Test Banner Ad Unit ID
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: true // Always true for testing
      };

      await AdMob.showBanner(bannerOptions);
      console.log("AdMobService: Banner ad shown successfully");
      return true;
    } catch (error) {
      console.error("AdMobService: Failed to show banner ad (non-fatal):", error);
      this.initializationFailed = true; // Prevent further attempts
      return false;
    }
  }

  async showInterstitial() {
    if (!this.isNativePlatform || this.initializationFailed) {
      console.log("AdMobService: Not on native platform or initialization failed, skipping interstitial ad");
      return false;
    }

    try {
      if (!this.isInitialized) {
        console.log("AdMobService: Not initialized, attempting to initialize...");
        await this.initialize();
      }

      if (!this.isInitialized || this.initializationFailed) {
        console.log("AdMobService: Still not initialized or failed, skipping interstitial");
        return false;
      }

      // Always use test ads to prevent crashes
      await AdMob.prepareInterstitial({
        adId: 'ca-app-pub-3940256099942544/1033173712', // Google Test Interstitial Ad Unit ID
        isTesting: true // Always true for testing
      });

      await AdMob.showInterstitial();
      console.log("AdMobService: Interstitial ad shown successfully");
      return true;
    } catch (error) {
      console.error("AdMobService: Failed to show interstitial ad (non-fatal):", error);
      this.initializationFailed = true; // Prevent further attempts
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
        console.log("AdMobService: Banner ad hidden");
      }
    } catch (error) {
      console.error("AdMobService: Failed to hide banner ad (non-fatal):", error);
    }
  }

  // Method to show interstitial after user actions with delay
  async showInterstitialAfterAction() {
    if (!this.isNativePlatform || this.initializationFailed) {
      return;
    }

    // Add delay to ensure smooth user experience
    setTimeout(async () => {
      const success = await this.showInterstitial();
      if (!success) {
        console.log("AdMobService: Interstitial ad not shown, continuing without interruption");
      }
    }, 1000);
  }

  // Check if AdMob is ready
  isReady(): boolean {
    return this.isInitialized && this.isNativePlatform && !this.initializationFailed;
  }

  // Get initialization status
  getStatus() {
    return {
      isNativePlatform: this.isNativePlatform,
      isInitialized: this.isInitialized,
      initializationAttempted: this.initializationAttempted,
      initializationFailed: this.initializationFailed
    };
  }

  // Reset failed state for retry
  resetFailedState() {
    this.initializationFailed = false;
    this.initializationAttempted = false;
    this.isInitialized = false;
  }
}

export const adMobService = new AdMobService();
