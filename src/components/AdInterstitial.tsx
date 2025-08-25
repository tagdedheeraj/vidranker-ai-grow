
import { Button } from '@/components/ui/button';
import { useAdMobService } from '../hooks/useAdMobService';
import { Play, Zap } from 'lucide-react';

interface AdInterstitialProps {
  onAdClosed?: () => void;
  trigger?: 'button' | 'auto';
  delay?: number;
}

const AdInterstitial = ({ onAdClosed, trigger = 'button', delay = 0 }: AdInterstitialProps) => {
  const { isReady, showInterstitial, error, isNativePlatform } = useAdMobService();

  const handleShowAd = async () => {
    if (!isReady || !isNativePlatform) {
      console.log('❌ AdInterstitial: Not ready or not native platform');
      return;
    }

    try {
      console.log('🎯 AdInterstitial: Showing interstitial ad...');
      const success = await showInterstitial();
      
      if (success) {
        console.log('✅ AdInterstitial: Ad shown successfully');
        onAdClosed?.();
      } else {
        console.log('❌ AdInterstitial: Failed to show ad');
      }
    } catch (err) {
      console.error('💥 AdInterstitial Error:', err);
    }
  };

  if (trigger === 'auto') {
    setTimeout(handleShowAd, delay);
    return null;
  }

  if (!isNativePlatform) {
    return (
      <Button variant="outline" disabled>
        🌐 Interstitial (Mobile Only)
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleShowAd} 
      disabled={!isReady}
      className="bg-green-500 hover:bg-green-600 text-white"
    >
      {isReady ? (
        <>
          <Play className="w-4 h-4 mr-2" />
          Show Ad
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

export default AdInterstitial;
