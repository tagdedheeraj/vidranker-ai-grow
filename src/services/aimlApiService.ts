
export interface AIImageService {
  name: string;
  generate: (prompt: string, style: string) => Promise<string>;
  isAvailable: () => Promise<boolean>;
}

// AI/ML API configuration
const AIML_API_KEY = "bcaceba72f5e4b35b1a0f418ad8edc70";
const AIML_BASE_URL = "https://api.aimlapi.com";

export class AimlApiService implements AIImageService {
  name = 'AI/ML API';
  private apiKey = AIML_API_KEY;
  private baseUrl = AIML_BASE_URL;

  async isAvailable(): Promise<boolean> {
    console.log('🔍 Testing AI/ML API availability...');
    
    if (!this.apiKey) {
      console.log('❌ No AI/ML API key provided');
      return false;
    }
    
    try {
      // Test with image generation endpoint directly
      const response = await fetch(`${this.baseUrl}/images/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'flux-pro',
          prompt: 'test image',
          n: 1,
          size: '1024x576',
          quality: 'hd'
        })
      });
      
      console.log(`🔍 AI/ML API test response:`, response.status);
      
      if (response.status === 200) {
        console.log('✅ AI/ML API is available');
        return true;
      }
      
      // Check for specific error messages
      const errorData = await response.json().catch(() => ({}));
      console.log('API Error Response:', errorData);
      
      if (response.status === 403 && errorData.message?.includes('verification')) {
        console.log('❌ AI/ML API requires billing verification');
        return false;
      }
      
      return false;
    } catch (error) {
      console.log('❌ Error testing AI/ML API:', error);
      return false;
    }
  }

  async generate(prompt: string, style: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('AI/ML API key is not configured');
    }

    const styleMap = {
      'photorealistic': 'photorealistic, high quality, professional photography, realistic, detailed, sharp focus',
      'cartoon': 'cartoon style, animated, colorful, fun, illustration, cartoon art, vibrant colors',
      'cinematic': 'cinematic lighting, dramatic, movie-style, professional, cinematic quality, film grain',
      'digital-art': 'digital art, artistic, creative design, modern, digital painting, stylized'
    };

    const stylePrompt = styleMap[style as keyof typeof styleMap] || styleMap.photorealistic;
    const enhancedPrompt = `YouTube thumbnail: ${prompt}, ${stylePrompt}, bright vibrant colors, high contrast, eye-catching design, professional quality, 16:9 aspect ratio, bold composition, attention-grabbing, trending thumbnail style, masterpiece, best quality`;
    
    console.log('🎨 Generating with AI/ML API enhanced prompt:', enhancedPrompt);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(`${this.baseUrl}/images/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'flux-pro',
          prompt: enhancedPrompt,
          n: 1,
          size: '1024x576',
          quality: 'hd',
          response_format: 'url'
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('🔍 AI/ML API response status:', response.status);

      if (response.status === 200) {
        const data = await response.json();
        console.log('✅ Successfully received response from AI/ML API');
        
        if (data.data && data.data[0] && data.data[0].url) {
          const imageUrl = data.data[0].url;
          console.log('🎉 Success with AI/ML API');
          return imageUrl;
        } else {
          throw new Error('Invalid response format from AI/ML API');
        }
      } else if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        if (errorData.message?.includes('verification')) {
          throw new Error('❌ AI/ML API Key requires billing verification. Please visit https://aimlapi.com/app/billing/verification to complete verification.');
        }
        throw new Error('Authentication failed. Please check your AI/ML API key.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || errorData.message || `HTTP ${response.status}`;
        throw new Error(`AI/ML API error: ${errorMessage}`);
      }
      
    } catch (error) {
      console.error('❌ Error with AI/ML API:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      
      throw error;
    }
  }
}
