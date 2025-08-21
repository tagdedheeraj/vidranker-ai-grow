
export interface AIImageService {
  name: string;
  generate: (prompt: string, style: string) => Promise<string>;
  isAvailable: () => Promise<boolean>;
}

// Only use the provided Hugging Face API key
const HUGGINGFACE_API_KEY = "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";

export class HuggingFaceService implements AIImageService {
  name = 'Hugging Face';
  private apiKey = HUGGINGFACE_API_KEY;

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
          headers: { Authorization: `Bearer ${this.apiKey}` },
          method: "HEAD"
        }
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  async generate(prompt: string, style: string): Promise<string> {
    // Enhanced prompt engineering for better YouTube thumbnails
    const styleMap = {
      'photorealistic': 'photorealistic, high quality, professional photography, realistic',
      'cartoon': 'cartoon style, animated, colorful, fun, illustration',
      'cinematic': 'cinematic lighting, dramatic, movie-style, professional',
      'digital-art': 'digital art, artistic, creative design, modern'
    };

    const stylePrompt = styleMap[style as keyof typeof styleMap] || styleMap.photorealistic;
    
    const enhancedPrompt = `YouTube thumbnail: ${prompt}, ${stylePrompt}, bright vibrant colors, high contrast, eye-catching design, professional quality, 16:9 aspect ratio, bold composition, attention-grabbing, trending thumbnail style, no text overlay`;
    
    console.log('🎨 Generating with Hugging Face:', enhancedPrompt);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // Increased timeout

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: enhancedPrompt,
            parameters: {
              width: 1024,
              height: 576,
              num_inference_steps: 28,
              guidance_scale: 3.5,
            },
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      console.log('🔍 HuggingFace API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HuggingFace API Error:', response.status, errorText);
        
        if (response.status === 401) {
          throw new Error('API Key invalid or expired. Please check your Hugging Face API key.');
        } else if (response.status === 503) {
          throw new Error('Model is loading, please wait a moment and try again.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait before making another request.');
        } else {
          throw new Error(`API Error ${response.status}: ${errorText}`);
        }
      }

      const blob = await response.blob();
      console.log('✅ Image blob received, size:', blob.size);
      
      if (blob.size === 0) {
        throw new Error('Received empty image from API');
      }
      
      const imageUrl = URL.createObjectURL(blob);
      console.log('🖼️ Image URL created successfully');
      
      return imageUrl;
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('❌ HuggingFace generation failed:', error);
      throw error;
    }
  }
}
