
import { useState, useEffect, useCallback } from 'react';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';
import { adMobInit } from '../services/adMobInit';

export const useAdMobService = () => {
  const [isReady, setIsReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bannerShown, setBannerShown] = useState(false);

  useEffect(() => {
    const initAdMob = async () => {
      if (!Capacitor.isNativePlatform()) {
        setError('AdMob only works on mobile devices');
        return;
      }

      setIsInitializing(true);
      setError(null);

      try {
        const success = await adMobInit.initialize();
        setIsReady(success);
        
        if (!success) {
          setError('AdMob initialization failed');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown AdMob error');
        setIsReady(false);
      } finally {
        setIsInitializing(false);
      }
    };

    initAdMob();
  }, []);

  const showBanner = useCallback(async (position: BannerAdPosition = BannerAdPosition.BOTTOM_CENTER): Promise<boolean> => {
    if (!isReady || !Capacitor.isNativePlatform()) {
      setError('AdMob not ready or not on mobile device');
      return false;
    }

    try {
      const config = adMobInit.getConfig();
      const bannerOptions: BannerAdOptions = {
        adId: config.bannerId,
        adSize: BannerAdSize.BANNER,
        position: position,
        margin: 0,
        isTesting: config.isTestMode
      };

      await AdMob.showBanner(bannerOptions);
      setBannerShown(true);
      setError(null);
      console.log('✅ AdMob: Banner shown successfully');
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Banner show failed';
      setError(errorMsg);
      console.error('❌ AdMob: Banner error:', errorMsg);
      return false;
    }
  }, [isReady]);

  const showInterstitial = useCallback(async (): Promise<boolean> => {
    if (!isReady || !Capacitor.isNativePlatform()) {
      setError('AdMob not ready or not on mobile device');
      return false;
    }

    try {
      const config = adMobInit.getConfig();
      
      await AdMob.prepareInterstitial({
        adId: config.interstitialId,
        isTesting: config.isTestMode
      });

      await AdMob.showInterstitial();
      setError(null);
      console.log('✅ AdMob: Interstitial shown successfully');
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Interstitial show failed';
      setError(errorMsg);
      console.error('❌ AdMob: Interstitial error:', errorMsg);
      return false;
    }
  }, [isReady]);

  const hideBanner = useCallback(async (): Promise<void> => {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await AdMob.hideBanner();
      setBannerShown(false);
      console.log('✅ AdMob: Banner hidden');
    } catch (err) {
      console.error('❌ AdMob: Hide banner error:', err);
    }
  }, []);

  return {
    isReady,
    isInitializing,
    bannerShown,
    error,
    showBanner,
    showInterstitial,
    hideBanner,
    isNativePlatform: Capacitor.isNativePlatform()
  };
};
