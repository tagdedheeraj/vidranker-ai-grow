
export interface ImageGenerationResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  method: 'huggingface' | 'fallback' | 'placeholder';
}

export class ImageGenerationService {
  private static readonly API_KEY = "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";
  private static readonly TIMEOUT = 30000; // 30 seconds
  
  private static readonly FALLBACK_SERVICES = [
    (seed: number) => `https://picsum.photos/1024/576?random=${seed}`,
    (seed: number) => `https://source.unsplash.com/1024x576/?thumbnail,youtube&sig=${seed}`,
    (seed: number) => `https://via.placeholder.com/1024x576/ff6b35/ffffff?text=Sample+Thumbnail&seed=${seed}`,
  ];

  static async generateImage(prompt: string, style: string = 'photorealistic'): Promise<ImageGenerationResult> {
    const enhancedPrompt = `YouTube thumbnail, ${style} style, ${prompt}, bright colors, high contrast, eye-catching, professional quality, 16:9 aspect ratio, clickbait style, bold text overlay space, dramatic lighting`;
    
    // Try Hugging Face API first
    try {
      const imageUrl = await this.generateWithHuggingFace(enhancedPrompt);
      return {
        success: true,
        imageUrl,
        method: 'huggingface'
      };
    } catch (error) {
      console.warn('Hugging Face API failed:', error);
      
      // Try fallback services
      try {
        const imageUrl = await this.generateWithFallback();
        return {
          success: true,
          imageUrl,
          method: 'fallback'
        };
      } catch (fallbackError) {
        console.warn('Fallback services failed:', fallbackError);
        
        // Generate SVG placeholder
        const imageUrl = this.generatePlaceholder(prompt);
        return {
          success: true,
          imageUrl,
          method: 'placeholder'
        };
      }
    }
  }

  private static async generateWithHuggingFace(prompt: string): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: {
            Authorization: `Bearer ${this.API_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              width: 1024,
              height: 576,
              num_inference_steps: 20,
              guidance_scale: 7.5,
            },
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("image")) {
        throw new Error("Invalid response format");
      }

      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error("Empty image received");
      }

      return URL.createObjectURL(blob);
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private static async generateWithFallback(): Promise<string> {
    const seed = Date.now();
    
    for (let i = 0; i < this.FALLBACK_SERVICES.length; i++) {
      try {
        const url = this.FALLBACK_SERVICES[i](seed + i);
        
        // Test if image loads
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
          setTimeout(reject, 5000); // 5 second timeout per service
        });
        
        return url;
      } catch (error) {
        console.log(`Fallback service ${i + 1} failed:`, error);
        continue;
      }
    }
    
    throw new Error("All fallback services failed");
  }

  private static generatePlaceholder(prompt: string): string {
    const colors = ['#4f46e5', '#059669', '#dc2626', '#7c3aed', '#ea580c'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shortPrompt = prompt.substring(0, 20) + (prompt.length > 20 ? '...' : '');
    
    const svg = `
      <svg width="1024" height="576" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color}88;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="white" text-anchor="middle" dy="0.35em">
          VidRanker
        </text>
        <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dy="0.35em">
          ${shortPrompt}
        </text>
      </svg>
    `;
    
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  static validateImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      setTimeout(() => resolve(false), 5000);
    });
  }
}
