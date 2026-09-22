# SPECTRE DEFEND CMS Image Guidelines

## Purpose
This document establishes strict production standards for content editors and administrators uploading imagery through Decap CMS (`/admin/`) to maintain the speed, Core Web Vitals, and visual fidelity of **SPECTRE DEFEND**.

---

## 1. Dimensional & Aspect Ratio Specifications

| Placement | Recommended Dimensions | Aspect Ratio | Maximum File Size | Target Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Visual 3D Asset** | 1200 x 896 px | ~4:3 (1200:896) | 120 KB (WebP) / 250 KB (JPG) | Homepage hero showcase |
| **Section 3D Emblem / Globe** | 1024 x 1024 px | 1:1 Square | 150 KB (WebP) / 300 KB (JPG) | About & Doctrine features |
| **SOC / Operations Center** | 1376 x 768 px | 16:9 or 16:10 | 150 KB (WebP) / 350 KB (JPG) | Showcase, bento grids, banner |
| **Service Catalog Featured Image** | 1200 x 900 px | 4:3 | 120 KB (WebP) / 250 KB (JPG) | Service detail cards & modals |
| **Blog Featured Article Banner** | 1200 x 675 px | 16:9 | 120 KB (WebP) / 250 KB (JPG) | Blog posts, research papers |
| **Team Member Headshot** | 400 x 400 px | 1:1 Square | 60 KB (WebP) / 120 KB (JPG) | Team directory & bio modal |
| **Brand Logos & Emblems** | Vector SVG | N/A | < 15 KB (SVG) | Header, Footer, Favicons |

---

## 2. File Format Rules

1. **Vector First for Brand Graphics**:
   - Company logos, emblems, badges, and icons **MUST ALWAYS** be uploaded as optimized `.svg` files.
   - SVGs scale losslessly, consume under 10 KB, and cause zero layout shifts.

2. **WebP for Photorealistic & 3D Renders**:
   - All 3D models, renders, and photography should be converted to `.webp` prior to upload or processed via the automated optimization pipeline.
   - Quality setting should be set between **80% and 85%**.

3. **Fallback JPG / PNG**:
   - If WebP is unavailable from the design team, export as clean progressive JPEG (quality 82%).
   - PNG is strictly reserved for assets requiring alpha transparency.

---

## 3. Pre-Upload Optimization Checklist

Before publishing in Decap CMS:
- [ ] Image has been cropped to the correct aspect ratio (16:9, 4:3, or 1:1).
- [ ] File resolution does not exceed 1600px width (larger resolutions waste bandwidth without improving visual sharpness).
- [ ] Filename uses lowercase alphanumeric characters with hyphens (e.g., `zero-trust-cloud-architecture.webp`).
- [ ] Descriptive alt text is provided for accessibility and search ranking (e.g., *"SPECTRE DEFEND SOC Operations Center monitoring real-time sovereign threats"*).
- [ ] No personal metadata or camera EXIF tags are embedded.

---

## 4. Automated Image Optimization Pipeline

SPECTRE DEFEND includes an automated optimization utility in the project repository:
```bash
npm run optimize:images
```
When run, this script automatically scans `public/images/` and:
1. Generates modern WebP files for all JPEGs and PNGs.
2. Creates responsive variants at `480w`, `800w`, and `1200w`.
3. Preserves aspect ratios and optimal visual clarity.
