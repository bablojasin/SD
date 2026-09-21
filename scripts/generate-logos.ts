import fs from 'fs';
import path from 'path';

// Generate production-grade SVGs for SPECTRE DEFEND
// Based on the provided 1:1 reference logo:
// - Hexagonal shield contour with central stiletto blade extending top and bottom
// - Left half forms geometric faceted 'S'
// - Right half forms geometric faceted 'D'
// - 3D orbital luminous ring passing across the equator
// - High-tech futuristic wordmark: SPECTRE (bold cyber typography) over DEFEND (wide-tracked neon-lime)

function getSymbolSvgSnippet(variant: 'color' | 'light' | 'white' | 'black') {
  if (variant === 'white') {
    return `
      <!-- White Monochrome Symbol -->
      <g id="spectre-defend-symbol">
        <!-- Central Stiletto Blade -->
        <polygon points="256,36 265,180 268,256 265,332 256,476 247,332 244,256 247,180" fill="#FFFFFF" />
        <polygon points="256,36 265,180 268,256 256,476" fill="#E6E6E6" />
        <line x1="256" y1="36" x2="256" y2="476" stroke="#FFFFFF" stroke-width="1.5" />

        <!-- S Symbol (Left) -->
        <path d="M 238,98 L 172,98 L 126,174 L 176,174 L 208,174 L 140,274 L 238,274 L 238,242 L 180,242 L 216,192 L 146,192 L 158,172 L 238,172 Z" fill="#FFFFFF" />
        <path d="M 238,286 L 140,286 L 126,338 L 172,414 L 238,414 L 238,380 L 182,380 L 152,336 L 238,336 Z" fill="#E6E6E6" />

        <!-- D Symbol (Right) -->
        <path d="M 274,98 L 340,98 L 386,174 L 386,338 L 340,414 L 274,414 L 274,380 L 328,380 L 358,328 L 358,184 L 328,132 L 274,132 Z" fill="#FFFFFF" />
        <polygon points="292,164 330,164 346,204 346,308 330,348 292,348" fill="#FFFFFF" fill-opacity="0.8" />

        <!-- Orbit Ring -->
        <ellipse cx="256" cy="256" rx="208" ry="34" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-dasharray="280 40 40 40" transform="rotate(-6 256 256)" opacity="0.9" />
      </g>
    `;
  }

  if (variant === 'black') {
    return `
      <!-- Black Monochrome Symbol -->
      <g id="spectre-defend-symbol">
        <!-- Central Stiletto Blade -->
        <polygon points="256,36 265,180 268,256 265,332 256,476 247,332 244,256 247,180" fill="#080D0A" />
        <polygon points="256,36 265,180 268,256 256,476" fill="#1C271E" />
        <line x1="256" y1="36" x2="256" y2="476" stroke="#000000" stroke-width="1.5" />

        <!-- S Symbol (Left) -->
        <path d="M 238,98 L 172,98 L 126,174 L 176,174 L 208,174 L 140,274 L 238,274 L 238,242 L 180,242 L 216,192 L 146,192 L 158,172 L 238,172 Z" fill="#080D0A" />
        <path d="M 238,286 L 140,286 L 126,338 L 172,414 L 238,414 L 238,380 L 182,380 L 152,336 L 238,336 Z" fill="#1C271E" />

        <!-- D Symbol (Right) -->
        <path d="M 274,98 L 340,98 L 386,174 L 386,338 L 340,414 L 274,414 L 274,380 L 328,380 L 358,328 L 358,184 L 328,132 L 274,132 Z" fill="#080D0A" />
        <polygon points="292,164 330,164 346,204 346,308 330,348 292,348" fill="#1C271E" />

        <!-- Orbit Ring -->
        <ellipse cx="256" cy="256" rx="208" ry="34" fill="none" stroke="#080D0A" stroke-width="7" stroke-dasharray="280 40 40 40" transform="rotate(-6 256 256)" opacity="0.95" />
      </g>
    `;
  }

  // Full Color / Dark / Light
  return `
    <defs>
      <!-- Neon Lime & Emerald Gradients matching 1:1 reference -->
      <linearGradient id="blade-main" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#E2FF75" />
        <stop offset="25%" stop-color="#B7FF00" />
        <stop offset="70%" stop-color="#5B9900" />
        <stop offset="100%" stop-color="#244400" />
      </linearGradient>
      <linearGradient id="blade-highlight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="30%" stop-color="#E4FF85" />
        <stop offset="70%" stop-color="#B7FF00" />
        <stop offset="100%" stop-color="#559100" />
      </linearGradient>
      <linearGradient id="s-upper" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#CEFF38" />
        <stop offset="50%" stop-color="#B7FF00" />
        <stop offset="100%" stop-color="#6AA800" />
      </linearGradient>
      <linearGradient id="s-bevel" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stop-color="#1E3802" />
        <stop offset="60%" stop-color="#4C7F00" />
        <stop offset="100%" stop-color="#9EEB00" />
      </linearGradient>
      <linearGradient id="s-lower" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#9DE800" />
        <stop offset="50%" stop-color="#B7FF00" />
        <stop offset="100%" stop-color="#3D6B00" />
      </linearGradient>
      <linearGradient id="d-outer" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#D4FF4D" />
        <stop offset="40%" stop-color="#B7FF00" />
        <stop offset="85%" stop-color="#528700" />
        <stop offset="100%" stop-color="#1A3300" />
      </linearGradient>
      <linearGradient id="d-facet" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#B7FF00" />
        <stop offset="60%" stop-color="#385F00" />
        <stop offset="100%" stop-color="#0E1A02" />
      </linearGradient>
      <linearGradient id="orbit-glow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#B7FF00" stop-opacity="0" />
        <stop offset="20%" stop-color="#B7FF00" stop-opacity="0.8" />
        <stop offset="50%" stop-color="#FFFFFF" stop-opacity="1" />
        <stop offset="80%" stop-color="#B7FF00" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#B7FF00" stop-opacity="0" />
      </linearGradient>
      <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="core-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="14" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g id="spectre-defend-symbol">
      <!-- Ambient Glow Behind Shield -->
      <circle cx="256" cy="256" r="140" fill="#B7FF00" opacity="0.12" filter="url(#core-glow)" />

      <!-- Back Half of Orbit Ring -->
      <path d="M 68,244 C 92,218 200,212 320,224 C 380,230 432,240 444,256" fill="none" stroke="#B7FF00" stroke-width="3" stroke-opacity="0.3" transform="rotate(-6 256 256)" />

      <!-- ================= LEFT: S SYMBOL ================= -->
      <!-- Upper Segment S -->
      <polygon points="238,94 168,94 122,170 178,170 238,170" fill="url(#s-upper)" stroke="#080D0A" stroke-width="1.5" stroke-linejoin="round" />
      <!-- Upper Inner Facet S -->
      <polygon points="168,94 238,94 238,138 186,138 152,170 122,170" fill="url(#s-bevel)" opacity="0.85" />
      
      <!-- Mid Connector / Spine S -->
      <polygon points="238,170 184,170 142,246 196,246 238,246" fill="url(#s-bevel)" stroke="#080D0A" stroke-width="1" />
      <polygon points="196,246 142,246 128,272 238,272" fill="url(#s-upper)" />

      <!-- Lower Segment S -->
      <polygon points="238,284 142,284 122,336 168,418 238,418" fill="url(#s-lower)" stroke="#080D0A" stroke-width="1.5" stroke-linejoin="round" />
      <!-- Lower Inner Facet S -->
      <polygon points="238,418 168,418 136,364 192,364 238,328" fill="url(#s-bevel)" opacity="0.8" />
      <!-- Bevel Edge Accent -->
      <polygon points="238,378 184,378 154,336 238,336" fill="#132402" opacity="0.9" />

      <!-- ================= RIGHT: D SYMBOL ================= -->
      <!-- Outer Hexagonal D Body -->
      <polygon points="274,94 344,94 390,170 390,342 344,418 274,418" fill="url(#d-outer)" stroke="#080D0A" stroke-width="1.5" stroke-linejoin="round" />
      
      <!-- Beveled Facets on D -->
      <polygon points="274,94 344,94 376,146 322,146 274,146" fill="#D8FF5C" opacity="0.9" />
      <polygon points="344,94 390,170 366,192 328,146" fill="url(#d-facet)" />
      <polygon points="390,170 390,342 360,320 360,192" fill="#2E5202" opacity="0.95" />
      <polygon points="390,342 344,418 316,370 360,320" fill="url(#d-facet)" />
      <polygon points="344,418 274,418 274,370 316,370" fill="#122401" />

      <!-- Inner Negative Chamber of D -->
      <polygon points="274,158 322,158 348,202 348,310 322,354 274,354" fill="#080D0A" stroke="#B7FF00" stroke-width="2" stroke-opacity="0.6" />
      <polygon points="274,172 312,172 332,208 332,304 312,340 274,340" fill="#0B140E" />

      <!-- ================= CENTRAL STILETTO BLADE ================= -->
      <!-- Left Facet of Spear Blade -->
      <polygon points="256,32 245,176 242,256 245,336 256,480 256,256" fill="url(#blade-main)" stroke="#080D0A" stroke-width="1" />
      <!-- Right Facet of Spear Blade -->
      <polygon points="256,32 267,176 270,256 267,336 256,480 256,256" fill="url(#blade-highlight)" stroke="#080D0A" stroke-width="1" />
      <!-- Center High-Intensity Razor Spine -->
      <line x1="256" y1="32" x2="256" y2="480" stroke="#FFFFFF" stroke-width="2.5" />
      <line x1="256" y1="60" x2="256" y2="452" stroke="#E6FF80" stroke-width="4" opacity="0.6" filter="url(#neon-glow)" />

      <!-- Top and Bottom Piercing Energy Points -->
      <polygon points="256,24 259,42 256,48 253,42" fill="#FFFFFF" filter="url(#neon-glow)" />
      <polygon points="256,488 259,470 256,464 253,470" fill="#FFFFFF" filter="url(#neon-glow)" />

      <!-- ================= ORBITAL ENERGY RING (FRONT ARC) ================= -->
      <!-- Front glowing energy ring cutting across equator -->
      <g transform="rotate(-6 256 256)">
        <!-- Outer Halo -->
        <ellipse cx="256" cy="256" rx="212" ry="34" fill="none" stroke="#B7FF00" stroke-width="7" opacity="0.3" filter="url(#neon-glow)" />
        <!-- Core Stream -->
        <ellipse cx="256" cy="256" rx="210" ry="33" fill="none" stroke="url(#orbit-glow)" stroke-width="4.5" />
        <!-- Inner Core White Lightning -->
        <path d="M 64,258 C 110,296 402,296 448,258" fill="none" stroke="#FFFFFF" stroke-width="2" />
        <!-- Bright Orbital Flare Points -->
        <circle cx="82" cy="252" r="5" fill="#FFFFFF" filter="url(#neon-glow)" />
        <circle cx="430" cy="260" r="5" fill="#FFFFFF" filter="url(#neon-glow)" />
        <circle cx="256" cy="289" r="3.5" fill="#FFFFFF" filter="url(#neon-glow)" />
      </g>
    </g>
  `;
}

// 1. logo-symbol.svg (512x512)
const logoSymbolSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <!-- SPECTRE DEFEND Custom Cyber Defense Shield Monogram (SD Vector) -->
  ${getSymbolSvgSnippet('color')}
</svg>`;

// 2. Primary Logo: Horizontal lockup (Symbol + SPECTRE DEFEND wordmark)
// Width: 1200, Height: 320
function getHorizontalLogo(textColor: string, defendColor: string, symbolVariant: 'color' | 'light' | 'white' | 'black') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 320" width="100%" height="100%">
  <!-- SPECTRE DEFEND Official Brand Identity Vector Lockup -->
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&amp;family=JetBrains+Mono:wght@700;800&amp;display=swap');
      .spectre-text {
        font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 800;
        font-size: 88px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
      .defend-text {
        font-family: 'JetBrains Mono', monospace, sans-serif;
        font-weight: 800;
        font-size: 38px;
        letter-spacing: 0.62em;
        text-transform: uppercase;
      }
    </style>
  </defs>

  <!-- Left: Symbol (Scaled to fit height) -->
  <g transform="translate(20, 10) scale(0.58)">
    ${getSymbolSvgSnippet(symbolVariant)}
  </g>

  <!-- Right: Typography Wordmark -->
  <!-- Top line: SPECTRE -->
  <g transform="translate(350, 150)">
    <text class="spectre-text" fill="${textColor}" x="0" y="0">SPECTRE</text>
    <!-- Geometric Accent on E corner or underline if needed -->
    <rect x="532" y="-34" width="28" height="6" fill="${defendColor}" rx="1" />
  </g>

  <!-- Bottom line: DEFEND with wide tracking -->
  <g transform="translate(354, 226)">
    <text class="defend-text" fill="${defendColor}" x="0" y="0">DEFEND</text>
  </g>

  <!-- Secondary Precision Grid Dots -->
  <circle cx="340" cy="216" r="2" fill="${defendColor}" opacity="0.7" />
  <line x1="334" y1="216" x2="310" y2="216" stroke="${defendColor}" stroke-width="1.5" opacity="0.4" />
</svg>`;
}

// 3. Favicon (Crisp squircle on dark background or pure vector)
const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <!-- SPECTRE DEFEND Favicon Icon -->
  <rect width="512" height="512" rx="112" fill="#080D0A" />
  <rect width="504" height="504" x="4" y="4" rx="108" fill="none" stroke="#B7FF00" stroke-width="4" stroke-opacity="0.3" />
  <g transform="translate(32, 28) scale(0.88)">
    ${getSymbolSvgSnippet('color')}
  </g>
</svg>`;

// 4. Apple Touch Icon (180x180 base)
const appleTouchIconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <!-- SPECTRE DEFEND Apple Touch Icon (180x180 high-DPI) -->
  <rect width="512" height="512" rx="120" fill="#050807" />
  <rect width="504" height="504" x="4" y="4" rx="116" fill="none" stroke="#B7FF00" stroke-width="6" stroke-opacity="0.45" />
  <g transform="translate(24, 20) scale(0.91)">
    ${getSymbolSvgSnippet('color')}
  </g>
</svg>`;

const publicDir = path.join(process.cwd(), 'public');

// Write out all files:
fs.writeFileSync(path.join(publicDir, 'logo-symbol.svg'), logoSymbolSvg, 'utf-8');
console.log('Generated logo-symbol.svg');

// Primary logo (default for dark backgrounds)
fs.writeFileSync(path.join(publicDir, 'logo.svg'), getHorizontalLogo('#FFFFFF', '#B7FF00', 'color'), 'utf-8');
console.log('Generated logo.svg');

// Dark logo (for dark backgrounds)
fs.writeFileSync(path.join(publicDir, 'logo-dark.svg'), getHorizontalLogo('#FFFFFF', '#B7FF00', 'color'), 'utf-8');
console.log('Generated logo-dark.svg');

// Light logo (for light/white backgrounds)
fs.writeFileSync(path.join(publicDir, 'logo-light.svg'), getHorizontalLogo('#080D0A', '#4F8200', 'color'), 'utf-8');
console.log('Generated logo-light.svg');

// Monochrome white
fs.writeFileSync(path.join(publicDir, 'logo-white.svg'), getHorizontalLogo('#FFFFFF', '#FFFFFF', 'white'), 'utf-8');
console.log('Generated logo-white.svg');

// Monochrome black
fs.writeFileSync(path.join(publicDir, 'logo-black.svg'), getHorizontalLogo('#080D0A', '#080D0A', 'black'), 'utf-8');
console.log('Generated logo-black.svg');

// Legacy monochrome name if referenced
fs.writeFileSync(path.join(publicDir, 'logo-monochrome.svg'), getHorizontalLogo('#FFFFFF', '#B7FF00', 'white'), 'utf-8');
console.log('Generated logo-monochrome.svg');

// Favicon
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg, 'utf-8');
console.log('Generated favicon.svg');

// Apple touch icon
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.svg'), appleTouchIconSvg, 'utf-8');
console.log('Generated apple-touch-icon.svg');
