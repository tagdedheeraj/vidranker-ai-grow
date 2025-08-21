
import { AIImageService, HuggingFaceService } from './aiImageServices';
import { CanvasImageGenerator } from './canvasGenerator';

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
    onStatusUpdate?.('🔑 Validating Hugging Face API key...');
    
    try {
      // Step 1: Comprehensive API validation
      onStatusUpdate?.('🔍 Testing API key with multiple models...');
      console.log('🔍 Checking Hugging Face API availability across models...');
      
      const isAvailable = await this.huggingFaceService.isAvailable();
      if (!isAvailable) {
        onStatusUpdate?.('❌ API key validation failed. Check your Hugging Face account settings.');
        throw new Error('Hugging Face API key is invalid or lacks permissions. Please:\n1. Verify your account at https://huggingface.co/settings/account\n2. Generate a new "write" token at https://huggingface.co/settings/tokens\n3. Request access to gated models if needed');
      }
      
      onStatusUpdate?.('✅ API key validated! Starting AI generation...');
      console.log('✅ API validation successful, proceeding with generation');
      
      // Step 2: Generate image with fallback models
      onStatusUpdate?.('🎨 Generating thumbnail with AI (trying multiple models for best results)...');
      
      const imageUrl = await Promise.race([
        this.huggingFaceService.generate(prompt, style),
        new Promise<string>((_, reject) => 
          setTimeout(() => reject(new Error('Generation timeout after 60 seconds')), 60000)
        )
      ]);
      
      console.log('🎯 Successfully generated image URL:', imageUrl ? 'Valid URL received' : 'No URL');
      
      onStatusUpdate?.('✅ AI thumbnail generated successfully!');
      console.log('🎉 Complete success - thumbnail generated');
      
      return {
        success: true,
        imageUrl,
        method: 'ai-service',
        serviceName: 'Hugging Face Stable Diffusion'
      };
      
    } catch (error) {
      console.error('❌ AI generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Provide specific guidance based on error type
      let userFriendlyMessage = errorMessage;
      
      if (errorMessage.includes('authentication failed') || errorMessage.includes('invalid') || errorMessage.includes('permissions')) {
        userFriendlyMessage = '🔑 API Authentication Failed:\n\n' +
          '1. Visit https://huggingface.co/settings/tokens\n' +
          '2. Create a new token with "write" permissions\n' +
          '3. Verify your account is confirmed\n' +
          '4. Try requesting access to gated models if needed';
      } else if (errorMessage.includes('loading') || errorMessage.includes('503')) {
        userFriendlyMessage = '⏳ AI models are loading. This can take 20-30 seconds. Please wait and try again.';
      } else if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
        userFriendlyMessage = '🚦 Too many requests. Please wait a moment before trying again.';
      } else if (errorMessage.includes('timeout')) {
        userFriendlyMessage = '⏱️ Request timed out. The AI models may be busy. Please try again.';
      }
      
      onStatusUpdate?.(`❌ AI Generation failed: ${userFriendlyMessage}`);
      
      // Fallback to Canvas generation
      console.log('🎨 Falling back to Canvas generation...');
      onStatusUpdate?.('🎨 Falling back to Canvas-based thumbnail generation...');
      
      try {
        const canvasImageUrl = CanvasImageGenerator.generateThumbnail(prompt, style);
        onStatusUpdate?.('✅ Canvas thumbnail generated successfully!');
        
        return {
          success: true,
          imageUrl: canvasImageUrl,
          method: 'canvas',
          serviceName: 'Canvas Generator'
        };
      } catch (canvasError) {
        console.error('❌ Canvas generation also failed:', canvasError);
        onStatusUpdate?.('❌ All generation methods failed');
        
        return {
          success: false,
          error: `Both AI and Canvas generation failed: ${userFriendlyMessage}`,
          method: 'ai-service',
          serviceName: 'Hugging Face'
        };
      }
    }
  }
}
