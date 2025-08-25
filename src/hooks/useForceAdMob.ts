
import { useState, useEffect, useCallback } from 'react';
import { forceAdMobService } from '../services/forceAdMobService';

export const useForceAdMob = () => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bannerShown, setBannerShown] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAds = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('🔥 useForceAdMob: FORCE initializing...');
        
        const success = await forceAdMobService.forceInitialize();
        
        if (success) {
          setIsReady(true);
          console.log('✅ useForceAdMob: READY FOR ADS!');
          
          // Auto-load banner after 2 seconds
          setTimeout(async () => {
            const bannerSuccess = await forceAdMobService.retryBannerLoad();
            setBannerShown(bannerSuccess);
            
            if (bannerSuccess) {
              console.log('🎉 useForceAdMob: AUTO BANNER LOADED!');
            }
          }, 2000);
          
        } else {
          setError('AdMob force initialization failed');
        }
        
      } catch (err) {
        console.error('💥 useForceAdMob: Error:', err);
        setError('AdMob error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAds();
  }, []);

  const forceBanner = useCallback(async (): Promise<boolean> => {
    try {
      console.log('🔥 useForceAdMob: Manual banner force load...');
      const success = await forceAdMobService.retryBannerLoad();
      setBannerShown(success);
      
      if (success) {
        setError(null);
        console.log('🎉 Manual banner SUCCESS!');
      } else {
        setError('Banner force load failed');
      }
      
      return success;
    } catch (err) {
      console.error('💥 Banner force error:', err);
      setError('Banner force error');
      return false;
    }
  }, []);

  const forceInterstitial = useCallback(async (): Promise<boolean> => {
    try {
      console.log('🔥 useForceAdMob: Manual interstitial force load...');
      const success = await forceAdMobService.forceInterstitialLoad();
      
      if (success) {
        setError(null);
        console.log('🎉 Manual interstitial SUCCESS!');
      } else {
        setError('Interstitial force load failed');
      }
      
      return success;
    } catch (err) {
      console.error('💥 Interstitial force error:', err);
      setError('Interstitial force error');
      return false;
    }
  }, []);

  const hideBanner = useCallback(async () => {
    await forceAdMobService.hideBanner();
    setBannerShown(false);
  }, []);

  const status = forceAdMobService.getStatus();

  return {
    isReady,
    isLoading,
    bannerShown,
    error,
    forceBanner,
    forceInterstitial,
    hideBanner,
    status
  };
};
