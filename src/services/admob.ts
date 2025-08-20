
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

class AdMobService {
  private isInitialized = false;
  private initializationAttempted = false;
  private isNativePlatform = false;

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
      
      await AdMob.initialize({
        testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
        initializeForTesting: true, // Temporarily set to true for testing
      });

      this.isInitialized = true;
      console.log("AdMobService: Initialized successfully");
    } catch (error) {
      console.error("AdMobService: Initialization failed:", error);
      this.isInitialized = false;
      // Gracefully handle initialization failure without crashing
    }
  }

  async showBanner() {
    if (!this.isNativePlatform) {
      console.log("AdMobService: Not on native platform, skipping banner ad");
      return false;
    }

    try {
      if (!this.isInitialized) {
        console.log("AdMobService: Not initialized, attempting to initialize...");
        await this.initialize();
      }

      if (!this.isInitialized) {
        console.log("AdMobService: Still not initialized, skipping banner");
        return false;
      }

      const bannerOptions: BannerAdOptions = {
        // Use test ad for now to avoid crashes
        adId: 'ca-app-pub-3940256099942544/6300978111', // Test Banner Ad Unit ID
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: true // Set to true for testing
      };

      await AdMob.showBanner(bannerOptions);
      console.log("AdMobService: Banner ad shown successfully");
      return true;
    } catch (error) {
      console.error("AdMobService: Failed to show banner ad:", error);
      return false;
    }
  }

  async showInterstitial() {
    if (!this.isNativePlatform) {
      console.log("AdMobService: Not on native platform, skipping interstitial ad");
      return false;
    }

    try {
      if (!this.isInitialized) {
        console.log("AdMobService: Not initialized, attempting to initialize...");
        await this.initialize();
      }

      if (!this.isInitialized) {
        console.log("AdMobService: Still not initialized, skipping interstitial");
        return false;
      }

      // Use test ad for now to avoid crashes
      await AdMob.prepareInterstitial({
        adId: 'ca-app-pub-3940256099942544/1033173712', // Test Interstitial Ad Unit ID
        isTesting: true // Set to true for testing
      });

      await AdMob.showInterstitial();
      console.log("AdMobService: Interstitial ad shown successfully");
      return true;
    } catch (error) {
      console.error("AdMobService: Failed to show interstitial ad:", error);
      return false;
    }
  }

  async hideBanner() {
    if (!this.isNativePlatform) {
      return;
    }

    try {
      if (this.isInitialized) {
        await AdMob.hideBanner();
        console.log("AdMobService: Banner ad hidden");
      }
    } catch (error) {
      console.error("AdMobService: Failed to hide banner ad:", error);
    }
  }

  // Method to show interstitial after user actions with delay
  async showInterstitialAfterAction() {
    if (!this.isNativePlatform) {
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
    return this.isInitialized && this.isNativePlatform;
  }

  // Get initialization status
  getStatus() {
    return {
      isNativePlatform: this.isNativePlatform,
      isInitialized: this.isInitialized,
      initializationAttempted: this.initializationAttempted
    };
  }
}

export const adMobService = new AdMobService();
