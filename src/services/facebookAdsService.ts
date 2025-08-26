
import { Capacitor } from '@capacitor/core';

declare global {
  interface Window {
    FacebookAds: any;
  }
}

class FacebookAdsService {
  private isInitialized = false;
  private bannerShown = false;
  
  // आपकी Facebook Audience Network IDs
  private readonly APP_ID = '1160387479246621';
  private readonly INTERSTITIAL_PLACEMENT_ID = '1160387479246621_1161152762503426';

  async initialize(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) {
      console.log('🌐 Facebook Ads: Web platform - ads disabled');
      return false;
    }

    if (this.isInitialized) {
      console.log('✅ Facebook Ads: Already initialized');
      return true;
    }

    try {
      console.log('🚀 Facebook Ads: Starting initialization...');
      console.log('📱 App ID:', this.APP_ID);
      
      if (window.FacebookAds) {
        await window.FacebookAds.initialize({
          appId: this.APP_ID,
          testMode: false
        });

        this.isInitialized = true;
        console.log('✅ Facebook Ads: Initialization successful!');
        
        // Auto-load banner after 2 seconds
        setTimeout(() => {
          this.showBanner();
        }, 2000);
        
        return true;
      } else {
        console.error('❌ Facebook Ads plugin not found');
        return false;
      }
    } catch (error) {
      console.error('❌ Facebook Ads initialization failed:', error);
      return false;
    }
  }

  async showBanner(): Promise<boolean> {
    if (!this.isInitialized || !Capacitor.isNativePlatform()) {
      console.log('❌ Facebook Ads: Not ready for banner');
      return false;
    }

    if (this.bannerShown) {
      console.log('✅ Facebook Ads: Banner already showing');
      return true;
    }

    try {
      console.log('🎯 Facebook Ads: Loading banner ad...');
      
      if (window.FacebookAds) {
        await window.FacebookAds.showBanner({
          placementId: this.APP_ID + '_banner', // Banner placement ID
          position: 'bottom'
        });

        this.bannerShown = true;
        console.log('✅ Facebook Ads: Banner displayed!');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Facebook Ads: Banner failed:', error);
      return false;
    }
  }

  async showInterstitial(): Promise<boolean> {
    if (!this.isInitialized || !Capacitor.isNativePlatform()) {
      console.log('❌ Facebook Ads: Not ready for interstitial');
      return false;
    }

    try {
      console.log('🎯 Facebook Ads: Loading interstitial ad...');
      
      if (window.FacebookAds) {
        // Load interstitial
        await window.FacebookAds.loadInterstitial({
          placementId: this.INTERSTITIAL_PLACEMENT_ID
        });

        // Show interstitial
        await window.FacebookAds.showInterstitial({
          placementId: this.INTERSTITIAL_PLACEMENT_ID
        });
        
        console.log('✅ Facebook Ads: Interstitial displayed!');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Facebook Ads: Interstitial failed:', error);
      return false;
    }
  }

  async hideBanner(): Promise<void> {
    if (this.bannerShown && Capacitor.isNativePlatform()) {
      try {
        if (window.FacebookAds) {
          await window.FacebookAds.hideBanner();
          this.bannerShown = false;
          console.log('✅ Facebook Ads: Banner hidden');
        }
      } catch (error) {
        console.error('❌ Facebook Ads: Hide banner failed:', error);
      }
    }
  }

  getStatus() {
    return {
      isInitialized: this.isInitialized,
      bannerShown: this.bannerShown,
      isNativePlatform: Capacitor.isNativePlatform(),
      appId: this.APP_ID,
      interstitialPlacementId: this.INTERSTITIAL_PLACEMENT_ID
    };
  }
}

export const facebookAdsService = new FacebookAdsService();
