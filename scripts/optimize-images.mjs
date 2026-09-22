#!/usr/bin/env node
/**
 * SPECTRE DEFEND Image Optimizer Script
 * Generates responsive WebP images from source JPEG/PNG files.
 * Preserves high visual fidelity while reducing network payload by ~80-90%.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const SRC_DIRS = ['public/images', 'public/assets/images'];

// Quality setting: 82 achieves visually lossless compression for cyber 3D assets & photos
const WEBP_QUALITY = 82;

// Standard responsive widths for hero, cards, and mobile viewports
const SIZES = [480, 800, 1200];

function optimizeDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith('.jpg') && !file.endsWith('.png')) continue;
    
    // Skip already responsive or derived files
    if (file.includes('-480') || file.includes('-800') || file.includes('-1200')) continue;

    const baseName = file.replace(/\.(jpg|png)$/, '');
    const sourcePath = path.join(dir, file);
    
    // 1. Generate full-resolution WebP
    const webpPath = path.join(dir, `${baseName}.webp`);
    if (!fs.existsSync(webpPath)) {
      try {
        console.log(`Converting ${file} -> ${baseName}.webp`);
        execSync(`convert "${sourcePath}" -quality ${WEBP_QUALITY} "${webpPath}"`);
      } catch (err) {
        console.error(`Error converting ${sourcePath} to webp:`, err.message);
      }
    }

    // 2. Generate responsive widths (480w, 800w, 1200w)
    for (const size of SIZES) {
      const resizedWebpPath = path.join(dir, `${baseName}-${size}.webp`);
      if (!fs.existsSync(resizedWebpPath)) {
        try {
          execSync(`convert "${sourcePath}" -resize ${size}x -quality ${WEBP_QUALITY} "${resizedWebpPath}"`);
          console.log(`Generated responsive image: ${path.basename(resizedWebpPath)}`);
        } catch (err) {
          console.error(`Error generating ${resizedWebpPath}:`, err.message);
        }
      }
    }
  }
}

console.log('--- SPECTRE DEFEND IMAGE OPTIMIZER ---');
SRC_DIRS.forEach(optimizeDirectory);
console.log('Image optimization complete.');
