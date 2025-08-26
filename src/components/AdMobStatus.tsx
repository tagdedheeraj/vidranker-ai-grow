
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useFacebookAds } from '../hooks/useFacebookAds';
import { RefreshCw, Eye, EyeOff, Smartphone, AlertCircle, Play } from 'lucide-react';

const AdMobStatus = () => {
  const { 
    isReady, 
    bannerShown, 
    error, 
    showBanner, 
    showInterstitial, 
    hideBanner,
    status
  } = useFacebookAds();

  const handleShowBanner = async () => {
    const success = await showBanner();
    console.log('🎯 Facebook Banner trigger result:', success);
  };

  const handleShowInterstitial = async () => {
    const success = await showInterstitial();
    console.log('🎯 Facebook Interstitial trigger result:', success);
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
            Facebook Ads Status & Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant={status.isNativePlatform ? "default" : "secondary"}>
              {status.isNativePlatform ? "📱 Native App" : "🌐 Web Browser"}
            </Badge>
            <Badge variant={isReady ? "default" : "destructive"}>
              {isReady ? "✅ Facebook Ads Ready" : "❌ Not Ready"}
            </Badge>
            <Badge variant={status.isInitializing ? "default" : "secondary"}>
              {status.isInitializing ? "🔄 Initializing" : "⏸️ Idle"}
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
          {status.isNativePlatform ? (
            <div className="space-y-4">
              {/* Ad Unit Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-medium">App Configuration:</div>
                  <div>App ID: 1160387479246621</div>
                  <div>Mode: Production</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Ad Units:</div>
                  <div>Interstitial: 1160387479246621_1161152762503426</div>
                </div>
              </div>

              {/* Enhanced Control Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={handleShowBanner} 
                  disabled={!isReady || status.isInitializing}
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
                  disabled={!isReady || status.isInitializing}
                  variant="secondary"
                  size="sm"
                  className="col-span-2"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Show Interstitial Ad
                </Button>
              </div>

              {/* Status Information */}
              <div className="bg-muted p-3 rounded-lg text-sm">
                <div className="font-medium mb-2">Real-time Status:</div>
                <div className="space-y-1">
                  <div>🔄 Initialization: {isReady ? 'Complete' : 'Pending'}</div>
                  <div>📱 Platform: {status.isNativePlatform ? 'Native Mobile' : 'Web Browser'}</div>
                  <div>🎯 Banner Status: {bannerShown ? 'Currently Showing' : 'Hidden/Not Loaded'}</div>
                  <div>⚡ Ready for Ads: {isReady && status.isNativePlatform ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>
          ) : (
            <Alert>
              <Smartphone className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-medium">Facebook Ads requires Native Mobile App</div>
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
