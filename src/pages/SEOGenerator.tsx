
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Search, Sparkles, CheckCircle, Save, Hash } from "lucide-react";
import { toast } from "sonner";
import { saveContent } from "@/utils/localStorage";
import { SEOGenerationService } from "@/services/seoGenerationService";

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
    
    try {
      console.log("🎯 Starting real SEO generation with Hugging Face API...");
      
      const data = await SEOGenerationService.generateSEOContent(keyword);
      
      setGeneratedData(data);
      
      // Auto-save to history
      console.log("💾 Saving SEO content to history...");
      try {
        const savedItem = saveContent({
          type: 'seo',
          title: `SEO: ${keyword}`,
          content: data
        });
        console.log("✅ SEO content saved successfully:", savedItem);
        toast.success("🤖 SEO content generated with AI and saved to history!");
      } catch (error) {
        console.error("❌ Error saving SEO content:", error);
        toast.success("🤖 SEO content generated with AI!");
      }
      
    } catch (error) {
      console.error("❌ SEO generation failed:", error);
      toast.error("Failed to generate SEO content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
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
          AI SEO Content Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Enter your video topic and get AI-powered tags, titles, and descriptions
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
            Describe your video content or enter main keywords for AI generation
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
                AI is Creating Amazing Content...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate AI SEO Content
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

          {/* Hashtags */}
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

          {/* Title */}
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

          {/* Description */}
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
