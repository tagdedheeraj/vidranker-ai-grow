
export interface AIImageService {
  name: string;
  generate: (prompt: string, style: string) => Promise<string>;
  isAvailable: () => Promise<boolean>;
}

// Updated Hugging Face API key with write permissions
const HUGGINGFACE_API_KEY = "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";

export class HuggingFaceService implements AIImageService {
  name = 'Hugging Face';
  private apiKey = HUGGINGFACE_API_KEY;

  async isAvailable(): Promise<boolean> {
    try {
      // Test with a more stable model for availability check
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          headers: { 
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            inputs: "test image",
            parameters: {
              num_inference_steps: 1
            }
          })
        }
      );
      
      console.log('🔍 API availability check response:', response.status);
      return response.status !== 401 && response.status !== 403;
    } catch (error) {
      console.error('❌ API availability check failed:', error);
      return false;
    }
  }

  async generate(prompt: string, style: string): Promise<string> {
    // Enhanced prompt engineering for better YouTube thumbnails
    const styleMap = {
      'photorealistic': 'photorealistic, high quality, professional photography, realistic, detailed',
      'cartoon': 'cartoon style, animated, colorful, fun, illustration, cartoon art',
      'cinematic': 'cinematic lighting, dramatic, movie-style, professional, cinematic quality',
      'digital-art': 'digital art, artistic, creative design, modern, digital painting'
    };

    const stylePrompt = styleMap[style as keyof typeof styleMap] || styleMap.photorealistic;
    
    const enhancedPrompt = `YouTube thumbnail: ${prompt}, ${stylePrompt}, bright vibrant colors, high contrast, eye-catching design, professional quality, 16:9 aspect ratio, bold composition, attention-grabbing, trending thumbnail style, masterpiece, best quality`;
    
    console.log('🎨 Generating with Hugging Face (Updated API Key):', enhancedPrompt);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

    try {
      // Using more stable Stable Diffusion v1.5 model
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: enhancedPrompt,
            parameters: {
              num_inference_steps: 20,
              guidance_scale: 7.5,
              width: 512,
              height: 288,
              negative_prompt: "blurry, low quality, distorted, ugly, bad anatomy, text, watermark, signature, duplicate, multiple faces"
            },
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      console.log('🔍 HuggingFace API Response Status:', response.status);
      console.log('📝 API Key used:', `${this.apiKey.substring(0, 10)}...`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HuggingFace API Error:', response.status, errorText);
        
        if (response.status === 401) {
          throw new Error('API key authentication failed. Please verify your Hugging Face API key has write permissions.');
        } else if (response.status === 403) {
          throw new Error('API access forbidden. Your API key may not have the required permissions for image generation.');
        } else if (response.status === 503) {
          throw new Error('Model is currently loading. This usually takes 20-30 seconds. Please wait and try again.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment before making another request.');
        } else if (response.status === 500) {
          throw new Error('Server error occurred. The model may be overloaded, please try again in a few moments.');
        } else {
          throw new Error(`API Error ${response.status}: ${errorText || 'Please check your API key and try again'}`);
        }
      }

      const blob = await response.blob();
      console.log('✅ Image blob received, size:', blob.size);
      
      if (blob.size === 0) {
        throw new Error('Received empty response from API. The model may still be loading, please try again.');
      }
      
      const imageUrl = URL.createObjectURL(blob);
      console.log('🖼️ Image URL created successfully');
      
      return imageUrl;
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('❌ HuggingFace generation failed:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timed out. The model may be loading, please try again.');
      }
      
      throw error;
    }
  }
}
