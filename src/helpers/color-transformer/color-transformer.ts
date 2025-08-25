// External

// Internal
import type { ContrastColor, SeedColors } from './color-transformer.types';

export class ColorTransformer {
  private static hash(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h);
    return h;
  }

  static stringToColor(s: string): string {
    const h = this.hash(s || '');
    let out = '#';
    for (let i = 0; i < 3; i++)
      out += ((h >> (i * 8)) & 0xff).toString(16).padStart(2, '0');
    return out;
  }

  static getContrastColor(hex: string, threshold = 140): ContrastColor {
    let c = hex.replace('#', '').trim();
    if (c.length === 3)
      c = c
        .split('')
        .map((ch) => ch + ch)
        .join('');
    c = c.slice(0, 6).padEnd(6, '0');
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 >= threshold ? '#000' : '#fff';
  }

  static forSeed(seed: string): SeedColors {
    const bg = this.stringToColor(seed);
    const fg = this.getContrastColor(bg);
    return { bg, fg };
  }
}
