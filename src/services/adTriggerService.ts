
import { BannerAdPosition } from '@capacitor-community/admob';

class AdTriggerService {
  private adMobService: any;
  private lastInterstitialTime = 0;
  private readonly INTERSTITIAL_COOLDOWN = 30000; // 30 seconds

  setAdMobService(service: any) {
    this.adMobService = service;
  }

  async showBannerOnPageLoad() {
    if (!this.adMobService?.isReady || !this.adMobService?.isNativePlatform) {
      console.log('🚫 AdTrigger: AdMob not ready for banner');
      return false;
    }

    try {
      console.log('🎯 AdTrigger: Showing banner on page load...');
      const success = await this.adMobService.showBanner(BannerAdPosition.BOTTOM_CENTER);
      
      if (success) {
        console.log('✅ AdTrigger: Banner shown successfully');
      } else {
        console.log('❌ AdTrigger: Banner failed to show');
      }
      
      return success;
    } catch (error) {
      console.error('💥 AdTrigger Banner Error:', error);
      return false;
    }
  }

  async showInterstitialOnAction(actionName: string = 'user_action') {
    if (!this.adMobService?.isReady || !this.adMobService?.isNativePlatform) {
      console.log('🚫 AdTrigger: AdMob not ready for interstitial');
      return false;
    }

    // Check cooldown
    const now = Date.now();
    if (now - this.lastInterstitialTime < this.INTERSTITIAL_COOLDOWN) {
      console.log('⏰ AdTrigger: Interstitial in cooldown period');
      return false;
    }

    try {
      console.log(`🎯 AdTrigger: Showing interstitial for action: ${actionName}`);
      const success = await this.adMobService.showInterstitial();
      
      if (success) {
        this.lastInterstitialTime = now;
        console.log('✅ AdTrigger: Interstitial shown successfully');
      } else {
        console.log('❌ AdTrigger: Interstitial failed to show');
      }
      
      return success;
    } catch (error) {
      console.error('💥 AdTrigger Interstitial Error:', error);
      return false;
    }
  }

  async showInterstitialWithDelay(delayMs: number = 2000, actionName?: string) {
    setTimeout(() => {
      this.showInterstitialOnAction(actionName || 'delayed_action');
    }, delayMs);
  }
}

export const adTriggerService = new AdTriggerService();
