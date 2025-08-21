
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
      // Use a lightweight models endpoint instead of actual generation
      const response = await fetch(`${this.baseUrl}/models`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        }
      });
      
      console.log(`🔍 AI/ML API models endpoint response:`, response.status);
      
      if (response.status === 200) {
        console.log('✅ AI/ML API is available');
        return true;
      }
      
      // If models endpoint fails, try a simple generation test
      if (response.status === 404) {
        console.log('🔄 Models endpoint not found, trying generation test...');
        return await this.testGeneration();
      }
      
      return false;
    } catch (error) {
      console.log('❌ Error testing AI/ML API:', error);
      return await this.testGeneration();
    }
  }

  private async testGeneration(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/images/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'flux-pro',
          prompt: 'test',
          n: 1,
          size: '512x512'
        })
      });
      
      return response.status === 200;
    } catch {
      return false;
    }
  }

  async generate(prompt: string, style: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('AI/ML API key is not configured');
    }

    const styleMap = {
      'photorealistic': 'photorealistic, high quality, professional photography, realistic, detailed, sharp focus, 8K resolution',
      'cartoon': 'cartoon style, animated, colorful, fun, illustration, cartoon art, vibrant colors, Disney style',
      'cinematic': 'cinematic lighting, dramatic, movie-style, professional, cinematic quality, film grain, epic',
      'digital-art': 'digital art, artistic, creative design, modern, digital painting, stylized, concept art'
    };

    const stylePrompt = styleMap[style as keyof typeof styleMap] || styleMap.photorealistic;
    const enhancedPrompt = `YouTube thumbnail masterpiece: ${prompt}, ${stylePrompt}, bright vibrant colors, high contrast, eye-catching design, professional quality, 16:9 aspect ratio, bold composition, attention-grabbing, trending thumbnail style, no text, clean design, premium quality`;
    
    console.log('🎨 Generating with AI/ML API enhanced prompt:', enhancedPrompt);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000);

      const requestBody = {
        model: 'flux-pro',
        prompt: enhancedPrompt,
        n: 1,
        size: '1024x576',
        quality: 'hd',
        response_format: 'url',
        guidance_scale: 7.5,
        num_inference_steps: 20
      };

      console.log('📤 Sending request to AI/ML API:', requestBody);

      const response = await fetch(`${this.baseUrl}/images/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('📥 AI/ML API response status:', response.status);

      const responseText = await response.text();
      console.log('📄 AI/ML API raw response:', responseText);

      if (response.status === 200) {
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('❌ Failed to parse response JSON:', parseError);
          throw new Error('Invalid response format from AI/ML API');
        }
        
        console.log('✅ Successfully received response from AI/ML API:', data);
        
        if (data.data && data.data[0] && data.data[0].url) {
          const imageUrl = data.data[0].url;
          console.log('🎉 Success with AI/ML API, image URL:', imageUrl);
          return imageUrl;
        } else if (data.url) {
          console.log('🎉 Success with AI/ML API, direct URL:', data.url);
          return data.url;
        } else {
          console.error('❌ Invalid response structure:', data);
          throw new Error('Invalid response format from AI/ML API');
        }
      } else if (response.status === 403) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = {};
        }
        if (errorData.message?.includes('verification')) {
          throw new Error('❌ AI/ML API Key requires billing verification. Please visit https://aimlapi.com/app/billing/verification to complete verification.');
        }
        throw new Error('Authentication failed. Please check your AI/ML API key.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      } else {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { message: responseText };
        }
        const errorMessage = errorData.error?.message || errorData.message || `HTTP ${response.status}`;
        console.error('❌ AI/ML API error:', errorMessage);
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
