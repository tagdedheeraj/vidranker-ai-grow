
import { AIImageService, HuggingFaceService, PollinalService, UnsplashService } from './aiImageServices';
import { CanvasImageGenerator } from './canvasGenerator';

export interface ImageGenerationResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  method: 'ai-service' | 'canvas' | 'placeholder';
  serviceName?: string;
}

export class EnhancedImageGenerationService {
  private static aiServices: AIImageService[] = [
    new HuggingFaceService(),
    new PollinalService(),
    new UnsplashService()
  ];

  static async generateImage(
    prompt: string, 
    style: string = 'photorealistic',
    onStatusUpdate?: (status: string) => void
  ): Promise<ImageGenerationResult> {
    
    onStatusUpdate?.('🎨 Starting AI image generation...');
    
    // Try AI services in order
    for (const service of this.aiServices) {
      try {
        onStatusUpdate?.(`🔄 Trying ${service.name}...`);
        
        const isAvailable = await service.isAvailable();
        if (!isAvailable) {
          console.log(`${service.name} not available, skipping...`);
          continue;
        }

        const imageUrl = await service.generate(prompt, style);
        
        // Validate the generated image
        const isValid = await this.validateImage(imageUrl);
        if (isValid) {
          onStatusUpdate?.(`✅ Generated with ${service.name}`);
          return {
            success: true,
            imageUrl,
            method: 'ai-service',
            serviceName: service.name
          };
        }
      } catch (error) {
        console.warn(`${service.name} failed:`, error);
        continue;
      }
    }

    // Fallback to canvas generation
    onStatusUpdate?.('🎨 Creating custom thumbnail...');
    try {
      const canvasImage = CanvasImageGenerator.generateThumbnail(prompt, style);
      return {
        success: true,
        imageUrl: canvasImage,
        method: 'canvas'
      };
    } catch (error) {
      console.error('Canvas generation failed:', error);
    }

    // Final fallback to SVG placeholder
    onStatusUpdate?.('📝 Creating text placeholder...');
    const placeholder = this.generateSVGPlaceholder(prompt);
    return {
      success: true,
      imageUrl: placeholder,
      method: 'placeholder'
    };
  }

  private static async validateImage(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      setTimeout(() => resolve(false), 5000);
    });
  }

  private static generateSVGPlaceholder(prompt: string): string {
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
        <circle cx="200" cy="200" r="80" fill="white" opacity="0.2"/>
        <circle cx="800" cy="400" r="60" fill="white" opacity="0.3"/>
        <rect x="100" y="450" width="824" height="80" rx="40" fill="rgba(0,0,0,0.7)"/>
        <text x="512" y="490" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">
          ${shortPrompt}
        </text>
        <text x="512" y="520" font-family="Arial, sans-serif" font-size="18" fill="white" text-anchor="middle">
          VidRanker AI Thumbnail
        </text>
      </svg>
    `;
    
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }
}
