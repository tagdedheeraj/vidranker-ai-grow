
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, InterstitialAdOptions } from '@capacitor-community/admob';
import { toast } from 'sonner';

class AdMobService {
  private isInitialized = false;
  private initializationAttempted = false;

  async initialize() {
    if (this.initializationAttempted) return;
    this.initializationAttempted = true;

    try {
      console.log("Initializing AdMob...");
      
      await AdMob.initialize({
        testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
        initializeForTesting: true,
      });

      this.isInitialized = true;
      console.log("AdMob initialized successfully");
    } catch (error) {
      console.error("AdMob initialization failed:", error);
      // Don't throw error to prevent app crash
      this.isInitialized = false;
    }
  }

  async showBanner() {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (!this.isInitialized) {
        console.log("AdMob not initialized, skipping banner");
        return;
      }

      const bannerOptions: BannerAdOptions = {
        adId: 'ca-app-pub-3940256099942544/6300978111', // Test ad unit ID
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: true
      };

      await AdMob.showBanner(bannerOptions);
      console.log("Banner ad shown successfully");
    } catch (error) {
      console.error("Failed to show banner ad:", error);
      // Don't show error to user, just log it
    }
  }

  async showInterstitial() {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (!this.isInitialized) {
        console.log("AdMob not initialized, skipping interstitial");
        return;
      }

      const interstitialOptions: InterstitialAdOptions = {
        adId: 'ca-app-pub-3940256099942544/1033173712', // Test ad unit ID
        isTesting: true
      };

      await AdMob.prepareInterstitial(interstitialOptions);
      await AdMob.showInterstitial();
      console.log("Interstitial ad shown successfully");
    } catch (error) {
      console.error("Failed to show interstitial ad:", error);
      // Don't show error to user, just log it
    }
  }

  async hideBanner() {
    try {
      if (this.isInitialized) {
        await AdMob.hideBanner();
        console.log("Banner ad hidden");
      }
    } catch (error) {
      console.error("Failed to hide banner ad:", error);
    }
  }
}

export const adMobService = new AdMobService();
