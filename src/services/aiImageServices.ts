
export interface AIImageService {
  name: string;
  generate: (prompt: string, style: string) => Promise<string>;
  isAvailable: () => Promise<boolean>;
}

// Updated Hugging Face API key with write permissions
const HUGGINGFACE_API_KEY = "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";

export class HuggingFaceService implements AIImageService {
  name = 'Hugging Face';
  private apiKey = HUGGINGFACE_API_KEY;
  private models = [
    "runwayml/stable-diffusion-v1-5",
    "CompVis/stable-diffusion-v1-4",
    "stabilityai/stable-diffusion-2-1"
  ];

  async isAvailable(): Promise<boolean> {
    console.log('🔍 Testing API key availability with multiple models...');
    
    for (const model of this.models) {
      try {
        const response = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            headers: { 
              Authorization: `Bearer ${this.apiKey}`,
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
              inputs: "test",
              parameters: { num_inference_steps: 1 }
            })
          }
        );
        
        console.log(`🔍 Model ${model} response:`, response.status);
        
        if (response.status === 200 || response.status === 503) {
          console.log(`✅ Found working model: ${model}`);
          return true;
        }
        
        if (response.status === 401 || response.status === 403) {
          console.log(`❌ Authentication failed for model: ${model}`);
          continue;
        }
        
      } catch (error) {
        console.log(`❌ Error testing model ${model}:`, error);
        continue;
      }
    }
    
    console.log('❌ All models failed authentication check');
    return false;
  }

  async generate(prompt: string, style: string): Promise<string> {
    const styleMap = {
      'photorealistic': 'photorealistic, high quality, professional photography, realistic, detailed',
      'cartoon': 'cartoon style, animated, colorful, fun, illustration, cartoon art',
      'cinematic': 'cinematic lighting, dramatic, movie-style, professional, cinematic quality',
      'digital-art': 'digital art, artistic, creative design, modern, digital painting'
    };

    const stylePrompt = styleMap[style as keyof typeof styleMap] || styleMap.photorealistic;
    const enhancedPrompt = `YouTube thumbnail: ${prompt}, ${stylePrompt}, bright vibrant colors, high contrast, eye-catching design, professional quality, 16:9 aspect ratio, bold composition, attention-grabbing, trending thumbnail style, masterpiece, best quality`;
    
    console.log('🎨 Generating with enhanced prompt:', enhancedPrompt);
    
    let lastError: Error | null = null;
    
    // Try each model until one works
    for (let i = 0; i < this.models.length; i++) {
      const model = this.models[i];
      console.log(`🚀 Attempting generation with model ${i + 1}/${this.models.length}: ${model}`);
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout

        const response = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              inputs: enhancedPrompt,
              parameters: {
                num_inference_steps: 20,
                guidance_scale: 7.5,
                width: 512,
                height: 288,
                negative_prompt: "blurry, low quality, distorted, ugly, bad anatomy, text, watermark, signature"
              },
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);
        console.log(`🔍 Model ${model} response status:`, response.status);

        if (response.status === 200) {
          const blob = await response.blob();
          console.log('✅ Successfully generated image, blob size:', blob.size);
          
          if (blob.size > 0) {
            const imageUrl = URL.createObjectURL(blob);
            console.log(`🎉 Success with model: ${model}`);
            return imageUrl;
          } else {
            throw new Error('Received empty image data');
          }
        } else if (response.status === 503) {
          const errorData = await response.json().catch(() => ({}));
          if (errorData.error?.includes('loading')) {
            console.log(`⏳ Model ${model} is loading, trying next model...`);
            lastError = new Error(`Model ${model} is loading. Trying alternative model...`);
            continue;
          }
        } else if (response.status === 401 || response.status === 403) {
          console.log(`🔑 Authentication failed for model ${model}, trying next...`);
          lastError = new Error(`Access denied for model ${model}. Your API key may need permissions for this model.`);
          continue;
        } else {
          const errorText = await response.text().catch(() => 'Unknown error');
          console.log(`❌ Model ${model} failed with status ${response.status}:`, errorText);
          lastError = new Error(`Model ${model} failed: ${errorText}`);
          continue;
        }
        
      } catch (error) {
        console.error(`❌ Error with model ${model}:`, error);
        
        if (error instanceof Error && error.name === 'AbortError') {
          lastError = new Error(`Model ${model} timed out. Trying next model...`);
        } else {
          lastError = error as Error;
        }
        continue;
      }
    }
    
    // All models failed
    console.error('❌ All Hugging Face models failed');
    throw lastError || new Error('All available models failed to generate image. Please check your API key permissions.');
  }
}
