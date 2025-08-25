
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, Image, TrendingUp, Zap, Play, ArrowRight, Star } from "lucide-react";
import { getSavedContent } from "@/utils/localStorage";
import { useState, useEffect } from "react";
import { useAdMobService } from "@/hooks/useAdMobService";
import AdBanner from "@/components/AdBanner";
import AdInterstitial from "@/components/AdInterstitial";
import { adTriggerService } from "@/services/adTriggerService";

const Home = () => {
  const [savedCount, setSavedCount] = useState(0);
  const { isReady, showBanner, showInterstitial, error, isNativePlatform } = useAdMobService();

  useEffect(() => {
    setSavedCount(getSavedContent().length);
  }, []);

  useEffect(() => {
    // Set up ad trigger service
    adTriggerService.setAdMobService({ isReady, showBanner, showInterstitial, isNativePlatform });
    
    // Show banner when page loads and AdMob is ready
    if (isReady && isNativePlatform) {
      console.log('🏠 Home: AdMob ready, triggering banner...');
      adTriggerService.showBannerOnPageLoad();
    }
  }, [isReady, showBanner, showInterstitial, isNativePlatform]);

  const handleFeatureClick = async (href: string, featureName: string) => {
    console.log(`🎯 Home: User clicked ${featureName}, showing interstitial...`);
    
    // Show interstitial ad when user navigates to a feature
    if (isReady && isNativePlatform) {
      await adTriggerService.showInterstitialOnAction(`feature_click_${featureName}`);
    }
  };

  const features = [
    {
      icon: Search,
      title: "AI SEO Tags",
      description: "Generate optimized tags and descriptions to improve discoverability",
      color: "text-blue-500",
      href: "/seo"
    },
    {
      icon: Image,
      title: "Custom Thumbnails",
      description: "Create eye-catching thumbnails designed to attract clicks",
      color: "text-green-500",
      href: "/thumbnails"
    },
    {
      icon: TrendingUp,
      title: "Boost Visibility",
      description: "Enhance your chances of getting more engagement and views",
      color: "text-purple-500",
      href: "/history"
    }
  ];

  const quickActions = [
    { name: "Generate SEO Content", icon: Zap, href: "/seo", color: "bg-blue-500" },
    { name: "Create Thumbnail", icon: Play, href: "/thumbnails", color: "bg-green-500" },
  ];

  return (
    <div className="space-y-8 pb-20 md:pb-8">
      {/* AdMob Banner Component */}
      <AdBanner autoShow={true} />

      {/* AdMob Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-4">
            <p className="text-red-600 text-sm">⚠️ AdMob Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {/* Platform Notice for Web Users */}
      {!isNativePlatform && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-4">
            <p className="text-blue-600 text-sm">
              🌐 You're viewing the web version. Download the mobile app to see ads and get the full experience!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Hero Section */}
      <div className="relative bg-gradient-primary rounded-2xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:60px_60px]" />
        </div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to VidRanker 🚀
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Boost your video growth with AI-powered SEO & Thumbnails
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.name} to={action.href}>
                  <Button 
                    className={`${action.color} hover:opacity-90 text-white`}
                    onClick={() => handleFeatureClick(action.href, action.name)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {action.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{savedCount}</div>
            <div className="text-sm text-muted-foreground">Saved Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">AI</div>
            <div className="text-sm text-muted-foreground">Powered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {isNativePlatform ? (isReady ? '✅' : '❌') : '🌐'}
            </div>
            <div className="text-sm text-muted-foreground">
              {isNativePlatform ? 'AdMob' : 'Web'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ad Test Section - Only show on native platform */}
      {isNativePlatform && (
        <Card className="glass border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Play className="w-5 h-5" />
              Test Ads (Mobile Only)
            </CardTitle>
            <CardDescription>
              Test banner and interstitial ads on your mobile device
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button 
                onClick={() => adTriggerService.showBannerOnPageLoad()}
                disabled={!isReady}
                variant="outline"
                className="flex-1"
              >
                Show Banner
              </Button>
              <AdInterstitial 
                onAdClosed={() => console.log('✅ Interstitial closed')}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Status: {isReady ? '✅ Ready to show ads' : '❌ AdMob not ready'}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} to={feature.href}>
                <Card 
                  className="glass hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  onClick={() => handleFeatureClick(feature.href, feature.title)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                    <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium">
                      Try it now <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tips Section */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Pro Tips for Creators
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="secondary">1</Badge>
            <p className="text-sm">Use trending keywords in your titles & descriptions</p>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary">2</Badge>
            <p className="text-sm">Design thumbnails with bright colors and clear text</p>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary">3</Badge>
            <p className="text-sm">Stay consistent and engage with your audience</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
