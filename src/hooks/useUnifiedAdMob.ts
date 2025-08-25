
import { useState, useEffect, useCallback } from 'react';
import { unifiedAdMobService } from '../services/unifiedAdMobService';

export const useUnifiedAdMob = () => {
  const [isReady, setIsReady] = useState(false);
  const [bannerShown, setBannerShown] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAds = async () => {
      try {
        console.log('🔄 Starting AdMob initialization...');
        const success = await unifiedAdMobService.initialize();
        setIsReady(success);
        
        if (success) {
          console.log('✅ AdMob ready!');
          setError(null);
          
          // Check banner status
          const status = unifiedAdMobService.getStatus();
          setBannerShown(status.bannerShown);
        } else {
          setError('AdMob initialization failed');
        }
      } catch (err) {
        console.error('❌ AdMob Error:', err);
        setError('AdMob error occurred');
        setIsReady(false);
      }
    };

    initAds();
  }, []);

  const showBanner = useCallback(async () => {
    try {
      const success = await unifiedAdMobService.showBanner();
      setBannerShown(success);
      return success;
    } catch (err) {
      console.error('❌ Banner error:', err);
      setError('Banner show failed');
      return false;
    }
  }, []);

  const showInterstitial = useCallback(async () => {
    try {
      return await unifiedAdMobService.showInterstitial();
    } catch (err) {
      console.error('❌ Interstitial error:', err);
      setError('Interstitial show failed');
      return false;
    }
  }, []);

  const hideBanner = useCallback(async () => {
    try {
      await unifiedAdMobService.hideBanner();
      setBannerShown(false);
    } catch (err) {
      console.error('❌ Hide banner error:', err);
    }
  }, []);

  const status = unifiedAdMobService.getStatus();

  return {
    isReady,
    bannerShown,
    error,
    showBanner,
    showInterstitial,
    hideBanner,
    status
  };
};
