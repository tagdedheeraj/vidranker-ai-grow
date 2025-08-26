
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useFacebookAds } from "../hooks/useFacebookAds";
import { Eye, EyeOff, Play, Smartphone, AlertCircle, CheckCircle2 } from "lucide-react";

const FacebookAdsStatus = () => {
  const { isReady, bannerShown, error, showBanner, showInterstitial, hideBanner, status } = useFacebookAds();

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="w-5 h-5" />
          Facebook Audience Network Status
        </CardTitle>
        <CardDescription>
          Monitor and control Facebook ads in your app
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Information */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Facebook Ads Status</span>
            <Badge variant={isReady ? "default" : "secondary"} className="flex items-center gap-1">
              {isReady ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
              {isReady ? "Ready" : "Initializing"}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Platform</span>
            <Badge variant={status.isNativePlatform ? "default" : "outline"}>
              {status.isNativePlatform ? "Mobile" : "Web"}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Banner Status</span>
            <Badge variant={bannerShown ? "default" : "secondary"}>
              {bannerShown ? "Showing" : "Hidden"}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">App ID</span>
            <Badge variant="outline" className="text-xs font-mono">
              {status.appId}
            </Badge>
          </div>
        </div>
        
        <Separator />
        
        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Error: {error}</span>
            </div>
          </div>
        )}
        
        {/* Controls */}
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={showBanner} 
            disabled={!isReady || !status.isNativePlatform || bannerShown}
            size="sm"
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Show Banner
          </Button>
          
          <Button 
            onClick={hideBanner} 
            disabled={!isReady || !status.isNativePlatform || !bannerShown}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <EyeOff className="w-4 h-4" />
            Hide Banner
          </Button>
          
          <Button 
            onClick={showInterstitial} 
            disabled={!isReady || !status.isNativePlatform}
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Show Interstitial
          </Button>
        </div>
        
        {/* Web Notice */}
        {!status.isNativePlatform && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
              <Smartphone className="w-4 h-4" />
              <span className="text-sm">Facebook ads only work on mobile devices</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FacebookAdsStatus;
