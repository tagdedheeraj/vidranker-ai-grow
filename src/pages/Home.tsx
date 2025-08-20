
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, Image, TrendingUp, Zap, Play, ArrowRight, Star } from "lucide-react";
import { getSavedContent } from "@/utils/localStorage";
import { useState, useEffect } from "react";

const Home = () => {
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    setSavedCount(getSavedContent().length);
  }, []);

  const features = [
    {
      icon: Search,
      title: "AI SEO Tags",
      description: "Generate optimized tags and descriptions for maximum reach",
      color: "text-blue-500",
      href: "/seo"
    },
    {
      icon: Image,
      title: "Custom Thumbnails",
      description: "Create eye-catching thumbnails that drive clicks",
      color: "text-green-500",
      href: "/thumbnails"
    },
    {
      icon: TrendingUp,
      title: "Boost Growth",
      description: "Increase views, engagement, and subscriber growth",
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
            Boost Your YouTube Growth with AI-powered SEO and Thumbnails
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.name} to={action.href}>
                  <Button className={`${action.color} hover:opacity-90 text-white`}>
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
            <div className="text-2xl font-bold text-primary">∞</div>
            <div className="text-sm text-muted-foreground">Free Usage</div>
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
            <div className="text-2xl font-bold text-primary">Fast</div>
            <div className="text-sm text-muted-foreground">Generation</div>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} to={feature.href}>
                <Card className="glass hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
            Pro Tips for YouTube Success
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="secondary">1</Badge>
            <p className="text-sm">Use trending keywords in your titles and descriptions</p>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary">2</Badge>
            <p className="text-sm">Create thumbnails with bright colors and clear text</p>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="secondary">3</Badge>
            <p className="text-sm">Post consistently and engage with your audience</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
