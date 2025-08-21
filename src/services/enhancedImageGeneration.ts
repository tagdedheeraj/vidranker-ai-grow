
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
    
    console.log('🚀 Starting enhanced image generation for prompt:', prompt);
    onStatusUpdate?.('🎨 Starting AI thumbnail generation...');
    
    // Try AI services in order with better error handling
    for (let i = 0; i < this.aiServices.length; i++) {
      const service = this.aiServices[i];
      try {
        onStatusUpdate?.(`🔄 Trying ${service.name} (${i + 1}/${this.aiServices.length})...`);
        console.log(`🔄 Attempting generation with ${service.name}`);
        
        // For HuggingFace, skip availability check and directly try generation
        if (service.name === 'Hugging Face') {
          console.log(`✅ ${service.name} - attempting direct generation...`);
          
          const imageUrl = await Promise.race([
            service.generate(prompt, style),
            new Promise<string>((_, reject) => 
              setTimeout(() => reject(new Error('Generation timeout')), 60000) // Increased timeout for HF
            )
          ]);
          
          console.log(`🎯 ${service.name} generated URL:`, imageUrl);
          
          onStatusUpdate?.(`✅ Successfully generated with ${service.name}!`);
          console.log(`🎉 Successfully generated thumbnail with ${service.name}`);
          return {
            success: true,
            imageUrl,
            method: 'ai-service',
            serviceName: service.name
          };
        } else {
          // For other services, check availability first
          const isAvailable = await Promise.race([
            service.isAvailable(),
            new Promise<boolean>((_, reject) => 
              setTimeout(() => reject(new Error('Availability check timeout')), 10000)
            )
          ]);
          
          if (!isAvailable) {
            console.log(`⚠️ ${service.name} not available, skipping...`);
            continue;
          }

          console.log(`✅ ${service.name} is available, generating image...`);
          
          const imageUrl = await Promise.race([
            service.generate(prompt, style),
            new Promise<string>((_, reject) => 
              setTimeout(() => reject(new Error('Generation timeout')), 30000)
            )
          ]);
          
          console.log(`🎯 ${service.name} generated URL:`, imageUrl);
          
          // Validate the generated image for non-HF services
          const isValid = await this.validateImage(imageUrl);
          if (isValid) {
            onStatusUpdate?.(`✅ Successfully generated with ${service.name}!`);
            console.log(`🎉 Successfully generated thumbnail with ${service.name}`);
            return {
              success: true,
              imageUrl,
              method: 'ai-service',
              serviceName: service.name
            };
          } else {
            console.log(`❌ ${service.name} generated invalid image`);
          }
        }
      } catch (error) {
        console.warn(`❌ ${service.name} failed:`, error);
        onStatusUpdate?.(`⚠️ ${service.name} failed, trying next option...`);
        continue;
      }
    }

    // Fallback to canvas generation
    console.log('🎨 All AI services failed, falling back to canvas generation');
    onStatusUpdate?.('🎨 Creating custom thumbnail with canvas...');
    try {
      const canvasImage = CanvasImageGenerator.generateThumbnail(prompt, style);
      console.log('✅ Canvas generation successful');
      return {
        success: true,
        imageUrl: canvasImage,
        method: 'canvas'
      };
    } catch (error) {
      console.error('❌ Canvas generation failed:', error);
    }

    // Final fallback to SVG placeholder
    console.log('📝 Canvas failed, creating SVG placeholder');
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
      img.onload = () => {
        console.log('✅ Image validation successful');
        resolve(true);
      };
      img.onerror = (error) => {
        console.log('❌ Image validation failed:', error);
        resolve(false);
      };
      img.src = url;
      setTimeout(() => {
        console.log('⏰ Image validation timeout');
        resolve(false);
      }, 15000); // Reduced timeout
    });
  }

  private static generateSVGPlaceholder(prompt: string): string {
    const colors = ['#4f46e5', '#059669', '#dc2626', '#7c3aed', '#ea580c'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shortPrompt = prompt.substring(0, 25) + (prompt.length > 25 ? '...' : '');
    
    const svg = `
      <svg width="1024" height="576" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color}88;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <circle cx="150" cy="150" r="60" fill="white" opacity="0.2"/>
        <circle cx="850" cy="400" r="80" fill="white" opacity="0.3"/>
        <rect x="50" y="400" width="924" height="120" rx="60" fill="rgba(0,0,0,0.8)"/>
        <text x="512" y="445" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">
          ${shortPrompt}
        </text>
        <text x="512" y="475" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" opacity="0.9">
          VidRanker AI Thumbnail
        </text>
        <text x="512" y="500" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle" opacity="0.7">
          Generated for YouTube Success
        </text>
      </svg>
    `;
    
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }
}
