
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
    
    console.log('🚀 Starting enhanced image generation for prompt:', prompt);
    onStatusUpdate?.('🔑 Validating API key and connecting to Hugging Face...');
    
    try {
      // Step 1: Validate API availability with better error messages
      onStatusUpdate?.('🔍 Checking API availability...');
      console.log('🔍 Checking Hugging Face API availability...');
      
      const isAvailable = await this.huggingFaceService.isAvailable();
      if (!isAvailable) {
        throw new Error('Hugging Face API is not available. Please check your API key permissions or try again later.');
      }
      
      onStatusUpdate?.('✅ API key validated! Starting image generation...');
      console.log('✅ API validation successful, proceeding with generation');
      
      // Step 2: Generate image with detailed status updates
      onStatusUpdate?.('🎨 Generating your thumbnail with AI (this may take 20-30 seconds)...');
      
      const imageUrl = await Promise.race([
        this.huggingFaceService.generate(prompt, style),
        new Promise<string>((_, reject) => 
          setTimeout(() => reject(new Error('Generation timeout after 60 seconds. Please try again.')), 60000)
        )
      ]);
      
      console.log('🎯 Successfully generated image URL:', imageUrl ? 'Valid URL received' : 'No URL');
      
      onStatusUpdate?.('✅ Successfully generated with Hugging Face Stable Diffusion!');
      console.log('🎉 Complete success - thumbnail generated with updated API key');
      
      return {
        success: true,
        imageUrl,
        method: 'ai-service',
        serviceName: 'Hugging Face Stable Diffusion v1.5'
      };
      
    } catch (error) {
      console.error('❌ Enhanced generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Provide specific guidance based on error type
      let userFriendlyMessage = errorMessage;
      if (errorMessage.includes('authentication failed')) {
        userFriendlyMessage = 'API key authentication failed. Please verify your Hugging Face API key has write permissions.';
      } else if (errorMessage.includes('loading')) {
        userFriendlyMessage = 'AI model is loading. Please wait 20-30 seconds and try again.';
      } else if (errorMessage.includes('rate limit')) {
        userFriendlyMessage = 'Too many requests. Please wait a moment before trying again.';
      } else if (errorMessage.includes('timeout')) {
        userFriendlyMessage = 'Request timed out. The AI model may be busy, please try again.';
      }
      
      onStatusUpdate?.(`❌ Generation failed: ${userFriendlyMessage}`);
      
      return {
        success: false,
        error: userFriendlyMessage,
        method: 'ai-service',
        serviceName: 'Hugging Face Stable Diffusion v1.5'
      };
    }
  }
}
