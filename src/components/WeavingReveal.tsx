import { useEffect, useRef, useState } from 'react';

interface RevealCircle {
  x: number;
  y: number;
  radius: number;
  velocityX: number;
  velocityY: number;
}

export const WeavingReveal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<RevealCircle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize reveal circles with random positions and directions
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const circleRadius = Math.min(canvas.width, canvas.height) * 0.12;
      
      const newCircles: RevealCircle[] = [];
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * Math.min(canvas.width, canvas.height) * 0.3;
        const speed = 0.02 + Math.random() * 0.03; // Very slow: 0.02-0.05 pixels per frame
        
        newCircles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          radius: circleRadius * (0.4 + Math.random() * 0.6),
          velocityX: (Math.random() - 0.5) * speed,
          velocityY: (Math.random() - 0.5) * speed
        });
      }
      
      setCircles(newCircles);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // No overlay - we want hero images to be fully visible by default
      // We'll draw solid circles that will block the hero images to reveal weaving below
      ctx.globalCompositeOperation = 'source-over';
      
      circles.forEach((circle) => {
        // Smooth edge avoidance - gradually curve away from edges
        const edgeMargin = circle.radius * 2;
        const turnStrength = 0.0005;
        
        // Apply gentle steering force away from edges
        if (circle.x < edgeMargin) {
          circle.velocityX += turnStrength * (edgeMargin - circle.x) / edgeMargin;
        } else if (circle.x > canvas.width - edgeMargin) {
          circle.velocityX -= turnStrength * (circle.x - (canvas.width - edgeMargin)) / edgeMargin;
        }
        
        if (circle.y < edgeMargin) {
          circle.velocityY += turnStrength * (edgeMargin - circle.y) / edgeMargin;
        } else if (circle.y > canvas.height - edgeMargin) {
          circle.velocityY -= turnStrength * (circle.y - (canvas.height - edgeMargin)) / edgeMargin;
        }
        
        // Normalize velocity to maintain consistent speed
        const speed = Math.sqrt(circle.velocityX ** 2 + circle.velocityY ** 2);
        const targetSpeed = 0.035;
        if (speed > 0) {
          circle.velocityX = (circle.velocityX / speed) * targetSpeed;
          circle.velocityY = (circle.velocityY / speed) * targetSpeed;
        }
        
        // Update position
        circle.x += circle.velocityX;
        circle.y += circle.velocityY;
        
        const x = circle.x;
        const y = circle.y;
        
        // Draw transparent circle with soft edges to reveal weaving below
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, circle.radius);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.3, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
        
        ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Solid black to hide hero images
        ctx.beginPath();
        ctx.arc(x, y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Create inner transparent circle to show weaving
        ctx.globalCompositeOperation = 'destination-out';
        const innerGradient = ctx.createRadialGradient(x, y, 0, x, y, circle.radius * 0.9);
        innerGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        innerGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.8)');
        innerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = innerGradient;
        ctx.beginPath();
        ctx.arc(x, y, circle.radius * 0.9, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalCompositeOperation = 'source-over';
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [circles.length]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[2]"
      style={{
        mixBlendMode: 'normal'
      }}
    />
  );
};
