
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

class EnhancedAdMobService {
  private isInitialized = false;
  private initializationAttempted = false;
  private isNativePlatform = false;
  private initializationFailed = false;
  private isDestroyed = false;
  private bannerShown = false;

  // Your actual AdMob IDs
  private readonly APP_ID = 'ca-app-pub-2211398170597117~9683407494';
  private readonly BANNER_ID = 'ca-app-pub-2211398170597117/2547153500';
  private readonly INTERSTITIAL_ID = 'ca-app-pub-2211398170597117/8371175883';

  constructor() {
    this.isNativePlatform = Capacitor.isNativePlatform();
    console.log('🚀 EnhancedAdMobService: Platform detected:', Capacitor.getPlatform());
    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers() {
    window.addEventListener('error', (event) => {
      console.error('📱 AdMob Global Error:', event.error);
      event.preventDefault();
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('📱 AdMob Promise Rejection:', event.reason);
      event.preventDefault();
    });
  }

  async initialize(): Promise<boolean> {
    if (this.initializationAttempted || !this.isNativePlatform || this.isDestroyed) {
      console.log('⏭️ AdMob: Skipping initialization');
      return false;
    }
    
    this.initializationAttempted = true;

    try {
      console.log("🎯 AdMob: Starting production initialization...");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (this.isDestroyed) {
        console.log("🛑 AdMob: Service destroyed during initialization");
        return false;
      }

      const initPromise = AdMob.initialize({
        testingDevices: [], // Empty for production
        initializeForTesting: false, // Production mode
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('AdMob initialization timeout')), 10000)
      );

      await Promise.race([initPromise, timeoutPromise]);

      this.isInitialized = true;
      this.initializationFailed = false;
      console.log("✅ AdMob: Production initialization successful!");
      return true;
      
    } catch (error) {
      console.error("❌ AdMob: Initialization failed:", error);
      this.isInitialized = false;
      this.initializationFailed = true;
      return false;
    }
  }

  async showBanner(position: BannerAdPosition = BannerAdPosition.BOTTOM_CENTER): Promise<boolean> {
    if (!this.isNativePlatform || this.initializationFailed || this.isDestroyed) {
      console.log("⏭️ AdMob: Skipping banner - not ready");
      return false;
    }

    try {
      if (!this.isInitialized) {
        console.log("🔄 AdMob: Initializing for banner...");
        const initSuccess = await this.initialize();
        if (!initSuccess) return false;
      }

      if (this.bannerShown) {
        console.log("📱 AdMob: Banner already shown");
        return true;
      }

      const bannerOptions: BannerAdOptions = {
        adId: this.BANNER_ID,
        adSize: BannerAdSize.BANNER,
        position: position,
        margin: 0,
        isTesting: false // Production ads
      };

      console.log("🎯 AdMob: Showing production banner ad...");
      await AdMob.showBanner(bannerOptions);
      
      this.bannerShown = true;
      console.log("✅ AdMob: Banner ad displayed successfully!");
      return true;
      
    } catch (error) {
      console.error("❌ AdMob: Banner ad failed:", error);
      return false;
    }
  }

  async showInterstitial(): Promise<boolean> {
    if (!this.isNativePlatform || this.initializationFailed || this.isDestroyed) {
      console.log("⏭️ AdMob: Skipping interstitial - not ready");
      return false;
    }

    try {
      if (!this.isInitialized) {
        console.log("🔄 AdMob: Initializing for interstitial...");
        const initSuccess = await this.initialize();
        if (!initSuccess) return false;
      }

      console.log("🎯 AdMob: Preparing production interstitial ad...");
      
      const preparePromise = AdMob.prepareInterstitial({
        adId: this.INTERSTITIAL_ID,
        isTesting: false // Production ads
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Interstitial prepare timeout')), 8000)
      );

      await Promise.race([preparePromise, timeoutPromise]);

      if (this.isDestroyed) {
        console.log("🛑 AdMob: Service destroyed before showing interstitial");
        return false;
      }

      await AdMob.showInterstitial();
      console.log("✅ AdMob: Interstitial ad displayed successfully!");
      return true;
      
    } catch (error) {
      console.error("❌ AdMob: Interstitial ad failed:", error);
      return false;
    }
  }

  async hideBanner(): Promise<void> {
    if (!this.isNativePlatform || !this.bannerShown) return;

    try {
      await AdMob.hideBanner();
      this.bannerShown = false;
      console.log("✅ AdMob: Banner hidden");
    } catch (error) {
      console.error("❌ AdMob: Failed to hide banner:", error);
    }
  }

  async showInterstitialAfterDelay(delayMs: number = 2000): Promise<void> {
    if (!this.isNativePlatform) return;

    setTimeout(async () => {
      if (!this.isDestroyed) {
        const success = await this.showInterstitial();
        if (success) {
          console.log("✅ AdMob: Delayed interstitial shown");
        }
      }
    }, delayMs);
  }

  isReady(): boolean {
    return this.isInitialized && this.isNativePlatform && !this.initializationFailed && !this.isDestroyed;
  }

  getStatus() {
    return {
      isNativePlatform: this.isNativePlatform,
      isInitialized: this.isInitialized,
      initializationAttempted: this.initializationAttempted,
      initializationFailed: this.initializationFailed,
      isDestroyed: this.isDestroyed,
      bannerShown: this.bannerShown,
      appId: this.APP_ID,
      bannerId: this.BANNER_ID,
      interstitialId: this.INTERSTITIAL_ID
    };
  }

  resetFailedState() {
    if (!this.isDestroyed) {
      this.initializationFailed = false;
      this.initializationAttempted = false;
      this.isInitialized = false;
      this.bannerShown = false;
    }
  }

  destroy() {
    console.log("🧹 AdMob: Cleaning up service...");
    this.isDestroyed = true;
    this.isInitialized = false;
    this.initializationAttempted = false;
    this.initializationFailed = false;
    this.bannerShown = false;
  }
}

export const enhancedAdMobService = new EnhancedAdMobService();
