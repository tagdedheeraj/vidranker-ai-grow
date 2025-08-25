
import { useState, useEffect, useCallback } from 'react';
import { adMobService } from '../services/adMobService';

export const useAdMob = () => {
  const [isReady, setIsReady] = useState(false);
  const [bannerShown, setBannerShown] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAds = async () => {
      try {
        console.log('🔄 useAdMob: Initializing AdMob...');
        const success = await adMobService.initialize();
        setIsReady(success);
        
        if (success) {
          console.log('✅ useAdMob: AdMob ready!');
          setError(null);
        } else {
          setError('AdMob initialization failed');
        }
      } catch (err) {
        console.error('❌ useAdMob: Error:', err);
        setError('AdMob error occurred');
        setIsReady(false);
      }
    };

    initAds();
  }, []);

  const showBanner = useCallback(async () => {
    try {
      const success = await adMobService.loadAndShowBanner();
      setBannerShown(success);
      return success;
    } catch (err) {
      console.error('❌ useAdMob: Banner error:', err);
      setError('Banner show failed');
      return false;
    }
  }, []);

  const showInterstitial = useCallback(async () => {
    try {
      return await adMobService.loadAndShowInterstitial();
    } catch (err) {
      console.error('❌ useAdMob: Interstitial error:', err);
      setError('Interstitial show failed');
      return false;
    }
  }, []);

  const hideBanner = useCallback(async () => {
    try {
      await adMobService.hideBanner();
      setBannerShown(false);
    } catch (err) {
      console.error('❌ useAdMob: Hide banner error:', err);
    }
  }, []);

  return {
    isReady,
    bannerShown,
    error,
    showBanner,
    showInterstitial,
    hideBanner,
    status: adMobService.getStatus()
  };
};
