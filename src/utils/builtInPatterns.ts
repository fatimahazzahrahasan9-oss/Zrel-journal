import { PatternConfig } from '../types/journal';

// Helper to encode SVG string to data URI
export function svgToDataUri(svgString: string): string {
  const cleaned = svgString.trim().replace(/\s+/g, ' ');
  return `data:image/svg+xml;utf8,${encodeURIComponent(cleaned)}`;
}

export interface BuiltInPatternItem {
  id: string;
  name: string;
  nameEn: string;
  category: PatternConfig['category'];
  description: string;
  descriptionEn: string;
  defaultCompanionBg: string;
  accentColor: string;
  svgTemplate: (fgColor: string, bgColor?: string) => string;
}

export const BUILT_IN_PATTERNS: BuiltInPatternItem[] = [
  {
    id: 'botanical-leaves',
    name: 'Botanical Leaves',
    nameEn: 'Botanical Leaves',
    category: 'botanical',
    description: 'Motif dedaunan eucalyptus dan monstera anggun bernuansa alam',
    descriptionEn: 'Graceful eucalyptus and monstera foliage with natural serenity',
    defaultCompanionBg: '#F3F6F2',
    accentColor: '#5E7A63',
    svgTemplate: (fg, bg = '#F3F6F2') => `
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
        <rect width="80" height="80" fill="${bg}"/>
        <path d="M12 28 C16 16, 26 12, 34 16 C30 24, 24 28, 12 28 Z" fill="${fg}" fill-opacity="0.28"/>
        <path d="M14 26 C22 18, 30 16, 34 16" stroke="${fg}" stroke-width="1.2" stroke-linecap="round" fill="none" stroke-opacity="0.6"/>
        <path d="M52 68 C56 56, 66 52, 74 56 C70 64, 64 68, 52 68 Z" fill="${fg}" fill-opacity="0.28"/>
        <path d="M54 66 C62 58, 70 56, 74 56" stroke="${fg}" stroke-width="1.2" stroke-linecap="round" fill="none" stroke-opacity="0.6"/>
        <path d="M55 22 C62 14, 72 16, 70 26 C62 28, 56 26, 55 22 Z" fill="${fg}" fill-opacity="0.2"/>
        <path d="M18 62 C24 54, 34 56, 32 66 C24 68, 19 66, 18 62 Z" fill="${fg}" fill-opacity="0.2"/>
        <circle cx="40" cy="40" r="1.5" fill="${fg}" fill-opacity="0.4"/>
      </svg>
    `,
  },
  {
    id: 'tiny-floral',
    name: 'Tiny Floral',
    nameEn: 'Tiny Floral',
    category: 'floral',
    description: 'Bunga-bunga mungil vintage yang manis dan feminin',
    descriptionEn: 'Sweet, delicate vintage meadow blossom motif',
    defaultCompanionBg: '#FAF5F3',
    accentColor: '#C07D78',
    svgTemplate: (fg, bg = '#FAF5F3') => `
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
        <rect width="60" height="60" fill="${bg}"/>
        <g transform="translate(18, 18)">
          <circle cx="-5" cy="0" r="3.2" fill="${fg}" fill-opacity="0.35"/>
          <circle cx="5" cy="0" r="3.2" fill="${fg}" fill-opacity="0.35"/>
          <circle cx="0" cy="-5" r="3.2" fill="${fg}" fill-opacity="0.35"/>
          <circle cx="0" cy="5" r="3.2" fill="${fg}" fill-opacity="0.35"/>
          <circle cx="0" cy="0" r="2.2" fill="#D99B52" fill-opacity="0.8"/>
        </g>
        <g transform="translate(48, 48)">
          <circle cx="-4" cy="0" r="2.6" fill="${fg}" fill-opacity="0.3"/>
          <circle cx="4" cy="0" r="2.6" fill="${fg}" fill-opacity="0.3"/>
          <circle cx="0" cy="-4" r="2.6" fill="${fg}" fill-opacity="0.3"/>
          <circle cx="0" cy="4" r="2.6" fill="${fg}" fill-opacity="0.3"/>
          <circle cx="0" cy="0" r="1.8" fill="#D99B52" fill-opacity="0.7"/>
        </g>
        <path d="M46 16 Q50 18 48 22" stroke="#68846A" stroke-width="1" fill="none" stroke-linecap="round"/>
        <circle cx="49" cy="19" r="1.2" fill="#68846A" fill-opacity="0.6"/>
      </svg>
    `,
  },
  {
    id: 'vintage-wallpaper',
    name: 'Vintage Wallpaper',
    nameEn: 'Vintage Damask',
    category: 'vintage',
    description: 'Ornamen damask mewah bergaya arsip perpustakaan Eropa klasik',
    descriptionEn: 'Opulent archival damask filigree with European stationery warmth',
    defaultCompanionBg: '#F7F3EB',
    accentColor: '#8C6C52',
    svgTemplate: (fg, bg = '#F7F3EB') => `
      <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
        <rect width="70" height="70" fill="${bg}"/>
        <path d="M35 10 C30 18, 22 22, 22 30 C22 38, 30 42, 35 50 C40 42, 48 38, 48 30 C48 22, 40 18, 35 10 Z" fill="none" stroke="${fg}" stroke-width="1.2" stroke-opacity="0.35"/>
        <circle cx="35" cy="30" r="3" fill="${fg}" fill-opacity="0.28"/>
        <path d="M35 22 C32 26, 32 34, 35 38 C38 34, 38 26, 35 22 Z" fill="${fg}" fill-opacity="0.18"/>
        <path d="M10 60 C15 54, 25 54, 25 64" stroke="${fg}" stroke-width="1" stroke-opacity="0.25" fill="none"/>
        <path d="M60 60 C55 54, 45 54, 45 64" stroke="${fg}" stroke-width="1" stroke-opacity="0.25" fill="none"/>
        <circle cx="0" cy="0" r="2" fill="${fg}" fill-opacity="0.2"/>
        <circle cx="70" cy="0" r="2" fill="${fg}" fill-opacity="0.2"/>
        <circle cx="0" cy="70" r="2" fill="${fg}" fill-opacity="0.2"/>
        <circle cx="70" cy="70" r="2" fill="${fg}" fill-opacity="0.2"/>
      </svg>
    `,
  },
  {
    id: 'gingham-check',
    name: 'Gingham Check',
    nameEn: 'Gingham Check',
    category: 'gingham',
    description: 'Pola kotak-kotak hangat yang nyaman dan abadi khas piknik',
    descriptionEn: 'Timeless cozy woven check with inviting stationery charm',
    defaultCompanionBg: '#FAF9F5',
    accentColor: '#7B8C7E',
    svgTemplate: (fg, bg = '#FAF9F5') => `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <rect width="40" height="40" fill="${bg}"/>
        <rect x="0" y="0" width="20" height="40" fill="${fg}" fill-opacity="0.12"/>
        <rect x="0" y="0" width="40" height="20" fill="${fg}" fill-opacity="0.12"/>
        <rect x="0" y="0" width="20" height="20" fill="${fg}" fill-opacity="0.18"/>
      </svg>
    `,
  },
  {
    id: 'polka-dots',
    name: 'Polka Dots',
    nameEn: 'Polka Dots',
    category: 'dots',
    description: 'Titik-titik rapi minimalis yang tenang dan menyegarkan mata',
    descriptionEn: 'Crisp, measured French polka dot grid with breathing room',
    defaultCompanionBg: '#F8F7F4',
    accentColor: '#6B7A82',
    svgTemplate: (fg, bg = '#F8F7F4') => `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <rect width="40" height="40" fill="${bg}"/>
        <circle cx="10" cy="10" r="2.4" fill="${fg}" fill-opacity="0.32"/>
        <circle cx="30" cy="30" r="2.4" fill="${fg}" fill-opacity="0.32"/>
      </svg>
    `,
  },
  {
    id: 'stars-celestial',
    name: 'Stars & Celestial',
    nameEn: 'Stars & Celestial',
    category: 'celestial',
    description: 'Bulan sabit, gugusan rasi bintang, dan serpihan debu kosmik magis',
    descriptionEn: 'Crescent moon slivers, delicate four-point stars, and cosmic stardust',
    defaultCompanionBg: '#F5F4FA',
    accentColor: '#675D82',
    svgTemplate: (fg, bg = '#F5F4FA') => `
      <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
        <rect width="70" height="70" fill="${bg}"/>
        <!-- Crescent Moon -->
        <path d="M22 18 A9 9 0 0 0 31 27 A10 10 0 0 1 22 18 Z" fill="${fg}" fill-opacity="0.38"/>
        <!-- 4-point Star -->
        <path d="M52 46 Q52 49 55 49 Q52 49 52 52 Q52 49 49 49 Q52 49 52 46 Z" fill="${fg}" fill-opacity="0.45"/>
        <path d="M18 52 Q18 54 20 54 Q18 54 18 56 Q18 54 16 54 Q18 54 18 52 Z" fill="${fg}" fill-opacity="0.35"/>
        <circle cx="48" cy="20" r="1.2" fill="${fg}" fill-opacity="0.4"/>
        <circle cx="36" cy="58" r="1" fill="${fg}" fill-opacity="0.3"/>
        <circle cx="62" cy="32" r="1.4" fill="${fg}" fill-opacity="0.35"/>
      </svg>
    `,
  },
  {
    id: 'abstract-organic',
    name: 'Abstract Organic',
    nameEn: 'Abstract Organic',
    category: 'abstract',
    description: 'Bentuk-bentuk organik lembut terinspirasi seni kolase modern',
    descriptionEn: 'Soft organic pebble shapes inspired by mindful modern collage',
    defaultCompanionBg: '#F7F5EE',
    accentColor: '#967969',
    svgTemplate: (fg, bg = '#F7F5EE') => `
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
        <rect width="80" height="80" fill="${bg}"/>
        <path d="M16 22 C12 36, 26 44, 34 38 C40 32, 30 14, 16 22 Z" fill="${fg}" fill-opacity="0.22"/>
        <path d="M54 52 C48 64, 62 72, 70 64 C76 56, 64 44, 54 52 Z" fill="${fg}" fill-opacity="0.18"/>
        <circle cx="62" cy="22" r="6" fill="#C29B78" fill-opacity="0.25"/>
        <path d="M24 64 Q32 58 40 66" stroke="${fg}" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.3" fill="none"/>
      </svg>
    `,
  },
  {
    id: 'minimalist-geometric',
    name: 'Minimalist Geometric',
    nameEn: 'Architectural Geometric',
    category: 'geometric',
    description: 'Garis lengkung busur dan grid arsitektur Art Deco yang presisi',
    descriptionEn: 'Clean architectural arches and linear geometry with quiet rhythm',
    defaultCompanionBg: '#F8F7F3',
    accentColor: '#4F5D6B',
    svgTemplate: (fg, bg = '#F8F7F3') => `
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
        <rect width="60" height="60" fill="${bg}"/>
        <path d="M10 60 L10 30 A20 20 0 0 1 50 30 L50 60" stroke="${fg}" stroke-width="1.2" fill="none" stroke-opacity="0.32"/>
        <path d="M20 60 L20 35 A10 10 0 0 1 40 35 L40 60" stroke="${fg}" stroke-width="1" fill="none" stroke-opacity="0.2"/>
        <circle cx="30" cy="18" r="2.5" fill="${fg}" fill-opacity="0.3"/>
      </svg>
    `,
  },
  {
    id: 'soft-pastel-clouds',
    name: 'Pastel Clouds',
    nameEn: 'Pastel Clouds',
    category: 'clouds',
    description: 'Awan-awan halus di langit senja pastel yang menenangkan pikiran',
    descriptionEn: 'Gentle dreamy cumulus clouds drifting across tranquil skies',
    defaultCompanionBg: '#F3F5F9',
    accentColor: '#6B82A8',
    svgTemplate: (fg, bg = '#F3F5F9') => `
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
        <rect width="80" height="80" fill="${bg}"/>
        <path d="M14 36 C14 30, 22 28, 26 31 C29 25, 39 26, 42 32 C46 30, 52 34, 50 38 C52 42, 44 44, 40 43 L18 43 C14 43, 12 39, 14 36 Z" fill="${fg}" fill-opacity="0.22"/>
        <path d="M46 68 C46 63, 52 61, 56 63 C58 58, 66 59, 68 64 C72 63, 76 66, 75 69 C76 72, 70 74, 66 73 L50 73 C46 73, 44 71, 46 68 Z" fill="${fg}" fill-opacity="0.18"/>
      </svg>
    `,
  },
  {
    id: 'islamic-geometric',
    name: 'Islamic Ornament',
    nameEn: 'Islamic Girih Ornament',
    category: 'islamic',
    description: 'Bintang segi delapan girih dan simetri geometris adiluhung',
    descriptionEn: 'Exquisite 8-fold star girih tessellation with spiritual symmetry',
    defaultCompanionBg: '#FAF7F0',
    accentColor: '#456E63',
    svgTemplate: (fg, bg = '#FAF7F0') => `
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
        <rect width="60" height="60" fill="${bg}"/>
        <!-- 8-pointed star in center -->
        <g transform="translate(30, 30)">
          <rect x="-10" y="-10" width="20" height="20" fill="none" stroke="${fg}" stroke-width="1.2" stroke-opacity="0.36"/>
          <rect x="-10" y="-10" width="20" height="20" transform="rotate(45)" fill="none" stroke="${fg}" stroke-width="1.2" stroke-opacity="0.36"/>
          <circle cx="0" cy="0" r="4" fill="${fg}" fill-opacity="0.2"/>
        </g>
        <!-- Corner interlacing triangles -->
        <path d="M0 0 L12 0 L0 12 Z" fill="${fg}" fill-opacity="0.15"/>
        <path d="M60 0 L48 0 L60 12 Z" fill="${fg}" fill-opacity="0.15"/>
        <path d="M0 60 L12 60 L0 48 Z" fill="${fg}" fill-opacity="0.15"/>
        <path d="M60 60 L48 60 L60 48 Z" fill="${fg}" fill-opacity="0.15"/>
      </svg>
    `,
  },
];

export function getBuiltInPatternById(id: string): BuiltInPatternItem | undefined {
  return BUILT_IN_PATTERNS.find((p) => p.id === id);
}

export function generatePatternCss(
  pattern: PatternConfig,
  customAccentColor?: string,
  customBgColor?: string
): React.CSSProperties {
  const bgCompanion = customBgColor || pattern.companionBgColor || '#FAF8F5';
  let imageUri = '';

  if (pattern.type === 'custom' && pattern.customDataUrl) {
    imageUri = `url("${pattern.customDataUrl}")`;
  } else {
    const builtIn = getBuiltInPatternById(pattern.id) || BUILT_IN_PATTERNS[0];
    const fg = customAccentColor || builtIn.accentColor;
    const svgStr = builtIn.svgTemplate(fg, bgCompanion);
    imageUri = `url("${svgToDataUri(svgStr)}")`;
  }

  const scaleRatio = (pattern.scale || 100) / 100;
  let bgSize = `${Math.round(80 * scaleRatio)}px auto`;

  if (pattern.displayMode === 'cover') {
    bgSize = 'cover';
  } else if (pattern.displayMode === 'contain') {
    bgSize = 'contain';
  } else if (pattern.displayMode === 'center') {
    bgSize = `${Math.round(120 * scaleRatio)}px`;
  }

  return {
    backgroundImage: imageUri,
    backgroundColor: bgCompanion,
    backgroundRepeat: pattern.repeat || 'repeat',
    backgroundSize: bgSize,
    backgroundPosition: pattern.displayMode === 'center' ? 'center' : '0 0',
    opacity: pattern.opacity ?? 1,
    transform: pattern.orientation ? `rotate(${pattern.orientation}deg)` : undefined,
  };
}
