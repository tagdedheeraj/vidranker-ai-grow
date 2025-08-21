
export interface ImageGenerationResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  method: 'huggingface' | 'fallback' | 'placeholder';
}

export class ImageGenerationService {
  // Updated with a fresh API key - users should replace with their own
  private static readonly API_KEY = "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";
  private static readonly TIMEOUT = 30000; // 30 seconds
  
  private static readonly FALLBACK_SERVICES = [
    (seed: number) => `https://picsum.photos/1024/576?random=${seed}`,
    (seed: number) => `https://source.unsplash.com/1024x576/?youtube,thumbnail&sig=${seed}`,
    (seed: number) => `https://via.placeholder.com/1024x576/4f46e5/ffffff?text=YouTube+Thumbnail&cache=${seed}`,
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
        
        // Generate SVG placeholder as last resort
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
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
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
              num_inference_steps: 4,
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
    const seed = Math.floor(Math.random() * 1000000);
    
    for (let i = 0; i < this.FALLBACK_SERVICES.length; i++) {
      try {
        const url = this.FALLBACK_SERVICES[i](seed + i);
        
        // Test if image loads with a more lenient approach
        const testPromise = new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(url);
          img.onerror = () => reject(new Error(`Service ${i + 1} failed`));
          img.src = url;
        });
        
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Timeout')), 8000);
        });
        
        return await Promise.race([testPromise, timeoutPromise]);
        
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
    const shortPrompt = prompt.substring(0, 15) + (prompt.length > 15 ? '...' : '');
    
    const svg = `
      <svg width="1024" height="576" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color}88;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <circle cx="200" cy="200" r="80" fill="white" opacity="0.2"/>
        <circle cx="800" cy="400" r="60" fill="white" opacity="0.3"/>
        <rect x="100" y="450" width="824" height="80" rx="40" fill="rgba(0,0,0,0.7)"/>
        <text x="512" y="500" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">
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
