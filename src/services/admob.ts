
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

class AdMobService {
  private isInitialized = false;
  private initializationAttempted = false;
  private isNativePlatform = false;

  constructor() {
    this.isNativePlatform = Capacitor.isNativePlatform();
  }

  async initialize() {
    if (this.initializationAttempted || !this.isNativePlatform) {
      return;
    }
    
    this.initializationAttempted = true;

    try {
      console.log("Initializing AdMob...");
      
      await AdMob.initialize({
        testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
        initializeForTesting: false, // Set to false for production
      });

      this.isInitialized = true;
      console.log("AdMob initialized successfully");
    } catch (error) {
      console.error("AdMob initialization failed:", error);
      this.isInitialized = false;
      // Don't throw to prevent app crash
    }
  }

  async showBanner() {
    if (!this.isNativePlatform) {
      console.log("Not on native platform, skipping banner ad");
      return;
    }

    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (!this.isInitialized) {
        console.log("AdMob not initialized, skipping banner");
        return;
      }

      const bannerOptions: BannerAdOptions = {
        adId: 'ca-app-pub-YOUR_PUBLISHER_ID/YOUR_BANNER_AD_UNIT_ID', // Replace with your actual ad unit ID
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: false // Set to false for production
      };

      await AdMob.showBanner(bannerOptions);
      console.log("Banner ad shown successfully");
    } catch (error) {
      console.error("Failed to show banner ad:", error);
      // Silently fail to prevent crashes
    }
  }

  async showInterstitial() {
    if (!this.isNativePlatform) {
      console.log("Not on native platform, skipping interstitial ad");
      return;
    }

    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (!this.isInitialized) {
        console.log("AdMob not initialized, skipping interstitial");
        return;
      }

      await AdMob.prepareInterstitial({
        adId: 'ca-app-pub-YOUR_PUBLISHER_ID/YOUR_INTERSTITIAL_AD_UNIT_ID', // Replace with your actual ad unit ID
        isTesting: false // Set to false for production
      });

      await AdMob.showInterstitial();
      console.log("Interstitial ad shown successfully");
    } catch (error) {
      console.error("Failed to show interstitial ad:", error);
      // Silently fail to prevent crashes
    }
  }

  async hideBanner() {
    if (!this.isNativePlatform) {
      return;
    }

    try {
      if (this.isInitialized) {
        await AdMob.hideBanner();
        console.log("Banner ad hidden");
      }
    } catch (error) {
      console.error("Failed to hide banner ad:", error);
    }
  }

  // Method to show interstitial after user actions
  async showInterstitialAfterAction() {
    if (!this.isNativePlatform) {
      return;
    }

    // Add a small delay to ensure smooth user experience
    setTimeout(() => {
      this.showInterstitial();
    }, 1000);
  }
}

export const adMobService = new AdMobService();
