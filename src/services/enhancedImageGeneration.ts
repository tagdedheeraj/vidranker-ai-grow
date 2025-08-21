
import { AimlApiService } from './aimlApiService';
import { CanvasImageGenerator } from './canvasGenerator';

export interface ImageGenerationResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  method: 'ai-service' | 'canvas' | 'placeholder';
  serviceName?: string;
}

export class EnhancedImageGenerationService {
  private static aimlApiService = new AimlApiService();

  static async generateImage(
    prompt: string, 
    style: string = 'photorealistic',
    onStatusUpdate?: (status: string) => void
  ): Promise<ImageGenerationResult> {
    
    console.log('🚀 Starting enhanced image generation for prompt:', prompt);
    onStatusUpdate?.('🔑 Validating AI/ML API key...');
    
    try {
      // Step 1: API validation
      onStatusUpdate?.('🔍 Testing AI/ML API availability...');
      console.log('🔍 Checking AI/ML API availability...');
      
      const isAvailable = await this.aimlApiService.isAvailable();
      if (!isAvailable) {
        onStatusUpdate?.('❌ AI/ML API validation failed. Check your API key.');
        throw new Error('AI/ML API key is invalid or service is unavailable');
      }
      
      onStatusUpdate?.('✅ AI/ML API validated! Starting AI generation...');
      console.log('✅ API validation successful, proceeding with generation');
      
      // Step 2: Generate image with AI/ML API
      onStatusUpdate?.('🎨 Generating thumbnail with AI/ML API (high quality models)...');
      
      const imageUrl = await Promise.race([
        this.aimlApiService.generate(prompt, style),
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
        serviceName: 'AI/ML API'
      };
      
    } catch (error) {
      console.error('❌ AI generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Provide specific guidance based on error type
      let userFriendlyMessage = errorMessage;
      
      if (errorMessage.includes('authentication failed') || errorMessage.includes('invalid') || errorMessage.includes('401') || errorMessage.includes('403')) {
        userFriendlyMessage = '🔑 API Authentication Failed. Please check your AI/ML API key configuration.';
      } else if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
        userFriendlyMessage = '🚦 Too many requests. Please wait a moment before trying again.';
      } else if (errorMessage.includes('timeout')) {
        userFriendlyMessage = '⏱️ Request timed out. The AI service may be busy. Please try again.';
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
          serviceName: 'AI/ML API'
        };
      }
    }
  }
}
