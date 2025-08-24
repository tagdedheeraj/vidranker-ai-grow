
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Search, Sparkles, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useAdMob } from "@/hooks/useAdMob";

const SEOGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<{
    tags: string[];
    title: string;
    description: string;
  } | null>(null);

  const { isReady, showInterstitial } = useAdMob();

  const saveToHistory = (data: { tags: string[]; title: string; description: string; keyword: string }) => {
    try {
      const history = JSON.parse(localStorage.getItem('seo-history') || '[]');
      const newEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...data
      };
      history.unshift(newEntry);
      const trimmedHistory = history.slice(0, 50);
      localStorage.setItem('seo-history', JSON.stringify(trimmedHistory));
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  };

  const generateSEOContent = async () => {
    if (!keyword.trim()) {
      toast.error("Please enter a keyword or title");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(async () => {
      const sampleTags = [
        `${keyword}`,
        `${keyword} tutorial`,
        `${keyword} guide`,
        `${keyword} tips`,
        `${keyword} 2024`,
        "youtube growth",
        "content creator",
        "viral video",
        "youtube algorithm",
        "video marketing"
      ];

      const sampleTitle = `${keyword} - Complete Guide for 2024 | Boost Your YouTube Growth`;
      const sampleDescription = `🚀 Master ${keyword} with this comprehensive guide! Learn proven strategies to grow your YouTube channel, increase views, and boost engagement. Perfect for content creators looking to dominate in 2024.

🔥 What you'll learn:
• Advanced ${keyword} techniques
• YouTube algorithm secrets
• Content optimization strategies
• Engagement boosting tips

📈 Transform your channel today! Don't forget to LIKE, SUBSCRIBE, and hit the BELL icon for more amazing content!

#${keyword.replace(/\s+/g, '')} #YouTube #ContentCreator #Growth #2024`;

      const generatedContent = {
        tags: sampleTags,
        title: sampleTitle,
        description: sampleDescription
      };

      setGeneratedData(generatedContent);
      
      // Save to history
      saveToHistory({
        ...generatedContent,
        keyword
      });
      
      setIsGenerating(false);
      toast.success("SEO content generated successfully!");
      
      // Show interstitial ad after successful generation
      if (isReady) {
        setTimeout(() => {
          showInterstitial();
        }, 1000);
      }
    }, 2000);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <div id="generator" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            SEO Content Generator
          </h2>
          <p className="text-lg text-muted-foreground">
            Enter your video topic and get optimized tags, titles, and descriptions
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Enter Your Video Topic
            </CardTitle>
            <CardDescription>
              Describe your video content or enter main keywords
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="e.g., React Tutorial, Cooking Tips, Travel Vlog..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="text-lg p-6"
            />
            <Button
              onClick={generateSEOContent}
              disabled={isGenerating}
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Generating Amazing Content...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate SEO Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {generatedData && (
          <div className="space-y-6 animate-fade-in">
            {/* Tags */}
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    SEO Tags
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generatedData.tags.join(", "), "Tags")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {generatedData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Title */}
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    Optimized Title
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generatedData.title, "Title")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{generatedData.title}</p>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    SEO Description
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generatedData.description, "Description")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generatedData.description}
                  readOnly
                  className="min-h-[200px] text-sm leading-relaxed"
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SEOGenerator;
