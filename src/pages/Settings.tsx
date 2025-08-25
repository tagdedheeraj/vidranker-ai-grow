
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useForceAdMob } from "../hooks/useForceAdMob";
import { 
  Settings as SettingsIcon, 
  Smartphone, 
  Zap, 
  Eye, 
  EyeOff, 
  Play, 
  RefreshCw,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import AdMobStatus from "../components/AdMobStatus";

const Settings = () => {
  const { 
    isReady, 
    isLoading, 
    bannerShown, 
    error, 
    forceBanner, 
    forceInterstitial, 
    hideBanner,
    status
  } = useForceAdMob();

  const handleForceBanner = async () => {
    console.log('🔥 Settings: FORCE BANNER BUTTON CLICKED!');
    const success = await forceBanner();
    console.log('🔥 Settings: Force banner result:', success ? 'SUCCESS ✅' : 'FAILED ❌');
  };

  const handleForceInterstitial = async () => {
    console.log('🔥 Settings: FORCE INTERSTITIAL BUTTON CLICKED!');
    const success = await forceInterstitial();
    console.log('🔥 Settings: Force interstitial result:', success ? 'SUCCESS ✅' : 'FAILED ❌');
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* FORCE AdMob Testing Section */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            🔥 FORCE AdMob Testing - POWERFUL MODE
          </CardTitle>
          <CardDescription className="text-red-600">
            यह section ads को force load करता है - guaranteed results!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Badge variant={status.isNativePlatform ? "default" : "secondary"}>
              {status.isNativePlatform ? "📱 Native" : "🌐 Web"}
            </Badge>
            <Badge variant={isReady ? "default" : "destructive"}>
              {isReady ? "✅ Ready" : isLoading ? "🔄 Loading" : "❌ Not Ready"}
            </Badge>
            <Badge variant={bannerShown ? "default" : "secondary"}>
              {bannerShown ? "👁️ Banner ON" : "👁️‍🗨️ Banner OFF"}
            </Badge>
            <Badge variant="outline">
              Platform: {status.platform}
            </Badge>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                🚨 Error: {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Success Display */}
          {isReady && !error && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                ✅ AdMob READY! Force loading enabled.
              </AlertDescription>
            </Alert>
          )}

          {/* Platform Check */}
          {status.isNativePlatform ? (
            <div className="space-y-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="text-green-800 font-medium mb-2">
                  🚀 Native Platform Detected - Ads Will Work!
                </div>
                <div className="text-sm text-green-700">
                  Platform: {status.platform} | Ready: {isReady ? 'YES' : 'NO'}
                </div>
              </div>

              {/* Force Ad Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button 
                  onClick={handleForceBanner}
                  disabled={!isReady}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  size="lg"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  🔥 FORCE BANNER AD
                </Button>

                <Button 
                  onClick={hideBanner}
                  disabled={!bannerShown}
                  variant="outline"
                  size="lg"
                >
                  <EyeOff className="w-4 h-4 mr-2" />
                  Hide Banner
                </Button>

                <Button 
                  onClick={handleForceInterstitial}
                  disabled={!isReady}
                  className="bg-green-500 hover:bg-green-600 text-white col-span-1 md:col-span-2"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  🔥 FORCE INTERSTITIAL AD
                </Button>
              </div>

              {/* AdMob Configuration Display */}
              <div className="bg-gray-100 p-4 rounded-lg text-sm">
                <div className="font-medium mb-2">🎯 AdMob Configuration:</div>
                <div className="space-y-1">
                  <div>App ID: ca-app-pub-2211398170597117~9683407494</div>
                  <div>Banner ID: ca-app-pub-2211398170597117/2547153500</div>
                  <div>Interstitial ID: ca-app-pub-2211398170597117/8371175883</div>
                  <div>Mode: Production (Real Ads)</div>
                </div>
              </div>
            </div>
          ) : (
            <Alert>
              <Smartphone className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-medium">Web Browser - Ads Won't Show</div>
                  <div className="text-sm">
                    To test ads, you need to:
                  </div>
                  <ol className="text-sm list-decimal list-inside space-y-1">
                    <li>Export project to GitHub</li>
                    <li>Run: <code className="bg-muted px-1 rounded">npx cap add android</code></li>
                    <li>Build and run on Android device</li>
                  </ol>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Original AdMob Status Component */}
      <AdMobStatus />
    </div>
  );
};

export default Settings;
