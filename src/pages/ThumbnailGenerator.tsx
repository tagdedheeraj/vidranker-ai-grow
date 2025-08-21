
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Clock, Bell, Sparkles } from "lucide-react";

const ThumbnailGenerator = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 gradient-text">
          AI Thumbnail Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Create eye-catching thumbnails using multiple AI services
        </p>
      </div>

      {/* Coming Soon Card */}
      <Card className="glass max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Image className="w-16 h-16 text-primary opacity-30" />
              <Clock className="w-8 h-8 text-primary absolute -bottom-2 -right-2 bg-background rounded-full p-1" />
            </div>
          </div>
          <CardTitle className="text-2xl mb-2">
            Coming Soon! 🚀
          </CardTitle>
          <CardDescription className="text-lg">
            हम AI Thumbnail Generator पर काम कर रहे हैं। जल्द ही यह feature available होगा!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center space-y-2">
              <Sparkles className="w-8 h-8 text-yellow-500" />
              <span>AI-Powered Generation</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Image className="w-8 h-8 text-blue-500" />
              <span>Multiple Styles</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Bell className="w-8 h-8 text-green-500" />
              <span>High Quality Output</span>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              इस feature के ready होने पर आपको notification मिल जाएगी।
              अभी के लिए आप हमारे SEO Generator का उपयोग कर सकते हैं।
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThumbnailGenerator;
