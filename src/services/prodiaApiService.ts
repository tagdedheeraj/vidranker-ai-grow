
export interface AIImageService {
  name: string;
  generate: (prompt: string, style: string) => Promise<string>;
  isAvailable: () => Promise<boolean>;
}

// Prodia API - Free tier available
const PRODIA_API_KEY = ""; // User will need to add this or we'll use free endpoint
const PRODIA_BASE_URL = "https://api.prodia.com/v1";

export class ProdiaApiService implements AIImageService {
  name = 'Prodia API';
  private apiKey = PRODIA_API_KEY;
  private baseUrl = PRODIA_BASE_URL;

  async isAvailable(): Promise<boolean> {
    console.log('🔍 Testing Prodia API availability...');
    
    try {
      // Test with generation endpoint
      const response = await fetch(`${this.baseUrl}/sd/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'X-Prodia-Key': this.apiKey })
        },
        body: JSON.stringify({
          prompt: 'test image',
          model: 'sd_xl_base_1.0.safetensors [be9edd61]',
          steps: 10,
          cfg_scale: 7,
          seed: -1,
          sampler: 'DPM++ 2M Karras',
          aspect_ratio: 'landscape'
        })
      });
      
      console.log(`🔍 Prodia API test response:`, response.status);
      return response.status === 200 || response.status === 202;
    } catch (error) {
      console.log('❌ Error testing Prodia API:', error);
      return false;
    }
  }

  async generate(prompt: string, style: string): Promise<string> {
    const styleMap = {
      'photorealistic': 'photorealistic, highly detailed, professional photography, 8k, sharp focus',
      'cartoon': 'cartoon style, animated, colorful, disney style, illustration',
      'cinematic': 'cinematic lighting, dramatic, movie poster style, epic, professional',
      'digital-art': 'digital art, concept art, artstation, detailed, creative'
    };

    const stylePrompt = styleMap[style as keyof typeof styleMap] || styleMap.photorealistic;
    const enhancedPrompt = `${prompt}, ${stylePrompt}, YouTube thumbnail, bright colors, eye-catching, professional quality, masterpiece`;
    
    console.log('🎨 Generating with Prodia API enhanced prompt:', enhancedPrompt);
    
    try {
      // Step 1: Start generation
      const generateResponse = await fetch(`${this.baseUrl}/sd/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'X-Prodia-Key': this.apiKey })
        },
        body: JSON.stringify({
          prompt: enhancedPrompt,
          model: 'sd_xl_base_1.0.safetensors [be9edd61]',
          steps: 20,
          cfg_scale: 7,
          seed: -1,
          sampler: 'DPM++ 2M Karras',
          aspect_ratio: 'landscape',
          negative_prompt: 'blurry, low quality, distorted, ugly, bad anatomy, text, watermark'
        })
      });

      if (!generateResponse.ok) {
        throw new Error(`Generation failed: ${generateResponse.status}`);
      }

      const generateData = await generateResponse.json();
      const jobId = generateData.job;
      
      console.log('🔄 Prodia generation started, job ID:', jobId);

      // Step 2: Poll for completion
      let attempts = 0;
      const maxAttempts = 30; // 30 seconds max wait
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        
        const statusResponse = await fetch(`${this.baseUrl}/job/${jobId}`, {
          headers: {
            ...(this.apiKey && { 'X-Prodia-Key': this.apiKey })
          }
        });
        
        if (!statusResponse.ok) {
          throw new Error(`Status check failed: ${statusResponse.status}`);
        }
        
        const statusData = await statusResponse.json();
        console.log(`🔄 Prodia job status (${attempts + 1}/${maxAttempts}):`, statusData.status);
        
        if (statusData.status === 'succeeded') {
          console.log('🎉 Success with Prodia API');
          return statusData.imageUrl;
        } else if (statusData.status === 'failed') {
          throw new Error('Generation failed on Prodia servers');
        }
        
        attempts++;
      }
      
      throw new Error('Generation timed out on Prodia servers');
      
    } catch (error) {
      console.error('❌ Error with Prodia API:', error);
      throw error;
    }
  }
}
