import { useEffect, useRef, useState } from 'react';
import {
  generateColorPalette,
  getAestheticMode,
  getThreadConfig,
  Thread,
  type AestheticMode,
} from '@/lib/weavingUtils';

export const WeavingAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<AestheticMode>('balanced');
  const animationRef = useRef<number>();
  const threadsRef = useRef<{
    warp: Thread[];
    weft: Thread[];
  }>({ warp: [], weft: [] });
  const lastWeftAddTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Generate seed and aesthetic mode
    const seed = Math.floor(Math.random() * 100000);
    const aestheticMode = getAestheticMode(seed);
    setMode(aestheticMode);

    // Generate color palette and thread config
    const palette = generateColorPalette(aestheticMode, seed);
    const config = getThreadConfig(aestheticMode, seed);

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeThreads();
    };

    const initializeThreads = () => {
      threadsRef.current = { warp: [], weft: [] };

      // Create warp threads (vertical) - evenly spaced
      const warpSpacing = canvas.width / (config.warpCount + 1);
      for (let i = 0; i < config.warpCount; i++) {
        const x = warpSpacing * (i + 1);
        const color = palette.colors[Math.floor(Math.random() * palette.colors.length)];
        const thickness = config.thickness[0] + Math.random() * (config.thickness[1] - config.thickness[0]);
        const opacity = config.opacity[0] + Math.random() * (config.opacity[1] - config.opacity[0]);
        const speed = config.speed[0] + Math.random() * (config.speed[1] - config.speed[0]);

        threadsRef.current.warp.push(
          new Thread(x, 0, color, thickness, opacity, speed, true, config.warpCount)
        );
      }

      // Create initial weft threads (horizontal) - start from top, gradually add
      const initialWeftCount = Math.floor(config.weftCount * 0.4);
      const weftSpacing = canvas.height / (config.weftCount + 1);
      for (let i = 0; i < initialWeftCount; i++) {
        const y = weftSpacing * (i + 1);
        const color = palette.colors[Math.floor(Math.random() * palette.colors.length)];
        const thickness = config.thickness[0] + Math.random() * (config.thickness[1] - config.thickness[0]);
        const opacity = config.opacity[0] + Math.random() * (config.opacity[1] - config.opacity[0]);
        const speed = config.speed[0] + Math.random() * (config.speed[1] - config.speed[0]);

        const thread = new Thread(0, y, color, thickness, opacity, speed, false, config.warpCount);
        thread.fadeIn = 1; // Already visible
        threadsRef.current.weft.push(thread);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    let startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      // Clear canvas with transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new weft thread gradually (every 2-5 seconds)
      if (currentTime - lastWeftAddTime.current > 2000 + Math.random() * 3000) {
        if (threadsRef.current.weft.length < config.weftCount) {
          const weftSpacing = canvas.height / (config.weftCount + 1);
          const y = weftSpacing * (threadsRef.current.weft.length + 1);
          const color = palette.colors[Math.floor(Math.random() * palette.colors.length)];
          const thickness = config.thickness[0] + Math.random() * (config.thickness[1] - config.thickness[0]);
          const opacity = config.opacity[0] + Math.random() * (config.opacity[1] - config.opacity[0]);
          const speed = config.speed[0] + Math.random() * (config.speed[1] - config.speed[0]);

          threadsRef.current.weft.push(
            new Thread(0, y, color, thickness, opacity, speed, false, config.warpCount)
          );
          lastWeftAddTime.current = currentTime;
        }
      }

      // Update all threads
      const time = elapsed * 0.001;
      threadsRef.current.warp.forEach(thread => thread.update(time, canvas.width, canvas.height));
      threadsRef.current.weft.forEach(thread => thread.update(time, canvas.width, canvas.height));

      // Draw warp threads (vertical) with texture
      ctx.lineCap = 'round';
      threadsRef.current.warp.forEach((thread) => {
        ctx.save();
        
        // Draw thread with slight shadow for depth
        ctx.shadowBlur = 2;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        
        // Main thread line
        ctx.strokeStyle = thread.color;
        ctx.globalAlpha = thread.opacity * thread.fadeIn;
        ctx.lineWidth = thread.thickness;
        
        ctx.beginPath();
        ctx.moveTo(thread.x + thread.y, 0);
        ctx.lineTo(thread.x + thread.y, canvas.height);
        ctx.stroke();
        
        // Add highlight for shimmer effect
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * thread.fadeIn})`;
        ctx.lineWidth = thread.thickness * 0.3;
        ctx.beginPath();
        ctx.moveTo(thread.x + thread.y - thread.thickness * 0.2, 0);
        ctx.lineTo(thread.x + thread.y - thread.thickness * 0.2, canvas.height);
        ctx.stroke();
        
        ctx.restore();
      });

      // Draw weft threads (horizontal) with weaving pattern
      threadsRef.current.weft.forEach((thread) => {
        ctx.save();
        
        const segmentLength = canvas.width / threadsRef.current.warp.length;
        
        ctx.strokeStyle = thread.color;
        ctx.globalAlpha = thread.opacity * thread.fadeIn;
        ctx.lineWidth = thread.thickness;
        ctx.shadowBlur = 2;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        
        // Draw weft thread in segments to show over/under pattern
        for (let i = 0; i < threadsRef.current.warp.length; i++) {
          const startX = i * segmentLength;
          const endX = (i + 1) * segmentLength;
          const depthOffset = thread.getDepthOffset(i) * 0.5;
          
          ctx.beginPath();
          ctx.moveTo(startX, thread.y + thread.x + depthOffset);
          ctx.lineTo(endX, thread.y + thread.x + depthOffset);
          ctx.stroke();
        }
        
        // Add highlight
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * thread.fadeIn})`;
        ctx.lineWidth = thread.thickness * 0.3;
        
        for (let i = 0; i < threadsRef.current.warp.length; i++) {
          const startX = i * segmentLength;
          const endX = (i + 1) * segmentLength;
          const depthOffset = thread.getDepthOffset(i) * 0.5;
          
          ctx.beginPath();
          ctx.moveTo(startX, thread.y + thread.x - thread.thickness * 0.2 + depthOffset);
          ctx.lineTo(endX, thread.y + thread.x - thread.thickness * 0.2 + depthOffset);
          ctx.stroke();
        }
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full"
      style={{ 
        mixBlendMode: 'normal',
        opacity: 1
      }}
    />
  );
};
