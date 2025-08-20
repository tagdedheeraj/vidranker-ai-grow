
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Download, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";

const ThumbnailGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateThumbnail = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a thumbnail description");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Here you would integrate with Hugging Face API
      // For now, we'll use a placeholder
      const API_KEY = "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";
      
      // Simulate API call (replace with actual Hugging Face integration)
      setTimeout(() => {
        // Using a placeholder service for demo
        const imageUrl = `https://picsum.photos/1280/720?random=${Date.now()}`;
        setGeneratedImage(imageUrl);
        setIsGenerating(false);
        toast.success("Thumbnail generated successfully!");
      }, 3000);
      
    } catch (error) {
      console.error("Error generating thumbnail:", error);
      toast.error("Failed to generate thumbnail. Please try again.");
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `vidranker-thumbnail-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Thumbnail downloaded!");
  };

  const shareImage = async () => {
    if (!generatedImage) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My VidRanker Thumbnail',
          text: 'Check out my awesome YouTube thumbnail created with VidRanker!',
          url: generatedImage
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(generatedImage);
      toast.success("Image URL copied to clipboard!");
    }
  };

  return (
    <div className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Thumbnail Generator
          </h2>
          <p className="text-lg text-muted-foreground">
            Create eye-catching thumbnails that drive clicks and views
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              Describe Your Thumbnail
            </CardTitle>
            <CardDescription>
              Be specific about colors, text, style, and elements you want
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="e.g., Tech review thumbnail with blue and orange colors, surprised face, gadget in background..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="text-lg p-6"
            />
            <Button
              onClick={generateThumbnail}
              disabled={isGenerating}
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Creating Your Thumbnail...
                </>
              ) : (
                <>
                  <Image className="w-5 h-5 mr-2" />
                  Generate Thumbnail
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Thumbnail */}
        {generatedImage && (
          <Card className="glass animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5 text-success" />
                Your Generated Thumbnail
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={generatedImage}
                  alt="Generated thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={downloadImage}
                  className="flex-1 bg-success hover:bg-success/90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={shareImage}
                  variant="outline"
                  className="flex-1"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ThumbnailGenerator;
