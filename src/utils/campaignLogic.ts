/**
 * Campaign Art Direction & Layout Computation Utilities
 * Pure functions for color contrast analysis, safe zone calculation, and advertising copy validation.
 */

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export interface SafeZoneBox {
  x: number; // percentage from left
  y: number; // percentage from top
  w: number; // percentage width
  h: number; // percentage height
}

export interface CampaignSafeZones {
  upperLeftNegativeSpace: SafeZoneBox;
  lowerMarginalZone: SafeZoneBox;
  finalBlockAnchor: { x: number; y: number };
  childSubjectAnchor: { x: number; y: number };
}

export type CampaignFormat = 'square' | 'macro' | 'wide' | 'vertical';

export interface FormatMetadata {
  id: CampaignFormat;
  label: string;
  ratio: string;
  dimensions: { width: number; height: number };
  channel: string;
  safeZones: CampaignSafeZones;
}

/**
 * Converts a 6-character hex string to RGB components.
 */
export function hexToRgb(hex: string): ColorRGB {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length !== 6) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return { r, g, b };
}

/**
 * Calculates WCAG relative luminance of an sRGB color.
 */
export function calculateLuminance(rgb: ColorRGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculates WCAG 2.1 contrast ratio between two hex colors (returns 1 to 21).
 */
export function calculateContrastRatio(hex1: string, hex2: string): number {
  const lum1 = calculateLuminance(hexToRgb(hex1));
  const lum2 = calculateLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return Math.round(ratio * 100) / 100;
}

/**
 * Returns calibrated safe zones and focal anchors for different advertising formats.
 */
export function getFormatMetadata(format: CampaignFormat): FormatMetadata {
  const formats: Record<CampaignFormat, FormatMetadata> = {
    square: {
      id: 'square',
      label: '1:1 Square Feed (Primary)',
      ratio: '1:1',
      dimensions: { width: 1080, height: 1080 },
      channel: 'Instagram / LinkedIn / Facebook Feed',
      safeZones: {
        upperLeftNegativeSpace: { x: 5, y: 5, w: 45, h: 32 },
        lowerMarginalZone: { x: 5, y: 84, w: 90, h: 12 },
        finalBlockAnchor: { x: 49, y: 59 },
        childSubjectAnchor: { x: 67, y: 40 },
      },
    },
    macro: {
      id: 'macro',
      label: '1:1 Macro Apex Detail',
      ratio: '1:1',
      dimensions: { width: 1080, height: 1080 },
      channel: 'Close-up Detail Showcase / High-Impact Carousel',
      safeZones: {
        upperLeftNegativeSpace: { x: 6, y: 6, w: 42, h: 28 },
        lowerMarginalZone: { x: 6, y: 88, w: 88, h: 9 },
        finalBlockAnchor: { x: 48, y: 51 },
        childSubjectAnchor: { x: 68, y: 35 },
      },
    },
    wide: {
      id: 'wide',
      label: '16:9 Billboard / Web Hero',
      ratio: '16:9',
      dimensions: { width: 1920, height: 1080 },
      channel: 'Website Hero / Outdoor LED / YouTube Banner',
      safeZones: {
        upperLeftNegativeSpace: { x: 4, y: 8, w: 44, h: 50 },
        lowerMarginalZone: { x: 4, y: 86, w: 55, h: 10 },
        finalBlockAnchor: { x: 62, y: 53 },
        childSubjectAnchor: { x: 80, y: 42 },
      },
    },
    vertical: {
      id: 'vertical',
      label: '3:4 Editorial / Story Poster',
      ratio: '3:4',
      dimensions: { width: 1080, height: 1440 },
      channel: 'Print Magazine / Digital Totem / Instagram Story',
      safeZones: {
        upperLeftNegativeSpace: { x: 6, y: 6, w: 46, h: 28 },
        lowerMarginalZone: { x: 6, y: 88, w: 88, h: 8 },
        finalBlockAnchor: { x: 60, y: 45 },
        childSubjectAnchor: { x: 38, y: 48 },
      },
    },
  };

  return formats[format] || formats.square;
}

/**
 * Validates advertising copy to ensure headline fits into the reserved negative space.
 */
export function validateAdvertisingCopy(
  headline: string,
  subhead: string
): {
  valid: boolean;
  headlineWordCount: number;
  subheadCharCount: number;
  warning?: string;
} {
  const headlineWords = headline.trim().split(/\s+/).filter(Boolean);
  const headlineWordCount = headlineWords.length;
  const subheadCharCount = subhead.trim().length;

  if (headlineWordCount === 0) {
    return {
      valid: false,
      headlineWordCount: 0,
      subheadCharCount,
      warning: 'Headline cannot be empty.',
    };
  }

  if (headlineWordCount > 10) {
    return {
      valid: false,
      headlineWordCount,
      subheadCharCount,
      warning: 'Headline exceeds 10 words and risks encroaching on child subject area.',
    };
  }

  if (subheadCharCount > 160) {
    return {
      valid: false,
      headlineWordCount,
      subheadCharCount,
      warning: 'Subhead is too long (> 160 chars) for comfortable negative space breathing room.',
    };
  }

  return {
    valid: true,
    headlineWordCount,
    subheadCharCount,
  };
}
