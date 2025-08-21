
export interface AIImageService {
  name: string;
  generate: (prompt: string, style: string) => Promise<string>;
  isAvailable: () => Promise<boolean>;
}

export class HuggingFaceService implements AIImageService {
  name = 'Hugging Face';
  private apiKey = "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";

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        {
          headers: { Authorization: `Bearer ${this.apiKey}` },
          method: "HEAD"
        }
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  async generate(prompt: string, style: string): Promise<string> {
    const enhancedPrompt = `YouTube thumbnail, ${style} style, ${prompt}, bright colors, high contrast, eye-catching, professional quality, 16:9 aspect ratio, clickbait style, bold text overlay space, dramatic lighting`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: enhancedPrompt,
            parameters: {
              width: 1024,
              height: 576,
              num_inference_steps: 4,
            },
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error ${response.status}`);
      }

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
}

export class PollinalService implements AIImageService {
  name = 'Pollinal';

  async isAvailable(): Promise<boolean> {
    return true; // Free service, usually available
  }

  async generate(prompt: string): Promise<string> {
    const enhancedPrompt = encodeURIComponent(`YouTube thumbnail: ${prompt}`);
    return `https://pollinations.ai/p/${enhancedPrompt}?width=1024&height=576&seed=${Math.floor(Math.random() * 1000000)}`;
  }
}

export class UnsplashService implements AIImageService {
  name = 'Unsplash';

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async generate(prompt: string): Promise<string> {
    const keywords = prompt.split(' ').slice(0, 3).join(',');
    const seed = Math.floor(Math.random() * 1000000);
    return `https://source.unsplash.com/1024x576/?${keywords}&sig=${seed}`;
  }
}
