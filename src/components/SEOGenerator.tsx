import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { generateSEOContent } from '../services/seoGenerationService';
import { Copy, Wand2, Lightbulb, Hash, FileText, Eye } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useMetaAudienceNetwork } from "@/hooks/useMetaAudienceNetwork";

interface SEOResult {
  title: string;
  description: string;
  tags: string[];
  hashtags: string[];
}

const SEOGenerator = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SEOResult | null>(null);
  const { toast } = useToast();
  const { showInterstitial, isReady, status } = useMetaAudienceNetwork();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for your video",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Show interstitial ad if ready and on native platform
      if (isReady && status.isNativePlatform) {
        console.log('🎯 Showing interstitial ad before SEO generation...');
        await showInterstitial();
      }

      const seoContent = await generateSEOContent(topic);
      setResult(seoContent);
      
      toast({
        title: "SEO Content Generated!",
        description: "Your optimized content is ready to use",
      });
    } catch (error) {
      console.error('SEO generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Please try again or check your connection",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            AI SEO Generator
          </CardTitle>
          <CardDescription>
            Generate optimized titles, descriptions, and tags for your videos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Video Topic</Label>
            <Input
              id="topic"
              placeholder="Enter your video topic (e.g., 'How to cook pasta')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || !topic.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                Generating SEO Content...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate SEO Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Title */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Optimized Title
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <p className="flex-1 font-medium">{result.title}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(result.title, 'Title')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                SEO Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Textarea
                  value={result.description}
                  readOnly
                  className="min-h-[100px] resize-none"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(result.description, 'Description')}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Description
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                SEO Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(result.tags.join(', '), 'Tags')}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All Tags
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hashtags */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Social Hashtags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {result.hashtags.map((hashtag, index) => (
                    <Badge key={index} variant="outline">
                      {hashtag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(result.hashtags.join(' '), 'Hashtags')}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All Hashtags
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SEOGenerator;
