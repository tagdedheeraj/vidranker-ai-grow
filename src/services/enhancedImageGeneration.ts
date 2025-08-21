
import { AIImageService, HuggingFaceService } from './aiImageServices';

export interface ImageGenerationResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  method: 'ai-service' | 'canvas' | 'placeholder';
  serviceName?: string;
}

export class EnhancedImageGenerationService {
  // Only use Hugging Face service - no other services
  private static huggingFaceService = new HuggingFaceService();

  static async generateImage(
    prompt: string, 
    style: string = 'photorealistic',
    onStatusUpdate?: (status: string) => void
  ): Promise<ImageGenerationResult> {
    
    console.log('🚀 Starting Hugging Face image generation for prompt:', prompt);
    onStatusUpdate?.('🎨 Starting AI thumbnail generation with Hugging Face...');
    
    try {
      onStatusUpdate?.('🔄 Connecting to Hugging Face AI model...');
      console.log('🔄 Attempting generation with Hugging Face');
      
      // Direct generation with Hugging Face - no availability check to avoid CORS
      const imageUrl = await Promise.race([
        this.huggingFaceService.generate(prompt, style),
        new Promise<string>((_, reject) => 
          setTimeout(() => reject(new Error('Generation timeout after 60 seconds')), 60000)
        )
      ]);
      
      console.log('🎯 Hugging Face generated URL:', imageUrl);
      
      onStatusUpdate?.('✅ Successfully generated with Hugging Face AI!');
      console.log('🎉 Successfully generated thumbnail with Hugging Face');
      
      return {
        success: true,
        imageUrl,
        method: 'ai-service',
        serviceName: 'Hugging Face'
      };
      
    } catch (error) {
      console.error('❌ Hugging Face generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      onStatusUpdate?.(`❌ Hugging Face failed: ${errorMessage}`);
      
      // No fallbacks - only return error if Hugging Face fails
      return {
        success: false,
        error: `Hugging Face generation failed: ${errorMessage}`,
        method: 'ai-service',
        serviceName: 'Hugging Face'
      };
    }
  }
}
