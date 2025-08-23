
import { useState, useEffect, useCallback } from 'react';
import { enhancedAdMobService } from '../services/enhancedAdMobService';
import { BannerAdPosition } from '@capacitor-community/admob';

export const useAdMob = () => {
  const [isReady, setIsReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [bannerShown, setBannerShown] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAdMob = async () => {
      if (enhancedAdMobService.isReady()) {
        setIsReady(true);
        return;
      }

      setIsInitializing(true);
      setError(null);

      try {
        const success = await enhancedAdMobService.initialize();
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

    initializeAdMob();
  }, []);

  const showBanner = useCallback(async (position?: BannerAdPosition) => {
    if (!isReady) return false;
    
    try {
      const success = await enhancedAdMobService.showBanner(position);
      setBannerShown(success);
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Banner show failed');
      return false;
    }
  }, [isReady]);

  const showInterstitial = useCallback(async () => {
    if (!isReady) return false;
    
    try {
      return await enhancedAdMobService.showInterstitial();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Interstitial show failed');
      return false;
    }
  }, [isReady]);

  const hideBanner = useCallback(async () => {
    try {
      await enhancedAdMobService.hideBanner();
      setBannerShown(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Banner hide failed');
    }
  }, []);

  const showInterstitialAfterDelay = useCallback((delayMs?: number) => {
    enhancedAdMobService.showInterstitialAfterDelay(delayMs);
  }, []);

  return {
    isReady,
    isInitializing,
    bannerShown,
    error,
    showBanner,
    showInterstitial,
    hideBanner,
    showInterstitialAfterDelay,
    getStatus: () => enhancedAdMobService.getStatus()
  };
};
