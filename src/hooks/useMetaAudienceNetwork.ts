
import { useState, useEffect, useCallback } from 'react';
import { metaAudienceNetworkService } from '../services/metaAudienceNetworkService';

export const useMetaAudienceNetwork = () => {
  const [isReady, setIsReady] = useState(false);
  const [bannerShown, setBannerShown] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAds = async () => {
      try {
        console.log('🔄 Starting Meta Audience Network initialization...');
        const success = await metaAudienceNetworkService.initialize();
        setIsReady(success);
        
        if (success) {
          console.log('✅ Meta Audience Network ready!');
          setError(null);
          
          // Check banner status
          const status = metaAudienceNetworkService.getStatus();
          setBannerShown(status.bannerShown);
        } else {
          setError('Meta Audience Network initialization failed');
        }
      } catch (err) {
        console.error('❌ Meta Audience Network Error:', err);
        setError('Meta Audience Network error occurred');
        setIsReady(false);
      }
    };

    initAds();
  }, []);

  const showBanner = useCallback(async () => {
    try {
      const success = await metaAudienceNetworkService.showBanner();
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
      return await metaAudienceNetworkService.showInterstitial();
    } catch (err) {
      console.error('❌ Interstitial error:', err);
      setError('Interstitial show failed');
      return false;
    }
  }, []);

  const hideBanner = useCallback(async () => {
    try {
      await metaAudienceNetworkService.hideBanner();
      setBannerShown(false);
    } catch (err) {
      console.error('❌ Hide banner error:', err);
    }
  }, []);

  const status = metaAudienceNetworkService.getStatus();

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
