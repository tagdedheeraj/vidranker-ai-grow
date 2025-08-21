
export interface AIImageService {
  name: string;
  generate: (prompt: string, style: string) => Promise<string>;
  isAvailable: () => Promise<boolean>;
}

// Updated Hugging Face API key - using the provided key
const HUGGINGFACE_API_KEY = "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";

export class HuggingFaceService implements AIImageService {
  name = 'Hugging Face';
  private apiKey = HUGGINGFACE_API_KEY;

  async isAvailable(): Promise<boolean> {
    try {
      // Using a different model endpoint that's more reliable
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: { 
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            inputs: "test",
            parameters: {
              num_inference_steps: 1
            }
          })
        }
      );
      return response.status !== 401 && response.status !== 403;
    } catch {
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
    
    console.log('🎨 Generating with Hugging Face SDXL:', enhancedPrompt);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000); // Increased timeout for SDXL

    try {
      // Using Stable Diffusion XL which is more reliable than FLUX
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: enhancedPrompt,
            parameters: {
              num_inference_steps: 30,
              guidance_scale: 7.5,
              width: 1024,
              height: 576,
              negative_prompt: "blurry, low quality, distorted, ugly, bad anatomy, text, watermark, signature"
            },
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      console.log('🔍 HuggingFace SDXL API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HuggingFace SDXL API Error:', response.status, errorText);
        
        if (response.status === 401 || response.status === 403) {
          throw new Error('API key authentication failed. The Hugging Face API key may be invalid or expired.');
        } else if (response.status === 503) {
          throw new Error('Model is currently loading. Please wait a few moments and try again.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait before making another request.');
        } else if (response.status === 500) {
          throw new Error('Server error occurred. Please try again in a few moments.');
        } else {
          throw new Error(`API Error ${response.status}: Please check your API key and try again`);
        }
      }

      const blob = await response.blob();
      console.log('✅ Image blob received, size:', blob.size);
      
      if (blob.size === 0) {
        throw new Error('Received empty response from API. Please try again.');
      }
      
      const imageUrl = URL.createObjectURL(blob);
      console.log('🖼️ Image URL created successfully');
      
      return imageUrl;
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('❌ HuggingFace SDXL generation failed:', error);
      throw error;
    }
  }
}
