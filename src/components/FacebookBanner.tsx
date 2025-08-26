
import { useEffect } from 'react';
import { useFacebookAds } from '../hooks/useFacebookAds';

interface FacebookBannerProps {
  autoShow?: boolean;
}

const FacebookBanner = ({ autoShow = true }: FacebookBannerProps) => {
  const { isReady, showBanner, error, status } = useFacebookAds();

  useEffect(() => {
    if (autoShow && isReady && status.isNativePlatform) {
      console.log('🎯 FacebookBanner: Auto-showing banner ad...');
      showBanner();
    }
  }, [isReady, status.isNativePlatform, autoShow, showBanner]);

  if (!status.isNativePlatform) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-blue-100 p-2 text-center text-sm text-blue-800 z-50">
        🌐 Web Mode - Facebook Ads will show on mobile device
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-red-100 p-2 text-center text-sm text-red-800 z-50">
        ❌ Facebook Ad Error: {error}
      </div>
    );
  }

  return null;
};

export default FacebookBanner;
