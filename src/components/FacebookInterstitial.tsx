
import { Button } from '@/components/ui/button';
import { useFacebookAds } from '../hooks/useFacebookAds';
import { Play, Zap } from 'lucide-react';

interface FacebookInterstitialProps {
  onAdClosed?: () => void;
  trigger?: 'button' | 'auto';
  delay?: number;
}

const FacebookInterstitial = ({ onAdClosed, trigger = 'button', delay = 0 }: FacebookInterstitialProps) => {
  const { isReady, showInterstitial, error, status } = useFacebookAds();

  const handleShowAd = async () => {
    if (!isReady || !status.isNativePlatform) {
      console.log('❌ FacebookInterstitial: Not ready or not native platform');
      return;
    }

    try {
      console.log('🎯 FacebookInterstitial: Showing interstitial ad...');
      const success = await showInterstitial();
      
      if (success) {
        console.log('✅ FacebookInterstitial: Ad shown successfully');
        onAdClosed?.();
      } else {
        console.log('❌ FacebookInterstitial: Failed to show ad');
      }
    } catch (err) {
      console.error('💥 FacebookInterstitial Error:', err);
    }
  };

  if (trigger === 'auto') {
    setTimeout(handleShowAd, delay);
    return null;
  }

  if (!status.isNativePlatform) {
    return (
      <Button variant="outline" disabled>
        🌐 Facebook Ad (Mobile Only)
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleShowAd} 
      disabled={!isReady}
      className="bg-blue-500 hover:bg-blue-600 text-white"
    >
      {isReady ? (
        <>
          <Play className="w-4 h-4 mr-2" />
          Show Facebook Ad
        </>
      ) : (
        <>
          <Zap className="w-4 h-4 mr-2 animate-spin" />
          Loading...
        </>
      )}
    </Button>
  );
};

export default FacebookInterstitial;
