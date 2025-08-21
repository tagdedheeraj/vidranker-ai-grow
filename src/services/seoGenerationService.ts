
// SEO Generation Service using Hugging Face Text API
const HUGGINGFACE_API_KEY = "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";

export interface SEOGenerationResult {
  tags: string[];
  title: string;
  description: string;
  hashtags: string[];
}

export class SEOGenerationService {
  private static apiKey = HUGGINGFACE_API_KEY;

  static async generateSEOContent(keyword: string): Promise<SEOGenerationResult> {
    console.log('🚀 Starting SEO generation for keyword:', keyword);
    
    try {
      // Generate content using Hugging Face Text Generation API
      const prompt = `Generate YouTube SEO content for the keyword "${keyword}". 

Create:
1. 15 relevant tags separated by commas
2. An engaging YouTube title (under 60 characters)
3. A detailed description (200-300 words) with emojis, bullet points, and call-to-action
4. 10 relevant hashtags

Format the response as JSON with keys: tags, title, description, hashtags`;

      const response = await fetch(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 500,
              temperature: 0.7,
              return_full_text: false
            }
          }),
        }
      );

      if (!response.ok) {
        console.log('⚠️ HuggingFace text API failed, using enhanced fallback');
        return this.generateEnhancedFallbackContent(keyword);
      }

      const result = await response.json();
      console.log('✅ HuggingFace text API response:', result);

      // Parse the AI response (if it's properly formatted JSON)
      try {
        const generatedText = result[0]?.generated_text || '';
        const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
          const parsedContent = JSON.parse(jsonMatch[0]);
          return this.validateAndFormatContent(parsedContent, keyword);
        }
      } catch (parseError) {
        console.log('⚠️ Failed to parse AI response, using fallback');
      }

      // Fallback to enhanced generated content
      return this.generateEnhancedFallbackContent(keyword);

    } catch (error) {
      console.error('❌ SEO generation failed:', error);
      return this.generateEnhancedFallbackContent(keyword);
    }
  }

  private static generateEnhancedFallbackContent(keyword: string): SEOGenerationResult {
    const tags = [
      keyword,
      `${keyword} tutorial`,
      `${keyword} guide`,
      `${keyword} tips`,
      `${keyword} 2024`,
      `how to ${keyword}`,
      `${keyword} for beginners`,
      `${keyword} secrets`,
      `${keyword} tricks`,
      `${keyword} mastery`,
      "youtube growth",
      "content creator", 
      "viral video",
      "youtube algorithm",
      "video marketing"
    ];

    const hashtags = [
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

    const title = `${keyword} - Complete Guide for 2024 | Boost Your YouTube Growth 🚀`;
    
    const description = `🚀 Master ${keyword} with this comprehensive guide! Learn proven strategies to grow your YouTube channel, increase views, and boost engagement. Perfect for content creators looking to dominate in 2024.

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

${hashtags.slice(0, 6).join(' ')}`;

    return { tags, title, description, hashtags };
  }

  private static validateAndFormatContent(content: any, keyword: string): SEOGenerationResult {
    // Validate and format the AI-generated content
    const tags = Array.isArray(content.tags) ? content.tags : [keyword];
    const hashtags = Array.isArray(content.hashtags) ? content.hashtags : [`#${keyword}`];
    const title = typeof content.title === 'string' ? content.title : `${keyword} - YouTube Guide`;
    const description = typeof content.description === 'string' ? content.description : `Learn about ${keyword}`;

    return { tags, title, description, hashtags };
  }
}
