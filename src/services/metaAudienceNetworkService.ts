
import { Capacitor } from '@capacitor/core';

declare global {
  interface Window {
    MetaAudienceNetwork: any;
  }
}

class MetaAudienceNetworkService {
  private isInitialized = false;
  private bannerShown = false;
  
  // Meta Audience Network IDs
  private readonly APP_ID = '1160387479246621';
  private readonly INTERSTITIAL_PLACEMENT_ID = '1160387479246621_1161152762503426';
  private readonly BANNER_PLACEMENT_ID = '1160387479246621_1164434622175240';

  async initialize(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) {
      console.log('🌐 Meta Audience Network: Web platform - ads disabled');
      return false;
    }

    if (this.isInitialized) {
      console.log('✅ Meta Audience Network: Already initialized');
      return true;
    }

    try {
      console.log('🚀 Meta Audience Network: Starting initialization...');
      console.log('📱 App ID:', this.APP_ID);
      
      if (window.MetaAudienceNetwork) {
        await window.MetaAudienceNetwork.initialize({
          appId: this.APP_ID,
          testMode: false
        });

        this.isInitialized = true;
        console.log('✅ Meta Audience Network: Initialization successful!');
        
        // Auto-load banner after 2 seconds
        setTimeout(() => {
          this.showBanner();
        }, 2000);
        
        return true;
      } else {
        console.error('❌ Meta Audience Network plugin not found');
        return false;
      }
    } catch (error) {
      console.error('❌ Meta Audience Network initialization failed:', error);
      return false;
    }
  }

  async showBanner(): Promise<boolean> {
    if (!this.isInitialized || !Capacitor.isNativePlatform()) {
      console.log('❌ Meta Audience Network: Not ready for banner');
      return false;
    }

    if (this.bannerShown) {
      console.log('✅ Meta Audience Network: Banner already showing');
      return true;
    }

    try {
      console.log('🎯 Meta Audience Network: Loading banner ad...');
      
      if (window.MetaAudienceNetwork) {
        await window.MetaAudienceNetwork.showBanner({
          placementId: this.BANNER_PLACEMENT_ID,
          position: 'bottom'
        });

        this.bannerShown = true;
        console.log('✅ Meta Audience Network: Banner displayed!');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Meta Audience Network: Banner failed:', error);
      return false;
    }
  }

  async showInterstitial(): Promise<boolean> {
    if (!this.isInitialized || !Capacitor.isNativePlatform()) {
      console.log('❌ Meta Audience Network: Not ready for interstitial');
      return false;
    }

    try {
      console.log('🎯 Meta Audience Network: Loading interstitial ad...');
      
      if (window.MetaAudienceNetwork) {
        // Load and immediately show interstitial
        await window.MetaAudienceNetwork.loadInterstitial({
          placementId: this.INTERSTITIAL_PLACEMENT_ID
        });

        await window.MetaAudienceNetwork.showInterstitial({
          placementId: this.INTERSTITIAL_PLACEMENT_ID
        });
        
        console.log('✅ Meta Audience Network: Interstitial displayed!');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Meta Audience Network: Interstitial failed:', error);
      return false;
    }
  }

  async hideBanner(): Promise<void> {
    if (this.bannerShown && Capacitor.isNativePlatform()) {
      try {
        if (window.MetaAudienceNetwork) {
          await window.MetaAudienceNetwork.hideBanner();
          this.bannerShown = false;
          console.log('✅ Meta Audience Network: Banner hidden');
        }
      } catch (error) {
        console.error('❌ Meta Audience Network: Hide banner failed:', error);
      }
    }
  }

  getStatus() {
    return {
      isInitialized: this.isInitialized,
      bannerShown: this.bannerShown,
      isNativePlatform: Capacitor.isNativePlatform(),
      appId: this.APP_ID,
      interstitialPlacementId: this.INTERSTITIAL_PLACEMENT_ID,
      bannerPlacementId: this.BANNER_PLACEMENT_ID
    };
  }
}

export const metaAudienceNetworkService = new MetaAudienceNetworkService();
