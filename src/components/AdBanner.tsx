
import { useEffect } from 'react';
import { useAdMobService } from '../hooks/useAdMobService';
import { BannerAdPosition } from '@capacitor-community/admob';

interface AdBannerProps {
  position?: BannerAdPosition;
  autoShow?: boolean;
}

const AdBanner = ({ position = BannerAdPosition.BOTTOM_CENTER, autoShow = true }: AdBannerProps) => {
  const { isReady, showBanner, error, isNativePlatform } = useAdMobService();

  useEffect(() => {
    if (autoShow && isReady && isNativePlatform) {
      console.log('🎯 AdBanner: Auto-showing banner ad...');
      showBanner(position);
    }
  }, [isReady, isNativePlatform, autoShow, showBanner, position]);

  if (!isNativePlatform) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-blue-100 p-2 text-center text-sm text-blue-800 z-50">
        🌐 Web Mode - Ads will show on mobile device
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-red-100 p-2 text-center text-sm text-red-800 z-50">
        ❌ Ad Error: {error}
      </div>
    );
  }

  return null;
};

export default AdBanner;
