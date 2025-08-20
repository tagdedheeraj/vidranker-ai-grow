
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Search, Sparkles, CheckCircle, Save, Hash } from "lucide-react";
import { toast } from "sonner";
import { saveContent } from "@/utils/localStorage";

const SEOGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<{
    tags: string[];
    title: string;
    description: string;
    hashtags: string[];
  } | null>(null);

  const generateSEOContent = async () => {
    if (!keyword.trim()) {
      toast.error("Please enter a keyword or title");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation with enhanced content
    setTimeout(() => {
      const sampleTags = [
        `${keyword}`,
        `${keyword} tutorial`,
        `${keyword} guide`,
        `${keyword} tips`,
        `${keyword} 2024`,
        `how to ${keyword}`,
        `${keyword} for beginners`,
        "youtube growth",
        "content creator",
        "viral video",
        "youtube algorithm",
        "video marketing",
        "engagement boost",
        "subscriber growth",
        "youtube seo"
      ];

      const sampleHashtags = [
        `#${keyword.replace(/\s+/g, '')}`,
        "#YouTube",
        "#ContentCreator",
        "#Growth",
        "#2024",
        "#Tutorial",
        "#Tips",
        "#Viral",
        "#Success",
        "#Marketing"
      ];

      const sampleTitle = `${keyword} - Complete Guide for 2024 | Boost Your YouTube Growth 🚀`;
      const sampleDescription = `🚀 Master ${keyword} with this comprehensive guide! Learn proven strategies to grow your YouTube channel, increase views, and boost engagement. Perfect for content creators looking to dominate in 2024.

🔥 What you'll learn:
• Advanced ${keyword} techniques
• YouTube algorithm secrets
• Content optimization strategies
• Engagement boosting tips
• Monetization methods

📈 Transform your channel today! Don't forget to LIKE, SUBSCRIBE, and hit the BELL icon for more amazing content!

⏰ Timestamps:
00:00 Introduction
02:30 Getting Started with ${keyword}
05:45 Advanced Techniques
10:20 Pro Tips & Tricks
15:00 Conclusion

${sampleHashtags.slice(0, 6).join(' ')}`;

      const data = {
        tags: sampleTags,
        title: sampleTitle,
        description: sampleDescription,
        hashtags: sampleHashtags
      };

      setGeneratedData(data);
      
      // Auto-save to history
      console.log("Saving SEO content to history...");
      try {
        const savedItem = saveContent({
          type: 'seo',
          title: `SEO: ${keyword}`,
          content: data
        });
        console.log("SEO content saved successfully:", savedItem);
        toast.success("SEO content generated and saved to history!");
      } catch (error) {
        console.error("Error saving SEO content:", error);
        toast.success("SEO content generated!");
      }
      
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const saveToHistory = () => {
    if (!generatedData) return;
    
    try {
      saveContent({
        type: 'seo',
        title: `SEO: ${keyword}`,
        content: generatedData
      });
      toast.success("Content saved to history!");
    } catch (error) {
      console.error("Error saving to history:", error);
      toast.error("Failed to save to history");
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 gradient-text">
          SEO Content Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Enter your video topic and get optimized tags, titles, and descriptions
        </p>
      </div>

      {/* Input Section */}
      <Card className="glass">
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
          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={saveToHistory} variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Save to History
            </Button>
          </div>

          {/* Tags */}
          <Card className="glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  SEO Tags ({generatedData.tags.length})
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

          <Card className="glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-success" />
                  Hashtags ({generatedData.hashtags.length})
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generatedData.hashtags.join(" "), "Hashtags")}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {generatedData.hashtags.map((hashtag, index) => (
                  <Badge key={index} variant="outline" className="text-sm py-1 px-3 text-primary">
                    {hashtag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Optimized Title ({generatedData.title.length} chars)
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

          <Card className="glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  SEO Description ({generatedData.description.length} chars)
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
  );
};

export default SEOGenerator;
