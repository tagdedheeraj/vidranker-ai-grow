
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image, Download, Share2, Sparkles, Save, RefreshCw, Palette, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { saveContent } from "@/utils/localStorage";
import { ImageGenerationService } from "@/services/imageGeneration";

const ThumbnailGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("photorealistic");
  const [debugInfo, setDebugInfo] = useState<string>("");

  const styles = [
    { id: "photorealistic", name: "Photorealistic", description: "Realistic photos" },
    { id: "cartoon", name: "Cartoon", description: "Animated style" },
    { id: "cinematic", name: "Cinematic", description: "Movie-like quality" },
    { id: "digital-art", name: "Digital Art", description: "Artistic style" },
  ];

  const generateThumbnail = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a thumbnail description");
      return;
    }

    setIsGenerating(true);
    setDebugInfo("Starting thumbnail generation...");
    
    try {
      console.log("🎯 Starting thumbnail generation process...");
      
      const result = await ImageGenerationService.generateImage(prompt, selectedStyle);
      
      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
        
        // Show appropriate success message based on generation method
        switch (result.method) {
          case 'huggingface':
            toast.success("🎨 AI thumbnail generated successfully!");
            setDebugInfo("✅ Generated using AI model");
            break;
          case 'fallback':
            toast.success("📷 Sample thumbnail generated!");
            setDebugInfo("⚡ Generated using fallback service");
            break;
          case 'placeholder':
            toast.success("🖼️ Placeholder thumbnail created!");
            setDebugInfo("🎨 Generated placeholder thumbnail");
            break;
        }
        
        // Auto-save to history
        try {
          saveContent({
            type: 'thumbnail',
            title: `Thumbnail: ${prompt.substring(0, 30)}...`,
            content: { prompt, imageUrl: result.imageUrl, style: selectedStyle }
          });
          console.log("💾 Thumbnail saved to history");
        } catch (saveError) {
          console.error("❌ Error saving thumbnail:", saveError);
        }
      } else {
        throw new Error(result.error || "Unknown generation error");
      }
      
    } catch (error) {
      console.error("❌ Complete generation failure:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Failed to generate thumbnail: ${errorMessage}`);
      setDebugInfo(`❌ Generation failed: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    try {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `vidranker-thumbnail-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("📥 Thumbnail downloaded!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed. Please try right-click > Save Image");
    }
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
        console.log('Share error:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(generatedImage);
        toast.success("🔗 Image URL copied to clipboard!");
      } catch (error) {
        console.error("Clipboard error:", error);
        toast.error("Unable to copy. Please manually copy the image.");
      }
    }
  };

  const saveToHistory = () => {
    if (!generatedImage) return;
    
    try {
      saveContent({
        type: 'thumbnail',
        title: `Thumbnail: ${prompt.substring(0, 30)}...`,
        content: { prompt, imageUrl: generatedImage, style: selectedStyle }
      });
      toast.success("💾 Thumbnail saved to history!");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save to history");
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 gradient-text">
          Thumbnail Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Create eye-catching thumbnails that drive clicks and views
        </p>
      </div>

      {/* Debug Info Card */}
      {debugInfo && (
        <Card className="glass border-blue-200 bg-blue-50/50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <AlertCircle className="w-4 h-4" />
              <span>{debugInfo}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Style Selection */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Choose Style
          </CardTitle>
          <CardDescription>
            Select the visual style for your thumbnail
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {styles.map((style) => (
              <div
                key={style.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedStyle === style.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedStyle(style.id)}
              >
                <div className="font-medium text-sm">{style.name}</div>
                <div className="text-xs text-muted-foreground">{style.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Describe Your Thumbnail
          </CardTitle>
          <CardDescription>
            Be specific about colors, objects, people, and emotions you want
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="e.g., excited person holding smartphone, blue and orange colors, tech gadgets in background, surprised expression..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="text-lg p-6"
          />
          <div className="flex gap-2">
            <Button
              onClick={generateThumbnail}
              disabled={isGenerating}
              className="flex-1 bg-gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg"
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
            {generatedImage && (
              <Button
                onClick={generateThumbnail}
                disabled={isGenerating}
                variant="outline"
                className="px-6"
                title="Generate new version"
              >
                <RefreshCw className="w-5 h-5" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generated Thumbnail */}
      {generatedImage && (
        <Card className="glass animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5 text-success" />
                Your Generated Thumbnail
              </CardTitle>
              <Button onClick={saveToHistory} variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <img
                src={generatedImage}
                alt="Generated thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Image display error:", e);
                  toast.error("Image display failed");
                }}
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-black/50 text-white">
                  16:9 YouTube Format
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={downloadImage}
                className="bg-success hover:bg-success/90"
              >
                <Download className="w-4 h-4 mr-2" />
                Download HD
              </Button>
              <Button
                onClick={shareImage}
                variant="outline"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ThumbnailGenerator;
