
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Trash2, Search, Image, Calendar, Filter } from "lucide-react";
import { toast } from "sonner";
import { getSavedContent, deleteContent, clearAllContent, SavedContent } from "@/utils/localStorage";
import { Input } from "@/components/ui/input";

const History = () => {
  const [savedItems, setSavedItems] = useState<SavedContent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'seo' | 'thumbnail'>('all');

  useEffect(() => {
    loadSavedContent();
  }, []);

  const loadSavedContent = () => {
    setSavedItems(getSavedContent());
  };

  const handleDelete = (id: string) => {
    deleteContent(id);
    loadSavedContent();
    toast.success("Item deleted from history");
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all history?")) {
      clearAllContent();
      loadSavedContent();
      toast.success("All history cleared");
    }
  };

  const copyContent = (content: any, type: string) => {
    let textToCopy = "";
    
    if (type === 'seo') {
      textToCopy = `Title: ${content.title}\n\nTags: ${content.tags.join(", ")}\n\nDescription: ${content.description}`;
    } else {
      textToCopy = content.prompt || "Thumbnail content";
    }
    
    navigator.clipboard.writeText(textToCopy);
    toast.success("Content copied to clipboard!");
  };

  const downloadThumbnail = (imageUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.replace(/[^a-z0-9]/gi, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Thumbnail downloaded!");
  };

  const filteredItems = savedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 gradient-text">
          History & Saved Content
        </h1>
        <p className="text-lg text-muted-foreground">
          View and manage your previously generated content
        </p>
      </div>

      {/* Search and Filter */}
      <Card className="glass">
        <CardContent className="p-4 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search your content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={handleClearAll} variant="destructive" disabled={savedItems.length === 0}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('all')}
            >
              All ({savedItems.length})
            </Button>
            <Button
              variant={filterType === 'seo' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('seo')}
            >
              <Search className="w-4 h-4 mr-1" />
              SEO ({savedItems.filter(item => item.type === 'seo').length})
            </Button>
            <Button
              variant={filterType === 'thumbnail' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('thumbnail')}
            >
              <Image className="w-4 h-4 mr-1" />
              Thumbnails ({savedItems.filter(item => item.type === 'thumbnail').length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      {filteredItems.length === 0 ? (
        <Card className="glass">
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              {savedItems.length === 0 ? (
                <>
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No saved content yet.</p>
                  <p className="text-sm mt-2">Start generating content to see it here!</p>
                </>
              ) : (
                <>
                  <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No content matches your search.</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="glass">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={item.type === 'seo' ? 'default' : 'secondary'}>
                        {item.type === 'seo' ? (
                          <>
                            <Search className="w-3 h-3 mr-1" />
                            SEO Content
                          </>
                        ) : (
                          <>
                            <Image className="w-3 h-3 mr-1" />
                            Thumbnail
                          </>
                        )}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {item.type === 'seo' ? (
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Generated Tags:</h4>
                      <div className="flex flex-wrap gap-1">
                        {item.content.tags?.slice(0, 8).map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.content.tags?.length > 8 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.content.tags.length - 8} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Title:</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.content.title}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Prompt:</h4>
                      <p className="text-sm text-muted-foreground">{item.content.prompt}</p>
                    </div>
                    {item.content.imageUrl && (
                      <div className="aspect-video w-full max-w-xs rounded-lg overflow-hidden bg-muted">
                        <img
                          src={item.content.imageUrl}
                          alt="Generated thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyContent(item.content, item.type)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  {item.type === 'thumbnail' && item.content.imageUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadThumbnail(item.content.imageUrl, item.title)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
