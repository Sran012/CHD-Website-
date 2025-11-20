// Seeded random number generator for consistent randomness
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

export type AestheticMode = 'minimalist' | 'balanced' | 'maximalist';
export type WeavePattern = 'plain' | 'twill' | 'herringbone' | 'basket';

export interface ColorPalette {
  colors: string[];
  mode: AestheticMode;
}

export interface ThreadConfig {
  warpCount: number;
  weftCount: number;
  thickness: [number, number];
  opacity: [number, number];
  speed: [number, number];
  pattern: WeavePattern;
}

// Generate aesthetic mode based on seed
export const getAestheticMode = (seed: number): AestheticMode => {
  const random = new SeededRandom(seed);
  const value = random.next();
  
  if (value < 0.35) return 'minimalist';
  if (value < 0.75) return 'balanced';
  return 'maximalist';
};

// Convert HSL to string format
const hslToString = (h: number, s: number, l: number): string => {
  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
};

// Textile-inspired color palettes
const textileColorSets = {
  natural: [
    { h: 30, s: 15, l: 85 },   // Cotton white
    { h: 40, s: 25, l: 75 },   // Linen beige
    { h: 35, s: 30, l: 60 },   // Jute tan
    { h: 25, s: 20, l: 70 },   // Natural cream
  ],
  earth: [
    { h: 25, s: 40, l: 45 },   // Terracotta
    { h: 30, s: 35, l: 40 },   // Clay brown
    { h: 45, s: 30, l: 50 },   // Sand
    { h: 20, s: 45, l: 35 },   // Rust
  ],
  indigo: [
    { h: 220, s: 60, l: 35 },  // Deep indigo
    { h: 210, s: 50, l: 55 },  // Denim blue
    { h: 200, s: 40, l: 70 },  // Light blue
    { h: 230, s: 45, l: 45 },  // Navy
  ],
  botanical: [
    { h: 85, s: 35, l: 45 },   // Olive
    { h: 140, s: 40, l: 40 },  // Forest green
    { h: 160, s: 30, l: 50 },  // Sage
    { h: 100, s: 35, l: 55 },  // Moss
  ],
  burgundy: [
    { h: 350, s: 50, l: 35 },  // Burgundy
    { h: 0, s: 45, l: 40 },    // Deep red
    { h: 340, s: 40, l: 50 },  // Rose
    { h: 10, s: 35, l: 45 },   // Brick
  ],
};

// Generate color palette based on aesthetic mode and textile inspiration
export const generateColorPalette = (mode: AestheticMode, seed: number): ColorPalette => {
  const random = new SeededRandom(seed + 1000);
  const colors: string[] = [];
  
  // Select a textile color set
  const setKeys = Object.keys(textileColorSets) as Array<keyof typeof textileColorSets>;
  const selectedSet = textileColorSets[setKeys[Math.floor(random.next() * setKeys.length)]];
  
  if (mode === 'minimalist') {
    // 2-3 colors from natural/earth palettes
    const colorCount = Math.floor(random.next() * 2) + 2;
    const preferredSets: Array<keyof typeof textileColorSets> = ['natural', 'earth'];
    const set = textileColorSets[preferredSets[Math.floor(random.next() * preferredSets.length)]];
    
    for (let i = 0; i < colorCount; i++) {
      const base = set[Math.floor(random.next() * set.length)];
      const hue = base.h + (random.next() - 0.5) * 10;
      const saturation = base.s + (random.next() - 0.5) * 10;
      const lightness = base.l + (random.next() - 0.5) * 10;
      colors.push(hslToString(hue, saturation, lightness));
    }
  } else if (mode === 'balanced') {
    // 3-4 colors with harmonious palette
    const colorCount = Math.floor(random.next() * 2) + 3;
    
    for (let i = 0; i < colorCount; i++) {
      const base = selectedSet[i % selectedSet.length];
      const hue = base.h + (random.next() - 0.5) * 15;
      const saturation = base.s + (random.next() - 0.5) * 15;
      const lightness = base.l + (random.next() - 0.5) * 15;
      colors.push(hslToString(hue, saturation, lightness));
    }
  } else {
    // 5-7 colors with rich variety
    const colorCount = Math.floor(random.next() * 3) + 5;
    
    // Mix colors from different sets
    for (let i = 0; i < colorCount; i++) {
      const setKey = setKeys[Math.floor(random.next() * setKeys.length)];
      const set = textileColorSets[setKey];
      const base = set[Math.floor(random.next() * set.length)];
      const hue = base.h + (random.next() - 0.5) * 20;
      const saturation = Math.min(90, base.s + (random.next() - 0.5) * 20);
      const lightness = base.l + (random.next() - 0.5) * 20;
      colors.push(hslToString(hue, saturation, lightness));
    }
  }
  
  return { colors, mode };
};

// Get thread configuration based on mode
export const getThreadConfig = (mode: AestheticMode, seed: number): ThreadConfig => {
  const random = new SeededRandom(seed + 2000);
  
  // Weave pattern selection
  const patterns: WeavePattern[] = ['plain', 'twill', 'herringbone', 'basket'];
  const pattern = patterns[Math.floor(random.next() * patterns.length)];
  
  if (mode === 'minimalist') {
    return {
      warpCount: Math.floor(random.next() * 11) + 15, // 15-25
      weftCount: Math.floor(random.next() * 6) + 10,  // 10-15
      thickness: [1, 2],
      opacity: [0.10, 0.18],
      speed: [0.2, 0.4],
      pattern,
    };
  } else if (mode === 'balanced') {
    return {
      warpCount: Math.floor(random.next() * 11) + 25, // 25-35
      weftCount: Math.floor(random.next() * 11) + 15, // 15-25
      thickness: [1.5, 3],
      opacity: [0.18, 0.28],
      speed: [0.3, 0.6],
      pattern,
    };
  } else {
    return {
      warpCount: Math.floor(random.next() * 16) + 35, // 35-50
      weftCount: Math.floor(random.next() * 16) + 25, // 25-40
      thickness: [2, 4],
      opacity: [0.25, 0.40],
      speed: [0.4, 0.8],
      pattern,
    };
  }
};

// Thread class for managing individual thread state
export class Thread {
  x: number;
  y: number;
  color: string;
  thickness: number;
  opacity: number;
  speed: number;
  phase: number;
  isWarp: boolean;
  overPattern: boolean[];
  fadeIn: number;
  
  constructor(
    x: number,
    y: number,
    color: string,
    thickness: number,
    opacity: number,
    speed: number,
    isWarp: boolean,
    warpCount: number
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.thickness = thickness;
    this.opacity = opacity;
    this.speed = speed;
    this.phase = Math.random() * Math.PI * 2;
    this.isWarp = isWarp;
    this.fadeIn = 0;
    
    // Generate over/under pattern for this thread
    this.overPattern = [];
    for (let i = 0; i < warpCount; i++) {
      this.overPattern.push(Math.random() > 0.5);
    }
  }
  
  update(time: number, canvasWidth: number, canvasHeight: number) {
    if (this.isWarp) {
      // Vertical threads with subtle oscillation
      const oscillation = Math.sin(time * 0.001 * this.speed + this.phase) * 2;
      this.x = this.x + oscillation * 0.1;
    } else {
      // Horizontal threads moving across
      this.y += Math.sin(time * 0.001 + this.phase) * 0.05;
    }
    
    // Fade in animation
    if (this.fadeIn < 1) {
      this.fadeIn += 0.01;
    }
  }

  // Get depth offset for over/under effect
  getDepthOffset(index: number): number {
    return this.overPattern[index] ? 1 : -1;
  }
}
