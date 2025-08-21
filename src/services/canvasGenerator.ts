
export class CanvasImageGenerator {
  static generateThumbnail(prompt: string, style: string): string {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 576;
    const ctx = canvas.getContext('2d')!;

    // Background gradient based on style
    const gradients = {
      photorealistic: ['#2563eb', '#3b82f6', '#60a5fa'],
      cartoon: ['#f59e0b', '#fbbf24', '#fcd34d'],
      cinematic: ['#7c3aed', '#a855f7', '#c084fc'],
      'digital-art': ['#dc2626', '#ef4444', '#f87171']
    };

    const colors = gradients[style as keyof typeof gradients] || gradients.photorealistic;
    
    // Create complex gradient
    const gradient = ctx.createRadialGradient(512, 288, 0, 512, 288, 600);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, colors[2]);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 576);

    // Add geometric shapes for visual interest
    ctx.globalAlpha = 0.2;
    
    // Large circles
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(150, 150, 120, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(850, 400, 100, 0, Math.PI * 2);
    ctx.fill();
    
    // Triangular shapes
    ctx.beginPath();
    ctx.moveTo(700, 100);
    ctx.lineTo(800, 100);
    ctx.lineTo(750, 200);
    ctx.closePath();
    ctx.fill();
    
    // Lines and patterns
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.3;
    
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 115);
      ctx.lineTo(1024, i * 115 + 50);
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;

    // Main content area with better design
    const contentY = 350;
    const contentHeight = 180;
    
    // Background for text with blur effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 20;
    ctx.fillRect(40, contentY, 944, contentHeight);
    ctx.shadowBlur = 0;
    
    // Border
    ctx.strokeStyle = colors[0];
    ctx.lineWidth = 4;
    ctx.strokeRect(40, contentY, 944, contentHeight);
    
    // Main title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 42px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 4;
    
    // Split prompt into lines
    const words = prompt.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine + word + ' ';
      if (ctx.measureText(testLine).width > 850 && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());
    
    // Draw main text
    const maxLines = 2;
    const displayLines = lines.slice(0, maxLines);
    displayLines.forEach((line, index) => {
      const y = contentY + 70 + (index * 50);
      ctx.fillText(line, 512, y);
    });
    
    // Style indicator with better design
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.fillStyle = colors[0];
    const styleText = `${style.toUpperCase()} • CANVAS GENERATED`;
    ctx.fillText(styleText, 512, contentY + 150);
    
    // Add decorative elements
    ctx.fillStyle = colors[1];
    ctx.globalAlpha = 0.8;
    
    // Corner decorations
    ctx.beginPath();
    ctx.moveTo(40, contentY);
    ctx.lineTo(80, contentY);
    ctx.lineTo(40, contentY + 40);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(984, contentY);
    ctx.lineTo(944, contentY);
    ctx.lineTo(984, contentY + 40);
    ctx.closePath();
    ctx.fill();
    
    ctx.globalAlpha = 1;
    
    // Add YouTube play button style icon
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(512, 200, 60, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = colors[0];
    ctx.beginPath();
    ctx.moveTo(490, 180);
    ctx.lineTo(490, 220);
    ctx.lineTo(530, 200);
    ctx.closePath();
    ctx.fill();

    console.log('🎨 Enhanced Canvas thumbnail generated');
    return canvas.toDataURL('image/jpeg', 0.95);
  }
}
