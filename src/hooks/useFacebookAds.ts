
import { useState, useEffect, useCallback } from 'react';
import { facebookAdsService } from '../services/facebookAdsService';

export const useFacebookAds = () => {
  const [isReady, setIsReady] = useState(false);
  const [bannerShown, setBannerShown] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAds = async () => {
      try {
        console.log('🔄 Starting Facebook Ads initialization...');
        const success = await facebookAdsService.initialize();
        setIsReady(success);
        
        if (success) {
          console.log('✅ Facebook Ads ready!');
          setError(null);
          
          // Check banner status
          const status = facebookAdsService.getStatus();
          setBannerShown(status.bannerShown);
        } else {
          setError('Facebook Ads initialization failed');
        }
      } catch (err) {
        console.error('❌ Facebook Ads Error:', err);
        setError('Facebook Ads error occurred');
        setIsReady(false);
      }
    };

    initAds();
  }, []);

  const showBanner = useCallback(async () => {
    try {
      const success = await facebookAdsService.showBanner();
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
      return await facebookAdsService.showInterstitial();
    } catch (err) {
      console.error('❌ Interstitial error:', err);
      setError('Interstitial show failed');
      return false;
    }
  }, []);

  const hideBanner = useCallback(async () => {
    try {
      await facebookAdsService.hideBanner();
      setBannerShown(false);
    } catch (err) {
      console.error('❌ Hide banner error:', err);
    }
  }, []);

  const status = facebookAdsService.getStatus();

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
