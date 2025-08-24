
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAdMobService } from '../hooks/useAdMobService';
import { RefreshCw, Eye, EyeOff, Smartphone, Wifi, AlertCircle } from 'lucide-react';
import { BannerAdPosition } from '@capacitor-community/admob';

const AdMobStatus = () => {
  const { 
    isReady, 
    isInitializing, 
    bannerShown, 
    error, 
    showBanner, 
    showInterstitial, 
    hideBanner,
    isNativePlatform
  } = useAdMobService();

  const handleShowBanner = async () => {
    await showBanner(BannerAdPosition.BOTTOM_CENTER);
  };

  const handleShowInterstitial = async () => {
    await showInterstitial();
  };

  const handleHideBanner = async () => {
    await hideBanner();
  };

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            AdMob Status & Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant={isNativePlatform ? "default" : "secondary"}>
              {isNativePlatform ? "📱 Native App" : "🌐 Web Browser"}
            </Badge>
            <Badge variant={isReady ? "default" : "destructive"}>
              {isReady ? "✅ AdMob Ready" : "❌ Not Ready"}
            </Badge>
            <Badge variant={isInitializing ? "default" : "secondary"}>
              {isInitializing ? "🔄 Initializing" : "⏸️ Idle"}
            </Badge>
            <Badge variant={bannerShown ? "default" : "secondary"}>
              {bannerShown ? "👁️ Banner Active" : "👁️‍🗨️ Banner Hidden"}
            </Badge>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Platform-specific Content */}
          {isNativePlatform ? (
            <div className="space-y-4">
              {/* Ad Unit Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-medium">App Configuration:</div>
                  <div>App ID: ca-app-pub-2211398170597117~9683407494</div>
                  <div>Mode: Production</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Ad Units:</div>
                  <div>Banner: ca-app-pub-2211398170597117/2547153500</div>
                  <div>Interstitial: ca-app-pub-2211398170597117/8371175883</div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={handleShowBanner} 
                  disabled={!isReady || bannerShown || isInitializing}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Show Banner
                </Button>
                <Button 
                  onClick={handleHideBanner} 
                  disabled={!bannerShown}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <EyeOff className="w-4 h-4" />
                  Hide Banner
                </Button>
                <Button 
                  onClick={handleShowInterstitial} 
                  disabled={!isReady || isInitializing}
                  variant="secondary"
                  size="sm"
                >
                  📺 Show Interstitial
                </Button>
              </div>
            </div>
          ) : (
            <Alert>
              <Smartphone className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-medium">AdMob requires Native Mobile App</div>
                  <div className="text-sm">
                    To see ads, you need to:
                  </div>
                  <ol className="text-sm list-decimal list-inside space-y-1">
                    <li>Export project to GitHub</li>
                    <li>Run: <code className="bg-muted px-1 rounded">npx cap add android</code></li>
                    <li>Configure AndroidManifest.xml</li>
                    <li>Build and run on Android device</li>
                  </ol>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdMobStatus;
