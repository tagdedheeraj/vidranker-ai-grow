
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings2, Info, Heart, Github, Twitter, Star, Zap } from "lucide-react";
import { toast } from "sonner";
import { clearAllContent } from "@/utils/localStorage";

const Settings = () => {
  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all your saved data? This action cannot be undone.")) {
      clearAllContent();
      toast.success("All data cleared successfully");
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 gradient-text">
          Settings
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage your app preferences and data
        </p>
      </div>

      {/* App Info */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            App Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Version</span>
            <Badge variant="secondary">1.0.0</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Platform</span>
            <Badge variant="secondary">Web/Mobile</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">AI Powered</span>
            <Badge className="bg-gradient-primary text-white">
              <Zap className="w-3 h-3 mr-1" />
              Yes
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="w-5 h-5" />
            Data Management
          </CardTitle>
          <CardDescription>
            All your data is stored locally on your device for privacy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Local Storage</p>
              <p className="text-sm text-muted-foreground">Your content is saved on this device only</p>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-600">
              Private
            </Badge>
          </div>
          
          <div className="pt-4 border-t">
            <Button
              variant="destructive"
              onClick={handleClearData}
              className="w-full"
            >
              Clear All Data
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This will delete all your saved SEO content and thumbnails
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Features Available</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>AI-Powered SEO Content Generation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Custom Thumbnail Creation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Local Data Storage</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>History & Content Management</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Copy & Share Functionality</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            About VidRanker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            VidRanker is an AI-powered tool designed to help YouTube content creators optimize their videos 
            for better visibility and engagement. Generate SEO-optimized tags, descriptions, and stunning 
            thumbnails to boost your channel growth.
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button variant="ghost" size="sm">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="ghost" size="sm">
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button variant="ghost" size="sm">
              <Star className="w-4 h-4 mr-2" />
              Rate App
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground pt-4 border-t">
            <p>© 2024 VidRanker. Built with ❤️ for YouTube creators</p>
            <p className="mt-1">Made with Lovable AI 🚀</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
