import fs from 'fs';
import path from 'path';

const brandDir = path.resolve('public/assets/brand');
const publicDir = path.resolve('public');

if (!fs.existsSync(brandDir)) {
  fs.mkdirSync(brandDir, { recursive: true });
}

// -------------------------------------------------------------
// 1. REUSABLE VECTOR DEFINITIONS (THE EXACT SPECTRE DEFEND ASSET)
// -------------------------------------------------------------

function getDefs(variant = 'default') {
  const isLight = variant === 'light';
  const isMonochromeWhite = variant === 'white';
  const isMonochromeBlack = variant === 'black';

  if (isMonochromeWhite) {
    return `
    <defs>
      <filter id="glow-subtle" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>`;
  }

  if (isMonochromeBlack) {
    return `<defs></defs>`;
  }

  return `
    <defs>
      <!-- Central Blade Lighting: Razor Spine & Facets -->
      <linearGradient id="blade-left" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#F4FFA6" />
        <stop offset="25%" stop-color="#CEFF38" />
        <stop offset="70%" stop-color="#B7FF00" />
        <stop offset="100%" stop-color="#73AD00" />
      </linearGradient>

      <linearGradient id="blade-right" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#23470D" />
        <stop offset="45%" stop-color="#142C06" />
        <stop offset="100%" stop-color="#0A1803" />
      </linearGradient>

      <!-- Left Emblem: 'S' Facets -->
      <linearGradient id="s-top-facet" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#EEFFA1" />
        <stop offset="40%" stop-color="#CEFF38" />
        <stop offset="100%" stop-color="#88CE00" />
      </linearGradient>

      <linearGradient id="s-front-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#B7FF00" />
        <stop offset="50%" stop-color="#76BD00" />
        <stop offset="100%" stop-color="#2E5A04" />
      </linearGradient>

      <linearGradient id="s-dark-bevel" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="#0B1A04" />
        <stop offset="60%" stop-color="#183607" />
        <stop offset="100%" stop-color="#3C7209" />
      </linearGradient>

      <linearGradient id="s-bottom-facet" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#4C8502" />
        <stop offset="50%" stop-color="#B7FF00" />
        <stop offset="100%" stop-color="#E2FF78" />
      </linearGradient>

      <!-- Right Emblem: 'D' Facets -->
      <linearGradient id="d-top-facet" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#E8FFA1" />
        <stop offset="35%" stop-color="#CEFF38" />
        <stop offset="100%" stop-color="#7BB804" />
      </linearGradient>

      <linearGradient id="d-front-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#B7FF00" />
        <stop offset="50%" stop-color="#609D02" />
        <stop offset="100%" stop-color="#1E3E04" />
      </linearGradient>

      <linearGradient id="d-inner-facet" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#7AC200" />
        <stop offset="65%" stop-color="#224706" />
        <stop offset="100%" stop-color="#0E2103" />
      </linearGradient>

      <!-- Orbital Energy Stream -->
      <linearGradient id="orbit-core" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#B7FF00" stop-opacity="0" />
        <stop offset="10%" stop-color="#B7FF00" stop-opacity="0.9" />
        <stop offset="22%" stop-color="#FFFFFF" stop-opacity="1" />
        <stop offset="48%" stop-color="#CEFF38" stop-opacity="0.95" />
        <stop offset="65%" stop-color="#FFFFFF" stop-opacity="1" />
        <stop offset="90%" stop-color="#B7FF00" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#B7FF00" stop-opacity="0" />
      </linearGradient>

      <!-- Subtle Green Glow Filters -->
      <filter id="glow-heavy" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="22" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="glow-medium" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="7" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="glow-subtle" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>`;
}

// -------------------------------------------------------------
// 2. EMBLEM SYMBOL VECTOR MARK (S / D / STILETTO / ORBITAL RING)
// -------------------------------------------------------------

function getSymbolSvgGroup(variant = 'default') {
  const isWhite = variant === 'white';
  const isBlack = variant === 'black';

  if (isWhite) {
    return `
    <g id="spectre-symbol">
      <!-- Back Orbital Ring Arc -->
      <g transform="rotate(-4.5 400 392)">
        <path d="M 110,392 C 110,358 240,346 400,346 C 560,346 690,358 690,392" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-opacity="0.4" />
      </g>

      <!-- Left 'S' -->
      <polygon points="374,182 252,252 274,272 374,214" fill="#FFFFFF" opacity="0.95" />
      <polygon points="252,252 238,274 238,350 348,390 356,404 316,404 274,350 274,272" fill="#FFFFFF" opacity="0.8" />
      <polygon points="374,214 274,272 274,350 348,390 374,375" fill="#FFFFFF" opacity="0.4" />
      <polygon points="238,350 348,390 356,404 284,436 238,436" fill="#FFFFFF" opacity="0.85" />
      <polygon points="238,436 284,436 374,540 374,564 300,480 238,480" fill="#FFFFFF" opacity="0.4" />
      <polygon points="238,436 238,510 252,532 374,602 374,564 276,510 276,450 238,450" fill="#FFFFFF" opacity="0.8" />
      <polygon points="252,532 374,602 374,582 268,522" fill="#FFFFFF" opacity="0.95" />

      <!-- Right 'D' -->
      <polygon points="426,182 548,252 526,272 426,214" fill="#FFFFFF" opacity="0.95" />
      <polygon points="548,252 562,274 562,510 548,532 426,602 426,564 526,510 526,272" fill="#FFFFFF" opacity="0.8" />
      <polygon points="426,214 526,272 526,375 452,404 426,380" fill="#FFFFFF" opacity="0.4" />
      <polygon points="452,404 526,375 526,435" fill="#FFFFFF" opacity="0.9" />
      <polygon points="452,404 526,435 526,510 426,564 426,540" fill="#FFFFFF" opacity="0.4" />
      <polygon points="548,532 426,602 426,582 532,522" fill="#FFFFFF" opacity="0.95" />

      <!-- Central Stiletto Blade -->
      <polygon points="400,68 384,270 380,395 384,520 400,716 400,395" fill="#FFFFFF" opacity="0.9" />
      <polygon points="400,68 416,270 420,395 416,520 400,716 400,395" fill="#FFFFFF" opacity="0.5" />
      <line x1="400" y1="68" x2="400" y2="716" stroke="#FFFFFF" stroke-width="2" />

      <!-- Front Orbital Ring Arc -->
      <g transform="rotate(-4.5 400 392)">
        <path d="M 110,392 C 110,436 240,448 400,448 C 560,448 690,436 690,392" fill="none" stroke="#FFFFFF" stroke-width="3.5" />
        <circle cx="110" cy="392" r="4.5" fill="#FFFFFF" />
        <circle cx="690" cy="392" r="4.5" fill="#FFFFFF" />
      </g>
    </g>`;
  }

  if (isBlack) {
    return `
    <g id="spectre-symbol">
      <!-- Back Orbital Ring Arc -->
      <g transform="rotate(-4.5 400 392)">
        <path d="M 110,392 C 110,358 240,346 400,346 C 560,346 690,358 690,392" fill="none" stroke="#050807" stroke-width="2" stroke-opacity="0.3" />
      </g>

      <!-- Left 'S' -->
      <polygon points="374,182 252,252 274,272 374,214" fill="#050807" />
      <polygon points="252,252 238,274 238,350 348,390 356,404 316,404 274,350 274,272" fill="#1C241E" />
      <polygon points="374,214 274,272 274,350 348,390 374,375" fill="#050807" />
      <polygon points="238,350 348,390 356,404 284,436 238,436" fill="#1C241E" />
      <polygon points="238,436 284,436 374,540 374,564 300,480 238,480" fill="#050807" />
      <polygon points="238,436 238,510 252,532 374,602 374,564 276,510 276,450 238,450" fill="#1C241E" />
      <polygon points="252,532 374,602 374,582 268,522" fill="#050807" />

      <!-- Right 'D' -->
      <polygon points="426,182 548,252 526,272 426,214" fill="#050807" />
      <polygon points="548,252 562,274 562,510 548,532 426,602 426,564 526,510 526,272" fill="#1C241E" />
      <polygon points="426,214 526,272 526,375 452,404 426,380" fill="#050807" />
      <polygon points="452,404 526,375 526,435" fill="#1C241E" />
      <polygon points="452,404 526,435 526,510 426,564 426,540" fill="#050807" />
      <polygon points="548,532 426,602 426,582 532,522" fill="#050807" />

      <!-- Central Stiletto Blade -->
      <polygon points="400,68 384,270 380,395 384,520 400,716 400,395" fill="#1C241E" />
      <polygon points="400,68 416,270 420,395 416,520 400,716 400,395" fill="#050807" />
      <line x1="400" y1="68" x2="400" y2="716" stroke="#050807" stroke-width="2.5" />

      <!-- Front Orbital Ring Arc -->
      <g transform="rotate(-4.5 400 392)">
        <path d="M 110,392 C 110,436 240,448 400,448 C 560,448 690,436 690,392" fill="none" stroke="#050807" stroke-width="3.5" />
        <circle cx="110" cy="392" r="4.5" fill="#050807" />
        <circle cx="690" cy="392" r="4.5" fill="#050807" />
      </g>
    </g>`;
  }

  // Full Color Multi-Faceted Production Vector Representation
  return `
    <g id="spectre-symbol">
      <!-- Ambient Green Glow Behind Emblem -->
      <circle cx="400" cy="392" r="170" fill="#B7FF00" opacity="0.12" filter="url(#glow-heavy)" />

      <!-- Back Arc of Tilted Orbital Ring -->
      <g transform="rotate(-4.5 400 392)">
        <path d="M 110,392 C 110,358 240,346 400,346 C 560,346 690,358 690,392" fill="none" stroke="#B7FF00" stroke-width="3" stroke-opacity="0.32" />
      </g>

      <!-- ================= LEFT HEXAGON WING: 'S' ================= -->
      <!-- Top Angled Beveled Facet of S (Light Lime) -->
      <polygon points="374,182 252,252 274,272 374,214" fill="url(#s-top-facet)" stroke="#050807" stroke-width="1" />

      <!-- Main Body of S Upper Hook -->
      <polygon points="252,252 238,274 238,350 348,390 356,404 316,404 274,350 274,272" fill="url(#s-front-body)" stroke="#050807" stroke-width="1" />

      <!-- Upper Inner Cavity Shadow Facet -->
      <polygon points="374,214 274,272 274,350 348,390 374,375" fill="url(#s-dark-bevel)" />

      <!-- Middle Cross Spine of S -->
      <polygon points="238,350 348,390 356,404 284,436 238,436" fill="url(#s-front-body)" stroke="#050807" stroke-width="1" />

      <!-- Lower Inner Cavity Shadow Facet -->
      <polygon points="238,436 284,436 374,540 374,564 300,480 238,480" fill="url(#s-dark-bevel)" />

      <!-- Lower Body of S -->
      <polygon points="238,436 238,510 252,532 374,602 374,564 276,510 276,450 238,450" fill="url(#s-front-body)" stroke="#050807" stroke-width="1" />

      <!-- Bottom Edge Highlight of S -->
      <polygon points="252,532 374,602 374,582 268,522" fill="url(#s-bottom-facet)" />

      <!-- ================= RIGHT HEXAGON WING: 'D' ================= -->
      <!-- Top Angled Beveled Facet of D (Light Lime) -->
      <polygon points="426,182 548,252 526,272 426,214" fill="url(#d-top-facet)" stroke="#050807" stroke-width="1" />

      <!-- Main Body of Outer D -->
      <polygon points="548,252 562,274 562,510 548,532 426,602 426,564 526,510 526,272" fill="url(#d-front-body)" stroke="#050807" stroke-width="1" />

      <!-- Upper Inner Cavity Shadow Facet of D -->
      <polygon points="426,214 526,272 526,375 452,404 426,380" fill="url(#d-inner-facet)" />

      <!-- Middle Horizontal Wedge of D -->
      <polygon points="452,404 526,375 526,435" fill="url(#d-top-facet)" stroke="#050807" stroke-width="0.8" />

      <!-- Lower Inner Cavity Shadow Facet of D -->
      <polygon points="452,404 526,435 526,510 426,564 426,540" fill="url(#d-inner-facet)" />

      <!-- Bottom Edge Highlight of D -->
      <polygon points="548,532 426,602 426,582 532,522" fill="url(#s-bottom-facet)" />

      <!-- ================= CENTRAL STILETTO BLADE ================= -->
      <!-- Left Light-Reflective Facet of Stiletto Blade -->
      <polygon points="400,68 384,270 380,395 384,520 400,716 400,395" fill="url(#blade-left)" stroke="#050807" stroke-width="0.8" />

      <!-- Right Shadow Metallic Facet of Stiletto Blade -->
      <polygon points="400,68 416,270 420,395 416,520 400,716 400,395" fill="url(#blade-right)" stroke="#050807" stroke-width="0.8" />

      <!-- High-Intensity Razor Spine Center Line -->
      <line x1="400" y1="68" x2="400" y2="716" stroke="#FFFFFF" stroke-width="2.2" />
      <line x1="400" y1="120" x2="400" y2="664" stroke="#CEFF38" stroke-width="3.8" opacity="0.65" filter="url(#glow-subtle)" />

      <!-- Top Piercing Diamond Needle Point -->
      <polygon points="400,60 403,74 400,80 397,74" fill="#FFFFFF" filter="url(#glow-subtle)" />
      <!-- Bottom Piercing Diamond Needle Point -->
      <polygon points="400,724 403,710 400,704 397,710" fill="#FFFFFF" filter="url(#glow-subtle)" />

      <!-- ================= FRONT ARC OF ORBITAL ENERGY RING ================= -->
      <g transform="rotate(-4.5 400 392)">
        <!-- Outer Diffuse Halo -->
        <path d="M 110,392 C 110,436 240,448 400,448 C 560,448 690,436 690,392" fill="none" stroke="#B7FF00" stroke-width="10" opacity="0.32" filter="url(#glow-medium)" />

        <!-- Core Energy Stream -->
        <path d="M 110,392 C 110,436 240,448 400,448 C 560,448 690,436 690,392" fill="none" stroke="url(#orbit-core)" stroke-width="4.8" />

        <!-- Pure White Laser Core Beam -->
        <path d="M 118,394 C 145,432 260,445 400,445 C 540,445 655,432 682,394" fill="none" stroke="#FFFFFF" stroke-width="1.8" opacity="0.9" />

        <!-- Lateral Orbital Flare Nodes -->
        <circle cx="110" cy="392" r="5" fill="#FFFFFF" filter="url(#glow-subtle)" />
        <circle cx="110" cy="392" r="8" fill="#B7FF00" opacity="0.5" filter="url(#glow-medium)" />

        <circle cx="690" cy="392" r="5" fill="#FFFFFF" filter="url(#glow-subtle)" />
        <circle cx="690" cy="392" r="8" fill="#B7FF00" opacity="0.5" filter="url(#glow-medium)" />

        <!-- Distinct Center-Right Laser Flare Burst (Exact from Reference Image) -->
        <ellipse cx="492" cy="442" rx="42" ry="3.5" fill="#FFFFFF" filter="url(#glow-subtle)" opacity="0.95" />
        <circle cx="492" cy="442" r="4.5" fill="#FFFFFF" />
        <circle cx="492" cy="442" r="9" fill="#B7FF00" opacity="0.6" filter="url(#glow-subtle)" />
      </g>
    </g>`;
}

// -------------------------------------------------------------
// 3. WORDMARK VECTOR PATHS: SPECTRE & DEFEND
// -------------------------------------------------------------

function getWordmarkSvgGroup(variant = 'default', offsetY = 760) {
  const isLight = variant === 'light';
  const isWhite = variant === 'white';
  const isBlack = variant === 'black';

  const primaryTextColor = isBlack ? '#050807' : isLight ? '#080D0A' : '#FFFFFF';
  const accentLimeColor = isBlack ? '#050807' : isWhite ? '#FFFFFF' : '#B7FF00';
  const defendColor = isBlack ? '#050807' : isWhite ? '#FFFFFF' : isLight ? '#447300' : '#B7FF00';

  return `
    <g id="spectre-defend-wordmark" transform="translate(0, ${offsetY})">
      
      <!-- ================= 'SPECTRE' (PRECISE VECTOR PATHS) ================= -->
      <g id="wordmark-spectre">
        
        <!-- Letter 1: S (Width: 66, Height: 70, Origin: X=114) -->
        <g transform="translate(114, 0)">
          <!-- Upper Half of S with Stencil Cut -->
          <path d="M 16,0 L 52,0 L 66,14 L 66,24 L 52,24 L 52,12 L 18,12 L 13,17 L 13,24 L 20,30 L 66,38 L 66,42 L 0,42 L 0,38 L 48,30 L 12,24 L 0,16 L 0,14 Z" fill="${primaryTextColor}" />
          <!-- Lower Half of S -->
          <path d="M 0,46 L 66,46 L 66,56 L 52,70 L 14,70 L 0,56 L 0,46 L 14,46 L 14,58 L 50,58 L 53,55 L 53,49 L 46,44 L 0,36 Z" fill="${primaryTextColor}" />
        </g>

        <!-- Letter 2: P (Width: 60, Height: 70, Origin: X=196) -->
        <g transform="translate(196, 0)">
          <!-- Vertical Stem -->
          <polygon points="0,0 14,0 14,70 0,70" fill="${primaryTextColor}" />
          <!-- Loop with Stencil Notch -->
          <path d="M 18,0 L 46,0 L 60,14 L 60,28 L 46,42 L 18,42 L 18,30 L 44,30 L 48,26 L 48,16 L 44,12 L 18,12 Z" fill="${primaryTextColor}" />
        </g>

        <!-- Letter 3: E (First 'E' with NEON LIME GREEN Middle Bar! Origin: X=272) -->
        <g transform="translate(272, 0)">
          <!-- Vertical Stem (White) -->
          <polygon points="0,0 14,0 14,70 0,70" fill="${primaryTextColor}" />
          <!-- Top Horizontal Arm (White) -->
          <polygon points="18,0 58,0 58,12 48,12 18,12" fill="${primaryTextColor}" />
          <!-- MIDDLE HORIZONTAL ARM (NEON LIME GREEN ACCENT FROM REFERENCE!) -->
          <polygon points="18,29 48,29 48,41 18,41" fill="${accentLimeColor}" />
          <!-- Bottom Horizontal Arm (White) -->
          <polygon points="18,58 48,58 58,58 58,70 18,70" fill="${primaryTextColor}" />
        </g>

        <!-- Letter 4: C (Width: 62, Height: 70, Origin: X=346) -->
        <g transform="translate(346, 0)">
          <path d="M 14,0 L 62,0 L 62,12 L 50,12 L 16,12 L 12,16 L 12,54 L 16,58 L 50,58 L 62,58 L 62,70 L 14,70 L 0,56 L 0,14 Z" fill="${primaryTextColor}" />
        </g>

        <!-- Letter 5: T (Width: 72, Height: 70, Origin: X=424) -->
        <g transform="translate(424, 0)">
          <path d="M 0,0 L 72,0 L 72,12 L 60,12 L 43,18 L 43,70 L 29,70 L 29,18 L 12,12 L 0,12 Z" fill="${primaryTextColor}" />
        </g>

        <!-- Letter 6: R (Width: 66, Height: 70, Origin: X=512) -->
        <g transform="translate(512, 0)">
          <!-- Stem -->
          <polygon points="0,0 14,0 14,70 0,70" fill="${primaryTextColor}" />
          <!-- Loop with Stencil Notch -->
          <path d="M 18,0 L 46,0 L 60,14 L 60,26 L 46,38 L 18,38 L 18,26 L 44,26 L 48,22 L 48,16 L 44,12 L 18,12 Z" fill="${primaryTextColor}" />
          <!-- Diagonal Leg -->
          <polygon points="32,38 46,38 66,70 50,70 32,42" fill="${primaryTextColor}" />
        </g>

        <!-- Letter 7: E (Second 'E' - Solid White, Origin: X=594) -->
        <g transform="translate(594, 0)">
          <!-- Vertical Stem (White) -->
          <polygon points="0,0 14,0 14,70 0,70" fill="${primaryTextColor}" />
          <!-- Top Horizontal Arm (White) -->
          <polygon points="18,0 58,0 58,12 48,12 18,12" fill="${primaryTextColor}" />
          <!-- Middle Horizontal Arm (White) -->
          <polygon points="18,29 48,29 48,41 18,41" fill="${primaryTextColor}" />
          <!-- Bottom Horizontal Arm (White) -->
          <polygon points="18,58 48,58 58,58 58,70 18,70" fill="${primaryTextColor}" />
        </g>
      </g>

      <!-- ================= 'DEFEND' (WIDE TRACKING, NEON LIME GREEN) ================= -->
      <g id="wordmark-defend" transform="translate(164, 102)">
        <!-- D (X=0) -->
        <path d="M 0,0 L 26,0 C 38,0 44,6 44,13 C 44,20 38,26 26,26 L 0,26 Z M 8.5,7.5 L 8.5,18.5 L 24,18.5 C 29,18.5 34,16.5 34,13 C 34,9.5 29,7.5 24,7.5 Z" fill="${defendColor}" />

        <!-- E (X=86) -->
        <path d="M 86,0 L 118,0 L 118,7 L 94.5,7 L 94.5,10 L 114,10 L 114,16 L 94.5,16 L 94.5,19 L 118,19 L 118,26 L 86,26 Z" fill="${defendColor}" />

        <!-- F (X=168) -->
        <path d="M 168,0 L 200,0 L 200,7 L 176.5,7 L 176.5,11 L 196,11 L 196,17 L 176.5,17 L 176.5,26 L 168,26 Z" fill="${defendColor}" />

        <!-- E (X=248) -->
        <path d="M 248,0 L 280,0 L 280,7 L 256.5,7 L 256.5,10 L 276,10 L 276,16 L 256.5,16 L 256.5,19 L 280,19 L 280,26 L 248,26 Z" fill="${defendColor}" />

        <!-- N (X=330) -->
        <path d="M 330,0 L 339,0 L 364,18.5 L 364,0 L 372,0 L 372,26 L 363,26 L 338,7.5 L 338,26 L 330,26 Z" fill="${defendColor}" />

        <!-- D (X=422) -->
        <path d="M 422,0 L 448,0 C 460,0 466,6 466,13 C 466,20 460,26 448,26 L 422,26 Z M 430.5,7.5 L 430.5,18.5 L 446,18.5 C 451,18.5 456,16.5 456,13 C 456,9.5 451,7.5 446,7.5 Z" fill="${defendColor}" />
      </g>

    </g>`;
}

// -------------------------------------------------------------
// 4. GENERATE SPECIFIC ASSETS
// -------------------------------------------------------------

// A. Master Full Logo (Emblem + Wordmark): 800 x 920
function generateMasterLogo(variant = 'default') {
  const defs = getDefs(variant);
  const symbol = getSymbolSvgGroup(variant);
  const wordmark = getWordmarkSvgGroup(variant, 750);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 920" width="100%" height="100%">
  <!-- SPECTRE DEFEND Official Brand Identity Vector Lockup -->
  ${defs}
  ${symbol}
  ${wordmark}
</svg>`;
}

// B. Symbol-Only (Emblem Only, Square 800 x 800)
function generateSymbolLogo(variant = 'default') {
  const defs = getDefs(variant);
  const symbol = getSymbolSvgGroup(variant);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <!-- SPECTRE DEFEND Official Brand Symbol -->
  ${defs}
  ${symbol}
</svg>`;
}

// C. Horizontal Navbar / Header Lockup (Left Symbol, Right Wordmark): 680 x 160
function generateHorizontalLogo(variant = 'default') {
  const isLight = variant === 'light';
  const isWhite = variant === 'white';
  const isBlack = variant === 'black';

  const primaryTextColor = isBlack ? '#050807' : isLight ? '#080D0A' : '#FFFFFF';
  const accentLimeColor = isBlack ? '#050807' : isWhite ? '#FFFFFF' : '#B7FF00';
  const defendColor = isBlack ? '#050807' : isWhite ? '#FFFFFF' : isLight ? '#447300' : '#B7FF00';

  const defs = getDefs(variant);
  const symbol = getSymbolSvgGroup(variant);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 160" width="100%" height="100%">
  <!-- SPECTRE DEFEND Official Horizontal Navigation Lockup -->
  ${defs}
  <!-- Left Symbol (Scaled & Centered) -->
  <g transform="translate(10, 10) scale(0.175)">
    ${symbol}
  </g>

  <!-- Right Typography Wordmark -->
  <g transform="translate(170, 36)">
    <!-- SPECTRE (Height: 46px, Scale: 0.65) -->
    <g transform="scale(0.66)">
      <!-- S -->
      <g transform="translate(0, 0)">
        <path d="M 16,0 L 52,0 L 66,14 L 66,24 L 52,24 L 52,12 L 18,12 L 13,17 L 13,24 L 20,30 L 66,38 L 66,42 L 0,42 L 0,38 L 48,30 L 12,24 L 0,16 L 0,14 Z" fill="${primaryTextColor}" />
        <path d="M 0,46 L 66,46 L 66,56 L 52,70 L 14,70 L 0,56 L 0,46 L 14,46 L 14,58 L 50,58 L 53,55 L 53,49 L 46,44 L 0,36 Z" fill="${primaryTextColor}" />
      </g>
      <!-- P -->
      <g transform="translate(80, 0)">
        <polygon points="0,0 14,0 14,70 0,70" fill="${primaryTextColor}" />
        <path d="M 18,0 L 46,0 L 60,14 L 60,28 L 46,42 L 18,42 L 18,30 L 44,30 L 48,26 L 48,16 L 44,12 L 18,12 Z" fill="${primaryTextColor}" />
      </g>
      <!-- E (with Neon Lime Middle Bar) -->
      <g transform="translate(156, 0)">
        <polygon points="0,0 14,0 14,70 0,70" fill="${primaryTextColor}" />
        <polygon points="18,0 58,0 58,12 48,12 18,12" fill="${primaryTextColor}" />
        <polygon points="18,29 48,29 48,41 18,41" fill="${accentLimeColor}" />
        <polygon points="18,58 48,58 58,58 58,70 18,70" fill="${primaryTextColor}" />
      </g>
      <!-- C -->
      <g transform="translate(230, 0)">
        <path d="M 14,0 L 62,0 L 62,12 L 50,12 L 16,12 L 12,16 L 12,54 L 16,58 L 50,58 L 62,58 L 62,70 L 14,70 L 0,56 L 0,14 Z" fill="${primaryTextColor}" />
      </g>
      <!-- T -->
      <g transform="translate(308, 0)">
        <path d="M 0,0 L 72,0 L 72,12 L 60,12 L 43,18 L 43,70 L 29,70 L 29,18 L 12,12 L 0,12 Z" fill="${primaryTextColor}" />
      </g>
      <!-- R -->
      <g transform="translate(396, 0)">
        <polygon points="0,0 14,0 14,70 0,70" fill="${primaryTextColor}" />
        <path d="M 18,0 L 46,0 L 60,14 L 60,26 L 46,38 L 18,38 L 18,26 L 44,26 L 48,22 L 48,16 L 44,12 L 18,12 Z" fill="${primaryTextColor}" />
        <polygon points="32,38 46,38 66,70 50,70 32,42" fill="${primaryTextColor}" />
      </g>
      <!-- E (Solid White) -->
      <g transform="translate(476, 0)">
        <polygon points="0,0 14,0 14,70 0,70" fill="${primaryTextColor}" />
        <polygon points="18,0 58,0 58,12 48,12 18,12" fill="${primaryTextColor}" />
        <polygon points="18,29 48,29 48,41 18,41" fill="${primaryTextColor}" />
        <polygon points="18,58 48,58 58,58 58,70 18,70" fill="${primaryTextColor}" />
      </g>
    </g>

    <!-- DEFEND (Tracking across width, scale: 0.65) -->
    <g transform="translate(4, 58) scale(0.68)">
      <path d="M 0,0 L 26,0 C 38,0 44,6 44,13 C 44,20 38,26 26,26 L 0,26 Z M 8.5,7.5 L 8.5,18.5 L 24,18.5 C 29,18.5 34,16.5 34,13 C 34,9.5 29,7.5 24,7.5 Z" fill="${defendColor}" />
      <path d="M 86,0 L 118,0 L 118,7 L 94.5,7 L 94.5,10 L 114,10 L 114,16 L 94.5,16 L 94.5,19 L 118,19 L 118,26 L 86,26 Z" fill="${defendColor}" />
      <path d="M 168,0 L 200,0 L 200,7 L 176.5,7 L 176.5,11 L 196,11 L 196,17 L 176.5,17 L 176.5,26 L 168,26 Z" fill="${defendColor}" />
      <path d="M 248,0 L 280,0 L 280,7 L 256.5,7 L 256.5,10 L 276,10 L 276,16 L 256.5,16 L 256.5,19 L 280,19 L 280,26 L 248,26 Z" fill="${defendColor}" />
      <path d="M 330,0 L 339,0 L 364,18.5 L 364,0 L 372,0 L 372,26 L 363,26 L 338,7.5 L 338,26 L 330,26 Z" fill="${defendColor}" />
      <path d="M 422,0 L 448,0 C 460,0 466,6 466,13 C 466,20 460,26 448,26 L 422,26 Z M 430.5,7.5 L 430.5,18.5 L 446,18.5 C 451,18.5 456,16.5 456,13 C 456,9.5 451,7.5 446,7.5 Z" fill="${defendColor}" />
    </g>
  </g>
</svg>`;
}

// D. Favicon (Optimized 64 x 64 with strong edge definition)
function generateFavicon() {
  const defs = getDefs('default');
  const symbol = getSymbolSvgGroup('default');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <!-- SPECTRE DEFEND Official Favicon Vector -->
  ${defs}
  <rect width="800" height="800" rx="140" fill="#050807" />
  <g transform="translate(0, 0)">
    ${symbol}
  </g>
</svg>`;
}

// -------------------------------------------------------------
// 5. WRITE ALL REQUIRED ASSET FILES
// -------------------------------------------------------------

const filesToGenerate = [
  // Required assets from prompt section 9
  { path: 'public/assets/brand/spectre-defend-logo.svg', content: generateMasterLogo('default') },
  { path: 'public/assets/brand/spectre-defend-logo-symbol.svg', content: generateSymbolLogo('default') },
  { path: 'public/assets/brand/spectre-defend-logo-dark.svg', content: generateMasterLogo('dark') },
  { path: 'public/assets/brand/spectre-defend-logo-light.svg', content: generateMasterLogo('light') },
  { path: 'public/assets/brand/spectre-defend-logo-white.svg', content: generateMasterLogo('white') },
  { path: 'public/assets/brand/spectre-defend-logo-black.svg', content: generateMasterLogo('black') },
  { path: 'public/assets/brand/spectre-defend-favicon.svg', content: generateFavicon() },

  // System Root Assets (for backward compatibility and direct referencing)
  { path: 'public/logo.svg', content: generateHorizontalLogo('default') },
  { path: 'public/logo-symbol.svg', content: generateSymbolLogo('default') },
  { path: 'public/logo-dark.svg', content: generateHorizontalLogo('dark') },
  { path: 'public/logo-light.svg', content: generateHorizontalLogo('light') },
  { path: 'public/logo-white.svg', content: generateHorizontalLogo('white') },
  { path: 'public/logo-black.svg', content: generateHorizontalLogo('black') },
  { path: 'public/logo-monochrome.svg', content: generateHorizontalLogo('white') },
  { path: 'public/favicon.svg', content: generateFavicon() },
  { path: 'public/apple-touch-icon.svg', content: generateFavicon() },
];

for (const item of filesToGenerate) {
  const fullPath = path.resolve(item.path);
  fs.writeFileSync(fullPath, item.content, 'utf8');
  console.log(`Generated: ${item.path} (${item.content.length} bytes)`);
}

console.log('All SPECTRE DEFEND logo assets successfully created!');

