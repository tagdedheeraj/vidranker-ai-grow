
import { AimlApiService } from './aimlApiService';
import { ProdiaApiService } from './prodiaApiService';
import { CanvasImageGenerator } from './canvasGenerator';

export interface ImageGenerationResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  method: 'ai-service' | 'prodia-service' | 'canvas' | 'placeholder';
  serviceName?: string;
}

export class EnhancedImageGenerationService {
  private static aimlApiService = new AimlApiService();
  private static prodiaApiService = new ProdiaApiService();

  static async generateImage(
    prompt: string, 
    style: string = 'photorealistic',
    onStatusUpdate?: (status: string) => void
  ): Promise<ImageGenerationResult> {
    
    console.log('🚀 Starting enhanced image generation for prompt:', prompt);
    onStatusUpdate?.('🔑 Starting multi-service AI generation...');
    
    // Step 1: Try AI/ML API first
    try {
      onStatusUpdate?.('🔍 Testing AI/ML API availability...');
      console.log('🔍 Checking AI/ML API availability...');
      
      const isAimlAvailable = await this.aimlApiService.isAvailable();
      if (isAimlAvailable) {
        onStatusUpdate?.('✅ AI/ML API validated! Starting generation...');
        console.log('✅ AI/ML API validation successful, proceeding with generation');
        
        onStatusUpdate?.('🎨 Generating high-quality image with AI/ML API...');
        
        const imageUrl = await Promise.race([
          this.aimlApiService.generate(prompt, style),
          new Promise<string>((_, reject) => 
            setTimeout(() => reject(new Error('AI/ML API timeout after 45 seconds')), 45000)
          )
        ]);
        
        console.log('🎯 Successfully generated image with AI/ML API');
        onStatusUpdate?.('✅ High-quality AI image generated successfully!');
        
        return {
          success: true,
          imageUrl,
          method: 'ai-service',
          serviceName: 'AI/ML API'
        };
      }
    } catch (error) {
      console.error('❌ AI/ML API failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      onStatusUpdate?.(`⚠️ AI/ML API failed: ${errorMessage}`);
    }

    // Step 2: Try Prodia API as backup
    try {
      onStatusUpdate?.('🔄 Trying Prodia API as backup...');
      console.log('🔄 Falling back to Prodia API...');
      
      const isProdiaAvailable = await this.prodiaApiService.isAvailable();
      if (isProdiaAvailable) {
        onStatusUpdate?.('✅ Prodia API available! Generating image...');
        
        const imageUrl = await Promise.race([
          this.prodiaApiService.generate(prompt, style),
          new Promise<string>((_, reject) => 
            setTimeout(() => reject(new Error('Prodia timeout after 35 seconds')), 35000)
          )
        ]);
        
        console.log('🎯 Successfully generated image with Prodia API');
        onStatusUpdate?.('✅ AI image generated with Prodia!');
        
        return {
          success: true,
          imageUrl,
          method: 'prodia-service',
          serviceName: 'Prodia API'
        };
      }
    } catch (error) {
      console.error('❌ Prodia API also failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      onStatusUpdate?.(`⚠️ Prodia API failed: ${errorMessage}`);
    }
    
    // Step 3: Fallback to Enhanced Canvas generation
    console.log('🎨 Falling back to Enhanced Canvas generation...');
    onStatusUpdate?.('🎨 Generating custom designed thumbnail with Canvas...');
    
    try {
      const canvasImageUrl = CanvasImageGenerator.generateThumbnail(prompt, style);
      onStatusUpdate?.('✅ Custom designed thumbnail generated successfully!');
      
      return {
        success: true,
        imageUrl: canvasImageUrl,
        method: 'canvas',
        serviceName: 'Enhanced Canvas Generator'
      };
    } catch (canvasError) {
      console.error('❌ Canvas generation also failed:', canvasError);
      onStatusUpdate?.('❌ All generation methods failed');
      
      return {
        success: false,
        error: `All generation methods failed. Please try again.`,
        method: 'canvas',
        serviceName: 'Enhanced Canvas Generator'
      };
    }
  }
}
