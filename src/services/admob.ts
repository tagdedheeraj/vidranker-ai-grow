import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

class AdMobService {
  private isInitialized = false;
  private initializationAttempted = false;
  private isNativePlatform = false;
  private initializationFailed = false;
  private isDestroyed = false;

  constructor() {
    this.isNativePlatform = Capacitor.isNativePlatform();
    console.log('AdMobService: Platform detected:', Capacitor.getPlatform());
    
    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers() {
    window.addEventListener('error', (event) => {
      console.error('Global JavaScript error caught:', event.error);
      event.preventDefault();
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection caught:', event.reason);
      event.preventDefault();
    });
  }

  async initialize() {
    if (this.initializationAttempted || !this.isNativePlatform || this.isDestroyed) {
      console.log('AdMobService: Skipping initialization - already attempted, not native platform, or destroyed');
      return;
    }
    
    this.initializationAttempted = true;

    try {
      console.log("AdMobService: Starting optimized initialization...");
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (this.isDestroyed) {
        console.log("AdMobService: Service destroyed during initialization");
        return;
      }

      const initPromise = AdMob.initialize({
        testingDevices: [],
        initializeForTesting: false,
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('AdMob initialization timeout')), 8000)
      );

      await Promise.race([initPromise, timeoutPromise]);

      this.isInitialized = true;
      this.initializationFailed = false;
      console.log("AdMobService: Initialized successfully - ready for vidranker.space domain verification");
    } catch (error) {
      console.error("AdMobService: Initialization failed (app continues safely):", error);
      this.isInitialized = false;
      this.initializationFailed = true;
    }
  }

  async showBanner() {
    if (!this.isNativePlatform || this.initializationFailed || this.isDestroyed) {
      console.log("AdMobService: Skipping banner - not native platform, init failed, or destroyed");
      return false;
    }

    try {
      if (!this.isInitialized) {
        console.log("AdMobService: Attempting safe initialization for banner...");
        await this.initialize();
      }

      if (!this.isInitialized || this.initializationFailed || this.isDestroyed) {
        console.log("AdMobService: Cannot show banner - initialization failed or service destroyed");
        return false;
      }

      const bannerOptions: BannerAdOptions = {
        adId: 'ca-app-pub-8658337038682012/4284962341',
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: false
      };

      const bannerPromise = AdMob.showBanner(bannerOptions);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Banner timeout')), 6000)
      );

      await Promise.race([bannerPromise, timeoutPromise]);
      console.log("AdMobService: Live banner ad displayed - domain verification active");
      return true;
    } catch (error) {
      console.error("AdMobService: Banner ad failed (app continues safely):", error);
      return false;
    }
  }

  async showInterstitial() {
    if (!this.isNativePlatform || this.initializationFailed || this.isDestroyed) {
      console.log("AdMobService: Skipping interstitial - not native platform, init failed, or destroyed");
      return false;
    }

    try {
      if (!this.isInitialized) {
        console.log("AdMobService: Attempting safe initialization for interstitial...");
        await this.initialize();
      }

      if (!this.isInitialized || this.initializationFailed || this.isDestroyed) {
        console.log("AdMobService: Cannot show interstitial - initialization failed or service destroyed");
        return false;
      }

      const preparePromise = AdMob.prepareInterstitial({
        adId: 'ca-app-pub-8658337038682012/8733110296',
        isTesting: false
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Interstitial prepare timeout')), 6000)
      );

      await Promise.race([preparePromise, timeoutPromise]);

      if (this.isDestroyed) {
        console.log("AdMobService: Service destroyed before showing interstitial");
        return false;
      }

      await AdMob.showInterstitial();
      console.log("AdMobService: Live interstitial ad displayed - domain verification active");
      return true;
    } catch (error) {
      console.error("AdMobService: Interstitial ad failed (app continues safely):", error);
      return false;
    }
  }

  async hideBanner() {
    if (!this.isNativePlatform || this.initializationFailed || this.isDestroyed) {
      return;
    }

    try {
      if (this.isInitialized && !this.isDestroyed) {
        await AdMob.hideBanner();
        console.log("AdMobService: Banner hidden safely");
      }
    } catch (error) {
      console.error("AdMobService: Failed to hide banner (app continues safely):", error);
    }
  }

  async showInterstitialAfterAction() {
    if (!this.isNativePlatform || this.initializationFailed || this.isDestroyed) {
      return;
    }

    setTimeout(async () => {
      if (!this.isDestroyed) {
        const success = await this.showInterstitial();
        if (!success) {
          console.log("AdMobService: Interstitial not shown, app continues normally");
        }
      }
    }, 1000);
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
      isDestroyed: this.isDestroyed
    };
  }

  resetFailedState() {
    if (!this.isDestroyed) {
      this.initializationFailed = false;
      this.initializationAttempted = false;
      this.isInitialized = false;
    }
  }

  // Safe cleanup method
  destroy() {
    console.log("AdMobService: Cleaning up safely...");
    this.isDestroyed = true;
    this.isInitialized = false;
    this.initializationAttempted = false;
    this.initializationFailed = false;
  }
}

export const adMobService = new AdMobService();
