
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ExternalLink, Shield, FileText, Smartphone, Settings as SettingsIcon } from "lucide-react";
import AdMobStatus from "@/components/AdMobStatus";

const Settings = () => {
  const appVersion = "1.0.0";
  const buildNumber = "001";

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your app preferences and view system information
        </p>
      </div>

      {/* AdMob Status & Controls */}
      <AdMobStatus />

      {/* App Information */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            App Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Version</span>
            <Badge variant="secondary">{appVersion}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Build Number</span>
            <Badge variant="outline">{buildNumber}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Platform</span>
            <Badge variant="default">
              {typeof window !== 'undefined' && window.location.host.includes('localhost') ? 'Development' : 'Production'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Legal & Privacy */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Legal & Privacy
          </CardTitle>
          <CardDescription>
            Review our terms and privacy policies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link 
            to="/privacy" 
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4" />
              <span>Privacy Policy</span>
            </div>
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Separator />
          <Link 
            to="/terms" 
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
            </div>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">User Agent</span>
            <Badge variant="outline" className="text-xs max-w-[200px] truncate">
              {typeof navigator !== 'undefined' ? navigator.userAgent.split(' ')[0] : 'N/A'}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Screen Size</span>
            <Badge variant="outline">
              {typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'N/A'}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Language</span>
            <Badge variant="outline">
              {typeof navigator !== 'undefined' ? navigator.language : 'N/A'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
