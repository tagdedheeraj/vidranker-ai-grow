
export interface AIImageService {
  name: string;
  generate: (prompt: string, style: string) => Promise<string>;
  isAvailable: () => Promise<boolean>;
}

export class HuggingFaceService implements AIImageService {
  name = 'Hugging Face';
  private apiKey = "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";

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
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
      'photorealistic': 'photorealistic, high quality, professional photography',
      'cartoon': 'cartoon style, animated, colorful, fun',
      'cinematic': 'cinematic lighting, dramatic, movie-style',
      'digital-art': 'digital art, artistic, creative design'
    };

    const stylePrompt = styleMap[style as keyof typeof styleMap] || styleMap.photorealistic;
    
    const enhancedPrompt = `YouTube thumbnail: ${prompt}, ${stylePrompt}, bright vibrant colors, high contrast, eye-catching design, professional quality, 16:9 aspect ratio, bold composition, attention-grabbing, trending thumbnail style`;
    
    console.log('🎨 Generating with prompt:', enhancedPrompt);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // Increased timeout

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
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
              num_inference_steps: 4,
              guidance_scale: 0.0, // FLUX.1-schnell works best with guidance_scale 0
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
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const blob = await response.blob();
      console.log('✅ Image blob received, size:', blob.size);
      
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

export class PollinalService implements AIImageService {
  name = 'Pollinal';

  async isAvailable(): Promise<boolean> {
    return true; // Free service, usually available
  }

  async generate(prompt: string, style: string): Promise<string> {
    const enhancedPrompt = encodeURIComponent(`YouTube thumbnail, ${style} style, ${prompt}, vibrant colors, high quality, 16:9 format, eye-catching design`);
    const seed = Math.floor(Math.random() * 1000000);
    return `https://pollinations.ai/p/${enhancedPrompt}?width=1024&height=576&seed=${seed}&model=flux&enhance=true`;
  }
}

export class UnsplashService implements AIImageService {
  name = 'Unsplash';

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async generate(prompt: string): Promise<string> {
    const keywords = prompt.split(' ').slice(0, 5).join(',');
    const seed = Math.floor(Math.random() * 1000000);
    return `https://source.unsplash.com/1024x576/?${keywords}&sig=${seed}`;
  }
}
