
export class CanvasImageGenerator {
  static generateThumbnail(prompt: string, style: string): string {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 576;
    const ctx = canvas.getContext('2d')!;

    // Background gradient based on style
    const gradients = {
      photorealistic: ['#1e40af', '#3b82f6'],
      cartoon: ['#f59e0b', '#fbbf24'],
      cinematic: ['#7c3aed', '#a855f7'],
      'digital-art': ['#dc2626', '#ef4444']
    };

    const colors = gradients[style as keyof typeof gradients] || gradients.photorealistic;
    const gradient = ctx.createLinearGradient(0, 0, 1024, 576);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 576);

    // Add geometric shapes for visual interest
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.arc(200, 150, 100, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(800, 400, 80, 0, Math.PI * 2);
    ctx.fill();

    // Add main text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(50, 400, 924, 120);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    
    // Split prompt into lines if too long
    const words = prompt.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine + word + ' ';
      if (ctx.measureText(testLine).width > 800 && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());
    
    // Draw text lines
    lines.slice(0, 2).forEach((line, index) => {
      ctx.fillText(line, 512, 440 + (index * 60));
    });

    // Add style indicator
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = colors[0];
    ctx.fillText(`${style.toUpperCase()} STYLE`, 512, 520);

    return canvas.toDataURL('image/jpeg', 0.9);
  }
}
