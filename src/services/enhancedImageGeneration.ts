
import { AIImageService, HuggingFaceService } from './aiImageServices';

export interface ImageGenerationResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  method: 'ai-service' | 'canvas' | 'placeholder';
  serviceName?: string;
}

export class EnhancedImageGenerationService {
  private static huggingFaceService = new HuggingFaceService();

  static async generateImage(
    prompt: string, 
    style: string = 'photorealistic',
    onStatusUpdate?: (status: string) => void
  ): Promise<ImageGenerationResult> {
    
    console.log('🚀 Starting Hugging Face SDXL image generation for prompt:', prompt);
    onStatusUpdate?.('🎨 Starting AI thumbnail generation with Hugging Face SDXL...');
    
    try {
      onStatusUpdate?.('🔄 Connecting to Hugging Face Stable Diffusion XL model...');
      console.log('🔄 Attempting generation with Hugging Face SDXL');
      
      // First check if the service is available
      const isAvailable = await this.huggingFaceService.isAvailable();
      if (!isAvailable) {
        throw new Error('Hugging Face API is not available. Please check your API key.');
      }
      
      onStatusUpdate?.('✅ API key verified, generating image...');
      
      const imageUrl = await Promise.race([
        this.huggingFaceService.generate(prompt, style),
        new Promise<string>((_, reject) => 
          setTimeout(() => reject(new Error('Generation timeout after 90 seconds')), 90000)
        )
      ]);
      
      console.log('🎯 Hugging Face SDXL generated URL:', imageUrl);
      
      onStatusUpdate?.('✅ Successfully generated with Hugging Face Stable Diffusion XL!');
      console.log('🎉 Successfully generated thumbnail with Hugging Face SDXL');
      
      return {
        success: true,
        imageUrl,
        method: 'ai-service',
        serviceName: 'Hugging Face SDXL'
      };
      
    } catch (error) {
      console.error('❌ Hugging Face SDXL generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      onStatusUpdate?.(`❌ Generation failed: ${errorMessage}`);
      
      return {
        success: false,
        error: `Hugging Face generation failed: ${errorMessage}`,
        method: 'ai-service',
        serviceName: 'Hugging Face SDXL'
      };
    }
  }
}
