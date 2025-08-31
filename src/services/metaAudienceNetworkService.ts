
import { Capacitor } from '@capacitor/core';
import { MetaAudienceNetwork } from './metaAudienceNetworkPlugin';

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
      
      const result = await MetaAudienceNetwork.initialize({
        appId: this.APP_ID,
        testMode: false
      });

      this.isInitialized = result.success;
      
      if (this.isInitialized) {
        console.log('✅ Meta Audience Network: Initialization successful!');
        
        // Auto-load banner after 2 seconds
        setTimeout(() => {
          this.showBanner();
        }, 2000);
      } else {
        console.error('❌ Meta Audience Network initialization failed');
      }
      
      return this.isInitialized;
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
      
      const result = await MetaAudienceNetwork.showBanner({
        placementId: this.BANNER_PLACEMENT_ID,
        position: 'bottom'
      });

      this.bannerShown = result.success;
      
      if (this.bannerShown) {
        console.log('✅ Meta Audience Network: Banner displayed!');
      } else {
        console.error('❌ Meta Audience Network: Banner failed to load');
      }
      
      return this.bannerShown;
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
      
      // Load interstitial
      const loadResult = await MetaAudienceNetwork.loadInterstitial({
        placementId: this.INTERSTITIAL_PLACEMENT_ID
      });

      if (loadResult.success) {
        // Show interstitial immediately after loading
        const showResult = await MetaAudienceNetwork.showInterstitial({
          placementId: this.INTERSTITIAL_PLACEMENT_ID
        });
        
        if (showResult.success) {
          console.log('✅ Meta Audience Network: Interstitial displayed!');
          return true;
        } else {
          console.error('❌ Meta Audience Network: Interstitial show failed');
          return false;
        }
      } else {
        console.error('❌ Meta Audience Network: Interstitial load failed');
        return false;
      }
    } catch (error) {
      console.error('❌ Meta Audience Network: Interstitial failed:', error);
      return false;
    }
  }

  async hideBanner(): Promise<void> {
    if (this.bannerShown && Capacitor.isNativePlatform()) {
      try {
        await MetaAudienceNetwork.hideBanner();
        this.bannerShown = false;
        console.log('✅ Meta Audience Network: Banner hidden');
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
