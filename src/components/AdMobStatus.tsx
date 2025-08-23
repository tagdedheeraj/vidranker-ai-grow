
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { enhancedAdMobService } from '../services/enhancedAdMobService';
import { useAdMob } from '../hooks/useAdMob';
import { RefreshCw, Eye, EyeOff } from 'lucide-react';

const AdMobStatus = () => {
  const [status, setStatus] = useState(enhancedAdMobService.getStatus());
  const { isReady, isInitializing, bannerShown, error, showBanner, showInterstitial, hideBanner } = useAdMob();

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(enhancedAdMobService.getStatus());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleShowBanner = async () => {
    await showBanner();
  };

  const handleShowInterstitial = async () => {
    await showInterstitial();
  };

  const handleHideBanner = async () => {
    await hideBanner();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5" />
          AdMob Status & Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant={status.isNativePlatform ? "default" : "secondary"}>
            {status.isNativePlatform ? "📱 Native" : "🌐 Web"}
          </Badge>
          <Badge variant={isReady ? "default" : "destructive"}>
            {isReady ? "✅ Ready" : "❌ Not Ready"}
          </Badge>
          <Badge variant={isInitializing ? "default" : "secondary"}>
            {isInitializing ? "🔄 Initializing" : "⏸️ Idle"}
          </Badge>
          <Badge variant={bannerShown ? "default" : "secondary"}>
            {bannerShown ? "👁️ Banner Shown" : "👁️‍🗨️ Banner Hidden"}
          </Badge>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">❌ Error: {error}</p>
          </div>
        )}

        {/* AdMob IDs */}
        <div className="space-y-2 text-sm">
          <div><strong>App ID:</strong> {status.appId}</div>
          <div><strong>Banner ID:</strong> {status.bannerId}</div>
          <div><strong>Interstitial ID:</strong> {status.interstitialId}</div>
        </div>

        {/* Control Buttons */}
        {status.isNativePlatform && (
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={handleShowBanner} 
              disabled={!isReady || bannerShown}
              size="sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              Show Banner
            </Button>
            <Button 
              onClick={handleHideBanner} 
              disabled={!bannerShown}
              variant="outline"
              size="sm"
            >
              <EyeOff className="w-4 h-4 mr-2" />
              Hide Banner
            </Button>
            <Button 
              onClick={handleShowInterstitial} 
              disabled={!isReady}
              variant="secondary"
              size="sm"
            >
              📺 Show Interstitial
            </Button>
          </div>
        )}

        {/* Web Platform Message */}
        {!status.isNativePlatform && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-700 text-sm">
              ℹ️ AdMob only works on mobile devices. Build and run on Android/iOS to see ads.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdMobStatus;
